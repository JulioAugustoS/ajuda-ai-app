import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  padding: 0 16px;
  height: ${getStatusBarHeight(true) + 60}px;
  padding-top: ${getStatusBarHeight(true)}px;
  flex-direction: row;
  align-items: center;
`;

export const Left = styled.View``;

export const Center = styled.View`
  flex: 1;
  padding-left: 16px;
`;

export const Right = styled.View``;
