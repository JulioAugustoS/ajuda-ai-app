import useSWR, { useSWRConfig } from "swr";
import { HTTPClient } from "../config/request";

export { useSWRConfig };

export default (url: string | null) => {
  const { data, error, isValidating } = useSWR(
    url,
    async (url: string) => {
      const response = await HTTPClient.get(url);

      return response.data;
    },
    { revalidateOnReconnect: true, revalidateOnFocus: false }
  );

  return { data, error, isValidating };
};
