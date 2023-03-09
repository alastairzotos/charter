import { Injectable } from "@nestjs/common";
import { SearchResponseDto } from "dtos";
import { OperatorsService } from "features/operators/operators.service";
import { ServiceSchemaCategoryService } from "features/service-schema-categories/service-schema-categories.service";
import { ServicesService } from "features/services/services.service";

@Injectable()
export class SearchService {
  constructor(
    private readonly operatorsService: OperatorsService,
    private readonly servicesService: ServicesService,
  ) {}

  async searchOperatorsAndServices(term: string): Promise<SearchResponseDto> {
    const trimmedTerm = term.trim();

    if (trimmedTerm.length === 0) {
      return { operators: [], services: [] }
    }

    const [operators, services] = await Promise.all([
      this.operatorsService.searchOperators(trimmedTerm),
      this.servicesService.searchServices(trimmedTerm),
    ])

    return { operators, services }
  }
}
