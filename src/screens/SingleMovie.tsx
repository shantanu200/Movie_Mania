import { View, Text, Image, SafeAreaView } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IMovie } from "../interfaces/IMovie";
import APIHandler from "../api";
import { IMAGE_URL } from "../api/constant";
import { AntDesign, Entypo, Fontisto } from "@expo/vector-icons";
import useLocalStore from "../store/store";
import Loading from "./Loading";
import ErrorScreen from "./ErrorScreen";

const MovieScreen = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigation();
  const { theme } = useLocalStore((state) => state);
  const getFromCache = (key: string) => {
    return queryClient.getQueryData([key]);
  };

  const route = useRoute().params as { id: number };
  const { id } = route;

  const {
    data: movie,
    isLoading,
    isError,
    refetch
  } = useQuery<IMovie>({
    queryKey: [`movie/${id}`],
    queryFn: async () => {
      const cache = getFromCache(`movie/${id}`);

      if (cache) {
        console.log("Cache Hit!");
        return cache;
      }

      const { error, data } = await APIHandler("GET", `/movie/${id}`);

      if (error) {
        console.error(data);
        return;
      }

      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if(isError){
    return <ErrorScreen retryFunction={refetch} />
  }

  return (
    <SafeAreaView flex={1} $dark-bgColor="$backgroundDark900">
      <View h="$1/3">
        <Image
          w={"$full"}
          objectFit="cover"
          h="$full"
          source={{ uri: IMAGE_URL + movie?.backdrop_path }}
          alt={String(id) + "_" + movie?.title}
          opacity={"$80"}
          borderBottomLeftRadius={100}
          borderBottomRightRadius={100}
        />
        <View
          position="absolute"
          top="$4"
          left={"$4"}
          borderWidth={1}
          borderColor={theme === "dark" ? "$borderLight100" : "$borderDark900"}
          p={4}
          rounded={"$full"}
        >
          <AntDesign
            name="back"
            size={24}
            color={theme === "dark" ? "white" : "black"}
            onPress={() => navigate.goBack()}
          />
        </View>
        <View position="absolute" top={"$24"} right={"$24"}>
          <Image
            source={{ uri: IMAGE_URL + movie?.poster_path }}
            alt={String(id) + "_" + movie?.poster_path}
            h="$64"
            w="$48"
            objectFit="contain"
            rounded={"$lg"}
          />
        </View>
      </View>
      <View mt="$32" gap="$4" flex={1}>
        <View
          px="$4"
          flexDirection="row"
          w="$full"
          justifyContent="space-between"
        >
          <View flexDirection="row" w="$3/4">
            {/* <MaterialIcons name="movie" size={24} /> */}
            <Text size="2xl" fontWeight={"$bold"}>
              {movie?.title}
            </Text>
          </View>
          <View flexDirection="row" alignItems="center" gap="$2">
            <AntDesign name="star" size={16} color={"#FFA534"} />
            <Text size="lg" fontWeight={"$bold"}>
              {movie?.vote_average?.toFixed(1)}
            </Text>
          </View>
        </View>
        <View px="$4" flexDirection="row" gap="$2">
          <Text size="sm">{movie?.genres?.map((g) => g.name).join(", ")}</Text>
          <Text size="sm">|</Text>
          <Text size="sm">{movie?.runtime} min</Text>
        </View>
        <View px="$4" flexDirection="row" gap="$4">
          <View
            flexDirection="row"
            alignItems="center"
            gap="$2"
            p="$2"
            borderWidth={1}
            rounded={"$lg"}
            borderColor={
              theme === "dark" ? "$borderLight100" : "$borderDark900"
            }
          >
            <Entypo
              name="language"
              size={20}
              color={theme === "dark" ? "white" : "black"}
            />
            <Text size="sm">English</Text>
          </View>
          <View
            flexDirection="row"
            alignItems="center"
            gap="$2"
            p="$2"
            borderWidth={1}
            borderColor={
              theme === "dark" ? "$borderLight100" : "$borderDark900"
            }
            rounded={"$lg"}
          >
            <Fontisto
              name="date"
              size={20}
              color={theme === "dark" ? "white" : "black"}
            />
            <Text size="sm">{movie?.release_date}</Text>
          </View>
        </View>
        <View
          px="$4"
          bgColor={
            theme === "dark" ? "$backgroundDark800" : "$backgroundLight200"
          }
          py="$4"
          gap="$2"
        >
          <Text fontSize={"$xl"} fontWeight={"$bold"}>
            Overview
          </Text>
          <Text size="sm" textAlign="justify">
            {movie?.overview}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MovieScreen;
