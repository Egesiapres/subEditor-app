import Typography, { TypographyProps } from "@mui/material/Typography";

const CustomTypography: React.FC<TypographyProps> = ({
  children,
  variant = "h6",
  align = "center",
  ...props
}) => (
  <Typography
    variant={variant}
    color="secondary"
    align={align}
    m={0}
    {...props}
  >
    {children}
  </Typography>
);

export default CustomTypography;
