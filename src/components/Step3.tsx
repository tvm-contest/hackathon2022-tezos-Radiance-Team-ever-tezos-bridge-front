import useAppSelector from "../hooks/useAppSelector";
import {selectCurrentStep} from "../store/reducers/currentStep";

export default function Step3() {
  const currentStep = useAppSelector(selectCurrentStep);

  if (currentStep !== 2) return null;

  return (
    <div>
      <button>Confirm 1</button>
      <button>Confirm 2</button>
      <button>Confirm 3</button>
    </div>
  );
}
