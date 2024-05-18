import { IRequestLocations, IResidentialLocation } from "../../models/i.locations";
import { IResponse } from "../../models/i.response";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../api.master";

export class ListLocationsController extends ApiMaster<IRequestLocations> {

    readonly METHOD = 'GET';
    readonly PATH = '/api/location/list';

    async get(_body: IRequestLocations): Promise<IResponse> {
        const response = await this.database.getWithId<IResidentialLocation>( DATABASE.residential, _body.idResidential);
        return { ...RESPONSE_OBJECT[200] ,  data: (response.location || [] ).filter( loc => loc.active ) };
    }
    
}