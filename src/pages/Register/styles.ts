import styled from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const ButtonContent = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: ${getBottomSpace() + 10}px;
`;

export const InputsContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
