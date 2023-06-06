import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { CredentialResponse } from "interfaces/auth";
import { parseJwt } from "utils/parse-jwt";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
} from "@mui/icons-material";
import Pages from "pages";
import { Suspense, lazy } from "react";
import Spinner from "components/common/Spinner";
const {
  Home,

  AgentProfile,
  AllProperties,
  CreateProperty,
  EditProperty,
  Login,
  MyProfile,
  PropertyDetails,
} = Pages;
const Agents = lazy(() => import("./pages/agents"));
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

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential, type }: CredentialResponse) => {
      if (!credential) return;
      let response;
      const loginType = type === "google";
      if (!loginType) {
        response = await fetch("http://localhost:8090/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credential),
        });
      } else {
        const googleCredential = parseJwt(credential);
        response = await fetch("http://localhost:8090/api/v1/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: googleCredential.name,
            email: googleCredential.email,
            avatar: googleCredential.picture,
            pass: "google",
          }),
        });
      }

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        return Promise.reject(response.status);
      }
      localStorage.setItem("token", `${credential}`);
      return Promise.resolve();
    },

    register: async ({ credential }) => {
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

      if (response.status !== 200) {
        return Promise.reject();
      }
      const user = await response.json();
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.accessToken);
      }

      return Promise.resolve();
    },

    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
      return Promise.reject();
    },
  };
  return (
    <>
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
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            resources={[
              {
                name: "properties",
                list: AllProperties,
                show: PropertyDetails,
                create: CreateProperty,
                edit: EditProperty,
              },
              {
                name: "agents",
                list: () => (
                  <Suspense fallback={<div>Loading</div>}>
                    <Agents />
                  </Suspense>
                ),
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
            Title={Title}
            Sider={Sider}
            Layout={Layout}
            Header={Header}
            routerProvider={routerProvider}
            authProvider={authProvider}
            LoginPage={Login}
            DashboardPage={Home}
          />
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </>
  );
}

export default App;
