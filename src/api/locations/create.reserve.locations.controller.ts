import { IQueryOptions } from "../../models/i.database";
import { ILoadReserva, IReserveRequest } from "../../models/i.locations";
import { IResponse } from "../../models/i.response";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../../infraestructure/api.master";

export class CreateReserveLocationController extends ApiMaster<IReserveRequest>{

    readonly METHOD = 'POST';
    readonly PATH = '/api/location/reserve';

/**
 * Esta función de TypeScript comprueba si ya existe una reserva para un usuario y una ubicación y, en
 * caso contrario, guarda la reserva en una base de datos.
 * @param {IReserveRequest} body - El método `get` en el fragmento de código es una función asincrónica
 * que toma un parámetro `body` de tipo `IReserveRequest` y devuelve una `Promise` de tipo `IResponse`.
 * @returns El método `get` devuelve una Promesa que se resuelve en un objeto `IResponse`. El contenido
 * del objeto `IResponse` depende de las condiciones que se cumplan en el método:
 */
    async get(body: IReserveRequest): Promise<IResponse> {
        const load: ILoadReserva = body as ILoadReserva;
        const queries: IQueryOptions[] = [];
        queries.push({ key: 'idResidential', compare: '==', value: load.idResidential });
        const locationsReserve: ILoadReserva[] = await this.database.search( DATABASE.reserve , queries);
        let ifExist = false;
        locationsReserve.forEach( reserve => {
            if( 
                (reserve.location.name === load.location.name) &&
                (reserve.location.start === load.location.start) &&
                (reserve.user.email === load.user.email)
             ){
                ifExist = true;
                return;
            }
        });
        if(ifExist){
            return { ...RESPONSE_OBJECT[200] , data: { status: 100 , message : 'Ya existe una reserva para el usuario y la ubicación' } }
        }
        load.aprobe = false;
        load.userAprobe = '';
        await this.database.set(DATABASE.reserve , load);
        return { ...RESPONSE_OBJECT[200] , data: { status: 200 , message : 'Reserva guardada con éxito' } }
    }

}