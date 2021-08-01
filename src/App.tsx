import { TezosToolkit } from "@taquito/taquito";
import { TempleWallet } from "@temple-wallet/dapp";
import React, { useCallback, useState } from "react";
import "./App.css";

import { ReadOnlySigner } from "./ReadOnlySigner";

interface ConnectionState {
  accountPkh: string;
  tezos: TezosToolkit;
}

const CRUNCH_ADDRESS = "KT1BHCumksALJQJ8q8to2EPigPW6qpyTr7Ng";
const CRUNCH_TOKEN_ID = 0;
const AUTHOR_ADDRESS = "tz1LSMu9PugfVyfX2ynNU9y4eVvSACJKP7sg";

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
      setConnection({ tezos, accountPkh: await tezos.wallet.pkh() });
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  }, []);

  const donateCrunch = useCallback(async () => {
    try {
      const { tezos, accountPkh } = connection!;
      const tokenContract = await tezos.contract.at(CRUNCH_ADDRESS);
      await tokenContract.methods
        .transfer([
          {
            from_: accountPkh,
            txs: [
              {
                to_: AUTHOR_ADDRESS,
                token_id: CRUNCH_TOKEN_ID,
                amount: 2e8,
              },
            ],
          },
        ])
        .send();
      alert("Thank you, the donation is being processed!");
    } catch (e) {
      alert(`Error while donating: ${e.message}`);
    }
  }, [connection]);

  return (
    <div>
      <button onClick={connectWallet}>
        {connection ? connection.accountPkh : "Connect to wallet"}
      </button>
      {connection && <button onClick={donateCrunch}>Donate some CRUNCH</button>}
    </div>
  );
}

export default App;
