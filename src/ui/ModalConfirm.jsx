import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import videojs from "video.js";
import { fakeRequest } from "../api/api";
import ModalCloseButton from "../ui/ModalCloseButton";

export default function ModalConfirm({
  modal,
  title = "Confirm",
  text = "Do you really want to proceed?",
  handleConfirm,
  status,
}) {
  const player = videojs.players?.video_js;
  
  const handleClick = async () => {
    status.setLoading();

    try {
      handleConfirm();
      
      await fakeRequest();

      player.currentTime(0);

      status.setSuccess();
      modal.close();
    } catch (err) {
      status.setError(err);
    }
  };

  return (
    <Dialog
      open={modal.isOpen}
      onClose={modal.close}
    >
      <DialogTitle>
        {title}
        <ModalCloseButton modal={modal} />
      </DialogTitle>

      <DialogContent>{text}</DialogContent>

      <DialogActions>
        <Button onClick={modal.close}>Cancel</Button>
        <LoadingButton
          onClick={handleClick}
          variant="contained"
          color="primary"
          loading={status?.isLoading}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
