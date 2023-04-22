import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  CircularProgress,
  SxProps,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { urls } from "urls";

import {
  GroupHeader,
  GroupItems,
} from "components/service-search/search-groups";
import {
  OptionType,
  SearchResult,
} from "components/service-search/search-result";
import { useSearchOperatorsAndServices } from "state/search";

interface Props {
  sx?: SxProps;
}

export const ServiceSearch: React.FC<Props> = ({ sx }) => {
  const router = useRouter();

  const [term, setTerm] = useState("");
  const [options, setOptions] = useState<OptionType[]>([]);

  const {
    status,
    request: search,
    value: searchResults,
  } = useSearchOperatorsAndServices();

  const debounceSearch = useCallback(debounce(search, 200), []);

  useEffect(() => {
    debounceSearch(term);
  }, [term]);

  useEffect(() => {
    if (status === "success" && searchResults) {
      setOptions([
        ...searchResults.operators.map(
          (operator) =>
            ({
              type: "operator",
              operator,
            } as OptionType)
        ),

        ...searchResults.services.map(
          (service) =>
            ({
              type: "service",
              service,
            } as OptionType)
        ),
      ]);
    }
  }, [status]);

  const handleSelectOption = (option: OptionType | null) => {
    if (option) {
      if (option.type === "operator") {
        router.push(urls.user.operator(option.operator!));
      } else {
        router.push(urls.user.service(option.service!));
      }
    }
  };

  return (
    <Autocomplete
      sx={{ ...sx }}
      noOptionsText="No results"
      options={options}
      filterOptions={(x) => x}
      getOptionLabel={(option) =>
        (option.type === "operator"
          ? option.operator?.name
          : option.service?.name) || ""
      }
      renderOption={(props, option) => (
        <SearchResult
          key={
            option.type === "operator"
              ? option.operator?._id
              : option.service?._id
          }
          props={props}
          option={option}
        />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          size="small"
          placeholder="Search"
          InputProps={{
            ...params.InputProps,
            sx: { backgroundColor: "#182f69", color: "white" },
            startAdornment: <SearchIcon />,
            endAdornment: (
              <>
                {status === "fetching" ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      groupBy={(option) => option.type}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>
            {params.group === "operator" ? "Operators" : "Services"}
          </GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      onChange={(_, option) => handleSelectOption(option)}
    />
  );
};
