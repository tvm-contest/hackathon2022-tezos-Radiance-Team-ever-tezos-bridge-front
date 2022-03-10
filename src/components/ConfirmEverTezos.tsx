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
import {selectEnteredValues} from "../store/reducers/enteredValues";
import {
  deposit,
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

  function handleDeposit() {
    if (enteredValues.data && tezosWallet)
      dispatch(
        deposit({
          amount: enteredValues.data.amount * 10 ** TOKEN_DECIMALS,
          receiver: tezosWallet.address,
        }),
      );
  }

  function handleBack() {
    dispatch(prevStep());
  }

  if (currentStep !== Step.ConfirmEverTezos || !enteredValues.data) return null;

  const step21Finished = currentTransaction.opHash;
  const step22Finished = currentTransaction.everId;

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
        </Stack>
      </Paper>
      <Button onClick={handleBack}>Back</Button>
    </Stack>
  );
}
