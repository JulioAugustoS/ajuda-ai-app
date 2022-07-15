import { HTTPClient } from "../../config/request";

export default {
  verifyUser: ({ payload }: any) =>
    HTTPClient.post("/users/verify", { ...payload }),

  verifyOng: ({ payload }: any) =>
    HTTPClient.post("/ongs/verify", { ...payload }),

  loginDonation: ({ payload }: any) =>
    HTTPClient.post("/users/login", { ...payload }),

  loginOng: ({ payload }: any) =>
    HTTPClient.post("/ongs/login", { ...payload }),
};
