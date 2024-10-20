import AttachFileIcon from "@mui/icons-material/AttachFile";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import { Button, Chip, Grid2, Input, Typography } from "@mui/material";
import { capitalizeFirstChar } from "../utils/text";

export default function FileUpload({
  selectedFile,
  setSelectedFile,
  fileType,
}) {
  // Gestisci la selezione del file
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDelete = () => setSelectedFile(null);

  const isSubtitle = fileType === "subtitle";

  return (
    <>
      <Typography
        variant="body1"
        gutterBottom
      >
        Select a {capitalizeFirstChar(fileType)} file to upload:
      </Typography>

      <Input
        type="file"
        onChange={handleFileChange}
        fullWidth
        accept={isSubtitle ? ".srt,.vtt" : "video/*"}
        sx={{ display: "none" }}
        id={`upload-${fileType}`}
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
              isSubtitle ? <UploadFileRoundedIcon /> : <VideoFileIcon />
            }
          >
            Select {isSubtitle ? ".srt" : ".mp4"} file
          </Button>
        </label>
      </Grid2>

      {selectedFile && (
        <Grid2
          container
          spacing={1}
          flexDirection="column"
        >
          <Grid2
            
            xs={12}
          >
            <Typography
              variant="body2"
              sx={{ mt: 2 }}
            >
              Selected file:
            </Typography>
          </Grid2>

          <Grid2
            
            xs={12}
          >
            <Chip
              icon={<AttachFileIcon fontSize="small" />}
              label={selectedFile.name}
              color="secondary"
              onDelete={handleDelete}
            />
          </Grid2>
        </Grid2>
      )}
    </>
  );
}
