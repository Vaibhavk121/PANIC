import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./pages/SignIn";
import theme from "./styles/theme";
import SignUp from "./pages/Signup";
import SignalZeroChat from "./pages/SignalZeroChat";
import Home from "./pages/Home";
import AIChatbot from "./pages/AIChatbot";
import SignalZero from "./pages/SignalZero";
import OfflineGuide from "./pages/OfflineGuide";
import ResourceMap from "./pages/ResourceMap";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.light.colors.background,
          },
        }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignalZeroChat" component={SignalZeroChat} />
        <Stack.Screen name="AIChatbot" component={AIChatbot} />
        <Stack.Screen name="SignalZero" component={SignalZero} />
        <Stack.Screen name="OfflineGuide" component={OfflineGuide} />
        <Stack.Screen name="ResourceMap" component={ResourceMap} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
