#!/usr/bin/env python3
"""This module contains the Class Resultado
"""

import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey


class Resultado(BaseModel, Base):
    """Representation of Resultado """
    if models.storage_t == "db":
        candidato_id = Column(Integer, ForeignKey('candidatos.id'))
        puesto_id = Column(Integer, ForeignKey('puestos.id'))
        votos = Column(Integer)
        partido_id = Column(Integer, ForeignKey('partidos.id'))
    
    else: 
        candidato_id = 0
        puesto_id = 0
        votos = 0
        partido_id = 0
    
    def __init__(self, *args, **kwargs):
        """Initializes Resultado """
        super().__init__(*args, **kwargs)
