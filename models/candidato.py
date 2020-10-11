#!/usr/bin/env python3
""" holds class City"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Candidato(BaseModel, Base):
    """Representation of candidato """
    if models.storage_t == "db":
        __tablename__ = 'candidatos'
        partido_id = Column(String(60), ForeignKey('partidos.id'), nullable=False)
        nombre = Column(String(128), nullable=False)
        apellido = Column(String(128), nullable=False)
        resultados_id = Column(String(128), nullable=False)
        # Proposal to assure One to Many relationship
        # resultados_id = relationship('Resultado')

    else:
        partido_id = ""
        nombre = ""
        apellido = ""

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)
