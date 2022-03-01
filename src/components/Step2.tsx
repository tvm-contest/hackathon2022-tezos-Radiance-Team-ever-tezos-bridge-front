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
import {
  resetValues,
  selectEnteredValues,
} from "../store/reducers/enteredValues";
import {selectEverWallet} from "../store/reducers/everWallet";
import {
  permitTezosToken,
  selectPermissionsLoading,
  selectPermittedTezosTokens,
} from "../store/reducers/permissions";
import {
  deposit,
  resetTransaction,
  selectCurrentTransaction,
} from "../store/reducers/transactions";

export default function Step2() {
  const dispatch = useDispatch();
  const currentStep = useAppSelector(selectCurrentStep);
  const enteredValues = useAppSelector(selectEnteredValues);
  const permittedTezosTokens = useAppSelector(selectPermittedTezosTokens);
  const permissionLoading = useAppSelector(selectPermissionsLoading);
  const everWallet = useAppSelector(selectEverWallet);
  const currentTransaction = useAppSelector(selectCurrentTransaction);

  function handleBack() {
    dispatch(prevStep());
  }

  function handleApprove() {
    dispatch(permitTezosToken());
  }

  function handleReset() {
    dispatch(prevStep());
    dispatch(resetValues());
    dispatch(resetTransaction());
  }

  function handleDeposit() {
    if (enteredValues.data && everWallet)
      dispatch(
        deposit({
          amount: enteredValues.data.amount,
          everscaleReceiver: everWallet.address,
        }),
      );
  }

  if (currentStep !== 2 || !enteredValues.data) return null;

  const hasAccess = permittedTezosTokens.length !== 0;

  return (
    <Stack spacing={2}>
      <Paper sx={{borderRadius: "40px", p: 4}}>
        <Stack component="ol" spacing={2} sx={{m: 0, p: 0}}>
          <Stack alignItems="flex-start" component="li" spacing={1}>
            {hasAccess ? (
              <Typography>Access to the token has been given</Typography>
            ) : (
              <Typography>
                Approve access by the vault to the selected token
              </Typography>
            )}
            <Button
              disabled={hasAccess}
              endIcon={
                permissionLoading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : null
              }
              onClick={handleApprove}
            >
              Approve
            </Button>
          </Stack>
          <Stack alignItems="flex-start" component="li" spacing={1}>
            {currentTransaction.opHash && currentTransaction.id ? (
              <Typography>Tokens deposited to the vault</Typography>
            ) : (
              <Typography>Deposit tokens to the vault</Typography>
            )}
            <Button
              disabled={Boolean(
                currentTransaction.opHash || currentTransaction.id,
              )}
              onClick={handleDeposit}
            >
              Deposit
            </Button>
          </Stack>
          <Stack alignItems="flex-start" component="li" spacing={1}>
            {currentTransaction.everId ? (
              <Typography>Your tokens have arrived!</Typography>
            ) : (
              <Typography>Waiting for tokens to be received</Typography>
            )}
            {!currentTransaction.everId && <CircularProgress />}
          </Stack>
        </Stack>
      </Paper>
      {currentTransaction.everId ? (
        <Button onClick={handleReset}>Make another transfer</Button>
      ) : (
        <Button onClick={handleBack}>Back</Button>
      )}
    </Stack>
  );
}
