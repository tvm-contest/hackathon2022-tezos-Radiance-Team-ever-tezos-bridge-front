import {Box, Button, Stack} from "@mui/material";
import {useState} from "react";
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

  if (currentStep !== 1) return null;

  function handleConnectTezosWallet() {
    dispatch(connectTezos());
  }

  function handleConnectEverWallet() {
    dispatch(connectEver());
  }

  return (
    <>
      <Stack spacing={2}>
        <TokenInput
          label="From (Tezos)"
          onConnectWallet={handleConnectTezosWallet}
          onSelectToken={tezosPopup.handleOpen}
          token={tezosPopup.token}
          wallet={tezosWallet}
        />
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <SwapButton />
        </Box>
        <TokenInput
          label="To (Everscale)"
          onConnectWallet={handleConnectEverWallet}
          onSelectToken={everPopup.handleOpen}
          token={everPopup.token}
          wallet={everWallet}
        />
        <Button
          onClick={() => {
            dispatch(nextStep());
          }}
        >
          Next
        </Button>
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
