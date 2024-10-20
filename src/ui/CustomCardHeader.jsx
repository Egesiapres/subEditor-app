import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { Button, CardHeader } from "@mui/material";

export default function CustomCardHeader({
  modal,
  fileType,
  subheader,
  avatar,
  action = true,
  isUpload = true,
}) {
  return (
    <CardHeader
      subheader={subheader}
      action={
        action && (
          <Button
            startIcon={isUpload ? <UploadIcon /> : <DeleteIcon />}
            onClick={modal.open}
          >
            {fileType}
          </Button>
        )
      }
      avatar={avatar}
    />
  );
}
