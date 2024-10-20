import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { getRoutines, Routine } from "../../services/routines";
import { getCurrentUser, User } from "../../services/auth";
import { Share } from "@nativescript/core";

type SocialScreenProps = {
  route: RouteProp<MainStackParamList, "Social">;
  navigation: FrameNavigationProp<MainStackParamList, "Social">;
};

export function SocialScreen({ navigation }: SocialScreenProps) {
  const [routines, setRoutines] = React.useState<Routine[]>([]);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedRoutines = await getRoutines();
      setRoutines(fetchedRoutines);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchData();
  }, []);

  const handleShareRoutine = async (routine: Routine) => {
    const shareText = `Check out my routine "${routine.name}" on Routine Builder!`;
    await Share.share({
      title: "Share Routine",
      text: shareText,
      android: {
        packageName: "com.yourcompany.routinebuilder",
      },
      ios: {
        activityTypes: ["com.apple.UIKit.activity.PostToFacebook", "com.apple.UIKit.activity.PostToTwitter"],
      },
    });
  };

  return (
    <scrollView className="p-4">
      <label className="text-2xl font-bold mb-4">Social</label>
      {user && (
        <label className="text-lg mb-4">Welcome, {user.email}!</label>
      )}
      <label className="text-lg font-bold mb-2">Your Routines</label>
      {routines.map(routine => (
        <gridLayout columns="*, auto" className="mb-4" key={routine.id}>
          <label col="0" className="text-lg">{routine.name}</label>
          <button
            col="1"
            className="bg-blue-500 text-white p-2 rounded-lg"
            onTap={() => handleShareRoutine(routine)}
          >
            Share
          </button>
        </gridLayout>
      ))}
    </scrollView>
  );
}