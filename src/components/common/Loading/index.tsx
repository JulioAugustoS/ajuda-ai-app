import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { Typhography } from "../index";

import * as L from "./styles";

const Loading = () => {
  const { colors } = useTheme();

  return (
    <L.Container>
      <ActivityIndicator size="large" color={colors.white} />
      <Typhography
        size="xxl"
        weight="bold"
        variant="white"
        style={{ marginTop: 20 }}
      >
        Aguarde...
      </Typhography>
    </L.Container>
  );
};

export { Loading };
