import useAppSelector from "../hooks/useAppSelector";
import { selectCurrentStep } from "../store/reducers/currentStep";

export default function Step1() {
  const currentStep = useAppSelector(selectCurrentStep);

  if (currentStep !== 1) return null;

  return (
    <>
      <p>
        From blockchain{" "}
        <select>
          <option>Everscale</option>
          <option>Tezos</option>
        </select>
      </p>
      <p>
        To blockchain
        <select>
          <option>Everscale</option>
          <option>Tezos</option>
        </select>
      </p>
    </>
  );
}
