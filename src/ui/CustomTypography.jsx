import Typography from "@mui/material/Typography";

export default function CustomTypography({
  children,
  variant = "h6",
  align = "center",
  ...props
}) {
  return (
    <Typography
      variant={variant}
      color="primary"
      align={align}
      m={0}
      {...props}
    >
      {children}
    </Typography>
  );
}
