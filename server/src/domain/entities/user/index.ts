import makeBuildUser from "./user";
import Id from "@/shared/utils/Id";
import validateEmail from "@/shared/utils/func";

const makeUser = makeBuildUser({ Id, validateEmail });

export default makeUser;
