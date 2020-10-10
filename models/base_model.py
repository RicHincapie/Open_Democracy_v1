#!/usr/bin/env python3
""" This module contains the class BaseModel which will be inherited
by all the other Classes and contains the basic methods we expect every
Class will have. These are: 

Index:

0. __init__(self, *args, **kwargs)
1. __str__(self)
2. save()
3. to_dict(save_fs=None)
4. delete(self)
"""

from datetime import datetime
import models  #Imports all the models Puesto, Candidato, Partido and Resultado
from random import randint
from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base

time = "%Y-%m-%dT%H:%M:%S.%f" # Our time format

# Defines what storage to use
if models.storage_t == "db":
    Base = declarative_base()
else:
    Base = object


class BaseModel:
    """ Class from which all other classes are derived """
    if models.storage_t == "db":
        id = Column(Integer, primary_key=True)
        created_at = Column(DateTime, default=datetime.utcnow)
        updated_at = Column(DateTime, default=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """ Initialization of BaseModel"""
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)
            if kwargs.get("created_at", None) and type(self.created_at) is str:
                self.created_at = datetime.strptime(kwargs["created_at"], time)
            else:
                self.created_at = datetime.utcnow()
            # If any of our objects came without id.
            if kwargs.get("id", None) is None:
                self.id = randint(10000, 20000)
        else:
            self.id = randint(10000, 20000)
            self.created_at = datetime.utcnow()
            self.updated_at = datetime.utcnow()
    
    def __str__(self):
        """String representation for all Clases"""
        return "[{:s}] ({:s}) {}".format(self.__class__.__name__,
                                         self.id,
                                         self.__dict__)

    def save(self):
        """ Saves to storage and updates update_at attribute"""
        self.updated_at = datetime.utcnow()
        models.storage.new(self)
        models.storage.save()

    def to_dict(self):
        """ Converts the object to its dictionary representation"""
        new_copy = self.__dict__.copy()
        if "created_at" in new_copy:
            new_copy["created_at"] = new_copy["created_at"].strptime(time)
        if "updated_at" in new_copy:
            new_copy["updated_at"] = new_copy["updated_at"].strptime(time)
        new_copy["__class__"] = self.__class__.__name__
        return(new_copy)
    
    def delete(self):
        """Deletes current instance from storage"""
        models.storage.delete(self)
