import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function TestScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {
    user,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
  } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication Test</Text>

      {user ? (
        <View>
          <Text>Logged in as: {user.email}</Text>
          <Button title="Sign Out" onPress={signOut} />
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title="Sign In with Email"
            onPress={() => signInWithEmail(email, password)}
          />
          <Button
            title="Sign Up with Email"
            onPress={() => signUpWithEmail(email, password)}
          />
          <Button title="Sign In with Google" onPress={signInWithGoogle} />
          <Button title="Sign In with Facebook" onPress={signInWithFacebook} />
          <Text style={styles.platformInfo}>Platform: {Platform.OS}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  platformInfo: {
    marginTop: 20,
    fontStyle: "italic",
  },
});
