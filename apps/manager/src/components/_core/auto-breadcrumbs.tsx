import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import { getBookingById } from "clients/bookings.client";
import { getOperator } from "clients/operators.client";
import { getServiceSchemaCategoryById } from "clients/service-schema-categories.client";
import { getServiceSchemaById } from "clients/service-schemas.client";
import { getService } from "clients/services.client";
import {
  BreadcrumbLink,
  Breadcrumbs,
  LOADING_BREADCRUMB,
} from "components/_core/breadcrumbs";
import { capitalise } from "util/misc";

const extractKey = (key: string) => key.substring(1, key.length - 1);
const removeHyphens = (text: string) => text.split("-").join(" ");

const paramResolvers: Record<string, (id: string) => Promise<string>> = {
  "[serviceId]": async (id) => (await getService(id)).name,
  "[operatorId]": async (id) => (await getOperator(id)).name,
  "[scId]": async (id) => (await getServiceSchemaById(id)).name,
  "[sccId]": async (id) => (await getServiceSchemaCategoryById(id)).name,
  "[bookingId]": async (id) => (await getBookingById(id)).service.name,
};

const buildBreadcrumbsFromParts = async (
  parts: string[],
  params: Record<string, string>,
  resolveTitle: (part: string, id: string) => Promise<string>
): Promise<BreadcrumbLink[]> => {
  const links: BreadcrumbLink[] = [];

  const linkBuild = [];

  for (const part of parts) {
    let title: string | undefined;

    if (part in paramResolvers) {
      const key = extractKey(part);
      const id = params[key];
      linkBuild.push(id);
      title = await resolveTitle(part, id);
    } else {
      linkBuild.push(part);
    }

    links.push({
      title: title || capitalise(removeHyphens(part)),
      href: "/" + linkBuild.join("/"),
    });
  }

  return links;
};

const buildBreadcrumbsFromPartsWithLinks = async (
  parts: string[],
  params: Record<string, string>
): Promise<BreadcrumbLink[]> =>
  buildBreadcrumbsFromParts(parts, params, async (part, id) =>
    paramResolvers[part](id)
  );

export const AutoBreadcrumbs: React.FC = () => {
  const router = useRouter();

  const path = router.pathname.substring(1);
  const parts = path.split("/");

  const [crumbs, setCrumbs] = useState<BreadcrumbLink[]>([]);

  useEffect(() => {
    const params = router.query as Record<string, string>;

    buildBreadcrumbsFromParts(parts, params, async () => LOADING_BREADCRUMB)
      .then(setCrumbs)
      .then(() => buildBreadcrumbsFromPartsWithLinks(parts, params))
      .then(setCrumbs);
  }, [router.route]);

  if (!crumbs.length) {
    return null;
  }

  return (
    <Breadcrumbs
      list={crumbs.slice(0, crumbs.length - 1)}
      current={crumbs[crumbs.length - 1].title}
    />
  );
};
