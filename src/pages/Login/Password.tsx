import React, { useState } from "react";
import {
  StatusBar,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "@expo/vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useGeneral } from "../../_context/General";
import { useAuth } from "../../_context/Auth";

import { Container, Content, BgImage } from "../../styles/global.style";
import { Button, Typhography, Input, Loading } from "../../components/common";

import bg from "../../assets/images/bg-illustration.png";

const LoginPassword = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  const { api, loading } = useGeneral();
  const { setIsAuth, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    let payloadData = {};

    if (params.type === "donation") {
      payloadData = { email: params.state, password };
    } else {
      payloadData = { cnpj: params.state, password };
    }

    try {
      const { data } = await api({
        entity: "authentication",
        action: params.type === "donation" ? "loginDonation" : "loginOng",
        payload: { ...payloadData },
      });

      await AsyncStorage.setItem("@token", data.token);
      await AsyncStorage.setItem("@user", JSON.stringify(data.user));

      setIsAuth(true);
      setUser(data.user);
    } catch (err: any) {
      Alert.alert("Não foi possivel fazer login!", err.response.data.error);
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
              Informe sua senha para continuar.
            </Typhography>
            <Input
              placeholder="Informe sua senha"
              secureTextEntry={!showPassword}
              rightIcon
              rightIconName={!showPassword ? "eye-slash" : "eye"}
              iconPress={() => setShowPassword(!showPassword)}
              onChangeText={(pass) => setPassword(pass)}
              value={password}
            />
            <Button
              title="Continuar"
              variant="white"
              onPress={() => handleLogin()}
            />
          </View>
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default LoginPassword;
