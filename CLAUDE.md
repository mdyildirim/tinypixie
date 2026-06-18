# Pixie

A wordless ambient toy — a little sprite who only speaks in light and sound. The whole game is a single self-contained static site (no build step, no backend, no dependencies).

## Files

- `index.html` — the entire game (HTML/CSS/JS inline)
- `icon.svg` — app icon
- `manifest.webmanifest` — PWA manifest (installable)
- `sw.js` — service worker (cache-first, makes Pixie playable offline)

All asset paths are relative, so the site is portable to any host/subpath.

## Deployment

Hosted on **Cloudflare Pages**.

| | |
|---|---|
| Production URL | https://tinypixie.com |
| Pages subdomain | https://tinypixie.pages.dev |
| Cloudflare account | mutlu@airsqreen.com (`64e6c279297122815031b35e5a5af4be`) |
| Pages project | `tinypixie` (production branch: `main`) |
| Custom domain | `tinypixie.com` — CNAME `@` → `tinypixie.pages.dev`, proxied; status active |

### Redeploy

Authenticate once (`npx wrangler login`), then deploy **only the site files** — do not deploy the
repo root, or local folders like `.claude/` get swept into the upload and served publicly:

```sh
# Stage just the site files
rm -rf /tmp/pixie-dist && mkdir -p /tmp/pixie-dist
cp index.html icon.svg og-image.png manifest.webmanifest sw.js robots.txt sitemap.xml /tmp/pixie-dist/

# Deploy
npx wrangler pages deploy /tmp/pixie-dist --project-name tinypixie --branch main
```

### Notes

- `sw.js` is **cache-first** (`pixie-v1`). After deploying changes, bump the `CACHE` version
  in `sw.js` (e.g. `pixie-v2`) so returning visitors don't get served the stale cached copy.
- The wrangler OAuth token has `zone:read` only — it cannot create DNS records. The apex
  CNAME was added manually in the dashboard. The Pages API attaches a custom domain but does
  **not** auto-create the DNS record (that's a dashboard-only convenience).
- Local-network caveat: the dev machine's ISP intercepts DNS and returns a bogus IP for
  `*.pages.dev`, so the site can appear unreachable from here even when it's live. Verify with
  DNS-over-HTTPS (`https://cloudflare-dns.com/dns-query?name=tinypixie.com&type=A`) or from
  another network. Switching the resolver to `1.1.1.1` avoids the hijack.
