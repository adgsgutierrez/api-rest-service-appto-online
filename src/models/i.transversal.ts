export interface IFile {
    name: string;
    data: Buffer;
    size: number;
    encoding: string;
    tempFilePath: string;
    mimetype: string;
    md5: string;
    truncated: boolean;
    mv: unknown;
}