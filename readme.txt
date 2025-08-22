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
# Debug - VScdoe
# ======================
 
3. Após isso, basta ativar o debugger (configuração de espera do backend):
    3.1 - Clicar no ícone de debug no vsCode;
    3.2 - Escolher "Python Debugger: Debug using launch.json";
    3.3 - Escolher "Attach to Python in Docker"