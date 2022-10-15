import { DialogProps } from "@mui/material";
import {
  Box,
  Button,
  Dialog,
  Typography,
  DialogActions,
  PaperProps,
} from "@mui/material";
type CloseReason = "backdropClick" | "escapeKeyDown" | "closeButtonClick";

interface DialogProp extends DialogProps {
  onClose: (reason: CloseReason) => void;
}

const Modal = ({ open, onClose, children }: DialogProp) => {
  return (
    <Dialog onClose={(_, reason) => onClose(reason)} open={open}>
      <Box>
        <Typography>{children}</Typography>
        <DialogActions>
          <Button onClick={() => onClose("escapeKeyDown")}>Close</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Modal;
