import { IFile } from "./i.transversal";

export interface IRequestPay {
    email: string;
    date: Date;
    idResidentials: string;
    verify: boolean;
}

export interface IRequestFileData extends IRequestPay {
    voucher: IFile;
}

export interface IVoucher {
    idResidentials: string;
    email: string;
    date: Date;
    verify: boolean;
    url: string;
}