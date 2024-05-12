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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const constants_1 = require("../../utilities/constants");
const api_master_1 = require("../api.master");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenController extends api_master_1.ApiMaster {
    constructor() {
        super(...arguments);
        this.METHOD = 'POST';
        this.PATH = '/api/utilities/token';
        this.SECURE = false;
    }
    /**
     * Esta función de TypeScript es un método asincrónico que maneja la autenticación comparando el
     * cliente y los valores secretos del cliente con los almacenados en una base de datos, generando un
     * token JWT si la comparación es exitosa.
     * @param body - El método `get` que proporcionaste es una función asincrónica que toma un parámetro
     * `body` de tipo `{ [key: string]: any; }` y devuelve una `Promesa` de tipo `IResponse`.
     * @returns El método `get` devuelve una Promesa que se resuelve en un objeto `IResponse`. Dependiendo
     * de las condiciones que se cumplan en el bloque try, devolverá diferentes respuestas:
     */
    get(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = body;
                let client = yield this.database.getWithId(constants_1.DATABASE.userAuth, input.serial);
                const _cClient = yield bcrypt_1.default.compare(input.client, client.client);
                const _cSecret = yield bcrypt_1.default.compare(input.client_secret, client.client_secret);
                if (_cSecret && _cClient) {
                    const _payload = Buffer.from(JSON.stringify(input)).toString('base64');
                    const token = jsonwebtoken_1.default.sign({ uuid: _payload }, constants_1.KEYS.auth.secret, { expiresIn: constants_1.KEYS.auth.expire, encoding: 'utf8', algorithm: "HS512" });
                    return Promise.resolve(Object.assign(Object.assign({}, constants_1.RESPONSE_OBJECT[200]), { data: { type: 'Bearer', token, expire: constants_1.KEYS.auth.expire } }));
                }
                return Promise.resolve(Object.assign({}, constants_1.RESPONSE_OBJECT[401]));
            }
            catch (_err) {
                return Promise.resolve(Object.assign(Object.assign({}, constants_1.RESPONSE_OBJECT[500]), { data: _err }));
            }
        });
    }
    /**
     * La función "validar" en TypeScript se utiliza para verificar y validar un token para la
     * autenticación.
     * @param {string} [token] - El parámetro `token` es una cadena que debe contener un token JWT con el
     * prefijo 'Bearer'. Esta función valida el token decodificandolo, verificando su autenticidad y
     * comparándolo con la información del cliente almacenada en la base de datos. Si el token es válido y
     * coincide con los detalles del cliente, la función devuelve "verdadero".
     * @returns La función `validar` devuelve una Promesa que se resuelve en un valor booleano. La función
     * primero verifica si el token comienza con 'Portador'. Si no es así, devuelve falso inmediatamente.
     */
    validate(token = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (token.indexOf('Bearer ') === -1) {
                return false;
            }
            try {
                const _token = token.replace('Bearer ', '');
                const _payload = jsonwebtoken_1.default.verify(_token, constants_1.KEYS.auth.secret);
                const _strClient = Buffer.from(_payload.uuid, 'base64').toString('ascii');
                const _vefiryToken = JSON.parse(_strClient);
                let client = yield this.database.getWithId(constants_1.DATABASE.userAuth, _vefiryToken.serial);
                const _cClient = yield bcrypt_1.default.compare(_vefiryToken.client, client.client);
                const _cSecret = yield bcrypt_1.default.compare(_vefiryToken.client_secret, client.client_secret);
                return (_cSecret && _cClient);
            }
            catch (_err) {
                console.error(_err);
            }
            return false;
        });
    }
}
exports.TokenController = TokenController;
