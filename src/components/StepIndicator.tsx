import {Step, StepLabel, Stepper, StepperProps} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import {selectCurrentStep} from "../store/reducers/currentStep";

const steps = ["Select the route, token and amount", "Transfer status"];

export default function StepIndicator(props: StepperProps) {
  const currentStep = useAppSelector(selectCurrentStep);

  return (
    <Stepper activeStep={currentStep - 1} {...props}>
      {steps.map((label, index) => {
        const stepProps = {
          completed: false,
        };

        if (index + 1 < currentStep) {
          stepProps.completed = true;
        }

        return (
          <Step key={label} {...stepProps}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}
