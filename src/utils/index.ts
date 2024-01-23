import { Duration, Task } from "@/types/tasks";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const generateRandomTask = () => {
  // Creation date within the last 7 days
  const randomCreationDate = new Date(
    Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
  );

  const randomDuration =
    Math.random() < 0.33
      ? Duration.Short
      : Math.random() < 0.66
      ? Duration.Medium
      : Duration.Long;

  // Elapsed time between 80% and 100%
  const elapsedTimePercentage = Math.random() * 0.2 + 0.8;
  const elapsedTimeInMilliseconds =
    randomDuration === Duration.Long
      ? randomDuration
      : Math.floor(randomDuration * elapsedTimePercentage);

  const id = uuidv4();

  const task: Task = {
    id,
    description: `Task ${id}`,
    isCompleted: true,
    isActive: false,
    creationDate: randomCreationDate.getTime(),
    durationInMilliseconds: randomDuration,
    elapsedTimeInMilliseconds,
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

const getDuration = (milliseconds: number) => {
  const duration = moment.duration(milliseconds);
  const hours = String(duration.hours()).padStart(2, "0");
  const minutes = String(duration.minutes()).padStart(2, "0");
  const seconds = String(duration.seconds()).padStart(2, "0");
  return { hours, minutes, seconds };
};

export const formatToHoursMinutes = (milliseconds: number) => {
  const { hours, minutes } = getDuration(milliseconds);
  return `${hours}:${minutes}`;
};

export const formatToHoursMinutesSeconds = (milliseconds: number) => {
  const { hours, minutes, seconds } = getDuration(milliseconds);
  return `${hours}:${minutes}:${seconds}`;
};

export const millisToMinutes = (milliseconds: number): number => {
  return milliseconds / (60 * 1000);
};

export const minutesToMillis = (minutes: number): number => {
  const millisecondsInMinute = 60 * 1000;
  return minutes * millisecondsInMinute;
};
