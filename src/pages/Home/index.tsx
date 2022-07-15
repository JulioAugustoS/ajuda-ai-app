import React, { useState } from "react";
import { FlatList, StatusBar, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../_context/Auth";

import { Header, CardOng, Typhography, Input } from "../../components/common";

import * as G from "../../styles/global.style";
import * as L from "./styles";

const Home = () => {
  const { colors } = useTheme();
  const { setIsAuth, user } = useAuth();
  const [search, setSearch] = useState("");
  const { data } = useFetch(`/ongs?name=${search}`);

  const renderItem = ({ item }: any) => <CardOng ong={item} />;

  const logout = async () => {
    await AsyncStorage.clear();
    setIsAuth(false);
  };

  return (
    <G.Container style={{ backgroundColor: colors.bg }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <L.ContentHome>
        <Header
          rightComponent={<Icon name="bell" size={24} color={colors.dark} />}
        />
        <L.ContentTop>
          <TouchableOpacity onPress={() => logout()}>
            <Typhography>Deslogar Usuário</Typhography>
          </TouchableOpacity>
          <Typhography size="xxl" weight="bold" variant="primary">
            Olá, {user?.name?.split(" ")[0]} 👋🏻
          </Typhography>
          <Typhography size="lg" style={{ marginBottom: 18 }}>
            Para quem você quer doar hoje?
          </Typhography>
          <Input
            placeholder="Pesquisar ONG"
            leftIcon
            leftIconName="search"
            leftIconSize={20}
            leftIconColor={colors.gray}
            containerStyle={{ borderWidth: 1, borderColor: colors.stroke }}
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
        </L.ContentTop>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          data={data || []}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <Typhography size="lg" weight="bold" style={{ marginBottom: 18 }}>
              ONG's Próximas
            </Typhography>
          }
          renderItem={renderItem}
        />
      </L.ContentHome>
    </G.Container>
  );
};

export default Home;
