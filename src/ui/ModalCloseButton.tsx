import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function ModalCloseButton({
  modal,
  onClose = () => {
    modal.close();
  },
}) {
  return (
    <IconButton
      onClick={onClose}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: theme => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
  );
}
