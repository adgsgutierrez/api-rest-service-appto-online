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
exports.RegisterUserController = void 0;
const constants_1 = require("../../utilities/constants");
const api_master_1 = require("../api.master");
class RegisterUserController extends api_master_1.ApiMaster {
    constructor() {
        super(...arguments);
        this.METHOD = 'POST';
        this.PATH = '/api/user/register';
    }
    /**
     * Esta función de TypeScript registra de forma asincrónica a un usuario, guarda su información en una
     * base de datos, envía un correo electrónico de activación y devuelve un objeto de respuesta.
     * @param _body - Se espera que el parámetro `_body` en la función `get` sea un objeto con pares
     * clave-valor que representen datos de registro del usuario. Luego, estos datos se utilizan para crear
     * un nuevo objeto de usuario `_user` con propiedades adicionales como `validateEmail`, `validatePhone`
     * y `tokenActivate`. El `_usuario
     * @returns El método `get` devuelve una Promesa que se resuelve en un objeto con un código de estado y
     * datos. Si la operación es exitosa, devuelve un código de estado de 200 junto con los datos del
     * usuario cargados en la base de datos y la respuesta del envío de un correo electrónico de
     * activación. Si hay un error, devuelve un código de estado de 500 junto con los datos del error.
     */
    get(_body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = _body;
                const _user = Object.assign(Object.assign({}, input), { validateEmail: false, validatePhone: false, tokenActivate: '' });
                const resp = yield this.database.set(constants_1.DATABASE.usersTower, _user);
                const destiny = `${_user.name} <${_user.email}>`;
                const responseSendMail = yield this.mail.sendMail(destiny, 'Activación de Cuenta', 'register', { token: 'Aqui va el token' });
                return Object.assign(Object.assign({}, constants_1.RESPONSE_OBJECT[200]), { data: { userload: resp, mail: responseSendMail.accepted } });
            }
            catch (_err) {
                return Promise.resolve(Object.assign(Object.assign({}, constants_1.RESPONSE_OBJECT[500]), { data: _err }));
            }
        });
    }
}
exports.RegisterUserController = RegisterUserController;
