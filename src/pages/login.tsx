import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box, Stack, Typography } from "@pankod/refine-mui";
import { CredentialResponse } from "../interfaces/auth";
import { Button } from "@pankod/refine-mui";
import { authButtonWidth } from "../constants";
import { useNavigate } from "@pankod/refine-react-router-v6";
import SignUp from "components";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  
  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<any>(null);
    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_AI_KEY as string,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          width: authButtonWidth + "px",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} id="my-google-signin-button" />;
  };

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: "#dddddd",
        position: "relative",
      }}
    >
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack direction="column" alignItems="center" mt={4}>
            <Box
              sx={{
                width: "400px",
                height: "400px",
                opacity: "0.7",
                filter: "blur(1px)",
              }}
            >
              <img
                src="valgur.svg"
                alt="VALGUR"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
            <Button
              type="button"
              onClick={() => setIsOpened(!isOpened)}
              sx={{
                width: authButtonWidth + "px",
                height: "40px",
                marginBottom: "10px",
                backgroundColor: "#1a73e8",
                color: "#fcfcfc",
                fontFamily: "Google Sans,arial,sans-serif",
                "&:hover": { backgroundColor: "#1a73e8dc" },
              }}
            >
              Sign Up
            </Button>
            <GoogleButton />

            <SignUp isOpened={isOpened} close={setIsOpened} />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
