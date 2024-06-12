import { atom } from "recoil";

const selectedBankAtom = atom<BankInfo | undefined>({
  key: "selected_bank",
  default: undefined,
});

export { selectedBankAtom };
