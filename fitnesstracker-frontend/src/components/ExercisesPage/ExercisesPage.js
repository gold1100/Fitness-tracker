import * as React from "react";
import Box from "@mui/material/Box";
import { Toolbar, Paper, Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import NavigationBar from "../NavigationBar";
import { useEffect, useState } from "react";
import ExerciseService from "../../services/ExerciseService";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import dayjs from "dayjs";
import DeleteConfirmModal from "../DeleteConfirmModal";
import AddExerciseModal from "./AddExerciseModal";

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [selected, setSelected] = useState("");
  const [modals, setModals] = useState({
    deleteModalOpen: false,
    addModalOpen: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const exercises = await ExerciseService.getAllExercises();
        let newState = exercises.data;
        newState.forEach(async (exercise) => {
          const maxWeight = await ExerciseService.getMaxWeightRaised(
            exercise.id
          );
          exercise.maxWeight = maxWeight.data.maxWeight;
          exercise.maxWeightDate = maxWeight.data.date;
        });
        setExercises(newState);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchData();
  }, []);

  const handleExerciseChange = (event, value) => {
    setSelected(value);
  };

  const handleDeleteOpen = () => {
    setModals({ ...modals, deleteModalOpen: true });
  };

  const handleDeleteClose = () => {
    setModals({ ...modals, deleteModalOpen: false });
  };

  const handleAddOpen = () => {
    setModals({ ...modals, addModalOpen: true });
  };

  const handleAddClose = () => {
    setModals({ ...modals, addModalOpen: false });
  };

  const deleteExercise = async () => {
    handleDeleteClose();
    try {
      await ExerciseService.deleteExercise(selected.id);
      setExercises((prevState) =>
        prevState.filter((exercise) => exercise.id !== selected.id)
      );
      setSelected("");
    } catch (error) {
      alert(error);
    }
  };

  const addExercise = async (exercise) => {
    handleAddClose();
    try {
      const response = await ExerciseService.addExercise(exercise);
      let newState = [...exercises, response.data];
      setExercises(newState);
      setSelected("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <AddExerciseModal
        open={modals.addModalOpen}
        onClose={handleAddClose}
        onSubmit={addExercise}
      />
      <DeleteConfirmModal
        open={modals.deleteModalOpen}
        onClose={handleDeleteClose}
        onDelete={deleteExercise}
        text="Are you sure you want to delete this exercise?"
      />
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
              <Box
                sx={{
                  display: "flex",
                  m: 1,
                  p: 1,
                  alignContent: "center",
                }}
              >
                <Autocomplete
                  key={exercises}
                  disablePortal
                  disableClearable
                  options={exercises}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: 300 }}
                  onChange={(event, value) =>
                    handleExerciseChange(event, value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Exercise" />
                  )}
                />
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ ml: 2, mr: 1 }}
                  onClick={handleAddOpen}
                >
                  Add
                </Button>
                {selected !== "" && (
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={handleDeleteOpen}
                  >
                    Delete
                  </Button>
                )}
              </Box>
              <Stack sx={{ m: 1, mt: 10, p: 1 }}>
                {selected !== "" && (
                  <>
                    <Typography variant="h5">
                      Maximum weight lifted: {selected.maxWeight}kg
                    </Typography>
                    {selected.maxWeightDate !== null && (
                      <Typography variant="h5">
                        at: {dayjs(selected.maxWeightDate).format("DD/MM/YYYY")}
                      </Typography>
                    )}
                  </>
                )}
              </Stack>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ExercisesPage;
