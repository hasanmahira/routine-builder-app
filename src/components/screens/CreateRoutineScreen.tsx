import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { saveRoutine, Routine, Task } from "../../services/routines";
import { DatePicker } from "@nativescript/core";

type CreateRoutineScreenProps = {
  route: RouteProp<MainStackParamList, "CreateRoutine">;
  navigation: FrameNavigationProp<MainStackParamList, "CreateRoutine">;
};

export function CreateRoutineScreen({ navigation }: CreateRoutineScreenProps) {
  const [routineName, setRoutineName] = React.useState("");
  const [tasks, setTasks] = React.useState<Task[]>([{ id: "1", description: "", completed: false }]);
  const [frequency, setFrequency] = React.useState<"daily" | "weekly" | "monthly">("daily");
  const [startDate, setStartDate] = React.useState(new Date());

  const addTask = () => {
    setTasks([...tasks, { id: Date.now().toString(), description: "", completed: false }]);
  };

  const updateTask = (id: string, description: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, description } : task
    );
    setTasks(updatedTasks);
  };

  const saveNewRoutine = async () => {
    const newRoutine: Routine = {
      id: Date.now().toString(),
      name: routineName,
      tasks: tasks.filter(task => task.description.trim() !== ""),
      frequency,
      startDate: startDate.toISOString(),
      streak: 0
    };
    await saveRoutine(newRoutine);
    navigation.navigate("Routines");
  };

  return (
    <scrollView className="p-4">
      <label className="text-2xl font-bold mb-4">Create New Routine</label>
      <textField
        className="border-b-2 border-gray-300 p-2 mb-4"
        hint="Routine Name"
        value={routineName}
        onTextChange={(args) => setRoutineName(args.value)}
      />
      {tasks.map((task) => (
        <textField
          key={task.id}
          className="border-b-2 border-gray-300 p-2 mb-2"
          hint="Task description"
          value={task.description}
          onTextChange={(args) => updateTask(task.id, args.value)}
        />
      ))}
      <button
        className="bg-blue-500 text-white p-2 rounded-lg mb-4"
        onTap={addTask}
      >
        Add Task
      </button>
      <label className="text-lg font-bold mb-2">Frequency</label>
      <listPicker
        className="mb-4"
        items={["daily", "weekly", "monthly"]}
        selectedIndex={["daily", "weekly", "monthly"].indexOf(frequency)}
        onSelectedIndexChange={(args) => setFrequency(["daily", "weekly", "monthly"][args.newIndex] as "daily" | "weekly" | "monthly")}
      />
      <label className="text-lg font-bold mb-2">Start Date</label>
      <datePicker
        className="mb-4"
        date={startDate}
        onDateChange={(args) => setStartDate(args.value)}
      />
      <button
        className="bg-green-500 text-white p-4 rounded-lg"
        onTap={saveNewRoutine}
      >
        Save Routine
      </button>
    </scrollView>
  );
}