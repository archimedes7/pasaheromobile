import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { ThemedText } from "@/components/ThemedText"; // Update this import

const tabConfig = {
  profile: { icon: "person", label: "Profile" },
  booking: { icon: "car", label: "Booking" },
  wallet: { icon: "wallet", label: "Digital Wallet" },
  "local-eats": { icon: "restaurant", label: "WDLE!" },
  more: { icon: "menu", label: "More" },
  "safety/index": { icon: "shield-checkmark", label: "Safety" },
  "support/complaints": { icon: "help-buoy", label: "Support" },
  "insurance/index": { icon: "umbrella", label: "Insurance" },
  "driver-application/index": { icon: "document-text", label: "Apply" },
};

interface CustomTabBarProps {
  state: any;
  navigation: any;
  userType: string;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  navigation,
  userType,
}) => {
  const router = useRouter();
  const currentRoute = usePathname();

  const renderTab = (route: any, index: number) => {
    const { icon, label } = tabConfig[route.name as keyof typeof tabConfig];
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        router.push(route.name);
      }
    };

    return (
      <TouchableOpacity
        key={route.key}
        onPress={onPress}
        style={styles.tabButton}
      >
        <Ionicons
          name={icon as any}
          size={24}
          color={isFocused ? "#007AFF" : "#8E8E93"}
        />
        <ThemedText
          style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}
          type="default"
        >
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  const visibleRoutes = state.routes.filter((route: any) => {
    if (userType === "Driver") {
      return true;
    }
    return !["driver-application/index", "analytics/index"].includes(
      route.name
    );
  });

  return <View style={styles.container}>{visibleRoutes.map(renderTab)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F2F2F7",
    paddingBottom: 20,
    paddingTop: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
  },
  tabLabelFocused: {
    color: "#007AFF",
  },
});

export default CustomTabBar;
