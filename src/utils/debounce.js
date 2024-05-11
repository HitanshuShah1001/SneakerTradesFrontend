import {DEBOUNCE_MS} from '../constants/InputOptions';

export const debounce = (callback, ms = DEBOUNCE_MS) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, ms);
  };
};
