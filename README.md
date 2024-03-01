# O que precisa ser baixado

GUIT https://git-scm.com/downloads

NODE https://nodejs.org/en/download

DOCKER https://www.docker.com/products/docker-desktop/

# whaticket V1
====================================

### EXECUTAR DOCKER DESKTOP
docker run --name ratfixyoutube -e MYSQL_ROOT_PASSWORD=ratflix#$%#GHT -e MYSQL_DATABASE=ratflix01 -p 3306:3306 -d mysql

### WHATICKET
cd desktop
git clone https://github.com/ianvictor/whaticketv1.git

### ABRIR GIT CMD

cd Desktop

cd whaticketv1

### BACKEND
cd backend

npm install

npx sequelize db:migrate 

npx sequelize db:seed:all

npm start

### FRONTEND

cd frontend

npm install --force

$env:NODE_OPTIONS="--openssl-legacy-provider"

npm run build

npm start


login: admin@whaticket.com

senha: admin
