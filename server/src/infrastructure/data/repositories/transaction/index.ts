import { models } from "../../config";
import makeRepository from "../common";

const transactionRepository = makeRepository<ITransaction>({
  verboseName: "transaction",
  model: models.Transaction,
});

export default transactionRepository;
