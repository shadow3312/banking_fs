import Id from "@/shared/utils/Id";
import validateEmail from "@/shared/utils/func";
import buildMakeUser from "./user";

const makeUser = buildMakeUser({ Id, validateEmail });

export default makeUser;
