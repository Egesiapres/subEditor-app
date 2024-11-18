import { CircularProgress, Grid2 } from "@mui/material";

export default function Loading({ sx = { my: 2 }, size = 40 }) {
  return (
    <Grid2
      container
      justifyContent="center"
    >
      <CircularProgress
        sx={sx}
        size={size}
      />
    </Grid2>
  );
}
