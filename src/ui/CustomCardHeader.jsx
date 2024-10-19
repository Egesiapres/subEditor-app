import UploadIcon from "@mui/icons-material/Upload";
import { Button, CardHeader } from "@mui/material";

export default function CustomCardHeader({
  modal,
  fileType,
  subheader,
  avatar,
  isUpload = true,
}) {
  return (
    <CardHeader
      subheader={subheader}
      action={
        isUpload && (
          <Button
            startIcon={<UploadIcon />}
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
