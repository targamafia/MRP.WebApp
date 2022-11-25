# Cambiar Branding del Sitio Administrativo (Colores, Fuentes y Nombre de la Empresa)

## Colores

Los colores se definen en el archivo `src/index.css` como tres números entre 0 y 255, cada uno representando rojo, verde y azúl respectivamente.

Para modifical los colores, basta con cambiar esos valores.

Cada color se usa de las siguientes forma:

### Colores principales

- `--blue`: Principal color de contraste a través del sitio. Se usa para botones, imágenes e íconos.
- `--orange`: Color secundario de contraste que debe combinar con el color anterior

### Colores de fondo

- `--back`: Este es el color básico de fondo.
- `--surface-x` los colores de surface se usan para fondos y contrastes leves con el mismo. El 1 define al color más claro u oscuro (dependiendo el tema que esté activo) después de `--back`, mientras que el 5 tiene más color. Los números intermedios forman un gradiente de uno a otro.

### Textos

-- `--main`: Este es el color que se aplica por default a todo elemento que no especifique otro color.

## Fuentes

Actualmente se usan dos fuentes para la página y están definidas en el archivo `tailwind.config.cjs`. Para cambiarlas, es tan sencillo como cambiar el nombre que aparece e importar la fuente que queremos. Nosotros usamos [https://fonts.google.com](Google Fonts), pero no es la única alternativa.

## Nombre de la empresa

El nombre de la empresa está definido como una variable de entorno. En caso de estar modificando en una computadora personal la página, la mejor forma es modificando el archivo `.env` donde econtrará la variable `VITE_COMPANY_NAME`.

## Aplicar cambios a la página

Después de haber modificado las cosas que se gusten modificar, se deberá abrir una terminal y correr el comando:

```shell
yarn install && yarn build
```

Esto verificará que se tienen instalados los paquetes necesarios para construir la aplicación y se creará una versión optimizada del sitio en la carpeta `dist/`.

La carpeta dist tiene todos los archivos necesarios para hostear la página en cualquier servicio de hosteo estático.
