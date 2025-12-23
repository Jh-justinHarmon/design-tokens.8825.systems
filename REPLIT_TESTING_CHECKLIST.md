# Replit Testing Checklist

**Purpose:** Verify all 8 apps work in Replit after design tokens migration

**Date:** December 22, 2025  
**Status:** 1/8 complete (Capsule verified)

---

## Testing Protocol

For each app, run these commands in Replit Shell:

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install dependencies (triggers postinstall)
npm install

# 3. Build app
npm run build

# 4. Start app (if build succeeds)
npm run dev
```

**Expected Results:**
- ✅ `npm install` completes without errors
- ✅ Postinstall builds tokens automatically
- ✅ `npm run build` succeeds
- ✅ App starts without crashes
- ✅ UI renders with correct 8825 Brand Blue colors
- ✅ Dark mode works

---

## Apps to Test

### ✅ Tier 1: Canary (Complete)

- [x] **Capsule** - Verified working in Replit
  - Replit: https://replit.com/@JustinHarmon/Capsule-8825systems
  - Status: ✅ Build succeeds, app runs
  - Notes: First successful migration

### ⏳ Tier 2: Beta (Pending)

- [ ] **RALapp**
  - Replit: https://replit.com/@JustinHarmon/RALapp8825systems
  - Commit: `d4bf926`
  - Priority: High (production app)

- [ ] **TGIF**
  - Replit: https://replit.com/@JustinHarmon/TGIF8825systems
  - Commit: `798ea0f`
  - Priority: High (production app)

### ⏳ Tier 3: Stable (Pending)

- [ ] **task-board**
  - Replit: TBD
  - Commit: `ba88dd0`
  - Priority: Medium

- [ ] **smart-pdf-companion**
  - Replit: TBD
  - Commit: `677c35c`
  - Priority: Medium

- [ ] **gamemaker**
  - Replit: TBD
  - Commit: `44529dd`
  - Priority: Medium

- [ ] **8825-Export-Portal**
  - Replit: TBD
  - Commit: `cbb3357`
  - Priority: Medium

- [ ] **Accounting-Tools**
  - Replit: TBD
  - Commit: `9c75bf8`
  - Priority: Medium

---

## Testing Template

Copy this for each app:

```markdown
### [App Name]

**Date Tested:** [Date]  
**Tester:** [Name]  
**Replit URL:** [URL]

**Commands Run:**
```bash
git pull origin main
npm install
npm run build
npm run dev
```

**Results:**
- [ ] git pull: ✅ / ❌
- [ ] npm install: ✅ / ❌
- [ ] Postinstall ran: ✅ / ❌
- [ ] npm run build: ✅ / ❌
- [ ] App starts: ✅ / ❌
- [ ] UI renders: ✅ / ❌
- [ ] Colors correct: ✅ / ❌
- [ ] Dark mode works: ✅ / ❌

**Issues Found:**
[None / List issues]

**Resolution:**
[N/A / How issues were fixed]

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial
```

---

## Common Issues & Fixes

### Issue: "Cannot find module 'scripts/build.js'"

**Cause:** Package doesn't include scripts folder

**Fix:**
```bash
# In design-tokens repo
# Verify package.json has:
"files": ["build/", "tokens/", "scripts/"]

# Push update
git push origin main

# In app Replit
npm uninstall @8825/design-tokens
npm install github:Jh-justinHarmon/design-tokens.8825.systems
npm run build
```

### Issue: "ENOENT: no such file or directory, open 'build/tokens.css'"

**Cause:** Postinstall didn't run or failed

**Fix:**
```bash
# Manually build tokens
cd node_modules/@8825/design-tokens
node scripts/build.js
cd ../..
npm run build
```

### Issue: Build succeeds but app crashes

**Cause:** Unrelated to tokens migration

**Fix:**
- Check app-specific errors in console
- Review git diff for unintended changes
- Rollback if needed: `git revert HEAD`

---

## Rollback Procedure

If any app fails in Replit:

```bash
# 1. Revert migration commit
git revert HEAD

# 2. Push revert
git push origin main

# 3. In Replit: pull and rebuild
git pull origin main
npm install
npm run build
```

**Note:** Each app's previous working state is one commit before migration.

---

## Success Metrics

**Target:** 8/8 apps passing in Replit

**Current Progress:**
- ✅ Capsule: Pass
- ⏳ RALapp: Pending
- ⏳ TGIF: Pending
- ⏳ task-board: Pending
- ⏳ smart-pdf-companion: Pending
- ⏳ gamemaker: Pending
- ⏳ 8825-Export-Portal: Pending
- ⏳ Accounting-Tools: Pending

**Completion:** 12.5% (1/8)

---

## Timeline

**Phase 1:** Capsule (Canary) - ✅ Complete  
**Phase 2:** RALapp + TGIF (Beta) - Target: 24 hours  
**Phase 3:** Remaining 5 (Stable) - Target: 48 hours  
**Phase 4:** 24-hour soak test - Target: 72 hours

---

## Sign-off

Once all apps pass:

- [ ] All 8 apps tested in Replit
- [ ] All builds succeed
- [ ] All apps run without crashes
- [ ] No rollbacks required
- [ ] 24-hour soak test complete
- [ ] Migration documented
- [ ] Phase 1 officially complete

**Sign-off Date:** _____________  
**Signed:** _____________

---

## Next Phase

After all apps verified in Replit:

**Phase 2: Design Token Playground**
- Visual token editor
- Live preview
- Export to package
- Documentation site

**Phase 3: CI/CD Pipeline**
- Automated testing
- GitHub Packages publishing
- Semantic versioning
- Automated deployments

**Phase 4: Full Rollout**
- All apps consuming package
- Old shared folder deleted
- Documentation updated
- Team training complete
