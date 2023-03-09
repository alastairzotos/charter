import { Controller, Get, Query } from "@nestjs/common";
import { SearchResponseDto } from "dtos";
import { SearchService } from "features/search/search.service";

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchOperatorsAndServices(@Query() { term }: { term: string }): Promise<SearchResponseDto> {
    return await this.searchService.searchOperatorsAndServices(term)
  }
}
