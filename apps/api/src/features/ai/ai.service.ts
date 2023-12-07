import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';

import { EnvService } from 'environment/environment.service';
import { AiRepository } from 'features/ai/ai.repository';
import { Service } from 'schemas/service.schema';
import { AskAiDto } from 'dtos';

const FIND_RESULTS = 8;

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
        You may recommend one or more services depending on their relevance.
        If you recommend multiple services put them in a list format.
        All you can do it make recommendations. You can't do anything on behalf of the user, such as make bookings or contact service operators.
        Don't ask for follow-up questions or help. The user cannot reply to you.
        When mentioning a service you must provide its name and id in the following format: [<Service name> <service id>].
          The service name and service id MUST be inside the square brackets.
          For example, if "Service A" has id "123" you must say "[Service A 123]".
          You must not mention the service name outside the square brackets.
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

    // const context = similar.services
    //   .map(match => `id: ${match._id}\nname: ${match.name}\ndescription: ${match.description}`)
    //   .join('\n---\n');

    const context = similar.embeddings.matches
      .map((match) => `id: ${match.id}\n${match.metadata?.content}`)
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
