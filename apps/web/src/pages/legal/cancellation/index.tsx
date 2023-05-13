import { NextPage } from "next";
import React from "react";

import { UserLayoutContainer } from "components/_core/user-layout-container";

const CancellationPage: NextPage = () => {
  return (
    <UserLayoutContainer>
      <h3>Cancellation Policy</h3>

      <p>
        There are different cancellation policies, depending on the specific
        tour or activity you choose. Please be sure to verify which one is
        applicable to your chosen experience prior to confirming your booking.
        This information can be found in every experience we offer under the{" "}
        <strong>"what you need to know"</strong>
      </p>

      <p>
        If you have an existing booking, go to the booking you made and use the
        supplier's email address to send them a request to cancel or make a
        change to your booking.
      </p>

      <h3>Free Cancellation</h3>

      <p>
        For a full refund, you must cancel at least 24 hours* before the
        experience's start time.{" "}
      </p>

      <p>
        If you cancel less than 24 hours* before the experience's start time,
        the amount you paid will not be refunded.{" "}
      </p>

      <p>
        Any changes made less than 24 hours* before the experience's start time
        will not be accepted.{" "}
      </p>

      <h3>Non-refundable </h3>

      <p>
        These experiences are non-refundable and cannot be changed for any
        reason. If you cancel or ask for an amendment, the amount paid will not
        be refunded.{" "}
      </p>

      <h3>Moderate</h3>

      <p>
        For a full refund, you must cancel at least 4 full days* before the
        experience's start time. If you cancel less than 3 full days* before the
        experience's start time, the amount you paid will not be refunded.{" "}
      </p>

      <p>
        Any changes made less than 3 full days* before the experience's start
        time will not be accepted.{" "}
      </p>

      <h3>Strict </h3>

      <p>
        For a full refund, you must cancel at least 7 full days* before the
        experience's start time.{" "}
      </p>

      <p>
        Any changes made less than 3 full days* before the experience's start
        time will not be accepted.{" "}
      </p>

      <p>
        For a 50% refund, you must cancel 3-6 full days* before the experience's
        start time.{" "}
      </p>

      <p>
        If you cancel less than 2 full days* before the experience's start time,
        the amount you paid will not be refunded.{" "}
      </p>

      <h3>Custom </h3>

      <p>
        The specific terms and conditions for an experience with a custom
        cancellation policy can be found on the experience page within the
        Cancellation Policy section.{" "}
      </p>

      <p>
        <strong>
          NOTE - Only the face value for the Experience will be refunded.
        </strong>
      </p>

      <p>*Cut-off times are based on the experience's local time</p>
    </UserLayoutContainer>
  );
};

export default CancellationPage;
