import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { css } from "@emotion/react";

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
