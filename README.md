<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">🎬 SakuraFlix Backend</h1>

<p align="center">
  API backend para o sistema de streaming <strong>SakuraFlix</strong>, construída com <a href="https://nestjs.com">NestJS</a>, <a href="https://www.prisma.io">Prisma ORM</a>, <a href="https://www.postgresql.org/">PostgreSQL</a> e autenticação com <a href="https://next-auth.js.org/">NextAuth</a>.
</p>

<p align="center">
  <a href="https://img.shields.io/github/license/euandrelucas/sakura-flix-backend"><img src="https://img.shields.io/github/license/euandrelucas/sakura-flix-backend" alt="License"></a>
  <a href="https://img.shields.io/badge/NestJS-%E2%9C%94-red"><img src="https://img.shields.io/badge/NestJS-%E2%9C%94-red" alt="NestJS"></a>
  <a href="https://img.shields.io/badge/PostgreSQL-%E2%9C%94-blue"><img src="https://img.shields.io/badge/PostgreSQL-%E2%9C%94-blue" alt="PostgreSQL"></a>
</p>

---

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [dotenv](https://www.npmjs.com/package/dotenv) (variáveis de ambiente)

---

## 📦 Instalação

```bash
# Clonar o projeto
git clone https://github.com/euandrelucas/sakura-flix-backend.git
cd sakura-flix-backend

# Instalar as dependências
npm install
# ou
yarn install
```

---

## 🛠️ Rodando o projeto

```bash
# Gerar o cliente Prisma
npx prisma generate

# Aplicar as migrations
npx prisma migrate dev

# Rodar em desenvolvimento
npm run start:dev
```

---

## 📦 Build para produção

```bash
npm run build
npm run start:prod
```

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 📬 Contato

Desenvolvido por [André Lucas Teixeira Paiva](mailto:contact@andrepaiva.dev)  
Conheça o frontend completo: [SakuraFlix](https://github.com/euandrelucas/sakura-flix-frontend)
