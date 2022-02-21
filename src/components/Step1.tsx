import {Box, Button, Stack} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import {useDispatch} from "react-redux";

import useAppSelector from "../hooks/useAppSelector";
import {
  next as nextStep,
  selectCurrentStep,
} from "../store/reducers/currentStep";
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
import {Token} from "../types";
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
  const everPopup = useTokensPopup();
  const tezosPopup = useTokensPopup();

  const [direction, setDirection] = useState<"AB" | "BA">("AB");

  const handleConnectTezosWallet = useCallback(() => {
    dispatch(connectTezos());
  }, [dispatch]);

  const handleConnectEverWallet = useCallback(() => {
    dispatch(connectEver());
  }, [dispatch]);

  const tokenInputs = useMemo(() => {
    const inputArray = [
      <TokenInput
        label="From (Tezos)"
        onConnectWallet={handleConnectTezosWallet}
        onSelectToken={tezosPopup.handleOpen}
        token={tezosPopup.token}
        wallet={tezosWallet}
      />,
      <TokenInput
        label="To (Everscale)"
        onConnectWallet={handleConnectEverWallet}
        onSelectToken={everPopup.handleOpen}
        token={everPopup.token}
        wallet={everWallet}
      />,
    ];

    return direction === "AB"
      ? [inputArray[0], inputArray[1]]
      : [inputArray[1], inputArray[0]];
  }, [
    direction,
    tezosPopup,
    everPopup,
    tezosWallet,
    everWallet,
    handleConnectTezosWallet,
    handleConnectEverWallet,
  ]);

  function handleSwap() {
    setDirection(direction === "AB" ? "BA" : "AB");
  }

  function handleNext() {
    dispatch(nextStep());
  }

  if (currentStep !== 1) return null;

  return (
    <>
      <Stack spacing={2}>
        {tokenInputs[0]}
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <SwapButton onClick={handleSwap} />
        </Box>
        {tokenInputs[1]}
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
