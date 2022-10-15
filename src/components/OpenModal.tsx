import { DialogProps } from "@mui/material";
import {
  Box,
  Button,
  Dialog as MuiDialog,
  Typography,
  DialogActions,
} from "@mui/material";
type CloseReason = "backdropClick" | "escapeKeyDown" | "closeButtonClick";

interface DialogProp extends DialogProps {
  onClose: (reason: CloseReason) => void;
}

const Dialog = ({ open, onClose, children }: DialogProp) => {
  return (
    <MuiDialog
      onClose={(_, reason) => onClose(reason)}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {children}
        </Typography>
        <DialogActions>
          <Button onClick={() => onClose("escapeKeyDown")}>Close</Button>
        </DialogActions>
      </Box>
    </MuiDialog>
  );
};

export default Dialog;
