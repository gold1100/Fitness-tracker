import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteDialog = (props) => {
  const { open, onClose, onDelete, text } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{text}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
