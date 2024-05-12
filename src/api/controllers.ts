import { CreateResidentialController } from "./booking/create.residential.controller";
import { ListResidentialController } from "./booking/list.residential.controller";
import { LoginController } from "./user/login.controller";
import { RegisterUserController } from "./user/register.controller";
import { StatusController } from "./utilities/status.controller";
import { TokenController } from "./utilities/token.controller";

const tokenService = new TokenController();

export const token = tokenService;
export const APIS = [
    new LoginController(),
    new StatusController(),
    new ListResidentialController(),
    new CreateResidentialController(),
    new RegisterUserController(),
    tokenService
]
