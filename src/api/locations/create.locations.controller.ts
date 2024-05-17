import { IRequestCreateLocations, IResidentialLocation } from "../../models/i.locations";
import { IResponse } from "../../models/i.response";
import { DATABASE, RESPONSE_OBJECT } from "../../utilities/constants";
import { ApiMaster } from "../api.master";

export class CreateLocationsController extends ApiMaster<IRequestCreateLocations> {

    readonly METHOD = 'POST';
    readonly PATH = '/api/location';

    async get(_body: IRequestCreateLocations): Promise<IResponse> {
        const response = await this.database.getWithId<IResidentialLocation>( DATABASE.residential, _body.idResidential);
        if( !response.hasOwnProperty('location')){
            response['location'] = [];
        }
        response.location.push(_body.location);
        await this.database.setWithId(DATABASE.residential , _body.idResidential , response );
        return { ...RESPONSE_OBJECT[200] ,  data: response.location };
    }

    
}