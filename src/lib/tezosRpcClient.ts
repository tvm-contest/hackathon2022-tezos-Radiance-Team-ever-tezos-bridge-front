import {MichelCodecPacker, TezosToolkit} from "@taquito/taquito";

const tezos = new TezosToolkit("https://hangzhounet.api.tez.ie");
const michelEncoder = new MichelCodecPacker();

tezos.setPackerProvider(michelEncoder);

export default tezos;
