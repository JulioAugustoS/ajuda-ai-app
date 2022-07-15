import React, { useState } from "react";
import { StatusBar, Pressable, Image, Alert, FlatList } from "react-native";
import { useTheme } from "styled-components";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { useGeneral } from "../../_context/General";
import useFetch, { useSWRConfig } from "../../hooks/useFetch";

import {
  Header,
  Typhography,
  Button,
  Loading,
  Comment,
  Input,
} from "../../components/common";
import * as G from "../../styles/global.style";
import * as L from "./styles";

import addFavorite from "../../assets/icons/add-favorite.png";
import addFavoriteActive from "../../assets/icons/add-favorite-active.png";
import bannerOng from "../../assets/images/banner-ong.png";

const OngDetails = () => {
  const { colors } = useTheme();
  const { params }: any = useRoute();
  const { goBack, navigate } = useNavigation();
  const { api } = useGeneral();
  const { mutate } = useSWRConfig();
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState("");

  const { data, error } = useFetch(`/ongs/${params.id}`);

  if (error) {
    Alert.alert(
      "Ocorreu um Problema!",
      "Não foi possível carregar os dados da ONG.",
      [{ text: "Ok", onPress: () => goBack() }]
    );
  }

  const handleSaveComment = async () => {
    if (!comment) {
      return Alert.alert(
        "Ocorreu um Problema!",
        "Por favor, preencha o campo de comentário.",
        [{ text: "Ok", onPress: () => {} }]
      );
    }

    try {
      await api({
        entity: "comment",
        action: "saveComment",
        payload: {
          ongId: params.id,
          comment,
        },
      });

      setComment("");
      mutate(`/ongs/${params.id}`);
    } catch (error) {
      Alert.alert(
        "Ocorreu um Problema!",
        "Não foi possível salvar o comentário.",
        [{ text: "Ok", onPress: () => {} }]
      );
    }
  };

  if (!data) return <Loading />;

  const renderItem = ({ item }: any) => <Comment data={item} />;

  return (
    <G.Container style={{ backgroundColor: colors.bg }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        back
        rightComponent={
          <Pressable onPress={() => setIsFavorite(!isFavorite)}>
            <Image source={isFavorite ? addFavoriteActive : addFavorite} />
          </Pressable>
        }
      />
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        data={data.comments}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <L.BannerContainer>
              <L.BannerImg
                source={data?.banner ? { uri: data?.banner } : bannerOng}
                resizeMode="cover"
              />
            </L.BannerContainer>
            <Typhography size="xxl" weight="bold" variant="dark">
              {data?.name}
            </Typhography>
            <Typhography variant="gray" style={{ marginTop: 5 }}>
              {data?.donations.length}{" "}
              {data?.donations.length > 1
                ? "doações recebidas"
                : "doação recebida"}
            </Typhography>
            <G.Divider />
            <Typhography weight="medium" size="xl" variant="dark">
              {data?.holderName}
            </Typhography>
            <Typhography variant="gray">Responsável</Typhography>
            <L.DescriptionContainer>
              <Typhography size="lg" variant="primary" weight="medium">
                Descrição
              </Typhography>
            </L.DescriptionContainer>
            <Typhography variant="dark">{data?.description}</Typhography>
            <L.DescriptionContainer>
              <Typhography size="lg" variant="primary" weight="medium">
                Comentarios
              </Typhography>
              <Typhography variant="gray">
                ({data?.comments.length})
              </Typhography>
            </L.DescriptionContainer>
            <L.CommentContainer>
              <Input
                placeholder="Digite seu comentário"
                containerStyle={{
                  width: "80%",
                  borderWidth: 1,
                  borderColor: colors.stroke,
                  marginVertical: 6,
                }}
                onChangeText={(comment) => setComment(comment)}
                value={comment}
              />
              <L.CommentButton onPress={() => handleSaveComment()}>
                <Typhography size="lg" variant="white" weight="medium">
                  Enviar
                </Typhography>
              </L.CommentButton>
            </L.CommentContainer>
          </>
        }
      />
      <G.BottomButton>
        <Button
          title="Doar Agora"
          onPress={() => navigate("Donation", { id: params.id })}
        />
      </G.BottomButton>
    </G.Container>
  );
};

export default OngDetails;
