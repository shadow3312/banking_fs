import { models } from "../../config";
import makeRepository from "../common";

const transactionRepository = makeRepository<IUser>({
  verboseName: "user",
  model: models.User,
});

export default transactionRepository;
