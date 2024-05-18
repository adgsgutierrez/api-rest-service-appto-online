export const FIREBASE = {
    apiKey: "AIzaSyBaKvA9prbJpoqFq22vVBp78ae7yRJkTrU",
    authDomain: "apptonline-de677.firebaseapp.com",
    projectId: "apptonline-de677",
    storageBucket: "apptonline-de677.appspot.com",
    messagingSenderId: "617869375612",
    appId: "1:617869375612:web:d554f4f4721215e52ef1f9",
    measurementId: "G-5VJN08L8ZM"
};

export const KEYS = {
    auth: {
        secret: 'JTWr2rXF518vsDx9qvoHKC3UbhGAmnV0B9f',
        expire: 3000
    },
    email: {
        email: 'dxperience.co@gmail.com',
        user: '617869375612-vtfekqapjcs9ojhpls16njlea8bgcbaq.apps.googleusercontent.com',
        pwd: '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',
        refresh: '1//04Q5MTQEkqc2sCgYIARAAGAQSNwF-L9IrIwvRpT-j2TqaFhXH6-gSnc65Uw-QlaQ1xtCcKBsIvDtZuvpjYtt3rpV7iFOf48JpXzA',
        redirect: 'https://developers.google.com/oauthplayground'
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