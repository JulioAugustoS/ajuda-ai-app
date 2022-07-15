import styled from "styled-components/native";

interface ITypography {
  variant?: "primary" | "black" | "dark" | "gray" | "white" | "danger";
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  weight?: "regular" | "medium" | "bold";
}

const selectWeight = (weight = "regular") => {
  const weights: any = {
    regular: "300",
    medium: "500",
    bold: "700",
  };

  return weights[weight] || "300";
};

export const Typhography = styled.Text<ITypography>`
  font-size: ${({ theme, size }) => (size && theme.fonts.sizes[size]) || 14}px;
  color: ${({ theme, variant }) =>
    (variant && theme.colors[variant]) || theme.colors.black};
  font-weight: ${({ weight }) => selectWeight(weight)};
`;
