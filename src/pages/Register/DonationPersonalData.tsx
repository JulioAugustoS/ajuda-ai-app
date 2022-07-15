import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { telephoneMask, cpfCnpjMask, dateMask } from "js-essentials-functions";

import { Header, Typhography, Input, Button } from "../../components/common";
import * as G from "../../styles/global.style";
import * as L from "./styles";

import { useRegister } from "../../_context/Register";

const DonationPersonalData = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const { donationPersonalData, setDonationPersonalData } = useRegister();

  const verifyFields = () => {
    if (
      donationPersonalData.name &&
      donationPersonalData.email &&
      donationPersonalData.cellphone &&
      donationPersonalData.birthdate &&
      donationPersonalData.cpf
    ) {
      return false;
    }
    return true;
  };

  return (
    <G.Container style={{ backgroundColor: colors.bg }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header back />
      <G.ScrollContent contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Typhography size="xl" weight="bold" style={{ textAlign: "center" }}>
          Novo usuário?
        </Typhography>
        <Typhography
          variant="gray"
          style={{ textAlign: "center", marginTop: 9, marginBottom: 24 }}
        >
          Informe os dados abaixo para continuar!
        </Typhography>
        <Input
          placeholder="Nome Completo"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          maxLength={60}
          onChangeText={(name) =>
            setDonationPersonalData({
              ...donationPersonalData,
              name,
            })
          }
          value={donationPersonalData?.name}
        />
        <Input
          placeholder="E-mail"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={60}
          onChangeText={(email) =>
            setDonationPersonalData({
              ...donationPersonalData,
              email,
            })
          }
          value={donationPersonalData?.email}
        />
        <Input
          placeholder="Celular"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          keyboardType="number-pad"
          maxLength={15}
          onChangeText={(cellphone) =>
            setDonationPersonalData({ ...donationPersonalData, cellphone })
          }
          value={telephoneMask(donationPersonalData?.cellphone || "")}
        />
        <Input
          placeholder="Data de Nascimento"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          keyboardType="number-pad"
          maxLength={10}
          onChangeText={(birthdate) =>
            setDonationPersonalData({ ...donationPersonalData, birthdate })
          }
          value={dateMask(donationPersonalData?.birthdate || "")}
        />
        <Input
          placeholder="CPF"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          keyboardType="number-pad"
          maxLength={14}
          onChangeText={(cpf) =>
            setDonationPersonalData({ ...donationPersonalData, cpf })
          }
          value={cpfCnpjMask(donationPersonalData?.cpf || "")}
        />
      </G.ScrollContent>
      <L.ButtonContent>
        <Button
          title="Continuar"
          onPress={() => navigate("Address", { type: "donation" })}
          disabled={verifyFields()}
        />
      </L.ButtonContent>
    </G.Container>
  );
};

export default DonationPersonalData;
