import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';

import { EnvService } from 'environment/environment.service';
import { AiRepository } from 'features/ai/ai.repository';
import { Service } from 'schemas/service.schema';
import { AiResponse } from 'dtos';
import { WebSocketManager } from 'utils/ws';

const FIND_RESULTS = 5;

@Injectable()
export class AiService {
  private embeddings: OpenAIEmbeddings;
  private chain: LLMChain;
  private wsManager: WebSocketManager;

  constructor(
    private readonly envService: EnvService,
    private readonly aiRepo: AiRepository,
  ) {
    this.wsManager = new WebSocketManager(5432);

    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: this.envService.get().openAiApiKey,
    });

    const model = new OpenAI({
      openAIApiKey: this.envService.get().openAiApiKey,
      modelName: 'gpt-3.5-turbo',
      // modelName: 'gpt-4-1106-preview',
      temperature: 0,
      streaming: true,
    });

    const prompt = new PromptTemplate({
      template: `
        You are a tour guide. The user is in {location}.
        The user has asked you the following thing: {query}.
        Reply to them with reference to the following services that we offer: {context}.
        You may also use your knowledge of {location} to make your replies more interesting.
        All you can do it make recommendations. You can't do anything on behalf of the user, such as make bookings or contact service operators.
        Don't ask for follow-up questions or help. The user cannot reply to you.
        Phrase your recommendations like this:
          1. <service id>\n<content>
          2. <service id>\n<content>
        For example:
          1. [123]\nWe recommend you try this service
          2. [456]\nYou might also like this one
        You may recommend one or more services depending on their relevance.
        If you recommend multiple services put them in a list format.
        Keep your recommendations brief.
        `,
      inputVariables: ['location', 'context', 'query'],
    });

    this.chain = new LLMChain({
      llm: model,
      prompt,
    });

    this.aiRepo.connect(this.envService.get().pineconeApiKey);
  }

  async search(query: string): Promise<Service[]> {
    const vector = await this.embeddings.embedQuery(query);

    const similar = await this.aiRepo.findSimilar(vector, FIND_RESULTS);
    return similar.services;
  }

  async ask(query: string, wsRef: string) {
    const wsChannel = this.wsManager.getChannel(wsRef);

    const vector = await this.embeddings.embedQuery(query);

    const similar = await this.aiRepo.findSimilar(vector, FIND_RESULTS, true);

    const context = similar.embeddings.matches
      .map((match) => `id: ${match.id}\n${match.metadata?.content}`)
      .join('\n---\n');

    // const context = similar.services
    //   .map(
    //     (match) =>
    //       `service id: [${match._id}]\ndescription: ${match.description}`,
    //   )
    //   .join('\n---\n');

    const serviceTable = similar.services.reduce(
      (acc, cur) => ({ ...acc, [cur._id]: cur }),
      {} as Record<string, Service>,
    );

    let inServiceRef = false;
    let serviceRefTokens = [];

    const sendToken = (token: string) => {
      if (token !== '') {
        wsChannel.sendMessage<AiResponse>({ type: 'token', token });
      }
    };

    await this.chain.call(
      {
        location: 'Corfu, Greece',
        context,
        query,
      },
      {
        callbacks: [
          {
            handleLLMNewToken(token) {
              if (inServiceRef) {
                if (token.includes(']')) {
                  const [serviceRefToken, regularToken] = token.split(']');
                  serviceRefTokens.push(serviceRefToken);

                  const id = serviceRefTokens.join('');

                  inServiceRef = false;
                  serviceRefTokens = [];

                  wsChannel.sendMessage<AiResponse>({
                    type: 'service-ref',
                    serviceRef: serviceTable[id],
                  });
                  sendToken(regularToken);
                } else {
                  serviceRefTokens.push(token);
                }
              } else {
                if (token.includes('[')) {
                  inServiceRef = true;
                  const [regularToken, serviceRefToken] = token.split('[');

                  serviceRefTokens.push(serviceRefToken);
                  sendToken(regularToken);
                } else {
                  sendToken(token);
                }
              }
            },
          },
        ],
      },
    );

    wsChannel.sendMessage<AiResponse>({ type: 'stop' });
  }
}
