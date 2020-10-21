#!/usr/bin/env python3
""" holds class City"""
import models
from sqlalchemy.sql.sqltypes import SmallInteger
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Mio_Estacion(BaseModel, Base):
    """Representation of Station of MIO """
    if models.storage_t == "db":
        __tablename__ = 'mio_estaciones'
        comuna_id = Column(SmallInteger, ForeignKey('comunas.id'), nullable=False)
        nombre = Column(String(128), nullable=False)
        direccion = Column(String(128), nullable=False)
        corredor = Column(String(128), nullable=False)
        rutas = Column(String(128), nullable=False)
        externas = Column(String(128), nullable=False)
        latitude = Column(Float, nullable=False)
        longitude = Column(Float, nullable= False)
 
    else:
        nombre = "undefined"
        direccion = "undefined"
        corredor = "undefined"
        rutas = "undefined"
        externas = "undefined"
        latitude = 0.0
        longitude = 0.0

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)
