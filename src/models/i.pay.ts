export interface IRequestPay {
    email: string;
    date: Date;
    idResidentials: string;
    verify: boolean;
}

export interface IRequestFileData extends IRequestPay {
    voucher: {
        name: string;
        data: Buffer;
        size: number;
        encoding: string;
        tempFilePath: string;
        mimetype: string;
        md5: string;
        truncated: boolean;
        mv: unknown;
    };
}