#!/bin/sh

echo "⏳ Aguardando banco de dados ficar disponível..."

# Espera até o banco de dados responder na porta 5432
until nc -z sakuraflix-db 5432; do
  sleep 1
done

echo "✅ Banco de dados está pronto!"

# Rodar as migrations
echo "🚀 Rodando migrations..."
yarn prisma migrate deploy

# Iniciar a aplicação em produção
echo "🎬 Iniciando aplicação..."
yarn start:prod
