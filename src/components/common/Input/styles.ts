import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

export const InputComponent = styled.TextInput`
  flex: 1;
  padding-right: 10px;
  color: ${({ theme }) => theme.colors.dark};
`;
