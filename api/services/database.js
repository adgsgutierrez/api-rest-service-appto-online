"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const constants_1 = require("../utilities/constants");
class DatabaseService {
    /**
     * La función anterior es un constructor privado que inicializa una aplicación de Firebase y obtiene
     * una instancia de base de datos de Firestore.
     */
    constructor() {
        const app = (0, app_1.initializeApp)(constants_1.FIREBASE);
        this.database = (0, firestore_1.getFirestore)(app);
    }
    /**
     * La función `get` devuelve una instancia de `DatabaseService` y garantiza que solo se cree una
     * instancia.
     * @returns Se devuelve una instancia de la clase DatabaseService.
     */
    static get() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }
    /**
     * La función `getWithId` recupera un documento de tipo T de una colección especificada utilizando su
     * ID en un entorno TypeScript.
     * @param {string} nameCollection - El parámetro `nameCollection` representa el nombre de la colección
     * en la base de datos de la que desea recuperar un documento.
     * @param {string} id - El parámetro `id` en el método `getWithId` representa el identificador único
     * del documento que desea recuperar de la colección especificada en la base de datos.
     * @returns La función `getWithId` devuelve una Promesa que se resuelve en un objeto de tipo `T`, que
     * son los datos recuperados del documento con el `id` especificado en la colección `nameCollection`.
     */
    getWithId(nameCollection, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const docs = (0, firestore_1.doc)(this.database, nameCollection, id);
            const document = yield (0, firestore_1.getDoc)(docs);
            const data = document.data();
            return data;
        });
    }
    /**
     * La función getAll<T> recupera todos los documentos de una colección específica en una base de datos
     * y los devuelve como una matriz de tipo T.
     * @param {string} nameCollection - El parámetro `nameCollection` en el método `getAll` es una cadena
     * que representa el nombre de la colección de la que desea recuperar datos.
     * @returns Una matriz de objetos de tipo T, donde cada objeto contiene una propiedad 'id' que
     * representa la identificación del documento y otras propiedades basadas en los datos recuperados de
     * la base de datos.
     */
    getAll(nameCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            const collectionResult = (0, firestore_1.collection)(this.database, nameCollection);
            const data = yield (0, firestore_1.getDocs)(collectionResult);
            let values = [];
            data.forEach(doc => {
                const dat = doc.data();
                values.push(Object.assign({ id: doc.id }, dat));
            });
            return values;
        });
    }
    /**
     * La función `set` en TypeScript establece un documento en una colección específica con los datos
     * proporcionados.
     * @param {string} nameCollection - El parámetro `nameCollection` es una cadena que representa el
     * nombre de la colección en la base de datos donde desea configurar un nuevo documento con los datos
     * proporcionados.
     * @param {any} data - El parámetro `datos` en la función `set` representa la información o documento
     * que desea almacenar en la colección especificada. Puede ser cualquier tipo de datos que desee
     * guardar en la base de datos, como un objeto, cadena, número, matriz, etc. La función tomará esto
     * @returns La función `set` devuelve una Promesa que se resuelve en la respuesta al configurar un
     * documento en la colección especificada con los datos proporcionados.
     */
    set(nameCollection, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const collectionResult = (0, firestore_1.collection)(this.database, nameCollection);
            const response = yield (0, firestore_1.setDoc)((0, firestore_1.doc)(collectionResult), Object.assign({}, data));
            return response;
        });
    }
}
exports.DatabaseService = DatabaseService;
