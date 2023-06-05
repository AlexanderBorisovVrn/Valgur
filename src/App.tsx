import {
  GitHubBanner,
  Refine,
  AuthBindings,
  Authenticated,
} from "@refinedev/core";
import {
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  notificationProvider,
  RefineSnackbarProvider,
  AuthPage,
  //@ts-ignore
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  //@ts-ignore
} from "@refinedev/react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { CredentialResponse } from "interfaces/auth";
import { parseJwt } from "utils/parse-jwt";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
} from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Pages from "pages";
import { useEffect } from "react";
import { FormControlLabel, Checkbox } from "@pankod/refine-mui";
import { useFormContext } from "@pankod/refine-react-hook-form";
const {
  Home,
  Agents,
  AgentProfile,
  AllProperties,
  CreateProperty,
  EditProperty,
  Login,
  MyProfile,
  PropertyDetails,
} = Pages;

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

const RememeberMe = () => {
  const { register } = useFormContext();

  return (
    <FormControlLabel
      sx={{
        span: {
          fontSize: "12px",
          color: "text.secondary",
        },
      }}
      color="secondary"
      control={
        <Checkbox size="small" id="rememberMe" {...register("rememberMe")} />
      }
      label="Remember me"
    />
  );
};

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;
      if (profileObj) {
        const response = await fetch("http://localhost:8090/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        });

        if (response.status === 200) {
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", `${credential}`);
          return {
            success: true,
            redirectTo: "/",
          };
        }
      }
      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    },

    register: async ({ credential }: any) => {
      const response = await fetch(
        "http://localhost:8090/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        }
      );
      const user = response.status === 200 ? await response.json() : null;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.accessToken);
        return {
          success: true,
          redirectTo: "/",
        };
      }
      return {
        success: true,
        redirectTo: "/",
      };
    },

    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {
            success: true,
            redirectTo: "/login",
          };
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () =>
      localStorage.getItem("email")
        ? {
            authenticated: true,
          }
        : {
            authenticated: false,
            error: {
              message: "Check failed",
              name: "Not authenticated",
            },
            logout: true,
            redirectTo: "/login",
          },

    getPermissions: async () => ["admin"],
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }
    },
  };

  return (
    <>
      <BrowserRouter>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles
            styles={{
              html: { WebkitFontSmoothing: "auto" },
              body: {
                overflowX: "hidden",
                width: "100%",
                maxWidth: "100vw",
              },
            }}
          />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("http://localhost:8090/api/v1")}
              notificationProvider={notificationProvider}
              routerProvider={routerProvider}
              authProvider={authProvider}
              resources={[
                {
                  name: "properties",
                  list: '/all-properties',
                  show: '/property-detail',
                  create: '/create-property',
                  edit: '/edit-property',
                },
                {
                  name: "agents",
                  list: Agents,
                  show: AgentProfile,
                  icon: <PeopleAltOutlined />,
                },

                {
                  name: "my-profile",
                  options: {
                    label: "My Profile",
                  },
                  list: MyProfile,
                  icon: <AccountCircleOutlined />,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<NavigateToResource resource="" />} />

                  <Route path="/">
                    <Route index element={<Home />} />
                  </Route>
                </Route>

                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource resource="properties" />
                    </Authenticated>
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        type="login"
                        rememberMe={<RememeberMe />}
                        formProps={{
                          defaultValues: {
                            ...Credential,
                          },
                        }}
                        providers={[
                          {
                            name: "google",
                            label: "Sign in with Google",
                            icon: (
                              <GoogleIcon
                                style={{
                                  fontSize: 24,
                                }}
                              />
                            ),
                          },
                          {
                            name: "github",
                            label: "Sign in with GitHub",
                            icon: (
                              <GitHubIcon
                                style={{
                                  fontSize: 24,
                                }}
                              />
                            ),
                          },
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <AuthPage
                        type="register"
                        providers={[
                          {
                            name: "google",
                            label: "Sign in with Google",
                            icon: (
                              <GoogleIcon
                                style={{
                                  fontSize: 24,
                                }}
                              />
                            ),
                          },
                          {
                            name: "github",
                            label: "Sign in with GitHub",
                            icon: (
                              <GitHubIcon
                                style={{
                                  fontSize: 24,
                                }}
                              />
                            ),
                          },
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/forgot-password"
                    element={<AuthPage type="forgotPassword" />}
                  />
                  <Route
                    path="/update-password"
                    element={<AuthPage type="updatePassword" />}
                  />
                </Route>

                <Route
                  element={
                    <Authenticated>
                      <ThemedLayoutV2>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
