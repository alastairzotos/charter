import { useRouter } from "next/router";
import { urls } from "urls";

export default function OperatorServicesPage() {
  const router = useRouter();

  router.push(urls.operators.dashboard());

  return null;
}
