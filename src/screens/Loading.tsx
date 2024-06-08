import { SafeAreaView, Spinner } from "@gluestack-ui/themed";
import React from "react";
import useLocalStore from "../store/store";

const Loading = () => {
  const {theme}  = useLocalStore(state => state);
  return (
    <SafeAreaView flex={1} justifyContent="center" alignItems="center" bgColor={theme === "dark" ? "$backgroundDark900" : "$backgroundLight0"}>
      <Spinner size={"large"} h="$8" w="$8" />
    </SafeAreaView>
  );
};

export default Loading;
