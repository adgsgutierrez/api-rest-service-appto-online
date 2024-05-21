import { ConfigService } from "../services/config";

const config = ConfigService.get().run();

export const FIREBASE = {
    apiKey: config['FIREBASE.apiKey'] || '',
    authDomain: config['FIREBASE.authDomain'] || '',
    projectId: config['FIREBASE.projectId'] || '',
    storageBucket: config['FIREBASE.storageBucket'] || '',
    messagingSenderId: config['FIREBASE.messagingSenderId'] || 0,
    appId: config['FIREBASE.appId'] || '',
    measurementId: config['FIREBASE.measurementId'] || ''
};

export const KEYS = {
    auth: {
        secret: config['KEYS.auth.secret'] || '',
        expire: 3000
    },
    email: {
        email: config['KEYS.email.email'] || '',
        user: config['KEYS.email.user'] || '',
        pwd: config['KEYS.email.pwd'] || '',
        refresh: config['KEYS.email.refresh'] || '',
        redirect: config['KEYS.email.redirect'] || '',
    }
}

export const DATABASE = {
    userAuth: 'userByAuth',
    residential: 'residentials',
    usersTower: 'userByResidentials',
    reserve: 'reserveLocations'
}

export const RESPONSE_OBJECT = {
    200 : {
        code: 200 , 
        message: 'Ok'
    },
    401: {
        code: 401 ,
        message: 'Not Authorize'
    },
    500 : {
        code: 500 ,
        message: 'Error en proceso'
    }
}