
# Device Manager

Essa API Rest desenvolvida em Nest.js é responsável por gerenciar dispositivos IoT, permitindo a criação, leitura, atualização e remoção de dispositivos. Além disso, a API implementa um Websocket para emitir uma mensagem toda vez que um dispositivo for criado ou atualizado.

Os testes foram desenvolvidos utilizando o framework Jest e as validações com a biblioteca Joi. A API foi containerizada utilizando Docker, e o banco de dados utilizado foi o MongoDB com a biblioteca Mongoose.

## Tecnologias utilizadas

-   [Nest.js](https://nestjs.com/)  - Framework para desenvolvimento de aplicações em Node.js.
-   [Mongoose](https://mongoosejs.com/)  - ODM para o banco de dados MongoDB.
-   [Jest](https://jestjs.io/)  - Biblioteca de testes em JavaScript.
-   [Docker](https://www.docker.com/)  - Plataforma para desenvolvimento, envio e execução de aplicações.
-   [Websocket](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSocket)  - Protocolo que permite persistir conexões TCP entre o servidor e o cliente.
-   [Joi](https://joi.dev/)  - Biblioteca para validação de dados.


## Como rodar a API

Para rodar a API, você precisará ter o  [Docker](https://www.docker.com/)  instalado na sua máquina. Se preferir, também é possível rodar a aplicação sem ele, basta seguir as instruções na seção "Rodando sem Docker".

1.  Clone o repositório:

`https://github.com/dev-luizf/device-manager.git`

2.  Entre na pasta do projeto:

`cd device-manager`

3.  Crie um arquivo  `.env`  na raiz do projeto com as seguintes variáveis::

```
MONGO_URI="mongodb://localhost:27017/device-manager"

```

5.  Rode o Docker Compose:

`npm run compose:up`

4.  Acesse a API em  `http://localhost:3001`.

## Rodando sem Docker

Se você preferir não utilizar o Docker, siga as instruções abaixo.

1.  Clone o repositório:

`https://github.com/dev-luizf/device-manager.git`

2.  Entre na pasta do projeto:

`cd device-manager`

3.  Instale as dependências:

`npm install`

4.  Crie um arquivo  `.env`  na raiz do projeto com as seguintes variáveis:

`MONGO_URI="mongodb://localhost:27017/device-manager"`

6.  Inicie o servidor:

`npm run start:dev`

7.  Acesse a API em  `http://localhost:3001`.

## Endpoints

### GET /devices

Retorna a lista de todos os dispositivos.

### GET /devices/:id

Retorna as informações de um dispositivo específico.

### POST /devices

Cria um novo dispositivo.

### PUT /devices/:id

Atualiza as informações de um dispositivo existente.

### DELETE /devices/:id

Exclui um dispositivo existente.


## Testes

A API possui testes unitários escritos com a biblioteca Jest. Para roda-los, execute o seguinte comando:

`npm run test`