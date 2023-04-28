import { useRouter } from "next/router";
import { urls } from "urls";

export default function OperatorServicesPage() {
  const router = useRouter();

  router.push(urls.admin.operator(router.query.operatorId as string));

  return null;
}
