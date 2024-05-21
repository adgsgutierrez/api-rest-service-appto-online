import { IQueryOptions } from "../../models/i.database";
import { ILoadReserva, IMeReserve } from "../../models/i.locations";
import { IResponse } from "../../models/i.response";
import { DATABASE , RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../api.master";

export class ListMeReserveController extends ApiMaster<IMeReserve>{

    readonly METHOD = 'GET';
    readonly PATH = '/api/location/list/me';

    async get(body: IMeReserve): Promise<IResponse> {
        const queries: IQueryOptions[] = [];
        queries.push({ key: 'idResidential', compare: '==', value: body.idResidential });
        queries.push({ key: 'user.email', compare: '==', value: body.email });
        const locationsReserve: ILoadReserva[] = await this.database.search( DATABASE.reserve , queries);
        return { ...RESPONSE_OBJECT[200] ,  data: locationsReserve };
    }
    
}