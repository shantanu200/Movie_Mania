import React from "react";
import { Button, ButtonText, SafeAreaView } from "@gluestack-ui/themed";
import LottieView from "lottie-react-native";
import { Text } from "@gluestack-ui/themed";
import useLocalStore from "../store/store";
import { View } from "@gluestack-ui/themed";

interface Props {
  retryFunction?: () => void;
}

const ErrorScreen: React.FC<Props> = ({ retryFunction }) => {
  const { theme } = useLocalStore((state) => state);
  return (
    <SafeAreaView
      flex={1}
      $dark-backgroundColor="$backgroundDark900"
      alignItems="center"
      justifyContent="center"
    >
      <LottieView
        source={require("../../assets/error.json")}
        autoPlay
        loop
        style={{
          width: 350,
          height: 200,
        }}
      />
      <Text
        mt="$8"
        fontSize={"$xl"}
        fontWeight={"$semibold"}
        fontStyle="italic"
      >
        Unable to fetch Data
      </Text>
      <View mt="$4">
        <Button
          size="sm"
          bgColor={
            theme === "dark" ? "$backgroundDark700" : "$backgroundDark900"
          }
          onPress={retryFunction}
          borderColor="$borderDark500"
          variant="solid"
          borderWidth={2}
          borderBottomWidth={6}
          rounded={"$xl"}
        >
          <ButtonText>Retry</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ErrorScreen;
