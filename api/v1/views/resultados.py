#!/usr/bin/python3
""" 
    Aquí manejaremos todas las acciones predeterminadas de la API RestFul para Resultados.
"""
from models.resultado import Resultado
from models.base_model import BaseModel, Base
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from


@app_views.route('/resultados', methods=['GET'], strict_slashes=False)
@swag_from('documentation/resultado/get_resultados.yml', methods=['GET'])
def get_resultados():
    """
        Obtiene la lista de todos los objetos tipo Resultado
    """
    all_resultados = storage.all(Resultado).values()
    list_resultados = []
    for resultado in all_resultados:
        delattr(resultado, '_sa_instance_state')
        list_resultados.append(resultado.to_dict())

   
    return jsonify(list_resultados)


@app_views.route('/resultados/<int:Resultado_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/resultado/get_resultado.yml', methods=['GET'])
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


@app_views.route('/resultados/<Resultado_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/resultado/delete_Resultado.yml', methods=['DELETE'])
def delete_Resultado(Resultado_id):
    """
        Elimina un objeto de resultado
    """

    Resultado = storage.get(Resultado, Resultado_id)

    if not Resultado:
        abort(404)

    storage.delete(Resultado)
    storage.save()

    return make_response(jsonify({}), 200)

"""
@app_views.route('/resultados', methods=['POST'], strict_slashes=False)
@swag_from('documentation/resultado/post_Resultado.yml', methods=['POST'])
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

@app_views.route('/resultados/<Resultado_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/resultado/put_Resultado.yml', methods=['PUT'])
def put_Resultado(Resultado_id):
    """
        Actualiza un Resultado
    """
    Resultado = storage.get(Resultado, Resultado_id)

    if not Resultado:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(Resultado, key, value)
    storage.save()
    return make_response(jsonify(Resultado.to_dict()), 200)
