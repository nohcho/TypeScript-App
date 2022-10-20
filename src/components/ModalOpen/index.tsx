import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogProps as MuiDialogProps,
  DialogTitle,
  Typography,
} from "@mui/material";
import { UsersInfo } from "../../models/index";

type CloseReason = "backdropClick" | "escapeKeyDown" | "closeButtonClick";

interface DialogProps extends MuiDialogProps {
  users: UsersInfo;
  onClose: (reason: CloseReason) => void;
}

const DialogModal = ({
  title,
  open,
  onClose,
  users,
  ...props
}: DialogProps) => {
  return (
    <MuiDialog
      onClose={(_, reason) => onClose(reason)}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogContent sx={{ padding: "10px" }} dividers>
        <DialogTitle fontSize={20} fontWeight={800}>
          {title}
        </DialogTitle>
        <Typography
          gutterBottom
          fontSize={20}
        >{`Address: ${users.address.city}, ${users.address.suite}, ${users.address.street}`}</Typography>
        <Typography
          gutterBottom
          fontSize={20}
        >{`Zip code: ${users.address.zipcode}`}</Typography>
        <Typography
          gutterBottom
          fontSize={20}
        >{`Phone number: ${users.phone}`}</Typography>
        <Typography
          gutterBottom
          fontSize={20}
        >{`Website: ${users.website}`}</Typography>
        <Typography
          gutterBottom
          fontSize={20}
        >{`Company: ${users.company.name}`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose("closeButtonClick")}> Close </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default DialogModal;
