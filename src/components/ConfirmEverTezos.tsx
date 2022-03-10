import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {useDispatch} from "react-redux";

import useAppSelector from "../hooks/useAppSelector";
import {TOKEN_DECIMALS} from "../misc/constants";
import {
  prev as prevStep,
  selectCurrentStep,
} from "../store/reducers/currentStep";
import {
  resetValues,
  selectEnteredValues,
} from "../store/reducers/enteredValues";
import {
  deposit,
  resetTransaction,
  selectCurrentEverTezosTransaction,
} from "../store/reducers/everTezosTransactions";
import {selectTezosWallet} from "../store/reducers/tezosWallet";
import {Step} from "../types";

export default function ConfirmEverTezos() {
  const dispatch = useDispatch();
  const currentStep = useAppSelector(selectCurrentStep);
  const enteredValues = useAppSelector(selectEnteredValues);
  const tezosWallet = useAppSelector(selectTezosWallet);
  const currentTransaction = useAppSelector(selectCurrentEverTezosTransaction);

  function handleBack() {
    dispatch(prevStep());
  }

  function handleReset() {
    dispatch(prevStep());
    dispatch(resetValues());
    dispatch(resetTransaction());
  }

  function handleDeposit() {
    if (enteredValues.data && tezosWallet)
      dispatch(
        deposit({
          amount: enteredValues.data.amount * 10 ** TOKEN_DECIMALS,
          receiver: tezosWallet.address,
        }),
      );
  }

  if (currentStep !== Step.ConfirmEverTezos || !enteredValues.data) return null;

  const step21Finished = currentTransaction.opHash;
  const step22Finished = currentTransaction.everId;
  const step3Finished = currentTransaction.tezosId;

  return (
    <Stack spacing={2}>
      <Paper sx={{borderRadius: "40px", p: 4}}>
        <Stack component="ol" spacing={2} sx={{m: 0, p: 0}}>
          <Stack alignItems="flex-start" component="li" spacing={1}>
            {step21Finished && step22Finished ? (
              <Typography>Tokens deposited to the vault</Typography>
            ) : (
              <Typography>Deposit tokens to the vault</Typography>
            )}
            <Button
              disabled={Boolean(step21Finished)}
              endIcon={
                step21Finished && !step22Finished ? (
                  <CircularProgress color="inherit" size={25} />
                ) : null
              }
              onClick={handleDeposit}
            >
              Deposit
            </Button>
          </Stack>
          {step22Finished && (
            <Stack alignItems="flex-start" component="li" spacing={1}>
              {step3Finished ? (
                <Typography>Your tokens have arrived!</Typography>
              ) : (
                <Typography>Waiting for tokens to be received</Typography>
              )}
              {!step3Finished && <CircularProgress />}
            </Stack>
          )}
        </Stack>
      </Paper>
      {currentTransaction.tezosId ? (
        <Button onClick={handleReset}>Make another transfer</Button>
      ) : (
        <Button onClick={handleBack}>Back</Button>
      )}
    </Stack>
  );
}
