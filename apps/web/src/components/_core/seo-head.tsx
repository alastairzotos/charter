import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { APP_NAME } from "util/misc";

interface Props {
  subtitle?: string;
  description: string;
}

export const SeoHead: React.FC<Props> = ({ subtitle, description }) => {
  const title = `${APP_NAME} ${subtitle ? ` | ${subtitle}` : ""}`;
  const router = useRouter();
  const canonical = `https://www.corfutravelguide.net${router.asPath}`;

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
      <meta
        name="og:image"
        content={
          "https://img1.wsimg.com/isteam/ip/34c8b080-6494-4607-a807-d4e016766e97/You%20can%20now%20book%20and%20plan%20you%20trips%2C%20t-b7446e2.jpg"
        }
      />
    </Head>
  );
};
