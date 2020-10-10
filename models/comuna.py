#!/usr/bin/env python3
"""This module contains the Class Resultado
"""
import models
from models.base_model import BaseModel, Base
from models.puesto import Puesto
from sqlalchemy import Column, JSON, String, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Comuna(BaseModel, Base):
    """Representation of a Comuna"""
    if models.storage_t == "db":
        __tablename__ = 'comunas'
        puestos_id = relationship("Puesto",
                                  cascade="all, delete, delete-orphan")
        # Coordenadas is to be stored in GeoJson like format
        # to grant easy casting in Front-End
        coordenadas = Column(JSON)
    
    def __init__(self, *args, **kwargs):
        """Initializes Comuna"""
        super().__init__(*args, **kwargs)
    
    if models.storage != "db":
        @property
        def puestos(self):
            """Getter for a list of puestos instances related to the Comuna"""
            puesto_list = []
            all_puestos = models.storage.all(Puesto)
            for puesto in all_puestos.values():
                if puesto.comuna_id == self.id:
                    puesto_list.append(puesto)
            return puesto_list
