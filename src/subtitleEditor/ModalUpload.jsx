import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import ModalCloseButton from "../ui/ModalCloseButton";
import Upload from "../ui/Upload";

export default function ModalUpload({ modal, fileType }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Simula l'upload del file
  const handleUpload = () => {
    if (selectedFile) {
      console.log("File caricato:", selectedFile);
      // Puoi gestire l'upload del file qui
    }
    modal.close();
  };

  return (
    <Dialog
      open={modal.isOpen}
      onClose={modal.close}
    >
      <DialogTitle>
        Upload {fileType}
        <ModalCloseButton modal={modal} />
      </DialogTitle>

      <DialogContent>
        <Upload
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          fileType={fileType}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={modal.close}>Cancel</Button>
        <LoadingButton
          onClick={handleUpload}
          variant="contained"
          color="primary"
          disabled={!selectedFile}
        >
          Upload
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
