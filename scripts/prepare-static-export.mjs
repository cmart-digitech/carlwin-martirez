/**
 * Strips server-only code from the checkout before a static export build.
 *
 * GitHub Pages serves plain files: there is no server, so API routes and the
 * `proxy.ts` request filter cannot run there. Shipping `/admin` to Pages would
 * publish the dashboard as a world-readable HTML file with no gate in front of
 * it, which is how this site was previously deployed.
 *
 * The admin panel is therefore a local-only tool. It stays in the repo and
 * works under `npm run dev`; this script removes it from the CI workspace so it
 * never reaches the published artifact.
 *
 * Only ever touches the CI checkout — see the CI guard below.
 */

import { rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'

if (process.env.CI !== 'true') {
  console.error(
    'refusing to run: this deletes source files and is meant for CI only.\n' +
      'Set CI=true if you really intend to strip admin code from this checkout.'
  )
  process.exit(1)
}

const root = process.cwd()

// Paths that require a running server, in the order they'd break the export.
const serverOnly = ['app/api', 'app/admin', 'proxy.ts']

for (const rel of serverOnly) {
  const target = join(root, rel)
  if (!existsSync(target)) {
    console.log(`skip    ${rel} (not present)`)
    continue
  }
  rmSync(target, { recursive: true, force: true })
  console.log(`removed ${rel}`)
}

console.log('static export prepared: admin panel and API routes excluded')
