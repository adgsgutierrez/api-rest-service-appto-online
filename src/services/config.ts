export class ConfigService {

    private static instance: ConfigService;

/**
 * La función anterior es un constructor privado en TypeScript.
 */
    private constructor(){}

/**
 * La función `get` en la clase `ConfigService` devuelve una instancia de `ConfigService` si aún no
 * existe.
 * @returns Se devuelve una instancia de la clase `ConfigService`.
 */
    public static get(): ConfigService {
        if(!this.instance){
            this.instance = new ConfigService();
        }
        return this.instance;
    }

/**
 * La función devuelve las variables de entorno como un objeto con claves como cadenas y valores como
 * cadenas, números, nunca o indefinidos.
 * @returns Se está devolviendo el objeto `process.env`.
 */
    public run(): {[ key: string] : string | number | never | undefined } | never {
       return process.env;
    }
}