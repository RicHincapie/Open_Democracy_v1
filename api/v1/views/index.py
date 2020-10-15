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

classes = [Candidato, Comuna, Partido, Puesto, Resultado]
names = ["candidatos", "comunas", "partidos", "puestos", "resultados"]

@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def number_objects():
    """ Retrieves the number of each objects by type """

    num_objs = {}
    for i in range(len(classes)):
        num_objs[names[i]] = storage.count(classes[i])

    return jsonify(num_objs)

@app_views.route('/resultados/<int:Resultado_id>', methods=['GET'], strict_slashes=False)
def get_Resultado(Resultado_id):
    """ 
        Obtiene un Resultado en especifico 
    """
    resultado = storage.get(Resultado, Resultado_id)
    if not resultado:
        abort(404)
    print("In Index def_Resultado: ")
    print(resultado)
    new_result = resultado.to_dict()
    """ New result looks like this
    [Resultado] (32) {'puesto_id': 13, 'id': 32, 'created_at': datetime.datetime(2020, 10, 13, 15, 31, 58),
                      'partido_id': 999, '_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f577036f9b0>,
                      'votos': 8, 'updated_at': datetime.datetime(2020, 10, 13, 15, 31, 58), 'candidato_id': 997}
    Jsonify cannot convert the value for the '_sa_instance_state' key, since it is a SQLAlchemy ORM mapper.
    Solution: delete the key:value of AQLAlchemy ORM mapper from dic.  
    """
    new_result.pop('_sa_instance_state') 
    return jsonify(new_result)

"""
@app_views.route('/resultados', methods=['GET'], strict_slashes=False)
def get_resultados():

        Obtiene la lista de todos los objetos tipo Resultado

    all_resultados = storage.all(Resultado).values()
    list_resultados = []
    for resultado in all_resultados:
        list_resultados.append(resultado.to_dict())
    return jsonify(list_resultados)


@app_views.route('/resultados', methods=['POST'], strict_slashes=False)
def post_Resultado():

        Crea un Resultado

    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    instance = Resultado(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)
"""