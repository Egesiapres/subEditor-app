import DeleteIcon from "@mui/icons-material/Delete";
import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import UploadIcon from "@mui/icons-material/Upload";
import {
  Button,
  CardHeader,
  CardHeaderProps,
  Chip,
  Grid2,
} from "@mui/material";
import videojs from "video.js";
import { ModalType } from "../hooks/useModal";

interface CustomCardHeaderProps extends CardHeaderProps {
  modal: ModalType;
  fileData: any;
  isUpload: boolean;
  isDisabled: boolean;
  secondButton: React.ReactNode;
}

const CustomCardHeader = ({
  modal,
  subheader,
  fileData,
  avatar,
  action = true,
  isUpload = true,
  isDisabled = false,
  secondButton,
}: CustomCardHeaderProps) => {
  const player = videojs.players?.video_js;

  const handleClick = () => {
    player?.pause();
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
              onClick={handleClick}
            >
              {isUpload ? "Upload" : "Delete"}
            </Button>
          </Grid2>
        )
      }
      avatar={avatar}
    />
  );
};

export default CustomCardHeader;
