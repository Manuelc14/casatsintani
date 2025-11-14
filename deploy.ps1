[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

param(
  [string]$Server = "147.93.88.117",
  [int]$Port = 65002,
  [string]$User = "u315228544",
  [string]$RemotePath = "/home/u315228544/domains/casatsintani.com/public_html"
)

Write-Host "🚀 Iniciando build de Astro..." -ForegroundColor Cyan
pnpm build
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Error: la build falló. Revisa el log." -ForegroundColor Red
  exit 1
}

Write-Host "📦 Empaquetando carpeta dist..." -ForegroundColor Yellow
$tarPath = Resolve-Path ".\dist"
$tarFile = "dist.tar.gz"
if (Test-Path $tarFile) { Remove-Item $tarFile -Force }
tar -C $tarPath -czf $tarFile .

if (-not (Test-Path $tarFile)) {
  Write-Host "❌ No se generó el archivo $tarFile." -ForegroundColor Red
  exit 1
}

Write-Host "📤 Subiendo paquete al servidor..." -ForegroundColor Yellow
scp -P $Port $tarFile "${User}@${Server}:${RemotePath}/"

Write-Host "🧹 Desempaquetando y actualizando servidor..." -ForegroundColor Yellow
ssh -p $Port "${User}@${Server}" "bash -s" <<'EOF'
set -e
cd /home/u315228544/domains/casatsintani.com/public_html
echo "Eliminando archivos antiguos..."
find . -mindepth 1 -maxdepth 1 ! -name "default.php.bak" -exec rm -rf {} +
echo "Descomprimiendo nuevo build..."
tar -xzf dist.tar.gz
rm dist.tar.gz
echo "Corrigiendo permisos..."
find . -type d -exec chmod 755 {} +
find . -type f -exec chmod 644 {} +
echo "✅ Deploy completado correctamente."
EOF

Write-Host "🎉 Deploy finalizado con éxito en https://casatsintani.com" -ForegroundColor Green
