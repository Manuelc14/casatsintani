param(
  [string]$Server = "147.93.88.117",
  [int]$Port = 65002,
  [string]$User = "u315228544"
)

$ErrorActionPreference = "Stop"

# Ruta fija en el server (la misma que usaste a mano)
$RemoteWebRoot = "/home/u315228544/domains/casatsintani.com/public_html"

Write-Host "==> Iniciando build de Astro..."
pnpm build
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERROR: la build de Astro falló." -ForegroundColor Red
  exit 1
}

Write-Host "==> Empaquetando ./dist en dist.tar.gz..."
if (-not (Test-Path "./dist")) {
  Write-Host "ERROR: la carpeta ./dist no existe." -ForegroundColor Red
  exit 1
}

if (Test-Path "dist.tar.gz") {
  Remove-Item "dist.tar.gz" -Force
}

tar -czf "dist.tar.gz" -C "./dist" .
if ($LASTEXITCODE -ne 0 -or -not (Test-Path "dist.tar.gz")) {
  Write-Host "ERROR: no se pudo crear dist.tar.gz." -ForegroundColor Red
  exit 1
}

Write-Host "==> Subiendo dist.tar.gz al HOME del servidor (scp ~)..."
# OJO: sin ruta → va directo a ~ del usuario
scp -P $Port "dist.tar.gz" "${User}@${Server}:dist.tar.gz"
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERROR: la subida con scp falló." -ForegroundColor Red
  exit 1
}

Write-Host "==> Ejecutando comandos en el servidor..."

# Comando remoto TODO en una sola línea para evitar problemas de \r
$remoteCmd = "cd '$RemoteWebRoot'; echo 'Eliminando archivos antiguos...'; find . -mindepth 1 -maxdepth 1 ! -name 'default.php.bak' -exec rm -rf {} +; echo 'Moviendo paquete desde HOME...'; mv ~/dist.tar.gz ./dist.tar.gz; echo 'Descomprimiendo nuevo build...'; tar -xzf dist.tar.gz; rm dist.tar.gz; echo 'Corrigiendo permisos...'; find . -type d -exec chmod 755 {} +; find . -type f -exec chmod 644 {} +; echo 'Deploy completado correctamente.'"

ssh -p $Port "${User}@${Server}" "$remoteCmd"
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERROR: falló el comando remoto." -ForegroundColor Red
  exit 1
}

Write-Host "==> Deploy finalizado con éxito en https://casatsintani.com" -ForegroundColor Green
