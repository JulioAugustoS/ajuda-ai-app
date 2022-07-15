import React from "react";
import { format } from "date-fns";

import { Typhography } from "../index";
import * as L from "./styles";

interface Props {
  data: {
    id: string;
    comment: string;
    createdAt: string;
    user: {
      name: string;
    };
  };
}

const Comment: React.FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <L.Container>
      <L.ContentText>
        <Typhography size="lg" variant="primary">
          {data?.user?.name}
        </Typhography>
        <Typhography size="sm" variant="gray">
          {format(new Date(data?.createdAt), "dd/MM/yyyy HH:mm")}
        </Typhography>
      </L.ContentText>
      <Typhography variant="gray" style={{ marginTop: 10 }}>
        {data?.comment}
      </Typhography>
    </L.Container>
  );
};

export { Comment };
