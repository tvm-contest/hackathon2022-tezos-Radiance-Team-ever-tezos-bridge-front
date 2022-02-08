import {NetworkType as BeaconNetworkType} from "@airgap/beacon-sdk";
import BigNumber from "bignumber.js";
import React, {useState} from "react";

import {
  connectWalletBeacon,
  connectWalletEver,
  connectWalletTemple,
  DAppConnection,
  disconnectWalletEver,
} from "../wallets";

const networksTokensData = {
  mainnet: {
    address: "KT1BHCumksALJQJ8q8to2EPigPW6qpyTr7Ng",
    id: 0,
    decimals: 8,
    name: "CRUNCH",
  },
  hangzhounet: {
    address: "KT1VowcKqZFGhdcDZA3UN1vrjBLmxV5bxgfJ",
    id: 0,
    decimals: 6,
    name: "Test QUIPU",
  },
};

const AUTHOR_ADDRESS = "tz1LSMu9PugfVyfX2ynNU9y4eVvSACJKP7sg";

function hasMessage(value: unknown): value is {message: string} {
  return typeof value === "object" && value !== null && "message" in value;
}

export default function Header() {
  const [connection, setConnection] = useState<DAppConnection>();
  const [network, setNetwork] = useState<"mainnet" | "hangzhounet">("mainnet");
  const [everAddress, setEverAddress] = useState<string>("");

  const connectWallet = async (connectionType: DAppConnection["type"]) => {
    try {
      const connection =
        connectionType === "temple"
          ? await connectWalletTemple(true, network)
          : await connectWalletBeacon(true, {
              type:
                network === "mainnet"
                  ? BeaconNetworkType.MAINNET
                  : BeaconNetworkType.HANGZHOUNET,
            });

      setConnection(connection);
    } catch (e) {
      if ((e as any)?.name === "NotGrantedTempleWalletError") {
        return;
      }

      const outputArg = hasMessage(e) ? e.message : e;
      console.error(e);
      alert(`Error: ${outputArg}`);
    }
  };

  const handleConnectTempleClick = () => connectWallet("temple");
  const handleConnectBeaconClick = () => connectWallet("beacon");
  const handleConnectEver = async () => {
    const address = await connectWalletEver();
    setEverAddress(address.toString());
  };

  const resetConnection = async () => {
    setConnection(undefined);
  };

  const resetEver = () => {
    disconnectWalletEver();
    setEverAddress("");
  };

  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    resetConnection();
    setNetwork(e.target.value as "mainnet" | "hangzhounet");
  };

  const donate = async () => {
    try {
      const {tezos, pkh} = connection!;
      const {address, id, decimals} = networksTokensData[network];
      const tokenContract = await tezos.wallet.at(address);
      const op = await tokenContract.methods
        .transfer([
          {
            from_: pkh,
            txs: [
              {
                to_: AUTHOR_ADDRESS,
                token_id: id,
                amount: new BigNumber(10).pow(decimals).times(2),
              },
            ],
          },
        ])
        .send();
      alert("Thank you, the donation is being processed!");
      await op.confirmation(1);
      alert("Donation has been processed successfully!");
    } catch (e) {
      if ((e as any)?.name === "NotGrantedTempleWalletError") {
        return;
      }

      const outputArg = hasMessage(e) ? e.message : e;
      console.error(e);
      alert(`Error while donating: ${outputArg}`);
    }
  };

  return (
    <div>
      {connection ? (
        <button onClick={resetConnection}>{connection.pkh}</button>
      ) : (
        <>
          <button onClick={handleConnectTempleClick}>
            Connect Temple Wallet
          </button>
        </>
      )}
      {everAddress ? (
        <button onClick={resetEver}>{everAddress}</button>
      ) : (
        <button onClick={handleConnectEver}>Connect Ever Wallet</button>
      )}
    </div>
  );
}
