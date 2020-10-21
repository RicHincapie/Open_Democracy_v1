#!/usr/bin/env python3
"""Initializes the models package and takes care
of storage engine boot
"""

from os import getenv

storage_t = getenv("ODEM_TYPE_STORAGE")
if not storage_t:
    storage_t == "db"

#storage_t = "file"
if storage_t != "db":
    from models.engine.FileStorage import FileStorage
    storage = FileStorage()

else:
    from models.engine.db_storage import DBStorage
    storage = DBStorage()

storage.reload()
