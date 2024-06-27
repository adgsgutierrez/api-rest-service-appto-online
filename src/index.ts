// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { Request, Response } from "express";
import { APIS, token } from "./infraestructure/controllers";
import { ApiMaster } from "./infraestructure/api.master";
import expressListEndpoints from 'express-list-endpoints';
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import { RESPONSE_OBJECT } from "./utilities/constants";
import { NoneParams } from "./models/i.request";
import fileUpload from 'express-fileupload';

app.use(bodyParser.json())
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(cors( { origin: '*', methods: ['GET','POST','PUT'] }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use( async (req, res, next) => {
	const api = APIS.find( api => api.PATH === req.path );
	if(api?.SECURE){
		const header = req.headers;
		if( header.hasOwnProperty('authorization') && await token.validate(header.authorization) ){
			next();
		} else {
			res.status(401).json({ ...RESPONSE_OBJECT[401]})
		}
	} else{
		next();
	}
});

/**
 * La función `processRequest` procesa una solicitud combinando consulta, cuerpo y parámetros, luego
 * llama al método `get` de un controlador y devuelve la respuesta.
 * @param {Request} req - El parámetro `req` en la función `processRequest` suele ser un objeto que
 * representa la solicitud HTTP. Contiene información sobre la solicitud entrante, como encabezados,
 * cuerpo, parámetros, cadenas de consulta, etc. Generalmente la proporciona el servidor web que maneja
 * la solicitud.
 * @param {Response} res - El parámetro `res` en la función `processRequest` es un objeto que
 * representa la respuesta HTTP que el servidor envía al cliente. Le permite configurar el código de
 * estado de la respuesta usando `res.status()` y enviar datos JSON al cliente usando `res.json()`. En
 * @param controller - El parámetro `controller` en la función `processRequest` es una instancia de la
 * clase `ApiMaster` con un tipo `NoneParams`. Este controlador se utiliza para manejar la solicitud y
 * recuperar los datos de respuesta en función de los parámetros que se le pasan.
 */
const processRequest = async (req: Request, res: Response , controller: ApiMaster<NoneParams>) => {
	try{
		const params = { ...req.query , ...req.body, ...req.params, ...req.files };
		const response = await controller.get(params);
		res.status(response.code).json( response );
	}catch (err){
		console.error(err);
		res.status(500).send(err);
	}
}

APIS.forEach( controller => {
	switch (controller.METHOD) {
		case 'GET':
			app.get( controller.PATH , async (req: Request, res: Response ) => {
				await processRequest(req, res , controller);
			});
			break;
		case 'POST':
			app.post( controller.PATH , async (req: Request, res: Response ) => { 
				await processRequest(req, res , controller);
			});
			break;
		default:
			break;
	}
});

app.listen(3000, () =>{
	const endpoints = expressListEndpoints(app);
	endpoints.forEach((element: {methods: string[], path: string, middlewares: unknown}) => {
		console.log(`${element.methods.join('|')} : ${element.path}`);
	});
});
module.exports = app;