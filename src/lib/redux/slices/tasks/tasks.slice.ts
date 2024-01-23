/* Core */
import { Task } from "@/types/tasks";
import { generateTasks } from "@/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: TasksSliceState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ newTask: Task }>) => {
      const { newTask } = action.payload;
      state.tasks.push(newTask);
    },
    remove: (state, action: PayloadAction<{ taskId: string }>) => {
      const { taskId } = action.payload;
      state.tasks = state.tasks.filter(
        (currentTask) => currentTask.id !== taskId
      );
    },
    update: (state, action: PayloadAction<{ modifiedTask: Task }>) => {
      const { modifiedTask } = action.payload;
      state.tasks = state.tasks.map((currentTask) => {
        if (currentTask.id === modifiedTask.id) return modifiedTask;
        return currentTask;
      });
    },
    preload: (state, action: PayloadAction<number>) => {
      const numberOfTasks = action.payload;
      state.tasks = generateTasks(numberOfTasks);
    },
  },
});

const { actions } = tasksSlice;

export const { add, remove, update, preload } = actions;

/* Types */
export interface TasksSliceState {
  tasks: Task[];
}
