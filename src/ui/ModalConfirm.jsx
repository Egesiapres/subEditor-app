import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { fakeRequest } from "../api/api";
import ModalCloseButton from "../ui/ModalCloseButton";
import { capitalizeFirstChar } from "../utils/text";

export default function ModalConfirm({
  modal,  
  handleConfirm,
  text,
  fileType,
  status,
}) {
  const handleClick = async () => {
    try {
      status.setLoading();

      handleConfirm();
      await fakeRequest();

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
        Delete {capitalizeFirstChar(fileType)}
        <ModalCloseButton modal={modal} />
      </DialogTitle>

      <DialogContent>
        {text || "Do really want to proceed?"}
      </DialogContent>

      <DialogActions>
        <Button onClick={modal.close}>Cancel</Button>
        <LoadingButton
          onClick={handleClick}
          variant="contained"
          color="primary"
          loading={status.isLoading}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
