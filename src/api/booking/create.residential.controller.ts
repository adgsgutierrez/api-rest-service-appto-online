import { IResidential } from "../../models/i.residential";
import { IResponse } from "../../models/i.response";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../api.master";

export class CreateResidentialController extends ApiMaster {

    readonly METHOD = 'POST';
    readonly PATH = '/api/residential';

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
    async get(_body: { [key: string]: any; }): Promise<IResponse> {
        try{
            const input: IResidential = _body as IResidential;
            const resp = await this.database.set( DATABASE.residential , input );
            return { ...RESPONSE_OBJECT[200] , data: resp }
        } catch ( _err ) {
            return Promise.resolve({ ...RESPONSE_OBJECT[500] , data: _err });
        }
    }
}
