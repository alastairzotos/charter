import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { getEnv } from "util/env";

import { APP_NAME } from "util/misc";

interface Props {
  subtitle?: string;
  description: string;
}

export const SeoHead: React.FC<Props> = ({ subtitle, description }) => {
  const title = `${APP_NAME} ${subtitle ? ` | ${subtitle}` : ""}`;
  const router = useRouter();
  const canonical = `${getEnv().appUrl}${router.asPath}`;

  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="canonical" href={canonical} />

      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />

      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={canonical} />
    </Head>
  );
};
