import { Stack } from "expo-router/stack";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="email"
        options={{
          title: "Email Authentication",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="user-type"
        options={{
          title: "Select User Type",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
