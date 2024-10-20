import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import srtParser2 from "srt-parser-2";
import ModalCloseButton from "../ui/ModalCloseButton";
import Upload from "../ui/Upload";
import {
  getSessionStorageItem,
  setSessionStorageItem,
} from "../utils/sessionStorage";
import { capitalizeFirstChar } from "../utils/text";

export default function ModalUpload({ modal, fileType, setFile, status }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async () => {
    if (selectedFile) {
      status.setLoading();

      // Read file content as text
      const reader = new FileReader();

      reader.onload = () => {
        const parser = new srtParser2();

        let _selectedFile = reader.result; // Obtain file content

        _selectedFile = parser.fromSrt(_selectedFile); // Parse from into JSON format

        _selectedFile = _selectedFile.map(
          ({ startSeconds, endSeconds, id, startTime, endTime, text }) => {
            // const duration = endTime - startTime;
            const duration = endSeconds - startSeconds;

            return {
              id,
              startTime,
              endTime,
              duration,
              text,
            };
          }
        );

        setSessionStorageItem("subtitle", _selectedFile);

        const subtitle = getSessionStorageItem("subtitle");
        setFile(subtitle);

        status.setSuccess();
        modal.close();
      };

      reader.onerror = () => {
        status.setError("Error reading file");
      };

      // Read the file as text
      reader.readAsText(selectedFile);
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
