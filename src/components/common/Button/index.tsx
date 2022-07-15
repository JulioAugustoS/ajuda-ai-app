import React from "react";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";
import * as L from "./styles";

interface ButtonProps {
  title: string;
  variant?: "primary" | "black" | "dark" | "gray" | "white" | "danger";
  outline?: boolean;
}

const Button: React.FC<ButtonProps & TouchableOpacityProps> = ({
  title,
  variant = "primary",
  outline = false,
  ...props
}) => {
  const { colors } = useTheme();

  const selectColor = () => {
    if (variant === "white" && !outline) {
      return colors.primary;
    } else {
      return colors.white;
    }
  };

  return (
    <L.Container variant={variant} outline={outline} {...props}>
      <L.ButtonText color={selectColor()}>{title}</L.ButtonText>
    </L.Container>
  );
};

export { Button };
