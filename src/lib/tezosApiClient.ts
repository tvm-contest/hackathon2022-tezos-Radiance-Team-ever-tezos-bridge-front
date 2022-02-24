import axios from "axios";

import {FA2_ADDRESS} from "../misc/constants";
import {GetAccountRes, GetBigMapKeysRes, GetTezosWalletsRes} from "../types";

const bcdApiClient = axios.create({
  baseURL: "https://api.better-call.dev/v1",
});

const tzktApiClient = axios.create({
  baseURL: "https://api.hangzhou2net.tzkt.io/v1",
});

export function getTezosWallets(tezosWalletAddress: string) {
  return bcdApiClient.get<GetTezosWalletsRes>(
    `/account/hangzhou2net/${tezosWalletAddress}/token_balances`,
    {
      params: {
        contract: FA2_ADDRESS,
      },
    },
  );
}

export function getAccount(accountAddress: string) {
  return bcdApiClient.get<GetAccountRes>(
    `/account/hangzhou2net/${accountAddress}`,
  );
}

export function getBigMapKeys(bigMapId: number) {
  return tzktApiClient.get<GetBigMapKeysRes>(`/bigmaps/${bigMapId}/keys`);
}
