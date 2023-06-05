import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Button,
} from "@pankod/refine-mui";
import { IForm } from "interfaces/components";
import { useLogin, useRegister } from "@pankod/refine-core";
import { loadCompressedImg } from "utils/loadCompressedImg";
import Placeholder from "../../assets/avatar-placeholder.svg";
import CustomButton from "./CustomButton";
import { CredentialResponse } from "interfaces/auth";

interface ILogin extends IForm {
  email: string;
  pass: string;
}

const LoginForm = () => {
  const [credentials, setCredentials] = useState<ILogin>({
    email: "",
    pass: "",
  } as ILogin);
  const { mutate: login } = useLogin<CredentialResponse>();

  const onSubmit = (e: React.FormEvent) => {
    login({ credential: credentials,type:'login'});
  };
  return (
    <form onSubmit={onSubmit}>
      <Stack gap={2} flexDirection={{ xs: "column", md: "row" }} mb={2}>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11124d",
              }}
            >
              Enter your password
            </FormHelperText>
            <TextField
              fullWidth
              required
              type="password"
              color="info"
              placeholder="Your Password"
              variant="outlined"
              value={credentials.pass}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCredentials({
                  ...credentials,
                  pass: e.currentTarget.value.toString(),
                });
              }}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",

                fontSize: 16,
                color: "#11124d",
              }}
            >
              Enter your email
            </FormHelperText>
            <TextField
              fullWidth
              required
              sx={{ marginBottom: "15px" }}
              type="email"
              id="outlined-basic"
              color="info"
              placeholder="Your Email"
              variant="outlined"
              value={credentials.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCredentials({
                  ...credentials,
                  email: e.currentTarget.value,
                });
              }}
            />
          </FormControl>
        </Box>
      </Stack>
      <CustomButton
        title="Submit"
        type="submit"
        backgroundColor="#1a73e8"
        color="#fcfcfc"
      />
    </form>
  );
};

export default LoginForm;
