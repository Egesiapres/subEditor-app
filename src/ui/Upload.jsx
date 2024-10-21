import AttachFileIcon from "@mui/icons-material/AttachFile";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import { Button, Chip, Grid2, Typography } from "@mui/material";
import { capitalizeFirstChar } from "../utils/text";
import { useRef } from "react";

export default function FileUpload({
  selectedFile,
  setSelectedFile,
  fileType,
}) {
  const inputRef = useRef(null);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);

    // input value reset
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const isSubtitles = fileType === "subtitles";

  return (
    <>
      <Typography
        variant="body1"
        gutterBottom
      >
        Select a {capitalizeFirstChar(fileType)} file to upload:
      </Typography>
      
      <input
        type="file"
        onChange={handleFileChange}
        accept={isSubtitles ? ".srt" : ".mp4"}
        id={`upload-${fileType}`}
        ref={inputRef}
        style={{ display: "none" }}
      />

      <Grid2
        container
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        <label htmlFor={`upload-${fileType}`}>
          <Button
            variant="outlined"
            size="large"
            component="span"
            startIcon={
              isSubtitles ? <UploadFileRoundedIcon /> : <VideoFileIcon />
            }
          >
            Select {isSubtitles ? ".srt" : ".mp4"} file
          </Button>
        </label>
      </Grid2>

      {selectedFile && (
        <Grid2
          container
          spacing={1}
          flexDirection="column"
        >
          <Grid2 size={12}>
            <Typography
              variant="body2"
              sx={{ mt: 2 }}
            >
              Selected file:
            </Typography>
          </Grid2>

          <Grid2 size={12}>
            <Chip
              icon={<AttachFileIcon fontSize="small" />}
              label={selectedFile.name}
              color="secondary"
              onDelete={handleRemove}
            />
          </Grid2>
        </Grid2>
      )}
    </>
  );
}
