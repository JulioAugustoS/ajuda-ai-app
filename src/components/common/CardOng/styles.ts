import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  min-height: 100px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  margin-bottom: 6px;
  padding: 16px 14px;
  justify-content: center;
`;

export const Cover = styled.Image`
  width: 100%;
  height: 108px;
  margin-bottom: 10px;
`;

export const BtnFavorite = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  top: 17px;
  right: 15px;
`;
