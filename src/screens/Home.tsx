import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_TOKEN } from "../api/constant";
import {
  Button,
  ButtonText,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "@gluestack-ui/themed";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import useLocalStore from "../store/store";

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const { theme, updateTheme } = useLocalStore((state) => state);
  const navigate = useNavigation();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", page],
    queryFn: async () => {
      const { data, status } = await axios.get(`/discover/movie?page=${page}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      return data;
    },
  });

  const handleLoadMore = () => {
    //Page will only increase not decrease
    setPage((prev) => Math.max(prev + 1, 1));
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView flex={1} $dark-bgColor="$backgroundDark900">
      <View
        h="$2/3"
        bgColor={
          theme === "dark" ? "$backgroundDark800" : "$backgroundLight400"
        }
        justifyContent="center"
        alignItems="center"
      >
        <LottieView
          source={require("../../assets/movie.json")}
          autoPlay
          loop
          speed={1}
          style={{
            width: 300,
            aspectRatio: 1,
          }}
        />
        <Pressable
          position="absolute"
          top="$8"
          right={"$8"}
          borderWidth={1}
          bgColor={theme === "light" ? "$backgroundDark800" : "$backgroundLight100"}
          rounded={"$full"}
          p="$2"
          onPress={() => updateTheme(theme === "dark" ? "light" : "dark")}
        >
          <FontAwesome name={theme === "dark" ? "sun-o" : "moon-o"} size={24} color={theme === "dark" ? "black" : "white"} />
        </Pressable>
      </View>
      <View px="$4" py="$8" flex={1}>
        <View gap="$3" py="$4">
          <Text size="4xl" fontWeight={"$bold"}>
            FlixSphere
          </Text>
          <Text lineHeight={"$lg"} size="sm" fontStyle="italic">
            Explore a universe of films with FlixSphere – your gateway to
            endless cinematic journeys
          </Text>
        </View>
        <View flex={1} justifyContent="flex-end">
          <Button
            size="lg"
            bgColor={
              theme === "dark" ? "$backgroundDark700" : "$backgroundDark900"
            }
            borderColor="$borderDark500"
            variant="solid"
            onPress={() => navigate.navigate("Movie" as never)}
            borderWidth={2}
            borderBottomWidth={6}
            rounded={"$xl"}
          >
            <ButtonText>Explore</ButtonText>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
