# General

The full list of essential backend tests includes:

- Unit tests; 
- Component tests; 
- Integration tests; 
- Contract tests; 
- End-to-End tests;
- Security tests;
- Performance tests;

##  Functional Testing (The Core Pyramid)

These tests ensure that your business logic behaves exactly as expected, moving from isolation to full system connectivity.

| Test Type                        | What It Tests                                                        | Main Scope & Setup                                                                                     |
|:---------------------------------|:---------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------|
| Unit Tests                       | Isolated functions, methods, algorithms, and domain models.          | 100% Mocked. No database, no network. Extremely fast to run.                                           |
| Component / API Tests            | Single service endpoints and request/response routing.               | Partially Mocked. Tests controller-to-service routing but typically stubs downstream APIs.             |
| Integration Tests                | Interactions between code and real infrastructure hooks.             | Real Infra. Uses tools like TestContainers to spin up actual databases, queues, or caches.             |
| Contract Tests                   | Schema and boundary agreements between consumer and provider.        | Asynchronous. Locks down API contracts (e.g., via Pact or OpenAPI) to ensure multi-team compatibility. |
| End-to-End (E2E) / System Tests  | Complete transaction flow from entry to exit across all services.    | Fully Deployed. Runs in production-like staging environments with real networks and message brokers.   |

## Operational & Non-Functional Testing

Writing functional code is not enough, backend must be resilient, safe, and performant under load.

- Performance Testing;
  - **Load Testing**: Simulates expected multi-user traffic to measure latency and baseline resource usage;
  - **Stress / Spike Testing**: Pushes the backend past its limits to evaluate how it breaks and if it recovers gracefully;
  - **Soak Testing**: Runs a steady volume of traffic over hours or days to flush out memory leaks;
- Security & Vulnerability Testing;
  - **SAST (Static Application Security Testing)**: Scans source code repositories for hardcoded secrets, SQL injection holes, or insecure library versions;
  - **DAST (Dynamic Application Security Testing)**: Attacks a running instance of your backend to test auth bypasses and injection risks;
- Resilience / Chaos Testing;
  - Intentionally drops database nodes, introduces network latency, or kills server instances to prove that failover logic and circuit breakers function automatically;

## Specialized Data & Structure Testing

These tests ensure your data formats do not degrade as your code or environment changes.

- Database Migration & Schema Tests;
  - Runs execution scripts forward and backward on test schemas to prove updates or rollbacks won't cause breaking data truncation or locking issues;
- Fuzz Testing;
  - Feeds unpredictable, randomized malformed inputs into your API parsers to ensure the application fails cleanly rather than crashing or leaking memory;
- Smoke Testing;
  - A lightweight checklist run immediately following a deployment to verify that core connections (e.g., checking /health endpoints) are active.
