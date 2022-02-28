import {IconButton, IconButtonProps, Tooltip} from "@mui/material";

import SwapIcon from "./SwapIcon";

export default function SwapButton(props: IconButtonProps) {
  return (
    <Tooltip title="Change bridge direction">
      <IconButton size="large" sx={{borderRadius: "18px"}} {...props}>
        <SwapIcon />
      </IconButton>
    </Tooltip>
  );
}
