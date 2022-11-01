import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import WorkoutsPage from "./components/WorkoutsPage/WorkoutsPage";
import ExercisesPage from "./components/ExercisesPage/ExercisesPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <BrowserRouter>
            <Routes>
              <Route index element={<WorkoutsPage />} />
              <Route path="/exercises" element={<ExercisesPage />}></Route>
              <Route path="/" element={<WorkoutsPage />} />
            </Routes>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
