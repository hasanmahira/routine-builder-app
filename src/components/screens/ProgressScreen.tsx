import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { getRoutines, Routine } from "../../services/routines";
import { BarChart } from 'nativescript-ui-chart';

type ProgressScreenProps = {
  route: RouteProp<MainStackParamList, "Progress">;
  navigation: FrameNavigationProp<MainStackParamList, "Progress">;
};

export function ProgressScreen({ navigation }: ProgressScreenProps) {
  const [routines, setRoutines] = React.useState<Routine[]>([]);

  React.useEffect(() => {
    const fetchRoutines = async () => {
      const fetchedRoutines = await getRoutines();
      setRoutines(fetchedRoutines);
    };
    fetchRoutines();
  }, []);

  const chartData = routines.map(routine => ({
    name: routine.name,
    streak: routine.streak,
    completion: routine.tasks.filter(task => task.completed).length / routine.tasks.length
  }));

  return (
    <scrollView className="p-4">
      <label className="text-2xl font-bold mb-4">Your Progress</label>
      <BarChart
        width={300}
        height={200}
        data={chartData}
        xKey="name"
        yKeys={['streak', 'completion']}
        colors={['#4CAF50', '#2196F3']}
        className="mb-4"
      />
      {routines.map(routine => (
        <stackLayout key={routine.id} className="mb-4">
          <label className="text-lg font-bold">{routine.name}</label>
          <label>Streak: {routine.streak} days</label>
          <label>Completion: {(routine.tasks.filter(task => task.completed).length / routine.tasks.length * 100).toFixed(2)}%</label>
        </stackLayout>
      ))}
    </scrollView>
  );
}