import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HTTPClient = axios.create({
  baseURL: "https://483d-131-100-130-4.ngrok.io",
});

HTTPClient.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem("@token");

    config.headers.common.Authorization = token
      ? `Bearer ${token}`
      : `Basic YWRtaW46YWRtaW4=`;

    return config;
  },
  (response) => Promise.reject(response)
);

export { HTTPClient };
