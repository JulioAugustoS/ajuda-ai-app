import React from "react";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

import { Typhography } from "../index";
import * as L from "./styles";

import bannerOng from "../../../assets/images/banner-ong.png";

const CardOng = ({ ong }: { ong: any }) => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  return (
    <L.Container>
      <L.BtnFavorite>
        <Icon name="heart" size={24} color={colors.white} />
      </L.BtnFavorite>
      <L.Cover
        source={ong?.banner ? { uri: ong?.banner } : bannerOng}
        resizeMode="cover"
      />
      <Typhography size="xl" weight="medium">
        {ong?.name}
      </Typhography>
      <Typhography
        variant="gray"
        style={{ marginBottom: 10 }}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {ong?.description}
      </Typhography>
      <Pressable onPress={() => navigate("OngDetails", { id: ong?.id })}>
        <Typhography variant="primary" weight="medium">
          Fazer Doação
        </Typhography>
      </Pressable>
    </L.Container>
  );
};

export { CardOng };
