/* Instruments */
import type { ReduxState } from "@/lib/redux";

export const selectTasks = (state: ReduxState) => state.tasks.tasks;
