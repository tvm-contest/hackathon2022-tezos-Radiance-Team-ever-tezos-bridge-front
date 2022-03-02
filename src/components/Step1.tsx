import {Box, Button, Stack} from "@mui/material";
import {useFormik} from "formik";
import _ from "lodash";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";

import useAppSelector from "../hooks/useAppSelector";
import tokensRelation from "../misc/tokens-relation";
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
import {Direction, Token, TokenInputProps, TokensPopupArgs} from "../types";
import SwapButton from "./SwapButton";
import TokenInput from "./TokenInput";
import TokenListPopup from "./TokenListPopup";

export default function Step1() {
  const dispatch = useDispatch();

  const currentStep = useAppSelector(selectCurrentStep);
  const tezosWallet = useAppSelector(selectTezosWallet);
  const everWallet = useAppSelector(selectEverWallet);
  const tezosTokens = useAppSelector(selectTezosTokens);
  const everTokens = useAppSelector(selectEverTokens);
  const enteredValues = useAppSelector(selectEnteredValues);

  const {values, handleChange, handleBlur, setFieldValue} = useFormik({
    enableReinitialize: true,
    initialValues: {
      direction: "AB" as Direction,
      everToken: null as Token | null,
      everValue: enteredValues.data?.amount || "",
      tezosToken: null as Token | null,
      tezosValue: enteredValues.data?.amount || "",
    },
    onSubmit() {},
  });

  const tezosPopup = useTokensPopup({
    setToken(t) {
      setFieldValue("tezosToken", t);
    },
  });
  const everPopup = useTokensPopup({
    setToken(t) {
      setFieldValue("everToken", t);
    },
  });

  // Automatically select second token
  useEffect(() => {
    const {tezosToken, everToken} = values;

    if ((tezosToken && everToken) || (!tezosToken && !everToken)) return;

    if (everToken) {
      const rel =
        tokensRelation.find((r) => r.includes(everToken.address)) || [];
      const opAddress = rel[0] === everToken.address ? rel[1] : rel[0];
      const opToken = tezosTokens.find((t) => t.address === opAddress);
      setFieldValue("tezosToken", opToken || null);
    } else if (tezosToken) {
      const rel =
        tokensRelation.find((r) => r.includes(tezosToken.address)) || [];
      const opAddress = rel[0] === tezosToken.address ? rel[1] : rel[0];
      const opToken = everTokens.find((t) => t.address === opAddress);
      setFieldValue("everToken", opToken || null);
    }
  }, [values, setFieldValue, everTokens, tezosTokens]);

  const handleConnectTezosWallet = useCallback(() => {
    dispatch(connectTezos());
  }, [dispatch]);

  const handleConnectEverWallet = useCallback(() => {
    dispatch(connectEver());
  }, [dispatch]);

  const inputProps = useMemo(() => {
    const {direction} = values;

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
        ? [values.tezosToken, values.everToken]
        : [values.everToken, values.tezosToken];
    const value =
      direction === "AB"
        ? [values.tezosValue, values.everValue]
        : [values.everValue, values.tezosValue];
    const wallet =
      direction === "AB"
        ? [tezosWallet, everWallet]
        : [everWallet, tezosWallet];
    const walletLabel =
      direction === "AB"
        ? ["Connect Temple wallet", "Connect Ever wallet"]
        : ["Connect Ever wallet", "Connect Temple wallet"];

    return {
      name,
      onConnectWallet,
      onSelectToken,
      token,
      value,
      wallet,
      walletLabel,
    };
  }, [
    handleConnectEverWallet,
    handleConnectTezosWallet,
    everPopup,
    everWallet,
    tezosPopup,
    tezosWallet,
    values,
  ]);

  const fromProps = useMemo(() => {
    const label =
      values.direction === "AB" ? "From (Tezos)" : "From (Everscale)";

    return {
      ..._.zipObject(_.keys(inputProps), _.map(inputProps, "0")),
      label,
      onBlur: handleBlur,
      onChange: handleChange,
      readOnly: false,
    } as TokenInputProps;
  }, [values.direction, inputProps, handleBlur, handleChange]);

  const toProps = useMemo(() => {
    const label = values.direction === "AB" ? "To (Everscale)" : "To (Tezos)";

    return {
      ..._.zipObject(_.keys(inputProps), _.map(inputProps, "1")),
      label,
      onBlur: handleBlur,
      onChange: handleChange,
      onSelectToken: undefined,
      readOnly: true,
    } as TokenInputProps;
  }, [values.direction, inputProps, handleBlur, handleChange]);

  function handleSwap() {
    setFieldValue("direction", values.direction === "AB" ? "BA" : "AB");
  }

  function handleNext() {
    if (values.tezosToken && values.everToken) {
      dispatch(
        setValues({
          amount: +values.tezosValue,
          selectedToken:
            values.direction === "AB" ? values.tezosToken : values.everToken,
        }),
      );
      dispatch(nextStep());
    }
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

function useTokensPopup({setToken}: TokensPopupArgs) {
  const [open, setOpen] = useState(false);

  function handleTokenSelect(t: Token) {
    setToken(t);
    setOpen(false);
  }

  return {
    handleClose: () => setOpen(false),
    handleOpen: () => setOpen(true),
    handleTokenSelect,
    open,
  };
}
