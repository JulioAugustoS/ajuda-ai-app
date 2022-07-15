import React from "react";
import { Alert, StatusBar, FlatList } from "react-native";
import { useTheme } from "styled-components";

import { useAuth } from "../../_context/Auth";
import useFetch from "../../hooks/useFetch";

import { Header, CardHistory } from "../../components/common";
import * as G from "../../styles/global.style";

const History = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { data, error } = useFetch(`/donations/user/${user?.id}`);

  if (error) {
    Alert.alert("Algo deu errado!", "Não foi possivel carregar as doações");
  }

  const renderItem = ({ item }: any) => <CardHistory data={item} />;

  return (
    <G.Container style={{ backgroundColor: colors.bg }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header title="Minhas Doações" />
      <FlatList
        data={data || []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      />
    </G.Container>
  );
};

export default History;
