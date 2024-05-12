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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const constants_1 = require("../utilities/constants");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const readFile = (0, util_1.promisify)(fs_1.default.readFile);
const OAuth2 = googleapis_1.google.auth.OAuth2;
class MailService {
    /**
     * El fragmento de código TypeScript anterior muestra un constructor privado que inicializa una
     * configuración de MailService obteniendo la ruta de forma asincrónica.
     */
    constructor() {
        let _this = this;
        MailService.path().then(response => {
            _this.config = response;
        }, err => {
            throw new Error(Object.assign({ msg: "Error into conect to mailer service" }, err));
        });
    }
    /**
     * La función `get` devuelve una instancia de la clase `MailService`, creando una nueva instancia si
     * aún no existe una.
     * @returns Se devuelve una instancia de la clase MailService.
     */
    static get() {
        if (!MailService.instance) {
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
    static getTemplate(templateName, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const route = path_1.default.join(__dirname, '../', 'templates', templateName);
            let amp = yield readFile(path_1.default.join(route, 'amp.html'), 'utf8');
            let html = yield readFile(path_1.default.join(route, 'basic.html'), 'utf8');
            let basic = yield readFile(path_1.default.join(route, 'basic.txt'), 'utf8');
            let templateAmp = handlebars_1.default.compile(amp);
            let templateHtml = handlebars_1.default.compile(html);
            let templateBasic = handlebars_1.default.compile(basic);
            return {
                text: templateBasic(body),
                html: templateHtml(body),
                amp: templateAmp(body)
            };
        });
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
    sendMail(destiny, subject, templateName, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const templates = yield MailService.getTemplate(templateName, body);
            const mailOptions = Object.assign({ from: constants_1.KEYS.email.email, to: destiny, subject: subject }, templates);
            return new Promise((success, reject) => {
                this.config.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        success(info);
                    }
                });
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
    static path() {
        return __awaiter(this, void 0, void 0, function* () {
            const oauth2Client = new OAuth2(constants_1.KEYS.email.user, constants_1.KEYS.email.pwd, constants_1.KEYS.email.redirect);
            oauth2Client.setCredentials({
                refresh_token: constants_1.KEYS.email.refresh,
            });
            const accessToken = (yield new Promise((resolve, reject) => {
                oauth2Client.getAccessToken((err, token) => {
                    if (err) {
                        console.log("*ERR: ", err);
                        reject();
                    }
                    resolve(token);
                });
            })) || '';
            let _configMailer = {
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: constants_1.KEYS.email.email,
                    accessToken,
                    clientId: constants_1.KEYS.email.user,
                    clientSecret: constants_1.KEYS.email.pwd,
                    refreshToken: constants_1.KEYS.email.refresh,
                }
            };
            return nodemailer_1.default.createTransport(_configMailer);
        });
    }
}
exports.MailService = MailService;
