import { DialogContent, DialogProps } from "@mui/material";
import { Box, Button, Dialog, DialogActions } from "@mui/material";
type CloseReason = "backdropClick" | "escapeKeyDown" | "closeButtonClick";

interface DialogProp extends DialogProps {
  onClose: (reason: CloseReason) => void;
}

const Modal = ({ open, onClose, children }: DialogProp) => {
  return (
    <Dialog onClose={(_, reason) => onClose(reason)} open={open}>
      <Box>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={() => onClose("escapeKeyDown")}>Close</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Modal;
