import {TextField} from "@mui/material";

import {AddressInputProps} from "../types";

export default function AddressInput({label}: AddressInputProps) {
  return <TextField id="outlined-basic" label={label} variant="outlined" />;
}
