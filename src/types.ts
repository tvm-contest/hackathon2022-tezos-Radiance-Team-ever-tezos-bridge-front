import {ButtonProps, InputBaseProps, PaperProps} from "@mui/material";
import {Address} from "everscale-inpage-provider";

import store from "./store";

/**
 * Global types
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}

export interface Token {
  address: string;
  decimals: number;
  balance: number;
  name: string;
  symbol: string;
}

export interface Wallet {
  address: string;
  balance: number;
}

export interface Transfer {
  amount: number;
  createdAt: string;
  direction: Direction;
  id: string;
  receiver: string;
  sender: string;
}

export type WalletAddressRequest = {
  root: Address;
  owner: Address;
};

export type BalanceWalletRequest = {
  wallet: Address;
};

export enum Direction {
  TezosEver = "tezos-ever",
  EverTezos = "ever-tezos",
}

export enum Step {
  EnterValues = "enter-values",
  ConfirmTezosEver = "confirm-tezos-ever",
  ConfirmEverTezos = "confirm-ever-tezos",
}

/**
 * Formik values
 */
export interface EnterValuesFormik {
  direction: Direction;
  tezosToken: Token | null;
  tezosValue: number | "";
  everToken: Token | null;
  everValue: number | "";
}

export type EnterErrorsFormik = Partial<{
  tezosToken: string;
  tezosValue: string;
  everToken: string;
  everValue: string;
}>;

/**
 * Redux store states's types
 */

export type StepAction = Step.ConfirmTezosEver | Step.ConfirmEverTezos;

export interface CurrentStepState {
  value: Step;
}

export interface TokensState {
  data: Token[];
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
    opHash: string | null;
    tezosId: number | null;
    everId: number | null;
  };
  error: string | null;
  fetched: boolean;
  loading: boolean;
}

export interface TransfersState {
  items: {
    data: Transfer[];
    error: string | null;
    fetched: boolean;
    loading: boolean;
  };
  modal: {
    visible: boolean;
  };
}

export interface DepositAction {
  amount: number;
  receiver: string;
}

export interface EnteredValuesState {
  data: {
    amount: number;
    selectedToken: Token;
    direction: Direction;
  } | null;
}

export interface EnteredValuesAction {
  amount: number;
  selectedToken: Token;
  direction: Direction;
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
  error?: boolean;
  errorLabel?: string;
  extensionInstalled: boolean;
  extensionLabel: string;
  extensionLink: string;
  label: string;
  loading?: boolean;
  onConnectWallet: () => void;
  onSelectToken?: () => void;
  token?: Token | null;
  wallet?: Wallet | null;
  walletLabel: string;
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
 * Components's functions
 */
export interface TokensPopupArgs {
  setToken: (t: Token) => void;
}

/**
 * Tezos and Ever API Responses
 */
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
