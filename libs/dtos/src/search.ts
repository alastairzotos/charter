import { OperatorDto } from "./operator";
import { ServiceDto } from "./service";

export interface SearchResponseDto {
  operators: OperatorDto[];
  services: ServiceDto[];
}
