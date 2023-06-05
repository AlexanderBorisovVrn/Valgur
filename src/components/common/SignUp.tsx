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

interface ISignUp extends IForm {
  name: string;
  avatar: string;
  email: string;
  pass: string;
}

const SignUp = () => {
  const [credentials, setCredentials] = useState<ISignUp>({
    email: "",
    name: "",
    avatar: "",
    pass: "",
  } as ISignUp);
  const { mutate: register } = useRegister<CredentialResponse>();

  const setAvatar = (img: string) => {
    setCredentials({
      ...credentials,
      avatar: img,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    register({ credential: credentials });
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
              Enter yout name
            </FormHelperText>
            <TextField
              fullWidth
              required
              type="text"
              color="info"
              variant="outlined"
              placeholder="Your Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCredentials({
                  ...credentials,
                  name: e.currentTarget.value,
                });
              }}
              value={credentials.name}
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

        <Box //avatar box
          display="flex"
          flexDirection="column"
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="center"
          width={{ xs: "50%", md: "30%" }}
          borderRadius="10px"
        >
          <Box
            width={{ xs: "50%", md: "70%" }}
            height={{ xs: "30%", md: "50%" }}
          >
            <img
              width="100%"
              style={{ objectFit: "fill", borderRadius: "10px" }}
              height="100%"
              alt="Avatar"
              src={credentials.avatar || Placeholder}
            />
          </Box>

          <Button
            component="label"
            sx={{
              width: "70%",
              marginTop: "15px",
              color: "#fcfcfc",
              textTransform: "capitalize",
              textAlign: "center",
              fontSize: 16,
              backgroundColor: "#1a73e8",
              "&:hover": {
                backgroundColor: "#1a73e8eb",
              },
            }}
          >
            Choose your avatar
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => {
                //@ts-ignore
                loadCompressedImg(e.target.files[0], (img) => {
                  setAvatar(img);
                });
              }}
            />
          </Button>
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

export default SignUp;
