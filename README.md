# Site template

> 🧪 Minimal static site template with deployment to GitHub pages


## Get started

To get started make sure you have the latest version of `nodejs` and `npm` installed. Then run:
```
npm i && npm run watch
```

This will create a local browser-sync instance live refreshing all the changes to the `src/` and copying any `src/assets/*` to `_site/assets`.


## Deployment

[Create a secret](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) containing the personal access token, call it `GH_PAT`.


## Changelog

- v0.0.0 - Initial template
