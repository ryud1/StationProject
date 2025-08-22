CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS stations (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    carregamento_tipo VARCHAR(100) NOT NULL, 
    poder FLOAT NOT NULL,                  
    slots INTEGER NOT NULL,                
    status VARCHAR(100) NOT NULL,            
    uf CHAR(2) NOT NULL                    
);
