# Agents

- `AGENTS.md` File: Serves as the core root-level instruction file (comparable to tool-specific files like `CLAUDE.md` or `.cursorrules`), backed across multiple coding
assistants and agents like Claude Code, Cursor, and Aider;
- `.agents/` Directory: Functions as an open directory convention at the project root to bundle portable assets like tool configurations, recurring task definitions, persistent
memories, and custom skills;
- `Ecosystem Adoption`: While individual developer tools historically locked configurations into proprietary formats, initiatives like the `.agents` Protocol and Agent Skills 
aim to unify these structures into vendor-neutral, portable formats;

## Core architecture

The `.agents/` directory handles system capabilities, while the AGENTS.md file defines behaviors and goals.

```text

my-project/
├── AGENTS.md                 # Master identity, rules, and task roadmap
└── .agents/
    ├── skills/               # Reusable code blocks for the agent
    │   └── web_scraper.py
    ├── tools/                # JSON schemas defining agent tools
    │   └── fetch_weather.json
    ├── memory/               # Persistent knowledge and context
    │   └── project_rules.txt
    └── workflows/            # Sequential task configurations
        └── daily_build.json

```

### AGENTS.md

- Place this file in your project root;
- It provides high-level identity, tech stack guardrails, and active sprint tasks;

Example:

```markdown

# Agent Profile: Senior Full-Stack Engineer

## Identity & Tone
- You are a pragmatic, concise developer.
- Write modern TypeScript and clean CSS.

## System Context
- Tech Stack: Next.js (App Router), TailwindCSS, Prisma.
- Constraints: Always write unit tests for new utility functions.

## Active Roadmap
- [x] Task 1: Initialize database schema.
- [ ] Task 2: Implement user authentication flow.
- [ ] Task 3: Create the dashboard UI layout.

```

### The capabilities directory (.agents/)

Populate this directory with machine-readable assets that make your agent functional across different platforms.

#### Custom Tools (.agents/tools/)

Define schemas that match the OpenAPI or Model Context Protocol (MCP) specifications.

Example:

```json

{
  "name": "search_documentation",
  "description": "Searches the local project documentation folder.",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "The search term" }
    },
    "required": ["query"]
  }
}

```

#### Shared Memories (.agents/memory/)

- Store files containing long-term project knowledge that should not clutter the main prompt;
- The `memory/` folder stores long-term institutional project knowledge;
- Putting this information here prevents your main system prompts from bloating, saving token costs and reducing context drift;

Example:

```markdown

# Architecture Decisions

- We use PostgreSQL for data persistence.
- Do not use third-party state managers; stick to React Context.
- All API routes must use the standard edge runtime.

```

##### Static Context (What the agent must know)

These are markdown files written by you containing baseline truths about the repository that do not change frequently.

