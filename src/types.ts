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

interface Wallet {
  address: string;
  balance: number;
}

/**
 * Redux store states's types
 */
export interface CurrentStepState {
  value: number;
}

export type WalletState = Wallet | null;

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
