import { Alert } from "@mui/material";

export default function Info({ text, sx = { borderRadius: 0 } }) {
  return (
    <Alert
      severity="info"
      sx={sx}
    >
      {text}
    </Alert>
  );
}