- `architecture.md`: Explains your data flow, dependency patterns, and system design. (e.g., "We use Prisma for database access. Do not write raw SQL queries.");
- `gotchas.md`: Documented historical bugs, environment-specific issues, or legacy quirks that an external LLM would typically stumble over. (e.g., "The edge runtime breaks 
our encryption library; always isolate auth handling to node instances.");
- `glossary.md`: Domain-specific terminology, business acronyms, or internal module nicknames unique to your enterprise or app logic;

##### The Decision Ledger (What the agent should remember)

The `.agents` protocol heavily relies on write-back memory, meaning the agent itself edits these files to maintain historical consistency.

- `decisions.json` or `decisions.md`: Every time you approve a major change, refactor, or architectural pivot, the agent records it here, this prevents future iterations of 
OpenAI Codex or Claude from looking at an intentionally written piece of code and hallucinating that it is "broken" or needs a rewrite;
- `incidents.md`: A quick log written by the agent outlining bugs it encountered and resolved. (e.g., "Aug 2026: Upgraded Next.js to v16. Encountered type mismatches in 
middleware. Fixed by manually overriding type definitions in types/next.d.ts.");

##### Dynamic Preferences (How the agent should adapt to you)

- `user_preferences.md`: Custom instructions detailing how you like to work, this adapts the agent to your personal workflow without cluttering code-focused files. 
(e.g., "The user prefers raw inline terminal output over interactive text spinners," or "The user prefers brief code summaries over long markdown paragraphs.");

##### How a Complete Folder Looks

A clean, standardized workspace structure scales effectively using simple markdown categorization:

```text

.agents/memory/
├── architecture.md       # Tech stack constraints & flow patterns
├── gotchas.md            # Legacy quirks and environment bugs
├── decisions.md          # Write-back ledger of approved repo shifts
└── user_preferences.md   # Your personal coding & interaction style

```

##### Connecting the Memory to Codex

To ensure your OpenAI Codex instance knows when and how to access this folder, add a Memory Integration Rule to your root `AGENTS.md` file. This prompts the agent to use 
filesystem tools to lookup context when relevant, rather than guessing.

```markdown

## 3. Project Memory Protocols
You have read/write access to the `.agents/memory/` folder. Use it to preserve context across chat loops.

### Reading Memory
- Before initiating any major refactor, query `.agents/memory/architecture.md` and `gotchas.md`.
- Ensure your proposed code adjustments do not violate established system boundaries or revive past bugs listed in the logs.

### Writing Memory
- After successfully closing out a milestone or correcting a complex ecosystem bug, you must append an update to `.agents/memory/decisions.md`.
- Document exactly what changed, why the choice was made, and any code paths affected. Keep entries dated and extremely punchy.

```

#### Architecture description (.agents/memory/architecture.md)

To make it as flexible as possible, it is structured using a modern **TypeScript/Next.js/SQL full-stack architecture**. You can easily swap out the technology names to 
perfectly match your project's unique tech stack.

Example:

```markdown

# Repository Architecture & Core System Layout

## 1. System Technology Stack
- **Frontend Core:** Next.js (App Router), React 19, TypeScript
- **Styling Paradigm:** TailwindCSS, Shadcn/ui (Radix Primitives)
- **Data Persistence:** PostgreSQL via Prisma ORM
- **State Architecture:** React Context for globals, TanStack Query (React Query) for server-state caching

## 2. Directory Layout & Routing Boundaries
All code modifications must strictly respect the following modular architecture:

\```text
src/
├── app/                  # Next.js App Router (UI Pages & Server Actions)
│   ├── (auth)/           # Route group for user onboarding & authentication
│   ├── dashboard/        # Layout and sub-routes for the core product interface
│   └── api/              # Strictly for third-party webhooks (e.g., Stripe, SendGrid)
├── components/           # Reusable UI building blocks
│   ├── ui/               # Core design tokens & atomic components (Do not edit manually)
│   └── shared/           # Business-specific visual elements (Forms, Cards, Lists)
├── hooks/                # Global React hooks & fetch abstractions
├── lib/                  # Shared configurations (Prisma client, utility functions)
└── types/                # Strict global TypeScript definitions & interfaces
\```

## 3. Mandatory Engineering Rules & Standards

### A. Data Fetching & Mutations
- **No Direct API Routing for Internal UI:** Do not spin up an internal route under `app/api/` for standard dashboard features. Use native Next.js **Server Actions** (`"use server"`) instead.
- **Server Action Location:** Write your actions directly in a dedicated `actions.ts` file inside the corresponding route folder (e.g., `src/app/dashboard/actions.ts`).

### B. State & Server Caching
- **Do Not Write Cache Invalidation Logic:** Never build manual polling loops. Rely entirely on TanStack Query or native React `revalidatePath()` for mutating layouts.
- **Component Classification:** Default all UI views to **Server Components**. Mark a file with `"use client"` *only* if it requires user interaction, state toggles, or event handlers.

### C. Database Operations
- **Query Pipeline:** Always execute data transactions via the unified Prisma client instance exposed in `@/lib/db`. Do not spin up separate connection strings.
- **Database Safety:** Never perform a codebase commit that includes raw SQL statements or dynamic string concatenation in database filters.

## 4. Verification & Testing Requirements
Before marking any feature checklist as complete inside `PLANS.md`, you must run and verify:
1. **Linter Execution:** `npm run lint` — Must report 0 warnings/errors.
2. **Type-Check Integrity:** `npm run type-check` — No implicit types or missing definitions.
3. **Local Compilation:** `npm run build` — The code must pack cleanly without runtime failures.

```

**Once you save this file into your workspace, make sure to add this quick instruction to your AGENTS.md file under the Codex rules section:**

```markdown

 **Architecture Compliance:** Before proposing any new files or modifying imports, read `.agents/memory/architecture.md` to ensure your proposed directory path, component type, and syntax match our stack conventions.

```

#### Gotchas description (.agents/memory/gotchas.md)

This file acts as a protective shield against the common pitfalls, hidden bugs, and edge cases that cause AI agents to write broken code or waste time troubleshooting.

Example:

```markdown

# Project Gotchas, Edge Cases & Quirks

## 1. Environment & Edge Runtime Bugs
- **Issue:** Prisma client does not natively run on the Vercel Edge Runtime.
- **Symptom:** Sub-routes crash during deployment if marked with `export const runtime = 'edge'`.
- **Fix:** All database-connected routes must run on the default Node.js runtime. Never use the edge flag on API hooks or Server Actions.

## 2. Component Hydration Failures
- **Issue:** Date formatting on the server differs from client-side local browser zones.
- **Symptom:** Next.js throws a severe `Hydration Mismatch` warning on dashboard tables.
- **Fix:** Wrap date rendering strings in a custom, client-side-only `<TimeAgo />` component, or set `suppressHydrationWarning` on the wrapping element if absolute time strings are required.

## 3. Tailwind Class Merging
- **Issue:** Dynamic string concatenation for custom Tailwind styles often cuts out compiler classes.
- **Symptom:** Layout components render with completely missing background colors or paddings.
- **Fix:** Never use string interpolation like `bg-${color}-500`. Always write out full utility class names explicitly, or utilize the `cn()` helper function inside `src/lib/utils.ts`.

## 4. Local Database Locking
- **Issue:** Running multiple tests concurrently locks the SQLite/PostgreSQL local development thread.
- **Symptom:** Prisma client times out during local integration testing loops.
- **Fix:** Always execute tests sequentially using the `--runInBand` flag in Jest or the sequential flag in Vitest.

```

#### User preferences (.agents/memory/user_preferences.md)

This file shapes the agent's presentation style, communication habits, and day-to-day behavior to match exactly how you prefer to work.

```markdown

# User Workflow & Interaction Preferences

## 1. Coding Style Preferences
- **Verbosity:** Keep logic highly modular. Prefer small, single-responsibility functions over monolithic code blocks.
- **Comments:** Do not write obvious inline comments (e.g., `// setting the state`). Only write comments to explain "Why" a complex workaround or algorithmic edge case was chosen.
- **TypeScript:** Avoid the use of `any` at all costs. If a complex layout requires loose typing, use `unknown` and implement runtime type guard assertions instead.

## 2. Communication & Chat Style
- **Answers:** Be blunt, concise, and direct. Skip polite filler phrases like "Sure, I can help with that!" or "Here is your updated code:".
- **Code Diffs:** When modifying code, never output the entire file if only 5 lines changed. Provide only the relevant code snippets or diff highlights (`+` and `-` formatting) to preserve token space and reading speed.
- **Output Mode:** Prefer raw, copy-pasteable blocks. Do not hide script logic behind interactive text spinners or multi-step execution UI menus unless explicitly prompted.

## 3. Terminal & Execution Rules
- **Non-Interactive Commands:** When running backend setup or package script tasks, always append standard non-interactive flags (e.g., `npm install --yes` or `npx prisma db push --accept-data-loss` if approved) to prevent the agent from hanging on hidden interactive command prompts.

```

