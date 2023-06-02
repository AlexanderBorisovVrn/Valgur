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
type FormVisible = {
  closeLoginForm: (t: boolean) => void;
  isLoginFormOpened: boolean;
};

const LoginForm = ({ closeLoginForm, isLoginFormOpened }: FormVisible) => {
  const [credentials, setCredentials] = useState<ILogin>({
    email: "",
    pass: "",
  } as ILogin);
  const { mutate: register } = useRegister<CredentialResponse>();

  const onSubmit = (e: React.FormEvent) => {
    register({ credential: credentials });
    closeLoginForm(false);
  };

  return isLoginFormOpened ? (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
        backgroundColor: "#111111",
      }}
    >
      <Box
        position="relative"
        mt={2.5}
        borderRadius="16px"
        padding="20px"
        display="flex"
        flexDirection="column"
        bgcolor="#fcfcfc"
        width={{ xs: "100%", md: "70%" }}
      >
        {/* close button */}

        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize={25} fontWeight={700} color="#42d2d">
            Login
          </Typography>
          <Button
            title="Close"
            onClick={() => closeLoginForm(false)}
            sx={{
              display: "flex",
              positon: "absolute",
              justifyContent: "center",
              alignItems: "center",
              verticalAlign: "middle",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              color: "#2c2c2cdc",
              fontSize: "24px",
            }}
          >
            &#128473;
          </Button>
        </Stack>
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
      </Box>
    </Box>
  ) : null;
};

export default LoginForm;
