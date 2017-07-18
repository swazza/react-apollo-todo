import { homeStore, homeReducers } from "./home";

export const appReducers = {
  ...homeReducers
};

export const appStore = {
  ...homeStore
};
