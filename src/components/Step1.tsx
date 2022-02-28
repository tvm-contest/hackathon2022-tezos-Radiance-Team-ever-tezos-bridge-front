import {Box, Button, Stack} from "@mui/material";
import {useFormik} from "formik";
import _ from "lodash";
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
import {Token, TokenInputProps} from "../types";
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

  const inputProps = useMemo(() => {
    const name =
      direction === "AB"
        ? ["tezosValue", "everValue"]
        : ["everValue", "tezosValue"];
    const onConnectWallet =
      direction === "AB"
        ? [handleConnectTezosWallet, handleConnectEverWallet]
        : [handleConnectEverWallet, handleConnectTezosWallet];
    const onSelectToken =
      direction === "AB"
        ? [tezosPopup.handleOpen, everPopup.handleOpen]
        : [everPopup.handleOpen, tezosPopup.handleOpen];
    const token =
      direction === "AB"
        ? [tezosPopup.token, everPopup.token]
        : [everPopup.token, tezosPopup.token];
    const value =
      direction === "AB"
        ? [values.tezosValue, values.everValue]
        : [values.everValue, values.tezosValue];
    const wallet =
      direction === "AB"
        ? [tezosWallet, everWallet]
        : [everWallet, tezosWallet];

    return {
      name,
      onConnectWallet,
      onSelectToken,
      token,
      value,
      wallet,
    };
  }, [
    direction,
    handleConnectEverWallet,
    handleConnectTezosWallet,
    everPopup,
    everWallet,
    tezosPopup,
    tezosWallet,
    values,
  ]);

  const fromProps = useMemo(() => {
    const label = direction === "AB" ? "From (Tezos)" : "From (Everscale)";

    return {
      ..._.zipObject(_.keys(inputProps), _.map(inputProps, "0")),
      label,
      onBlur: handleBlur,
      onChange: handleChange,
      readOnly: false,
    } as TokenInputProps;
  }, [direction, inputProps, handleBlur, handleChange]);

  const toProps = useMemo(() => {
    const label = direction === "AB" ? "To (Everscale)" : "To (Tezos)";

    return {
      ..._.zipObject(_.keys(inputProps), _.map(inputProps, "1")),
      label,
      onBlur: handleBlur,
      onChange: handleChange,
      readOnly: true,
    } as TokenInputProps;
  }, [direction, inputProps, handleBlur, handleChange]);

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
        <TokenInput {...fromProps} />
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <SwapButton onClick={handleSwap} />
        </Box>
        <TokenInput {...toProps} />
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
