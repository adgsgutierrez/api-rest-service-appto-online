import { NoneParams } from "../../models/i.request";
import { IResidentials } from "../../models/i.residential";
import { IResponse } from "../../models/i.response";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../../infraestructure/api.master";

export class ListResidentialController extends ApiMaster<NoneParams> {

    readonly METHOD = 'GET';
    readonly PATH = '/api/residential/list';

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
    async get(): Promise<IResponse> {
        try{
            const list: IResidentials[] = await this.database.getAll( DATABASE.residential );
            return { ...RESPONSE_OBJECT[200] , data: list.map( item => {
                    return {id: item.id , name: item.name , address: item.address };
                })
            }
        } catch ( _err ) {
            return Promise.resolve({ ...RESPONSE_OBJECT[500] , data: _err });
        }
    }
}