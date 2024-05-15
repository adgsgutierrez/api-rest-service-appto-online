import { IResponse } from "../models/i.response";
import { DatabaseService } from "../services/database";
import { MailService } from "../services/mail";

export abstract class ApiMaster<T> {
    abstract readonly METHOD: string;
    abstract readonly PATH: string;
    protected database = DatabaseService.get();
    protected mail = MailService.get();
    public SECURE = true;
    abstract get( body: T) : Promise<IResponse>;
}