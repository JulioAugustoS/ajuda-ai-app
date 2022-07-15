import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 72px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  padding: 0 20px;
  border-radius: 16px;
  margin: 5px 0;
`;

export const Left = styled.View``;

export const Right = styled.View``;
