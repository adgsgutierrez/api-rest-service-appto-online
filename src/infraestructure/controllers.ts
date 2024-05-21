import { TokenController } from "../api/utilities/token.controller";
import { Builder } from "./builder";

const tokenService = new TokenController();

export const token = tokenService;
export const APIS = [
    ...Builder.get().start(),
    tokenService
]
