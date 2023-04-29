import { UserDetails, UserRole } from "dtos";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";
import { urls } from "urls";

import { useUserState } from "state/users";

interface Props {
  role: UserRole;
}

const shouldRedirect = (
  role: UserRole,
  initialised: boolean,
  user: UserDetails | undefined
) => {
  if (!initialised) {
    return false;
  }

  if (user?.role === "super-admin") {
    return false;
  }

  return !user || user?.role !== role;
};

export const RoleRoute: React.FC<PropsWithChildren<Props>> = ({
  children,
  role,
}) => {
  const router = useRouter();
  const [initialised, user] = useUserState((s) => [
    s.initialised,
    s.loggedInUser,
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (shouldRedirect(role, initialised, user)) {
        router.push(urls.home());
      }
    }
  }, [user?.role]);

  return <>{children}</>;
};
