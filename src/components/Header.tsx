import {Button, Paper, Stack, StackProps, Typography} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import {selectEverWallet} from "../store/reducers/everWallet";
import {selectTezosWallet} from "../store/reducers/tezosWallet";

export default function Header(props: StackProps) {
  const everWallet = useAppSelector(selectEverWallet);
  const tezosWallet = useAppSelector(selectTezosWallet);

  return (
    <Stack component="header" direction="row-reverse" spacing={1} {...props}>
      {tezosWallet ? (
        <Paper sx={{borderRadius: "18px", px: 0.75, py: 0.5}}>
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
              href={`https://hangzhou2net.tzkt.io/${encodeURIComponent(
                tezosWallet.address,
              )}`}
              size="small"
              target="_blank"
              variant="outlined"
            >
              {tezosWallet.address.replace(/(?<=^.{5}).*(?=.{5}$)/, "...")}
            </Button>
          </Stack>
        </Paper>
      ) : null}
      {everWallet ? (
        <Paper sx={{borderRadius: "18px", px: 0.75, py: 0.5}}>
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
              href={`https://net.ever.live/accounts/accountDetails?id=${encodeURIComponent(
                everWallet.address,
              )}`}
              size="small"
              target="_blank"
              variant="outlined"
            >
              {everWallet.address.replace(/(?<=^.{5}).*(?=.{5}$)/, "...")}
            </Button>
          </Stack>
        </Paper>
      ) : null}
    </Stack>
  );
}
