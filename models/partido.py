#!/usr/bin/python
""" holds class City"""
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
        name = Column(String(128), nullable=False)
        id_candidatos = relationship("Candidato",
                              backref="id_partido",
                              cascade="all, delete, delete-orphan")
    else:
        name = "undefined"

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)
