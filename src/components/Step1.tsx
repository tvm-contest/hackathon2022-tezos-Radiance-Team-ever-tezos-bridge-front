import {Button, Grid, Paper, Stack, Typography} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import {selectCurrentStep} from "../store/reducers/currentStep";
import AddressInput from "./AddressInput";
import BlockchainSelect from "./BlockchainSelect";

export default function Step1() {
  const currentStep = useAppSelector(selectCurrentStep);

  if (currentStep !== 1) return null;

  return (
    <Stack spacing={2}>
      <Paper sx={{p: 4}}>
        <Grid container>
          <Grid item xs={3}>
            <Typography>From</Typography>
          </Grid>
          <Grid item xs={9}>
            <Stack spacing={4}>
              <BlockchainSelect />
              <AddressInput label="Sender address" />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{p: 4}}>
        <Grid container>
          <Grid item xs={3}>
            <Typography>To</Typography>
          </Grid>
          <Grid item xs={9}>
            <Stack spacing={4}>
              <BlockchainSelect />
              <AddressInput label="Receiver address" />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Button>Next</Button>
    </Stack>
  );
}
