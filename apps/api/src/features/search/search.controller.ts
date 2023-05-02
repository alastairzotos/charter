import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { Instance } from 'decorators/instance.decorator';
import { SearchResponseDto } from 'dtos';
import { SearchService } from 'features/search/search.service';
import { SentryInterceptor } from 'interceptors/sentry.interceptor';

@Controller('search')
@UseInterceptors(SentryInterceptor)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchOperatorsAndServices(
    @Instance() instance: string,
    @Query() { term }: { term: string },
  ): Promise<SearchResponseDto> {
    return await this.searchService.searchOperatorsAndServices(term, instance);
  }
}
