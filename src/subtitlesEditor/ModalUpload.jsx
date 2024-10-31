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
import videojs from "video.js";
import { fakeRequest } from "../api/api";
import { SubtitleEditorContext } from "../context/SubtitleEditorContext";
import useFFmpeg from "../hooks/useFFmpeg";
import ModalCloseButton from "../ui/ModalCloseButton";
import Upload from "../ui/Upload";
import { setSessionStorageItem } from "../utils/sessionStorage";
import { capitalizeFirstChar } from "../utils/text";

// TODO: improve status management & error handling
export default function ModalUpload({ modal, fileType, status }) {
  const { setSubtitlesData, setVideoData, setAudioData } = useContext(
    SubtitleEditorContext
  );

  const player = videojs.players?.video_js;

  const [selectedFile, setSelectedFile] = useState(null);

  const { ffmpegLoad, ffmpegTranscode } = useFFmpeg();

  const isSubtitles = fileType === "subtitles";

  const handleSubtitleUpload = () => {
    status.setLoading();

    try {
      // Read file content as text
      const reader = new FileReader();

      reader.onload = async () => {
        // Obtain file content
        let _selectedFileContent = reader.result;

        // Parse into JSON format
        _selectedFileContent = parseSync(_selectedFileContent);

        // Get Vtt object using crateUrlObject (as for the video file)
        const vttContent = stringifySync(_selectedFileContent, {
          format: "WebVTT",
        });

        const vttBlob = new Blob([vttContent]);

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
          name: selectedFile.name,
          url: URL.createObjectURL(vttBlob),
          subtitles: _selectedFileContent,
        };

        await fakeRequest();

        setSessionStorageItem(fileType, _subtitlesData);
        setSubtitlesData(_subtitlesData);

        player.currentTime(0);

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
      const _videoData = {
        name: selectedFile.name,
        url: URL.createObjectURL(selectedFile),
      };

      await fakeRequest(1000);

      // Upload the Video
      setSessionStorageItem(fileType, _videoData);
      setVideoData(_videoData);

      // ! Transform the .mp4 file & Upload Audio
      await ffmpegLoad();

      const audioContent = await ffmpegTranscode(_videoData.url);

      const audioBlob = new Blob([audioContent.buffer], { type: "audio/mp3" });

      const _audioData = {
        name: "extracted_audio.mp3",
        url: URL.createObjectURL(audioBlob),
      };

      setSessionStorageItem("audio", _audioData);
      setAudioData(_audioData);

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
