Enviado .envs juntamente ao projeto para que seja possível executar aplicação (Não se deve enviar arquivos de configuração para o git).

Passos para executar o projeto:

# ======================
# Git
# ======================

1. Clone este repositório

git clone https://github.com/ryud1/StationProject.git
cd StationProject

# ======================
# Docker
# ======================

2. Buildar e subir o projeto (Docker):
docker compose up --build

# ======================
# Node Modules
# ======================

3. Instalar node_modules:
    3.1: Abrir a pasta frontend pelo terminal.
    3.2: Executar o seguinte comando: npm install.

# ======================
# Banco de Dados
# ======================

4. Rodar script de banco - Criação:
    4.1 - Rodar o seguinte comando no terminal do postgres ou no terminal da aplicação: docker exec -i <nome do Container> psql -U postgres -c "CREATE DATABASE estacoes_db;" 
    4.2 Substituir <nome do Container> pelo nome criado.

# ======================
# Debug - VScdoe
# ======================

 5. Após isso, basta ativar o debugger (configuração de espera do backend):
    5.1 - Clicar no ícone de debug no vsCode;
    5.2 - Escolher "Python Debugger: Debug using launch.json";
    5.3 - Escolher "Attach to Python in Docker"