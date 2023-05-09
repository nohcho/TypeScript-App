import { Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogProps as MuiDialogProps,
  DialogTitle,
  Typography } from "@mui/material";
import { Box } from "@mui/system";
import { UsersInfo } from "models/index";
import { memo } from "react";

interface DialogProps extends MuiDialogProps {
  users: UsersInfo;
  onClose: () => void;
}

export const ModalOpen = memo(({ title, open, onClose, users }: DialogProps) => {
  return (
    <MuiDialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogContent sx={{
        padding: "10px"
      }} dividers>
        <DialogTitle fontSize={24} fontWeight={800}>
          {title}
        </DialogTitle>
        <Typography gutterBottom fontSize={20}>
            {" "}
            Address:{" "}
          {` ${users.address.city}, ${users.address.suite}, ${users.address.street}`}
        </Typography>
        <Typography gutterBottom fontSize={20}>
            {" "}
            Zip code:{" "}
          {`${users.address.zipcode}`}
        </Typography>
        <Typography gutterBottom fontSize={20}>
          {" "}
            Phone number:{" "}
          {`${users.phone}`}
        </Typography>
        <Typography gutterBottom fontSize={20}>
          {" "}
            Website:{" "}
          {` ${users.website}`}
        </Typography>
        <Typography gutterBottom fontSize={20}>
          {" "}
            Company:{" "}
          {` ${users.company.name}`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}> Close </Button>
      </DialogActions>
    </MuiDialog>
  );
});
