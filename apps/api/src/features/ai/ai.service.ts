import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';

import { EnvService } from 'environment/environment.service';
import { AiRepository } from 'features/ai/ai.repository';
import { Service } from 'schemas/service.schema';
import { AskAiDto } from 'dtos';

const FIND_RESULTS = 5;

@Injectable()
export class AiService {
  private embeddings: OpenAIEmbeddings;
  private chain: LLMChain;

  constructor(
    private readonly envService: EnvService,
    private readonly aiRepo: AiRepository,
  ) {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: this.envService.get().openAiApiKey,
    });

    const model = new OpenAI({
      openAIApiKey: this.envService.get().openAiApiKey,
      modelName: 'gpt-3.5-turbo',
      // modelName: 'gpt-4-1106-preview',
      temperature: 0,
    });

    const prompt = new PromptTemplate({
      template: `
        You are a tour guide. The user is in {location}.
        The user has asked you the following thing: {query}.
        Reply to them with reference to the following services that we offer: {context}.
        You may also use your knowledge of {location} to make your replies more interesting.
        All you can do it make recommendations. You can't do anything on behalf of the user, such as make bookings or contact service operators.
        Don't ask for follow-up questions or help. The user cannot reply to you.
        Each service has a "service reference" in this format: [<service name>:<id>]. For example, [My Service:123].
        Phrase your recommendations like this:
          <service reference>: <content>
        For example:
          [My Service:123]: We recommend you try this service
        You may recommend one or more services depending on their relevance.
        If you recommend multiple services put them in a list format.
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

  async ask(query: string): Promise<AskAiDto> {
    const vector = await this.embeddings.embedQuery(query);

    const similar = await this.aiRepo.findSimilar(vector, FIND_RESULTS, true);

    // const context = similar.embeddings.matches
    //   .map((match) => `id: ${match.id}\n${match.metadata?.content}`)
    //   .join('\n---\n');

    const context = similar.services
      .map(
        (match) =>
          `reference: [${match.name}:${match._id}]\ndescription: ${match.description}`,
      )
      .join('\n---\n');

    const res = await this.chain.call({
      location: 'Corfu, Greece',
      context,
      query,
    });

    return {
      services: similar.services,
      response: res.text,
    };
  }
}
