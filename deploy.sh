#!/bin/bash
# deploy.sh — ship a BASE32 generated site to Vercel
#
# Usage:
#   ./deploy.sh                    # deploys the ./site folder (preview)
#   ./deploy.sh --prod             # production
#   ./deploy.sh --project <slug>   # override project slug
#
# Requirements:
#   - Vercel CLI:  npm i -g vercel
#   - Logged in:   vercel login
#
# Output:
#   - Preview URL echoed to stdout
#   - Written to ./deploy_url.txt + ./deploy_result.json for the factory

set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

# Source .env from skill root if it exists (factory scheduler use case)
SKILL_ENV="$DIR/../../.env"
if [ -f "$SKILL_ENV" ]; then
  set -a
  source "$SKILL_ENV"
  set +a
fi

PROJECT_SLUG="heyjulia-preview"
PROD_FLAG=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --prod) PROD_FLAG="--prod"; shift ;;
    --project) PROJECT_SLUG="$2"; shift 2 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

[ -d "site" ] || { echo "ERROR: ./site folder not found"; exit 1; }
[ -f "site/vercel.json" ] || { echo "ERROR: site/vercel.json missing"; exit 1; }
command -v vercel >/dev/null 2>&1 || { echo "ERROR: Vercel CLI not installed. Run: npm i -g vercel"; exit 1; }
vercel whoami >/dev/null 2>&1 || { echo "ERROR: Not logged in. Run: vercel login"; exit 1; }

echo "↗  Deploying ./site to Vercel as $PROJECT_SLUG $PROD_FLAG..."
START_AT=$(date +%s)

URL=$(cd site && vercel deploy --yes --name "$PROJECT_SLUG" $PROD_FLAG 2>&1 | tail -n 1)

ELAPSED=$(( $(date +%s) - START_AT ))

[[ "$URL" == https://* ]] || { echo "ERROR: deploy did not return a URL. Last line: $URL"; exit 1; }

echo "✓  Deployed in ${ELAPSED}s"
echo "✓  URL: $URL"

echo "$URL" > deploy_url.txt
cat > deploy_result.json <<EOF
{
  "url": "$URL",
  "project": "$PROJECT_SLUG",
  "deployed_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "elapsed_seconds": $ELAPSED,
  "prod": $([ -n "$PROD_FLAG" ] && echo true || echo false)
}
EOF
echo "✓  deploy_url.txt + deploy_result.json written"
