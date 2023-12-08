import { ServiceDto } from "./service";

export interface AiResponse {
  services?: ServiceDto[];
  token?: string;
  stop?: true;
}
