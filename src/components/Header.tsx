import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {Button, Paper, Stack, Typography} from "@mui/material";

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
        <Paper sx={{borderRadius: "18px", p: 1}}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Typography
              component="span"
              sx={{
                color: "text.secondary",
                fontSize: "1.25rem",
                fontWeight: 700,
              }}
            >
              Balance: {tezosWallet.balance} XTZ
            </Typography>
            <Button
              endIcon={<FiberManualRecordIcon />}
              href={`https://hangzhou2net.tzkt.io/${encodeURIComponent(
                tezosWallet.address,
              )}`}
              onClick={handleDisconnectTezosWallet}
              size="small"
              target="_blank"
              variant="outlined"
            >
              {tezosWallet.address.replace(/(?<=^.{5}).*(?=.{5}$)/, "...")}
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Button onClick={handleConnectTezosWallet} size="small" variant="text">
          Connect Tezos Wallet
        </Button>
      )}
      {everWallet ? (
        <Paper sx={{borderRadius: "18px", p: 1}}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Typography
              component="span"
              sx={{
                color: "text.secondary",
                fontSize: "1.25rem",
                fontWeight: 700,
              }}
            >
              Balance: {everWallet.balance} EVER
            </Typography>
            <Button
              endIcon={<FiberManualRecordIcon />}
              href={`https://net.ever.live/accounts/accountDetails?id=${encodeURIComponent(
                everWallet.address,
              )}`}
              onClick={handleDisconnectEverWallet}
              size="small"
              target="_blank"
              variant="outlined"
            >
              {everWallet.address.replace(/(?<=^.{5}).*(?=.{5}$)/, "...")}
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Button onClick={handleConnectEverWallet} size="small" variant="text">
          Connect Ever Wallet
        </Button>
      )}
    </Stack>
  );
}
