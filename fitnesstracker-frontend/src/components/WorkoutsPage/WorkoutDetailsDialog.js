import React, { useState } from "react";
import {
  SvgIcon,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  TextField,
  Button,
  Box,
  TableHead,
  Typography,
  Grid,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import AddSetModal from "./AddSetModal";

const WorkoutDetailsDialog = (props) => {
  const { open, onClose, onSubmit, data, title } = props;
  const [nestedDialogOpen, setNestedDialogOpen] = useState(false);
  const [workout, setWorkout] = useState(
    data === undefined
      ? {
          id: "",
          date: dayjs("2022-01-01").format("YYYY-MM-DD"),
          description: "",
          exerciseSets: [],
        }
      : data
  );

  const handleNestedDialogClose = () => {
    setNestedDialogOpen(false);
  };
  const handleNestedDialogOpen = () => {
    setNestedDialogOpen(open);
  };

  const handleDateChange = (newValue) => {
    setWorkout((prevState) => {
      return {
        ...prevState,
        date: dayjs(newValue).format("YYYY-MM-DD"),
      };
    });
    console.log(workout);
  };
  const handleTextChange = (event) => {
    setWorkout((prevState) => {
      return {
        ...prevState,
        description: event.target.value,
      };
    });
  };

  const addSet = (newSet) => {
    handleNestedDialogClose();
    const newExerciseSets = [...workout.exerciseSets, newSet];
    setWorkout((prevState) => {
      return {
        ...prevState,
        exerciseSets: newExerciseSets,
      };
    });
  };

  const deleteSet = (exerciseSet) => {
    setWorkout((prevState) => {
      return {
        ...prevState,
        exerciseSets: prevState.exerciseSets.filter(
          (exSet) => exSet !== exerciseSet
        ),
      };
    });
  };

  return (
    <React.Fragment>
      <AddSetModal
        open={nestedDialogOpen}
        onClose={handleNestedDialogClose}
        onSubmit={addSet}
      />
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <DialogContentText>Date</DialogContentText>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  inputFormat="YYYY-MM-DD"
                  value={workout.date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item lg={12}>
              <DialogContentText>Notes</DialogContentText>
              <TextField
                id="description"
                autoFocus
                value={workout.description}
                onChange={handleTextChange}
                fullWidth
                multiline
                variant="outlined"
                minRows="4"
                maxRows="4"
              />
            </Grid>
            <Grid item lg={6}>
              <Box sx={{ display: "flex", alignItems: "center", margin: 1 }}>
                <Typography sx={{ mr: 2 }}>Sets</Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleNestedDialogOpen}
                >
                  Add
                </Button>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Exercise</TableCell>
                    <TableCell align="center">Rep count</TableCell>
                    <TableCell align="center">Weight</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workout.exerciseSets.map((exerciseSet, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {exerciseSet.exercise.name}
                      </TableCell>
                      <TableCell align="center">
                        {exerciseSet.repetitions}
                      </TableCell>
                      <TableCell align="center">{exerciseSet.weight}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          value={exerciseSet}
                          onClick={() => deleteSet(exerciseSet)}
                        >
                          <SvgIcon name={exerciseSet.id}>
                            <ClearIcon />
                          </SvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(workout)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default WorkoutDetailsDialog;
