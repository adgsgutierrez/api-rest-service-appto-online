"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusController = void 0;
const api_master_1 = require("../api.master");
class StatusController extends api_master_1.ApiMaster {
    constructor() {
        super(...arguments);
        this.METHOD = 'GET';
        this.PATH = '/api/utilities/status';
        this.SECURE = false;
    }
    /**
     * La función get devuelve una Promesa con una respuesta exitosa que contiene un código y un mensaje.
     * @param body - La función `get` toma un único parámetro `body`, que es un objeto con claves de tipo
     * cadena y valores de tipo cualquiera. Esta función devuelve una Promesa que se resuelve en un objeto
     * con propiedades `código` y `mensaje` de tipo número y cadena respectivamente.
     * @returns La función `get` devuelve una Promesa que se resuelve en un objeto con una propiedad `code`
     * establecida en 200 y una propiedad `message` establecida en 'Server Running'.
     */
    get(_body) {
        return Promise.resolve({ code: 200, message: 'Server Running' });
    }
}
exports.StatusController = StatusController;
