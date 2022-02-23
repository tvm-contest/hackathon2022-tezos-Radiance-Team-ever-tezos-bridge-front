import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {useDispatch} from "react-redux";

import useAppSelector from "../hooks/useAppSelector";
import {
  prev as prevStep,
  selectCurrentStep,
} from "../store/reducers/currentStep";
import {permitTezosToken} from "../store/reducers/permissions";

export default function Step2() {
  const dispatch = useDispatch();
  const currentStep = useAppSelector(selectCurrentStep);

  function handleBack() {
    dispatch(prevStep());
  }

  function handleApprove() {
    dispatch(permitTezosToken());
  }

  if (currentStep !== 2) return null;

  return (
    <Stack spacing={2}>
      <Paper sx={{borderRadius: "40px", p: 4}}>
        <Stack component="ol" spacing={2} sx={{m: 0, p: 0}}>
          <Stack alignItems="flex-start" component="li" spacing={1}>
            <Typography>
              Approve access by the vault to the selected token
            </Typography>
            <Button onClick={handleApprove}>Approve</Button>
          </Stack>
          <Stack alignItems="flex-start" component="li" spacing={1}>
            <Typography>Deposit tokens to the vault</Typography>
            <Button>Deposit</Button>
          </Stack>
          <Stack alignItems="flex-start" component="li" spacing={1}>
            <Typography>Waiting for tokens to be received</Typography>
            <CircularProgress />
          </Stack>
        </Stack>
      </Paper>
      <Button onClick={handleBack}>Back</Button>
    </Stack>
  );
}
