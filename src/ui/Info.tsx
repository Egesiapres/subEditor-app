import { Alert, AlertProps } from "@mui/material";

interface InfoProps extends AlertProps {
  text: string;
}

const Info = ({ text, sx = { borderRadius: 0 } }: InfoProps) => (
  <Alert
    severity="info"
    sx={sx}
  >
    {text}
  </Alert>
);

export default Info;
