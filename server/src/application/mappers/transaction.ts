export default function transactionToObject(
  transaction: IMakeTransactionMethods
): ITransaction {
  return Object.freeze<ITransaction>({
    id: transaction.getId(),
    name: transaction.getName(),
    email: transaction.getEmail(),
    amount: transaction.getAmount(),
    channel: transaction.getChannel(),
    category: transaction.getCategory(),
    senderId: transaction.getSenderId(),
    receiverId: transaction.getReceiverId(),
    senderBankId: transaction.getSenderBankId(),
    receiverBankId: transaction.getReceiverBankId(),
    createdAt: transaction.getCreatedAt(),
  });
}
