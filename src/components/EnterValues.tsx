import {Box, Button, Stack} from "@mui/material";
import {useFormik} from "formik";
import _ from "lodash";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";

import useAppSelector from "../hooks/useAppSelector";
import {EVER_WALLET_URL, TEMPLE_WALLET_URL} from "../misc/constants";
import {NO_EVER_EXTENSION, NO_TEZOS_EXTENSION} from "../misc/error-messages";
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
  selectEverWalletError,
  selectEverWalletLoading,
} from "../store/reducers/everWallet";
import {selectTezosTokens} from "../store/reducers/tezosTokens";
import {
  connect as connectTezos,
  selectTezosWallet,
  selectTezosWalletError,
  selectTezosWalletLoading,
} from "../store/reducers/tezosWallet";
import {
  Direction,
  EnterErrorsFormik,
  EnterValuesFormik,
  Step,
  Token,
  TokenInputProps,
  TokensPopupArgs,
} from "../types";
import SwapButton from "./SwapButton";
import TokenInput from "./TokenInput";
import TokenListPopup from "./TokenListPopup";

export default function EnterValues() {
  const dispatch = useDispatch();

  const currentStep = useAppSelector(selectCurrentStep);
  const tezosWallet = useAppSelector(selectTezosWallet);
  const tezosWalletError = useAppSelector(selectTezosWalletError);
  const tezosWalletLoading = useAppSelector(selectTezosWalletLoading);
  const everWallet = useAppSelector(selectEverWallet);
  const everWalletError = useAppSelector(selectEverWalletError);
  const everWalletLoading = useAppSelector(selectEverWalletLoading);
  const tezosTokens = useAppSelector(selectTezosTokens);
  const everTokens = useAppSelector(selectEverTokens);
  const enteredValues = useAppSelector(selectEnteredValues);

  const initEverToken =
    useMemo(() => {
      if (!enteredValues.data) return null;

      const {direction, selectedToken} = enteredValues.data;

      if (selectedToken && direction === Direction.EverTezos)
        return enteredValues.data.selectedToken;

      const rel =
        tokensRelation.find((r) => r.includes(selectedToken.address)) || [];
      const opAddr = rel[0] === selectedToken.address ? rel[1] : rel[0];
      return everTokens.find((t) => t.address === opAddr);
    }, [enteredValues, everTokens]) || null;

  const initTezosToken = useMemo(() => {
    if (!enteredValues.data) return null;

    const {direction, selectedToken} = enteredValues.data;

    if (selectedToken && direction === Direction.TezosEver)
      return enteredValues.data.selectedToken;

    const rel =
      tokensRelation.find((r) => r.includes(selectedToken.address)) || [];
    const opAddr = rel[0] === selectedToken.address ? rel[1] : rel[0];
    return tezosTokens.find((t) => t.address === opAddr) || null;
  }, [enteredValues, tezosTokens]);

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    touched,
    values,
  } = useFormik<EnterValuesFormik>({
    enableReinitialize: true,
    initialValues: {
      direction: enteredValues.data?.direction || Direction.TezosEver,
      everToken: initEverToken,
      everValue: enteredValues.data?.amount || "",
      tezosToken: initTezosToken,
      tezosValue: enteredValues.data?.amount || "",
    },
    onSubmit: handleNext,
    validate,
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

  const templeWalletInstalled = useMemo(() => {
    return tezosWalletError !== NO_TEZOS_EXTENSION;
  }, [tezosWalletError]);

  const everWalletInstalled = useMemo(() => {
    return everWalletError !== NO_EVER_EXTENSION;
  }, [everWalletError]);

  const inputProps = useMemo(() => {
    const {direction} = values;

    const name =
      direction === Direction.TezosEver
        ? ["tezosValue", "everValue"]
        : ["everValue", "tezosValue"];
    const onConnectWallet =
      direction === Direction.TezosEver
        ? [handleConnectTezosWallet, handleConnectEverWallet]
        : [handleConnectEverWallet, handleConnectTezosWallet];
    const onSelectToken =
      direction === Direction.TezosEver
        ? [tezosPopup.handleOpen, everPopup.handleOpen]
        : [everPopup.handleOpen, tezosPopup.handleOpen];
    const token =
      direction === Direction.TezosEver
        ? [values.tezosToken, values.everToken]
        : [values.everToken, values.tezosToken];
    const value =
      direction === Direction.TezosEver
        ? [values.tezosValue, values.everValue]
        : [values.everValue, values.tezosValue];
    const wallet =
      direction === Direction.TezosEver
        ? [tezosWallet, everWallet]
        : [everWallet, tezosWallet];
    const walletLabel =
      direction === Direction.TezosEver
        ? ["Connect Temple wallet", "Connect Ever wallet"]
        : ["Connect Ever wallet", "Connect Temple wallet"];
    const label =
      direction === Direction.TezosEver
        ? ["From (Tezos)", "To (Everscale)"]
        : ["From (Everscale)", "To (Tezos)"];
    const extensionInstalled =
      direction === Direction.TezosEver
        ? [templeWalletInstalled, everWalletInstalled]
        : [everWalletInstalled, templeWalletInstalled];
    const extensionLink =
      direction === Direction.TezosEver
        ? [TEMPLE_WALLET_URL, EVER_WALLET_URL]
        : [EVER_WALLET_URL, TEMPLE_WALLET_URL];
    const extensionLabel =
      direction === Direction.TezosEver
        ? ["Install Temple wallet", "Install Ever wallet"]
        : ["Install Ever wallet", "Install Temple wallet"];
    const loading =
      direction === Direction.TezosEver
        ? [tezosWalletLoading, everWalletLoading]
        : [everWalletLoading, tezosWalletLoading];

    const tezosTouched = touched.tezosToken || touched.tezosValue;
    const everTouched = touched.everToken || touched.everValue;
    const tezosError = errors.tezosToken || errors.tezosValue;
    const everError = errors.everToken || errors.everValue;

    const error =
      direction === Direction.TezosEver
        ? [
            tezosTouched && Boolean(tezosError),
            everTouched && Boolean(everError),
          ]
        : [
            everTouched && Boolean(everError),
            tezosTouched && Boolean(tezosError),
          ];
    const errorLabel =
      direction === Direction.TezosEver
        ? [tezosError, everError]
        : [everError, tezosError];

    return {
      error,
      errorLabel,
      extensionInstalled,
      extensionLabel,
      extensionLink,
      label,
      loading,
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
    errors,
    everPopup,
    everWallet,
    everWalletInstalled,
    everWalletLoading,
    tezosPopup,
    tezosWallet,
    tezosWalletLoading,
    templeWalletInstalled,
    touched,
    values,
  ]);

  // Update second filed according to the first one
  useEffect(() => {
    const {direction, everValue, tezosValue} = values;

    if (direction === Direction.TezosEver && everValue !== tezosValue)
      setFieldValue("everValue", tezosValue);
    else if (direction === Direction.EverTezos && tezosValue !== everValue)
      setFieldValue("tezosValue", everValue);
  }, [values, setFieldValue]);

  const fromProps = useMemo(() => {
    return {
      ..._.zipObject(_.keys(inputProps), _.map(inputProps, "0")),
      onBlur: handleBlur,
      onChange: handleChange,
      readOnly: false,
    } as TokenInputProps;
  }, [inputProps, handleBlur, handleChange]);

  const toProps = useMemo(() => {
    return {
      ..._.zipObject(_.keys(inputProps), _.map(inputProps, "1")),
      onBlur: handleBlur,
      onChange: handleChange,
      readOnly: true,
    } as TokenInputProps;
  }, [inputProps, handleBlur, handleChange]);

  function validate() {
    const errors: EnterErrorsFormik = {};

    if (!values.tezosToken) errors.tezosToken = "Select token";
    if (!values.everToken) errors.everToken = "Select token";
    if (!values.tezosValue) errors.tezosValue = "Enter value";
    if (!values.everValue) errors.everValue = "Enter value";

    return errors;
  }

  function handleSwap() {
    setFieldValue(
      "direction",
      values.direction === Direction.TezosEver
        ? Direction.EverTezos
        : Direction.TezosEver,
    );
  }

  function handleNext() {
    dispatch(
      setValues({
        amount: +values.tezosValue,
        direction: values.direction,
        selectedToken:
          values.direction === Direction.TezosEver
            ? (values.tezosToken as Token)
            : (values.everToken as Token),
      }),
    );

    if (values.direction === Direction.TezosEver)
      dispatch(nextStep(Step.ConfirmTezosEver));
    else dispatch(nextStep(Step.ConfirmEverTezos));
  }

  function handleTezosTokenClose() {
    tezosPopup.handleClose();
    setFieldTouched("tezosToken");
  }

  function handleEverTokenClose() {
    everPopup.handleClose();
    setFieldTouched("everToken");
  }

  if (currentStep !== Step.EnterValues) return null;

  return (
    <>
      <Stack component="form" onSubmit={handleSubmit} spacing={2}>
        <TokenInput {...fromProps} />
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <SwapButton onClick={handleSwap} />
        </Box>
        <TokenInput {...toProps} />
        <Button type="submit">Next</Button>
      </Stack>
      <TokenListPopup
        onClose={handleTezosTokenClose}
        onTokenSelect={tezosPopup.handleTokenSelect}
        open={tezosPopup.open}
        tokens={tezosTokens}
      />
      <TokenListPopup
        onClose={handleEverTokenClose}
        onTokenSelect={everPopup.handleTokenSelect}
        open={everPopup.open}
        tokens={everTokens}
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
