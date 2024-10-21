import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { Button, CardHeader, Grid2 } from "@mui/material";

export default function CustomCardHeader({
  modal,
  subheader,
  avatar,
  action = true,
  isUpload = true,
  secondButton,
}) {
  return (
    <CardHeader
      subheader={subheader}
      action={
        action && (
          <Grid2
            container
            spacing={1}
          >
            {secondButton}

            <Button
              startIcon={isUpload ? <UploadIcon /> : <DeleteIcon />}
              onClick={modal.open}
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
