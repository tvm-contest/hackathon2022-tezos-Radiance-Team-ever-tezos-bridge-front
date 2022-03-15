import ReceiptIcon from "@mui/icons-material/Receipt";
import {IconButton, IconButtonProps, Tooltip} from "@mui/material";

export default function TransactionsButton(props: IconButtonProps) {
  return (
    <Tooltip title="Show recent transactions">
      <IconButton size="large" sx={{borderRadius: "18px"}} {...props}>
        <ReceiptIcon />
      </IconButton>
    </Tooltip>
  );
}
