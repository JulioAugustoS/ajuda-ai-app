import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      black: string;
      dark: string;
      gray: string;
      white: string;
      danger: string;
      bg: string;
      stroke: string;
    };
    fonts: {
      sizes: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
      };
    };
    screen: {
      width: number;
      height: number;
    };
  }
}
