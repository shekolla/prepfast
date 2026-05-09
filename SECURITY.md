# Security policy

## Reporting a vulnerability

**Do not open a public issue for security problems.** Email
**`shekollasaikiran@gmail.com`** with:

- A description of the issue
- Steps to reproduce (or a proof-of-concept)
- The version / commit you tested against
- Any mitigation suggestions

I'll acknowledge within 72 hours and aim to triage within a week. If the
issue is confirmed:

- **Critical / high:** patch released within 7 days, advisory published after the fix is tagged.
- **Medium:** patched in the next release; advisory published with the release notes.
- **Low (hardening, defense-in-depth):** rolled into the normal release cadence.

You'll be credited in the advisory unless you'd rather stay anonymous.

## Scope

This repo's `main` branch + the latest tagged release.

In scope:
- The npm dependency graph — supply chain vulnerabilities in packages that
  ship in the built JS bundle or influence the build pipeline.
- The build pipeline (Next.js 16, TypeScript, `npm run build`) — a
  compromise that causes the built output to differ from source.
- The Docker image (`Dockerfile`) — base image vulnerabilities, the
  nginx configuration, the static file serving setup.
- The Vercel deployment configuration — headers, redirects, CSP policy.
- XSS in the static JS bundle — malicious code execution in a visitor's browser.

Out of scope:
- Self-inflicted misconfiguration (running without HTTPS, exposing Docker
  without a reverse proxy).
- Vulnerabilities in upstream dependencies that have no published fix yet
  (report to the upstream project first).
- Social-engineering attacks against the maintainer.
- Findings on a fork that has been modified from `main`.

## What we already do

- Dependabot enabled for weekly npm and GitHub Actions updates.
- GitHub CodeQL scanning on every push and PR.
- Trivy filesystem + Dockerfile scanning weekly.
- OpenSSF Scorecard analysis weekly.
- Static export only — there is no server process, no authentication,
  no database, no user data stored anywhere except the visitor's own
  `localStorage`. The attack surface is limited to the JS bundle itself
  and the build pipeline that produces it.

## Threat model assumptions

- All user data (review progress, flashcard state) is stored exclusively
  in the visitor's own browser `localStorage`. We hold no user data.
- The site is read-only from the server's perspective — there are no
  POST endpoints, no form submissions sent to our infrastructure.
- Self-hosted Docker deployments are the deployer's responsibility for
  TLS termination and reverse-proxy hardening.
