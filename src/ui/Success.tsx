import { Alert, AlertProps } from "@mui/material";

interface SuccessProps extends AlertProps {
  success: { message: string };
}

const Success = ({ success: { message } }: SuccessProps) => (
  <Alert severity="success">{message}</Alert>
);

export default Success;
