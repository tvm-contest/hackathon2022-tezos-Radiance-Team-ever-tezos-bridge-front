import useAppSelector from "../hooks/useAppSelector";
import {selectCurrentStep} from "../store/reducers/currentStep";
import AddressInput from "./AddressInput";
import BlockchainSelect from "./BlockchainSelect";

export default function Step1() {
  const currentStep = useAppSelector(selectCurrentStep);

  if (currentStep !== 1) return null;

  return (
    <>
      <div>
        From
        <BlockchainSelect />
        <AddressInput label="Sender address" />
      </div>
      <div>
        To
        <BlockchainSelect />
        <AddressInput label="Receiver address" />
      </div>
    </>
  );
}
