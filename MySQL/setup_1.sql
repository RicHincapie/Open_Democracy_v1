-- mysql  Ver 14.14 Distrib 5.7.31 for Linux (x86_64)
--
-- Host: 34.75.248.42       Database: odem_dev_db 
-- --------------------------------------------------
-- Server version           5.7.31

/* Script to setup a database for Open Democracy Enterprise */

-- ----------------------------------------
-- Database and users creation
-- ----------------------------------------

-- Drop database if exists
DROP DATABASE IF EXISTS odem_dev_db;

-- Create the database
CREATE DATABASE odem_dev_db;

-- Create users for database
CREATE USER IF NOT EXISTS 'odem_usr';
SET PASSWORD FOR 'odem_usr' = 'odem_usr';
GRANT SELECT ON *.* TO 'odem_usr';
FLUSH PRIVILEGES;

USE odem_dev_db;

-- ----------------------------------------
-- Table structure for table 'partidos'
-- ----------------------------------------

DROP TABLE IF EXISTS `partidos`;
CREATE TABLE `partidos` (
    `id` smallint NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `nombre` VARCHAR(128),
    -- Does not have candidatos_id column. Apparently it doesn`t need it 
    `movimiento` TINYINT,
    `firmas_mov` INT,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- InnoDB is the default MySQL 5.7 storage engine
-- stated here to be as clear as possible. 
-- Also, latin1 is default charset

--
-- Next, data must be dumped into table 'partidos'
--

-- ----------------------------------------
-- Table structure for table 'candidatos'
-- ----------------------------------------

DROP TABLE IF EXISTS `candidatos`;
CREATE TABLE `candidatos` (
    `id` smallint NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `nombre` varchar(128),
    `apellido` varchar(128),
    `partido_id` smallint, -- Parent for CONSTRAINT
    -- Does not have resultados_id column. Apparently it doesn`t need it
    PRIMARY KEY (`id`),
    KEY `partido_id` (`partido_id`),
    CONSTRAINT `candidatos_partido_id` FOREIGN KEY (`partido_id`) REFERENCES `partidos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- InnoDB is the default MySQL 5.7 storage engine
-- stated here to be as clear as possible. 
-- Also, latin1 is default charset

--
-- Next, data must be dumped into table 'candidatos'
--


-- ----------------------------------------
-- Table structure for table 'comunas'
-- ----------------------------------------

DROP TABLE IF EXISTS `comunas`;
CREATE TABLE `comunas` (
    `id` smallint NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Does not have puestos_id column. Apparently it doesn`t need it 
    `coordenadas` JSON,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- InnoDB is the default MySQL 5.7 storage engine
-- stated here to be as clear as possible. 
-- Also, latin1 is default charset

--
-- Next, data must be dumped into table 'partidos'
--

-- ----------------------------------------
-- Table structure for table 'puestos'
-- ----------------------------------------

DROP TABLE IF EXISTS `puestos`;
CREATE TABLE `puestos` (
    `id` smallint NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `nombre` varchar(128) NOT NULL,
    `comuna_id` smallint NOT NULL, -- Parent for CONSTRAINT
    `latitude` float NOT NULL,
    `longitude` float NOT NULL,
    PRIMARY KEY (`id`),
    KEY `comuna_id` (`comuna_id`),
    CONSTRAINT `puestos_comuna_id` FOREIGN KEY (`comuna_id`) REFERENCES `comunas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- InnoDB is the default MySQL 5.7 storage engine
-- stated here to be as clear as possible. 
-- Also, latin1 is default charset

--
-- Next, data must be dumped into table 'candidatos'
-- 

-- ----------------------------------------
-- Table structure for table 'resultados'
-- ----------------------------------------

DROP TABLE IF EXISTS `resultados`;
CREATE TABLE `resultados` (
    `id` smallint NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `candidato_id` smallint NOT NULL, -- Parent for CONSTRAINT
    `puesto_id` smallint NOT NULL, -- Parent for CONSTRAINT
    `votos` smallint NOT NULL, 
    `partido_id` smallint NOT NULL, -- Parent for CONSTRAINT
    PRIMARY KEY (`id`),
    KEY `candidato_id` (`candidato_id`),
    KEY `puesto_id` (`puesto_id`),
    KEY `partido_id` (`partido_id`),
    CONSTRAINT `resultados_candidato_id` FOREIGN KEY (`candidato_id`) REFERENCES `candidatos` (`id`),
    CONSTRAINT `resultados_puesto_id` FOREIGN KEY (`puesto_id`) REFERENCES `puestos` (`id`),
    CONSTRAINT `resultados_partido_id` FOREIGN KEY (`partido_id`) REFERENCES `partidos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- InnoDB is the default MySQL 5.7 storage engine
-- stated here to be as clear as possible. 
-- Also, latin1 is default charset
