import React from "react";
import { TextInputProps, Pressable, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "styled-components";

import * as L from "./styles";

interface InputProps {
  leftIcon?: boolean;
  leftIconName?: string;
  leftIconSize?: number;
  leftIconColor?: string;
  rightIcon?: boolean;
  rightIconName?: string;
  rightIconSize?: number;
  rightIconColor?: string;
  containerStyle?: any;
  iconPress?: () => void;
}

const Input: React.FC<InputProps & TextInputProps> = ({
  leftIcon,
  leftIconName,
  leftIconSize,
  leftIconColor,
  rightIcon,
  rightIconName,
  rightIconSize = 20,
  rightIconColor,
  iconPress,
  containerStyle = {},
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <L.Container style={containerStyle}>
      {leftIcon && (
        <View style={{ paddingRight: 15 }}>
          <Icon name={leftIconName} size={leftIconSize} color={leftIconColor} />
        </View>
      )}
      <L.InputComponent {...props} />
      {rightIcon && (
        <Pressable onPress={() => (iconPress ? iconPress() : null)}>
          <Icon
            name={rightIconName}
            size={rightIconSize}
            color={rightIconColor || colors.gray}
          />
        </Pressable>
      )}
    </L.Container>
  );
};

export { Input };
