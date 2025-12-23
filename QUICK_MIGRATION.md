# Quick Migration: 5-Minute Checklist

Copy-paste commands for migrating any app to `@8825/design-tokens`.

---

## Step 1: Update CSS Import (1 min)

**File:** `client/src/index.css`

**Find:**
```css
@import url('../../../shared/design-tokens/tokens.css');
```

**Replace with:**
```css
@import "@8825/design-tokens/build/tokens.css";
```

---

## Step 2: Install Package Locally (2 min)

```bash
cd /path/to/app
npm install github:Jh-justinHarmon/design-tokens.8825.systems
npm run build
```

**Expected:** Build succeeds, no errors.

---

## Step 3: Commit & Push (1 min)

```bash
git add client/src/index.css package.json package-lock.json
git commit -m "Migrate to @8825/design-tokens package"
git push origin main
```

---

## Step 4: Test in Replit (1 min)

**In Replit Shell:**
```bash
git pull origin main
npm install
npm run build
```

**Expected:** App builds and runs without crashes.

---

## ✅ Done!

**If it fails:** See `MIGRATION_GUIDE.md` troubleshooting section.

**Apps remaining:**
- RALapp
- TGIF
- task-board
- smart-pdf-companion
- gamemaker
- 8825-Export-Portal
- Accounting-Tools
