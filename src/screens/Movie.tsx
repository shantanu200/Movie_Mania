import { View, Text, FlatList } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import APIHandler from "../api";
import { IAPIResponse } from "../interfaces/IAPI";
import MovieCard from "../components/MovieCard";
import { IMovie } from "../interfaces/IMovie";
import { SafeAreaView } from "@gluestack-ui/themed";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useLocalStore from "../store/store";
import ErrorScreen from "./ErrorScreen";

const HeaderComponent = () => {
  const naigate = useNavigation().navigate;
  const { theme } = useLocalStore((state) => state);
  return (
    <View
      borderWidth={"$1"}
      py="$4"
      px="$4"
      flexDirection="row"
      justifyContent="space-between"
      borderBottomColor={
        theme === "dark" ? "$borderLight100" : "$borderDark800"
      }
    >
      <View flexDirection="row" gap="$4" alignItems="center">
        <Entypo
          name="ticket"
          size={16}
          color={theme === "dark" ? "white" : "black"}
        />
        <Text size="xl" fontWeight={"$bold"}>
          Movie Mania
        </Text>
      </View>
      <FontAwesome
        onPress={() => naigate("Search" as never)}
        name="search"
        size={24}
        color={theme === "dark" ? "white" : "dark"}
      />
    </View>
  );
};

const Movie = () => {
  const {
    data: response,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery<IAPIResponse>({
    queryKey: ["movies"],
    queryFn: async ({ pageParam = 1 }) => {
      const { error, data } = await APIHandler(
        "GET",
        `/movie/popular?page=${pageParam}`
      );

      if (error) {
        throw new Error(data);
      }

      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
  });

  if (isError) {
    return <ErrorScreen retryFunction={refetch} />;
  }

  return (
    <SafeAreaView flex={1} $dark-bgColor={"$backgroundDark900"}>
      <FlatList
        data={response?.pages?.flatMap((page) => page?.results)}
        ListHeaderComponent={HeaderComponent}
        keyExtractor={(item, idx) => "key-" + idx}
        renderItem={({ item }) => <MovieCard movie={item as IMovie} />}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default Movie;
