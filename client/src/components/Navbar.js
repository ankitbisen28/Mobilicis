import React from "react";
import { AppBar, Box, Typography } from "@mui/material";

export const Navbar = () => {
  return (
    <AppBar sx={{ boxShadow: "none" }} color="light">
      <Box>
        <Typography variant="h5" color="info">
          Dashboard
        </Typography>
      </Box>
    </AppBar>
  );
};
