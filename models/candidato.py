#!/usr/bin/env python3
""" holds class City"""
import models
from sqlalchemy.sql.sqltypes import SmallInteger
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Candidato(BaseModel, Base):
    """Representation of candidato """
    if models.storage_t == "db":
        __tablename__ = 'candidatos'
        nombre = Column(String(128), nullable=False)
        apellido = Column(String(128), nullable=False)
        partido_id = Column(SmallInteger(1), ForeignKey('partidos.id'), nullable=False)
        resultados_id = relationship('Resultado')
        # Proposal to assure One to Many relationship (changed!)
        # resultados_id = Column(String(128), nullable=False) (JCs code)
    else:
        nombre = ""
        apellido = ""
        partido_id = ""

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)
