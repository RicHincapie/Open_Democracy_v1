![Open-Democracy-Banner](https://user-images.githubusercontent.com/54350108/97485354-03ea3900-1928-11eb-8098-d350a053b70f.jpg)

# Open Democracy

Data power for everyone. Processing and visualizing electoral data from raw sources to interactive maps and charts in a software as a service business model, making affordable and accessible electoral data for everyone and making our democracy better.

Open Democracy is the first free platform to interactively visualize complex data for electoral purposes and designed to facilitate data analysis.
This new service is first of all one for the people and to make democracy better, giving data power to everyone to be competitive in electoral campaigns, not just to the few that could afford it.

## Starting 🚀

Open democracy consists of a part in the Back-end that is responsible for making requests to the database and delivering it in a special JSON format.

It also consists of its Front-End part in which a visualization of the map of Cali is built and on additional layers, the neighborhoods, communes and the votes of each candidate by voting point are shown.

Look **Deployment** for project deploy.


### Pre-requirements 📋

-If for some reason your Ubuntu server doesn't have Python installed, install it.

-Pip is a package management system used to install and manage software packages written in Python:

    'sudo apt install -y python3-pip'

-On the test servers we had problems installing or running services, specifically with locales. We just set them:

    'export LC_ALL="en_US.UTF-8"'
    'export LC_CTYPE="en_US.UTF-8"'

-SQLAlchemy is the Python SQL toolkit and Object Relational Mapper that gives application developers the full power and flexibility of SQL:

    'pip3 install SQLAlchemy'


-MySQLdb is an interface to the popular MySQL database server for Python:
    
    'sudo apt-get install -y python3-mysqldb'


-Flask is a lightweight WSGI web application framework. It is designed to make getting started quick and easy, with the ability to scale up to complex applications. And Gunicorn 'Green Unicorn' is a Python WSGI HTTP Server for UNIX. It's a pre-fork worker model. The Gunicorn server is broadly compatible with various web frameworks, simply implemented, light on server resources, and fairly speedy. Install both:

    'pip3 install gunicorn flask'



'pip3 install flasgger'
'pip3 install flask_cors'




-Nginx is a lightweight, high-performance reverse proxy / web server and proxy for email protocols (IMAP / POP3):

    'sudo apt install nginx'
    
    The firewall software must be configured to allow access to the service. Nginx registers itself as a service with ufw upon installation, making allowing Nginx access easy:

    'sudo ufw allow 'Nginx HTTP''

    Nginx Full: This profile opens both port 80 (normal, unencrypted web traffic) and port 443 (encrypted TLS / SSL traffic):

    'sudo ufw allow 'Nginx Full''



_Que cosas necesitamos para instalar el software y como instalarlas_

```
Ejemplo
```

### Installation 🔧

_Una serie de ejemplos paso a paso que nos dice lo que debemos ejecutar para tener un entorno de desarrollo ejecutandose_

_Cómo será ese paso_

```
Ejemplo
```

_Y repetimos_

```
hasta finalizar
```

_Finalizamos con un ejemplo de cómo obtener datos de la API o como usarlos para una pequeña demo_

## Running the tests ⚙️

_Explicamos como ejecutar las pruebas en todas las @routes_

### Analice las pruebas end-to-end 🔩

_Explicamos las pruebas verifican estas pruebas y por qué_

```
Ejemplo
```

## Deploy 📦

_Agregamos notas adicionales sobre como hacer deploy (se explica en un solo servidor? o el proyecto con load balancer?_

## Build with 🛠️

* [Carto](https://carto.com/) - API usada para generar el mapa
* [Python](https://www.python.org/) - lenguaje usado para generar los Scripts para el servidor web 
* [Flask](ttps://palletsprojects.com/p/flask/) - Usado para generar el servidor web
* [MySQL](https://www.mysql.com/) - Usado para generar la base de datos
* [Flask](ttps://palletsprojects.com/p/flask/) - Usado para generar el servidor web
* [SQLAlchemy](ttps://palletsprojects.com/p/flask/) - Usado para generar el servidor web
* [Flask](ttps://palletsprojects.com/p/flask/) - Usado para generar el servidor web
* [Flask](ttps://palletsprojects.com/p/flask/) - Usado para generar el servidor web
* [Flask](ttps://palletsprojects.com/p/flask/) - Usado para generar el servidor web



## Contributing 🖇️

Please read [CONTRIBUTING.md] (https://gist.github.com/ricarhincapie/Open_Democracy_v1) for details of our code of conduct, and the process for submitting pull requests.

## Autores ✒️

* **Javier Jaramillo** - *Front-End* - [J4VJ4R](https://github.com/J4VJ4R)
* **Ricardo Hincapie** - *Back-End* - [ricarhincapie](https://github.com/ricarhincapie)
* **Camilo Moncada** - *Front-End* - [moncada92](https://github.com/moncada92)
* **Cristian Nazareno** - *Front-End* - [ch-canaza](https://github.com/ch-canaza)
* **Javier Charria** - *Back-End* - [linkjavier](https://github.com/linkjavier)

You can also look at the list of all [contributors] (https://github.com/ricarhincapie/Open_Democracy_v1/contributors) who have participated in this project.

## Licence 📄

This project is under the License (Your License) - see the file [LICENSE.md] (LICENSE.md) for details

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* etc.
