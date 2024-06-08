import { GluestackUIProvider, StatusBar } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { API_TOKEN, BASE_URL } from "./src/api/constant";
import Home from "./src/screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Movie from "./src/screens/Movie";
import MovieScreen from "./src/screens/SingleMovie";
import Search from "./src/screens/Search";
import useLocalStore from "./src/store/store";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

export default function App() {
  const { theme } = useLocalStore((state) => state);

  return (
    <GluestackUIProvider colorMode={theme} config={config}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Movie" component={Movie} />
            <Stack.Screen name="Movie:ID" component={MovieScreen} />
            <Stack.Screen name="Search" component={Search} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar barStyle={theme === "dark" ? "light-content" : "default"} />
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
