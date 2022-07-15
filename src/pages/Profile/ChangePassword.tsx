import React, { useState } from "react";
import { useTheme } from "styled-components";
import { StatusBar } from "react-native";

import { Button, Header, Input } from "../../components/common";

import * as G from "../../styles/global.style";
import * as L from "./styles";

const ChangeUserPassword = () => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <G.Container style={{ backgroundColor: colors.bg }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header back title="Alterar minha senha" />
      <G.ScrollContent contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Input
          placeholder="Informar senha atual"
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
        />
        <Input
          placeholder="Crie uma nova senha"
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
        />
        <Input
          placeholder="Confirmar a nova senha"
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
        />
      </G.ScrollContent>
      <L.ButtonContent>
        <Button title="Salvar" />
      </L.ButtonContent>
    </G.Container>
  );
};

export default ChangeUserPassword;
