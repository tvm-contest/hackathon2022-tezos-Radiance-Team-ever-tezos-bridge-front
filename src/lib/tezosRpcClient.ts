import {MichelCodecPacker, TezosToolkit} from "@taquito/taquito";
import {TempleWallet} from "@temple-wallet/dapp";

const tezos = new TezosToolkit("https://hangzhounet.api.tez.ie");
const michelEncoder = new MichelCodecPacker();
let wallet: TempleWallet | null = null;

tezos.setPackerProvider(michelEncoder);

export async function getWallet() {
  if (wallet) return wallet;

  const permissions = await TempleWallet.getCurrentPermission();

  wallet = new TempleWallet("everscale-bridge-front", permissions);
  if (!wallet.connected) {
    wallet.connect("hangzhounet", {
      forcePermission: true,
    });
  }

  tezos.setWalletProvider(wallet);

  return wallet;
}

export default tezos;
