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

INSERT INTO users (email,password_hash) 
VALUES ('teste@teste.com', 'scrypt:32768:8:1$Do2PnNPVTVh8g1CJ$e0e1b8f750533fab6837df8ebd9cc23dd7c37161ef21a617c273eb31a378d05243b21539f03b11651dfea345165b30d2fe0b6954f0f7f86868ff4d11332fd397')
