import { NextPage } from "next";

import { UserLayoutContainer } from "components/_core/user-layout-container";
import { FeedbackForm } from "components/feedback/feedback-form";

const FeedbackPage: NextPage = () => {
  return (
    <UserLayoutContainer>
      <FeedbackForm />
    </UserLayoutContainer>
  );
};

FeedbackPage.getInitialProps = () => ({});

export default FeedbackPage;
