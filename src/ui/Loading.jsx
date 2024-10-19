import { CircularProgress, Grid2 } from "@mui/material";

export default function Loading() {
  return (
    <Grid2
      container
      justifyContent="center"
    >
      <Grid2 item>
        <CircularProgress />
      </Grid2>
    </Grid2>
  );
}
