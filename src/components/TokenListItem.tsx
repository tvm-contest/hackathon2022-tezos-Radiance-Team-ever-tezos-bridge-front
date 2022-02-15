import {Stack, Typography} from "@mui/material";

import {TokenListItemProps} from "../types";

export default function TokenListItem({token, ...rest}: TokenListItemProps) {
  return (
    <Stack direction="row" justifyContent="center">
      <Typography>{token.name}</Typography>
    </Stack>
  );
}
