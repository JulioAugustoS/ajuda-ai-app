import styled from "styled-components/native";

type Colors = "primary" | "black" | "dark" | "gray" | "white" | "danger";

interface IButton {
  variant?: Colors;
  outline?: boolean;
  color?: string;
}

export const Container = styled.TouchableOpacity<IButton>`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, variant, outline }) =>
    !outline
      ? (variant && theme.colors[variant]) || theme.colors.primary
      : "transparent"};
  border: ${({ theme, variant, outline }) =>
    outline
      ? `1px solid ${
          (variant && theme.colors[variant]) || theme.colors.primary
        }`
      : "none"};
  border-radius: 10px;
  margin: 10px 0;
`;

export const ButtonText = styled.Text<IButton>`
  font-size: ${({ theme }) => theme.fonts.sizes.xl}px;
  color: ${({ color }) => color};
  font-weight: 500;
`;
