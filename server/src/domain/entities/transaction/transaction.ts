export default function buildMakeTransaction({
  Id,
  validateEmail,
}: IBuildMakeTransaction): (
  transaction: Partial<ITransaction>
) => IMakeTransactionMethods {
  return function makeTransaction({
    id = Id.makeId(),
    name,
    email,
    amount,
    channel,
    category,
    senderId,
    receiverId,
    senderBankId,
    receiverBankId,
  }: Partial<ITransaction>) {
    //#region field validation
    if (!Id.isValidId(id)) {
      throw new Error(`Transaction must have a valid id`);
    }
    if (!name || name.length < 3) {
      throw new Error(`Name must have at least 3 characters`);
    }
    if (!email) {
      throw new Error(`Email is required`);
    }
    if (email && !validateEmail.isValidEmail(email)) {
      throw new Error(`Invalid email`);
    }
    if (!amount) {
      throw new Error(`Amount is required`);
    }
    if (!channel) {
      throw new Error(`Channel is required`);
    }
    if (!category) {
      throw new Error(`Category is required`);
    }
    if (!senderId) {
      throw new Error(`senderId is required`);
    }
    if (!receiverId) {
      throw new Error(`receiverId is required`);
    }
    if (!senderBankId) {
      throw new Error(`senderBankId is required`);
    }
    if (!receiverBankId) {
      throw new Error(`receiverBankId is required`);
    }
    //#endregion
    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getEmail: () => email,
      getAmount: () => amount,
      getChannel: () => channel,
      getCategory: () => category,
      getSenderId: () => senderId,
      getReceiverId: () => receiverId,
      getSenderBankId: () => senderBankId,
      getReceiverBankId: () => receiverBankId,
    });
  };
}
