import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  z-index: 99;
  justify-content: center;
  align-items: center;
`;
