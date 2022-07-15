import { HTTPClient } from "../../config/request";

export default {
  sendDonation: ({ payload }: any) =>
    HTTPClient.post("/donations", { ...payload }),
};
