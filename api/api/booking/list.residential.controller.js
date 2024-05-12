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
exports.ListResidentialController = void 0;
const constants_1 = require("../../utilities/constants");
const api_master_1 = require("../api.master");
class ListResidentialController extends api_master_1.ApiMaster {
    constructor() {
        super(...arguments);
        this.METHOD = 'GET';
        this.PATH = '/api/residential/list';
    }
    /**
     * Esta función de TypeScript recupera de forma asincrónica una lista de datos residenciales de una
     * base de datos y la devuelve en un formato específico.
     * @param _body - El parámetro `_body` en la función `get` es un objeto que contiene pares clave-valor.
     * Se utiliza como parámetro para la función y se espera que sea del tipo `{ [clave: cadena]:
     * cualquiera; }`, lo que significa que puede tener claves de tipo cadena y valores de cualquier tipo.
     * @returns El método `get` devuelve una Promesa que se resuelve en un objeto con un código de estado y
     * datos. Si la operación de la base de datos tiene éxito, devuelve un código de estado 200 junto con
     * una lista de artículos residenciales con su identificación, nombre y dirección. Si hay un error
     * durante la operación de la base de datos, devuelve un código de estado 500 junto con el objeto de
     * error.
     */
    get(_body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield this.database.getAll(constants_1.DATABASE.residential);
                return Object.assign(Object.assign({}, constants_1.RESPONSE_OBJECT[200]), { data: list.map(item => {
                        return { id: item.id, name: item.name, address: item.address };
                    }) });
            }
            catch (_err) {
                return Promise.resolve(Object.assign(Object.assign({}, constants_1.RESPONSE_OBJECT[500]), { data: _err }));
            }
        });
    }
}
exports.ListResidentialController = ListResidentialController;
