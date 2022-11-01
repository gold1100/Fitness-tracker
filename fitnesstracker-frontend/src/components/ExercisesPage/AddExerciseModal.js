import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";

const AddExerciseModal = (props) => {
  const { open, onClose, onSubmit } = props;
  const [exercise, setExercise] = useState({
    name: "",
  });

  const handleTextChange = (event) => {
    const newExercise = event.target.value;
    setExercise({ ...exercise, name: newExercise });
  };

  const handleSubmit = (exercise) => {
    setExercise("");
    onSubmit(exercise);
  };

  const handleClose = () => {
    setExercise("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add exercise</DialogTitle>
      <DialogContent>
        <Typography>Name</Typography>
        <TextField
          autoFocus
          value={exercise.name}
          onChange={(event) => handleTextChange(event)}
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleSubmit(exercise)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExerciseModal;
