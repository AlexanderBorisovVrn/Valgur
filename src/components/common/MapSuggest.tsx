import * as React from "react";
import {
  FormControl,
  FormHelperText,
  Autocomplete,
  TextField,
} from "@pankod/refine-mui";
import { useFormContext } from "@pankod/refine-react-hook-form";
import { debounce } from "@mui/material/utils";

type AutocompleteType<T> = {
  current: T | null;
};

const autocompleteService: AutocompleteType<typeof window.ymaps> = {
  current: null,
};

const RenderField = ({ params }: any) => {
  const { register } = useFormContext();
  return (
    <FormControl fullWidth>
      <FormHelperText
        sx={{
          fontWeight: 500,
          margin: "10px 0",
          fontSize: 16,
          color: "#11124d",
        }}
      >
        Enter Location
      </FormHelperText>
      <TextField
        {...params}
        fullWidth
        required
        type="text"
        id="outlined-basic"
        color="info"
        variant="outlined"
        {...register("location", {
          required: true,
        })}
      />
    </FormControl>
  );
};

export function MapSuggest() {
  const [value, setValue] = React.useState<any[] | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<any[]>([]);

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        window.ymaps.suggest(request.input).then((res) => {
          callback(res);
        });
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
      fullWidth
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value && value[0].label}
      noOptionsText="No locations"
      getOptionLabel={(option) => {
        return typeof option === "string" ? option : option.value;
      }}
      isOptionEqualToValue={(option, value) => {
        return option.value === value.label;
      }}
      onChange={(event, newValue: any) => {
        setOptions(
          newValue ? [{ label: newValue.value, location: "" }] : options
        );
        setValue(newValue ? [{ label: newValue.value, location: "" }] : null);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <RenderField params={params} />}
    />
  );
}
