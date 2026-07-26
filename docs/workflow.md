# Flujo de trabajo seguro: PASO FIRME

## Ramas
- `main` → producción. Protegida. Solo merge desde `dev`.
- `dev` → integración. Previews de Vercel.
- `feature/*` → trabajo diario.

## Pasos
1. Crear rama: `git checkout -b feature/mi-cambio`
2. Commit atómico: `git commit -m "feat: ..."`
3. Push: `git push origin feature/mi-cambio`
4. Abrir PR a `dev`.
5. Revisar y merge en `dev`. Preview deploy en Vercel.
6. Abrir PR `dev` → `main`. Revisión + merge.
7. Deploy producción en Vercel.

## Protección de `main` en GitHub
Settings → Branches → Add branch protection rule:
- Branch name pattern: `main`
- Require a pull request before merging ⇒ ✅
- Require approvals: 1 ⇒ ✅
- Require status checks to pass ⇒ ✅
- Do not allow force pushes ⇒ ✅
- Do not allow deletions ⇒ ✅

## Vercel
Importar repo: `https://github.com/angels79977-maker/DEMO-ZAPATERIA`
- Framework: Next.js
- Build: `pnpm build`
- Dev: `pnpm dev`
Production branch: `main`
Preview branches: `dev` y PRs

## Auth de GitHub CLI (si querés usar `gh`)
```powershell
gh auth login --web
```
Copiar el código one-time en la URL que imprime, autorizar en el navegador y volver a la terminal.
