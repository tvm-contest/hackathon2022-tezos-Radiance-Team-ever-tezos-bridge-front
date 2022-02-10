import {IconButton, IconButtonProps} from "@mui/material";

import SwapIcon from "./SwapIcon";

export default function SwapButton(props: IconButtonProps) {
  return (
    <IconButton size="large" {...props}>
      <SwapIcon />
    </IconButton>
  );
}
