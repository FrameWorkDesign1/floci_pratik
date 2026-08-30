#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-production}"

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "Missing CLOUDFLARE_API_TOKEN. Export it before running this script."
  exit 1
fi

if [[ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  echo "Missing CLOUDFLARE_ACCOUNT_ID. Export it before running this script."
  exit 1
fi

npm install
npx wrangler deploy --env "$ENVIRONMENT"

echo "Deployment complete for environment: $ENVIRONMENT"
