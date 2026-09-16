# Storybook About Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a concise About page to Storybook without changing the existing Introduction page.

**Architecture:** Create one MDX document that Storybook discovers through the existing `src/**/*.mdx` configuration. Use Storybook's standard docs layout without new components, tokens, or custom styling.

**Tech Stack:** Storybook 10, MDX, React 19

## Global Constraints

- Keep `src/Introduction.mdx` unchanged.
- Register the new page with the title `About`.
- Use the approved Earful UI copy.
- Verify the page through the static Storybook build.

---

### Task 1: Add the Storybook About page

**Files:**
- Create: `src/About.mdx`
- Test: Static Storybook build

**Interfaces:**
- Consumes: Storybook's `Meta` block from `@storybook/blocks`
- Produces: An auto-discovered Storybook docs page titled `About`

- [ ] **Step 1: Confirm the page does not already exist**

Run:

```bash
test ! -e src/About.mdx
```

Expected: exit code 0.

- [ ] **Step 2: Create the MDX page**

Create `src/About.mdx` with:

```mdx
import { Meta } from '@storybook/blocks'

<Meta title="About" />

# About Earful UI

Earful UI is the component library for EARFUL, a global AI-powered PR technology platform focused on crisis management, market intelligence, social listening, automation, and analytical support.

It includes Foundations, Components, Patterns, and React Templates in Storybook. Each story demonstrates interaction states and provides code for faster implementation, making collaboration between design and development easier.
```

- [ ] **Step 3: Build Storybook**

Run:

```bash
npm run build-storybook
```

Expected: Storybook finishes successfully and writes the static build to `storybook-static`.

- [ ] **Step 4: Review repository changes**

Run:

```bash
git status --short
git diff -- src/About.mdx
```

Expected: `src/About.mdx` is the only new implementation file. The pre-existing untracked `src/Introduction.mdx` remains unchanged.

- [ ] **Step 5: Commit the page**

```bash
git add src/About.mdx
git commit -m "docs: add Storybook About page"
```
