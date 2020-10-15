#!/usr/bin/python3
""" Index """
from models.resultado import Resultado
from models.candidato import Candidato
from models.base_model import BaseModel, Base
from models.puesto import Puesto
from models.partido import Partido
from models.comuna import Comuna
from models import storage
from api.v1.views import app_views
from flask import jsonify, request, abort


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

@app_views.route('/resultados/<Resultado_id>', methods=['GET'], strict_slashes=False)
def get_Resultado(Resultado_id):
    """ 
        Obtiene un Resultado en especifico 
    """
    Resultado = storage.get(Resultado, Resultado_id)
    if not Resultado:
        abort(404)

    return jsonify(Resultado.to_dict())

@app_views.route('/resultados', methods=['GET'], strict_slashes=False)
def get_resultados():
    """
        Obtiene la lista de todos los objetos tipo Resultado
    """
    all_resultados = storage.all(Resultado).values()
    list_resultados = []
    for resultado in all_resultados:
        list_resultados.append(resultado.to_dict())
    return jsonify(list_resultados)

@app_views.route('/resultados', methods=['POST'], strict_slashes=False)
def post_Resultado():
    """
        Crea un Resultado
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    instance = Resultado(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)