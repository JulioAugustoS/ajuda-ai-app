import React from "react";
import { format } from "date-fns";

import { Typhography } from "../index";
import * as L from "./styles";

const CardHistory = ({ data }: any) => {
  const renderStatus = (status: string) => {
    const statuses: any = {
      pending: "Pendente",
      confirmed: "Confirmado",
      canceled: "Cancelado",
    };

    return statuses[status];
  };

  const renderStatusColor = (status: string) => {
    const statuses: any = {
      pending: "dark",
      confirmed: "primary",
      canceled: "danger",
    };

    return statuses[status];
  };

  return (
    <L.Container>
      <L.Left>
        <Typhography weight="bold">{data?.ong?.name}</Typhography>
        <Typhography variant="primary">
          {format(new Date(data?.createdAt), "dd/MM/yyyy HH:mm")}
        </Typhography>
      </L.Left>
      <L.Right>
        <Typhography variant="primary" weight="bold">
          {data?.amount}
        </Typhography>
        <Typhography variant={renderStatusColor(data?.status)}>
          {renderStatus(data?.status)}
        </Typhography>
      </L.Right>
    </L.Container>
  );
};

export { CardHistory };
