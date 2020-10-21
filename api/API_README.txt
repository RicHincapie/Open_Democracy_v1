***
API INSTRUCTIONS
***
--------
Boot
--------
Copy and paste the below code. Please note that the port 5005 must be free
and that you are executing it from the Open_Democracy_1 directory. 

ODEM_MYSQL_USER=odem_usr ODEM_MYSQL_PWD=odem_usr ODEM_MYSQL_HOST=34.75.248.42 ODEM_MYSQL_DB=odem_dev_db ODEM_TYPE_STORAGE=db ODEM_API_HOST=0.0.0.0 ODEM_API_PORT=5005 python3 -m api.v1.app

--------
Usage
--------

Get Route to check the status
curl -X GET http://0.0.0.0:5005/api/v1/status

Get total number of each class elements of the database
curl -X GET http://0.0.0.0:5005/api/v1/stats

Get All resultados:
curl -X GET http://0.0.0.0:5005/api/v1/resultados

Bring a unique result by id <int>:
    curl -X GET http://0.0.0.0:5005/api/v1/resultados/<int>

Bring results by puesto with a candidate_id <int>:
    curl -X GET http://0.0.0.0:5005/api/v1/<int>

Bring results by comunas with a candidate_id <int>:
    curl -X GET http://0.0.0.0:5005/api/v1/resultado/comunas/<int> 