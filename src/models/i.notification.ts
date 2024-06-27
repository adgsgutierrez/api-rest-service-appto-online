import { IFile } from "./i.transversal";

export interface INotification {
    name: string;
    active: boolean;
    idResidential: string;
    url: string;
    dateUpload: Date;
    file: IFile;
}