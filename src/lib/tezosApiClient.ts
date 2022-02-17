import axios from "axios";

const tezosApiClient = axios.create({
  baseURL: "https://api.better-call.dev/v1",
});

export default tezosApiClient;
