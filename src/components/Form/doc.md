# Form

Composite form for managing social content by platform and language. Each **combine** block contains a topic row (text + image uploads) and a nested comment section.

## Layout

```
Tabs (Facebook | Threads)
─────────────────────────────────────────────
English                          [+ New Topic]
─────────────────────────────────────────────
Topic    │ campaign topic copy …       [✎][A][⋮]
         │ [Upload] [Upload] [Upload] [+]
─────────────────────────────────────────────
Comment  │ campaign comment …          [✎][A][⋮]
         │ campaign comment …          [✎][A][⋮]
         │ [+ New Comment]
─────────────────────────────────────────────
         │ (repeat block on + New Topic)
```

- **Tabs** — uses the Tabs component. Each cell is 120 px wide. The active tab is the default variant (orange label, 4 px orange underline). Inactive tabs use the disable variant.
- **Topic images** — the opening topic shows three 80 px photos in the upload row, then the add control. Added slots stay empty.
- **Header** — language title (`text-brand-indigo`, 24 px bold) and **New Topic** button aligned right.
- **Label column** — fixed 120 px width for `Topic` / `Comment` labels.
- **Content column** — flexible; holds text entries, upload slots, and actions.
- **No background** — form renders on a transparent surface (no card fill or shadow on the root).

## Interactions

| Action | Behavior |
|--------|----------|
| **+ New Topic** | Appends the follow-up topic for campaign 421, with its first two comments and three upload slots. |
| **+ New Comment** | Reveals the next remaining comment in that block, in file order. |
| **+ (upload)** | Adds one upload slot to that block's topic row. |
| **Tab click** | Switches the active social tab (Facebook / Threads). |

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
