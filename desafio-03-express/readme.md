# Servidor con Express

### Consigna:

Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.

### Aspectos a incluir:

1. [X] - Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos.
1. [?] - Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
1. [X] -El servidor debe contar con los siguientes endpoints:
   1. [X] -Ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
   1. [X] - Si no se recibe query de límite, se devolverán todos los productos.
   1. [X] - Si se recibe un límite, sólo devolver el número de productos solicitados.
   1. [X] - Ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos.

### Sugerencias:

1. Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints.
1. Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets.
### Formatos del entregable:


1. Link al repositorio de Github con el proyecto completo, el cual debe incluir:
    1. Carpeta src con app.js dentro y tu ProductManager dentro.
    1. package.json con la info del proyecto.
NO INCLUIR LOS node_modules generados.
