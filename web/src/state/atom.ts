import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const selectedBankAtom = atom<BankInfo | undefined>({
  key: "selected_bank",
  default: undefined,
});

const firstLaunchAtom = atom<boolean>({
  key: "firstLaunch",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

const openPlaidAtom = atom<boolean>({
  key: "open_plaid",
  default: false,
});

const linkReadyAtom = atom<boolean>({
  key: "link_ready",
  default: false,
});

const loadingActivityAtom = atom<ILoadingActivity>({
  key: "loadingActivity",
  default: {},
});

export {
  selectedBankAtom,
  firstLaunchAtom,
  loadingActivityAtom,
  openPlaidAtom,
  linkReadyAtom,
};
