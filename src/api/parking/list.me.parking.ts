import { ApiMaster } from "../../infraestructure/api.master";
import { IMeReserve } from "../../models/i.locations";
import { DATABASE , RESPONSE_OBJECT } from "../../utilities/constants";
import { IResponse } from "../../models/i.response";
import { IQueryOptions } from "../../models/i.database";
import { IParkingReserve } from "../../models/i.parking";

export class ListMeParking extends ApiMaster<IMeReserve>{
    
    public readonly METHOD = 'GET';
    public readonly PATH = '/api/parking/list/me';

    async get(body: IMeReserve): Promise<IResponse> {
        const queries: IQueryOptions[] = [];
        queries.push({ key: 'idResidential', compare: '==', value: body.idResidential });
        queries.push({ key: 'user.email', compare: '==', value: body.email });
        const locationsReserve: IParkingReserve[] = await this.database.search( DATABASE.parking , queries);
        return { ...RESPONSE_OBJECT[200] ,  data: locationsReserve };
    }
    
}