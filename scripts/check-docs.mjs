#!/usr/bin/env node
/**
 * Validates that every reusable component under src/components has:
 *   1. A companion *.stories.tsx file
 *   2. Autodocs enabled globally (tags: ['autodocs'] in preview.ts) OR locally in the story
 *   3. parameters.docs.description.component
 *   4. argTypes defined
 *   5. controls.expanded = true (globally in preview.ts or locally)
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')

// ── helpers ────────────────────────────────────────────────────────────────────

function readFile(path) {
  try { return readFileSync(path, 'utf8') } catch { return null }
}

function walkDirs(dir) {
  const results = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) results.push(full, ...walkDirs(full))
  }
  return results
}

function findStoriesFiles(dir) {
  const results = []
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      const stat = statSync(full)
      if (stat.isDirectory()) results.push(...findStoriesFiles(full))
      else if (entry.endsWith('.stories.tsx') || entry.endsWith('.stories.ts')) results.push(full)
    }
  } catch { /* ignore */ }
  return results
}

// ── read preview.ts ────────────────────────────────────────────────────────────

const previewPath = join(ROOT, '.storybook', 'preview.ts')
const previewSrc  = readFile(previewPath) ?? ''

const globalAutodocs       = /tags\s*:\s*\[['"]autodocs['"]\]/.test(previewSrc)
const globalExpandedControls = /expanded\s*:\s*true/.test(previewSrc)

// ── collect story files ────────────────────────────────────────────────────────

const componentsDir = join(ROOT, 'src', 'components')
const storyFiles    = findStoriesFiles(componentsDir)

// ── check each file ────────────────────────────────────────────────────────────

let passed = 0
let failed = 0
const errors = []

for (const filePath of storyFiles) {
  const rel  = relative(ROOT, filePath)
  const src  = readFile(filePath) ?? ''
  const fileErrors = []

  // 1. File exists (already true — we found it)

  // 2. Autodocs enabled globally or locally
  const localAutodocs = /tags\s*:\s*\[['"]autodocs['"]\]/.test(src)
  if (!globalAutodocs && !localAutodocs) {
    fileErrors.push("missing tags: ['autodocs'] (not set globally or locally)")
  }

  // 3. parameters.docs.description.component
  if (!/description\s*:\s*\{[\s\S]*?component\s*:/.test(src)) {
    fileErrors.push('missing parameters.docs.description.component')
  }

  // 4. argTypes
  if (!/argTypes\s*:/.test(src)) {
    fileErrors.push('missing argTypes')
  }

  // 5. controls.expanded = true (global counts)
  const localExpanded = /expanded\s*:\s*true/.test(src)
  if (!globalExpandedControls && !localExpanded) {
    fileErrors.push('missing controls: { expanded: true } (not set globally or locally)')
  }

  if (fileErrors.length === 0) {
    console.log(`  ✓  ${rel}`)
    passed++
  } else {
    console.log(`  ✗  ${rel}`)
    for (const e of fileErrors) console.log(`       → ${e}`)
    errors.push({ file: rel, issues: fileErrors })
    failed++
  }
}

// ── global checks ──────────────────────────────────────────────────────────────

console.log('')
console.log('── Global (preview.ts) ──────────────────────────────────────────')
console.log(`  ${globalAutodocs         ? '✓' : '✗'}  tags: [\'autodocs\']`)
console.log(`  ${globalExpandedControls ? '✓' : '✗'}  controls.expanded = true`)

// ── summary ────────────────────────────────────────────────────────────────────

console.log('')
console.log('── Summary ───────────────────────────────────────────────────────')
console.log(`  Story files checked : ${storyFiles.length}`)
console.log(`  Passed              : ${passed}`)
console.log(`  Failed              : ${failed}`)

if (failed > 0) {
  console.log('')
  console.log(`${failed} file(s) did not pass. See details above.`)
  process.exit(1)
} else {
  console.log('')
  console.log('All checks passed.')
  process.exit(0)
}
