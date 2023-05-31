import { Refine, AuthProvider } from "@pankod/refine-core";
import { YMaps } from "@pbe/react-yandex-maps";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";
import { MapSuggest } from "components/common/MapSuggest";

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

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      if (!credential) return;
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
        } else {
          return Promise.reject();
        }
        localStorage.setItem("token", `${credential}`);
       return Promise.resolve();
      }
    },
    register: ({ credential }) => {
      fetch("http://localhost:8090/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      })
        .then((res) => {
          if (res.status !== 200) {
            throw res.status;
          } else {
            return res.json();
          }
        })
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", user.accessToken);
          return {
            success: true,
            redirectTo: "/",
          };
        })
        .catch((e) => console.log("Response status " + e + "."));
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
    },
  };
  return (
    <>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <YMaps>
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
                  list: Agents,
                  show: AgentProfile,
                  icon: <PeopleAltOutlined />,
                },
                {
                  name: "reviews",
                  list: MapSuggest,
                  icon: <StarOutlineRounded />,
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
        </YMaps>
      </ColorModeContextProvider>
    </>
  );
}

export default App;
