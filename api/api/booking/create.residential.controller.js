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
exports.CreateResidentialController = void 0;
const constants_1 = require("../../utilities/constants");
const api_master_1 = require("../api.master");
class CreateResidentialController extends api_master_1.ApiMaster {
    constructor() {
        super(...arguments);
        this.METHOD = 'POST';
        this.PATH = '/api/residential';
    }
    /**
     * Esta función de TypeScript guarda de forma asincrónica datos residenciales en una base de datos y
     * devuelve un objeto de respuesta.
     * @param _body - El parámetro `_body` en la función `get` es un objeto que contiene pares clave-valor
     * donde las claves son cadenas y los valores pueden ser de cualquier tipo.
     * @returns El método `get` devuelve una Promesa que se resuelve en un objeto de tipo `IResponse`. El
     * objeto que se devuelve contiene un código de estado y datos. Si la operación tiene éxito, devuelve
     * un código de estado de 200 junto con los datos de respuesta. Si hay un error, devuelve un código de
     * estado de 500 junto con los datos del error.
     */
    get(_body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = _body;
                const resp = yield this.database.set(constants_1.DATABASE.residential, input);
                return Object.assign(Object.assign({}, constants_1.RESPONSE_OBJECT[200]), { data: resp });
            }
            catch (_err) {
                return Promise.resolve(Object.assign(Object.assign({}, constants_1.RESPONSE_OBJECT[500]), { data: _err }));
            }
        });
    }
}
exports.CreateResidentialController = CreateResidentialController;
