import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { urls } from "urls";

import { useUserState } from "state/users";

export const DeleteAccountButton: React.FC = () => {
  const router = useRouter();
  const [deleteStatus, deleteUser] = useUserState((s) => [
    s.deleteUserStatus,
    s.deleteUser,
  ]);

  const handleDeleteClick = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      if (await deleteUser()) {
        router.push(urls.home());
      }
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="warning"
        onClick={handleDeleteClick}
        disabled={deleteStatus === "fetching"}
      >
        Delete my account
      </Button>

      {deleteStatus === "error" && (
        <Typography>
          There was an error deleting your account. Please try again later.
        </Typography>
      )}
    </>
  );
};
