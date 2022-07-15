import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useTheme } from "styled-components";
import { cepMask } from "js-essentials-functions";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Header, Typhography, Button, Input } from "../../components/common";
import * as G from "../../styles/global.style";
import * as L from "./styles";

import { useRegister } from "../../_context/Register";
import useFetch from "../../hooks/useFetch";

const Address = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const { params }: any = useRoute();
  const { address, setAddress } = useRegister();
  const { data, error } = useFetch(
    address.zipcode && address.zipcode.length >= 9
      ? `/consult/cep/${address.zipcode}`
      : null
  );

  console.log(params);

  if (error) {
    Alert.alert(
      "Ops!",
      "Ocorreu um erro ao buscar o endereço, tente novamente."
    );
  }

  useEffect(() => {
    if (data) {
      setAddress({
        ...address,
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      });
    }
  }, [data]);

  const verifyFields = () => {
    if (
      address.street &&
      address.neighborhood &&
      address.city &&
      address.state &&
      address.number &&
      address.zipcode
    ) {
      return false;
    }
    return true;
  };

  return (
    <G.Container style={{ backgroundColor: colors.bg }}>
      <Header back />
      <G.ScrollContent contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Typhography size="xl" weight="bold" style={{ textAlign: "center" }}>
          Endereço
        </Typhography>
        <Typhography
          variant="gray"
          style={{ textAlign: "center", marginTop: 9, marginBottom: 24 }}
        >
          Agora informe o seu CEP que iremos pesquisar seu endereço!
        </Typhography>
        <Input
          placeholder="CEP"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          keyboardType="number-pad"
          maxLength={9}
          onChangeText={(zipcode) => setAddress({ ...address, zipcode })}
          value={cepMask(address?.zipcode || "")}
        />
        <Input
          placeholder="Endereço"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          onChangeText={(street) => setAddress({ ...address, street })}
          value={address?.street}
        />
        <L.InputsContent>
          <Input
            placeholder="Número"
            containerStyle={{
              width: "30%",
              borderWidth: 1,
              borderColor: colors.stroke,
              marginVertical: 6,
            }}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={(number) => setAddress({ ...address, number })}
            value={address?.number}
          />
          <Input
            placeholder="Complemento"
            containerStyle={{
              width: "68%",
              borderWidth: 1,
              borderColor: colors.stroke,
              marginVertical: 6,
            }}
            onChangeText={(complement) =>
              setAddress({ ...address, complement })
            }
            value={address?.complement}
          />
        </L.InputsContent>
        <Input
          placeholder="Bairro"
          containerStyle={{
            borderWidth: 1,
            borderColor: colors.stroke,
            marginVertical: 6,
          }}
          onChangeText={(neighborhood) =>
            setAddress({ ...address, neighborhood })
          }
          value={address?.neighborhood}
        />
        <L.InputsContent>
          <Input
            placeholder="Cidade"
            containerStyle={{
              width: "68%",
              borderWidth: 1,
              borderColor: colors.stroke,
              marginVertical: 6,
            }}
            onChangeText={(city) => setAddress({ ...address, city })}
            value={address?.city}
          />
          <Input
            placeholder="Estado"
            containerStyle={{
              width: "30%",
              borderWidth: 1,
              borderColor: colors.stroke,
              marginVertical: 6,
            }}
            maxLength={2}
            autoCapitalize="characters"
            onChangeText={(state) => setAddress({ ...address, state })}
            value={address?.state}
          />
        </L.InputsContent>
      </G.ScrollContent>
      <L.ButtonContent>
        <Button
          title="Continuar"
          disabled={verifyFields()}
          onPress={() => navigate("Password", { type: params.type })}
        />
      </L.ButtonContent>
    </G.Container>
  );
};

export default Address;
