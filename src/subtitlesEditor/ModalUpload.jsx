import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { parseSync } from "subtitle";
import ModalCloseButton from "../ui/ModalCloseButton";
import Upload from "../ui/Upload";
import {
  getSessionStorageItem,
  setSessionStorageItem,
} from "../utils/sessionStorage";
import { capitalizeFirstChar } from "../utils/text";
import { fakeRequest } from "../api/api";

export default function ModalUpload({ modal, setFile, fileType, status }) {
  
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = () => {
    try {
      status.setLoading();

      // Read file content as text
      const reader = new FileReader();

      reader.onload = async () => {
        let _selectedFile = reader.result; // Obtain file content

        _selectedFile = parseSync(_selectedFile); // Parse from into JSON format

        _selectedFile = _selectedFile
          .map(({ data }) => data)
          .map(({ start, end, text }, index) => {
            const id = index + 1;
            const duration = end - start;

            return {
              id,
              start,
              end,
              duration,
              text,
            };
          });

        await fakeRequest();
        setSessionStorageItem("subtitles", _selectedFile);

        const subtitles = getSessionStorageItem("subtitles");
        setFile(subtitles);

        status.setSuccess();
        modal.close();
      };

      reader.onerror = () => {
        status.setError("Error reading file");
      };

      // Read the file as text
      reader.readAsText(selectedFile);
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
        Upload {capitalizeFirstChar(fileType)}
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
          loading={status.isLoading}
          disabled={!selectedFile}
        >
          Upload
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
