import { createQuery } from "@bitmetro/create-query";

import { addFeedback } from "clients/feedback.client";

export const useAddFeedback = createQuery(addFeedback);
