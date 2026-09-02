# gpt-web

A dependency-free web baseline used by the Web ChatGPT Git writer workflow.

## Checks

```powershell
node scripts/check-format.mjs
node --test
node scripts/check-syntax.mjs
node scripts/build.mjs
```

The production build is written to `dist/`.
