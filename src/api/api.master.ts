import { IResponse } from "../models/i.response";
import { DatabaseService } from "../services/database";
import { MailService } from "../services/mail";

export abstract class ApiMaster {
    abstract readonly METHOD: string;
    abstract readonly PATH: string;
    protected database = DatabaseService.get();
    protected mail = MailService.get();
    public SECURE = true;
    abstract get( body: {[key : string] : any}) : Promise<IResponse>;
}