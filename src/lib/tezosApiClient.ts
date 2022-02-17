import axios from "axios";

const tezosApiClient = axios.create({
  baseURL: "https://api.hangzhou2net.tzkt.io",
});

export default tezosApiClient;
