import useAppSelector from "../hooks/useAppSelector";
import { selectCurrentStep } from "../store/reducers/currentStep";

export default function Step2() {
  const currentStep = useAppSelector(selectCurrentStep);

  if (currentStep !== 2) return null;

  return <span>Amount: </span>;
}
