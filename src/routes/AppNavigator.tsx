import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "../_context/Auth";

import TabNavigator from "./TabNavigator";
import Onboarding from "../pages/Onboarding";
import LoginVerifyRegister from "../pages/Login/VerifyRegister";
import LoginPassword from "../pages/Login/Password";
import DonationPersonalData from "../pages/Register/DonationPersonalData";
import Address from "../pages/Register/Address";
import Password from "../pages/Register/Password";
import OngDetails from "../pages/OngDetails";
import ChangeUserPassword from "../pages/Profile/ChangePassword";
import Donation from "../pages/Donation";

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Onboarding: undefined;
      LoginVerifyEmail: { type: string };
      LoginPassword: { type: string; state: string };
      DonationPersonalData: undefined;
      Address: { type: string };
      Password: { type: string };
      Index: undefined;
      OngDetails: { id: string };
      ChangeUserPassword: undefined;
      Donation: { id: string };
    }
  }
}

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuth, setIsAuth, setUser } = useAuth();

  const verifyAuth = async () => {
    const token = await AsyncStorage.getItem("@token");
    const user = await AsyncStorage.getItem("@user");

    if (token) {
      setIsAuth(true);

      if (user) {
        setUser(JSON.parse(user));
      }
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    // @ts-ignore
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuth ? (
        // @ts-ignore
        <Stack.Group>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen
            name="LoginVerifyEmail"
            component={LoginVerifyRegister}
          />
          <Stack.Screen name="LoginPassword" component={LoginPassword} />
          <Stack.Screen
            name="DonationPersonalData"
            component={DonationPersonalData}
          />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="Password" component={Password} />
        </Stack.Group>
      ) : (
        <>
          <Stack.Screen name="Index" component={TabNavigator} />
          <Stack.Screen name="OngDetails" component={OngDetails} />
          <Stack.Screen
            name="ChangeUserPassword"
            component={ChangeUserPassword}
          />
          <Stack.Screen name="Donation" component={Donation} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
