import { Box, Link, Typography } from "@mui/material";

export default function Copyright(props) {
  return (
    <Box {...props}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        Made with ❤️ in Italy.
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        Copyright ©{" "}
        <Link
          color="inherit"
          href="https://github.com/Egesiapres"
          target="_blank"
        >
          Egesiapres
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
