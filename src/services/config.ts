export class ConfigService {

    private static instance: ConfigService;

    private constructor(){}

    public static get(): ConfigService {
        if(!this.instance){
            this.instance = new ConfigService();
        }
        return this.instance;
    }

    public run(): {[ key: string] : string | number | never | undefined } | never {
       return process.env;
    }
}