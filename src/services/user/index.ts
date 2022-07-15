import { HTTPClient } from "../../config/request";

export default {
  updateUser: ({ payload, params }: any) =>
    HTTPClient.put(`/users/${params.id}`, { ...payload }),
};
