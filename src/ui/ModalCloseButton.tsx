import CloseIcon from "@mui/icons-material/Close";
import { IconButton, IconButtonProps } from "@mui/material";
import { ModalType } from "../hooks/useModal";

interface ModalCloseButton extends IconButtonProps {
  modal: ModalType;
  onClose?: () => void;
}

const ModalCloseButton = ({
  modal,
  onClose = () => {
    modal.close();
  },
}: ModalCloseButton) => (
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

export default ModalCloseButton;
