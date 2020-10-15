""" Blueprint for API """
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.index import *


#from api.v1.views.candidatos import *
#from api.v1.views.comunas import *
#from api.v1.views.partidos import *
#from api.v1.views.puestos import *
#from api.v1.views.resultados import *