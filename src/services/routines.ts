import { storeData, getData } from './storage';

const ROUTINES_KEY = 'routines';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export interface Routine {
  id: string;
  name: string;
  tasks: Task[];
  frequency: 'daily' | 'weekly' | 'monthly';
  startDate: string;
  streak: number;
}

export const saveRoutine = async (routine: Routine): Promise<void> => {
  const existingRoutines = await getRoutines();
  const updatedRoutines = [...existingRoutines, routine];
  await storeData(ROUTINES_KEY, updatedRoutines);
};

export const getRoutines = async (): Promise<Routine[]> => {
  const routines = await getData(ROUTINES_KEY);
  return routines || [];
};

export const updateRoutine = async (updatedRoutine: Routine): Promise<void> => {
  const existingRoutines = await getRoutines();
  const updatedRoutines = existingRoutines.map(routine => 
    routine.id === updatedRoutine.id ? updatedRoutine : routine
  );
  await storeData(ROUTINES_KEY, updatedRoutines);
};

export const deleteRoutine = async (routineId: string): Promise<void> => {
  const existingRoutines = await getRoutines();
  const updatedRoutines = existingRoutines.filter(routine => routine.id !== routineId);
  await storeData(ROUTINES_KEY, updatedRoutines);
};

export const updateTaskCompletion = async (routineId: string, taskId: string, completed: boolean): Promise<void> => {
  const existingRoutines = await getRoutines();
  const updatedRoutines = existingRoutines.map(routine => {
    if (routine.id === routineId) {
      const updatedTasks = routine.tasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      );
      return { ...routine, tasks: updatedTasks };
    }
    return routine;
  });
  await storeData(ROUTINES_KEY, updatedRoutines);
};

export const updateRoutineStreak = async (routineId: string): Promise<void> => {
  const existingRoutines = await getRoutines();
  const updatedRoutines = existingRoutines.map(routine => {
    if (routine.id === routineId) {
      return { ...routine, streak: routine.streak + 1 };
    }
    return routine;
  });
  await storeData(ROUTINES_KEY, updatedRoutines);
};