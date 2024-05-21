export const BASE64 = {
    /* La función `decode` en el objeto `BASE64` toma una cadena `s` codificada en base64 como entrada
    y la convierte en un objeto Buffer usando el método `Buffer.from` de Node.js con la codificación
    'base64' especificada. Básicamente, esto decodifica la cadena base64 a su representación de
    datos binarios original. */
    decode: (s: string) => Buffer.from(s, 'base64'),
    /* La función `encode` en el objeto `BASE64` toma una cadena `b` como entrada, la convierte en un
    objeto Buffer usando `Buffer.from(b)` y luego convierte ese objeto Buffer en una cadena
    codificada en base64 usando ` Método toString('base64')`. Básicamente, esta función codifica la
    cadena de entrada `b` en su representación base64. */
    encode: (b: string) => Buffer.from(b).toString('base64')
};