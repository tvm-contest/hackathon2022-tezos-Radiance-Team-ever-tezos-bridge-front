import {TempleDAppPermission} from "@temple-wallet/dapp";
import {Address, Permissions} from "everscale-inpage-provider";
import {SagaReturnType} from "redux-saga/effects";

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

export interface TokenInputProps {
  label: string;
  token?: Token;
  tokens?: Token[] | null;
  onConnectWallet: () => void;
  onSelectToken: () => void;
}

export interface TokenListPopupProps {
  onClose: () => void;
  tokens: Token[];
}

export type TokenListItemProps = {
  token: Token;
};

/**
 * Saga's types
 */
export type RequestPermissionsReturn = SagaReturnType<
  () => Promise<Partial<Permissions<Address>>>
>;

export type HasProviderReturn = SagaReturnType<() => Promise<boolean>>;

export type IsAvailableReturn = SagaReturnType<() => Promise<boolean>>;

export type GetCurrentPermissionsReturn = SagaReturnType<
  () => Promise<TempleDAppPermission>
>;

export type GetPKHReturn = SagaReturnType<() => Promise<string>>;

export type WalletSelect = SagaReturnType<() => Wallet | null>;

export type BalanceArray = SagaReturnType<() => Promise<string>>;

export type GetTezosTokensResponse = SagaReturnType<
  () => Promise<{
    data: {
      balances: TezosToken[];
      total: number;
    };
  }>
>;
