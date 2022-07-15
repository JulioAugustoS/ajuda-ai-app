import { HTTPClient } from "../../config/request";

export default {
  registerDonation: ({ payload }: any) =>
    HTTPClient.post("/users", { ...payload }),
};
