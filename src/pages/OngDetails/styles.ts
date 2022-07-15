import styled from "styled-components/native";

export const BannerContainer = styled.View`
  width: 100%;
  height: 178px;
  margin-bottom: 20px;
`;

export const BannerImg = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const DescriptionContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const CommentContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CommentButton = styled.TouchableOpacity`
  width: 18%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
