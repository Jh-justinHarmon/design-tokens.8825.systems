# Migration Guide: Switching Apps to @8825/design-tokens Package

**Status:** ✅ Proven with Capsule in both local and Replit environments

---

## Overview

This guide shows how to migrate any 8825.systems app from the brittle `../../../shared/design-tokens/tokens.css` path to the robust `@8825/design-tokens` package.

**Benefits:**
- ✅ Works in both local and Replit environments
- ✅ No more "Can't resolve" crashes
- ✅ Single source of truth for all design tokens
- ✅ Automatic updates when tokens change
- ✅ Proper versioning and rollback support

---

## Prerequisites

**Package Requirements:**
- `package.json` must include `scripts/` folder in `files` array
- `postinstall` script must run `node scripts/build.js`
- `tokens/` and `build/` folders must be in `files` array

**Why:** When installing from GitHub, npm needs these files to build the tokens automatically.

---

## Migration Steps (Per App)

### 1. Update `client/src/index.css`

**Before:**
```css
@import url('../../../shared/design-tokens/tokens.css');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

**After:**
```css
@import "@8825/design-tokens/build/tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2. Install Package Locally

```bash
cd /path/to/app
npm install github:Jh-justinHarmon/design-tokens.8825.systems
```

**What happens:**
- npm downloads the package from GitHub
- `postinstall` script runs automatically
- `scripts/build.js` generates `build/tokens.css`
- Package is ready to use

### 3. Test Local Build

```bash
npm run build
```

**Expected result:**
- ✅ Build completes without errors
- ✅ No "Can't resolve" messages
- ✅ CSS bundle includes design tokens

### 4. Commit Changes

```bash
git add client/src/index.css package.json package-lock.json
git commit -m "Migrate to @8825/design-tokens package"
git push origin main
```

### 5. Test in Replit

**In Replit Shell:**
```bash
git pull origin main
npm install
npm run build
```

**Expected result:**
- ✅ `postinstall` runs and builds tokens
- ✅ App builds successfully
- ✅ App runs without crashes

---

## Troubleshooting

### Error: "Cannot find module 'scripts/build.js'"

**Cause:** Package doesn't include `scripts/` folder.

**Fix:** Ensure `package.json` in design-tokens repo has:
```json
{
  "files": [
    "build/",
    "tokens/",
    "scripts/"
  ]
}
```

### Error: "ENOENT: no such file or directory, open 'build/tokens.css'"

**Cause:** `postinstall` script didn't run or failed.

**Fix:** Manually build in the package:
```bash
cd node_modules/@8825/design-tokens
node scripts/build.js
cd ../..
npm run build
```

### Build succeeds locally but fails in Replit

**Cause:** Replit didn't run `npm install` after `git pull`.

**Fix:** Always run `npm install` after pulling in Replit:
```bash
git pull origin main
npm install  # This runs postinstall
npm run build
```

---

## Apps to Migrate (7 remaining)

| App | Status | Priority |
|-----|--------|----------|
| **Capsule** | ✅ Complete | Canary |
| **RALapp** | ⏳ Pending | Beta |
| **TGIF** | ⏳ Pending | Beta |
| **task-board** | ⏳ Pending | Stable |
| **smart-pdf-companion** | ⏳ Pending | Stable |
| **gamemaker** | ⏳ Pending | Stable |
| **8825-Export-Portal** | ⏳ Pending | Stable |
| **Accounting-Tools** | ⏳ Pending | Stable |

---

## Rollout Strategy

### Three-Tier Approach

**Tier 1: Canary (Capsule)**
- ✅ Already migrated and tested
- Purpose: Validate package works in production

**Tier 2: Beta (RALapp, TGIF)**
- Migrate after 24h Capsule soak
- Purpose: Validate across different app structures

**Tier 3: Stable (Remaining 5)**
- Migrate after Beta validation
- Purpose: Full rollout

### Migration Order

1. ✅ **Capsule** (Done)
2. **RALapp** (Next)
3. **TGIF** (Next)
4. **task-board**
5. **smart-pdf-companion**
6. **gamemaker**
7. **8825-Export-Portal**
8. **Accounting-Tools**

---

## Verification Checklist

After migrating each app:

- [ ] Local build succeeds
- [ ] Replit build succeeds
- [ ] App runs without crashes
- [ ] UI colors match 8825 Brand Blue
- [ ] Dark mode works correctly
- [ ] No console errors related to CSS
- [ ] Git changes committed and pushed

---

## Key Learnings from Capsule Migration

### What Worked

1. **Package structure:** Including `scripts/`, `tokens/`, and `build/` in `files` array
2. **Postinstall script:** Automatically builds tokens after install
3. **Import path:** `@import "@8825/design-tokens/build/tokens.css";`
4. **GitHub installation:** `npm install github:Jh-justinHarmon/design-tokens.8825.systems`

### What Didn't Work (Initially)

1. ❌ Not including `scripts/` folder → postinstall failed
2. ❌ Using relative path `../../../shared/` → broke in Replit
3. ❌ Assuming `npm install` would auto-build → needed postinstall script

### Critical Success Factors

- **Postinstall script** must be in `package.json`
- **Scripts folder** must be in `files` array
- **Always run `npm install`** after `git pull` in Replit
- **Test in both environments** before marking complete

---

## Next Steps

1. Migrate RALapp and TGIF (Beta tier)
2. Monitor for 24 hours
3. Migrate remaining 5 apps (Stable tier)
4. Delete old `shared/design-tokens/` folder
5. Update documentation to reflect package-based system

---

## Support

**If migration fails:**
1. Check this guide's troubleshooting section
2. Verify package.json includes all required files
3. Test postinstall script manually
4. Compare to Capsule (working example)

**Package repo:** https://github.com/Jh-justinHarmon/design-tokens.8825.systems
**Execution plan:** `8825_core/intelligence/projects/design_tokens/EXECUTION_PLAN.md`
