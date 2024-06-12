import { ApiMaster } from "../../infraestructure/api.master";
import { IQueryOptions } from "../../models/i.database";
import { IParkingReserve } from "../../models/i.parking";
import { IResponse } from "../../models/i.response";
import { DATABASE , RESPONSE_OBJECT } from "../../utilities/constants";

export class CreateMeParkingController extends ApiMaster<IParkingReserve> {

    readonly METHOD = 'POST';
    readonly PATH = '/api/parking';

    async get(body: IParkingReserve): Promise<IResponse> {
        const queries: IQueryOptions[] = [];
        queries.push({ key: 'idResidential', compare: '==', value: body.idResidential as string });
        queries.push({ key: 'plate', compare: '==', value: body.plate });
        queries.push({ key: 'dateInitial', compare: '==', value: body.dateInitial });
        queries.push({ key: 'dateEnd', compare: '==', value: body.dateEnd });
        queries.push({ key: 'type', compare: '==', value: body.type });
        const parkingReserve: IParkingReserve[] = await this.database.search( DATABASE.parking , queries);
        if( parkingReserve.length > 0 ){
            return { ...RESPONSE_OBJECT[200] , data: { status: 100 , message : 'Ya existe una reserva para el usuario y la ubicación' } };
        }
        await this.database.set(DATABASE.parking , body);
        return { ...RESPONSE_OBJECT[200] , data: { status: 200 , message : 'Reserva guardada con éxito' } }
    }
}
