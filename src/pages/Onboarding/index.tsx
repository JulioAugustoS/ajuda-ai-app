import React from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { Container, Content, BgImage } from "../../styles/global.style";
import { Button, Typhography } from "../../components/common";

import bg from "../../assets/images/bg-illustration.png";

const Onboarding = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  return (
    <Container style={{ backgroundColor: colors.primary }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <BgImage source={bg} resizeMode="cover" />
      <Content>
        <Typhography
          size="xxl"
          variant="white"
          weight="bold"
          style={{ marginBottom: 10 }}
        >{`Todos nós podemos\nser solidários`}</Typhography>
        <Typhography variant="white" style={{ marginBottom: 20 }}>
          Selecione abaixo se você deseja entrar como doador ou como uma ONG!
        </Typhography>
        <Button
          title="Entrar como Doador"
          variant="white"
          onPress={() => navigate("LoginVerifyEmail", { type: "donation" })}
        />
        <Button
          title="Entrar como ONG"
          variant="white"
          outline
          onPress={() => navigate("LoginVerifyEmail", { type: "ong" })}
        />
      </Content>
    </Container>
  );
};

export default Onboarding;
