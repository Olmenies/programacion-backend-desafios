# Hands on Lab: Práctica de módulos nativos: fs + crypto

## Resumen:

Se creará una clase ´UserManager´ que permitirá guardar usuarios en un archivo. Se recibirá con una contraseña en string plano y se deberá guardar la contraseña hasheada con crypto.

Utilizar los módulos nativos fs y crypto.

Nuestra clase debe cumplir con los siguientes requerimientos:

## Requerimientos:
1. El método ´crearUsuario()´ debe permitirnos:
    1. Guardar un usuario en un archivo llamado ´Usuarios.json´
    2. Hashear la contraseña
    3. Recibir un objeto ´usuario´ como el mostrado a continuación:
        '''
            const usuario = {
            nombre,
            apellido,
            nombreUsuario,
            contrasena,
            }
        '''
2. El método ´validarUsuario()´ nos debe permitir:
    1. Recibir ´nombreUsuario´ y ´contrasena´
    2. Leer el archivo ´Usuarios.json´ y comparar si los parámetros recibidos coinciden con los datos de algún usuario registrado en nuestro archivo:
        1. Si hay coincidencia, retornar un string con el mensaje "Loggeado"
        2. Si no hay coincidencia, retornar un error indicando si el usuario no existe o si la contraseña no coincide
