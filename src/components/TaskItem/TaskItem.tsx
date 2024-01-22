import { Task } from "@/types/tasks";
import { DeleteOutline as DeleteIcon } from "@mui/icons-material";
import {
  DeleteTask,
  Description,
  Details,
  Item,
  Menu,
  Status,
} from "./TaskItem.styles";

interface ITaskItem {
  task: Task;
  onUpdate: (modifiedTask: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = ({ task, onUpdate, onDelete }: ITaskItem) => {
  const { id, description, isCompleted, creationDate, durationInMilliseconds } =
    task;

  const updateTask = (key: string, value: string | boolean | number) => {
    const modifiedTask = { ...task, [key]: value };
    onUpdate(modifiedTask);
  };

  return (
    <Item>
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
      </Details>
      <Menu>
        <DeleteTask onClick={() => onDelete(id)}>
          <DeleteIcon />
        </DeleteTask>
      </Menu>
    </Item>
  );
};

export default TaskItem;
