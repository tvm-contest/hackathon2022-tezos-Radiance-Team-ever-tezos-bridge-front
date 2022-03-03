import {Step as StepMui, StepLabel, Stepper, StepperProps} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import {selectCurrentStep} from "../store/reducers/currentStep";
import {Step} from "../types";

const steps = ["Select the route, token and amount", "Transfer status"];

export default function StepIndicator(props: StepperProps) {
  const currentStep = useAppSelector(selectCurrentStep);

  return (
    <Stepper activeStep={currentStep === Step.EnterValues ? 0 : 1} {...props}>
      {steps.map((label) => {
        return (
          <StepMui key={label}>
            <StepLabel>{label}</StepLabel>
          </StepMui>
        );
      })}
    </Stepper>
  );
}
