# Secure Deploy Checklist (from your PowerShell)

## Step 1: open only the Node path in this session
```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
```

## Step 2: if you get a script execution error
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

## Step 3: verify tools
```powershell
node --version
npm --version
```

## Step 4: install project dependencies
```powershell
npm install
```

## Step 5: start local server
```powershell
npm run dev
```
Then open `http://localhost:3000`.

## Step 6: sync local branches (if needed)
```powershell
git checkout main
git push origin main
```

## Step 7: protect main on GitHub
- Go to `https://github.com/angels79977-maker/DEMO-ZAPATERIA/settings/branches`
- Add rule → Branch name: `main`
  - Require PR => ✅
  - Require 1 approval => ✅
  - Pass status checks => ✅
  - No force pushes => ✅
  - No delete => ✅

## Step 8: create PR dev → main
- Go to `https://github.com/angels79977-maker/DEMO-ZAPATERIA/compare/dev...main`
- Click Create Pull Request
- Wait for green CI and Merge

## Step 9: connect Vercel
- Go to Vercel → Add New Project → import `DEMO-ZAPATERIA`
- Framework: Next.js
- Build: `npm run build` or `npx next build`
- Output: `.next`
- Install: `npm install`
- Production Branch: `main`

## Step 10: production deploy
- Trigger deploy from Vercel or merge the PR
- Verify domain and SSL in Vercel settings
