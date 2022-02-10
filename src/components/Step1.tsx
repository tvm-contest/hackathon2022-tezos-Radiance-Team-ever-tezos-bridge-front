import {Box, Button, Stack} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import {selectCurrentStep} from "../store/reducers/currentStep";
import StepIndicator from "./StepIndicator";
import SwapButton from "./SwapButton";
import TokenInput from "./TokenInput";

export default function Step1() {
  const currentStep = useAppSelector(selectCurrentStep);

  if (currentStep !== 1) return null;

  return (
    <Stack spacing={2}>
      <StepIndicator />
      <TokenInput label="From (Tezos)" />
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <SwapButton />
      </Box>
      <TokenInput label="To (Everscale)" />
      <Button>Next</Button>
    </Stack>
  );
}
