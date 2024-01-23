import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Chip, IconButton, TextField } from "@mui/material";
import { CategoryColor } from "@/constants";

export const Container = styled.div`
  display: flex;
  min-width: 170px;
  margin-right: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const EditDuration = styled(IconButton)`
  display: none;
  padding: 4px;
`;

export const Timer = styled.div`
  color: black;
  font-weight: bold;
  font-size: 14px;
  margin-right: 40px;
`;

export const Time = styled.div`
  display: flex;
  color: darkgray;
  font-size: 12px;
  align-items: center;
  justify-content: center;

  &:hover {
    .edit-icon {
      display: inline-block;
    }
  }
`;

export const Category = styled(Chip)<{ duration: number }>`
  width: 70px;
  color: white;
  font-weight: bold;
  ${({ duration }) => css`
    background-color: ${CategoryColor[duration] || "#E51FE5"};
  `}
`;

export const DurationInput = styled(TextField)`
  width: auto;
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  margin-top: 16px;
  justify-content: space-between;
`;
