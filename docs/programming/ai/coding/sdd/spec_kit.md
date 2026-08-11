# Spec Kit

- Spec-Driven Development presents a six-stage model that moves architectural decisions, constraints, and clarity upstream;
- Instead of code driving the process, specifications become the anchor (and source) upon which AI and humans act;
- Breakages are also fixed by updating the original specification rather than patching symptoms in different files;

## What is Spec-Driven Development?

Spec-Driven Development is a build approach in which teams define what the software should do—its behavior, constraints, interfaces, and requirements—before writing 
any implementation.

This specification then becomes the source of truth that humans and AI use to generate code, tests, documentation, and infrastructure.

Spec Kit solves two fundamental problems in AI-assisted development: 

- defines specifications for the assistant to follow; 
- introduces runtime checkpoints;

This directly addresses four systemic limitations that limit current AI tools:

1. Limits on task size and duration cause assistants to break down when asked to implement functions that span multiple services or files.
2. Repository and stack blind spots, as they don't know your architecture, conventions, or technical debt until you model them.
3. Function context blindness, as they cannot infer API contracts, dependencies, or edge cases from the prompt alone.
4. Unlimited autonomy leading to uncontrolled deviations without checkpoints.

## Structural limitations of AI-Based development and their solutions

### Limitations on the volume and duration of tasks

- LLMs (Large Language Models) are excellent at handling small, well-defined problems;
- Once the scope expands to multi-hour work—updating API endpoints or fixing bugs that affect multiple components—the quality quickly deteriorates;
- The longer the offline execution window, the higher the chance of getting code that compiles but doesn't actually solve your problem correctly;
- The problem gets worse when the volume bloats (the more files a single query affects, the more refactoring you'll have to do later);

Принудительная декомпозиция (решение):

Solution - **Forced decomposition**:

- replaces the "big bang" coding approach with a decomposition pipeline: Feature → User Stories → Tasks → Iterative Implementation;
- the feature is first translated into user stories, then into atomic tasks with strictly limited responsibility;
- only after this does the implementation begin, where each task is performed with a limited scope, typically affecting 1-2 files and taking minutes rather than hours;
- now you get consistent quality across many small implementations;
- the overall time may be similar, but predictability and reviewability are improved dramatically;

### Spaces in function context

- Even if an assistant understands the codebase and has a decent knowledge of the project, they still lack context about the specific feature being created;
- LLM does not know the requirements, edge cases, or acceptance criteria that determine success;
- LLM does not know how the feature should fit into the current system, which modules need to be changed, which data flows are involved, or where the integration points are;

Solution - **Multi-level context system for end-to-end feature development**:

- Specifications shift the context from situational prompts to structured layers;
- **System design layer** created during the "plan" phase of the Spec Kit, this layer shows how the feature integrates into your existing solution;
- **Specification layer** created through the `specify` and `clarify` phases of the Spec Kit, it defines the functional scope, such as business requirements, 
acceptance criteria, and edge cases, and also defines the use cases, success, and capabilities of the feature;

### Gaps in knowledge about the project

- Modern AI assistants can scan an entire repository, but reading code is not the same as understanding its context;
- Each codebase has its own conventions, approved libraries, reusable components, and corporate rules, including security, auditing, and architectural decisions;

Solution - **Constitution layer**:

- The `constitution.md` file is the Spec Kit's way of closing a gap in standards that exposes AI;
- Instead of relying on tribal knowledge and fixes during code reviews, you give the assistant the same instructions you would give a senior employee on their first day;

Elements: 

- **Stack and Standards**: Frameworks, versions, implementation patterns (Examples include React 18.2, TypeScript 5.1, and Vite);
- **Naming conventions**: Files, modules, services, variables, functions (Example: React components use PascalCase for files. Utility functions use camelCase exports);
- **Architectural Intent**: Rationale for past decisions and preferred approaches (Example: API calls go through the /api/client wrapper);
- **Library Management**: Allowed Imports, Disallowed Dependencies, Approval Criteria;
- **Security and Compliance**: Authentication Flows, Data Processing, Audit Requirements;

### Uncontrolled autonomy of the agent "black box"

Autonomous AI agents claim to deliver features end-to-end, but they also blur the lines: 

- User request a feature, the assistant decomposes it, runs through the steps, and returns the implementation; 
- But what comes back is a massive update with no traceability; 
- It can apply changes to 10-15 files, introduce integrations user didn't plan for, and make architectural choices without validation; 
- The result is a mixture of correct code and silent errors, with no way to see how it got there;

Solution - **Mandatory review gates**:

- **Specification Review**: The assistant generates a feature specification from description, teams review it to remove hallucinations, correct misinterpretations, and clarify ambiguities;
- **Plan review**: The technical approach is reviewed before code generation, validation of architecture, integration paths, and alternatives to ensure that bugs aren't baked into the implementation;
- **Execution approval**: Once the specification, plan, and task breakdown are confirmed, the assistant is given permission to implement the task autonomously;

## What does the Spec-Driven workflow look like in practice?

In practice, the workflow unfolds through six predictable stages: _Constitution_ → _Specify_ → _Clarify_ → _Plan_ → _Tasks_ → _Implement_;

1. Constitution Stage;
- encodes the DNA of the project, documenting stack versions, naming conventions, layering and architecture principles, allowed/disallowed libraries, and authentication/logging/accessibility;
- this prevents the assistant from generating "generic" code and makes it match how your system actually works;
2. Specification Stage;
- captures functional and non-functional intent by defining requirements, edge cases, API dependencies, and availability and performance requirements;
3. Clarify Stage;
- eliminates ambiguity arising from unclear requirements and scope;
- checks for missing constraints or assumptions, conflicting requirements, and whether edge cases should be confirmed or excluded;
4. Planning Stage;
- maps the specification to the actual system architecture, identifying which services, modules, data flows, state logic, and observability hooks will be affected; 
- this prevents the assistant from inventing new structures or guessing integration patterns that don't exist in your stack;
5. Tasks;
- decomposition cuts the implementation into atomic, testable units with boundaries no larger than a few files per task;
- this prevents AI from performing feature-wide actions that break cohesion, pollute dependencies, or force extensive refactoring;
6. Implementation phase;
- ensures that code generation occurs within the constraints defined by the constitution, specification, and plan;
- instead of rewriting poor code, teams refine the remaining 20–40% for accuracy, integration, and polish;

## Consequences of developing with a Spec Kit

- **Development is shifting left**: Teams spend more time upstream on system design, scoping, architecture, and planning, and less time on coding;
- **The developer role is evolving into architects**: Developers are moving from writing code to designing systems and validating implementations;
- **Planning will become decentralized**: Pre-specification becomes more valuable;
- **Integration with SDLC (Software Development Life Cycle) will change**: Specifications become first-class artifacts that can be versioned, tested, and verified;
- **The cost curve will shift, reshaping global delivery**: Traditional development penalizes late bug detection;

## Setting realistic expectations

- **Creating a constitution is hard and non-negotiable**: A strong constitution requires senior engineer judgment, time, and iteration;
- **Automation is not a replacement**: If 60–80% of the generated code is usable after review, that's a win;
- **Scope matters**: Spec Kit currently works best for end-to-end or standalone feature builds, especially in a brownfield context;
- **Value is in structure, not magic**: Spec Kit makes AI predictable by forcing clarity upfront, not by removing engineers from the loop;