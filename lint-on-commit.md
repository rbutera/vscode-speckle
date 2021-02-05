# Lint on Commit

In your package.json:

```json
{
  // ...
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": ["eslint --cache --fix", "jest --findRelatedTests"],
    "*.{js,ts,jsx,tsx,json,md}": ["prettier --write"]
  }
}
```
