export const BASE64 = {
    decode: (s: string) => Buffer.from(s, 'base64'),
    encode: (b: string) => Buffer.from(b).toString('base64')
};