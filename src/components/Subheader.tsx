import {Typography, TypographyProps} from "@mui/material";

export default function Subheader(props: TypographyProps) {
  return (
    <Typography color="textSecondary" variant="h1" {...props}>
      Cross-chain transfer
    </Typography>
  );
}
