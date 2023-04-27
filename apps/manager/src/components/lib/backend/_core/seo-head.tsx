import Head from "next/head";
import React from "react";

import { APP_NAME } from "util/misc";

interface Props {
  subtitle?: string;
  description: string;
}

export const SeoHead: React.FC<Props> = ({ subtitle, description }) => {
  const title = `${APP_NAME} ${subtitle ? ` | ${subtitle}` : ""}`;

  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
    </Head>
  );
};
