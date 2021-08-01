import { TezosToolkit } from "@taquito/taquito";
import { TempleWallet } from "@temple-wallet/dapp";
import React, { useCallback, useState } from "react";
import "./App.css";

import { ReadOnlySigner } from "./ReadOnlySigner";

interface ConnectionState {
  accountPkh: string;
  tezos: TezosToolkit;
}

function App() {
  const [connection, setConnection] = useState<ConnectionState>();

  const connectWallet = useCallback(async () => {
    const isAvailable = TempleWallet.isAvailable();
    if (!isAvailable) {
      alert("Oy vey, you need to install Temple Wallet");
      return;
    }

    try {
      const wallet = new TempleWallet("Temple workshop");

      if (!wallet.connected) {
        await wallet.connect("mainnet", { forcePermission: true });
      }

      const tezos = wallet.toTezos();
      const { pkh, publicKey } = wallet.permission!;
      tezos.setSignerProvider(new ReadOnlySigner(pkh, publicKey));
      setConnection({ tezos, accountPkh: await tezos.signer.publicKeyHash() });
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  }, []);

  return (
    <div>
      <button onClick={connectWallet}>
        {connection ? connection.accountPkh : "Connect to wallet"}
      </button>
    </div>
  );
}

export default App;
