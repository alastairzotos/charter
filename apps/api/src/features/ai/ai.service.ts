import { Injectable } from '@nestjs/common';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

import { EnvService } from 'environment/environment.service';
import { AiRepository } from 'features/ai/ai.repository';
import { Service } from 'schemas/service.schema';

const FIND_RESULTS = 8;

@Injectable()
export class AiService {
  private embeddings: OpenAIEmbeddings;

  constructor(
    private readonly envService: EnvService,
    private readonly aiRepo: AiRepository,
  ) {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: this.envService.get().openAiApiKey,
    });

    this.aiRepo.connect(this.envService.get().pineconeApiKey);
  }

  async search(query: string): Promise<Service[]> {
    const vector = await this.embeddings.embedQuery(query);

    return await this.aiRepo.findSimilar(vector, FIND_RESULTS);
  }
}
