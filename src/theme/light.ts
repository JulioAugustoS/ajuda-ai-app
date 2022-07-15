import { Dimensions } from "react-native";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;

export const light = {
  colors: {
    primary: "#3EB489",
    black: "#000000",
    dark: "#292D32",
    gray: "#696969",
    white: "#FFFFFF",
    danger: "#FF7262",
    bg: "#FBFBFB",
    stroke: "#ECF0F5",
  },
  fonts: {
    sizes: {
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 24,
    },
  },
  screen: {
    width: WIDTH,
    height: HEIGHT,
  },
};
