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

interface Token {
  balance: number;
  name: string;
}

export interface Wallet {
  address: string;
  balance: number;
}

/**
 * Redux store states's types
 */
export interface CurrentStepState {
  value: number;
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
  tokens?: Token[];
  onConnectWallet: () => void;
  onSelectToken: () => void;
}

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
