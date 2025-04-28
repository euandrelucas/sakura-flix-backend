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

# Copiar o entrypoint para o container
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Compilar a aplicação (caso esteja usando TypeScript)
RUN yarn build

# Expor a porta 3000 (dentro do container)
EXPOSE 3000

# Usar o entrypoint (ele vai cuidar de migrar e depois startar)
ENTRYPOINT ["/entrypoint.sh"]
