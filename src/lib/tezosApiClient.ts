import axios from "axios";

import {TezosToken} from "../types";

const tezosApiClient = axios.create({
  baseURL: "https://api.better-call.dev/v1",
});

export function getTezosWallets(tezosWalletAddress: string) {
  return tezosApiClient.get<{
    balances: TezosToken[];
    total: number;
  }>(`/account/hangzhou2net/${tezosWalletAddress}/token_balances`);
}

export default tezosApiClient;
