***
API INSTRUCTIONS
***

Boot:
Copy and paste the below code. Please note that the port 5005 must be free
and that you are executing it from the Open_Democracy_1 directory. 

ODEM_MYSQL_USER=odem_usr ODEM_MYSQL_PWD=odem_usr ODEM_MYSQL_HOST=34.75.248.42 ODEM_MYSQL_DB=odem_dev_db ODEM_TYPE_STORAGE=db ODEM_API_HOST=0.0.0.0 ODEM_API_PORT=5005 python3 -m api.v1.app