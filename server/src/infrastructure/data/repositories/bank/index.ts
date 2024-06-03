import { models } from "../../config";
import makeRepository from "../common";

const bankRepository = makeRepository<IBank>({
  verboseName: "bank",
  model: models.Bank,
});

export default bankRepository;
