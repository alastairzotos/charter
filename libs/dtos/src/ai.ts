import { ServiceDto } from "./service";

export interface AiTokenResponse {
  type: "token";
  token: string;
}

export interface AiServiceRefResponse {
  type: "service-ref";
  serviceRef: ServiceDto;
}

export interface AiStopResponse {
  type: "stop";
}

export type AiContentToken = AiTokenResponse | AiServiceRefResponse;

export type AiResponse = AiContentToken | AiStopResponse;
