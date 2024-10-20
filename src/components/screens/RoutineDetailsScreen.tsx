import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { getRoutines, updateRoutine, deleteRoutine, updateTaskCompletion, Routine } from "../../services/routines";
import { validateRoutineName, validateTask } from "../../utils/validation";
import { ProgressBar } from "@nativescript/core";

type RoutineDetailsScreenProps = {
  route: RouteProp<MainStackParamList, "RoutineDetails">;
  navigation: FrameNavigationProp<MainStackParamList, "RoutineDetails">;
};

export function RoutineDetailsScreen({ route, navigation }: RoutineDetailsScreenProps) {
  const { routineId } = route.params;
  const [routine, setRoutine] = React.useState<Routine | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchRoutine = async () => {
      const routines = await getRoutines();
      const foundRoutine = routines.find(r => r.id === routineId);
      setRoutine(foundRoutine || null);
    };
    fetchRoutine();
  }, [routineId]);

  const handleUpdateRoutine = async () => {
    if (!routine) return;

    if (!validateRoutineName(routine.name)) {
      setError("Routine name cannot be empty");
      return;
    }

    if (routine.tasks.some(task => !validateTask(task.description))) {
      setError("Tasks cannot be empty");
      return;
    }

    await updateRoutine(routine);
    navigation.goBack();
  };

  const handleDeleteRoutine = async () => {
    await deleteRoutine(routineId);
    navigation.goBack();
  };

  const handleTaskCompletion = async (taskId: string, completed: boolean) => {
    if (!routine) return;
    await updateTaskCompletion(routine.id, taskId, completed);
    const updatedRoutine = { ...routine, tasks: routine.tasks.map(task => task.id === taskId ? { ...task, completed } : task) };
    setRoutine(updatedRoutine);
  };

  if (!routine) {
    return <label>Loading...</label>;
  }

  const completedTasks = routine.tasks.filter(task => task.completed).length;
  const progress = completedTasks / routine.tasks.length;

  return (
    <scrollView className="p-4">
      <label className="text-2xl font-bold mb-4">Routine Details</label>
      <textField
        className="border-b-2 border-gray-300 p-2 mb-4"
        hint="Routine Name"
        value={routine.name}
        onTextChange={(args) => setRoutine({ ...routine, name: args.value })}
      />
      <label className="text-lg font-bold mb-2">Progress</label>
      <progressBar value={progress * 100} maxValue={100} className="mb-4" />
      <label className="text-lg mb-4">Streak: {routine.streak} days</label>
      <label className="text-lg font-bold mb-2">Tasks</label>
      {routine.tasks.map((task) => (
        <gridLayout columns="*, auto" className="mb-2" key={task.id}>
          <textField
            col="0"
            className="border-b-2 border-gray-300 p-2"
            hint="Task description"
            value={task.description}
            onTextChange={(args) => {
              const updatedTasks = routine.tasks.map(t => t.id === task.id ? { ...t, description: args.value } : t);
              setRoutine({ ...routine, tasks: updatedTasks });
            }}
          />
          <switch
            col="1"
            checked={task.completed}
            onCheckedChange={(args) => handleTaskCompletion(task.id, args.value)}
          />
        </gridLayout>
      ))}
      {error ? <label className="text-red-500 mb-4">{error}</label> : null}
      <button
        className="bg-blue-500 text-white p-4 rounded-lg mb-4"
        onTap={handleUpdateRoutine}
      >
        Update Routine
      </button>
      <button
        className="bg-red-500 text-white p-4 rounded-lg"
        onTap={handleDeleteRoutine}
      >
        Delete Routine
      </button>
    </scrollView>
  );
}