import { ServiceDto } from "./service";

export interface AskAiDto {
  services: ServiceDto[];
  response: string;
}
