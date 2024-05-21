import { IQueryOptions } from "../../models/i.database";
import { ILoadReserva, IMeReserve } from "../../models/i.locations";
import { IResponse } from "../../models/i.response";
import { DATABASE , RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../../infraestructure/api.master";

export class ListMeReserveController extends ApiMaster<IMeReserve>{

    readonly METHOD = 'GET';
    readonly PATH = '/api/location/list/me';

/**
 * Esta función de TypeScript recupera datos de reserva según criterios específicos y los devuelve en
 * un objeto de respuesta.
 * @param {IMeReserve} body - La función `get` toma un parámetro `body` de tipo `IMeReserve`. Este
 * parámetro se utiliza para filtrar los resultados de la búsqueda por las propiedades `idResidential`
 * y `email`. Luego, la función construye una serie de opciones de consulta basadas en estos filtros y
 * las utiliza para buscar en la base de datos.
 * @returns El método `get` devuelve una Promesa que se resuelve en un objeto de tipo `IResponse`. Este
 * objeto incluye un código de estado de 200 de `RESPONSE_OBJECT` y una propiedad `data` que contiene
 * una matriz de objetos `ILoadReserva` recuperados de la base de datos en función de las consultas
 * especificadas.
 */
    async get(body: IMeReserve): Promise<IResponse> {
        const queries: IQueryOptions[] = [];
        queries.push({ key: 'idResidential', compare: '==', value: body.idResidential });
        queries.push({ key: 'user.email', compare: '==', value: body.email });
        const locationsReserve: ILoadReserva[] = await this.database.search( DATABASE.reserve , queries);
        return { ...RESPONSE_OBJECT[200] ,  data: locationsReserve };
    }

}