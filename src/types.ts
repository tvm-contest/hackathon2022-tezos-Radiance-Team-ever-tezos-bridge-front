import {ButtonProps, InputBaseProps, PaperProps} from "@mui/material";
import {Address} from "everscale-inpage-provider";
import {Effect, SimpleEffect} from "redux-saga/effects";

import store from "./store";

/**
 * Global types
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export interface Token {
  balance: number;
  name: string;
  symbol: string;
}

export interface Wallet {
  address: string;
  balance: number;
}

export type WalletAddressRequest = {
  root: Address;
  owner: Address;
};

export type BalanceWalletRequest = {
  wallet: Address;
};

export interface TezosToken {
  contract: string;
  network: string;
  token_id: number;
  symbol: string;
  name: string;
  decimals: number;
  is_transferable: boolean;
  balance: string;
}

/**
 * Redux store states's types
 */
export interface CurrentStepState {
  value: number;
}

export interface TokensState {
  data: Token[] | null;
  error: string | null;
  fetched: boolean;
  loading: boolean;
}

export interface WalletState {
  data: Wallet | null;
  error: string | null;
  fetched: boolean;
  loading: boolean;
}

export interface PermissionsState {
  error: string | null;
  fetched: boolean;
  loading: boolean;
  permittedTezosTokens: string[];
}

export interface TransactionsState {
  currentTransaction: {
    everId: string | null;
    id: number | null;
    opHash: string | null;
  };
  error: string | null;
  fetched: boolean;
  loading: boolean;
}

export interface DepositAction {
  amount: number;
  everscaleReceiver: string;
}

export interface EnteredValuesState {
  data: {
    amount: number;
    selectedToken: string;
  } | null;
}

export interface EnteredValuesAction {
  amount: number;
  selectedToken: string;
}

/**
 * Components's props
 */
export interface SummaryProps {
  fromAddress?: string;
  toAddress?: string;
  amount?: number | "-";
}

export interface AddressInputProps {
  label: string;
}

export type TokenInputProps = InputBaseProps & {
  label: string;
  token?: Token | null;
  onConnectWallet: () => void;
  onSelectToken?: () => void;
  wallet?: Wallet | null;
};

export type WrappedTokenInputProps = {
  prefixLabel: string;
  selectToken?: boolean;
  readOnly?: boolean;
};

export interface TokenListPopupProps {
  onClose?: () => void;
  onTokenSelect: (t: Token) => void;
  tokens?: Token[] | null;
  open?: boolean;
}

export type TokenListItemProps = {
  token: Token;
} & ButtonProps;

export interface SearchInputProps {
  inputProps?: InputBaseProps;
  containerProps?: PaperProps;
}

/**
 * Saga's types
 */
/** Strip any saga effects from a type; this is typically useful to get the return type of a saga. */
type StripEffects<T> = T extends IterableIterator<infer E>
  ? E extends Effect | SimpleEffect<any, any>
    ? never
    : E
  : never;

/** Unwrap the type to be consistent with the runtime behavior of a call. */
type DecideReturn<T> = T extends Promise<infer R>
  ? R // If it's a promise, return the promised type.
  : T extends IterableIterator<any>
  ? StripEffects<T> // If it's a generator, strip any effects to get the return type.
  : T; // Otherwise, it's a normal function and the return type is unaffected.

/** Determine the return type of yielding a call effect to the provided function.
 *
 * Usage: const foo: CallReturnType&lt;typeof func&gt; = yield call(func, ...)
 */
export type CallReturnType<T extends (...args: any[]) => any> = DecideReturn<
  ReturnType<T>
>;

/** Get the return type of a saga, stripped of any effects the saga might yield, which will be handled by Saga. */
export type SagaReturnType<T extends (...args: any[]) => any> = StripEffects<
  ReturnType<T>
>;

/**
 * Tezos and Ever API Responses
 */

export interface GetTezosWalletsRes {
  balances: TezosToken[];
  total: number;
}

export interface GetAccountRes {
  address: string;
  alias: string;
  balance: number;
  last_action: string;
  network: string;
  tx_count: number;
}

export interface GetBalanceRes {
  data: {
    accounts: [
      {
        balance: string;
      },
    ];
  };
}

export type GetBigMapKeysRes = {
  id: number;
  active: boolean;
  hash: string;
  key: {
    nat: string;
    address_0: string;
    address_1: string;
  };
  value: {};
  firstLevel: number;
  lastLevel: number;
  updates: number;
}[];
