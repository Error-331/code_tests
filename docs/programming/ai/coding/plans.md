# Plans

`PLANS.md` is an emerging best practice for **long-horizon problem-solving**. It acts as a live milestone contract, allowing AI agents to tackle complex features, migrations, or 
multi-hour tasks autonomously without losing focus.

## Standard PLANS.md Blueprint

The document utilizes a "**Plan-Work-Review**" loop to structure the agent's work. It is usually placed at the project root or tucked inside `.agents/PLANS.md`:

```markdown

# Execution Plan: Migrate Auth to Auth0

## 1. Architecture & Approach
- Replace the local Prisma-based sessions with the Auth0 SDK.
- Create an Auth0 tenant and map current database fields to metadata fields.
- Update `/api/auth/[...nextauth]` routes to handle the new callbacks.

## 2. Risk Register
- Risk: Session loss for existing active users during migration.
- Mitigation: Keep the database session table active as a fallback read-layer for 7 days.

## 3. Milestones & Progress
- [x] Phase 1: Environment configuration and SDK installation.
- [~] Phase 2: Refactor API middleware to intercept and validate Auth0 JWTs.
- [ ] Phase 3: Update the frontend Login/Logout components.
- [ ] Phase 4: Write integration tests for protected routes.

## 4. Live Ledger / Execution Log
- *Phase 1 complete:* Installed `@auth0/nextjs-auth0`. Saved credentials to `.env.local`.
- *Phase 2 in progress:* Created `middleware.ts` but encountering a token expiration bug. Fixing now.

## 5. Verification Commands
Run these exact terminal commands to prove the work is correct:
- Build check: `npm run build`
- Unit tests: `npm run test:auth`

```

## How to Tell the AI to Use PLANS.md

To enforce this workflow, you must inject explicit instructions into your agent's system prompt. If you are using an AGENTS.md file (or files like `.cursorrules` or `CLAUDE.md`), 
add a dedicated **Plan & Execution Protocol** section.

Copy and paste this snippet directly into your project's rule file:

```markdown

## Plan & Execution Protocol
You must strictly follow the "Plan-Work-Review" loop for any non-trivial task, feature request, or refactor. Do not write code blindly.

### Phase 1: Planning
1. Before modifying any code, inspect `.agents/plans/` to understand historical context.
2. Open the root `PLANS.md` file. If it contains an old plan, archive it to `.agents/plans/XXX-name.md` first.
3. Write a brand new execution strategy into the root `PLANS.md`.
4. Stop immediately and ask the user for approval: "I have drafted the execution plan in PLANS.md. Please review and approve."

### Phase 2: Execution
1. Once approved, execute the plan one milestone at a time.
2. Update the checkboxes (`[ ]` to `[~]` for in-progress, and `[x]` for complete) in `PLANS.md` in real-time as you work.
3. If you encounter unexpected bugs, update the "Risk Register" or "Execution Log" sections in `PLANS.md` before changing your technical approach.

### Phase 3: Verification
1. Run the specified verification commands to ensure no regressions.
2. Mark the final milestone as complete and ask the user to verify the feature.

```

When you start a new chat or a new feature branch, point the AI to its own rules right away by typing:

```text

"Implement the new user feedback form. Refer to AGENTS.md for your identity and strictly follow the Plan & Execution Protocol using PLANS.md before writing code."

```

Enforcing the `PLANS.md` Automation via `AGENTS.md`:

```markdown

# Codex Engineering Rules

## 1. Environment & Tools
- Always look for `.agents/` and root `AGENTS.md` rules before executing commands.
- Use the built-in system `/plan` command if the user prompts for non-trivial features.

## 2. Plan & Execution Protocol (Strict)
You must follow this "Plan-Work-Review" lifecycle for any change exceeding 10 lines of code.

### Step A: The Pre-Check & Archive
- Look for an existing `PLANS.md` file at the root.
- If it contains a previously completed feature plan, immediately copy and archive it into `.agents/plans/XXX-feature-name.md`. 
- Completely clear out the root `PLANS.md` to prepare for the new task.

### Step B: Enter Plan Mode
- Shift your behavior to Plan Mode. Do not mutate files, write codebase patches, or generate feature code yet. 
- Draft a highly comprehensive execution strategy directly into the blank root `PLANS.md` file.
- Include: Target architecture, Step-by-step checkboxes (`- [ ]`), Risks, and terminal validation tests.
- Stop execution immediately and output: `"I have written the execution strategy to PLANS.md. Please review, modify if necessary, and type /approve to begin coding."`

### Step C: Sequential Execution
- Upon user approval, begin implementing code strictly in sequence.
- Flip checkboxes (`[ ]` to `[~]` for in-progress, and `[x]` for finished) in `PLANS.md` file as you step through the codebase.

```