import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./pages/SignIn";
import theme from "./styles/theme";
import SignUp from "./pages/Signup";
import SignalZeroChat from "./pages/SignalZeroChat";
import Home from "./pages/Home";
import Community from "./pages/Community";
import SmartProfile from "./pages/SmartProfile";

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
          // Hide system navigation bar
          navigationBarHidden: true,
          // Hide the bottom tab bar
          tabBarStyle: { display: 'none' },
          // Disable animation for smoother transitions
          animation: 'none',
          // Remove bottom safe area inset
          safeAreaInsets: { bottom: 0 },
          // Hide gesture navigation on Android
          gestureEnabled: false,
          // Hide status bar
          statusBarHidden: true,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignalZeroChat" component={SignalZeroChat} />
      </Stack.Navigator>
      <StatusBar hidden />
    </NavigationContainer>
  );
}
