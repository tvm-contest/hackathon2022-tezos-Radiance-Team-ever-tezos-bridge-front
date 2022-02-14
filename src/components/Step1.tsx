import {Box, Button, Stack} from "@mui/material";
import {useDispatch} from "react-redux";

import useAppSelector from "../hooks/useAppSelector";
import {
  next as nextStep,
  selectCurrentStep,
} from "../store/reducers/currentStep";
import {connect as connectEver} from "../store/reducers/everWallet";
import {connect as connectTezos} from "../store/reducers/tezosWallet";
import SwapButton from "./SwapButton";
import TokenInput from "./TokenInput";

export default function Step1() {
  const dispatch = useDispatch();
  const currentStep = useAppSelector(selectCurrentStep);

  if (currentStep !== 1) return null;

  return (
    <Stack spacing={2}>
      <TokenInput
        label="From (Tezos)"
        onConnectWallet={() => dispatch(connectTezos())}
        onSelectToken={() => {}}
      />
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <SwapButton />
      </Box>
      <TokenInput
        label="To (Everscale)"
        onConnectWallet={() => dispatch(connectEver())}
        onSelectToken={() => {}}
      />
      <Button
        onClick={() => {
          dispatch(nextStep());
        }}
      >
        Next
      </Button>
    </Stack>
  );
}
