import { useRouter } from "next/router";
import { useEffect } from "react";
import { urls } from "urls";

export default function OperatorServicesPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.push(urls.admin.operator(router.query.operatorId as string));
    }
  });

  return null;
}
