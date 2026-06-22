# Scope: E2E Testing Track

## Architecture
- **E2E Testing Suite**: To be initialized in `tests/`.
- **Target App**: Next.js App Router (localhost:3000 or production url / build target).
- **Features Under Test**:
  1. Supabase SSR Auth
  2. Password Recovery
  3. Mobile Responsiveness (down to 320px)
  4. Interactive Touch Controls
  5. Load Speed / Image Priority
  6. Cookie Consent Banner

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Exploration & Harness Setup | Analyze codebase, select/install E2E test framework, create test harness, setup boilerplate in `tests/`, create initial `TEST_INFRA.md`. | None | DONE |
| 2 | Tier 1 E2E Implementation | Implement 30 Tier 1 feature-coverage test cases. | 1 | IN_PROGRESS (baab6254-9c3e-4d54-8f43-0a66fc128e9c) |
| 3 | Tier 2 E2E Implementation | Implement 30 Tier 2 boundary/edge/error test cases. | 2 | IN_PROGRESS (baab6254-9c3e-4d54-8f43-0a66fc128e9c) |
| 4 | Tier 3 & 4 E2E Implementation | Implement 6 Tier 3 pairwise tests and 5 Tier 4 real-world workload scenarios. | 3 | IN_PROGRESS (baab6254-9c3e-4d54-8f43-0a66fc128e9c) |
| 5 | Test Finalization & Audit | Validate all tests pass, finalize `TEST_INFRA.md`, publish `TEST_READY.md` at project root, and perform audit. | 4 | PLANNED |

## Interface Contracts
- **Test execution**: Accessible via npm scripts (e.g. `npm run test:e2e`).
- **Target URL**: The test suite should run against a running Next.js server (typically `http://localhost:3000`).
- **Reports**: A test summary should be produced and output to standard output or a report file.
