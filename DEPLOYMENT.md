# Deployment (CI/CD)

This project deploys automatically to **GitHub Pages** via GitHub Actions.

Workflow file: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

## What runs when

| Trigger | Lint + typecheck + build | Deploy |
| --- | --- | --- |
| Push to `main` | Yes | Yes |
| Pull request into `main` or `development` | Yes | No |
| Manual run (Actions > CI/CD > Run workflow) | Yes | Yes |

## One-time setup

1. Go to the repo on GitHub: **Settings > Pages**.
2. Under **Build and deployment > Source**, choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually). The first run publishes the site to:

   ```
   https://gowtham2098.github.io/portfolio/
   ```

No secrets or tokens are required — the workflow uses the built-in `GITHUB_TOKEN`.

## How the base path works

GitHub Pages project sites are served from `/<repo>/`, not `/`. So the workflow sets
`BASE_PATH=/portfolio/` and `vite.config.ts` reads it:

```ts
base: process.env.BASE_PATH ?? '/',
```

Locally and in any root-domain host, `BASE_PATH` is unset and the base stays `/`.
If you rename the repo, the workflow derives the path automatically from the repo name.

If you later attach a **custom domain** (Settings > Pages > Custom domain), the site is
served from `/` instead. In that case, change the build step in the workflow to
`BASE_PATH: /` (or delete the `env` block for the build step).

## Notes

- `dist/` is uploaded as a workflow artifact (`dist-<sha>`) for 7 days, separate from the
  Pages deployment artifact, so you can download any build from the Actions run.
- Deployments are serialized per ref; an in-progress deploy is never cancelled by a newer push.
- The site is a single-page app with no client-side router, so no `404.html` fallback is needed.
  If you add routing later, copy `index.html` to `404.html` after the build step.
- Build output lives in `dist/` and is git-ignored; nothing is committed back to the repo.
