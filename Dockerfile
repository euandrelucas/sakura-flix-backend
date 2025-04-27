# Imagem base oficial do Node
FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile

# Copiar todo o restante da aplicação
COPY . .

# Compilar a aplicação (caso esteja usando TypeScript)
RUN yarn build

# Expor a porta 3000 (dentro do container)
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["yarn", "start:prod"]
