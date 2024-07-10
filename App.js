import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./styles/ThemeContext";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import AuthScreen from "./src/screens/auth/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import TempHomeScreen from "./src/screens/TempHomeScreen";
import RegionSelectionScreen from "./src/screens/map/RegionSelectionScreen";
import MapScreen from "./src/screens/map/MapScreen";
import DriverFound from "./src/screens/ride/DriverFound";
import SignupScreen from "./src/screens/auth/SignupScreen";
import LookingForDriver from "./src/screens/ride/LookingForDriver";
import BookRide from "./src/screens/ride/BookRide";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { app, auth } from "./utils/firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded || initializing) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  const handleAuth = (email, password) => {
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User signed in:", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Sign in error:", errorCode, errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("User signed up:", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Sign up error:", errorCode, errorMessage);
        });
    }
  };

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Auth" options={{ headerShown: false }}>
            {(props) => (
              <AuthScreen
                {...props}
                isLogin={isLogin}
                onSubmit={handleAuth}
                onSwitchMode={setIsLogin}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="TempHome"
            component={TempHomeScreen}
            options={{ title: "Temp Navigation" }}
          />
          <Stack.Screen
            name="SelectRegion"
            component={RegionSelectionScreen}
            options={{ title: "Select Region" }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen
            name="DriverFound"
            component={DriverFound}
            options={{ title: "Driver on the Way" }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: "Sign Up Screen" }}
          />
          <Stack.Screen
            name="LookingForDriver"
            component={LookingForDriver}
            options={{ title: "Looking for Driver" }}
          />
          <Stack.Screen
            name="BookRide"
            component={BookRide}
            options={{ title: "Book a Ride" }}
          />
          {/* Add more screens as needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
