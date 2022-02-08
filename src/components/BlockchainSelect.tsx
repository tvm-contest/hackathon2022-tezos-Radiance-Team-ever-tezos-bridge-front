import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {useCallback, useState} from "react";

export default function BlockchainSelect() {
  const [blockchain, setBlockchain] = useState("");

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setBlockchain(event.target.value as string);
    },
    [setBlockchain],
  );

  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Blockchain</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={blockchain}
          label="Blockchain"
          onChange={handleChange}
        >
          <MenuItem>Everscale</MenuItem>
          <MenuItem>Tezos</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
