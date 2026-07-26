# Checklist para deploy seguro (desde tu PowerShell)

## Paso 1: abrir solo la ruta de Node en esta sesión
```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
```

## Paso 2: si te sale error de ejecución de scripts
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

## Paso 3: validar herramientas
```powershell
node --version
npm --version
```

## Paso 4: instalar dependencias del proyecto
```powershell
npm install
```

## Paso 5: levantar servidor local
```powershell
npm run dev
```
Luego abrí `http://localhost:3000`.

## Paso 6: sincronizar ramas locales (si es necesario)
```powershell
git checkout main
git push origin main
```

## Paso 7: proteger main en GitHub
- Ve a `https://github.com/angels79977-maker/DEMO-ZAPATERIA/settings/branches`
- Add rule → Branch name: `main`
  - Require PR => ✅
  - Require 1 approval => ✅
  - Pass status checks => ✅
  - No force pushes => ✅
  - No delete => ✅

## Paso 8: crear PR dev → main
- Ir a `https://github.com/angels79977-maker/DEMO-ZAPATERIA/compare/dev...main`
- Clicar Create Pull Request
- Esperar CI verde y hacer Merge

## Paso 9: conectar Vercel
- Ir a Vercel → Add New Project → importar `DEMO-ZAPATERIA`
- Framework: Next.js
- Build: `npm run build` o `npx next build`
- Output: `.next`
- Install: `npm install`
- Production Branch: `main`

## Paso 10: deploy de producción
- Trigger deploy desde Vercel o mergear el PR
- Verificar dominio y SSL en Vercel settings
