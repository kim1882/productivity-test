import {
  millisToMinutes,
  formatToHoursMinutes,
  formatToHoursMinutesSeconds,
  minutesToMillis,
} from "@/utils";
import {
  Category,
  Container,
  DurationInput,
  EditDuration,
  ModalActions,
  Time,
  Timer,
} from "./Duration.styles";
import { CategoryLabel } from "@/constants";
import { Edit as EditIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

interface IDuration {
  isActive: boolean;
  elapsedTime: number;
  totalTime: number;
  onUpdateDuration: (newDurationInMillis: number) => void;
}

const Duration = ({
  isActive,
  elapsedTime,
  totalTime,
  onUpdateDuration,
}: IDuration) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [durationInMinutes, setDurationInMinutes] = useState(
    millisToMinutes(totalTime)
  );

  const onSave = () => {
    onUpdateDuration(minutesToMillis(durationInMinutes));
    setShowEditModal(false);
  };

  return (
    <>
      {isActive && <Timer>{formatToHoursMinutesSeconds(elapsedTime)}</Timer>}
      <Container>
        {isActive ? (
          <Time>{formatToHoursMinutes(totalTime)}</Time>
        ) : (
          <Time>
            {`${formatToHoursMinutes(elapsedTime)}/${formatToHoursMinutes(
              totalTime
            )}`}
            <EditDuration
              className="edit-icon"
              onClick={() => setShowEditModal(true)}
            >
              <EditIcon />
            </EditDuration>
          </Time>
        )}
        <Category
          size="small"
          duration={totalTime}
          label={CategoryLabel[totalTime] || "Custom"}
        />
      </Container>
      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
        <DialogTitle>Duration (minutes)</DialogTitle>
        <DialogContent>
          <DurationInput
            type="number"
            value={durationInMinutes}
            onChange={({ target: { value } }) =>
              setDurationInMinutes(Number(value))
            }
            fullWidth
          />
          <ModalActions>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={onSave}>
              Save
            </Button>
          </ModalActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Duration;
