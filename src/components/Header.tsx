import {Button, Stack} from "@mui/material";
import _ from "lodash";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  connect as connectEverWallet,
  disconnect as disconnectEverWallet,
  selectEverWallet,
} from "../store/reducers/everWallet";
import {
  connect as connectTezosWallet,
  disconnect as disconnectTezosWallet,
  selectTezosWallet,
} from "../store/reducers/tezosWallet";

export default function Header() {
  const dispatch = useAppDispatch();
  const everWallet = useAppSelector(selectEverWallet);
  const tezosWallet = useAppSelector(selectTezosWallet);

  function handleConnectTezosWallet() {
    dispatch(connectTezosWallet());
  }

  function handleDisconnectTezosWallet() {
    dispatch(disconnectTezosWallet());
  }

  function handleConnectEverWallet() {
    dispatch(connectEverWallet());
  }

  function handleDisconnectEverWallet() {
    dispatch(disconnectEverWallet());
  }

  return (
    <Stack component="header" direction="row-reverse" spacing={1} sx={{my: 2}}>
      {tezosWallet ? (
        <Button
          onClick={handleDisconnectTezosWallet}
          size="small"
          variant="text"
        >
          {_.truncate(tezosWallet.address, {length: 10})}
        </Button>
      ) : (
        <>
          <Button
            onClick={handleConnectTezosWallet}
            size="small"
            variant="text"
          >
            Connect Tezos Wallet
          </Button>
        </>
      )}
      {everWallet ? (
        <Button
          onClick={handleDisconnectEverWallet}
          size="small"
          variant="text"
        >
          {_.truncate(everWallet.address, {length: 10})}
        </Button>
      ) : (
        <Button onClick={handleConnectEverWallet} size="small" variant="text">
          Connect Ever Wallet
        </Button>
      )}
    </Stack>
  );
}
