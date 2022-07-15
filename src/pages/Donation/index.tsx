import React, { useState } from "react";
import { Alert } from "react-native";
import { useTheme } from "styled-components";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useGeneral } from "../../_context/General";

import {
  Header,
  Typhography,
  Input,
  Button,
  Loading,
} from "../../components/common";
import * as G from "../../styles/global.style";
import * as L from "./styles";

const Donation = () => {
  const { params }: any = useRoute();
  const { reset } = useNavigation();
  const { colors } = useTheme();
  const { api } = useGeneral();
  const [otherAmount, setOtherAmount] = useState(false);
  const [amount, setAmount] = useState("0");
  const [loading, setLoading] = useState(false);

  const handleSendDonation = async () => {
    if (amount === "0") {
      return Alert.alert(
        "Não é possivel continuar!",
        "O valor da doação não pode ser 0."
      );
    }

    setLoading(true);

    try {
      await api({
        entity: "donation",
        action: "sendDonation",
        payload: {
          ongId: params.id,
          quantity: 1,
          amount: parseFloat(amount),
          type: "money",
          delivery: false,
        },
      });

      Alert.alert("Doação enviada com sucesso!");
      setAmount("0");

      reset({ index: 0, routes: [{ name: "Index" }] });
    } catch (error) {
      Alert.alert(
        "Erro :(",
        "Ocorreu um erro ao enviar a doação, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <G.Container style={{ backgroundColor: colors.bg }}>
      <Header title="Fazer uma doação" back />
      <G.ScrollContent contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Typhography size="lg" weight="medium">
          Quanto você deseja doar?
        </Typhography>
        <L.ContentDonateOptions>
          <L.BtnDonate
            onPress={() => setAmount("10")}
            selected={amount === "10"}
          >
            <Typhography
              variant={amount === "10" ? "white" : "primary"}
              size="lg"
              weight="bold"
            >
              R$ 10,00
            </Typhography>
          </L.BtnDonate>
          <L.BtnDonate
            onPress={() => setAmount("30")}
            selected={amount === "30"}
          >
            <Typhography
              variant={amount === "30" ? "white" : "primary"}
              size="lg"
              weight="bold"
            >
              R$ 30,00
            </Typhography>
          </L.BtnDonate>
          <L.BtnDonate
            onPress={() => setAmount("60")}
            selected={amount === "60"}
          >
            <Typhography
              variant={amount === "60" ? "white" : "primary"}
              size="lg"
              weight="bold"
            >
              R$ 60,00
            </Typhography>
          </L.BtnDonate>
          <L.BtnDonate
            onPress={() => setAmount("100")}
            selected={amount === "100"}
          >
            <Typhography
              variant={amount === "100" ? "white" : "primary"}
              size="lg"
              weight="bold"
            >
              R$ 100,00
            </Typhography>
          </L.BtnDonate>
          <L.BtnDonate
            style={{ width: "100%" }}
            onPress={() => setOtherAmount(!otherAmount)}
          >
            <Typhography variant="primary" size="lg" weight="bold">
              Outro Valor
            </Typhography>
          </L.BtnDonate>
        </L.ContentDonateOptions>
        {otherAmount && (
          <Input
            placeholder="Informe o valor da doação"
            containerStyle={{ borderWidth: 1, borderColor: colors.stroke }}
            style={{ textAlign: "center", fontSize: 18 }}
            keyboardType="numeric"
            onChangeText={(text) => setAmount(text)}
            value={amount}
          />
        )}
      </G.ScrollContent>
      <G.BottomButton>
        <Button title="Finalizar Doação" onPress={() => handleSendDonation()} />
      </G.BottomButton>
    </G.Container>
  );
};

export default Donation;
