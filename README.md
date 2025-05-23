# Nextplore - README

## 1. Introducción
<details>
  <summary>Click aquí para expandir</summary>
  <br />
Nextplore es una aplicación diseñada para los amantes del cine y las series, proporcionando una experiencia de exploración gamificada. Su objetivo principal es permitir a los usuarios descubrir y visitar locaciones donde se han filmado películas y series, obteniendo recompensas virtuales como trajes y accesorios exclusivos en la aplicación.  
Esta aplicación está pensada para ofrecer una interfaz intuitiva, un diseño atractivo con colores vivos y un mapa claro y fácil de usar, garantizando una experiencia amigable y accesible para todos los usuarios.

</details>

---

## 2. Necesidad y Justificación
<details>
  <summary>Click aquí para expandir</summary>
<br />
El cine y las series forman parte de la cultura global, y muchas personas disfrutan visitando los lugares icónicos donde se rodaron sus escenas favoritas. Sin embargo, no existía una plataforma que incentivara y recompensara este tipo de exploración de manera interactiva y atractiva.  
Nextplore cubre esta necesidad combinando entretenimiento, turismo y tecnología en una aplicación accesible y gamificada.
</details>

---

## 3. Empresa o Sector de Desarrollo
<details>
  <summary>Click aquí para expandir</summary>
<br />
Este proyecto está orientado tanto a empresas del sector del turismo como a comunidades de fans del cine y las series. Puede ser utilizado por agencias de turismo, plataformas de streaming o incluso festivales de cine como una herramienta para atraer y fidelizar a sus usuarios.
</details>

---

## 4. Funcionalidades Principales
<details>
  <summary>Click aquí para expandir</summary>
<br />
- Mapa interactivo con marcadores de locaciones de rodaje.
- Sistema de recompensas basado en la visita a estos lugares.
- Interfaz intuitiva y atractiva con colores vivos y navegación fluida.
- Disponibilidad en plataformas móviles y web.
- Posibilidad de descubrir nuevas locaciones cercanas o planear viajes a locaciones más lejanas.
- Gamificación con desbloqueo de trajes y objetos exclusivos.
- **Personalización de Avatar:** Los usuarios pueden personalizar su avatar combinando diferentes elementos de **cabeza y cuerpo**, seleccionándolos a través de un carrusel de opciones disponibles.
- Sistema de visitas de localizaciones.
</details>

---

## 5. Diagramas y Modelo de Datos
<details>
  <summary>Click aquí para expandir</summary>
<br />
El modelo de datos de Nextplore se basa en la relación entre usuarios, películas, lugares de rodaje y notificaciones, ahora incluyendo la personalización de avatares según el diagrama ER proporcionado.

**Estructura principal del modelo:**

