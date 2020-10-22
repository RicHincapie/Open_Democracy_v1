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
