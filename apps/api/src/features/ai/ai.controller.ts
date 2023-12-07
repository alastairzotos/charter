import { Controller, Get, Query } from '@nestjs/common';
import { AiService } from 'features/ai/ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('search')
  async search(@Query('query') query: string) {
    return await this.aiService.search(query);
  }

  @Get('ask')
  async ask(@Query('query') query: string) {
    return await this.aiService.ask(query);
  }
}