- **Usuario:** Registra la información del usuario, incluyendo correo, nombre y contraseña. Tiene una relación 1:1 con un **Avatar**. Puede recibir notificaciones y explorar lugares.
- **Notificación:** Contiene el tipo y mensaje de la notificación enviada al usuario.
- **Película:** Incluye datos como el nombre, género y año de estreno de cada película registrada en la plataforma.
- **Lugar:** Representa las locaciones de rodaje de películas y series, con coordenadas y categorización.
- **Explora:** Relación entre Usuario y Lugar, permitiendo registrar si ha sido visitado o marcado como favorito.
- **Avatar:** Representa el avatar de un usuario, conteniendo el **ID del usuario** al que pertenece, y referencias a una **Cabeza** y un **Cuerpo**.
- **Cabeza:** Representa una parte de la cabeza del avatar, con un ID, nombre y código.
- **Cuerpo:** Representa una parte del cuerpo del avatar, con un ID, nombre y código.
<br />
![Image](https://github.com/user-attachments/assets/e0d51f8a-befd-4e2c-85f9-98e656e67dc6)
<br/>

**Modelo Relacional (Actualizado según el Diagrama ER):**
Usuario: **_id_usuario_**, nombre, email, contraseña

Notificación: **_id_notificacion_**, tipo, mensaje, **id_usuario*** (FK de Usuario)

Lugar: **_id_lugar_**, nombre, categoría, ciudad, coordenada_x, coordenada_y, **id_pelicula*** (FK de Pelicula)

Explora: **_id_usuario_*** (FK de Usuario), **_id_lugar_*** (FK de Lugar), favorito, visitado

Pelicula: **_id_pelicula_**, nombre, genero, año

Avatar: **_id_avatar_**, **id_usuario*** (FK de Usuario), **id_cabeza*** (FK de Cabeza), **id_cuerpo*** (FK de Cuerpo)

Cabeza: **_id_cabeza_**, nombre, codigo

Cuerpo: **_id_cuerpo_**, nombre, codigo
<br/>
**Modelo UML:**
<br/>
<img width="407" alt="umlCaptura" src="https://github.com/user-attachments/assets/157fc5d9-747c-4b9f-90ce-3368caaa7ddd" />

</details>

---

## 6. Requisitos de Usuario
<details>
  <summary>Click aquí para expandir</summary>

**Requisitos Generales:**
<br />
- La aplicación debe permitir a los usuarios registrarse e iniciar sesión con su correo electrónico y contraseña.
- Debe contar con un mapa interactivo donde se visualicen las locaciones de rodaje cercanas y lejanas.
- Los usuarios deben poder seleccionar locaciones y ver una imagen de muestra y su nombre.
- La interfaz debe ser intuitiva y accesible, con colores vivos y navegación sencilla.
- El sistema debe ofrecer notificaciones sobre nuevos lugares cercanos y eventos relacionados con el cine y las series.
- Se debe implementar un sistema de recompensas basado en la exploración y visitas realizadas.
- Los usuarios deben poder personalizar su avatar eligiendo entre diferentes opciones de **cabeza y cuerpo**.

**Requisitos Específicos:**
<br />
- Integración con servicios de mapas para la visualización de locaciones.
- Implementación de un sistema de autenticación seguro para proteger la información del usuario.
- Notificaciones en tiempo real para alertar sobre locaciones cercanas.
- Diseño responsivo para garantizar una experiencia óptima en dispositivos móviles y web.
- Acceso a las recompensas obtenidas, incluyendo nuevas partes de avatar.
- El sistema debe permitir el **registro de un nuevo usuario**, **crear un avatar asociado a ese usuario** (manteniendo la relación 1:1) y **modificar las partes del avatar** en la base de datos.
- La interfaz de personalización de avatar debe incluir un **carrusel** para la selección de las diferentes partes.
</details>

---

## 7. Casos de Uso
<details>
  <summary>Click aquí para expandir</summary>

**CU1 - Registro de Usuario** Descripción: El usuario se registra en la aplicación proporcionando su correo, nombre y contraseña. Al registrarse, se le crea un avatar por defecto asociado a su cuenta que puede personalizar posteriormente.  
Actor Principal: Usuario  

**Flujo Principal:** - El usuario accede a la pantalla de registro.  
- Ingresa su correo electrónico, nombre y contraseña.  
- Confirma el registro.  
- El sistema verifica la información, crea la cuenta de usuario y **crea una entrada para un avatar con partes por defecto, asociando este avatar al ID del usuario recién creado**.  
- Se muestra un mensaje de confirmación.  

**CU2 - Iniciar Sesión** Descripción: Un usuario registrado inicia sesión en la aplicación.  
Actor Principal: Usuario  

**Flujo Principal:** - El usuario accede a la pantalla de inicio de sesión.  
- Ingresa su correo electrónico y contraseña.  
- El sistema valida las credenciales.  
- Si son correctas, se muestra la pantalla principal.  

**CU3 - Explorar Locaciones** Descripción: El usuario visualiza en el mapa las locaciones de rodaje cercanas.  
Actor Principal: Usuario  

**Flujo Principal:** - El usuario accede al mapa interactivo.  
- La aplicación muestra los lugares de rodaje más cercanos según su ubicación.  
- Puede seleccionar una locación para ver más detalles.

**CU4 - Personalización de Avatar** Descripción: Un usuario cambia su avatar personalizado dentro de la aplicación, seleccionando diferentes partes de cabeza y cuerpo utilizando un carrusel.  
Actor Principal: Usuario  

**Flujo Principal:** - El usuario accede a su perfil o a la sección de personalización.  
- Navega por las opciones de **cabeza y cuerpo** utilizando un **carrusel**.  
- Selecciona las partes deseadas para su avatar.  
- Confirma los cambios.  
- El sistema **actualiza las referencias a la cabeza y cuerpo del avatar del usuario en la tabla `Avatar`** (mediante una operación POST o PUT).  
- El nuevo avatar se muestra en su perfil.

**CU5 - Notificaciones** Descripción: El sistema envía notificaciones sobre nuevas locaciones o eventos cercanos.  
Actor Principal: Usuario  

**Flujo Principal:** - Se detecta una nueva locación o evento relevante.  
- Se genera y envía una notificación al usuario.  
- El usuario puede acceder a la notificación y ver más detalles.

<br/>
![image](https://github.com/user-attachments/assets/e24deea7-321d-42fe-83b8-572729d3f90a)

<br/>

</details>

---

## 8. Funcionamiento del Sistema y Especificaciones Técnicas
<details>
  <summary>Click aquí para expandir</summary>

**Funcionamiento General:**

- **Autenticación y Gestión de Usuarios:** Los usuarios pueden registrarse e iniciar sesión con correo electrónico y contraseña.  
El sistema almacena la información del usuario y **crea un registro en la tabla `Avatar` asociado a ese usuario (a través de `id_usuario`) con partes de cabeza y cuerpo por defecto**.

- **Exploración de Locaciones:** La aplicación muestra un mapa interactivo con puntos de interés de rodajes cercanos.  
Se utilizan servicios de geolocalización para detectar la ubicación del usuario y filtrar locaciones.

- **Sistema de Recompensas:** Al visitar locaciones verificadas, los usuarios desbloquean recompensas, como nuevas partes de cabeza y cuerpo para su avatar.

- **Notificaciones y Eventos:** Los usuarios reciben alertas sobre nuevas locaciones o eventos cercanos.

- **Personalización de Avatar:** Los usuarios pueden personalizar su avatar combinando diferentes elementos de cabeza y cuerpo. La selección se realiza a través de un carrusel en la interfaz. Cuando el usuario confirma un cambio, la aplicación envía una solicitud POST (o PUT) al backend para **actualizar los IDs de la cabeza y el cuerpo en el registro de `Avatar` correspondiente al `id_usuario`**.

**Especificaciones Técnicas:**

- **Arquitectura del Sistema:** Nextplore utiliza una arquitectura cliente-servidor con una API central que gestiona la comunicación entre la base de datos y las aplicaciones móviles y web.

- **Servidor (Backend):** Desarrollado con Springboot y Gradle.  
Base de datos MySQL con modelo entidad-relación optimizado, incluyendo tablas para `Usuario`, `Avatar`, `Cabeza` y `Cuerpo` con las relaciones correctas (notablemente `id_usuario` en `Avatar`).  
Autenticación con JWT (JSON Web Tokens).  
**Endpoints específicos para el registro de usuarios (que incluye la creación y asociación de un avatar por defecto), la obtención de las partes disponibles para cabeza y cuerpo, y la actualización del avatar del usuario (a través de solicitudes POST/PUT a la tabla `Avatar` referenciando el `id_usuario`).**


- **Aplicación** Desarrollada con React.js.  
Conexión al backend mediante CORS.  
Diseño responsivo y optimizado para distintas resoluciones de pantalla.  
**Implementación de componentes de carrusel para la selección de partes de cabeza y cuerpo del avatar.**

- **Servicios de Terceros:** Leaflet API para visualización de mapas interactivos.  
Iconos de terceros para botones.
</details>

---

## 9. Interfaces
<details>
  <summary>Click aquí para expandir</summary>

Aquí se proporciona el enlace para ver el prototipo creado en Figma.

[Enlace al prototipo de Figma](https://www.figma.com/design/1xlvnxTBQmBMkp5Eve0end/Nextplore?node-id=0-1&p=f)
</details>

---

## 10. Accesibilidad y Usabilidad
<details>
  <summary>Click aquí para expandir</summary>

**Contraste de colores adecuado:** Hemos asegurado que los colores en la aplicación tengan un contraste suficiente, especialmente entre el texto y el fondo.

**Compatibilidad con lectores de pantalla:** Los elementos clave de la aplicación están etiquetados adecuadamente para que los usuarios que dependen de lectores de pantalla puedan interactuar con ellos.

**Mapas accesibles:** El mapa interactivo tiene funcionalidades de alto contraste y la capacidad de cambiar el tamaño de los elementos.

**Texto alternativo para imágenes:** Todas las imágenes que se muestran en la aplicación incluyen descripciones alternativas (alt text), **incluyendo las partes del avatar**.

**Controles de notificaciones accesibles:** Las notificaciones en la app están diseñadas para ser claras, y los usuarios pueden gestionarlas fácilmente desde la configuración.

**Diseño responsivo y legible:** La app se adapta correctamente a diferentes dispositivos y la tipografía es suficientemente grande.

**Botones y áreas interactivas de tamaño adecuado:** Los botones y áreas interactivas son lo suficientemente grandes y están bien espaciados.
</details>

---

## 11. Manuales y Ayuda
<details>
  <summary>Click aquí para expandir</summary>

# Manual de Instalación para Desarrolladores (Frontend y Backend)

Este manual proporciona instrucciones completas para que los desarrolladores puedan configurar tanto el **frontend** (React) como el **backend** (Spring Boot) con **MySQL** como base de datos.

---

## Requisitos Previos

Antes de comenzar con la instalación, asegúrate de tener las siguientes herramientas instaladas en tu sistema:

- **Node.js** (versión 14.x o superior)
- **npm** (gestor de dependencias de Node.js)
- **MySQL** (versión 5.x o superior)
- **JDK (Java Development Kit)** (versión 11 o superior)
- **Gradle** (versión 7.x o superior)
- **Git** (para clonar el repositorio)
- **IDE recomendado**:
  - Para el frontend: **Visual Studio Code**
  - Para el backend: **IntelliJ IDEA** o **Eclipse**

---

## Pasos para Instalar el Entorno Local

### 1. Clonar el Repositorio

Clona el repositorio de **Nextplore** usando Git:

git clone https://github.com/Noelregueiragerpe/Nextplore
cd nextplore
Instalación y Configuración del Frontend (React)
#### 1. Acceder al Directorio del Cliente (Frontend)
Dentro del proyecto, accede al directorio que contiene el frontend (React):

cd client
####  2. Instalar las Dependencias
Instala las dependencias necesarias para el frontend utilizando npm:

npm install
#### 3. Ejecutar el Servidor de Desarrollo
Inicia el entorno de desarrollo de React:

npm start
Esto debería abrir tu navegador en http://localhost:3000, donde podrás ver la aplicación en modo de desarrollo.

### Instalación y Configuración del Backend (Spring Boot)
#### 1. Acceder al Directorio del Servidor (Backend)
Accede al directorio que contiene el backend de Spring Boot:

cd server
#### 2. Instalar las Dependencias con Gradle
Asegúrate de tener Gradle instalado en tu sistema. Si no lo tienes, sigue las instrucciones de instalación desde la página oficial de Gradle.

Para instalar las dependencias necesarias para el backend, ejecuta:

gradle build
#### 3. Configurar la Base de Datos MySQL
Debes configurar las credenciales y la URL de conexión de la base de datos en el archivo application.properties de Spring Boot. Aquí tienes un ejemplo de configuración:

properties

spring.datasource.url=jdbc:mysql://localhost:3306/nextplore
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

Asegúrate de haber creado la base de datos nextplore en MySQL que se ubica en Schema.sql dentro de la API antes de continuar.

#### 4. Ejecutar la API (Backend)
Una vez que hayas configurado la base de datos, puedes iniciar el servidor de la API de Spring Boot ejecutando el siguiente comando:

bash

gradle bootRun
Esto debería iniciar el backend en http://localhost:8080, y estará listo para interactuar con el frontend.

### Verificación y Pruebas
#### 1. Verificación del Frontend
Una vez que el servidor de React esté en funcionamiento, abre tu navegador y accede a http://localhost:3000 para verificar que el frontend se carga correctamente.

#### 2. Verificación del Backend
Una vez que el servidor de Spring Boot esté en funcionamiento, puedes acceder a los endpoints de la API en http://localhost:8080. Por ejemplo, puedes probar la ruta http://localhost:8080/api/lugares para asegurarte de que el backend esté funcionando correctamente.

### Ayuda al Usuario
Dentro de la aplicación hemos integrado un sistema de ayuda con HelpnDoc, el cual proporciona documentación completa para los usuarios. Además, si tienes algún inconveniente o necesitas más información sobre el uso de la aplicación, consulta la documentación disponible en HelpnDoc.

https://docs.google.com/document/d/17Q9HtB5d7hqy8lbO-En9OIdEa-gx0GvnpKz_xG0AHk0/edit?usp=sharing

</details>

## 12. Test de prueba para Frontend
<details>
  <summary>Click aquí para expandir</summary>

En este apartado se explica que se ha realizado un conjunto de pruebas para asegurar la calidad y funcionamiento adecuado del frontend de la aplicación Nextplore.

https://docs.google.com/document/d/1D0X5UB8_gmsNUz3uEcaFOefZcg8GPCWYSQ22jUXjoyg/edit?usp=sharing

</details>

## 13. Pila Tecnológica
<details>
  <summary>Click aquí para expandir</summary>

La pila tecnológica de Nextplore está compuesta por tecnologías modernas que aseguran el buen funcionamiento, escalabilidad y rendimiento de la aplicación.

**Frontend:**
- React
- React Router
- Leaflet.js

**Backend:**
- Spring Boot
- Hibernate (JPA)
- MySQL
- JWT (JSON Web Tokens)

**Otros:**
- Gradle
</details>

## 14. Comparación de Tecnologías
<details>
  <summary>Click aquí para expandir</summary>

**React vs Vue.js:**  
React es más flexible y tiene una comunidad más amplia y madura que Vue.js.  

**Spring Boot vs Node.js (Express):**  
Spring Boot es ideal para aplicaciones empresariales con una fuerte base de datos relacional.

**Hibernate vs MyBatis:**  
Hibernate proporciona un mapeo objeto-relacional automático.

**JWT vs OAuth:**  
JWT es adecuado para aplicaciones con necesidades de autenticación simples.
</details>

## 15. Repositorios
<details>
  <summary>Click aquí para expandir</summary>
**Backend:**  
[Repositorio de backend](https://github.com/Noelregueiragerpe/PGVNoel)
</details>

## 16. Planificación
<details>
  <summary>Click aquí para expandir</summary>

La planificación de Nextplore se dividió en varias fases:
- Investigación y Requerimientos
- Diseño
- Desarrollo Backend
- Desarrollo Frontend
- Integración y Pruebas
- Despliegue y Lanzamiento
</details>

## 17. Contacto
<details>
  <summary>Click aquí para expandir</summary>

Para más información o dudas, puedes contactarnos en el siguiente correo: nrg2486@gmail.com

</details>
