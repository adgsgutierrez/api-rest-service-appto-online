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
const controllers_1 = require("./api/controllers");
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./utilities/constants");
require('dotenv').config();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)({ origin: '*', methods: ['GET', 'POST', 'PUT'] }));
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const api = controllers_1.APIS.find(api => api.PATH === req.path);
    if (api === null || api === void 0 ? void 0 : api.SECURE) {
        const header = req.headers;
        if (header.hasOwnProperty('authorization') && (yield controllers_1.token.validate(header.authorization))) {
            next();
        }
        else {
            res.status(401).json(Object.assign({}, constants_1.RESPONSE_OBJECT[401]));
        }
    }
    else {
        next();
    }
}));
const processRequest = (req, res, controller) => __awaiter(void 0, void 0, void 0, function* () {
    let params = Object.assign(Object.assign(Object.assign({}, req.query), req.body), req.params);
    const response = yield controller.get(params);
    res.status(response.code).json(response);
});
controllers_1.APIS.forEach(controller => {
    switch (controller.METHOD) {
        case 'GET':
            app.get(controller.PATH, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                yield processRequest(req, res, controller);
            }));
            break;
        case 'POST':
            app.post(controller.PATH, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                yield processRequest(req, res, controller);
            }));
            break;
        default:
            break;
    }
});
app.listen(3000, () => {
    const endpoints = (0, express_list_endpoints_1.default)(app);
    endpoints.forEach((element) => {
        console.log(`${element.methods.join('|')} : ${element.path}`);
    });
});
module.exports = app;
