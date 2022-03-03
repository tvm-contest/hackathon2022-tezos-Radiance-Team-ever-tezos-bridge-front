import {Container, CssBaseline} from "@mui/material";
import {useEffect} from "react";

import ConfirmEverTezos from "./components/ConfirmEverTezos";
import ConfirmTezosEver from "./components/ConfirmTezosEver";
import EnterValues from "./components/EnterValues";
import Header from "./components/Header";
import StepIndicator from "./components/StepIndicator";
import Subheader from "./components/Subheader";
import useAppDispatch from "./hooks/useAppDispatch";
import useAppSelector from "./hooks/useAppSelector";
import {fetch as fetchEverTokens} from "./store/reducers/everTokens";
import {
  check as checkEver,
  selectEverWallet,
} from "./store/reducers/everWallet";
import {getTezosPermissions} from "./store/reducers/permissions";
import {fetch as fetchTezosTokens} from "./store/reducers/tezosTokens";
import {
  check as checkTezos,
  selectTezosWallet,
} from "./store/reducers/tezosWallet";
import {
  subscribeDeposit,
  subscribeReceive,
} from "./store/reducers/transactions";

export default function App() {
  const dispatch = useAppDispatch();
  const everWallet = useAppSelector(selectEverWallet);
  const tezosWallet = useAppSelector(selectTezosWallet);

  // Check wallets extensions
  useEffect(() => {
    dispatch(checkTezos());
    dispatch(checkEver());
  }, [dispatch]);

  // Fetch tokens after detecting wallets
  useEffect(() => {
    if (everWallet) dispatch(fetchEverTokens());
    if (tezosWallet) dispatch(fetchTezosTokens());
  }, [tezosWallet, everWallet, dispatch]);

  // Fetch tezos permissions for its token manipulation
  useEffect(() => {
    if (tezosWallet) dispatch(getTezosPermissions());
  }, [tezosWallet, dispatch]);

  // Subscriptions
  useEffect(() => {
    if (everWallet) dispatch(subscribeReceive());
    if (tezosWallet) dispatch(subscribeDeposit());
  }, [tezosWallet, everWallet, dispatch]);

  return (
    <>
      <CssBaseline />
      <Header
        sx={{justifyContent: "center", mt: everWallet || tezosWallet ? 2 : 0}}
      />
      <Container maxWidth="sm">
        <Subheader sx={{mb: 2, mt: 4}} />
        <StepIndicator sx={{mb: 4}} />
        <EnterValues />
        <ConfirmTezosEver />
        <ConfirmEverTezos />
      </Container>
    </>
  );
}
