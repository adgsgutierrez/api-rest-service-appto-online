# ApptOnline Api Rest Service

Este proyecto contiene las definiciones de las api de servicios utilizados por la aplicación web ApptOnline

## Descripciones

El proyecto cuenta con la siguiente definición de api's


## Documentación de referencia de servicios

### Utilerias

#### Obtener el estado del servidor, si se encuentra activo y en ejecución

```http
  GET /api/utilities/status

  SIN SEGURIDAD DE HEADER AUTORIZACIÓN CON Bearer <TOKEN>
```

#### Obtener un token para incovar las api

```http
  POST /api/utilities/token

  SIN SEGURIDAD DE HEADER AUTORIZACIÓN CON Bearer <TOKEN>
```

| Clase       | Nombre | Tipo     | Descripcion                |
| :---------- | :----- | :------- | :------------------------- |
| Body Param | `serial` | `string` | **Required**. Id de identificación del registro de la base de datos |
| Body Param | `client` | `string` | **Required**. Id del registro del cliente que realiza el consumo de la aplicación |
| Body Param | `client_secret` | `string` | **Required**. Id del secret del cliente que realiza la petición |

### APIS de la sección de Conjuntos

#### Listar los conjustos registrados en la aplicación

```http
  GET /api/residential/list
  
  CON SEGURIDAD DE HEADER AUTORIZACIÓN CON Bearer <TOKEN>
```

#### Guardar un conjunto en la aplicación

```http
  POST /api/residential
  
  CON SEGURIDAD DE HEADER AUTORIZACIÓN CON Bearer <TOKEN>
```

| Clase       | Nombre | Tipo     | Descripcion                |
| :---------- | :----- | :------- | :------------------------- |
| Body Param | `address` | `string` | **Required**. Dirección locativa del conjunto |
| Body Param | `name` | `string` | **Required**. Nombre del conjunto |
| Body Param | `lat` | `number` | **Required**. Latitud del conjunto |
| Body Param | `long` | `number` | **Required**. Longitud del conjunto |
| Body Param | `nameAdministrator` | `string` | **Required**. Nombre del administrador actual del conjunto |
| Body Param | `email` | `string` | **Required**. Email de la administración del conjunto |
| Body Param | `phone` | `string` | **Required**. Celular de la administración del conjunto |
| Body Param | `localPhone` | `string` | **Required**. Telefono fijo de la administración del conjunto |

### APIS de la sección de usuarios

#### Guardar un conjunto en la aplicación

```http
  POST /api/user/register
  
  CON SEGURIDAD DE HEADER AUTORIZACIÓN CON Bearer <TOKEN>
```

| Clase       | Nombre | Tipo     | Descripcion                |
| :---------- | :----- | :------- | :------------------------- |
| Body Param | `name` | `string` | **Required**. Nombre de la persona que realiza el registro |
| Body Param | `email` | `string` | **Required**. Email de la persona que realiza el registro |
| Body Param | `residential.id` | `string` | **Required**. Id del conjunto |
| Body Param | `residential.address` | `string` | **Required**. Dirección del conjunto |
| Body Param | `residential.name` | `string` | **Required**. Nombre del conjunto |
| Body Param | `tower` | `string` | **Required**. Torre del conjunto a la que pertenece el usuario que registra |
| Body Param | `number` | `string` | **Required**. Numero del apartamento al que pertenece el usuario que registra |
| Body Param | `password` | `string` | **Required**. Contraseña que desea utilizar el usuario que registra |
| Body Param | `validatePassword` | `string` | **Required**. Confirmación de contraseña del usuario que registra |

#### Guardar un conjunto en la aplicación

```http
  POST /api/user/login
  
  CON SEGURIDAD DE HEADER AUTORIZACIÓN CON Bearer <TOKEN>
```

| Clase       | Nombre | Tipo     | Descripcion                |
| :---------- | :----- | :------- | :------------------------- |
| Body Param | `user` | `string` | **Required**. Correo de la persona que ingresa a la aplicación |
| Body Param | `password` | `string` | **Required**. Contraseña de la persona que ingresa a la aplicación |


## Instalación

Para realizar la instalación de este proyecto se deben seguir os siguientes pasos

```bash
  clonar el proyecto
  cd api-rest-service-appto-online
  npm install
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


## Autor

- [@Aric Dayan Gutierrez Sanchez](https://github.com/adgsgutierrez)

