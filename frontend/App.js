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
import SOS from "./pages/SOS";
import Community from "./pages/Community";
import Profile from "./pages/SmartProfile";
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
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignalZeroChat" component={SignalZeroChat} />
        <Stack.Screen name="AIChatbot" component={AIChatbot} />
        <Stack.Screen name="SignalZero" component={SignalZero} />
        <Stack.Screen name="OfflineGuide" component={OfflineGuide} />
        <Stack.Screen name="ResourceMap" component={ResourceMap} />
        <Stack.Screen name="SOS" component={SOS} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="SmartProfile" component={Profile} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
