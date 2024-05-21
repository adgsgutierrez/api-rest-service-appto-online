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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.static('public'));
app.use(cors( { origin: '*', methods: ['GET','POST','PUT'] }));
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

const processRequest = async (req: Request, res: Response , controller: ApiMaster<NoneParams>) => {
	try{
		const params = { ...req.query , ...req.body, ...req.params };
		const response = await controller.get(params);
		res.status(response.code).json( response );
	}catch (err){
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