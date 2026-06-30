# Form

Composite form for managing social content by platform and language. Each **combine** block contains a topic row (text + image uploads) and a nested comment section.

## Layout

```
Tabs (Facebook | YouTube)
─────────────────────────────────────────────
English                          [+ New Topic]
─────────────────────────────────────────────
Topic    │ lorem ipsum text …          [✎][A][⋮]
         │ [Upload] [Upload] [Upload] [+]
─────────────────────────────────────────────
Comment  │ lorem ipsum text …          [✎][A][⋮]
         │ lorem ipsum text …          [✎][A][⋮]
         │ [+ New Comment]
─────────────────────────────────────────────
         │ (repeat block on + New Topic)
```

- **Tabs** — 120 px wide each; active tab uses `text-primary` with a 100 px cyan underline.
- **Header** — language title (`text-brand-indigo`, 24 px bold) and **New Topic** button aligned right.
- **Label column** — fixed 120 px width for `Topic` / `Comment` labels.
- **Content column** — flexible; holds text entries, upload slots, and actions.
- **No background** — form renders on a transparent surface (no card fill or shadow on the root).

## Interactions

| Action | Behavior |
|--------|----------|
| **+ New Topic** | Appends a new combine block below the existing one, separated by a divider. New block starts with one comment and three upload slots. |
| **+ New Comment** | Appends a comment entry within the same block. |
| **+ (upload)** | Adds one upload slot to that block's topic row. |
| **Tab click** | Switches the active social tab (Facebook / YouTube). |

State for blocks, comments, and upload slots is managed internally. Optional callbacks (`onNewTopic`, `onTabChange`) fire after the UI updates.

## Usage

```tsx
import Form from './components/Form/Form'

<Form
  title="English"
  onTabChange={(tabId) => console.log('Tab:', tabId)}
  onNewTopic={() => console.log('New topic added')}
/>
```
