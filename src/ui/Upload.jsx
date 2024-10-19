import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button, Grid2, Input, Typography } from "@mui/material";

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

  const isSubtitle = fileType === "Subtitle";

  return (
    <>
      <Typography
        variant="body1"
        gutterBottom
      >
        Select a {fileType} file to upload:
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
            startIcon={<AttachFileIcon />}
          >
            Select {isSubtitle ? ".srt" : ".mp4"} file
          </Button>
        </label>
      </Grid2>

      {selectedFile && (
        <Typography
          variant="body2"
          sx={{ mt: 2 }}
        >
          Selected file: {selectedFile.name}
        </Typography>
      )}
    </>
  );
}
