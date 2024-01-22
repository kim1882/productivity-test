import styled from "@emotion/styled";
import { Button } from "@mui/material";

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
  width: 80%;
  margin: auto;
  overflow-y: auto;
  max-height: 70vh;
`;

export const DisplayMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: lightgray;
`;
