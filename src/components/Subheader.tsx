import {Typography} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import {selectCurrentStep} from "../store/reducers/currentStep";
import {Step} from "../types";

export default function Subheader() {
  const currentStep = useAppSelector(selectCurrentStep);

  let dir = "";

  if (currentStep === Step.ConfirmTezosEver) dir = "Tezos ➡ Ever";
  else if (currentStep === Step.ConfirmEverTezos) dir = "Ever ➡ Tezos";

  return (
    <Typography color="textSecondary" variant="h1">
      Cross-chain transfer
      {dir && (
        <>
          <br />
          {dir}
        </>
      )}
    </Typography>
  );
}
