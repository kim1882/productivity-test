import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IPageWrapper {
  header?: string;
  children: React.ReactNode;
}

export default function PageWrapper({ header, children }: IPageWrapper) {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {header && (
          <Typography variant="body1" fontWeight="bold" color="gray">
            {header}
          </Typography>
        )}
        {children}
      </Box>
    </Container>
  );
}
