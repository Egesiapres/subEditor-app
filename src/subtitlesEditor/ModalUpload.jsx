import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useContext, useState } from "react";
import { parseSync, stringifySync } from "subtitle";
import { fakeRequest } from "../api/api";
import { SubtitleEditorContext } from "../context/SubtitleEditorContext";
import ModalCloseButton from "../ui/ModalCloseButton";
import Upload from "../ui/Upload";
import {
  getSessionStorageItem,
  setSessionStorageItem,
} from "../utils/sessionStorage";
import { capitalizeFirstChar } from "../utils/text";

export default function ModalUpload({ modal, fileType, status }) {
  const { setSubtitles, setVideo } = useContext(SubtitleEditorContext);

  const [selectedFile, setSelectedFile] = useState(null);

  const isSubtitles = fileType === "subtitles";

  const handleSubtitleUpload = () => {
    status.setLoading();

    try {
      // Read file content as text
      const reader = new FileReader();

      reader.onload = async () => {
        // Obtain file content
        let _selectedFileContent = reader.result;

        // Parse from into JSON format
        _selectedFileContent = parseSync(_selectedFileContent);

        // Get Vtt object using crateUrlObject (as for the video file)
        const vttContent = stringifySync(_selectedFileContent, {
          format: "WebVTT",
        });
        const vttBlob = new Blob([vttContent]);
        const vttUrl = URL.createObjectURL(vttBlob);

        _selectedFileContent = _selectedFileContent
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

        const _subtitlesData = {
          vttUrl,
          fileName: selectedFile.name,
          fileContent: _selectedFileContent,
        };

        await fakeRequest();
        
        setSessionStorageItem("subtitles", _subtitlesData);
        setSubtitles(_subtitlesData.fileContent);

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

  const handleVideoUpload = async () => {
    status.setLoading();

    try {
      // Create a temporary URL for the video
      const url = URL.createObjectURL(selectedFile);

      const _videoData = {
        fileName: selectedFile.name,
        fileUrl: url,
      };

      await fakeRequest(2000);
      setSessionStorageItem("video", _videoData);

      const videoData = getSessionStorageItem("video");
      setVideo(videoData.fileUrl);

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
          onClick={isSubtitles ? handleSubtitleUpload : handleVideoUpload}
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
