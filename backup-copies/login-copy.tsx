import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-facebook";
import {
  GoogleAuthProvider,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const buttonOptions = [
  { name: "Email", icon: "envelope", color: "#007F8A", authMethod: "email" },
  { name: "Google", icon: "google", color: "#fa8c1a", authMethod: "google" },
  {
    name: "Facebook",
    icon: "facebook",
    color: "#4267B2",
    authMethod: "facebook",
  },
];

export default function LoginScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "ns5s2df0ktg8kfe2v5g093odhg700ejg",
    iosClientId:
      "699535507493-77kcp40r3rpv9h62hr5oade8i1uaurdp.apps.googleusercontent.com",
    androidClientId:
      "699535507493-nnpn4nigg7k2tsi2coadat6f7i5rl2k8.apps.googleusercontent.com",
    webClientId:
      "699535507493-ns5s2df0ktg8kfe2v5g093odhg700ejg.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const handleGoogleSignIn = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleAuth = async (method) => {
    try {
      switch (method) {
        case "google":
          await promptAsync();
          break;
        case "facebook":
          await facebookSignIn();
          break;
        case "email":
          navigation.navigate("EmailAuthScreen");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const facebookSignIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "424468263764363",
      });
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (result.type === "success") {
        const { token } = result;
        const credential = FacebookAuthProvider.credential(token);
        await signInWithCredential(auth, credential);
      } else {
        // User cancelled the login process
        console.log("User cancelled the login process");
      }
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>PasaHero.PH</Text>
        <Image source={require("../assets/heromap.png")} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        {buttonOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: option.color }]}
            accessibilityLabel={`Continue with ${option.name}`}
            onPress={() => handleAuth(option.authMethod)}
          >
            <FontAwesome
              name={option.icon}
              size={24}
              color="#fff"
              style={styles.iconStyle}
            />
            <Text style={styles.buttonText}>Continue with {option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.separator}>
        <Text style={styles.separatorText}>or continue with</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    padding: 24,
    alignItems: "center",
  },
  logoText: {
    color: "#848484",
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "600",
    textAlign: "center",
  },
  logo: {
    width: 192,
    height: 195,
    marginTop: 24,
  },
  buttonContainer: {
    marginTop: 32,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 48,
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "600",
    textAlign: "center",
  },
  separator: {
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
  },
  separatorText: {
    color: "#171A1D",
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "600",
    textAlign: "center",
  },
  iconStyle: {
    marginRight: 10,
  },
});
