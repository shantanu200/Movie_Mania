import {
  View,
  Text,
  Badge,
  BadgeText,
  Pressable,
  useColorMode,
} from "@gluestack-ui/themed";
import React from "react";
import { IMovie } from "../interfaces/IMovie";
import { Image } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
import GENRE from "../data/genre";
import { useNavigation } from "@react-navigation/native";
import { IMAGE_URL } from "../api/constant";
import useLocalStore from "../store/store";

interface Props {
  movie: IMovie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const { theme } = useLocalStore((state) => state);
  const navigate = useNavigation().navigate;
  return (
    <Pressable
      px="$2"
      onPress={() => navigate("Movie:ID" as never, { id: movie?.id } as never)}
    >
      <View
        rounded={"$lg"}
        borderWidth={0.8}
        borderColor={theme === "dark" ? "$borderLight0" : "$borderDark900"}
        borderStyle="dashed"
        flexDirection="row"
        mt="$4"
        p="$4"
      >
        <Image
          source={{
            uri: IMAGE_URL + movie.poster_path,
          }}
          alt={movie?.poster_path + movie?.title}
          h="$64"
          aspectRatio={3 / 4}
          objectFit="contain"
          rounded={"$sm"}
        />
        <View
          bottom={"$2"}
          left={"$2"}
          position="absolute"
          bgColor={
            movie?.original_language === "en" ? "$green600" : "$purple600"
          }
          px="$2"
          rounded={"$sm"}
        >
          <Text color="$white" size="xs">
            {movie?.original_language?.toUpperCase()}
          </Text>
        </View>
        <View px="$4" gap={"$4"} w={"$5/6"}>
          <View gap="$1">
            <Text
              numberOfLines={2}
              fontWeight={"$semibold"}
              style={{ fontSize: 16 }}
            >
              {movie?.title}
            </Text>
            <Text fontSize={"$xs"} fontStyle="italic">
              {movie?.release_date}
            </Text>
          </View>
          <View gap={"$2"}>
            <View flexDirection="row" alignItems="center" gap="$1">
              <AntDesign name="star" size={16} color={"#FFA534"} />
              <Text fontSize={"$sm"} fontWeight={"$semibold"}>
                {movie?.vote_average.toFixed(2)}
              </Text>
              <Text fontSize={"$xs"}>({movie?.vote_count})</Text>
            </View>
            <View flexDirection="row" flexWrap="wrap" gap="$2">
              {movie?.genre_ids?.slice(0, 2)?.map((g, idx) => (
                <Badge key={g} size="sm" action="success" variant="outline">
                  <BadgeText>{GENRE[g]}</BadgeText>
                </Badge>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MovieCard;
