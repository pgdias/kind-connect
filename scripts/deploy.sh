#!/usr/bin/env bash
set -Eeuo pipefail

SSH_PATH="${SSH_PATH:-/root/kind-connect}"

echo "==> Iniciando deploy em ${SSH_PATH}"
cd "${SSH_PATH}"

if [[ ! -f docker-compose.yml ]]; then
  echo "ERRO: docker-compose.yml não encontrado em ${SSH_PATH}" >&2
  exit 1
fi

if [[ ! -f .env ]]; then
  echo "ERRO: arquivo .env ausente. Crie-o no servidor com POSTGRES_PASSWORD antes do deploy." >&2
  exit 1
fi

if ! grep -qE '^POSTGRES_PASSWORD=.+$' .env; then
  echo "ERRO: .env precisa conter POSTGRES_PASSWORD com a senha do banco." >&2
  exit 1
fi

echo "==> Validando configuração do Docker Compose"
docker compose config -q

echo "==> Baixando imagens"
docker compose pull

echo "==> Atualizando serviços sem derrubar a versão atual antecipadamente"
docker compose up -d --remove-orphans --wait --wait-timeout 120

echo "==> Estado dos serviços"
docker compose ps

echo "==> Limpando imagens não utilizadas"
docker image prune -f

echo "==> Deploy concluído"
