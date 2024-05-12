"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMaster = void 0;
const database_1 = require("../services/database");
const mail_1 = require("../services/mail");
class ApiMaster {
    constructor() {
        this.database = database_1.DatabaseService.get();
        this.mail = mail_1.MailService.get();
        this.SECURE = true;
    }
}
exports.ApiMaster = ApiMaster;
