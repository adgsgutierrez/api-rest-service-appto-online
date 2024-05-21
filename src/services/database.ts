import { Firestore, QueryFieldFilterConstraint, query, where } from "firebase/firestore";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { doc , setDoc, getDoc, collection, getFirestore, getDocs } from "firebase/firestore"
import { FIREBASE } from "../utilities/constants";
import { IQueryOptions } from "../models/i.database";

export class DatabaseService{

    private static instance: DatabaseService;
    private database: Firestore;

/**
 * La función anterior es un constructor privado que inicializa una aplicación de Firebase y obtiene
 * una instancia de base de datos de Firestore.
 */
    private constructor(){
        const _config = FIREBASE as FirebaseOptions;
        const app = initializeApp(_config);
        this.database = getFirestore(app);
    }

/**
 * La función `get` devuelve una instancia de `DatabaseService` y garantiza que solo se cree una
 * instancia.
 * @returns Se devuelve una instancia de la clase DatabaseService.
 */
    public static get(): DatabaseService {
        if(!DatabaseService.instance) {
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
    public async getWithId<T>( nameCollection: string, id: string): Promise<T>{
        const docs = doc(this.database, nameCollection , id);
        const document = await getDoc(docs);
        const data: T = document.data() as T;
        return data;
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
    public async getAll<T>( nameCollection: string ): Promise<T[]>{
        const collectionResult = collection(this.database, nameCollection);
        const data = await getDocs(collectionResult);
        const values:T[] = [];
        data.forEach( doc => {
            const dat: T = doc.data() as T;
            values.push({ id: doc.id, ...dat });
        });
        return values;
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
    public async set<T>( nameCollection: string , data:  T | unknown ): Promise<T>{
        const collectionResult = collection(this.database, nameCollection);
        const response = await setDoc( doc(collectionResult) , data ) as T;
        return response;
    }

/**
 * Esta función de TypeScript establece un documento con una ID específica en una colección específica
 * y devuelve la respuesta.
 * @param {string} nameCollection - El parámetro `nameCollection` es una cadena que representa el
 * nombre de la colección en la base de datos donde se almacenarán los datos.
 * @param {string} id - El parámetro `id` en la función `setWithId` representa el identificador único o
 * clave que se utilizará para identificar y almacenar los datos en la colección especificada.
 * Normalmente es un valor de cadena que identifica de forma única el documento dentro de la colección.
 * @param {T | unknown} data - El parámetro `datos` en la función `setWithId` representa la información
 * u objeto que desea almacenar en la base de datos con una ID específica. Puede ser de tipo `T` (el
 * tipo genérico especificado al llamar a la función) o `desconocido` si el tipo no se conoce en
 * @returns La función `setWithId` devuelve una Promesa que se resuelve en un valor de tipo `T`.
 */
    public async setWithId<T>( nameCollection: string , id: string, data: T | unknown ): Promise<T>{
        const collectionResult = collection(this.database, nameCollection);
        const response =  await setDoc( doc(collectionResult , id) , data ) as T;
        return response;
    }

/**
 * Esta función de TypeScript realiza una operación de búsqueda en una colección específica utilizando
 * opciones de consulta y devuelve los resultados como una matriz.
 * @param {string} nameCollection - El parámetro `nameCollection` en el método `search` representa el
 * nombre de la colección en la base de datos en la que desea buscar. Es una cadena que especifica la
 * colección donde se realizará la operación de búsqueda.
 * @param {IQueryOptions[]} params - El parámetro `params` en el método `search` es una matriz de
 * objetos que implementan la interfaz `IQueryOptions`. Cada objeto de la matriz contiene las
 * siguientes propiedades:
 * @returns La función `buscar` devuelve una matriz de objetos de tipo `T`.
 */
    public async search<T>( nameCollection: string , params: IQueryOptions[]): Promise<T[]>{
        const arrayQueries: QueryFieldFilterConstraint[] = [];
        params.forEach( param => {
            arrayQueries.push ( where(param.key , param.compare , param.value ) );
        });
        const collectionResult = collection(this.database, nameCollection);
        const _query = query( collectionResult , ...arrayQueries);
        const response = await getDocs(_query);
        const values:T[] = [];
        response.forEach( doc => {
            const dat: T = doc.data() as T;
            values.push({ id: doc.id, ...dat });
        });
        return values;
    }
}