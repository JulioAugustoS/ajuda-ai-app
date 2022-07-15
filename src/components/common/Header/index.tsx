import React from "react";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

import { Typhography } from "../index";

import * as L from "./styles";

const Header = ({
  back,
  title,
  rightComponent,
}: {
  back?: boolean;
  title?: string;
  rightComponent?: any;
}) => {
  const { goBack } = useNavigation();

  return (
    <L.Container>
      {back && (
        <Pressable onPress={() => goBack()}>
          <L.Left>
            <Icon name="chevron-left" size={24} color="#000" />
          </L.Left>
        </Pressable>
      )}
      <L.Center>
        <Typhography variant="dark" weight="medium">
          {title}
        </Typhography>
      </L.Center>
      <L.Right>{rightComponent}</L.Right>
    </L.Container>
  );
};

export { Header };
