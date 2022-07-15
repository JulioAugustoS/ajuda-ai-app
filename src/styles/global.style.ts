import styled from "styled-components/native";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
`;

interface ContentProps {
  withHeader?: boolean;
}

export const Content = styled.View<ContentProps>`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: ${getStatusBarHeight(true) + 16}px;
  padding-bottom: ${getBottomSpace() + 10}px;
  justify-content: ${({ withHeader }) =>
    withHeader ? "space-between" : "flex-end"};
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
`;

export const BgImage = styled.Image`
  width: ${({ theme }) => theme.screen.width}px;
  position: absolute;
`;

export const IconImg = styled.Image.attrs({
  resizeMode: "contain",
})``;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.stroke};
  margin: 20px 0;
`;

export const BottomButton = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: ${getBottomSpace() + 10}px;
`;
