"use client";

import PreloadIcon from "@mui/icons-material/DownloadDone";
import AddIcon from "@mui/icons-material/Add";
import { useMemo } from "react";
import {
  preload,
  selectTasks,
  update,
  remove,
  useDispatch,
  useSelector,
  add,
  start,
  stop,
} from "@/lib/redux";
import { Duration, Task } from "@/types/tasks";
import {
  ActionButton,
  Actions,
  Content,
  DisplayMessage,
  List,
} from "./TaskList.styles";
import TaskItem from "../TaskItem";
import { v4 as uuidv4 } from "uuid";

const NUMBER_OF_TASKS = 50;

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks: Task[] = useSelector(selectTasks);

  const byCreationDate = (taskA: Task, taskB: Task) =>
    taskB.creationDate - taskA.creationDate;

  const byIsActive = (taskA: Task, taskB: Task) =>
    taskA.isActive === taskB.isActive ? 0 : taskA.isActive ? -1 : 1;

  const sortedTasks = useMemo(() => {
    const orderedItems = [...tasks].sort(byCreationDate).sort(byIsActive);
    return orderedItems;
  }, [tasks]);

  const preloadTasks = () => {
    dispatch(preload(NUMBER_OF_TASKS));
  };

  const addNewTask = () => {
    const newTask: Task = {
      id: uuidv4(),
      description: "",
      isCompleted: false,
      isActive: false,
      creationDate: new Date().getTime(),
      durationInMilliseconds: Duration.Short,
      elapsedTimeInMilliseconds: 0,
    };
    dispatch(add({ newTask }));
  };

  const updateTask = (modifiedTask: Task) => {
    dispatch(update({ modifiedTask }));
  };

  const deleteTask = (taskId: string) => {
    dispatch(remove({ taskId }));
  };

  const startTask = (taskId: string) => {
    dispatch(start({ taskId }));
  };

  const stopTask = (taskId: string) => {
    dispatch(stop({ taskId }));
  };

  return (
    <>
      <Actions>
        <ActionButton onClick={preloadTasks}>
          <PreloadIcon />
          Preload Tasks
        </ActionButton>
        <ActionButton onClick={addNewTask}>
          <AddIcon />
          Add New Task
        </ActionButton>
      </Actions>
      <Content>
        {sortedTasks.length ? (
          <List>
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onStart={startTask}
                onStop={stopTask}
              />
            ))}
          </List>
        ) : (
          <DisplayMessage>
            No tasks created yet. Start by adding a new task!
          </DisplayMessage>
        )}
      </Content>
    </>
  );
};
export default TaskList;
