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


/**
 * La función `start` lee todos los archivos en un directorio específico, filtra las extensiones de
 * archivos que no coinciden, carga módulos usando `require`, extrae funciones exportadas y devuelve
 * instancias de esas funciones.
 * @returns Una matriz de instancias de clases que se exportan desde los archivos en el directorio
 * especificado.
 */
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public start(): any[] {
        const classPath = this._path.join(__dirname, "./../api");
        const classFiles = this.readAllFiles(classPath);
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

/**
 * La función lee recursivamente todos los archivos en un directorio determinado y sus subdirectorios.
 * @param {string} path - El parámetro `path` es una cadena que representa la ruta del directorio desde
 * el cual desea leer todos los archivos de forma recursiva.
 * @param {string[]} arrayOfFiles - El parámetro `arrayOfFiles` es una matriz que almacena las rutas de
 * todos los archivos encontrados en el directorio especificado por el parámetro `path`. La función lee
 * recursivamente todos los archivos del directorio y sus subdirectorios y agrega sus rutas a esta
 * matriz.
 * @returns La función `readAllFiles` devuelve una matriz de cadenas que contienen las rutas de todos
 * los archivos dentro del directorio especificado y sus subdirectorios.
 */
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
