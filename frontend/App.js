import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./pages/SignIn";
import theme from "./styles/theme";
import SignUp from "./pages/Signup";
import SignalZeroChat from "./pages/SignalZeroChat";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.light.colors.background,
          },
          // Hide the navigation bar
          navigationBarHidden: true,
          // Hide the bottom tabs
          tabBarStyle: { display: "none" },
          // Hide the gesture navigation bar on Android
          animation: "none",
          // Hide the home indicator on iOS
          safeAreaInsets: { bottom: 0 },
        }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignalZeroChat" component={SignalZeroChat} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
