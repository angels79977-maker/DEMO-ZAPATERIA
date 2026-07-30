# Secure Workflow: PASO FIRME

## Branches
- `main` → production. Protected. Only merge from `dev`.
- `dev` → integration. Vercel Previews.
- `feature/*` → daily work.

## Steps
1. Create branch: `git checkout -b feature/my-change`
2. Atomic commit: `git commit -m "feat: ..."`
3. Push: `git push origin feature/my-change`
4. Open PR to `dev`.
5. Review and merge into `dev`. Preview deploy on Vercel.
6. Open PR `dev` → `main`. Review + merge.
7. Production deploy on Vercel.

## `main` Protection on GitHub
Settings → Branches → Add branch protection rule:
- Branch name pattern: `main`
- Require a pull request before merging ⇒ ✅
- Require approvals: 1 ⇒ ✅
- Require status checks to pass ⇒ ✅
- Do not allow force pushes ⇒ ✅
- Do not allow deletions ⇒ ✅

## Vercel
Import repo: `https://github.com/angels79977-maker/DEMO-ZAPATERIA`
- Framework: Next.js
- Build: `pnpm build`
- Dev: `pnpm dev`
- Production branch: `main`
- Preview branches: `dev` and PRs

## GitHub CLI Auth (if you want to use `gh`)
```powershell
gh auth login --web
```
Copy the one-time code from the printed URL, authorize in the browser, and return to the terminal.
