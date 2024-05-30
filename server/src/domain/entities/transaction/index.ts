import buildMakeTransaction from "./transaction";
import Id from "@/shared/utils/Id";
import validateEmail from "@/shared/utils/func";

const makeTransaction = buildMakeTransaction({ Id, validateEmail });

export default makeTransaction;
