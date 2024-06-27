import { ConfigService } from "../services/config";

const config = ConfigService.get().run();

export const FIREBASE = {
    apiKey: config['FIREBASE_apiKey'] || '',
    authDomain: config['FIREBASE_authDomain'] || '',
    projectId: config['FIREBASE_projectId'] || '',
    storageBucket: config['FIREBASE_storageBucket'] || '',
    messagingSenderId: config['FIREBASE_messagingSenderId'] || 0,
    appId: config['FIREBASE_appId'] || '',
    measurementId: config['FIREBASE_measurementId'] || ''
};

export const FIREBASE_ADMIN = {
    type: config['FREBASE_ADMIN_type'],
    project_id: config['FREBASE_ADMIN_project_id'],
    private_key_id: config['FREBASE_ADMIN_private_key_id'],
    private_key: ('' + config['FREBASE_ADMIN_private_key']).replace(/\\n/g, '\n'),
    client_email: config['FREBASE_ADMIN_client_email'],
    client_id: config['FREBASE_ADMIN_client_id'],
    auth_uri: config['FREBASE_ADMIN_auth_uri'],
    token_uri: config['FREBASE_ADMIN_token_uri'],
    auth_provider_x509_cert_url: config['FREBASE_ADMIN_auth_provider_x509_cert_url'],
    client_x509_cert_url: config['FREBASE_ADMIN_client_x509_cert_url'],
    universe_domain: config['FREBASE_ADMIN_universe_domain']
}

export const KEYS = {
    auth: {
        secret: config['KEYS_auth_secret'] || '',
        expire: 3000
    },
    email: {
        email: config['KEYS_email_email'] || '',
        user: config['KEYS_email_user'] || '',
        pwd: config['KEYS_email_pwd'] || '',
        refresh: config['KEYS_email_refresh'] || '',
        redirect: config['KEYS_email_redirect'] || '',
    }
}

export const DATABASE = {
    userAuth: 'userByAuth',
    residential: 'residentials',
    usersTower: 'userByResidentials',
    reserve: 'reserveLocations',
    parking: 'reserveParking',
    voucher: 'vouchers',
    notification: 'notifications'
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