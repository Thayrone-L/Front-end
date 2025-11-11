Sistema de Reservas

Este projeto foi desenvolvido para gerenciar reservas de salas de forma prática e centralizada. Ele é composto por um back-end em .NET 8 e um front-end em React 18, com autenticação via JWT, cadastro de salas, localizações, usuários e controle completo de reservas por meio de um painel visual com calendário integrado.

Back-end

O back-end foi construído com .NET 8 e segue uma arquitetura em camadas, o que facilita a manutenção e a escalabilidade do sistema.

Tecnologias utilizadas:

.NET 8: escolhido pela estabilidade e pelo suporte nativo a APIs REST bem estruturadas.

Entity Framework Core 9 com SQLite: simplifica o acesso a dados e permite criar o banco local automaticamente, sem necessidade de configurar um servidor.

JWT (JSON Web Token): usado para autenticação e autorização seguras.

Swagger: integrado para documentar e testar a API de forma rápida.

Service-Repository Pattern: separa a lógica de negócio do acesso a dados, tornando o código mais limpo e fácil de evoluir.

DTOs: usados para transferir dados entre camadas sem expor diretamente as entidades do banco.

Injeção de dependência: garante desacoplamento e facilita a criação de testes.

A arquitetura segue o padrão Controller → Service → Repository:

Os controllers recebem as requisições e direcionam o fluxo.

Os services concentram a lógica de negócio e validações.

Os repositories cuidam da comunicação com o banco de dados.

Essa estrutura ajuda a manter o código organizado e de fácil entendimento.

Como executar:

Instalar o .NET 8 SDK.

Como rodar o back-end:

Repositório do Back-end: https://github.com/Thayrone-L/Back-end

Passo à passo no terminal:

dotnet restore
dotnet build
dotnet run

A API será executada em https://localhost:7181

Banco de dados:
O SQLite é criado automaticamente com base na string de conexão:
"ConnectionStrings": {
"DefaultConnection": "Data Source=reservas.db"
}

Autenticação JWT:
Apenas os endpoints de login e registro são públicos. Todos os outros exigem um token JWT válido no cabeçalho Authorization:
Bearer <token>

Front-end

Repositório:

https://github.com/Thayrone-L/Front-end

O front-end foi desenvolvido em React 18, com foco em desempenho e simplicidade na experiência do usuário.

Tecnologias utilizadas:

React 18: permite criar uma interface dinâmica e modular.

Material-UI: fornece componentes prontos e responsivos, garantindo um design consistente.

FullCalendar: usado para exibir e interagir com as reservas de forma visual e intuitiva.

Vite: utilizado como bundler por sua velocidade e suporte moderno a ESModules.

Fetch API: responsável pela comunicação direta com a API.

Estrutura:

/src/components: componentes reutilizáveis como modais, botões e formulários.

/src/pages: telas principais (Dashboard, Reservas, Salas, Localizações e Usuários).

/src/services: centraliza as chamadas à API.

/src/App.jsx: roteamento e layout principal da aplicação.

Como executar:

Instalar Node.js e npm.

Criar o arquivo .env na raiz com:
VITE_API_URL=https://localhost:7181/api

Instalar dependências e iniciar o projeto:
npm install
npm run dev

Funcionalidades

Autenticação de usuários com JWT.

Dashboard com calendário interativo de reservas.

CRUD completo de reservas, salas, localizações e usuários.

Armazenamento local com SQLite.

Interface moderna e responsiva com Material-UI.

Usuário padrão para login:
Login: teste
Senha: 123456

Motivação das escolhas

A ideia foi unir tecnologias modernas e maduras que se complementam.
O .NET 8 oferece segurança, tipagem forte e ótima performance para APIs REST.
O React 18, aliado ao Material-UI, garante uma experiência fluida e um desenvolvimento ágil no front-end.
O SQLite foi adotado para simplificar a configuração e permitir testes locais sem necessidade de infraestrutura adicional.
A arquitetura com DTOs, injeção de dependência e Service-Repository Pattern reflete boas práticas de engenharia de software, priorizando clareza, manutenção e escalabilidade.
