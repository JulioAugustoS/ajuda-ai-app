import React, { useState } from "react";
import {
  StatusBar,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { cpfCnpjMask } from "js-essentials-functions";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "@expo/vector-icons/FontAwesome5";

import { useGeneral } from "../../_context/General";

import { Container, Content, BgImage } from "../../styles/global.style";
import { Button, Typhography, Input, Loading } from "../../components/common";

import bg from "../../assets/images/bg-illustration.png";

const LoginVerifyRegister = () => {
  const { api, loading } = useGeneral();
  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation();
  const { params }: any = useRoute();
  const [state, setState] = useState("");

  const handleVerify = async () => {
    let payloadData = {};

    if (params.type === "donation") {
      payloadData = { email: state };
    } else {
      payloadData = { cnpj: state };
    }

    try {
      await api({
        entity: "authentication",
        action: params.type === "donation" ? "verifyUser" : "verifyOng",
        payload: {
          ...payloadData,
        },
      });

      navigate("LoginPassword", { type: params.type, state });
    } catch (err: any) {
      if (err.response.status === 404) {
        return alert("Usuário não encontrado");
      }

      return alert(err.response.data.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Container style={{ backgroundColor: colors.primary }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <BgImage source={bg} resizeMode="cover" />
        <Content withHeader>
          <Pressable onPress={() => goBack()}>
            <Icon name="angle-left" size={35} color={colors.white} />
          </Pressable>
          <View>
            <Typhography
              size="xxl"
              variant="white"
              weight="bold"
              style={{ marginBottom: 10 }}
            >{`Sua doação ajudará\nmuitas pessoas!`}</Typhography>
            <Typhography variant="white" style={{ marginBottom: 20 }}>
              {params.type === "donation"
                ? `Informe seu email que iremos verificar se você já possui um cadastro.`
                : `Informe o CNPJ da sua ONG que iremos verificar se ela já está cadastrada!`}
            </Typhography>
            <Input
              placeholder={`Informe seu ${
                params.type === "donation" ? "e-mail" : "CNPJ"
              }`}
              onChangeText={(text) => setState(text)}
              value={params.type === "donation" ? state : cpfCnpjMask(state)}
              keyboardType={
                params.type === "donation" ? "email-address" : "number-pad"
              }
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={params.type === "donation" ? 40 : 18}
            />
            <Button
              title="Continuar"
              variant="white"
              onPress={() => handleVerify()}
            />
          </View>
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default LoginVerifyRegister;
