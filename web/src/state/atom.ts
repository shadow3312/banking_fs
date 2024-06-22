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

const loadingActivityAtom = atom<ILoadingActivity>({
  key: "loadingActivity",
  default: {},
});

export { selectedBankAtom, firstLaunchAtom, loadingActivityAtom };
