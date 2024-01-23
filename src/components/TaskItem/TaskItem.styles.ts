import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Checkbox, IconButton, TextField } from "@mui/material";

export const Item = styled.div<{ isActive: boolean }>`
  display: flex;
  padding: 0 60px;
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;

  "&:hover": {
    background-color: lightblue;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: lightblue;
    `}
`;

export const Details = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const Status = styled(Checkbox)`
  height: 24px;
  padding: 0;
  "& .muisvgicon-root": {
    font-size: 24px;
  }
  "&.mui-checked": {
    color: blue;
  }
`;

export const Description = styled(TextField)<{
  length?: number;
  isCompleted?: boolean;
}>(({ length, isCompleted }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      borderColor: "none",
    },
    "&.Mui-focused fieldset": {
      borderColor: "none",
    },
  },
  "& input": {
    textDecoration: length && isCompleted ? "line-through" : "none",
  },
}));

export const Menu = styled.div`
  display: flex;
  align-items: center;
  width: min-content;
`;

export const Action = styled(IconButton)`
  color: #72a0c1;
  cursor: pointer;
  padding: 8px;
`;
