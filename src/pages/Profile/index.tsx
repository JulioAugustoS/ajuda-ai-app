import React, { useEffect, useState } from "react";
import { StatusBar, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { cpfCnpjMask, telephoneMask } from "js-essentials-functions";

import { useGeneral } from "../../_context/General";
import { useAuth } from "../../_context/Auth";
import useFetch, { useSWRConfig } from "../../hooks/useFetch";

import { Typhography, Button, Input, Loading } from "../../components/common";

import * as G from "../../styles/global.style";
import * as L from "./styles";

const Profile = () => {
  const { user, setUser } = useAuth();
  const { api } = useGeneral();
  const { colors } = useTheme();
  const { navigate, goBack } = useNavigation();
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const { data, error } = useFetch(`/users/${user.id}`);

  console.log(user);

  if (error) {
    Alert.alert(
      "Ocorreu um erro!",
      "Não foi possível carregar os dados do usuário.",
      [{ text: "Ok", onPress: () => goBack() }]
    );
  }

  console.log(loading);

  useEffect(() => {
    if (data) {
      setUser({ ...user, ...data });
    }
  }, [data]);

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      await api({
        entity: "user",
        action: "updateUser",
        params: {
          id: user.id,
        },
        payload: {
          email: user?.email,
          cellphone: user?.cellphone,
        },
      });

      mutate(`/users/${user.id}`);
    } catch (error) {
      Alert.alert(
        "Ocorreu um erro!",
        "Não foi possível atualizar os dados do usuário.",
        [{ text: "Ok", onPress: () => {} }]
      );
    } finally {
      setLoading(false);
    }
  };

  if (!data || loading) return <Loading />;

  return (
    <G.Container style={{ backgroundColor: colors.bg }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <G.ScrollContent contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Typhography
          size="xxl"
          weight="bold"
          variant="primary"
          style={{ marginTop: 67, marginBottom: 40 }}
        >
          {user?.name}
        </Typhography>
        <Input
          placeholder="Informe seu e-mail"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={60}
          onChangeText={(email) => setUser({ ...user, email })}
          value={user?.email}
        />
        <Input
          placeholder="31/03/1984"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          editable={false}
          rightIcon
          rightIconName="lock"
          rightIconSize={20}
          rightIconColor={colors.gray}
          value={user?.personalData?.birthdate}
        />
        <Input
          placeholder="000.000.000-00"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          editable={false}
          rightIcon
          rightIconName="lock"
          rightIconSize={20}
          rightIconColor={colors.gray}
          value={cpfCnpjMask(user?.personalData?.cpf || "")}
        />
        <Input
          placeholder="(11) 95664-4334"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          keyboardType="number-pad"
          maxLength={15}
          onChangeText={(cellphone) =>
            setUser({
              ...user,
              personalData: { ...user?.personalData, cellphone },
            })
          }
          value={telephoneMask(user?.personalData?.cellphone || "")}
        />
      </G.ScrollContent>
      <TouchableOpacity onPress={() => navigate("ChangeUserPassword")}>
        <Typhography
          size="md"
          variant="primary"
          style={{ textAlign: "center" }}
        >
          Alterar minha senha
        </Typhography>
      </TouchableOpacity>
      <L.ButtonContent>
        <Button title="Salvar" onPress={() => handleUpdateUser()} />
      </L.ButtonContent>
    </G.Container>
  );
};

export default Profile;
