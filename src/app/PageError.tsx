import { Button, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { formatFromPath } from "../utils/text";

export default function PageError({ targetPage = "" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${targetPage}`);
  };

  return (
    <Grid2
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
      textAlign="center"
    >
      <Grid2 size={12}>
        <Typography
          variant="h1"
          color="black"
        >
          Oops! 😿
        </Typography>
      </Grid2>

      <Grid2 size={12}>
        <Typography
          variant="h3"
          color="black"
        >
          404
        </Typography>
      </Grid2>

      <Grid2 size={12}>
        <Typography
          variant="h5"
          color="black"
        >
          Page not found
        </Typography>
      </Grid2>

      <Grid2
        size={12}
        mt={2}
      >
        <Button
          variant="contained"
          onClick={handleClick}
        >
          Return to {formatFromPath(targetPage)}
        </Button>
      </Grid2>
    </Grid2>
  );
}
