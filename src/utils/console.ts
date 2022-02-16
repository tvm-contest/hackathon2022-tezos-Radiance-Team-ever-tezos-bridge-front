/* eslint-disable no-console */
import _ from "lodash";

export function log(message?: any, ...optionalParams: any[]): void {
  if (typeof console !== "undefined" && typeof console.log === "function") {
    const debounced = _.debounce(() => {
      console.log(message, ...optionalParams);
    }, 0);
    debounced();
  }
}

export function warn(message?: any, ...optionalParams: any[]): void {
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    const debounced = _.debounce(() => {
      console.warn(message, ...optionalParams);
    }, 0);
    debounced();
  }
}

export function error(message?: any, ...optionalParams: any[]): void {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    const debounced = _.debounce(() => {
      console.error(message, ...optionalParams);
    }, 0);
    debounced();
  }
}

export function debug(message?: any, ...optionalParams: any[]): void {
  if (process.env.NODE_ENV !== "production") {
    log(message, ...optionalParams);
  }
}
