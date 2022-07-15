import React, { useState } from "react";
import { Alert } from "react-native";
import { useTheme } from "styled-components";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useGeneral } from "../../_context/General";
import { useRegister } from "../../_context/Register";

import { Header, Typhography, Button, Input } from "../../components/common";
import * as G from "../../styles/global.style";
import * as L from "./styles";

const Password = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const { params }: any = useRoute();
  const { api } = useGeneral();
  const { donationPersonalData, address, resetState } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmePassword] = useState("");

  const handleFinishRegister = async () => {
    if (password !== confirmPassword) {
      return Alert.alert(
        "As senhas não conferem!",
        "Verifique as senhas digitadas e tente novamente."
      );
    }

    const payload =
      params.type === "donation"
        ? {
            ...donationPersonalData,
            password,
            address: {
              ...address,
            },
          }
        : {
            password,
            ...address,
          };

    try {
      const { data } = await api({
        entity: "register",
        action: "registerDonation",
        payload,
      });

      await AsyncStorage.setItem("@token", data.token);
      await AsyncStorage.setItem("@user", JSON.stringify(data.user));

      resetState();
      navigate("Index");
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <G.Container style={{ backgroundColor: colors.bg }}>
      <Header back />
      <G.ScrollContent contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Typhography size="xl" weight="bold" style={{ textAlign: "center" }}>
          Senha de Acesso
        </Typhography>
        <Typhography
          variant="gray"
          style={{ textAlign: "center", marginTop: 9, marginBottom: 24 }}
        >
          Para finalizar você precisa criar uma senha de acesso ao aplicativo!
        </Typhography>
        <Input
          placeholder="Crie uma senha"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          secureTextEntry={!showPassword}
          rightIcon
          rightIconName={!showPassword ? "eye-slash" : "eye"}
          iconPress={() => setShowPassword(!showPassword)}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <Input
          placeholder="Confirme sua senha"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          secureTextEntry={!showPassword}
          rightIcon
          rightIconName={!showPassword ? "eye-slash" : "eye"}
          iconPress={() => setShowPassword(!showPassword)}
          onChangeText={(confirmPassword) =>
            setConfirmePassword(confirmPassword)
          }
          value={confirmPassword}
        />
      </G.ScrollContent>
      <L.ButtonContent>
        <Button
          title="Finalizar"
          disabled={!password || !confirmPassword}
          onPress={() => handleFinishRegister()}
        />
      </L.ButtonContent>
    </G.Container>
  );
};

export default Password;
