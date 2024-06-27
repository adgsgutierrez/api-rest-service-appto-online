# ApptOnline Api Rest Service

Este proyecto contiene las definiciones de las api de servicios utilizados por la aplicación web ApptOnline

## Instalación

Para realizar la instalación de este proyecto se deben seguir os siguientes pasos

```bash
  clonar el proyecto
  cd api-rest-service-appto-online
  npm install
```
Luego crea el archivo de configuración .env en la raíz del proyecto con las siguientes variables

```bash
  # FIREBASE APIS -- Obtenidos del panel de configuración de firebase
  FIREBASE_apiKey
  FIREBASE_authDomain
  FIREBASE_projectId
  FIREBASE_storageBucket
  FIREBASE_messagingSenderId
  FIREBASE_appId
  FIREBASE_measurementId

  # FIREBASE ADMIN -- Obtenidos del archivo de configuración de firebase
  FREBASE_ADMIN_type
  FREBASE_ADMIN_project_id
  FREBASE_ADMIN_private_key_id
  FREBASE_ADMIN_private_key
  FREBASE_ADMIN_client_email
  FREBASE_ADMIN_client_id
  FREBASE_ADMIN_auth_uri
  FREBASE_ADMIN_token_uri
  FREBASE_ADMIN_auth_provider_x509_cert_url
  FREBASE_ADMIN_client_x509_cert_url
  FREBASE_ADMIN_universe_domain

  # AUTH - EMAIL -- Obtenidos de la consola de google cuando se habilita el servicio de email
  KEYS_auth_secret
  KEYS_email_email
  KEYS_email_user
  KEYS_email_pwd
  KEYS_email_refresh
  KEYS_email_redirect
```


## Development

Para mantener el servidor en modo escucha mientras se realizan desarrollos

```bash
  npm run dev
```

## Ejecutar

Para ejecutar el proyecto de forma local se deben seguir los siguientes comandos

```bash
  npm run build
  npm run start
```

## Deployment

Para realizar el despliegue de este proyecto se deben seguir os siguientes pasos

```bash
  npm run build
  vercel deploy 
```

## Descripciones

El proyecto cuenta con la siguiente definición de api's

## Documentación de referencia de servicios

### Utilerias

Crea en postman las siguientes variables de entorno

Entorno Local
```bash
  | Variable                  | Valor              |
  |---------------------------|--------------------|
  | protocol                  | http               |
  | host                      | localhost:3000     |
  | appto_token_authorization |                    |
  | appto_serial              | <KeyBaseDatos>     |
  | appto_client              | <KeyBaseDatos>     |
  | appto_client_secret       | <KeyBaseDatos>     |
```

[@Descarga de postman](https://github.com/adgsgutierrez/api-rest-service-appto-online/blob/main/Apto-Online.postman_collection.json)

## Autor

- [@Aric Dayan Gutierrez Sanchez](https://github.com/adgsgutierrez)

