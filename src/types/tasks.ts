export enum Duration {
  Short = 30 * 60 * 1000, // 30 minutes
  Medium = 45 * 60 * 1000, // 45 minutes
  Long = 60 * 60 * 1000, // 1 hour
}
export interface Task {
  id: string;
  isActive: boolean;
  description: string;
  isCompleted: boolean;
  creationDate: number;
  durationInMilliseconds: Duration | number;
  elapsedTimeInMilliseconds: number;
}

export enum Filter {
  All = "All",
  Short = "Short",
  Medium = "Medium",
  Long = "Long",
}
