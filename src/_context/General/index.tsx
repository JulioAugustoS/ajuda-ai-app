import React, { useCallback, createContext, useContext, useState } from "react";
import * as apiMethods from "../../services";

type ApiParams = {
  entity: string;
  action: string;
  payload?: any;
  query?: string;
  params?: any;
  headers?: any;
};

export type GeneralContextType = {
  api: ({
    entity,
    action,
    payload,
    query,
    params,
    headers,
  }: ApiParams) => Promise<{ data: any }>;
  loading: boolean;
};

const GeneralContext = createContext<GeneralContextType>(
  {} as GeneralContextType
);

const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const api = useCallback(
    async ({
      entity,
      action,
      payload = {},
      query,
      params,
      headers = {},
    }: ApiParams) => {
      setLoading(true);

      try {
        // eslint-disable-next-line
        // @ts-ignore
        const response = await apiMethods[entity][action](
          { payload, query, params },
          headers
        );

        return response;
      } catch (error: any) {
        console.info("API Error: ", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const value = {
    api,
    loading,
  };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};

const useGeneral = () => {
  const context = useContext(GeneralContext);

  if (!context)
    throw new Error("useGeneral must be used within a GeneralProvider");

  return context;
};

export { GeneralProvider, useGeneral };
