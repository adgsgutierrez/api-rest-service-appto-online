"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIS = exports.token = void 0;
const create_residential_controller_1 = require("./booking/create.residential.controller");
const list_residential_controller_1 = require("./booking/list.residential.controller");
const login_controller_1 = require("./user/login.controller");
const register_controller_1 = require("./user/register.controller");
const status_controller_1 = require("./utilities/status.controller");
const token_controller_1 = require("./utilities/token.controller");
const tokenService = new token_controller_1.TokenController();
exports.token = tokenService;
exports.APIS = [
    new login_controller_1.LoginController(),
    new status_controller_1.StatusController(),
    new list_residential_controller_1.ListResidentialController(),
    new create_residential_controller_1.CreateResidentialController(),
    new register_controller_1.RegisterUserController(),
    tokenService
];
