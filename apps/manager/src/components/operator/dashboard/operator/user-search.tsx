import { Autocomplete, SxProps, TextField, Typography } from "@mui/material";
import { LoggedInUserDetails } from "dtos";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";
import { SearchResult } from "ui";

import { useUserState } from "state/users";

interface Props {
  sx?: SxProps;
  value?: LoggedInUserDetails;
  filterUsers?: (user: LoggedInUserDetails) => boolean;
  onSelectUser: (user: LoggedInUserDetails | undefined) => void;
  inputLabel: string;
  inputPlaceholder?: string;
}

export const UserSearch: React.FC<Props> = ({
  sx,
  value,
  filterUsers = () => true,
  onSelectUser,
  inputLabel,
  inputPlaceholder,
}) => {
  const [getUserListStatus, getUsers, userList] = useUserState((s) => [
    s.getUserListStatus,
    s.getUsers,
    s.userList,
  ]);

  useEffect(() => {
    if (!userList) {
      getUsers();
    }
  }, [userList]);

  return (
    <StatusSwitch
      status={getUserListStatus}
      error={<Typography>There was an error loading the users</Typography>}
    >
      {userList && (
        <Autocomplete
          sx={sx}
          disablePortal
          options={userList.filter(filterUsers)}
          getOptionLabel={(opt) => opt.email}
          value={value}
          renderOption={(props, user) => (
            <SearchResult
              key={user._id}
              props={props}
              option={{ type: "user", user }}
            />
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={inputLabel}
              placeholder={inputPlaceholder}
            />
          )}
          onChange={(_, user) => onSelectUser(user || undefined)}
        />
      )}
    </StatusSwitch>
  );
};
