import { Task } from "@/types/tasks";
import {
  DeleteOutline as DeleteIcon,
  PlayArrow as StartIcon,
  Stop as StopIcon,
} from "@mui/icons-material";
import {
  Action,
  Description,
  Details,
  Item,
  Menu,
  Status,
} from "./TaskItem.styles";
import Duration from "../Duration";
import { useEffect, useState } from "react";

interface ITaskItem {
  task: Task;
  onUpdate: (modifiedTask: Task) => void;
  onDelete: (taskId: string) => void;
  onStart: (taskId: string) => void;
  onStop: (taskId: string, elapsedMillis: number) => void;
}

const TaskItem = ({ task, onUpdate, onDelete, onStart, onStop }: ITaskItem) => {
  let timer: NodeJS.Timeout;
  const {
    id,
    isActive,
    description,
    isCompleted,
    durationInMilliseconds,
    elapsedTimeInMilliseconds,
  } = task;
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(elapsedTimeInMilliseconds);

  const updateTask = (key: string, value: string | boolean | number) => {
    const modifiedTask = { ...task, [key]: value };
    onUpdate(modifiedTask);

    // When marking task as completed
    if (key === "isCompleted" && value === true) {
      // Stop if task is active
      if (isActive) {
        onStop(id, elapsedTime);
      }
    }
  };

  const start = () => {
    setStartTime(new Date());
    onStart(id);
  };

  const stop = () => {
    if (startTime) {
      const endTime = new Date();
      const elapsedMillis = endTime.getTime() - startTime.getTime();
      setElapsedTime((initialElapsedMillis) => {
        const newElapsed = initialElapsedMillis + elapsedMillis;
        onStop(id, newElapsed);
        return newElapsed;
      });
    }
  };

  useEffect(() => {
    if (startTime && isActive) {
      timer = setInterval(() => {
        setElapsedTime((initialElapsedMillis) => initialElapsedMillis + 1000);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, startTime]);

  useEffect(() => {
    if (!isActive) {
      setElapsedTime(elapsedTimeInMilliseconds);
    }

    // Clean up when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <Item isActive={isActive}>
      <Details>
        <Status
          disabled={description.length === 0}
          checked={isCompleted}
          onChange={({ target: { checked } }) =>
            updateTask("isCompleted", checked)
          }
        />
        <Description
          autoFocus
          fullWidth
          variant="outlined"
          size="small"
          defaultValue={description}
          placeholder="Add a task description"
          onBlur={({ target: { value } }) => updateTask("description", value)}
          length={description.length}
          isCompleted={isCompleted}
        />
        <Duration
          isActive={isActive}
          isCompleted={isCompleted}
          elapsedTime={elapsedTime}
          totalTime={durationInMilliseconds}
          onUpdateDuration={(newDurationInMillis: number) =>
            updateTask("durationInMilliseconds", newDurationInMillis)
          }
        />
      </Details>
      <Menu>
        {isActive ? (
          <Action onClick={stop}>
            <StopIcon />
          </Action>
        ) : (
          <Action disabled={isCompleted} onClick={start}>
            <StartIcon />
          </Action>
        )}
        <Action onClick={() => onDelete(id)}>
          <DeleteIcon />
        </Action>
      </Menu>
    </Item>
  );
};

export default TaskItem;
