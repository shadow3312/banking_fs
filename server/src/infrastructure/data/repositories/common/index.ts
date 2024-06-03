import buildMakeRepository from "./common";
import { models } from "../../config";

const makeRepository = buildMakeRepository({ models });

export default makeRepository;
