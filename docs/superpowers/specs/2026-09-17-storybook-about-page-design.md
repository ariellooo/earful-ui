# Storybook About page

## Goal

Add a concise About page to Storybook while keeping the existing Introduction page.

## Structure

- Create `src/About.mdx`.
- Register the page as `About` with Storybook's MDX `Meta` block.
- Use Storybook's standard documentation layout and typography.
- Include the approved overview of Earful UI, the EARFUL platform, the library contents, interaction-state demonstrations, and implementation code.

## Project integration

Storybook already discovers `src/**/*.mdx`, so no configuration changes are needed. The page will not introduce components, design tokens, custom styles, data flow, or error states.

## Verification

Run the static Storybook build and confirm that MDX compilation succeeds.
