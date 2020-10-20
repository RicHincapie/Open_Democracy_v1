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
from flask import jsonify, request, abort, make_response
from flasgger.utils import swag_from

classes = [Candidato, Comuna, Partido, Puesto, Resultado]
names = ["candidatos", "comunas", "partidos", "puestos", "resultados"]

@app_views.route('/status', methods=['GET'], strict_slashes=False)
@swag_from('documentation/Index/status.yml', methods=['GET'])
def status():
    """ Status of API """
    return jsonify({"status": "OK"})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
@swag_from('documentation/Index/number_objects.yml', methods=['GET'])
def number_objects():
    """ Retrieves the number of each objects by type """

    num_objs = {}
    for i in range(len(classes)):
        num_objs[names[i]] = storage.count(classes[i])

    return jsonify(num_objs)


@app_views.route('/<int:id_req_front>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/Index/get_resultado_candidato.yml', methods=['GET'])
def get_resultado_candidato(id_req_front):
    """
        Retrieves the results of votes of candidates by puestos
    """
    new_resultado = {}

    all_resultados = storage.all(Resultado)
    all_puestos = storage.all(Puesto)
    
    our_candidato = storage.get(Candidato, id_req_front)
  
    for key, value in all_resultados.items():
        if value.candidato_id == id_req_front:
            new_resultado.update({key:value})

    final_json = {"type": "FeatureCollection", "features": []}

    our_features = []

    for resultado in new_resultado.values():
        new_feature = {"type": "Feature", "properties": {"votos": 0, "candidato_id": 0, "nombre_cand": "undefined", "comuna_id": 0}, "geometry": {"type": "Point", "coordinates": []}}
        new_feature['properties']['votos'] = resultado.votos
        new_feature['properties']['candidato_id'] = resultado.candidato_id

        id_puesto = resultado.puesto_id
        ref_puesto = "Puesto." + str(id_puesto)
        our_puesto = all_puestos.get(ref_puesto)

        coords = []
        coords.append(our_puesto.latitude)
        coords.append(our_puesto.longitude)

        new_feature['geometry']['coordinates'] = coords
        new_feature['properties']['comuna_id'] = our_puesto.comuna_id
        our_can_name = str(our_candidato.nombre) + " " + str(our_candidato.apellido)

        new_feature['properties']['nombre_cand'] = our_can_name

        our_features.append(new_feature)

    final_json['features'] = our_features
    
    return make_response(jsonify(final_json), 200)


@app_views.route('/resultado/comunas/<int:id_req_front>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/Index/get_resultado_comuna.yml', methods=['GET'])
def get_resultado_comuna_candidato(id_req_front):
    """
        Retrieves the results of votes for candidates
        added by comuna. 
    """
    new_resultado = {}

    all_resultados = storage.all(Resultado)
    all_puestos = storage.all(Puesto)
    
    our_candidato = storage.get(Candidato, id_req_front)
  
    for key, value in all_resultados.items():
        if value.candidato_id == id_req_front:
            new_resultado.update({key:value})
    
    # Main GeoJson structure
    final_json = {"type": "FeatureCollection", "features": []}

    our_features = []

    for resultado in new_resultado.values():
        new_feature = {"type": "Feature", "properties": {"votos": 0, "candidato_id": 0, "nombre_cand": "undefined", "comuna_id": 0}, "geometry": {"type": "Point", "coordinates": []}}
        new_feature['properties']['votos'] = resultado.votos
        new_feature['properties']['candidato_id'] = resultado.candidato_id

        id_puesto = resultado.puesto_id
        ref_puesto = "Puesto." + str(id_puesto)
        our_puesto = all_puestos.get(ref_puesto)

        coords = []
        coords.append(our_puesto.latitude)
        coords.append(our_puesto.longitude)

        new_feature['geometry']['coordinates'] = coords
        new_feature['properties']['comuna_id'] = our_puesto.comuna_id
        our_can_name = str(our_candidato.nombre) + " " + str(our_candidato.apellido)

        new_feature['properties']['nombre_cand'] = our_can_name

        our_features.append(new_feature)

    # Comuna_sum key = comuna, value = sum of votes
    comuna_sum = {1: 0, 2 : 0, 3: 0, 4: 0, 5: 0, 6: 0,
                  7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
                  13: 0, 14: 0, 15: 0, 16: 0, 17: 0,
                  18: 0, 19: 0, 20: 0, 21: 0, 22: 0}
    
    # Add results by candidato inside comuna_sum
    for result in our_features:
        tmp = comuna_sum.get(result['properties']['comuna_id'])
        tmp += result['properties']['votos']
        comuna_sum[result['properties']['comuna_id']] = tmp

    # Now we bring the comunas objects
    all_comunas = storage.all(Comuna)
    our_comunas = [] # This is the actual Features list to the FeatureCollection
    for comuna in all_comunas.values():
        com_id = comuna.id
        tmp_com = comuna.coordenadas
        tmp_com['properties']['votos'] = comuna_sum.get(com_id)
        tmp_com['properties']['nombre_cand'] = our_features[0]['properties']['nombre_cand']
        our_comunas.append(tmp_com)
    
    # The below code works for adding the comunas data to the puestos data and
    # send all the information together
    
    final_json['features'] = our_features

    return make_response(jsonify(final_json), 200)
