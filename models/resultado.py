#!/usr/bin/env python3
"""This module contains the Class Resultado
"""

import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, SmallInteger, ForeignKey


class Resultado(BaseModel, Base):
    """Representation of Resultado """
    if models.storage_t == "db":
        __tablename__ = 'resultados'
        candidato_id = Column(SmallInteger, ForeignKey('candidatos.id'))
        puesto_id = Column(SmallInteger, ForeignKey('puestos.id'))
        partido_id = Column(SmallInteger, ForeignKey('partidos.id'))
        votos = Column(SmallInteger)
    
    else: 
        candidato_id = 0
        puesto_id = 0
        votos = 0
        partido_id = 0
    
    def __init__(self, *args, **kwargs):
        """Initializes Resultado """
        super().__init__(*args, **kwargs)
