import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { getRoutines, Routine } from "../../services/routines";

type RoutinesScreenProps = {
  route: RouteProp<MainStackParamList, "Routines">;
  navigation: FrameNavigationProp<MainStackParamList, "Routines">;
};

export function RoutinesScreen({ navigation }: RoutinesScreenProps) {
  const [routines, setRoutines] = React.useState<Routine[]>([]);

  React.useEffect(() => {
    const fetchRoutines = async () => {
      const fetchedRoutines = await getRoutines();
      setRoutines(fetchedRoutines);
    };
    fetchRoutines();
  }, []);

  return (
    <scrollView className="p-4">
      <label className="text-2xl font-bold mb-4">Your Routines</label>
      {routines.map((routine) => (
        <stackLayout
          key={routine.id}
          className="bg-white p-4 rounded-lg shadow-md mb-4"
          onTap={() => navigation.navigate("RoutineDetails", { routineId: routine.id })}
        >
          <label className="text-lg font-bold">{routine.name}</label>
          <label className="text-sm text-gray-500">{routine.tasks.length} tasks</label>
        </stackLayout>
      ))}
      <button
        className="bg-blue-500 text-white p-4 rounded-lg"
        onTap={() => navigation.navigate("CreateRoutine")}
      >
        Create New Routine
      </button>
    </scrollView>
  );
}