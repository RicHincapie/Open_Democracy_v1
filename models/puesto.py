#!/usr/bin/env python3
""" This module contains the Class Puesto
"""

import models
from models.base_model import BaseModel, Base 
from sqlalchemy import Column, String, ForeignKey, SmallInteger, Float



class Puesto(BaseModel, Base):
    """Representation of a Puesto de votación"""
    if models.storage_t == "db":
        __tablename__ = 'puestos'
        comuna_id = Column(SmallInteger, ForeignKey('comunas.id'), nullable=False)
        nombre = Column(String(128), nullable=False)
        latitude = Column(Float, nullable=False) # Not sure if Float must be only 1
        longitude = Column(Float, nullable= False) # Not sure if Float must be only 1
    else:
        comuna_id = 0
        nombre = "undefined"
        latitude = 0.0
        longitude = 0.0
    
    def __init__(self, *args, **kwargs):
        """Initializes puesto"""
        super().__init__(*args, **kwargs)
