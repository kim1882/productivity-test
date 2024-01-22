import { Duration, Task } from "@/types/tasks";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const formatDate = (date: Date) =>
  moment(date).format("dddd, MMMM D, YYYY h:mm:ss A");

const generateRandomTask = () => {
  // Creation date within the last 30 days
  const randomCreationDate = new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  );

  const randomDuration =
    Math.random() < 0.33
      ? Duration.Short
      : Math.random() < 0.66
      ? Duration.Medium
      : Duration.Long;

  const task: Task = {
    id: uuidv4(),
    description: `Task ${formatDate(randomCreationDate)}`,
    isCompleted: false,
    creationDate: randomCreationDate.getTime(),
    durationInMilliseconds: randomDuration,
  };

  return task;
};

export const generateTasks = (numberOfTasks: number) => {
  const tasks: Task[] = [];

  for (let i = 0; i < numberOfTasks; i++) {
    tasks.push(generateRandomTask());
  }

  return tasks;
};
