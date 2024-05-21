import * as fs from "fs";
import * as path from "path";

/* La clase Builder lee archivos JavaScript en un directorio específico, importa clases de cada archivo
y crea instancias de cada clase. */
export class Builder {

    private static instance: Builder;
    private static readonly extensions: string[] = [".js", ".ts"];
    private _path = path; // NOSONAR
    private _fs = fs; // NOSONAR
    /**
     * El fragmento de código anterior define un constructor privado en TypeScript.
     */
    private constructor() {}
    /**
     * La función devuelve una instancia de la clase Builder y crea una si aún no existe.
     * @returns El método devuelve una instancia de la clase Builder.
     */
    public static get(): Builder {
        if (!Builder.instance) {
        Builder.instance = new Builder();
        }
        return Builder.instance;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public start(): any[] {
        const classPath = this._path.join(__dirname, "./../api");
        console.log(classPath);
        const classFiles = this.readAllFiles(classPath);
        console.log(classFiles);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const arrayClasses: any[] = [];
        for (const fileName of classFiles) {
        const extensionFile = this._path.extname(fileName);
        if (!extensionFile || !Builder.extensions.includes(extensionFile)) {
            continue;
        }
        // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
        const moduleFile: any = require(fileName);
        const exportedFunctions = Object.keys(moduleFile)
            .map((key) => moduleFile[key])
            .filter((value) => typeof value === "function");
        arrayClasses.push(...exportedFunctions);
        }
        return arrayClasses.map((especificClass) => new especificClass());
    }

    private readAllFiles(path: string, arrayOfFiles: string[] = []): string[]{
        const files = this._fs.readdirSync(path);
        files.forEach((file) => {
        const stat = this._fs.statSync(`${path}/${file}`);
        if (stat.isDirectory()) {
            this.readAllFiles(`${path}/${file}`, arrayOfFiles);
        } else {
            arrayOfFiles.push(`${path}/${file}`);
        }
        });
        return arrayOfFiles;
    }
}
