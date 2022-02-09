import {Button, Grid, Paper, Stack, Typography} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import {selectCurrentStep} from "../store/reducers/currentStep";
import {TokenInput} from "../stories/TokenInput.stories";

export default function Step2() {
  const currentStep = useAppSelector(selectCurrentStep);

  if (currentStep !== 2) return null;

  return (
    <Stack spacing={2}>
      <Paper sx={{p: 4}}>
        <Grid container>
          <Grid item xs={3}>
            <Typography>Asset</Typography>
          </Grid>
          <Grid item xs={9}>
            <TokenInput label="Token" />
          </Grid>
        </Grid>
      </Paper>
      <Stack direction="row">
        <Button>Back</Button>
        <Button>Next</Button>
      </Stack>
    </Stack>
  );
}
