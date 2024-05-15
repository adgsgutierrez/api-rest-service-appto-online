import { NoneParams } from "../../models/i.request";
import { IResponse } from "../../models/i.response";
import { ApiMaster } from "../api.master";

export class StatusController extends ApiMaster<NoneParams> {

    readonly METHOD = 'GET';
    readonly PATH = '/api/utilities/status';
    readonly SECURE = false;

/**
 * La función get devuelve una Promesa con una respuesta exitosa que contiene un código y un mensaje.
 * @param body - La función `get` toma un único parámetro `body`, que es un objeto con claves de tipo
 * cadena y valores de tipo cualquiera. Esta función devuelve una Promesa que se resuelve en un objeto
 * con propiedades `código` y `mensaje` de tipo número y cadena respectivamente.
 * @returns La función `get` devuelve una Promesa que se resuelve en un objeto con una propiedad `code`
 * establecida en 200 y una propiedad `message` establecida en 'Server Running'.
 */
    get(): Promise<IResponse> {
        return Promise.resolve({ code: 200 , message: 'Server Running'});
    }
}