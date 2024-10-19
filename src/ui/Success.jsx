import { Alert } from "@mui/material";

export default function Error({ success }) {
  return <Alert severity="success">{success.message}</Alert>;
}
