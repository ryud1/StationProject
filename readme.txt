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
# Banco de Dados
# ======================

3. Rodar script de banco - Criação:
    3.1 - Rodar o seguinte comando no terminal do postgres ou no terminal da aplicação: docker exec -i <nome do Container> psql -U postgres -c "CREATE DATABASE estacoes_db;" 
    3.2 Substituir <nome do Container> pelo nome criado.

# ======================
# Debug - VScdoe
# ======================
 4. Após isso, basta ativar o debugger (configuração de espera do backend):
    4.1 - Clicar no ícone de debug no vsCode;
    4.2 - Escolher "Python Debugger: Debug using launch.json";
    4.3 - Escolher "Attach to Python in Docker"