import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box, Stack, Typography } from "@pankod/refine-mui";
import { CredentialResponse } from "../interfaces/google";
console.log(process.env.AI_KEY)

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

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
          size: "large",
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
        backgroundColor: '#FCFCFC'
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

          <Stack
          direction='column'
          alignItems='center'
          mt={4}>
            <Box
              sx={{
                width: "400px",
                height: "400px",
                opacity:'0.7',
                filter:'blur(1px)'
              }}
            >
              <img src='valgur.svg' alt="VALGUR" style={{ width: '100%', height: 'auto' }} />
            </Box>
            <GoogleButton />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
