import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pinecone, Index, RecordMetadata } from '@pinecone-database/pinecone';
import { Service } from 'schemas/service.schema';

@Injectable()
export class AiRepository {
  private index: Index<RecordMetadata>;

  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
  ) {}

  async connect(apiKey: string) {
    const pinecone = new Pinecone({
      apiKey,
      environment: 'gcp-starter',
    });

    this.index = pinecone.index('charter');
  }

  async findSimilar(
    vector: number[],
    topK: number,
    includeMetadata: boolean = false,
  ) {
    const embeddings = await this.index.query({
      vector,
      topK,
      includeMetadata,
    });

    const ids = embeddings.matches.map((match) => match.id);

    const services = await this.serviceModel
      .find({ _id: { $in: ids } })
      .populate('operator');

    return {
      embeddings,
      services,
    };
  }
}
