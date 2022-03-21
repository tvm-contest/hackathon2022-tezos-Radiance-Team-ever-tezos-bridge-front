import {Container, CssBaseline, Stack, Typography} from "@mui/material";
import useInterval from "@use-it/interval";
import {useEffect} from "react";

import ConfirmEverTezos from "./components/ConfirmEverTezos";
import ConfirmTezosEver from "./components/ConfirmTezosEver";
import EnterValues from "./components/EnterValues";
import Header from "./components/Header";
import RecentTransactions from "./components/RecentTransactions";
import StepIndicator from "./components/StepIndicator";
import TransactionsButton from "./components/TransactionsButton";
import useAppDispatch from "./hooks/useAppDispatch";
import useAppSelector from "./hooks/useAppSelector";
import {subscribe as subscribeEver} from "./store/reducers/everTezosTransactions";
import {fetch as fetchEverTokens} from "./store/reducers/everTokens";
import {
  check as checkEver,
  selectEverWallet,
} from "./store/reducers/everWallet";
import {getTezosPermissions} from "./store/reducers/permissions";
import {subscribe as subscribeTezos} from "./store/reducers/tezosEverTransactions";
import {fetch as fetchTezosTokens} from "./store/reducers/tezosTokens";
import {
  check as checkTezos,
  selectTezosWallet,
} from "./store/reducers/tezosWallet";
import {fetch as fetchTransfers, showModal} from "./store/reducers/transfers";

export default function App() {
  const dispatch = useAppDispatch();
  const everWallet = useAppSelector(selectEverWallet);
  const tezosWallet = useAppSelector(selectTezosWallet);

  // Check wallets extensions
  useEffect(() => {
    dispatch(checkTezos());
    dispatch(checkEver());
  }, [dispatch]);

  // Fetch Ever tokens after detecting wallets
  useEffect(() => {
    if (everWallet) dispatch(fetchEverTokens());
  }, [everWallet, dispatch]);

  // Fetch Tezos tokens after detecting wallets
  useEffect(() => {
    if (tezosWallet) dispatch(fetchTezosTokens());
  }, [tezosWallet, dispatch]);

  // Fetch tezos permissions for its token manipulation
  useEffect(() => {
    if (tezosWallet) dispatch(getTezosPermissions());
  }, [tezosWallet, dispatch]);

  // Subscription to Tezos
  useEffect(() => {
    if (tezosWallet) dispatch(subscribeTezos());
  }, [tezosWallet, dispatch]);

  // Subscription to Ever
  useEffect(() => {
    if (everWallet) dispatch(subscribeEver());
  }, [everWallet, dispatch]);

  // Fetch transfers
  useEffect(() => {
    if (everWallet && tezosWallet) dispatch(fetchTransfers());
  }, [dispatch, everWallet, tezosWallet]);

  // Refetch transfers every 10 seconds
  useInterval(() => {
    if (everWallet && tezosWallet) dispatch(fetchTransfers());
  }, 5e3);

  function handleOpen() {
    dispatch(showModal());
  }

  return (
    <>
      <CssBaseline />
      <Container>
        <Header
          sx={{
            flexDirection: {
              tablet: "row",
            },
            mt: everWallet || tezosWallet ? 2 : 0,
          }}
        />
        <RecentTransactions />
      </Container>
      <Container maxWidth="tablet">
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{mb: 2, mt: 4}}
        >
          <Typography color="textSecondary" variant="h1">
            Cross-chain transfer
          </Typography>
          <TransactionsButton onClick={handleOpen} type="button" />
        </Stack>
        <StepIndicator sx={{mb: 4}} />
        <EnterValues />
        <ConfirmTezosEver />
        <ConfirmEverTezos />
      </Container>
    </>
  );
}
