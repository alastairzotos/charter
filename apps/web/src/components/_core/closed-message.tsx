import Link from "next/link";
import React from "react";

import { IS_CLOSED_FOR_WINTER } from "util/misc";

export const ClosedMessage: React.FC = () => {
  if (IS_CLOSED_FOR_WINTER) {
    return (
      <>
        Our on-line booking site will be live early 2024, where you can book
        your trips, tours, activities, boat hire and more all around the island.
        Please follow our Facebook page{" "}
        <Link href="https://www.facebook.com/CorfuTourist" target="_blank">
          Corfu Tourist
        </Link>{" "}
        for updates. Visit the app store and download our FREE app Corfu Travel
        Guide to explore Corfu from the comfort of your home and start to plan
        where to go and what to see, along with getting an insight to the
        island.
      </>
    );
  }

  return null;
};
