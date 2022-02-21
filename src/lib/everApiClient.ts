import axios from "axios";

import {GetBalanceRes} from "../types";

const everApiClient = axios.create({
  baseURL: "https://net.ton.dev/graphql",
});

export function getBalance(accountAddress: string) {
  return everApiClient.post<GetBalanceRes>("/", {
    query: `{\n  accounts(\n    filter: {id: {eq: "${accountAddress}"}}\n  ) {\n    balance\n  }\n}\n`,
  });
}

export default everApiClient;
