import { Autocomplete, TextField, Typography } from "@mui/material";
import { LoggedInUserDetails } from "dtos";
import React, { useEffect } from "react";

import { StatusSwitch } from "components/lib/_core/status-switch";
import { SearchResult } from "components/lib/site/_core/service-search/search-result";
import { useUserState } from "state/users";

interface Props {
  owner?: LoggedInUserDetails;
  onSelectUser: (user: LoggedInUserDetails | undefined) => void;
}

export const UserSearch: React.FC<Props> = ({ owner, onSelectUser }) => {
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
          disablePortal
          options={userList}
          getOptionLabel={(opt) => opt.email}
          value={owner}
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
              label="Owner"
              placeholder="You can set this later if the operator hasn't signed up yet"
            />
          )}
          onChange={(_, user) => onSelectUser(user || undefined)}
        />
      )}
    </StatusSwitch>
  );
};
