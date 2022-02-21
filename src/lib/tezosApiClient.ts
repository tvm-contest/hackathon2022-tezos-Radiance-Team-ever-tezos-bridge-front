import axios from "axios";

import {GetAccountRes, GetTezosWalletsRes} from "../types";

const tezosApiClient = axios.create({
  baseURL: "https://api.better-call.dev/v1",
});

export function getTezosWallets(tezosWalletAddress: string) {
  return tezosApiClient.get<GetTezosWalletsRes>(
    `/account/hangzhou2net/${tezosWalletAddress}/token_balances`,
  );
}

export function getAccount(accountAddress: string) {
  return tezosApiClient.get<GetAccountRes>(
    `/account/hangzhou2net/${accountAddress}`,
  );
}

export default tezosApiClient;
