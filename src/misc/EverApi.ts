import {Address, Contract, FullContractState} from "everscale-inpage-provider";

import everRpcClient from "../lib/everRpcClient";
import {BalanceWalletRequest, WalletAddressRequest} from "../types";
import {debug, error} from "../utils/console";
import EverAbi from "./EverAbi";

export default class EverApi {
  public static async balance(
    args: BalanceWalletRequest | WalletAddressRequest,
    state?: FullContractState,
  ): Promise<string> {
    let {wallet} = args as BalanceWalletRequest;

    if (wallet == null) {
      wallet = await EverApi.walletAddress(args as WalletAddressRequest);
    }

    const tokenWalletContract = new Contract(
      everRpcClient,
      EverAbi.Wallet,
      wallet,
    );
    const {value0: balance} = await tokenWalletContract.methods
      .balance({
        answerId: 0,
      })
      .call({cachedState: state});

    debug(
      `%cToken Wallet%c Request token wallet %c${wallet.toString()}%c balance
               Result: %c${balance}`,
      "font-weight: bold; background: #4a5772; color: #fff; border-radius: 2px; padding: 3px 6.5px",
      "color: #c5e4f3",
      "color: #bae701",
      "color: #c5e4f3",
      "color: #bae701",
    );

    return balance.toString();
  }

  public static async balanceByTokenRoot(
    ownerAddress: Address,
    tokenRootAddress: Address,
  ): Promise<string> {
    try {
      const walletAddress = await EverApi.walletAddress({
        owner: ownerAddress,
        root: tokenRootAddress,
      });
      return await EverApi.balance({
        wallet: walletAddress,
      });
    } catch (e) {
      error(e);
      return "0";
    }
  }

  public static async walletAddress(
    args: WalletAddressRequest,
    state?: FullContractState,
  ): Promise<Address> {
    const rootContract = new Contract(everRpcClient, EverAbi.Root, args.root);
    const {value0: tokenWallet} = await rootContract.methods
      .walletOf({
        answerId: 0,
        walletOwner: args.owner,
      })
      .call({cachedState: state});

    debug(
      `%cToken Wallet%c Request wallet %c${args.owner.toString()}%c address
               In token: %c${args.root.toString()}%c
               Found: %c${tokenWallet.toString()}`,
      "font-weight: bold; background: #4a5772; color: #fff; border-radius: 2px; padding: 3px 6.5px",
      "color: #c5e4f3",
      "color: #bae701",
      "color: #c5e4f3",
      "color: #bae701",
      "color: #c5e4f3",
      "color: #bae701",
    );

    return tokenWallet;
  }
}
