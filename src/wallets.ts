import {MichelCodecPacker, TezosToolkit} from "@taquito/taquito";
import {TempleWallet} from "@temple-wallet/dapp";
import {ProviderRpcClient} from "everscale-inpage-provider";

import {ReadOnlySigner} from "./ReadOnlySigner";

export interface DAppConnection {
  type: "temple" | "beacon";
  pkh: string;
  pk: string;
  tezos: TezosToolkit;
  templeWallet?: TempleWallet;
}

type ActiveTempleDAppNetwork =
  | "mainnet"
  | "hangzhounet"
  | {name: string; rpc: string};

export class WalletNotConnectedError extends Error {
  constructor() {
    super("Wallet was not connected");
  }
}

const michelEncoder = new MichelCodecPacker();

const APP_NAME = "Test app";

export const defaultRpcUrls = {
  hangzhounet: "https://hangzhounet.api.tez.ie",
  mainnet: "https://mainnet.api.tez.ie",
};

export const connectWalletTemple = async (
  forcePermission: boolean,
  network: ActiveTempleDAppNetwork,
): Promise<DAppConnection> => {
  const available = await TempleWallet.isAvailable();
  if (!available) {
    throw new Error(
      "Temple wallet isn't available. Make sure it is installed and unlocked",
    );
  }

  let perm;
  if (!forcePermission) {
    perm = await TempleWallet.getCurrentPermission();
  }

  const wallet = new TempleWallet(APP_NAME, perm);

  if (!wallet.connected) {
    await wallet.connect(network, {forcePermission: true});
  }

  const tezos = new TezosToolkit(
    typeof network === "string" ? defaultRpcUrls[network] : network.rpc,
  );
  tezos.setWalletProvider(wallet);
  tezos.setPackerProvider(michelEncoder);
  const pkh = wallet.connected ? await wallet.getPKH() : undefined;
  let pk: string;
  if (wallet.connected && pkh) {
    const {pkh, publicKey} = wallet.permission!;
    pk = publicKey;
    tezos.setSignerProvider(new ReadOnlySigner(pkh, publicKey));
  } else {
    throw new Error("Wallet wasn't connected");
  }

  return {
    pk,
    pkh,
    templeWallet: wallet,
    tezos,
    type: "temple",
  };
};

const ever = new ProviderRpcClient();

export const connectWalletEver = async () => {
  if (!(await ever.hasProvider())) {
    throw new Error("Extension is not installed");
  }
  await ever.ensureInitialized();

  const {accountInteraction} = await ever.requestPermissions({
    permissions: ["basic", "accountInteraction"],
  });
  if (accountInteraction == null) {
    throw new Error("Insufficient permissions");
  }

  const selectedAddress = accountInteraction.address;

  return selectedAddress;
};

export const disconnectWalletEver = async () => {
  await ever.disconnect();
};
