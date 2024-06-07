import makeLogin from "./login";
import authenticateUser from "@/application/usecases/authentication";

const login = makeLogin({ authenticateUser });

export default login;
