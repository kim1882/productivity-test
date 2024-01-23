import styled from "@emotion/styled";
import { Button, Chip } from "@mui/material";
import { css } from "@emotion/react";

export const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;

export const ActionButton = styled(Button)`
  svg {
    margin-right: 8px;
  }
`;

export const Content = styled.div`
  width: 100%;
  margin: 20px 40px;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: auto;
  overflow-y: auto;
  max-height: 70vh;
`;

export const DisplayMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: lightgray;
`;

export const FilterOptions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Option = styled(Chip)<{
  isSelected: boolean;
  backgroundColor: string;
}>`
  width: 70px;
  color: white;
  font-weight: bold;
  cursor: pointer;

  ${({ isSelected, backgroundColor }) => css`
    background-color: ${isSelected ? backgroundColor : "gray"};
  `}

  &:hover {
    color: black;
  }
`;
