import {Box, Button, Stack} from "@mui/material";
import {useFormik} from "formik";
import {useCallback, useMemo, useState} from "react";
import {useDispatch} from "react-redux";

import useAppSelector from "../hooks/useAppSelector";
import {
  next as nextStep,
  selectCurrentStep,
} from "../store/reducers/currentStep";
import {selectEnteredValues, setValues} from "../store/reducers/enteredValues";
import {selectEverTokens} from "../store/reducers/everTokens";
import {
  connect as connectEver,
  selectEverWallet,
} from "../store/reducers/everWallet";
import {selectTezosTokens} from "../store/reducers/tezosTokens";
import {
  connect as connectTezos,
  selectTezosWallet,
} from "../store/reducers/tezosWallet";
import {Token, WrappedTokenInputProps} from "../types";
import SwapButton from "./SwapButton";
import TokenInput from "./TokenInput";
import TokenListPopup from "./TokenListPopup";

export default function Step1() {
  const dispatch = useDispatch();

  const currentStep = useAppSelector(selectCurrentStep);
  const everWallet = useAppSelector(selectEverWallet);
  const tezosWallet = useAppSelector(selectTezosWallet);
  const everTokens = useAppSelector(selectEverTokens);
  const tezosTokens = useAppSelector(selectTezosTokens);
  const enteredValues = useAppSelector(selectEnteredValues);
  const everPopup = useTokensPopup();
  const tezosPopup = useTokensPopup();

  const [direction, setDirection] = useState<"AB" | "BA">("AB");

  const {values, handleChange, handleBlur} = useFormik({
    enableReinitialize: true,
    initialValues: {
      direction: "AB",
      everToken: null,
      everValue: enteredValues.data?.amount || "",
      tezosToken: null,
      tezosValue: enteredValues.data?.amount || "",
    },
    onSubmit() {},
  });

  const handleConnectTezosWallet = useCallback(() => {
    dispatch(connectTezos());
  }, [dispatch]);

  const handleConnectEverWallet = useCallback(() => {
    dispatch(connectEver());
  }, [dispatch]);

  const TokenInputs = useMemo(() => {
    const initialInputs = [
      ({prefixLabel, readOnly, selectToken}: WrappedTokenInputProps) => (
        <TokenInput
          label={`${prefixLabel} (Tezos)`}
          name="tezosValue"
          onBlur={handleBlur}
          onChange={handleChange}
          onConnectWallet={handleConnectTezosWallet}
          onSelectToken={selectToken ? tezosPopup.handleOpen : undefined}
          readOnly={readOnly}
          token={tezosPopup.token}
          value={values.tezosValue}
          wallet={tezosWallet}
        />
      ),
      ({prefixLabel, readOnly, selectToken}: WrappedTokenInputProps) => (
        <TokenInput
          label={`${prefixLabel} (Everscale)`}
          name="everValue"
          onBlur={handleBlur}
          onChange={handleChange}
          onConnectWallet={handleConnectEverWallet}
          onSelectToken={selectToken ? everPopup.handleOpen : undefined}
          readOnly={readOnly}
          token={everPopup.token}
          value={values.everValue}
          wallet={everWallet}
        />
      ),
    ];

    return direction === "AB"
      ? {A: initialInputs[0], B: initialInputs[1]}
      : {A: initialInputs[1], B: initialInputs[0]};
  }, [
    direction,
    tezosPopup,
    everPopup,
    tezosWallet,
    everWallet,
    handleConnectTezosWallet,
    handleConnectEverWallet,
    values,
    handleChange,
    handleBlur,
  ]);

  function handleSwap() {
    setDirection(direction === "AB" ? "BA" : "AB");
  }

  function handleNext() {
    dispatch(
      setValues({
        amount: +values.tezosValue,
        selectedToken: "",
      }),
    );
    dispatch(nextStep());
  }

  if (currentStep !== 1) return null;

  return (
    <>
      <Stack spacing={2}>
        <TokenInputs.A prefixLabel="From" selectToken />
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <SwapButton onClick={handleSwap} />
        </Box>
        <TokenInputs.B prefixLabel="To" readOnly />
        <Button onClick={handleNext}>Next</Button>
      </Stack>
      <TokenListPopup
        onClose={everPopup.handleClose}
        onTokenSelect={everPopup.handleTokenSelect}
        open={everPopup.open}
        tokens={everTokens}
      />
      <TokenListPopup
        onClose={tezosPopup.handleClose}
        onTokenSelect={tezosPopup.handleTokenSelect}
        open={tezosPopup.open}
        tokens={tezosTokens}
      />
    </>
  );
}

function useTokensPopup() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<Token | null>(null);

  function handleTokenSelect(t: Token) {
    setToken(t);
    setOpen(false);
  }

  return {
    handleClose: () => setOpen(false),
    handleOpen: () => setOpen(true),
    handleTokenSelect,
    open,
    token,
  };
}
