import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExerciseService from "../../services/ExerciseService";

const AddSetModal = (props) => {
  const { open, onClose, onSubmit } = props;
  const [exercises, setExercises] = useState([]);
  const [exerciseSet, setExerciseSet] = useState({
    exercise: {
      id: "",
      name: "",
    },
    repetitions: "",
    weight: "",
    inputError: false,
  });

  useEffect(() => {
    async function fetchExercises() {
      const response = await ExerciseService.getAllExercises();
      setExercises(response.data);
    }
    fetchExercises();
  }, []);

  const handleClose = () => {
    ErrorStateFalse();
    onClose();
  };

  const handleSubmit = () => {
    verifyInput();
  };

  const verifyInput = () => {
    if (
      !isNaN(exerciseSet.weight) && // weight must be a num
      !isNaN(exerciseSet.repetitions) &&
      Number.isInteger(Number(exerciseSet.repetitions)) && // reps must be an int
      exerciseSet.repetitions > 0 &&
      exerciseSet.weight > 0 &&
      exerciseSet.exercise.name !== "" // exercise cant be empty
    ) {
      let exSetDTO = { ...exerciseSet };
      delete exSetDTO.inputError;
      ErrorStateFalse();
      onSubmit(exSetDTO);
    } else {
      ErrorStateTrue();
    }
  };

  const ErrorStateTrue = () => {
    setExerciseSet((prev) => ({
      ...prev,
      inputError: true,
    }));
  };

  const ErrorStateFalse = () => {
    setExerciseSet((prev) => ({
      ...prev,
      inputError: false,
    }));
  };

  const handleExerciseChange = (event, child) => {
    setExerciseSet((prevState) => ({
      ...prevState,
      exercise: {
        id: child.props.id,
        name: event.target.value,
      },
      repetitions: "",
      weight: "",
    }));
  };

  const handleRepetitionsChange = (event) => {
    setExerciseSet((prevState) => ({
      ...prevState,
      repetitions: event.target.value,
    }));
  };

  const handleWeightChange = (event) => {
    setExerciseSet((prevState) => ({
      ...prevState,
      weight: event.target.value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add set</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl size="medium" sx={{ width: "50%", minWidth: "140px" }}>
              <InputLabel>Exercise</InputLabel>
              <Select
                label="Exercise"
                value={exerciseSet.exercise.name}
                onChange={(event, child) => handleExerciseChange(event, child)}
              >
                {exercises.map((ex) => (
                  <MenuItem key={ex.id} id={ex.id} value={ex.name}>
                    {ex.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={4}>
            <TextField
              sx={{ minWidth: "140px" }}
              label="Repetitions"
              value={exerciseSet.repetitions}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => handleRepetitionsChange(event)}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              sx={{ minWidth: "140px" }}
              label="Weight"
              value={exerciseSet.weight}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => handleWeightChange(event)}
            />
          </Grid>
          <Grid item>
            {exerciseSet.inputError ? (
              <Alert severity="error">
                <strong>
                  Exercise can't be empty, repetitions and weight must be valid
                  numbers
                </strong>
              </Alert>
            ) : null}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddSetModal;
