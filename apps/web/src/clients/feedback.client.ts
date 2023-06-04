import { FeedbackNoId } from "dtos";

import { httpClient } from "clients/http.client";

export const addFeedback = async (feedback: FeedbackNoId) => {
  await httpClient.post<FeedbackNoId>("/feedback", feedback);
};
