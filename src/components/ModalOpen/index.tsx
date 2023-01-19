import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogProps as MuiDialogProps,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { UsersInfo } from "models/index";

type CloseReason = "backdropClick" | "escapeKeyDown" | "closeButtonClick";

interface DialogProps extends MuiDialogProps {
  users: UsersInfo;
  onClose: (reason: CloseReason) => void;
}

export const ModalOpen = ({ title, open, onClose, users }: DialogProps) => {
  return (
    <MuiDialog
      onClose={(_, reason) => onClose(reason)}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogContent sx={{ padding: "10px" }} dividers>
        <DialogTitle fontSize={24} fontWeight={800}>
          {title}
        </DialogTitle>
        <Typography gutterBottom fontSize={20}>
          <Box component="h4" display="inline">
            {" "}
            Address:{" "}
          </Box>
          {` ${users.address.city}, ${users.address.suite}, ${users.address.street}`}
        </Typography>
        <Typography gutterBottom fontSize={20}>
          <Box component="h4" display="inline">
            {" "}
            Zip code:{" "}
          </Box>
          {`${users.address.zipcode}`}
        </Typography>
        <Typography gutterBottom fontSize={20}>
          {" "}
          <Box component="h4" display="inline">
            Phone number:{" "}
          </Box>
          {`${users.phone}`}
        </Typography>
        <Typography gutterBottom fontSize={20}>
          {" "}
          <Box component="h4" display="inline">
            Website:{" "}
          </Box>
          {` ${users.website}`}
        </Typography>
        <Typography gutterBottom fontSize={20}>
          {" "}
          <Box component="h4" display="inline">
            Company:{" "}
          </Box>
          {` ${users.company.name}`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose("closeButtonClick")}> Close </Button>
      </DialogActions>
    </MuiDialog>
  );
};
