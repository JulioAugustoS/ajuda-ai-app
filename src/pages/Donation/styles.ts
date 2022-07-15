import styled from "styled-components/native";

export const ContentDonateOptions = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
`;

interface BtnProps {
  selected?: boolean;
}

export const BtnDonate = styled.TouchableOpacity<BtnProps>`
  width: 45%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 8px;
  margin: 10px 0;
  background-color: ${({ theme, selected = false }) =>
    selected ? theme.colors.primary : theme.colors.white};
`;
