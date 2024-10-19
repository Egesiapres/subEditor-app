import { Alert } from "@mui/material";

export default function Error({ error }) {
  return <Alert severity="error">{error.message}</Alert>;
}
