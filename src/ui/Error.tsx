import { Alert, AlertProps } from "@mui/material";

interface ErrorProps extends AlertProps {
  error: { message: string };
}

const Error = ({ error: { message } }: ErrorProps) => (
  <Alert severity="error">{message}</Alert>
);

export default Error;
