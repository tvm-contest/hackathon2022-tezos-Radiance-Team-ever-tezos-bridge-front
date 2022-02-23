import ThumbUpIcon from "@mui/icons-material/ThumbUp";
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
import {selectEnteredValues} from "../store/reducers/enteredValues";
import {
  permitTezosToken,
  selectPermittedTezosTokens,
} from "../store/reducers/permissions";

export default function Step2() {
  const dispatch = useDispatch();
  const currentStep = useAppSelector(selectCurrentStep);
  const enteredValues = useAppSelector(selectEnteredValues);
  const permittedTezosTokens = useAppSelector(selectPermittedTezosTokens);

  function handleBack() {
    dispatch(prevStep());
  }

  function handleApprove() {
    dispatch(permitTezosToken());
  }

  if (currentStep !== 2 || !enteredValues.data) return null;

  return (
    <Stack spacing={2}>
      <Paper sx={{borderRadius: "40px", p: 4}}>
        <Stack component="ol" spacing={2} sx={{m: 0, p: 0}}>
          <Stack alignItems="flex-start" component="li" spacing={1}>
            <Typography>
              Approve access by the vault to the selected token
            </Typography>
            {permittedTezosTokens.includes(enteredValues.data.selectedToken) ? (
              <Typography
                sx={{
                  color: "text.secondary",
                  fontWeight: 700,
                }}
              >
                Approved
                <ThumbUpIcon sx={{ml: 1, verticalAlign: "text-bottom"}} />
              </Typography>
            ) : (
              <Button onClick={handleApprove}>Approve</Button>
            )}
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
