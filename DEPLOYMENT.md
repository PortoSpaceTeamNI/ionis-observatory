# Publish IONIS with GitHub and Vercel

## Live project

- Website: https://ionis-observatory.vercel.app
- Source: https://github.com/PortoSpaceTeamNI/ionis-observatory
- Vercel: https://vercel.com/porto-space-team1/ionis-observatory
- Production branch: main. Pushing a commit automatically starts a deployment.

## One-time setup (already completed)

**Approved repository visibility:** Public. The intended repository is `PortoSpaceTeamNI/ionis-observatory`. Vercel Hobby does not support private GitHub organization repositories; this public-source choice avoids that specific restriction. Select the appropriate existing Vercel account or team during import.

1. Create a **public** GitHub repository named `ionis-observatory` under the **[Porto Space Team](https://github.com/PortoSpaceTeamNI)** organization (`PortoSpaceTeamNI`). Keep it empty when creating it: this project already includes its own README and Git history. Project credits are **BOBDINHO** and **EduardoSilva**.
2. Push the project to that repository with `main` as the production branch. Confirm that `package.json`, `package-lock.json`, `app/`, `components/`, `lib/`, and `public/` appear at the repository root. Do not upload the enclosing folder or a ZIP file as the application.
3. In Vercel, choose **Add New → Project**, connect GitHub, and import `ionis-observatory`. Give the Vercel GitHub integration access to this repository.
4. Use these settings:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Next.js |
   | Root directory | `./` |
   | Node.js | 22.x |
   | Install command | `npm ci` |
   | Build command | `npm run build` |
   | Output directory | Next.js default; leave the override off |
   | Production branch | `main` |
   | Environment variables | None required for this frontend |

5. Deploy and wait for **Ready**. Open the production URL and check the Earth explorer, catalog, spatial filters, and CSV export.
6. In the Vercel project's Git settings, confirm the GitHub repository is connected and `main` is the production branch.

This project uses the approved public GitHub repository. Keep real mission data and secrets out of this demonstration repository until their access requirements are designed.

## Routine updates

With GitHub Desktop, open the local project, make changes, review the changed files, write a commit summary, and select **Commit to main**, then **Push origin**. Vercel automatically builds and deploys the new commit.

With a terminal in the project folder:

```sh
npm run typecheck
npm run build
git status
git add app components lib public
git commit -m "Describe the website update"
git push origin main
```

Add other intentionally changed files, such as `package.json` and `package-lock.json`, when needed. Do not force-push routine updates. Use an author email linked to the GitHub account that has access to the Vercel project.

## Preview larger changes

Create a feature branch in GitHub Desktop (or with `git switch -c feature/your-change`), commit your changes, push the branch, and open a pull request. Vercel will provide a preview deployment for review. Merge into `main` to publish the approved version.

## If an update fails

Open the failed deployment in Vercel and read its build log. A failed build does not replace the last successful production deployment. Correct the issue and push another commit. To undo a change permanently, revert the relevant commit in GitHub and let Vercel deploy the revert. Vercel also provides deployment rollback controls; keep the GitHub source consistent with the version you want to retain.

## Current scope

This publishes the working frontend and its 2,160 synthetic readings. It does not enable real uploads, researcher authentication, certification, or permanent database storage. Contributor CSV validation currently runs on the visitor's device only.

## Official references

- [Vercel's GitHub integration](https://vercel.com/docs/git/vercel-for-github)
- [Git deployments and production branches](https://vercel.com/docs/git)
- [Next.js deployment](https://nextjs.org/docs/app/getting-started/deploying)

