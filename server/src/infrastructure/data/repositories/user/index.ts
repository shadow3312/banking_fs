import { models } from "../../config";
import makeRepository from "../common";

const userRepository = makeRepository<IUser>({
  verboseName: "user",
  model: models.User,
});

export default userRepository;
