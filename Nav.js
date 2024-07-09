import { createStackNavigator } from "@react-navigation/stack";
import App from "./App"; // assuming you have a separate 'App' component
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;
