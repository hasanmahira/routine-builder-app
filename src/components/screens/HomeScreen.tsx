import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type HomeScreenProps = {
  route: RouteProp<MainStackParamList, "Home">;
  navigation: FrameNavigationProp<MainStackParamList, "Home">;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <scrollView className="p-4">
      <label className="text-2xl font-bold mb-4">Welcome to Routine Builder</label>
      <label className="text-lg mb-4">Start building your perfect routine today!</label>
      <button
        className="bg-blue-500 text-white p-4 rounded-lg"
        onTap={() => navigation.navigate("CreateRoutine")}
      >
        Create New Routine
      </button>
    </scrollView>
  );
}