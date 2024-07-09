import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "../styles/ThemeContext";

const LoginScreen = ({ navigation }) => {
  const { theme, typography } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.primaryBackground }}>
      <Text
        style={[typography.headlineLarge, { color: theme.colors.primaryText }]}
      >
        Login
      </Text>
      {/* Add your login form components here */}
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={[typography.labelLarge, { color: theme.colors.primary }]}>
          Go to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
