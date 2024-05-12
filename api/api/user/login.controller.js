"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const constants_1 = require("../../utilities/constants");
const api_master_1 = require("../api.master");
class LoginController extends api_master_1.ApiMaster {
    constructor() {
        super(...arguments);
        this.METHOD = 'POST';
        this.PATH = '/api/user/login';
    }
    get(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(Object.assign({}, constants_1.RESPONSE_OBJECT[200]));
        });
    }
}
exports.LoginController = LoginController;
