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

const NUMBER_OF_TASKS = 3;

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks: Task[] = useSelector(selectTasks);

  const byCreationDate = (taskA: Task, taskB: Task) =>
    taskA.creationDate - taskB.creationDate;

  const sortedByDateTasks = useMemo(() => {
    const orderedItems = [...tasks].sort(byCreationDate);
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
      creationDate: new Date().getTime(),
      durationInMilliseconds: Duration.Short,
    };
    dispatch(add({ newTask }));
  };

  const updateTask = (modifiedTask: Task) => {
    dispatch(update({ modifiedTask }));
  };

  const deleteTask = (taskId: string) => {
    dispatch(remove({ taskId }));
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
        {sortedByDateTasks.length ? (
          <List>
            {sortedByDateTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
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
