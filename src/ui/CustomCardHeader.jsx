import DeleteIcon from "@mui/icons-material/Delete";
import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import UploadIcon from "@mui/icons-material/Upload";
import { Button, CardHeader, Chip, Grid2 } from "@mui/material";
import videojs from "video.js";

export default function CustomCardHeader({
  modal,
  subheader,
  fileData,
  avatar,
  action = true,
  isUpload = true,
  isDisabled = false,
  secondButton,
}) {
  const player = videojs.players?.video_js;

  const onClick = () => {
    player && player.pause();
    modal.open();
  };

  return (
    <CardHeader
      subheader={
        <Grid2
          container
          spacing={1}
          alignItems="center"
        >
          <Grid2>
            {subheader} {fileData && "- File:"}
          </Grid2>

          {fileData && (
            <Chip
              sx={{ pl: 0.5 }}
              icon={<FilePresentRoundedIcon fontSize="small" />}
              label={fileData?.name}
              variant="outlined"
              // size="small"
              color="primary"
            />
          )}
        </Grid2>
      }
      action={
        action && (
          <Grid2
            container
            spacing={1}
          >
            {secondButton}

            <Button
              disabled={isUpload && isDisabled}
              startIcon={isUpload ? <UploadIcon /> : <DeleteIcon />}
              onClick={onClick}
            >
              {isUpload ? "Upload" : "Delete"}
            </Button>
          </Grid2>
        )
      }
      avatar={avatar}
    />
  );
}
