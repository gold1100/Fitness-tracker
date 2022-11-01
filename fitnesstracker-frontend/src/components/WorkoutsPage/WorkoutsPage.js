import * as React from "react";
import { Toolbar, Paper, Box } from "@mui/material";
import { Container } from "@mui/system";
import MainTable from "./MainTable";
import NavigationBar from "../NavigationBar";

const WorkoutsPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavigationBar />
      <Box sx={{ width: "100%" }}>
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4, width: "100%" }}>
          <Paper
            sx={{
              p: 4,
              overflow: "auto",
            }}
          >
            <MainTable />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default WorkoutsPage;
