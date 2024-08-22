import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});
axiosClient.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // config.headers["language"] = localStorage.getItem("lang");
    // config.headers["Accept"] = "application/json";
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
  // (error) => Promise.reject(error)
);
axiosClient.interceptors.response.use(
  (res) => {
    return res.data;
  },
  function (err) {
    return Promise.reject(err);
  }
);
export default axiosClient;
