import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box, Stack, Typography } from "@pankod/refine-mui";
import { CredentialResponse } from "../interfaces/auth";
import { Button } from "@pankod/refine-mui";
import { authButtonWidth } from "../constants";
import SignUp from "components";
import LoginForm from "components/common/LoginForm";
import PopupBanner from "components/common/PopupBanner";

const buttonStyles = {
  width: authButtonWidth + "px",
  height: "40px",
  marginBottom: "10px",
  backgroundColor: "#1a73e8",
  color: "#fcfcfc",
  fontFamily: "Google Sans,arial,sans-serif",
  "&:hover": { backgroundColor: "#1a73e8dc" },
};

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>({});
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isLoginFormOpened, setisLoginFormOpened] = useState<boolean>(false);

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id:
            "573367553697-es3h6ij12egsn73a6lp96q2p1vt6js83.apps.googleusercontent.com",
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login({credential:res.credential,type:'google'});
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "large",
          width: authButtonWidth + "px",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} />;
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
              sx={buttonStyles}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              onClick={() => {
                setisLoginFormOpened(true);
              }}
              sx={buttonStyles}
            >
              Login
            </Button>
            <GoogleButton />

            <SignUp isOpened={isOpened} close={setIsOpened} />
            <PopupBanner
              isOpened={isLoginFormOpened}
              close={setisLoginFormOpened}
            >
              <LoginForm/>
            </PopupBanner>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
