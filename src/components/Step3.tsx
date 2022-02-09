import {Button, Grid, Paper, Stack, Typography} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import {selectCurrentStep} from "../store/reducers/currentStep";

export default function Step3() {
  const currentStep = useAppSelector(selectCurrentStep);

  if (currentStep !== 3) return null;

  return (
    <Paper sx={{p: 4}}>
      <Stack spacing={2}>
        <Grid container>
          <Grid item xs={3}>
            <Typography>Status</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>Prepare transfer</Typography>
            <Button>Prepare</Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography>Status</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>Transfer checked by relayers</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography>Status</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>Release transfer by relayers</Typography>
            <Button>Release</Button>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}
