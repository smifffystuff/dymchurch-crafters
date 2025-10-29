# Code Quality Guide

## SonarQube Integration Summary

This document summarizes the code quality improvements made to the dymchurch-crafters project.

### Current Quality Status ✅

**Quality Gate:** PASSED  
**Last Updated:** October 29, 2025

#### Metrics Overview
- **Bugs:** 0 (in new code) ✅
- **Vulnerabilities:** 0 ✅
- **Security Rating:** A (1.0) ⭐
- **Maintainability Rating:** A (1.0) ⭐
- **Reliability Rating (New Code):** A (1.0) ⭐
- **Code Smells:** 62 (reduced from 65)
- **Duplicated Lines:** 2.3%
- **Lines of Code:** 4,756

### Recent Fixes

#### Reliability Bugs Fixed (3 total)
1. **app/dashboard/page.tsx** - Removed unused `router` variable
2. **app/dashboard/setup/page.tsx** - Removed unused `user` variable  
3. **app/api/products/route.ts** - Removed useless initial assignment to `sortOptions`

#### Code Smells Fixed (3 total)
1. **app/api/admin/crafters/[id]/approve/route.ts** - Used optional chain expression
2. **app/api/admin/crafters/[id]/reject/route.ts** - Used optional chain expression
3. **app/api/admin/crafters/pending/route.ts** - Used optional chain expression

### Best Practices

#### 1. Avoid Unused Variables
❌ **Bad:**
```typescript
const router = useRouter(); // Declared but never used
const { user } = useUser(); // Destructured but never used
```

✅ **Good:**
```typescript
// Only declare variables you actually use
const router = useRouter();
router.push('/somewhere'); // Actually use it
```

#### 2. Use Optional Chaining
❌ **Bad:**
```typescript
if (!user || user.role !== 'admin') {
  // handle error
}
```

✅ **Good:**
```typescript
if (user?.role !== 'admin') {
  // handle error
}
```

#### 3. Avoid Useless Assignments
❌ **Bad:**
```typescript
let sortOptions = { createdAt: -1 }; // Gets immediately overwritten
switch (sortBy) {
  case 'price':
    sortOptions = { price: 1 };
    break;
  default:
    sortOptions = { createdAt: -1 };
}
```

✅ **Good:**
```typescript
let sortOptions; // Declare without initializing
switch (sortBy) {
  case 'price':
    sortOptions = { price: 1 };
    break;
  default:
    sortOptions = { createdAt: -1 };
}
```

### ESLint Configuration

The project uses ESLint to catch common code quality issues automatically. Run linting with:

```bash
npm run lint
```

Current ESLint rules in `.eslintrc.json`:
- `no-unused-vars`: Catches unused variables (warning)
- `no-nested-ternary`: Discourages nested ternary operators (warning)

### Continuous Improvement

To maintain code quality:

1. **Run linting before committing:**
   ```bash
   npm run lint
   ```

2. **Check SonarQube dashboard regularly:**
   - Visit your SonarCloud project at https://sonarcloud.io
   - Monitor the Quality Gate status
   - Address new issues promptly

3. **Follow the coding standards:**
   - Use TypeScript strictly
   - Leverage modern ES6+ features (optional chaining, nullish coalescing)
   - Keep functions focused and maintainable
   - Remove dead code and unused imports

### SonarQube MCP Setup

The project uses the SonarQube MCP server for VS Code integration. Configuration is in:
- `C:\Users\marti\AppData\Roaming\Code\User\mcp.json`

To check Quality Gate status:
```
Ask GitHub Copilot: "Can you check the SonarQube quality gate status?"
```

### Resources

- [SonarCloud Dashboard](https://sonarcloud.io)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)
- [Next.js ESLint](https://nextjs.org/docs/app/building-your-application/configuring/eslint)
- [SonarQube Rules](https://rules.sonarsource.com/typescript/)

---

**Last Quality Gate Check:** October 29, 2025  
**Status:** ✅ PASSING  
**Trend:** 📈 IMPROVING
