// ** Axios import
import axios from "axios";

// ** Config import
import { jwtConfig } from "./jwtDefaultConfig";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

axiosClient.interceptors.request.use(
  async (config) => {
    const jwtToken = localStorage.getItem(jwtConfig.storageTokenKeyName);
    if (jwtToken && config.headers) {
      config.headers.Authorization = `${jwtConfig.tokenType} ${jwtToken}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error.response.data.errors[0].message);
  }
);
axiosClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    if (error.response) {
      const { code } = error;
      const config = error.config;
      if (error.response.status === 401) {
        return authService
          .refreshToken()
          .then((rs) => {
            console.log(rs);
            if (rs.data) {
              const { jwtToken, accountInfo, refreshToken } = rs.data.data;
              const payload = {
                userData: accountInfo,
                accessToken: jwtToken,
                refreshToken: refreshToken,
              };
              config.headers = {
                ...config.headers,
                Authorization: `${jwtConfig.tokenType} ${jwtToken}`,
              };
              authService.setLocalStorageWhenLogin(payload);
              console.log(config);
              return axiosClient(config);
            } else {
              console.log("loi2");
              authService.removeLocalStorageWhenLogout();
              window.location.href = jwtConfig.logoutEndpoint;
            }
          })
          .catch(() => {
            console.log("loi1");
            authService.removeLocalStorageWhenLogout();
            window.location.href = jwtConfig.logoutEndpoint;
          });
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
