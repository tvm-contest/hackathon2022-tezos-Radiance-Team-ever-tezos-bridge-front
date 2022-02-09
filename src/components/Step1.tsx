import {Button, Grid, Paper, Stack, Typography} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import {selectCurrentStep} from "../store/reducers/currentStep";
import AddressInput from "./AddressInput";
import BlockchainSelect from "./BlockchainSelect";

export default function Step1() {
  const currentStep = useAppSelector(selectCurrentStep);

  if (currentStep !== 1) return null;

  return (
    <Stack>
      <Paper>
        <Grid container>
          <Grid item>
            <Typography>From</Typography>
          </Grid>
          <Grid item>
            <BlockchainSelect />
            <AddressInput label="Sender address" />
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        <Grid container>
          <Grid item>
            <Typography>To</Typography>
          </Grid>
          <Grid item>
            <BlockchainSelect />
            <AddressInput label="Receiver address" />
          </Grid>
        </Grid>
      </Paper>
      <Button variant="contained">Next</Button>
    </Stack>
  );
}
