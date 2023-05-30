
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";

type AutocompleteType<T> = {
  current: T | null;
};

const autocompleteService: AutocompleteType<typeof window.ymaps> = {
  current: null,
};

export function MapSuggest() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<any[]>([]);


  const fetch = React.useMemo(
    () => debounce((request,callback)=>{
      window.ymaps.suggest(request.input).then(res=>callback(res))
    }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;
    if (!autocompleteService.current && window.ymaps) {
      autocompleteService.current = window.ymaps;
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results: any) => {
      if (active) {
        let newOptions: any = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="suggest-location"
      sx={{ width: 300 }}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
       getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.value
      }
      onChange={(event, newValue:any) => {
        setOptions(newValue ? [newValue.value, ...options] : options);
        setValue(newValue.value);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
    />
  );
}
