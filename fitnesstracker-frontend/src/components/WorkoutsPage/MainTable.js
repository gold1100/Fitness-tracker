import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import WorkoutService from "../../services/WorkoutService";
import { useState, useEffect } from "react";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { SvgIcon } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteConfirmModal from "../DeleteConfirmModal";
import WorkoutDetailsDialog from "./WorkoutDetailsDialog";
import { Button } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}));

const Row = (props) => {
  const { data, handleEditModalOpen, handleDeleteModalOpen } = props;
  const [open, setOpen] = React.useState(false);

  const formatDescription = (description) => {
    if (description.length > 50) {
      return description.slice(0, 50) + "...";
    } else {
      return description;
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ backgroundColor: grey[800] }}>
        <TableCell padding="none" sx={{ width: "10%" }}>
          <IconButton
            aria-label="expand data"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{data.date}</TableCell>
        <TableCell align="justify">
          {formatDescription(data.description)}
        </TableCell>
        <TableCell align="right">
          <IconButton size="small" onClick={() => handleEditModalOpen(data)}>
            <SvgIcon>
              <EditTwoToneIcon />
            </SvgIcon>
          </IconButton>
          <IconButton size="small" onClick={() => handleDeleteModalOpen(data)}>
            <SvgIcon>
              <ClearIcon />
            </SvgIcon>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <TableCell>Exercise</TableCell>
                    <TableCell>Rep count</TableCell>
                    <TableCell>Weight</TableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {data.exerciseSets.map((exerciseSet, index) => (
                    <StyledTableRow key={index}>
                      <TableCell>{exerciseSet.exercise.name}</TableCell>
                      <TableCell>{exerciseSet.repetitions}</TableCell>
                      <TableCell>{exerciseSet.weight}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const MainTable = () => {
  const [workouts, setWorkouts] = useState([]);
  const [rowToUpdate, setRowToUpdate] = useState(null);
  const [modals, setModals] = useState({
    addModalOpen: false,
    editModalOpen: false,
    deleteModalOpen: false,
  });

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await WorkoutService.getAllWorkouts();
        let sortedState = [...response.data].sort((a, b) =>
          a.date < b.date ? 1 : -1
        );
        setWorkouts(sortedState);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchWorkouts();
  }, []);

  const sortState = (state) => {
    const sortedState = [...state].sort((a, b) => (a.date < b.date ? 1 : -1));
    return sortedState;
  };

  const handleAddModalOpen = () => {
    setModals({ ...modals, addModalOpen: true });
  };

  const handleAddModalClose = () => {
    setModals({ ...modals, addModalOpen: false });
  };

  const handleEditModalOpen = (data) => {
    setRowToUpdate(data);
    setModals({ ...modals, editModalOpen: true });
  };

  const handleEditModalClose = () => {
    setModals({ ...modals, editModalOpen: false });
  };

  const handleDeleteModalOpen = (data) => {
    setRowToUpdate(data);
    setModals({ ...modals, deleteModalOpen: true });
  };

  const handleDeleteModalClose = () => {
    setModals({ ...modals, deleteModalOpen: false });
  };

  const handleAddWorkout = async (newWorkout) => {
    handleAddModalClose();
    try {
      await WorkoutService.addWorkout(newWorkout);
      let newState = [...workouts, newWorkout];
      setWorkouts(sortState(newState));
    } catch (error) {
      alert(error);
    }
  };
  const handleUpdateWorkout = async (newWorkout) => {
    handleEditModalClose();
    try {
      await WorkoutService.updateWorkout(rowToUpdate.id, newWorkout);
      let newState = workouts.map((obj) => {
        if (obj.id === rowToUpdate.id) {
          return newWorkout;
        }
        return obj;
      });
      setWorkouts(sortState(newState));
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteItem = async () => {
    handleDeleteModalClose();
    try {
      await WorkoutService.deleteWorkout(rowToUpdate.id);
      setWorkouts((prevState) =>
        prevState.filter((w) => w.id !== rowToUpdate.id)
      );
    } catch (error) {
      alert(error);
    }
  };

  return (
    <React.Fragment>
      {modals.addModalOpen ? (
        <WorkoutDetailsDialog
          open={modals.addModalOpen}
          onClose={handleAddModalClose}
          onSubmit={handleAddWorkout}
          title="Add new workout"
        />
      ) : null}
      {modals.editModalOpen ? (
        <WorkoutDetailsDialog
          open={modals.editModalOpen}
          onClose={handleEditModalClose}
          onSubmit={handleUpdateWorkout}
          data={rowToUpdate}
          title="Edit workout"
        />
      ) : null}
      {modals.deleteModalOpen ? (
        <DeleteConfirmModal
          open={modals.deleteModalOpen}
          onClose={handleDeleteModalClose}
          onDelete={handleDeleteItem}
          data={rowToUpdate}
          text="Are you sure you want to delete this workout?"
        />
      ) : null}
      <Button
        variant="contained"
        size="small"
        sx={{ mb: 2 }}
        onClick={handleAddModalOpen}
      >
        Add workout
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size="medium">
          <TableHead>
            <TableRow sx={{ backgroundColor: grey[800] }}>
              <TableCell padding="none" sx={{ width: "10%" }} />
              <TableCell sortDirection="asc" sx={{ width: "30%" }}>
                Workout Date
              </TableCell>
              <TableCell align="justify">Notes</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts.map((data, index) => (
              <Row
                key={index}
                data={data}
                handleDeleteModalOpen={handleDeleteModalOpen}
                handleEditModalOpen={handleEditModalOpen}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default MainTable;
