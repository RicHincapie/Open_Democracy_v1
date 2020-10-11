#!/usr/bin/python
""" holds class City"""
from sqlalchemy.sql.sqltypes import Boolean
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Partido(BaseModel, Base):
    """Representation of city """
    if models.storage_t == "db":
        __tablename__ = 'partidos'
        nombre = Column(String(128), nullable=False)
        candidatos_id = relationship("Candidato",
                              backref="id_partido",
                              cascade="all, delete, delete-orphan")
        movimiento = Column(Boolean)
    else:
        nombre = "undefined"
        candidatos_id = []
        movimiento = False
        firmas_mov = 0


    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)
