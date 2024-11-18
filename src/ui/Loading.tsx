import { CircularProgress, CircularProgressProps, Grid2 } from "@mui/material";

const Loading = ({ size = 40, sx = { my: 2 } }: CircularProgressProps) => {
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
};

export default Loading;
