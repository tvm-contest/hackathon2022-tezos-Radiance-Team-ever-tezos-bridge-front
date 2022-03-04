import {Button, Paper, Stack, Typography} from "@mui/material";
import {useDispatch} from "react-redux";

import useAppSelector from "../hooks/useAppSelector";
import {
  prev as prevStep,
  selectCurrentStep,
} from "../store/reducers/currentStep";
import {selectEnteredValues} from "../store/reducers/enteredValues";
import {deposit} from "../store/reducers/everTezosTransactions";
import {selectTezosWallet} from "../store/reducers/tezosWallet";
import {Step} from "../types";

export default function ConfirmEverTezos() {
  const dispatch = useDispatch();
  const currentStep = useAppSelector(selectCurrentStep);
  const enteredValues = useAppSelector(selectEnteredValues);
  const tezosWallet = useAppSelector(selectTezosWallet);

  function handleDeposit() {
    if (enteredValues.data && tezosWallet)
      dispatch(
        deposit({
          amount:
            enteredValues.data.amount *
            10 ** enteredValues.data.selectedToken.decimals,
          receiver: tezosWallet.address,
        }),
      );
  }

  function handleBack() {
    dispatch(prevStep());
  }

  if (currentStep !== Step.ConfirmEverTezos || !enteredValues.data) return null;

  return (
    <Stack spacing={2}>
      <Paper sx={{borderRadius: "40px", p: 4}}>
        <Stack component="ol" spacing={2} sx={{m: 0, p: 0}}>
          <Stack alignItems="flex-start" component="li" spacing={1}>
            <Typography>Deposit tokens to the vault</Typography>
            <Button onClick={handleDeposit}>Deposit</Button>
          </Stack>
        </Stack>
      </Paper>
      <Button onClick={handleBack}>Back</Button>
    </Stack>
  );
}
