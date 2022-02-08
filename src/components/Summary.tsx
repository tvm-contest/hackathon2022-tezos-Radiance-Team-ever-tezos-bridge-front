import { Box, Typography, Divider } from "@mui/material";
import { SummaryProps } from "../types";

export default function Summary({
  fromAddress = "-",
  toAddress = "-",
  amount = "-",
}: SummaryProps) {
  return (
    <Box>
      <Typography variant="h2">Summary</Typography>
      <Typography variant="h3">Addresses</Typography>
      <dl>
        <dt>From address</dt>
        <dd>{fromAddress}</dd>
        <dt>To address</dt>
        <dd>{toAddress}</dd>
      </dl>
      <Divider />
      <Typography variant="h3">Amount</Typography>
      <span>{amount}</span>
    </Box>
  );
}
