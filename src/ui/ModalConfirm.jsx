import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useStatus } from "../hooks/useStatus";
import ModalCloseButton from "../ui/ModalCloseButton";
import { clearSessionStorageItem } from "../utils/sessionStorage";
import { capitalizeFirstChar } from "../utils/text";

export default function ModalConfirm({ modal, fileType, setFile, text }) {
  const status = useStatus();

  const handleDelete = async () => {
    status.setLoading();

    clearSessionStorageItem(fileType);
    setFile(null);

    status.setSuccess();
    modal.close();
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
        {text || "Do you really want to delete the file?"}
      </DialogContent>

      <DialogActions>
        <Button onClick={modal.close}>Cancel</Button>
        <LoadingButton
          onClick={handleDelete}
          variant="contained"
          color="primary"
          loading={status.isLoading}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
