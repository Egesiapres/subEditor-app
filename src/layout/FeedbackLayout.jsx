import { Paper } from "@mui/material";

export default function FeedbackLayout({ children }) {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2 }}
    >
      {children}
    </Paper>
  );
}
