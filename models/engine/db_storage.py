#!/usr/bin/python3
"""
Contains the class DBStorage
"""

import models
from models.candidato import Candidato
from models.base_model import BaseModel, Base
from models.puesto import Puesto
from models.partido import Partido
from models.resultado import Resultado
from models.comuna import Comuna
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {"Candidato": Candidato, "BaseModel": BaseModel, "Puesto": Puesto,
           "Partido": Partido, "Resultado": Resultado, "Comuna": Comuna}


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        ODEM_MYSQL_USER = getenv('ODEM_MYSQL_USER')
        if not ODEM_MYSQL_USER:
            ODEM_MYSQL_USER = "odem_usr"
        ODEM_MYSQL_PWD = getenv('ODEM_MYSQL_PWD')
        if not ODEM_MYSQL_PWD:
            ODEM_MYSQL_PWD = "odem_usr"
        ODEM_MYSQL_HOST = getenv('ODEM_MYSQL_HOST')
        if not ODEM_MYSQL_HOST:
            ODEM_MYSQL_HOST = "34.75.248.42"
        ODEM_MYSQL_DB = getenv('ODEM_MYSQL_DB')
        if not ODEM_MYSQL_DB:
            ODEM_MYSQL_DB = "odem_dev_db"
        ODEM_ENV = getenv('ODEM_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(ODEM_MYSQL_USER,
                                             ODEM_MYSQL_PWD,
                                             ODEM_MYSQL_HOST,
                                             ODEM_MYSQL_DB),
                                      pool_pre_ping=True)
        if ODEM_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = str(obj.__class__.__name__) + '.' + str(obj.id)
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value

        return None

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count
