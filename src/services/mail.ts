import nodemailer, { Transporter } from "nodemailer";
import { google } from "googleapis";
import { KEYS } from "../utilities/constants";
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import handlebars from "handlebars";

const readFile = promisify(fs.readFile);
const OAuth2 = google.auth.OAuth2;

export class MailService {

    private static instance: MailService;
    private config!: Transporter;

/**
 * El fragmento de código TypeScript anterior muestra un constructor privado que inicializa una
 * configuración de MailService obteniendo la ruta de forma asincrónica.
 */
    private constructor(){
        let _this = this;
        MailService.path().then( response => {
            _this.config = response;
        }, err => {
            throw new Error({ msg: "Error into conect to mailer service", ...err});
        });
    }

/**
 * La función `get` devuelve una instancia de la clase `MailService`, creando una nueva instancia si
 * aún no existe una.
 * @returns Se devuelve una instancia de la clase MailService.
 */
    public static get(): MailService {
        if(!MailService.instance){
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }

/**
 * La función `getTemplate` lee archivos de plantilla, los compila usando Manillar y devuelve las
 * versiones de texto compilado, HTML y AMP.
 * @param {string} templateName - El parámetro `templateName` es una cadena que representa el nombre
 * del archivo de plantilla que desea recuperar. En el fragmento de código proporcionado, la función
 * `getTemplate` lee tres archivos de plantilla diferentes según el `templateName` proporcionado:
 * 'amp.html', 'basic.html' y 'basic.txt
 * @param {any} body - El parámetro `body` en la función `getTemplate` es un objeto que contiene datos
 * que se utilizarán en las plantillas. Podría incluir información como detalles del usuario, contenido
 * o cualquier otro dato que deba insertarse dinámicamente en las plantillas. Estos datos se pasarán a
 * las plantillas de manillares.
 * @returns La función `getTemplate` devuelve un objeto con tres propiedades: `text`, `html` y `amp`.
 * Cada propiedad contiene un valor de cadena que es el resultado de compilar una plantilla usando
 * Manillar con los datos del "cuerpo" proporcionados.
 */
    private static async getTemplate( templateName: string , body: any ): Promise<{text: string;html: string;amp: string;}>{
        const route = path.join(__dirname , '../' , 'templates' , templateName);
        let amp = await readFile( path.join( route, 'amp.html' ), 'utf8');
        let html = await readFile( path.join( route, 'basic.html' ), 'utf8');
        let basic = await readFile( path.join( route, 'basic.txt' ), 'utf8');
        let templateAmp = handlebars.compile(amp);
        let templateHtml = handlebars.compile(html);
        let templateBasic = handlebars.compile(basic);
        return { 
            text: templateBasic(body),
            html: templateHtml(body),
            amp: templateAmp(body)
        }
    }

/**
 * La función `sendMail` en TypeScript envía un correo electrónico utilizando una plantilla específica
 * y devuelve una Promesa.
 * @param {string} destiny - El parámetro `destiny` en la función `sendMail` representa la dirección de
 * correo electrónico a la que se enviará el correo electrónico. Es la dirección de correo electrónico
 * del destinatario.
 * @param {string} subject - El parámetro `subject` en la función `sendMail` representa la línea de
 * asunto del correo electrónico que se enviará. Es una cadena que debe describir brevemente el
 * propósito o contenido del correo electrónico.
 * @param {string} templateName - El parámetro `templateName` en la función `sendMail` se usa para
 * especificar el nombre de la plantilla de correo electrónico que se usará para generar el contenido
 * del correo electrónico. Este nombre de plantilla se pasa al método `MailService.getTemplate` para
 * recuperar el contenido de la plantilla apropiado según el nombre proporcionado.
 * @param {any} body - El parámetro `body` en la función `sendMail` generalmente se usa para pasar el
 * contenido o mensaje del correo electrónico que desea enviar. Esto puede incluir el texto del correo
 * electrónico, cualquier contenido HTML o cualquier otro dato que deba incluirse en el cuerpo del
 * correo electrónico. Podría ser
 * @returns La función `sendMail` devuelve una Promesa que se resuelve con el objeto de información
 * `info` si el correo electrónico se envía exitosamente, o rechaza con un error si hubo un problema al
 * enviar el correo electrónico.
 */
    public async sendMail( destiny: string, subject: string, templateName: string ,  body: any ) : Promise<any> {
        const templates = await MailService.getTemplate( templateName , body);
        const mailOptions = {
            from: KEYS.email.email,
            to: destiny,
            subject: subject,
           ...templates
        };
        return new Promise( (success , reject) => {
            this.config.sendMail(mailOptions , (error, info: any) => {
                if (error) { reject(error); } else { success(info); }
            });
        });
    }

/**
 * La función "ruta" configura la autenticación OAuth2 para enviar correos electrónicos utilizando
 * Nodemailer con el servicio Gmail.
 * @returns La función `path` devuelve un objeto de transporte nodemailer creado con la configuración
 * especificada en el objeto `_configMailer`. Este objeto de transporte se puede utilizar para enviar
 * correos electrónicos utilizando el servicio Gmail con autenticación OAuth2.
 */
    private static async path() {
        const oauth2Client = new OAuth2(
            KEYS.email.user,
            KEYS.email.pwd,
            KEYS.email.redirect
        );
        oauth2Client.setCredentials({
            refresh_token: KEYS.email.refresh,
        });
        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
              if (err) {
                console.log("*ERR: ", err)
                reject();
              }
              resolve(token); 
            });
        }) || '';
        let _configMailer: any = {
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: KEYS.email.email,
                accessToken,
                clientId:  KEYS.email.user,
                clientSecret: KEYS.email.pwd,
                refreshToken: KEYS.email.refresh,
            }
        };
        return nodemailer.createTransport(_configMailer);
    }
}