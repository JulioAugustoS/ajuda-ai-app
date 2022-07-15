import { HTTPClient } from "../../config/request";

export default {
  saveComment: ({ payload }: any) =>
    HTTPClient.post("/comments", { ...payload }),
};
