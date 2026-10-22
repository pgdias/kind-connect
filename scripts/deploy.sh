#!/bin/bash
set -e

# Deploy script for kind-connect
# Usage: ./deploy.sh

set -e

SSH_PATH="${SSH_PATH:-/opt/kind-connect}"

echo "🚀 Iniciando deploy..."

mkdir -p "$SSH_PATH"
cd "$SSH_PATH"

# Create .env if it doesn't exist
if [ ! -f .env ]; then
  cat > .env << 'ENVEOF'
DATABASE_URL=postgres://postgres:8js72nd723ng00s12k@db:5432/blinda
NODE_ENV=production
ENVEOF
  echo "✅ .env criado"
fi

# Pull latest image
echo "📥 Baixando imagem mais recente..."
docker compose pull

# Stop and remove old containers
echo "🛑 Parando containers antigos..."
docker compose down --remove-orphans

# Start new containers
echo "🚀 Iniciando containers..."
docker compose up -d

# Clean up old images
echo "🧹 Limpando imagens antigas..."
docker image prune -f

echo "✅ Deploy concluído com sucesso!"