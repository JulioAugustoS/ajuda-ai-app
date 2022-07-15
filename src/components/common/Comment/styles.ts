import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.stroke};
`;

export const ContentText = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
