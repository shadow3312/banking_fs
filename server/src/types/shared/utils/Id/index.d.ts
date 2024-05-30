interface IId {
  makeId: () => string;
  isValidId: (id: string) => boolean;
}
