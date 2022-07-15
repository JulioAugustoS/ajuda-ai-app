import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import AppContainer from "./src/routes";
import { light } from "./src/theme";

import { GeneralProvider } from "./src/_context/General";
import { RegisterProvider } from "./src/_context/Register";
import { AuthProvider } from "./src/_context/Auth";

export default function App() {
  const routeNameRef = useRef<any>(null);
  const navigationRef = useRef<any>(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
    >
      <GeneralProvider>
        <RegisterProvider>
          <AuthProvider>
            <ThemeProvider theme={light}>
              <AppContainer />
            </ThemeProvider>
          </AuthProvider>
        </RegisterProvider>
      </GeneralProvider>
    </NavigationContainer>
  );
}
