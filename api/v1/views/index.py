#!/usr/bin/python3
""" Index """
from models.candidato import Candidato
from models.base_model import BaseModel, Base
from models.puesto import Puesto
from models.partido import Partido
from models.resultado import Resultado
from models.comuna import Comuna
from models import storage
from api.v1.views import app_views
from flask import jsonify


@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def number_objects():
    """ Retrieves the number of each objects by type """
    classes = [Candidato, Comuna, Partido, Puesto, Resultado]
    names = ["candidatos", "comunas", "partidos", "puestos", "resultados"]

    num_objs = {}
    for i in range(len(classes)):
        num_objs[names[i]] = storage.count(classes[i])

    return jsonify(num_objs)