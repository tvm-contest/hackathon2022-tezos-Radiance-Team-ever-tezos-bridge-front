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

/**
 * Store states's types
 */
export interface CurrentStepState {
  value: number;
}

/**
 * Components's props
 */
export interface SummaryProps {
  fromAddress?: string;
  toAddress?: string;
  amount?: number | "-";
}
