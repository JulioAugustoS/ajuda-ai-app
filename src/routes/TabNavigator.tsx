import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import * as G from "../styles/global.style";

import HomeIcon from "../assets/icons/home.png";
import HomeActiveIcon from "../assets/icons/home-active.png";
import FavoritesIcon from "../assets/icons/favorites.png";
import FavoritesActiveIcon from "../assets/icons/favorites-active.png";
import HistoryIcon from "../assets/icons/history.png";
import HistoryActiveIcon from "../assets/icons/history-active.png";
import profileIcon from "../assets/icons/profile.png";
import profileActiveICon from "../assets/icons/profile-active.png";

// Pages
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import History from "../pages/History";
import Profile from "../pages/Profile";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors } = useTheme();

  return (
    // @ts-ignore
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.black,
        tabBarAllowFontScaling: false,
        tabBarIcon: ({ focused }) => {
          if (route.name === "Home") {
            return <G.IconImg source={focused ? HomeActiveIcon : HomeIcon} />;
          }

          if (route.name === "Favorites") {
            return (
              <G.IconImg
                source={focused ? FavoritesActiveIcon : FavoritesIcon}
              />
            );
          }

          if (route.name === "History") {
            return (
              <G.IconImg source={focused ? HistoryActiveIcon : HistoryIcon} />
            );
          }

          if (route.name === "Profile") {
            return (
              <G.IconImg source={focused ? profileActiveICon : profileIcon} />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
