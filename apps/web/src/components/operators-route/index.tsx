import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";
import { urls } from "urls";

import { useUserState } from "state/users";

export const OperatorsRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const user = useUserState((s) => s.loggedInUser);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user?.role !== "admin" && user?.role !== "operator") {
        router.push(urls.home());
      }
    }
  }, [user?.role]);

  return <>{children}</>;
};
