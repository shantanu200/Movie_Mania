import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Input,
  SafeAreaView,
  InputField,
  FlatList,
} from "@gluestack-ui/themed";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IAPIResponse } from "../interfaces/IAPI";
import APIHandler from "../api";
import MovieCard from "../components/MovieCard";
import { IMovie } from "../interfaces/IMovie";
import { debounce } from "lodash";
import LottieView from "lottie-react-native";
import useLocalStore from "../store/store";

const Search = () => {
  const queryClient = useQueryClient();
  const { theme } = useLocalStore((state) => state);
  const getDataFromCache = (key: string) => {
    return queryClient.getQueryData([key]);
  };

  const [text, setText] = useState<string>("");
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<IAPIResponse>({
    queryKey: [`query/${text}`],
    queryFn: async () => {
      const cache = getDataFromCache(`query/${text}`);

      if (cache) {
        console.log("Cache Hit!");
        return cache;
      }
      const { data, error } = await APIHandler(
        "GET",
        `/search/movie?query=${text}`
      );

      if (error) {
        return;
      }
      console.log("Taking Time");
      return data;
    },
  });

  const handleChange = useCallback(
    debounce((value: string) => {
      setText(value);
    }, 800),
    []
  );

  return (
    <SafeAreaView flex={1} $dark-bgColor="$backgroundDark900">
      <FlatList
        data={movies?.results}
        ListHeaderComponent={
          <>
            <View
              px="$4"
              py="$6"
              borderBottomWidth={"$1"}
              borderColor={
                theme === "dark" ? "$borderLight0" : "$borderDark800"
              }
              borderStyle="dashed"
            >
              <View>
                <Input>
                  <InputField
                    onChangeText={(value) => handleChange(value)}
                    size="md"
                    placeholder="Search movie by keyword"
                  />
                </Input>
              </View>
            </View>
            {text?.length > 0 && (
              <View px="$4" py="$4" flexDirection="row" alignItems="center">
                <Text>Results for: </Text>
                <Text fontWeight={"$bold"} fontSize={"$lg"}>
                  {text}
                </Text>
              </View>
            )}
          </>
        }
        ListEmptyComponent={
          <View flex={1} alignItems="center" justifyContent="center" my={"$40"}>
            <LottieView
              source={require("../../assets/search.json")}
              autoPlay
              loop
              style={{
                width: 200,
                aspectRatio: 1,
              }}
            />
            <Text mt="$4" fontWeight={"$semibold"}>
              Search your favourite movie
            </Text>
          </View>
        }
        keyExtractor={(item, idx) => String(idx) + "_key"}
        renderItem={({ item }) => <MovieCard movie={item as IMovie} />}
      />
    </SafeAreaView>
  );
};

export default Search;
