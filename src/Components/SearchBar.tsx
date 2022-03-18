import * as React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import "../Style/SearchBar.css";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import useLogic from "../Hooks/SearchBarLogic";

export default function CustomizedInputBase() {
  const { suggestions, onChange, onClick } = useLogic();

  return (
    <div className='container'>
      <Stack
        spacing={2}
        sx={{ width: 300 }}
        style={{ backgroundColor: "white" }}>
        <Autocomplete
          freeSolo
          onClose={(event: React.SyntheticEvent, reason: string) =>
            onClick(event, reason)
          }
          autoSelect
          disableClearable
          options={suggestions.map(
            (suggestion) =>
              `${suggestion.city},  ${suggestion.country} - ${suggestion.Key}`
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={onChange}
              label='Search input'
              InputProps={{
                ...params.InputProps,
                type: "search",
                endAdornment: (
                  <IconButton sx={{ p: "0.1rem" }} aria-label='search'>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          )}
        />
      </Stack>
    </div>
  );
}
