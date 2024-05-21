import { CreateResidentialController } from "./residential/create.residential.controller";
import { ListResidentialController } from "./residential/list.residential.controller";
import { CreateLocationsController } from "./locations/create.locations.controller";
import { ListLocationsController } from "./locations/list.locations.controller";
import { LoginController } from "./user/login.controller";
import { RegisterUserController } from "./user/register.controller";
import { ValidateUserController } from "./user/validate.controller";
import { StatusController } from "./utilities/status.controller";
import { TokenController } from "./utilities/token.controller";
import { CreateReserveLocationController } from "./locations/create.reserve.locations.controller";

const tokenService = new TokenController();

export const token = tokenService;
export const APIS = [
    new LoginController(),
    new StatusController(),
    new ListResidentialController(),
    new CreateResidentialController(),
    new RegisterUserController(),
    new ValidateUserController(),
    new CreateLocationsController(),
    new ListLocationsController(),
    new CreateReserveLocationController(),
    tokenService
]
