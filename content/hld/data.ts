import type {
  Concept,
  CategoryMeta,
  TreeNode,
  MentalModel,
  InterviewPattern,
  CommonMistake,
  PracticeQuestion,
  TopicData,
  LastHourSummary,
} from "@/content/types";

// ─── Mental Model ─────────────────────────────────────────────────────────────

const mentalModel: MentalModel = {
  whatItIs:
    "High-Level Design (HLD) is the discipline of decomposing a system into its major components — services, data stores, message buses, CDNs, and the contracts between them — before writing a single line of code. It answers: what boxes exist, what data flows between them, and what trade-offs justify each architectural decision.",
  whyItExists:
    "Software systems fail at scale not because of bad algorithms but because of bad architecture. HLD forces teams to reason about failure modes, data consistency, operational complexity, and team ownership boundaries before those decisions become expensive to reverse. It converts business requirements into structural constraints that every downstream engineering decision must satisfy.",
  whenToUse: [
    "Designing a new system or major subsystem from scratch",
    "Evaluating a migration from monolith to microservices or vice versa",
    "Planning for a 10x–100x traffic increase on an existing system",
    "Onboarding new teams who need to understand system boundaries",
    "Identifying and remediating single points of failure before an incident",
    "Setting SLO budgets and deciding where to invest in reliability",
  ],
  whereItFails: [
    "Over-engineering early-stage products where requirements are not yet stable",
    "Treating HLD as a one-time artifact rather than a living document",
    "Designing for the 'perfect' architecture and ignoring migration cost from the current state",
    "Ignoring Conway's Law — team structure will re-emerge in the architecture whether you plan for it or not",
    "Conflating HLD with LLD: debating class hierarchies in a system design interview signals poor scope management",
  ],
};

// ─── Categories ───────────────────────────────────────────────────────────────

const categories: CategoryMeta[] = [
  {
    id: "architecture-patterns",
    label: "Architecture Patterns",
    description:
      "Monolith vs microservices, SOA, event-driven, CQRS, event sourcing, saga — the structural blueprints of distributed systems",
  },
  {
    id: "service-design",
    label: "Service Design",
    description:
      "Bounded contexts, service mesh, API gateway vs BFF, strangler fig, sidecar — how to carve and operate individual services",
  },
  {
    id: "data-flow",
    label: "Data Flow & Messaging",
    description:
      "Sync vs async, choreography vs orchestration, outbox pattern, idempotency — ensuring data moves reliably between services",
  },
  {
    id: "api-design",
    label: "API Design",
    description:
      "REST vs gRPC vs GraphQL, versioning, pagination strategies, backward compatibility, contract testing",
  },
  {
    id: "infrastructure",
    label: "Infrastructure & Deployments",
    description:
      "Multi-region, active-active vs active-passive, blue-green, canary, feature flags — operating systems at scale",
  },
  {
    id: "observability",
    label: "Observability",
    description:
      "Distributed tracing, structured logging, RED metrics, SLO/SLA/SLI, alerting philosophy — knowing your system is healthy",
  },
  {
    id: "security-hld",
    label: "Security (HLD)",
    description:
      "Zero-trust networking, OAuth2/OIDC, mTLS for service-to-service auth, secrets management, threat modeling",
  },
  {
    id: "team-topology",
    label: "Team Topology",
    description:
      "Conway's Law, stream-aligned teams, platform teams, enabling teams, cognitive load — aligning org structure with architecture",
  },
];

// ─── Mental Model Tree ────────────────────────────────────────────────────────

const mentalModelTree: TreeNode = {
  id: "root",
  label: "High-Level Design",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "architecture-patterns",
      label: "Architecture Patterns",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "monolith-vs-microservices", label: "Monolith vs Microservices", nodeType: "concept", conceptId: "monolith-vs-microservices", importance: "critical", relatedIds: ["bounded-context", "strangler-fig"] },
        { id: "event-driven-architecture", label: "Event-Driven Architecture", nodeType: "concept", conceptId: "event-driven-architecture", importance: "critical", relatedIds: ["choreography-vs-orchestration", "outbox-pattern"] },
        { id: "cqrs", label: "CQRS", nodeType: "concept", conceptId: "cqrs", importance: "high", relatedIds: ["event-sourcing"] },
        { id: "event-sourcing", label: "Event Sourcing", nodeType: "concept", conceptId: "event-sourcing", importance: "high", relatedIds: ["cqrs"] },
        { id: "saga-pattern", label: "Saga Pattern", nodeType: "concept", conceptId: "saga-pattern", importance: "high", relatedIds: ["choreography-vs-orchestration", "outbox-pattern"] },
      ],
    },
    {
      id: "service-design",
      label: "Service Design",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "bounded-context", label: "Bounded Context (DDD)", nodeType: "concept", conceptId: "bounded-context", importance: "critical", relatedIds: ["monolith-vs-microservices", "team-topology-conways-law"] },
        { id: "api-gateway-vs-bff", label: "API Gateway vs BFF", nodeType: "concept", conceptId: "api-gateway-vs-bff", importance: "high", relatedIds: ["rest-vs-grpc-vs-graphql"] },
        { id: "service-mesh", label: "Service Mesh (Istio)", nodeType: "concept", conceptId: "service-mesh", importance: "high", relatedIds: ["mtls-service-auth"] },
        { id: "strangler-fig", label: "Strangler Fig Pattern", nodeType: "concept", conceptId: "strangler-fig-pattern", importance: "medium", relatedIds: ["monolith-vs-microservices"] },
        { id: "sidecar-pattern", label: "Sidecar Pattern", nodeType: "concept", conceptId: "sidecar-pattern", importance: "medium", relatedIds: ["service-mesh"] },
      ],
    },
    {
      id: "data-flow",
      label: "Data Flow & Messaging",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "sync-vs-async", label: "Sync vs Async Communication", nodeType: "concept", conceptId: "sync-vs-async", importance: "critical", relatedIds: ["choreography-vs-orchestration"] },
        { id: "choreography-vs-orchestration", label: "Choreography vs Orchestration", nodeType: "concept", conceptId: "choreography-vs-orchestration", importance: "high", relatedIds: ["saga-pattern", "event-driven-architecture"] },
        { id: "outbox-pattern", label: "Outbox Pattern", nodeType: "concept", conceptId: "outbox-pattern", importance: "high", relatedIds: ["event-driven-architecture"] },
        { id: "idempotency-keys", label: "Idempotency Keys", nodeType: "concept", conceptId: "idempotency-keys", importance: "high", relatedIds: ["outbox-pattern"] },
      ],
    },
    {
      id: "api-design",
      label: "API Design",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "rest-vs-grpc-vs-graphql", label: "REST vs gRPC vs GraphQL", nodeType: "concept", conceptId: "rest-vs-grpc-vs-graphql", importance: "critical", relatedIds: ["api-gateway-vs-bff"] },
        { id: "api-versioning", label: "API Versioning Strategies", nodeType: "concept", conceptId: "api-versioning", importance: "high", relatedIds: ["backward-compatibility"] },
        { id: "pagination-strategies", label: "Pagination (Cursor vs Offset)", nodeType: "concept", conceptId: "pagination-strategies", importance: "medium", relatedIds: [] },
        { id: "backward-compatibility", label: "Backward Compatibility", nodeType: "concept", conceptId: "backward-compatibility", importance: "high", relatedIds: ["api-versioning"] },
      ],
    },
    {
      id: "infrastructure",
      label: "Infrastructure & Deployments",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "multi-region", label: "Multi-Region Architecture", nodeType: "concept", conceptId: "multi-region", importance: "critical", relatedIds: ["active-active-vs-passive"] },
        { id: "active-active-vs-passive", label: "Active-Active vs Active-Passive", nodeType: "concept", conceptId: "active-active-vs-passive", importance: "high", relatedIds: ["multi-region"] },
        { id: "blue-green-canary", label: "Blue-Green & Canary Deployments", nodeType: "concept", conceptId: "blue-green-canary", importance: "high", relatedIds: ["feature-flags"] },
        { id: "feature-flags", label: "Feature Flags", nodeType: "concept", conceptId: "feature-flags", importance: "medium", relatedIds: ["blue-green-canary"] },
      ],
    },
    {
      id: "observability",
      label: "Observability",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "distributed-tracing", label: "Distributed Tracing (OpenTelemetry)", nodeType: "concept", conceptId: "distributed-tracing", importance: "critical", relatedIds: ["red-metrics"] },
        { id: "red-metrics", label: "RED Metrics", nodeType: "concept", conceptId: "red-metrics", importance: "high", relatedIds: ["slo-budgets"] },
        { id: "slo-budgets", label: "SLO / Error Budgets", nodeType: "concept", conceptId: "slo-budgets", importance: "high", relatedIds: ["red-metrics"] },
      ],
    },
    {
      id: "security-hld",
      label: "Security (HLD)",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "zero-trust", label: "Zero-Trust Networking", nodeType: "concept", conceptId: "zero-trust", importance: "critical", relatedIds: ["mtls-service-auth"] },
        { id: "oauth2-oidc", label: "OAuth2 / OIDC Flows", nodeType: "concept", conceptId: "oauth2-oidc", importance: "high", relatedIds: ["zero-trust"] },
        { id: "mtls-service-auth", label: "mTLS Service-to-Service Auth", nodeType: "concept", conceptId: "mtls-service-auth", importance: "high", relatedIds: ["service-mesh", "zero-trust"] },
      ],
    },
    {
      id: "team-topology",
      label: "Team Topology",
      nodeType: "category",
      importance: "medium",
      children: [
        { id: "team-topology-conways-law", label: "Conway's Law", nodeType: "concept", conceptId: "team-topology-conways-law", importance: "critical", relatedIds: ["bounded-context"] },
        { id: "platform-enabling-teams", label: "Platform & Enabling Teams", nodeType: "concept", conceptId: "platform-enabling-teams", importance: "medium", relatedIds: ["team-topology-conways-law"] },
        { id: "cognitive-load", label: "Cognitive Load Management", nodeType: "concept", conceptId: "cognitive-load", importance: "medium", relatedIds: ["bounded-context", "team-topology-conways-law"] },
      ],
    },
  ],
};

// ─── Last Hour Summary ────────────────────────────────────────────────────────

const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "Architecture is about trade-offs, not best practices — every decision optimizes for some properties at the cost of others. State the trade-offs explicitly.",
    "Conway's Law is not optional: your microservice boundaries will mirror your team boundaries regardless of your diagram. Design org and architecture together.",
    "Prefer async communication between bounded contexts whenever you can tolerate eventual consistency — it decouples services at deployment and failure-mode level.",
    "The Outbox Pattern is the correct solution for dual-write problems. Directly publishing to a message broker inside a DB transaction is not atomic; the outbox is.",
    "CQRS and Event Sourcing solve different problems: CQRS separates read/write scalability; Event Sourcing provides a full audit log and temporal query capability. They are often combined but are independent decisions.",
    "Zero-trust means every request is authenticated and authorized regardless of network origin. mTLS between services plus short-lived JWTs at the edge is the standard implementation.",
    "SLO error budgets are a cultural tool as much as a technical one: they create a shared language between engineering and product for deciding when to ship features vs. invest in reliability.",
  ],
  mustKnowConcepts: [
    {
      name: "Bounded Context",
      oneLiner: "A DDD boundary where a domain model is internally consistent and owns its own data; the unit of microservice decomposition.",
    },
    {
      name: "Saga Pattern",
      oneLiner: "Manages distributed transactions as a sequence of local transactions with compensating rollback steps — either choreographed via events or orchestrated via a central coordinator.",
    },
    {
      name: "CQRS",
      oneLiner: "Separates the write model (commands, normalized, strongly consistent) from the read model (queries, denormalized, eventually consistent) to optimize each independently.",
    },
    {
      name: "Outbox Pattern",
      oneLiner: "Writes domain events to an outbox table in the same DB transaction as the state change, then a relay process publishes them to the broker — guaranteeing at-least-once delivery.",
    },
    {
      name: "SLO / Error Budget",
      oneLiner: "An SLO is a target for a reliability metric (e.g., 99.9% success rate); the error budget is the allowed failure headroom, used to gate risky releases.",
    },
    {
      name: "Zero-Trust",
      oneLiner: "A security model that eliminates implicit trust from network location — every service call is authenticated (mTLS) and authorized (RBAC/ABAC) regardless of where it originates.",
    },
  ],
  topTraps: [
    "Starting with microservices on a greenfield project — you don't have stable bounded contexts yet. Start with a modular monolith and extract services when seams are proven.",
    "Using synchronous HTTP chains for multi-step workflows — one slow downstream service cascades latency to the caller. Use async messaging or the Saga pattern for multi-step business processes.",
    "Conflating SLA (a business contract with penalties) with SLO (an engineering target). SLOs should be stricter than SLAs to give a buffer before breach.",
    "Versioning APIs with v1/v2/v3 as separate deployed services — prefer evolutionary design with additive changes, deprecation headers, and sunset dates instead.",
    "Designing active-active multi-region without addressing write conflicts — you must decide on last-write-wins, CRDTs, or single-region writes with cross-region reads before calling a system 'active-active'.",
  ],
};

// ─── Concepts ─────────────────────────────────────────────────────────────────

const concepts: Concept[] = [
  // ── Architecture Patterns ──────────────────────────────────────────────────
  {
    id: "monolith-vs-microservices",
    title: "Monolith vs Microservices",
    category: "architecture-patterns",
    basic:
      "A monolith is a single deployable unit containing all business logic. Microservices split that logic into independently deployable services communicating over the network.",
    expected:
      "Monoliths are simpler operationally: one deploy pipeline, in-process calls, ACID transactions across modules, and a single observability surface. Microservices provide independent scalability, technology heterogeneity, fault isolation, and team autonomy — at the cost of distributed systems complexity: network partitions, eventual consistency, distributed tracing, and higher deployment overhead. The right choice depends on team size, domain complexity, and operational maturity. Teams under ~30 engineers rarely benefit from microservices.",
    deep:
      "The decomposition decision should be driven by bounded contexts, not technical convenience. Services that share a database are microservices in name only — they retain monolith coupling at the data layer. The modular monolith (well-separated internal modules with strict dependency rules) is underrated: it retains operational simplicity while maintaining architectural clarity, and it is far easier to extract genuine microservices from it later. Key anti-pattern: 'nanoservices' — services so fine-grained that they cannot make decisions independently and must call each other synchronously for every operation, creating distributed monolith latency without the autonomy benefit.",
    interviewAnswer:
      "I default to a modular monolith for new products. Microservices make sense when: (1) distinct parts of the system have wildly different scaling profiles, (2) you need team autonomy across more than 3–4 teams, or (3) you have a proven bounded context that is stable enough to own its own schema. The migration path is always strangler fig — never a big-bang rewrite. The hardest part of microservices is not the technology; it's enforcing 'you own your data' so services don't share databases.",
    trap:
      "Saying 'microservices are more scalable' without qualification. A well-tuned monolith on read replicas often outperforms a naive microservices system with synchronous call chains. The bottleneck is almost always the database, not the application tier.",
    memoryAnchor:
      "Monolith = one giant Swiss Army knife (bulky but everything's right there). Microservices = a toolbox of separate tools (flexible but you keep losing the 10mm socket).",
  },
  {
    id: "event-driven-architecture",
    title: "Event-Driven Architecture",
    category: "architecture-patterns",
    basic:
      "Services communicate by publishing and consuming events on a message broker (Kafka, RabbitMQ, SNS/SQS) rather than calling each other directly.",
    expected:
      "EDA decouples producers from consumers: the order service publishes OrderPlaced and has no knowledge of which downstream services (inventory, billing, notifications) react to it. This enables independent deployability, natural audit trails, and backpressure handling. The cost is operational complexity: you must manage broker availability, consumer group lag, event schema evolution, and out-of-order delivery. Kafka's log retention also serves as an event store, enabling replay — critical for rebuilding derived state.",
    deep:
      "EDA introduces two consistency challenges: (1) dual-write — you cannot atomically write to your DB and publish to a broker in the same operation without the outbox pattern; (2) ordering — Kafka guarantees order within a partition, so you must carefully choose partition keys (e.g., order ID) to ensure events for the same entity are processed sequentially. Consumer idempotency is mandatory because at-least-once delivery guarantees duplicates. Dead-letter queues (DLQs) are the safety valve — a consumer that cannot process a message after N retries should park it in a DLQ for manual inspection, not drop it.",
    interviewAnswer:
      "EDA is my default for cross-bounded-context communication when I can accept eventual consistency. I pair it with: the outbox pattern to eliminate dual-write races, idempotent consumers with deduplication keys, and partition keys aligned to the aggregate root. For schema evolution I use a schema registry (Confluent or AWS Glue) with backward-compatible Avro/Protobuf schemas and a compatibility policy enforced at publish time.",
    trap:
      "Treating EDA as a solution to all coupling problems. Event-driven choreography at scale becomes 'event spaghetti' — it is hard to trace the causal chain of a business process across 10 event types. For complex multi-step workflows, orchestration (Temporal, Step Functions) provides explicit process visibility at the cost of a central coordinator.",
    memoryAnchor:
      "EDA = a town crier shouting news in the square. Anyone who cares listens; the crier doesn't know or care who's in the crowd.",
  },
  {
    id: "cqrs",
    title: "CQRS (Command Query Responsibility Segregation)",
    category: "architecture-patterns",
    basic:
      "CQRS separates write operations (commands) from read operations (queries) into distinct models, allowing each to be optimized independently.",
    expected:
      "In a simple CQRS setup, the command side writes to a normalized, strongly-consistent store (e.g., Postgres). The query side maintains one or more denormalized read models (e.g., Elasticsearch, Redis, a materialized view) built by reacting to events emitted by the command side. This solves the N+1 query problem and allows reads to scale independently. The trade-off is eventual consistency on the read side and the operational burden of keeping projections in sync.",
    deep:
      "CQRS becomes powerful when combined with event sourcing but is valuable independently. The read projection is rebuilt by replaying the event stream — this means you can add new read models retroactively without touching the command side. The hardest operational problem is projection catch-up: when you deploy a new projection, it must replay potentially millions of events, which takes time during which it is stale. Checkpoint snapshotting (storing a periodic aggregate snapshot so replay starts from the snapshot, not event 0) is the standard mitigation. A subtle bug: read models that include business logic create divergence — projections should be pure transformations of events, not re-implementations of domain rules.",
    interviewAnswer:
      "I reach for CQRS when query access patterns are fundamentally different from the write model — for example, a financial system where debits/credits are appended but users need real-time balance across multiple currencies. The command side uses an append-only ledger; the read side uses a projection that aggregates balances per account per currency. Event sourcing on the command side gives us a free audit trail and the ability to replay projections when regulatory requirements change.",
    trap:
      "Applying CQRS to every service. For simple CRUD, a single model with read replicas is sufficient. CQRS adds significant complexity (eventual consistency, projection management, operational overhead) and should only be introduced when the read/write impedance mismatch is causing real pain.",
    memoryAnchor:
      "CQRS = a restaurant with separate 'order' and 'pickup' counters. Writing your order (command) and reading the menu board (query) happen at totally different windows optimized for different speeds.",
  },
  {
    id: "event-sourcing",
    title: "Event Sourcing",
    category: "architecture-patterns",
    basic:
      "Instead of storing the current state of an entity, event sourcing stores the full sequence of events that led to that state. Current state is derived by replaying the event log.",
    expected:
      "The event store is append-only — events are immutable facts. The current aggregate state is reconstructed by folding events. Benefits: complete audit trail for free, ability to reconstruct state at any point in time (temporal queries), natural integration with CQRS projections, and event replay for debugging. Costs: increased storage, complex query patterns (you must build projections for any query beyond 'give me all events for aggregate X'), and schema evolution of past events is painful.",
    deep:
      "Snapshot optimization: replaying thousands of events on every load is expensive. Periodically persist an aggregate snapshot alongside the event position, and on load, start from the latest snapshot then replay only subsequent events. Schema evolution of immutable events is the hardest problem in event sourcing. Strategies: upcasters (transform old event version to new version at read time), versioned event types (OrderPlacedV1, OrderPlacedV2), or weak schema (store JSON and handle missing fields gracefully). The event store must guarantee ordering and optimistic concurrency (reject a write if the expected aggregate version does not match current version) to prevent lost updates.",
    interviewAnswer:
      "Event sourcing is justified when you have compliance requirements for a full audit log, need temporal query capability ('what was the state of account X at 3pm yesterday?'), or need to rebuild multiple different read projections from the same historical fact base. I pair it with snapshot every N events to bound replay time. For schema evolution I use upcasters in the event deserialization layer so consumers always receive the current schema version regardless of when the event was written.",
    trap:
      "Using event sourcing as a general-purpose database pattern. It is a specialized tool. Exposing the raw event store directly as an API violates encapsulation — the event structure is an implementation detail of the aggregate, not a public API.",
    memoryAnchor:
      "Event sourcing = your bank statement. It doesn't store 'balance = $500' — it stores every deposit and withdrawal ever. Replay the list to get the balance.",
  },
  {
    id: "saga-pattern",
    title: "Saga Pattern",
    category: "architecture-patterns",
    basic:
      "A saga coordinates a distributed transaction as a sequence of local transactions across services. If any step fails, compensating transactions undo the previously completed steps.",
    expected:
      "Sagas come in two flavors: choreography (each service publishes events and reacts to others' events) and orchestration (a central saga orchestrator directs each step via commands). Choreography is decentralized and resilient but hard to reason about for complex flows. Orchestration provides explicit process visibility and makes error handling easier but introduces a central coordinator that can become a bottleneck. Compensating transactions must be idempotent and must account for the fact that the system may have made side effects visible externally before the rollback — saga cannot provide true atomicity, only eventual consistency.",
    deep:
      "Saga state must be persisted so the orchestrator or choreography can resume after a crash. The orchestrator itself must be idempotent — receiving the same completion event twice must not advance the saga twice. This is typically handled via a state machine stored in a database with optimistic locking on the saga ID. A critical edge case: compensating transactions can themselves fail. You need a 'stuck saga' detection process that alerts on sagas that haven't progressed for longer than their timeout. Temporal.io solves many saga implementation problems by providing durable execution with automatic retries and built-in state persistence.",
    interviewAnswer:
      "For an e-commerce order flow (reserve inventory → charge payment → confirm shipment), I use an orchestrated saga with the saga state persisted in Postgres. Each step is a command sent to the target service. On failure at any step, the orchestrator executes compensating commands in reverse: refund payment if already charged, release inventory reservation. I use idempotency keys on every command and the Temporal workflow engine to handle retries, timeouts, and state durability.",
    trap:
      "Trying to implement sagas without compensating transactions. You cannot simply 'roll back' a distributed transaction — the inventory service already decremented its count. Compensating transactions are domain operations (re-increment inventory) not technical rollbacks.",
    memoryAnchor:
      "Saga = planning a wedding across multiple vendors. If the caterer cancels, you can't 'undo' the cake tasting — you call each vendor to cancel and get refunds one by one.",
  },

  // ── Service Design ─────────────────────────────────────────────────────────
  {
    id: "bounded-context",
    title: "Bounded Context (DDD)",
    category: "service-design",
    basic:
      "A bounded context is a domain-driven design boundary within which a particular domain model is internally consistent and unambiguous. It is the primary unit for defining microservice scope.",
    expected:
      "Within a bounded context, the ubiquitous language is precise — 'Order' in the payments context means something different from 'Order' in the fulfillment context. The contexts communicate via explicit contracts (events or API calls) using translation layers (anti-corruption layers or open host services). Each context owns its own data store — this is the defining constraint that prevents the data coupling of a distributed monolith. Context maps document the relationships: conformist, customer/supplier, shared kernel, anti-corruption layer.",
    deep:
      "The hardest part of bounded context design is deciding where to draw the lines. Heuristics: (1) cohesion of data — if two services always query each other's data, they likely belong in the same context; (2) team ownership — a context should be owned by at most one team to avoid the coordination overhead of multi-team ownership; (3) change frequency — parts of the domain that change independently should be separate contexts. A common mistake is creating bounded contexts that are too small (nanoservices that must always call each other synchronously to make any decision) — the dependency graph is the litmus test: if a service cannot perform its primary operation without synchronous calls to five others, the boundary is wrong.",
    interviewAnswer:
      "I use event storming workshops with domain experts to identify bounded contexts. Key signals for a boundary: different teams own different parts, the domain language differs (same word means different things), or the data change rates are very different. Once I have candidate boundaries, I draw a context map to make the coupling explicit — if I see more than 2–3 conformist relationships, the boundaries probably need to be reconsidered.",
    trap:
      "Mapping bounded contexts 1:1 to database tables or REST resources rather than to business capabilities. Technical boundaries rarely align with domain boundaries.",
    memoryAnchor:
      "Bounded context = different departments in a hospital. 'Patient' means a billing record to finance and a medical chart to the ER — same word, totally different meaning depending on which floor you're on.",
  },
  {
    id: "api-gateway-vs-bff",
    title: "API Gateway vs Backend for Frontend (BFF)",
    category: "service-design",
    basic:
      "An API gateway is a single entry point that routes, authenticates, and rate-limits calls to backend services. A BFF is a client-specific backend that aggregates data and shapes responses for a particular frontend (mobile, web, third-party).",
    expected:
      "A generic API gateway handles cross-cutting concerns: auth, rate limiting, TLS termination, request routing, and observability. It is not responsible for business logic. A BFF sits between the gateway and the client, aggregating calls to multiple downstream services into the exact payload shape the frontend needs — eliminating over-fetching and reducing round trips. This is especially valuable for mobile clients with bandwidth constraints. Typically you have one BFF per client type: mobile BFF, web BFF, partner API BFF.",
    deep:
      "The BFF pattern solves the 'generic API is a lowest common denominator' problem — a single API serving all clients forces each client to do expensive data transformation on the client side. The risk of BFF is that it becomes a dumping ground for business logic that belongs in domain services. Strong discipline is required: BFFs should contain only presentation logic (data aggregation, transformation, caching for UX performance) and must call downstream services for business decisions. GraphQL can serve as a BFF technology — it allows clients to declare the exact shape they need, avoiding the need for multiple BFF deployments, but it introduces its own complexities (N+1 resolver problem, query depth limiting, authorization complexity at the field level).",
    interviewAnswer:
      "I place an API gateway at the edge for cross-cutting concerns and deploy BFFs per major client type. The mobile BFF, for example, might aggregate a product detail page call that would otherwise require 4 separate API calls from the app — reducing startup time and battery usage. I keep business rules out of BFFs by enforcing a rule: if the logic would break a unit test if moved to the BFF, it belongs in a domain service.",
    trap:
      "Building a BFF that directly accesses other services' databases rather than calling their APIs. This recreates the coupling you were trying to avoid.",
    memoryAnchor:
      "API Gateway = the hotel front desk (handles check-in, directions, complaints for everyone). BFF = a personal concierge for VIP guests (knows exactly what YOU want and fetches it all in one trip).",
  },
  {
    id: "service-mesh",
    title: "Service Mesh (Istio / Linkerd)",
    category: "service-design",
    basic:
      "A service mesh is an infrastructure layer that handles service-to-service communication — traffic routing, retries, circuit breaking, mTLS, and observability — using sidecar proxies deployed alongside each service.",
    expected:
      "The sidecar proxy (Envoy in Istio, linkerd-proxy in Linkerd) intercepts all inbound and outbound traffic. This moves reliability and security concerns out of application code and into the infrastructure: developers no longer implement retry logic or TLS handshakes in each service. The control plane (Istiod) distributes policy — traffic rules, mTLS certificates, telemetry configuration — to all sidecars. Benefits: consistent mTLS across all services, fine-grained traffic splitting for canary deployments, automatic distributed tracing instrumentation, and circuit breaking without library changes.",
    deep:
      "The sidecar adds ~1ms latency per hop and significant memory overhead (Envoy is ~50MB per pod). At very high QPS or on resource-constrained nodes this is measurable. Istio's control plane is operationally complex — misconfigured authorization policies have caused production outages at companies like Lyft. The eBPF-based approach (Cilium, Istio ambient mesh) eliminates the sidecar overhead by moving proxy logic into the kernel, reducing latency and memory usage. For Kubernetes clusters, the service mesh also solves certificate rotation: SPIFFE/SPIRE provides workload identity and automatic certificate rotation, eliminating the manual cert management problem.",
    interviewAnswer:
      "I adopt a service mesh when the team count exceeds the point where manually managing retries, circuit breakers, and mTLS in each service becomes inconsistent. The immediate wins are: (1) mTLS for zero-trust networking without code changes; (2) traffic shifting for canary deployments at the infrastructure level; (3) automatic trace propagation without SDK changes in every service. I start with Linkerd for its simplicity and move to Istio only if I need its advanced traffic management features.",
    trap:
      "Thinking a service mesh eliminates the need to design for failure in application code. The mesh can retry transient failures, but your service must still be idempotent for retries to be safe, and you still need circuit breakers for cascading failure scenarios where the mesh's retry amplifies load.",
    memoryAnchor:
      "Service mesh = invisible bodyguards walking beside every employee. They handle security checks and directions so workers focus on their actual job, not navigating the building.",
  },
  {
    id: "strangler-fig-pattern",
    title: "Strangler Fig Pattern",
    category: "service-design",
    basic:
      "A migration strategy where new functionality is built as new services alongside the monolith. Over time, the monolith is incrementally replaced — strangled — until it can be removed.",
    expected:
      "Named after the fig tree that grows around and eventually replaces its host tree. The pattern works by: (1) placing a facade (API gateway or reverse proxy) in front of the monolith; (2) routing new features to new services through the facade; (3) incrementally extracting existing monolith functionality to services and re-pointing the facade; (4) decommissioning the monolith when it no longer handles any traffic. This is the only safe migration path — big-bang rewrites have a notoriously high failure rate in industry experience.",
    deep:
      "The hardest part of strangler fig is data migration. When you extract a service, it must own its own data store. But the monolith's data may be deeply interleaved with other data in the same tables. The typical approach: (1) the new service writes to its own store AND also writes to the monolith's tables for a period (dual-write); (2) a backfill migrates historical data; (3) after a verification period, the monolith tables are made read-only then dropped. The strangler proxy must handle the case where a request touches both old and new code paths — feature flags or header-based routing can control this at the request level.",
    interviewAnswer:
      "My strangler fig implementation places an Nginx or AWS API Gateway in front of the monolith on day one, even before any extraction. This is low-risk and gives us routing control immediately. I extract services in order of highest change frequency and clearest bounded context — not necessarily the largest or most complex. Each extraction follows: extract interface → dual-write → backfill historical data → verify consistency → cut over → decommission monolith handler.",
    trap:
      "Attempting to extract a service that shares its database with five other monolith modules. Without resolving the data ownership first, you've created a distributed monolith. Always extract ownership of the data before extracting the service.",
    memoryAnchor:
      "Strangler fig = the vine that slowly grows around a tree and eventually replaces it. You never chop the old tree down — you let the new growth take over branch by branch.",
  },
  {
    id: "sidecar-pattern",
    title: "Sidecar Pattern",
    category: "service-design",
    basic:
      "A secondary container (sidecar) is deployed alongside each service container in the same pod/host, handling infrastructure concerns like logging, proxying, or secret injection on the service's behalf.",
    expected:
      "The sidecar decouples infrastructure concerns from application code. Common sidecars: Envoy proxy (traffic management), Fluentd/Fluent Bit (log forwarding), Vault Agent (secret injection and rotation), OpenTelemetry Collector (telemetry export). The sidecar pattern is the foundation of service meshes. Benefits: infrastructure upgrades (e.g., updating the proxy version) do not require application code changes. The sidecar shares the same network namespace as the main container, enabling it to intercept traffic via iptables rules without application awareness.",
    deep:
      "The sidecar lifecycle must be managed carefully in Kubernetes. A sidecar that starts after the main container may miss early traffic; a sidecar that dies before the main container during shutdown can cause connection errors. Kubernetes 1.29 introduced native sidecar support (restartPolicy: Always in initContainers) to address lifecycle ordering. The ambassador pattern is a variant where the sidecar acts as a proxy to external services, handling connection pooling, retries, and protocol translation. The adapter pattern is another variant where the sidecar transforms the main container's output into a standard format expected by external monitoring systems.",
    interviewAnswer:
      "I use the sidecar pattern for any infrastructure concern that would otherwise require updating 30+ service codebases. Secret injection is the highest-value use case: Vault Agent sidecar renews short-lived credentials automatically, eliminating the 'baked-in secrets' anti-pattern without requiring developers to integrate with Vault's SDK directly.",
    trap:
      "Putting business logic in a sidecar. Sidecars should be pure infrastructure concerns. If the sidecar needs to understand domain concepts, it belongs in the main service.",
    memoryAnchor:
      "Sidecar = a motorcycle sidecar. The passenger (sidecar container) rides alongside handling the map, snacks, and radio — but the driver (main service) does the actual driving.",
  },

  // ── Data Flow ──────────────────────────────────────────────────────────────
  {
    id: "sync-vs-async",
    title: "Synchronous vs Asynchronous Communication",
    category: "data-flow",
    basic:
      "Synchronous: the caller blocks waiting for a response (HTTP, gRPC). Asynchronous: the caller publishes a message and continues; the receiver processes it independently (Kafka, SQS, AMQP).",
    expected:
      "Sync communication is simpler to reason about (request-response semantics, easy error propagation) but creates temporal coupling — both services must be up and performant simultaneously. A slow downstream service degrades the upstream caller. Async communication eliminates temporal coupling and enables natural load leveling via buffering, but introduces eventual consistency, message ordering challenges, and requires consumers to be idempotent. Use sync for: queries requiring real-time responses, user-facing reads. Use async for: cross-bounded-context writes, workflows where the caller does not need the result immediately.",
    deep:
      "Sync call chains create latency amplification: a chain of 5 services each adding 20ms = 100ms minimum latency, before any business logic. More critically, availability compounds multiplicatively: if each service is 99.9% available, a 5-service chain is 99.5% available. This is why sync microservice 'orchestration via HTTP' is an anti-pattern for complex workflows. The request-reply pattern over async messaging (a reply-to queue with a correlation ID) allows async communication while preserving a request-response programming model, useful during migrations from sync to async.",
    interviewAnswer:
      "My decision rule: if the caller needs the result of the operation to proceed (e.g., 'is this payment authorized?'), use sync. If the caller needs only to record the intent of an operation (e.g., 'send a shipping notification'), use async. For multi-step workflows I always use async + saga rather than sync chaining, because the availability math makes sync chaining at scale unreliable.",
    trap:
      "Building a synchronous RPC mesh between microservices and calling it microservices architecture. If every service call is synchronous HTTP, you have a distributed monolith with all of the complexity of distribution and none of the resilience benefits.",
    memoryAnchor:
      "Sync = a phone call (both parties must be on the line at the same time). Async = a voicemail (leave your message, they'll get to it when they can).",
  },
  {
    id: "choreography-vs-orchestration",
    title: "Choreography vs Orchestration",
    category: "data-flow",
    basic:
      "Choreography: services react to events autonomously — no central controller. Orchestration: a central orchestrator explicitly directs each step of a workflow.",
    expected:
      "Choreography is decentralized and resilient — no single point of failure for workflow coordination. But debugging a failed business process requires tracing events across multiple services, and adding a new step requires modifying the event contracts of existing services. Orchestration provides explicit visibility into workflow state, easier error handling and compensation, and simpler debugging — but the orchestrator is a coupling point and can become a bottleneck or single point of failure. Choreography suits simple pipelines; orchestration suits complex, long-running business processes with compensating logic.",
    deep:
      "The choice has team topology implications: choreography distributes knowledge of the overall process across teams (each team knows its piece but no team has the full picture), while orchestration centralizes it (the team owning the orchestrator must understand the entire flow). In practice, many systems use a hybrid: orchestration within a bounded context (where a single team has full context) and choreography between bounded contexts (preserving team autonomy). Temporal.io and AWS Step Functions are orchestration engines that solve the durability problem: orchestrator state is persisted so it survives crashes without the developer implementing state machines manually.",
    interviewAnswer:
      "For the order fulfillment flow in an e-commerce platform, I use orchestration within the order bounded context (one orchestrator manages: reserve inventory → charge payment → confirm order) because error handling and visibility matter, and it's one team's domain. Between bounded contexts (order confirmed → notify warehouse → trigger shipping), I use choreography via domain events so the warehouse team can evolve their consumer independently of order logic.",
    trap:
      "Implementing choreography without a way to observe the overall process state. 'Where is order #12345 in the process?' becomes impossible to answer quickly without a dedicated process monitoring projection that subscribes to all relevant events.",
    memoryAnchor:
      "Choreography = a jazz jam session (everyone improvises, no conductor). Orchestration = a symphony orchestra (the conductor tells each section exactly when to play).",
  },
  {
    id: "outbox-pattern",
    title: "Outbox Pattern",
    category: "data-flow",
    basic:
      "Write domain events to an outbox table in the same DB transaction as the state change. A separate relay process reads the outbox and publishes events to the message broker, guaranteeing at-least-once delivery.",
    expected:
      "The fundamental problem: you cannot atomically write to a database AND publish to a message broker — they are two separate systems. If you write to the DB then publish, you can crash between the two and lose the event. If you publish then write, you can crash and publish an event for a change that was never persisted. The outbox pattern solves this by making the DB write the single atomic operation: the outbox table is part of the same ACID transaction as the state change. The relay (Debezium for CDC, or a polling loop) then reads confirmed outbox rows and publishes them, marking them as published.",
    deep:
      "Debezium is the gold standard for the relay: it reads the Postgres WAL (write-ahead log) and publishes changes to Kafka with low latency and no polling overhead. This is 'transactional outbox with CDC'. The published event must include the aggregate version to allow consumers to detect out-of-order delivery. The relay must publish idempotently — it marks outbox rows with a published timestamp and uses Kafka's idempotent producer (exactly-once semantics at the producer level) to avoid duplicate messages. A subtle issue: outbox table growth. You need a cleanup job that deletes published outbox rows older than a retention window, or the table becomes a disk pressure point.",
    interviewAnswer:
      "I implement the outbox pattern with Debezium and Kafka for any service that needs to publish events as part of a state-changing operation. The application writes to its domain tables and an outbox table in one transaction. Debezium watches the WAL and publishes outbox rows to Kafka. The application never calls the Kafka producer directly in the request path — this eliminates the dual-write problem and decouples event publishing latency from request latency.",
    trap:
      "Polling the outbox table with a background thread inside the application process. This works but introduces ordering issues (multiple application instances can publish out of order) and doesn't survive a JVM crash mid-publish. CDC via Debezium is the correct approach.",
    memoryAnchor:
      "Outbox pattern = writing a sticky note and dropping it in an 'outgoing mail' tray in the same motion as filing your paperwork. A mail carrier picks it up later — you never walk to the post office yourself.",
  },
  {
    id: "idempotency-keys",
    title: "Idempotency Keys",
    category: "data-flow",
    basic:
      "An idempotency key is a client-provided unique identifier for a request. The server uses it to detect and de-duplicate retries, returning the same result without executing the operation twice.",
    expected:
      "Required whenever operations have side effects (payments, order creation, emails) and clients may retry on timeout or network error. The server stores the idempotency key alongside the result. On receiving a request: check if key exists → if yes, return cached result; if no, execute and store result with key. The key has a TTL (typically 24–48 hours) after which it expires and a duplicate request would be treated as new. Stripe's API is the industry reference implementation for idempotency keys.",
    deep:
      "Storage of idempotency keys must be atomic with the operation result. If you execute the operation and then store the key, a crash between the two means the second request executes again. Use a transaction: store the key in a pending state, execute the operation, mark the key as complete with the result. If a second request arrives while the first is in-flight (key is in pending state), return 409 Conflict — the client should wait and retry. The key must be scoped to the authenticated user (key = userID + clientProvidedKey) to prevent cross-user replay attacks. For message consumers, idempotency is implemented by recording processed message IDs in a deduplication table checked before processing.",
    interviewAnswer:
      "For a payment API, I require the client to send an idempotency key in every POST request. The API gateway stores the key in Redis with a 24-hour TTL. Before processing, it checks Redis: if the key exists and is complete, it returns the stored response; if it's in-flight, it returns 202 Accepted with a retry-after header. The key is stored atomically with the payment record in Postgres using a unique constraint on (user_id, idempotency_key).",
    trap:
      "Generating idempotency keys on the server side instead of the client. The point of idempotency keys is to allow the client to safely retry a request it is not sure was received. If the server generates the key, the client cannot retry with the same key.",
    memoryAnchor:
      "Idempotency key = the 'confirmation number' on your order. Accidentally hit 'Place Order' twice? The store sees the same confirmation number and says 'already got that one, chief.'",
  },

  // ── API Design ─────────────────────────────────────────────────────────────
  {
    id: "rest-vs-grpc-vs-graphql",
    title: "REST vs gRPC vs GraphQL",
    category: "api-design",
    basic:
      "Three API paradigms: REST uses HTTP + JSON with resource-oriented URLs; gRPC uses HTTP/2 + Protobuf with strongly-typed RPC definitions; GraphQL uses HTTP + JSON with a query language where clients declare the exact data shape they need.",
    expected:
      "REST is the most widely adopted, easiest to debug (human-readable JSON, curl-able), and has the best ecosystem support. It over-fetches by default (returns full resource even if you need two fields) and requires multiple round trips for related data. gRPC is 5–10x faster than REST for the same payload due to binary serialization and HTTP/2 multiplexing — ideal for internal service-to-service communication. Its strong schema (proto files) enables automatic code generation and backward-compatibility checks. GraphQL excels for complex UIs with many entity types and client teams with different data needs — one query replaces many REST calls. It introduces N+1 resolver problems and complex authorization at the field level.",
    deep:
      "gRPC's HTTP/2 transport provides multiplexed streams, enabling bidirectional streaming — a pattern not possible with REST. This is key for real-time data push (server streaming), file uploads (client streaming), and WebRTC signaling. gRPC-Web bridges the gap to browser clients where raw HTTP/2 is not directly accessible. GraphQL's N+1 problem is solved with DataLoader — batching and caching resolver queries within a single request execution. For authorization in GraphQL, field-level permissions require middleware that inspects the query AST before execution, which is significantly more complex than REST endpoint-level auth. Protobuf schema evolution rules: you can add new fields with new field numbers and mark old fields as deprecated, but you can never reuse a field number or change a field type — these are breaking changes.",
    interviewAnswer:
      "I use REST for public APIs (developer ergonomics, wide tooling support), gRPC for internal service-to-service calls (performance, strong typing, streaming), and GraphQL for BFF layers serving complex UIs (eliminates over-fetching, single endpoint for all client data needs). The decision is rarely one-or-the-other — a mature system uses all three in different layers.",
    trap:
      "Using gRPC for public APIs without a transcoding layer. Browser clients cannot call gRPC directly. You need grpc-gateway or Envoy transcoding to expose a REST/JSON facade over your gRPC services for external consumers.",
    memoryAnchor:
      "REST = a restaurant menu (fixed dishes, you get what's listed). GraphQL = a buffet (pick exactly what you want). gRPC = a drive-through intercom (super fast, pre-defined combos, but you need to speak the lingo).",
  },
  {
    id: "api-versioning",
    title: "API Versioning Strategies",
    category: "api-design",
    basic:
      "API versioning allows the API contract to evolve while maintaining backward compatibility for existing clients. Common strategies: URI versioning (/v1/orders), header versioning (Accept: application/vnd.api.v2+json), and query parameter versioning (?version=2).",
    expected:
      "URI versioning is most visible and cacheable but creates parallel API surfaces that must be maintained simultaneously. Header versioning is cleaner but harder to test and debug. The preferred approach for REST APIs is to avoid explicit versioning through evolutionary design: use additive changes (add new fields, never remove or rename), deprecation headers (Sunset, Deprecation), and sunset dates to communicate end-of-life timelines. For gRPC, Protobuf's schema evolution rules handle most versioning concerns without changing the service URL.",
    deep:
      "The Stripe model is the industry gold standard: a single URL, no version in the path, but each API key is pinned to the API version that existed when the key was created. Stripe's backend runs all API versions simultaneously, translating requests/responses at the edge. This gives perfect backward compatibility — your old code never breaks — while allowing the API to evolve. Implementing this requires an API version registry, per-version request/response schemas, and transformation middleware. Consumer-driven contract testing (Pact) is the engineering tool that makes evolutionary design practical: each consumer specifies the exact fields it depends on, and the provider CI verifies it never breaks those contracts.",
    interviewAnswer:
      "I design APIs for evolution from the start: required fields are never removed, field types are never changed, new fields are always optional with sensible defaults. I use Deprecation and Sunset headers to communicate end-of-life timelines with at least 6 months' notice. For major breaking changes (resource restructure), I introduce a new URL prefix (/v2/) but maintain the old version for the sunset period. I use Pact for consumer-driven contract tests to catch breaking changes in CI before they reach production.",
    trap:
      "Versioning every minor change. API version proliferation means maintaining v1, v2, v3, v4 in production simultaneously. Each new version is a maintenance burden. Prefer evolutionary design and only introduce a major version for genuine breaking changes.",
    memoryAnchor:
      "API versioning = building extensions on a house. Best case: add rooms without touching the old ones. Worst case: you're maintaining 8 different floor plans and nobody remembers which door leads where.",
  },
  {
    id: "pagination-strategies",
    title: "Pagination Strategies (Cursor vs Offset)",
    category: "api-design",
    basic:
      "Offset pagination: LIMIT N OFFSET M — client requests page number. Cursor pagination: the server returns an opaque cursor representing the current position; the client passes it back to get the next page.",
    expected:
      "Offset pagination is simple to implement and supports random page access, but it has two problems at scale: (1) OFFSET N forces the database to scan and discard N rows before returning results — O(N) cost; (2) it is unstable under concurrent writes — if a row is inserted before the current offset, a row from the previous page appears in the next page, or a row is skipped. Cursor pagination is O(1) — the cursor encodes the sort key of the last row seen (e.g., created_at + id), and the next query uses a WHERE clause: WHERE (created_at, id) > (cursor_created_at, cursor_id). It is stable under writes but cannot support random page access.",
    deep:
      "Cursor encoding: never expose raw database values as cursors. Encode them as opaque tokens (base64-encoded JSON or encrypted values) to prevent clients from constructing synthetic cursors and to allow changing the underlying sort key without a breaking change. Keyset pagination (cursor based on sort keys) requires that the sort keys be indexed. If the sort is complex (multiple columns, with NULLs), the index design is non-trivial. For bi-directional pagination (next and previous), store both the current cursor and the previous cursor, or use relay-style connection spec (pageInfo with hasNextPage/hasPreviousPage/startCursor/endCursor).",
    interviewAnswer:
      "I default to cursor-based pagination for all high-volume list APIs. The cursor is an opaque base64-encoded token containing the last-seen sort key (e.g., `{created_at: '2024-01-01T00:00:00Z', id: 'abc123'}`). The query uses a compound WHERE clause on the indexed columns. I expose offset pagination only for use cases where random access is required (e.g., a paginated admin table where the user can jump to page 50) and document its instability under writes.",
    trap:
      "Using OFFSET pagination on a table with millions of rows without warning. OFFSET 1000000 causes a full index scan of 1M rows before returning results — query time grows linearly with the offset value.",
    memoryAnchor:
      "Offset pagination = telling a librarian 'skip the first 10,000 books, then give me the next 20' (she has to walk past all 10,000). Cursor pagination = using a bookmark (open right where you left off).",
  },
  {
    id: "backward-compatibility",
    title: "Backward Compatibility",
    category: "api-design",
    basic:
      "A backward-compatible change allows existing clients to continue working without modification. Breaking changes require clients to update their integration.",
    expected:
      "Safe (non-breaking) changes: adding optional request fields with defaults, adding response fields, adding new enum values (with caution), relaxing validation rules, adding new endpoints. Breaking changes: removing or renaming fields, changing field types, adding required request fields, changing HTTP methods or URL structure, tightening validation. For gRPC/Protobuf: never reuse field numbers, never change field types — both are wire-format breaking changes even if the schema compiles.",
    deep:
      "Adding new enum values is technically a breaking change for strictly-typed clients (e.g., Java clients with exhaustive switch statements). The standard mitigation is to include an UNKNOWN/OTHER value in all enums and document that clients must handle unknown values gracefully. This is a protocol design pattern, not a technical fix. JSON Schema and OpenAPI contract drift — when the implementation diverges from the published spec — is the most common source of subtle breaking changes. Consumer-driven contract testing (Pact) catches this class of bug: each consumer has automated tests against the provider's actual behavior, not just its published spec.",
    interviewAnswer:
      "I treat backward compatibility as a first-class engineering constraint, not an afterthought. Every API change goes through a checklist: is this change additive? Does it add required fields? Does it remove or rename anything? Does it change validation behavior? For Protobuf APIs, I run `buf breaking` in CI to catch wire-format breaking changes automatically. For REST APIs I run Pact contract tests against all registered consumer contracts in the provider's CI pipeline.",
    trap:
      "Assuming that because you control all consumers you can ship breaking changes freely. In a microservices system, multiple services consume the same API, and they deploy independently. A breaking change in service A can silently break service B on its next deploy if you do not verify contracts.",
    memoryAnchor:
      "Backward compatibility = the headphone jack promise. You can add Bluetooth, add USB-C, add wireless — but the moment you remove the 3.5mm jack, a million old headphones become paperweights.",
  },

  // ── Infrastructure ─────────────────────────────────────────────────────────
  {
    id: "multi-region",
    title: "Multi-Region Architecture",
    category: "infrastructure",
    basic:
      "Deploying services across multiple geographic regions to reduce latency for global users, provide disaster recovery, and meet data residency compliance requirements.",
    expected:
      "Multi-region introduces the fundamental tension between consistency and latency: a write in us-east-1 must be replicated to eu-west-1 before a user in Europe sees it, which takes time. Strategies: (1) single-region writes (primary region handles all writes, other regions are read replicas — simplest, but writes have latency for non-primary users); (2) active-active (all regions accept writes — lowest latency globally, but requires conflict resolution); (3) data sharding by geography (EU users' data never leaves the EU region — required for GDPR). DNS-based routing (Route 53 latency routing, Cloudflare) directs users to the nearest region.",
    deep:
      "Cross-region replication lag is a first-class concern. If your SLA requires reads to reflect writes within 500ms, you must measure and alert on replication lag. Aurora Global Database provides <1s cross-region replication. For the user session problem (a user logs in from the US then requests from the EU before their session replicates): use global session storage (DynamoDB Global Tables, Redis Enterprise Active-Active) rather than regional session stores. Data sovereignty (GDPR Article 44+) may legally prohibit replicating certain user data outside a jurisdiction — your data layer must support per-user or per-tenant data residency configuration.",
    interviewAnswer:
      "For a B2C platform with global users, I use a primary region (us-east-1) for all writes with Aurora Global Database providing cross-region read replicas at <1s lag. I route reads to the nearest region using Route 53 latency routing. For EU data residency compliance, I shard EU user data to an eu-west-1 cluster that never replicates to other regions. Disaster recovery uses AWS health checks to automatically fail over to a secondary region within 60 seconds.",
    trap:
      "Declaring a system 'multi-region' when the database is still single-region. Multi-region application servers in front of a single-region database just move your SPOF from the application to the database — the latency and availability problem remains.",
    memoryAnchor:
      "Multi-region = opening franchise restaurants in different cities. Each kitchen cooks locally for speed, but the recipe book (data) must stay in sync across all locations.",
  },
  {
    id: "active-active-vs-passive",
    title: "Active-Active vs Active-Passive",
    category: "infrastructure",
    basic:
      "Active-active: all instances/regions handle live traffic simultaneously. Active-passive: one instance/region handles traffic; the passive standby takes over only on failover.",
    expected:
      "Active-passive is simpler: the passive instance is a warm standby that can be promoted in 30–60s. No conflict resolution needed — only one writer exists at a time. Downside: the passive instance is paying for capacity you do not use, and failover involves a state transition that can cause brief unavailability. Active-active runs all instances under load, provides true zero-downtime during regional failures, and uses full capacity. The critical challenge is write conflicts: if two regions accept writes to the same record simultaneously, you need a conflict resolution strategy (last-write-wins with timestamps, CRDTs, or consensus protocol).",
    deep:
      "Last-write-wins (LWW) with timestamps is dangerous: if clocks are not perfectly synchronized (and they are never perfectly synchronized in distributed systems), LWW silently drops valid writes. CRDTs (Conflict-Free Replicated Data Types) provide mathematically guaranteed convergence for specific data structures (counters, sets, maps). For general-purpose entity writes, the safest active-active strategy is to route writes for a given entity (user, order) to a deterministic home region based on a hash or explicit affinity — this eliminates conflicts for entity writes while retaining the availability benefits of active-active. This is 'regional write affinity' and is the approach used by Shopify for their global infrastructure.",
    interviewAnswer:
      "For most systems I recommend active-passive with fast failover (Route 53 health checks + Aurora Global Database promote takes ~<60s) as the starting point — it's dramatically simpler than active-active. I move to active-active only when RTO requirements are under 30 seconds or when global write latency is causing user-facing impact. When I do active-active, I use regional write affinity: users are hashed to a home region for writes, with a consistent hashing scheme, and reads are served locally with cross-region replication lag tolerance.",
    trap:
      "Saying 'we're active-active' when the database is active-passive. The availability guarantee is determined by the weakest component in the chain. Application-level active-active with database-level active-passive provides the database's (lower) availability guarantee.",
    memoryAnchor:
      "Active-active = two goalkeepers both guarding the net simultaneously (tricky coordination). Active-passive = one keeper plays while the backup sits on the bench, ready to sub in if the starter gets injured.",
  },
  {
    id: "blue-green-canary",
    title: "Blue-Green & Canary Deployments",
    category: "infrastructure",
    basic:
      "Blue-green: maintain two identical production environments (blue=current, green=new); switch traffic atomically on deploy. Canary: gradually shift a small percentage of traffic to the new version before full rollout.",
    expected:
      "Blue-green provides instant rollback (flip traffic back to blue) and zero-downtime deployments, but doubles infrastructure cost during the deployment window and requires the new version to handle all traffic at once — no gradual validation. Canary releases expose the new version to a small percentage (1–5%) of real traffic, enabling validation against real usage before full rollout. If error rates spike on the canary, roll back only the canary segment. Canary is superior for validating performance and correctness at scale but requires more sophisticated traffic management infrastructure (Kubernetes traffic splitting, Istio weight-based routing, feature flags).",
    deep:
      "Database schema migrations are the hardest part of blue-green deployments. Both blue and green versions must be able to run simultaneously against the same database during the deployment window. This requires expand/contract migrations: (1) expand: add the new column/table in a backward-compatible way; (2) deploy the new version; (3) contract: remove the old column/table in a subsequent release. This requires at least 3 deployments per schema change. Canary deployments in Kubernetes can be implemented with Argo Rollouts or Flagger, which automate traffic weight adjustment based on observed metrics (error rate, latency) using Prometheus queries as rollout criteria.",
    interviewAnswer:
      "I use canary deployments as the default deployment strategy with automated rollback criteria. Argo Rollouts manages traffic weight: 5% canary for 15 minutes → check error rate < 0.1% and p99 latency < 200ms → 25% → check again → 100%. If any metric check fails, Argo automatically rolls back. For database migrations, I enforce the expand/contract pattern: every migration PR is reviewed for backward compatibility with the previous application version before merging.",
    trap:
      "Running blue-green deployments with a shared database that has a schema migration applied as part of the deployment. If the migration is not backward compatible with the blue version, the instant traffic switch breaks all blue instances. Schema and code deployments must be decoupled.",
    memoryAnchor:
      "Blue-green = having two identical stages — flip the curtain to reveal the new set instantly. Canary = sending one coal miner's canary into the new tunnel first; if it comes back alive, send everyone else.",
  },
  {
    id: "feature-flags",
    title: "Feature Flags",
    category: "infrastructure",
    basic:
      "Feature flags are runtime configuration values that enable or disable features without a code deployment. They allow decoupling feature release from code deployment.",
    expected:
      "Feature flags serve multiple purposes: (1) trunk-based development — merge incomplete features behind a flag to avoid long-lived branches; (2) gradual rollout — enable for 1% of users, ramp to 100%; (3) A/B testing — expose different variants to different user segments; (4) operational kill switches — instantly disable a feature causing production incidents without rolling back a deployment. Managed feature flag services (LaunchDarkly, Split.io, AWS Evidently) provide SDKs with local flag evaluation (no latency overhead), rule-based targeting (user ID, country, plan tier), and audit logs.",
    deep:
      "Feature flag technical debt is a real risk. Flags that are not removed after full rollout accumulate: conditional logic branches, test matrix complexity, and cognitive load. Enforce a policy: every flag has a removal date set at creation; flags older than 90 days without a removal ticket trigger an alert. Flag evaluation must be cached locally — evaluating a flag via an HTTP call on every request adds unacceptable latency. SDK-level flag state is streamed from the flag service and evaluated in-memory (<1ms). Database feature flags (storing flag values in a DB row) are an anti-pattern — you've just traded a slow config mechanism for a DB dependency.",
    interviewAnswer:
      "I use feature flags as the primary mechanism for both continuous delivery and operational safety. Every new user-facing feature ships behind a flag, enabling us to deploy code daily while controlling the release schedule independently. Flags are defined in LaunchDarkly with: targeting rules (user ID or percentage rollout), a kill switch (override to off for all users), and a removal date. The removal date is enforced by a bot that creates Jira tickets 2 weeks before expiry.",
    trap:
      "Using feature flags for configuration management (database URLs, timeouts, secret keys). Feature flags are for feature gating, not configuration. Configuration belongs in environment variables or a secrets manager with proper access control.",
    memoryAnchor:
      "Feature flags = light switches on a wall. Each switch controls a different room's lights — flip one on for beta testers, keep others off, and if something catches fire, kill the switch instantly without rewiring the house.",
  },

  // ── Observability ──────────────────────────────────────────────────────────
  {
    id: "distributed-tracing",
    title: "Distributed Tracing (OpenTelemetry)",
    category: "observability",
    basic:
      "Distributed tracing tracks a request as it flows across multiple services by propagating a trace context (trace ID + span ID) through all calls. OpenTelemetry is the vendor-neutral standard for instrumentation.",
    expected:
      "A trace is a collection of spans. A span represents a single unit of work (an HTTP handler, a DB query, a Kafka message processing) with timing, attributes, and status. The trace context is propagated via HTTP headers (W3C Trace Context standard: traceparent header) or gRPC metadata. OpenTelemetry SDKs auto-instrument popular frameworks (Spring, Express, Django) with zero code changes. Traces are exported to backends (Jaeger, Zipkin, Tempo, Datadog, Honeycomb) for visualization. Use traces to: find which service is the bottleneck in a slow request, understand the causal chain of a production error, measure the performance impact of a code change.",
    deep:
      "Sampling is critical: tracing 100% of requests at high QPS is expensive in terms of storage and processing. Head-based sampling (decide at trace root whether to sample) is simple but loses traces for rare errors. Tail-based sampling (buffer trace data and decide after the trace is complete, favoring errored or slow traces) is more complex but captures the high-value traces. OpenTelemetry Collector supports tail sampling processors. Trace context must be propagated through async boundaries: when a service publishes a Kafka message, it must embed the trace context in the message headers; the consumer must extract it and create a child span. Without this, traces are fragmented and async hops are invisible.",
    interviewAnswer:
      "I instrument all services with the OpenTelemetry SDK using auto-instrumentation, which captures 95% of spans without code changes. I configure the OTel Collector for tail-based sampling: always sample error traces and traces over 2s p99; sample 5% of normal traffic. For Kafka async boundaries, I use the OTel Kafka instrumentation that automatically propagates trace context in message headers. Traces go to Tempo for storage with Grafana for visualization, integrated with the same dashboards as metrics and logs.",
    trap:
      "Conflating distributed tracing with logging. Logs record discrete events; traces record the causal structure and timing of a request across services. Both are necessary — traces tell you where time is spent; logs tell you what happened at each step.",
    memoryAnchor:
      "Distributed tracing = a GPS tracker on a package. You can see every warehouse, truck, and sorting facility it passed through — and exactly how long it sat at each stop.",
  },
  {
    id: "red-metrics",
    title: "RED Metrics (Rate / Errors / Duration)",
    category: "observability",
    basic:
      "RED is a framework for instrumenting services: Rate (requests per second), Errors (error rate or count), Duration (request latency histogram). Together they provide a complete picture of service health.",
    expected:
      "For every service endpoint, capture: Rate (how much traffic is it handling?), Errors (what proportion of requests are failing?), Duration (at what latency percentile — p50, p95, p99, p999?). This is sufficient to answer: 'is this service healthy?', 'has this deploy degraded performance?', and 'is this service meeting its SLO?'. USE (Utilization, Saturation, Errors) is a complementary framework for infrastructure resources (CPU, memory, disk, network): Utilization (how busy is the resource?), Saturation (is it queueing?), Errors (is it failing?). RED is for services; USE is for resources.",
    deep:
      "Latency percentiles matter more than averages. The average is misleading: p50=10ms, p99=2000ms means 1% of users experience 2-second latency, which is invisible in the average. Always instrument with histograms (Prometheus histogram or summary) and report p50, p95, p99, p999. The p999 (99.9th percentile) is the 'long tail' — at 1000 RPS, 1 request per second experiences p999 latency. For SLO measurement, use a ratio metric: error_rate = sum(rate(http_requests_total{status=~'5..'}[5m])) / sum(rate(http_requests_total[5m])). This is burned against the error budget.",
    interviewAnswer:
      "I instrument every service with Prometheus histograms on three metrics: http_requests_total (labeled by endpoint, method, status_code), http_request_duration_seconds (histogram), and http_errors_total. Grafana dashboards show RED metrics per endpoint per deploy. SLO alerts fire when the 1-hour error burn rate exceeds 2x the allowed budget — fast enough to catch incidents before they exhaust the monthly budget, with enough signal to avoid false positives.",
    trap:
      "Setting alert thresholds on averages rather than percentiles. An average latency alert will miss the p99 degradation that your most demanding users experience.",
    memoryAnchor:
      "RED metrics = a doctor's vital signs check. Rate = heart rate (how fast is it pumping?). Errors = blood pressure spikes (something's wrong). Duration = reaction time (how sluggish is the patient?).",
  },
  {
    id: "slo-budgets",
    title: "SLO / SLI / SLA / Error Budgets",
    category: "observability",
    basic:
      "SLI (Service Level Indicator): a measurable metric (e.g., request success rate). SLO (Service Level Objective): a target for the SLI (e.g., 99.9% success rate). SLA (Service Level Agreement): a business contract with financial penalties for SLO breach. Error budget: the allowed failure headroom (100% - SLO target).",
    expected:
      "A 99.9% availability SLO means 8.7 hours of allowed downtime per year (0.1% of 8760 hours). The error budget is the 0.1%. Teams track error budget burn rate: if you burn 50% of your monthly error budget in one week, you need to slow down feature work and invest in reliability. Error budgets create alignment between engineering and product: when the budget is healthy, ship features; when it's exhausted, freeze new launches and focus on reliability. SLOs should be set based on user happiness (what latency/error rate causes users to notice?) not on what is technically achievable.",
    deep:
      "Multi-window, multi-burn-rate alerting is the correct alerting strategy for SLOs. Alert when: (1) burn rate > 14x in a 1-hour window AND burn rate > 14x in a 5-minute window (fast burn — page immediately); (2) burn rate > 6x in a 6-hour window AND burn rate > 6x in 30-minute window (slow burn — ticket/slack). This covers both sudden spikes and slow degradation. This approach, described in the Google SRE Workbook, reduces alert noise while catching all meaningful reliability issues. Error budget policies should be documented: what happens when the budget is exhausted? (engineering freeze, SLO review, postmortem). Without a policy, the error budget is just a metric, not a cultural tool.",
    interviewAnswer:
      "I set SLOs by starting with user research: what response time causes users to abandon? What error rate generates support tickets? I target SLOs 20% stricter than SLAs to provide a buffer. Error budget burn is tracked with multi-window alerting in Prometheus/Alertmanager. The error budget policy is: at 50% monthly burn, the team allocates 20% of sprint capacity to reliability work; at 100% burn, all feature work stops until the budget is restored.",
    trap:
      "Conflating SLO with SLA. If your SLO equals your SLA, any SLO violation is immediately an SLA breach and a customer-impacting business event. SLOs must be stricter than SLAs to provide headroom for operational response.",
    memoryAnchor:
      "Error budget = a jar of 'oops tokens.' Each outage spends a token. When the jar is empty, you stop shipping features and fix things. SLO is your personal speed limit; SLA is the speed that gets you a ticket.",
  },

  // ── Security HLD ───────────────────────────────────────────────────────────
  {
    id: "zero-trust",
    title: "Zero-Trust Networking",
    category: "security-hld",
    basic:
      "Zero-trust is a security model that removes implicit trust from network location. Every request — even from inside the corporate network — must be authenticated and authorized before access is granted.",
    expected:
      "Traditional 'castle and moat' security trusts anything inside the network perimeter. Zero-trust assumes the network is hostile: authenticate every service identity (mTLS), authorize every API call (RBAC or ABAC), encrypt all traffic in transit (TLS everywhere), and verify device posture for human users. In a Kubernetes context: (1) network policies restrict pod-to-pod communication to explicitly allowed pairs; (2) service mesh (Istio) enforces mTLS and authorization policies between services; (3) RBAC controls access to Kubernetes API resources; (4) pod security standards prevent privilege escalation.",
    deep:
      "SPIFFE (Secure Production Identity Framework For Everyone) provides workload identity in zero-trust environments. Each workload gets a SPIFFE Verifiable Identity Document (SVID) — a short-lived X.509 certificate identifying the workload's service account and namespace. SPIRE (the SPIFFE Runtime Environment) is the reference implementation. mTLS uses SVIDs for mutual authentication: service A presents its SVID to service B, which verifies it against the SPIRE trust bundle. Certificates rotate automatically (every hour by default), eliminating the long-lived credentials problem. The network policy model (deny-all default, allow-list specific pod-to-pod flows) is the technical enforcement mechanism — without it, a compromised pod can reach any other pod on the cluster.",
    interviewAnswer:
      "I implement zero-trust with: (1) Istio service mesh for mTLS between all services with SPIFFE/SPIRE workload identity; (2) Istio AuthorizationPolicy for service-to-service RBAC (only the order service can call the payment service); (3) OPA/Gatekeeper for Kubernetes admission control; (4) network policies with default-deny ingress/egress. External users authenticate via OAuth2/OIDC at the API gateway; internal service calls use mTLS certificates, no API keys or passwords.",
    trap:
      "Treating VPN as zero-trust. A VPN moves the trust boundary from the office network to the VPN endpoint — it is still perimeter-based security, not zero-trust. Zero-trust authenticates and authorizes every individual request regardless of network origin.",
    memoryAnchor:
      "Zero-trust = an airport where everyone goes through security at every gate, not just the entrance. Being 'inside the building' doesn't mean you skip the metal detector.",
  },
  {
    id: "oauth2-oidc",
    title: "OAuth2 / OIDC Flows",
    category: "security-hld",
    basic:
      "OAuth2 is an authorization framework allowing third-party applications to access resources on a user's behalf without sharing credentials. OIDC (OpenID Connect) extends OAuth2 with authentication — it provides a standard way to verify user identity.",
    expected:
      "Key flows: Authorization Code Flow (for server-side apps — most secure; uses PKCE extension for SPAs and mobile apps); Client Credentials Flow (for service-to-service — no user involved; client ID + secret exchanged for access token); Device Authorization Flow (for TVs/CLIs where browser redirect is impractical). Tokens: Access Token (short-lived JWT for API authorization, typically 15 minutes), Refresh Token (longer-lived, used to obtain new access tokens without re-authentication, typically 30 days), ID Token (OIDC JWT containing user identity claims — never sent to APIs).",
    deep:
      "PKCE (Proof Key for Code Exchange) prevents authorization code interception attacks for public clients (SPAs, mobile apps) that cannot safely store a client secret. The client generates a random code_verifier, derives code_challenge = SHA256(code_verifier), sends code_challenge with the auth request, then sends code_verifier with the token exchange. An interceptor who captures the authorization code cannot exchange it without the code_verifier. Token introspection vs JWT verification: JWTs are self-contained (verify with public key, no network call), but revocation requires a blacklist check (token introspection endpoint or short TTL + refresh token revocation). The correct security model: access tokens are JWTs with 15-minute expiry; refresh tokens are opaque tokens with server-side storage enabling instant revocation.",
    interviewAnswer:
      "For a B2C web app, I use Authorization Code Flow + PKCE. The SPA never sees the client secret — the backend handles the token exchange. Access tokens are JWTs signed by the identity provider (Auth0, Cognito), verified by services using the provider's JWKS endpoint (with local key caching). Services do not accept access tokens older than 15 minutes. For service-to-service, I use Client Credentials Flow with short-lived tokens cached by the calling service to avoid per-request token fetches.",
    trap:
      "Storing JWTs in localStorage. XSS attacks can exfiltrate localStorage contents. Store tokens in httpOnly, Secure cookies — they are inaccessible to JavaScript. The 'token in memory' approach (React state) is XSS-safe but lost on page reload, requiring silent refresh on startup.",
    memoryAnchor:
      "OAuth2 = a valet parking ticket. You hand the valet (app) a limited ticket to park your car (access data) without giving them your actual car keys (password). OIDC adds a photo ID check so you prove who you are too.",
  },
  {
    id: "mtls-service-auth",
    title: "mTLS Service-to-Service Authentication",
    category: "security-hld",
    basic:
      "Mutual TLS (mTLS) requires both the client and server to present certificates during the TLS handshake. This authenticates both ends of a connection, providing stronger guarantees than one-way TLS where only the server presents a certificate.",
    expected:
      "In service-to-service communication, mTLS ensures: (1) the client is connecting to the real server (server certificate validation — same as regular TLS); (2) the server knows exactly which service is calling it (client certificate validation — the new capability). This eliminates the need for API keys or passwords between services. Service mesh infrastructure (Istio) handles certificate issuance, rotation, and mTLS enforcement transparently — services communicate over what looks like plain HTTP to the application code, while the sidecar handles TLS.",
    deep:
      "Certificate pinning vs CA-based validation: pinning the specific leaf certificate provides stronger guarantees but makes rotation painful; CA-based validation (trusting certificates signed by your internal CA) is operationally manageable with short-lived certs. SPIFFE SVIDs (X.509 certificates with a SPIFFE ID URI in the Subject Alternative Name) encode service identity in a portable, verifiable format. The SPIFFE ID (spiffe://cluster.local/ns/payments/sa/payment-service) encodes the trust domain, namespace, and service account — Istio AuthorizationPolicies can allow/deny based on the SPIFFE ID of the calling service. Certificate rotation: SVIDs should rotate frequently (every 1 hour) to limit the blast radius of a compromised certificate. SPIRE handles rotation automatically, pushing new SVIDs to workloads before expiry.",
    interviewAnswer:
      "In my Kubernetes architecture, Istio injects sidecar proxies and automatically provisions mTLS between all services using SPIFFE/SPIRE workload identity. I apply an Istio PeerAuthentication policy (mode: STRICT) at the mesh level to reject any plaintext inter-service traffic. AuthorizationPolicies then add RBAC: the frontend service is only allowed to call the product catalog and cart services — all other calls are denied by default. This gives us mTLS with zero application code changes and per-service RBAC in Kubernetes config.",
    trap:
      "Issuing long-lived client certificates (1-year validity) for service-to-service auth. If a certificate is compromised, it remains valid for the remainder of its lifetime. Use certificates with 1-hour TTL and automate rotation — the blast radius of a compromise is bounded to 1 hour.",
    memoryAnchor:
      "mTLS = a secret handshake where BOTH people must prove they know it. Regular TLS is like checking only the bouncer's badge; mTLS means the bouncer checks YOUR badge too.",
  },

  // ── Team Topology ──────────────────────────────────────────────────────────
  {
    id: "team-topology-conways-law",
    title: "Conway's Law",
    category: "team-topology",
    basic:
      "Conway's Law: organizations design systems that mirror their communication structure. If four teams build a compiler, you get a four-pass compiler.",
    expected:
      "Conway's Law is descriptive, not prescriptive — it will happen whether you plan for it or not. The practical implication for HLD: service boundaries and team boundaries must be co-designed. If you design a microservices architecture that requires three teams to coordinate for every deployment, you have created a distributed monolith that mirrors a siloed org structure. The 'Inverse Conway Maneuver': deliberately structure teams to match the desired architecture. If you want two independently deployable services, you need two teams that can make decisions independently — including owning their own data stores and deployment pipelines.",
    deep:
      "Team Topologies (Skelton & Pais) provides a structured vocabulary: Stream-aligned teams (own a product area end-to-end, from customer need to production), Platform teams (provide self-service infrastructure capabilities to stream-aligned teams), Enabling teams (temporary consultants that upskill stream-aligned teams on a specific capability), Complicated-subsystem teams (own a particularly complex subsystem requiring deep specialist knowledge). The key insight: platform teams must treat stream-aligned teams as their customers — a platform that requires tickets and 2-week lead times is not a platform, it is a bottleneck. Cognitive load is the operating constraint: each team should own enough to be autonomous but not so much that they cannot maintain deep expertise in their area.",
    interviewAnswer:
      "When designing a new microservices architecture, I start by drafting the target org chart alongside the service map. If I can't map each service to a team that can own it independently, the service boundaries are wrong. I apply the Team Topologies model: stream-aligned teams own customer-facing domains (checkout, catalog, search); a platform team provides the Kubernetes platform, CI/CD, and observability tooling as internal products; enabling teams are used temporarily to uplift stream-aligned teams on new capabilities (e.g., migrating to gRPC).",
    trap:
      "Designing a microservices architecture and then assigning team ownership as an afterthought. The org chart will reshape the architecture back to something it can maintain. Align teams and architecture from the first design session.",
    memoryAnchor:
      "Conway's Law = your software will look like your org chart whether you want it to or not. Four pizza teams build a four-service system. It's architectural gravity — you can't fight it, so design with it.",
  },
  {
    id: "platform-enabling-teams",
    title: "Platform Teams & Enabling Teams",
    category: "team-topology",
    basic:
      "A platform team builds and maintains shared internal infrastructure (Kubernetes, CI/CD, observability, service templates) as a product for other engineering teams. An enabling team temporarily embeds with or consults for stream-aligned teams to build a specific capability.",
    expected:
      "Platform teams reduce cognitive load on stream-aligned teams by abstracting infrastructure complexity. The platform team owns the 'paved road': opinionated, well-supported ways to deploy a service, add observability, and manage secrets. The platform must have a product mindset — track adoption, gather feedback, provide documentation and support SLAs. If stream-aligned teams bypass the platform (shadow IT), the platform is not meeting their needs. Enabling teams are time-limited: they work with a stream-aligned team for 2–3 months to establish a capability (e.g., adoption of OpenTelemetry), then exit — leaving the stream-aligned team self-sufficient.",
    deep:
      "The anti-pattern is a 'DevOps team' that is actually a platform team operating as a gatekeeper: stream-aligned teams raise tickets, the DevOps team deploys. This creates a bottleneck, destroys team autonomy, and violates the 'you build it, you run it' principle. The platform team should provide self-service tooling so stream-aligned teams can deploy, scale, debug, and roll back without raising a ticket. 'Platform as a product' means versioning the platform, providing a changelog, and deprecating old APIs with notice — the same practices used for external-facing products.",
    interviewAnswer:
      "I staff a platform team at roughly 1 platform engineer per 10 stream-aligned engineers. The platform team owns: the Kubernetes cluster, CI/CD pipelines (Argo CD, GitHub Actions templates), the internal service catalog, the observability stack (Prometheus, Grafana, Tempo), and golden path service templates. Stream-aligned teams can deploy to production on day one using the golden path — no tickets required. The platform team's OKR is measured by platform adoption and by stream-aligned team deployment frequency.",
    trap:
      "Treating platform team headcount as overhead. A well-staffed platform team multiplies the velocity of every stream-aligned team they support — it is one of the highest-leverage engineering investments a company can make.",
    memoryAnchor:
      "Platform team = the road construction crew. They don't deliver pizza, but every pizza delivery team goes faster because the roads are smooth. Enabling team = a driving instructor who rides along temporarily until you pass the test.",
  },
  {
    id: "cognitive-load",
    title: "Cognitive Load Management",
    category: "team-topology",
    basic:
      "Cognitive load is the total amount of information a team needs to hold in their heads to do their job. High cognitive load slows delivery, increases errors, and causes burnout.",
    expected:
      "Each team has a finite cognitive capacity. When a team owns too many services, too many on-call domains, or must understand too many external dependencies to do their job, their cognitive load exceeds capacity. Signs of overload: slow response to incidents, high on-call burden, difficulty onboarding new engineers, frequent mistakes in domains the team 'owns'. Team Topologies recommends keeping team cognitive load manageable by: constraining the scope of each team's ownership, providing platform tools that reduce the cognitive overhead of infrastructure, and using enabling teams to temporarily augment capacity when introducing new capabilities.",
    deep:
      "Cognitive load has three types: intrinsic (the inherent complexity of the domain — cannot be reduced, only managed), extraneous (accidental complexity from poor tools, unclear processes, missing documentation — should be eliminated), and germane (the beneficial effort of building mental models — should be supported). The platform team's primary function is reducing extraneous cognitive load. Service mesh, centralized observability, and golden path templates are examples of infrastructure that removes extraneous complexity from service teams. Excessive inter-team dependencies are a primary driver of extraneous cognitive load: if team A cannot ship a feature without coordinating with teams B, C, and D, the cognitive overhead of that coordination accumulates each sprint.",
    interviewAnswer:
      "I use cognitive load as a design constraint when evaluating service decompositions. If a proposed service boundary requires team A to understand team B's domain model deeply to work with it, the boundary is in the wrong place. The test: can a new engineer on the team understand the team's entire service ownership within 2 weeks? If not, the scope is too large. I use internal dependency graphs to identify teams with high fan-in (many teams depend on them) — these teams have disproportionate cognitive load from coordination and must be addressed through either platform productization or boundary restructuring.",
    trap:
      "Confusing cognitive load with team size. Adding engineers to a high-cognitive-load team does not solve the problem — it adds coordination overhead. The solution is to reduce scope, improve tooling, or improve the quality of interfaces (cleaner APIs, better documentation, stronger contracts).",
    memoryAnchor:
      "Cognitive load = juggling. A team can juggle 3-4 balls reliably. Hand them 12 balls and they don't juggle faster — they just drop everything. Adding more jugglers doesn't help if all 12 balls must stay in one act.",
  },
];

// ─── Interview Patterns ───────────────────────────────────────────────────────

const interviewPatterns: InterviewPattern[] = [
  {
    question: "Design a system like Twitter/X — focus on the tweet feed.",
    answer:
      "Start with requirements: 300M DAU, 500M tweets/day, reads >> writes (fan-out ratio ~200:1). Core services: Tweet Service (writes tweets to Postgres, publishes TweetCreated event), Fan-out Service (subscribes to TweetCreated, pre-populates follower timelines in Redis sorted sets using timestamp as score), Timeline Service (reads pre-populated timelines from Redis for fast delivery). For celebrities (>1M followers), use lazy fan-out: do not pre-populate, query followers at read time and merge with cached celebrity tweets. Kafka handles the write burst with backpressure. Redis cluster for timeline cache (sorted sets, TTL 48h). CDN (CloudFront) for media. Multi-region read replicas for global latency.",
    whyAsked: "Tests your ability to handle asymmetric read/write loads, fan-out design, and caching strategy at scale.",
    trap: "Designing fan-out for all users uniformly. Celebrity accounts with millions of followers make synchronous fan-out at write time impractical — you need the hybrid push/pull model.",
  },
  {
    question: "How do you migrate a monolith to microservices without downtime?",
    answer:
      "Use the strangler fig pattern: (1) Place an API gateway or reverse proxy in front of the monolith immediately (low risk, enables routing control). (2) Identify the first bounded context to extract — choose high change frequency and clear domain ownership over convenience. (3) Build the new service alongside the monolith. (4) Implement dual-write in the monolith to populate both the old DB tables and the new service's store during transition. (5) Backfill historical data to the new service. (6) Verify data consistency with a comparison layer. (7) Cut over routing in the proxy from monolith to new service. (8) Remove the dual-write code from the monolith. Repeat per bounded context. Never do a big-bang rewrite.",
    whyAsked: "Tests your understanding of migration risk management, data ownership, and the strangler fig pattern.",
    trap: "Proposing a big-bang rewrite ('we'll rewrite everything in 6 months'). This almost always fails due to underestimated scope and business changes during the rewrite.",
  },
  {
    question: "Walk me through how you would design an SLO for a payment API.",
    answer:
      "Step 1 — Identify the SLI: for a payment API, the primary SLI is success rate (successful payment responses / total payment requests excluding known user errors like invalid card). Step 2 — Set the target based on user research and business impact: 99.95% (26 minutes downtime/month). This is stricter than our SLA of 99.9% to give operational headroom. Step 3 — Define the error budget: 0.05% of requests per month (~2,000 failed requests at 300 RPS). Step 4 — Implement multi-window burn rate alerting: alert at 14x burn rate over 1h (fast burn), 6x over 6h (slow burn). Step 5 — Define the error budget policy: at 50% monthly burn, engineering freeze on features; at 100%, all-hands reliability sprint. Step 6 — Review quarterly and adjust based on user feedback.",
    whyAsked: "Tests your understanding of SLO methodology as a product/engineering alignment tool, not just a monitoring metric.",
    trap: "Setting the SLO equal to the SLA. Any SLO miss is then immediately an SLA breach — you have no operational buffer.",
  },
  {
    question: "A downstream service you depend on is slow. How do you prevent it from taking down your service?",
    answer:
      "Circuit breaker pattern: track the error rate / timeout rate on calls to the downstream service. When the error rate exceeds a threshold (e.g., 50% in a 60s window), trip the circuit — immediately fail all calls to that service with a local error (no waiting for timeout). After a reset timeout (e.g., 30s), allow a single probe request — if it succeeds, close the circuit; if it fails, stay open. Bulkhead pattern: isolate the thread pool or connection pool for the slow service from other downstream dependencies. A slow service should exhaust its own bulkhead, not starve threads handling requests to healthy services. Timeout + retry with exponential backoff: set aggressive timeouts (p99 latency + margin) and retry transient errors only, with jitter to prevent thundering herds. Fallback: return a cached response or a graceful degraded experience when the circuit is open.",
    whyAsked: "Tests your understanding of resilience patterns: circuit breakers, bulkheads, timeouts, and graceful degradation.",
    trap: "Relying on retries alone without circuit breakers. Retries amplify load on an already struggling downstream service, making the problem worse — this is retry storm / thundering herd.",
  },
  {
    question: "How do you handle a distributed transaction across Order Service, Inventory Service, and Payment Service?",
    answer:
      "Use an orchestrated saga. The Order Service creates a saga record (status: PENDING) and acts as the orchestrator: (1) Send ReserveInventory command to Inventory Service → wait for InventoryReserved event. (2) Send ChargePayment command to Payment Service → wait for PaymentCharged event. (3) On success: mark order as CONFIRMED and publish OrderConfirmed. (4) On any failure: execute compensating commands in reverse — RefundPayment (if payment was charged), ReleaseInventory (if inventory was reserved). Saga state is persisted in Postgres with optimistic locking. Commands include idempotency keys. Use Temporal.io for durability: workflow state and retry logic are handled by the framework, not custom code.",
    whyAsked: "Tests your understanding of distributed transaction management, the saga pattern, and compensation logic.",
    trap: "Proposing two-phase commit (2PC) for this scenario. 2PC requires all participants to be available simultaneously and blocks resources during the prepare phase — it does not scale to microservices across network boundaries and creates a distributed deadlock risk.",
  },
  {
    question: "Explain how you would design the observability stack for a 20-service system.",
    answer:
      "Three pillars: (1) Metrics: Prometheus scrapes metrics from all services (RED metrics per endpoint). Grafana dashboards provide service health views. Alertmanager handles alert routing with multi-window burn rate alerts for SLOs. (2) Logs: structured JSON logs from all services, collected by Fluent Bit (sidecar or DaemonSet), shipped to Loki or Elasticsearch. Logs include trace_id for correlation with traces. (3) Traces: OpenTelemetry SDK auto-instruments all services. OTel Collector receives traces, applies tail-based sampling, and exports to Tempo (or Jaeger). Grafana provides unified trace/log/metric correlation. Cross-cutting: every log line and metric is tagged with service, environment, version, and region. Trace IDs link all three signals. On-call runbooks are linked from Grafana alerts.",
    whyAsked: "Tests your understanding of the three observability pillars and how they integrate for root-cause analysis in distributed systems.",
    trap: "Describing logging as the only observability tool. Logs alone cannot show the latency distribution of a call chain or the causal structure of a slow request across 5 services — you need traces for that.",
  },
  {
    question: "How do you design a rate limiter that works across multiple API gateway instances?",
    answer:
      "Requirements: rate limit per API key (e.g., 1000 req/min), accurate across all gateway instances, sub-millisecond overhead. Algorithm: token bucket or sliding window log. Distributed implementation: use Redis as the shared counter store. Token bucket in Redis: store current token count and last refill timestamp per API key (HASH). On each request, Lua script atomically: calculates elapsed time since last refill, adds tokens proportional to elapsed time (capped at bucket max), checks if tokens >= 1, decrements if allowed, updates the key. Lua scripts are atomic in Redis — no race conditions. For higher throughput: local token bucket in each gateway instance with a periodic sync (pull quota in batches of 100 from Redis instead of per-request) reduces Redis calls by 100x with slightly looser accuracy. Sliding window counter: Redis ZSET per key, store timestamps of recent requests, trim entries older than the window, count remaining, reject if count >= limit. Accurate but O(n) per request.",
    whyAsked: "Tests your understanding of distributed rate limiting algorithms, Redis atomic operations, and the accuracy vs. performance trade-off.",
    trap: "Proposing a single in-memory rate limiter per gateway instance. Each gateway maintains independent counts — a client can exceed the global rate limit by N times the number of gateway instances.",
  },
  {
    question: "How do you approach API versioning for a platform used by hundreds of external partners?",
    answer:
      "Strategy: evolutionary design with explicit versioning only for breaking changes. (1) Design APIs for extensibility: optional fields with defaults, tolerant reader pattern in clients, additive changes only. (2) Consumer-driven contract testing with Pact: every partner registers their contract; provider CI verifies no regressions. (3) Deprecation process: add Deprecation and Sunset headers (RFC 8594) to deprecated endpoints; 12-month minimum sunset period for external partners. (4) For genuine breaking changes: introduce new URL path (/v2/) with full backward compatibility maintained on /v1/ for the sunset period. (5) Never delete a field or change its type — use schema evolution rules (mark as deprecated, add a replacement field with a migration guide). (6) Communication: partner developer portal with changelogs, deprecation notices, and migration guides. Proactively reach out to partners using deprecated endpoints.",
    whyAsked: "Tests your understanding of API lifecycle management, backward compatibility as an engineering constraint, and external partner relationship management.",
    trap: "Versioning every minor change and maintaining v1 through v8 simultaneously. Each maintained version is ongoing operational and documentation debt. Evolutionary design dramatically reduces the need for major versions.",
  },
];

// ─── Common Mistakes ──────────────────────────────────────────────────────────

const commonMistakes: CommonMistake[] = [
  {
    wrong: "Starting with microservices on a greenfield project where the domain model isn't stable.",
    correct: "Start with a well-modularized monolith (modular monolith pattern). Extract services only when bounded contexts are stable, team ownership is clear, and a specific scaling or autonomy need justifies the distribution cost.",
  },
  {
    wrong: "Sharing a database between microservices to simplify data access.",
    correct: "Each service must own its own schema and data store. Cross-service data access goes through the owning service's API or via events. A shared database is a coupling point that eliminates independent deployability and makes schema evolution impossible without cross-team coordination.",
  },
  {
    wrong: "Using synchronous HTTP chains for multi-step business workflows (order → payment → inventory → shipping).",
    correct: "Use async messaging + saga pattern. Each step publishes an event or command; subsequent steps react independently. This provides fault isolation, natural load leveling, and eliminates cascading latency from the slowest step in the chain.",
  },
  {
    wrong: "Writing to a database AND publishing to a message broker in the same request handler without the outbox pattern.",
    correct: "Use the transactional outbox pattern. Write domain events to an outbox table in the same ACID transaction as state changes. A separate relay (Debezium + Kafka) publishes events from the outbox. This guarantees exactly-once state change with at-least-once event delivery.",
  },
  {
    wrong: "Setting SLO targets equal to SLA commitments.",
    correct: "SLOs must be stricter than SLAs (typically by 10–20%) to provide an operational buffer. If the SLO and SLA are identical, every SLO miss is immediately a breach with financial consequences, leaving zero time for operational response.",
  },
  {
    wrong: "Using average latency as the primary performance metric in dashboards and alerts.",
    correct: "Use percentile metrics (p50, p95, p99, p999) from histogram buckets. Averages hide long-tail latency. At 1000 RPS, p999 means 1 user per second experiences the worst-case latency. Alert on p99 burn against SLO, not on averages.",
  },
  {
    wrong: "Treating VPN access as equivalent to zero-trust security.",
    correct: "Zero-trust authenticates and authorizes every individual service call regardless of network origin. Implement mTLS for service-to-service communication, OAuth2/OIDC for user-to-service, and network policies as the enforcement layer — not network perimeter controls.",
  },
  {
    wrong: "Storing OAuth2 access tokens in localStorage for web applications.",
    correct: "Store tokens in httpOnly, Secure, SameSite=Strict cookies, which are inaccessible to JavaScript and protected against XSS. If using SPA token-in-memory approach, implement silent refresh via a hidden iframe or refresh token rotation to persist sessions across page reloads.",
  },
  {
    wrong: "Designing active-active multi-region without a write conflict resolution strategy.",
    correct: "Define the write conflict policy before claiming active-active: last-write-wins (requires synchronized clocks — dangerous), CRDTs (for specific data structures), or regional write affinity (hash entities to a home region for writes, serve reads locally). Without this, concurrent writes to the same entity from two regions silently corrupt data.",
  },
  {
    wrong: "Implementing blue-green deployments without expand/contract database migration discipline.",
    correct: "Schema migrations must be backward-compatible with the previous application version. Use expand (add new column, deploy new app version) then contract (remove old column in a subsequent release) for all schema changes. Applying a breaking migration during a blue-green deploy breaks all running blue instances instantly.",
  },
  {
    wrong: "Building a 'DevOps team' that owns all production deployments via ticket-based workflow.",
    correct: "Apply the 'you build it, you run it' principle with a platform team providing self-service tooling. Platform teams build deployment pipelines, Kubernetes abstractions, and observability dashboards that stream-aligned teams use autonomously. The platform team does not deploy on behalf of others.",
  },
  {
    wrong: "Proposing two-phase commit (2PC) for distributed transactions across microservices.",
    correct: "Use the saga pattern (choreography or orchestration) with compensating transactions. 2PC requires synchronous coordination between all participants, blocks resources during the prepare phase, and has cascading failure risk if the coordinator crashes — it does not work reliably across independent services over a network.",
  },
];

// ─── Practice Questions ───────────────────────────────────────────────────────

const practiceQuestions: PracticeQuestion[] = [
  {
    code: `System Context:
You are designing Uber's real-time ride-matching platform.
Requirements:
- 10M daily active riders, 2M drivers
- Sub-500ms match latency (rider requests ride → driver assigned)
- Driver location updates: every 4 seconds from each active driver
- Global deployment: 50+ cities
- Strong consistency required for assignment (no double-booking)

Current pain point: Location service is a hot spot — it receives 500k location
updates/second at peak and must answer "find nearest available drivers within
2km of rider location" queries within 50ms.`,
    question: "Design the location tracking and ride-matching architecture. Focus on: the data model for driver locations, the matching algorithm architecture, ensuring no double-booking under high concurrency, and multi-region strategy for global deployment.",
    answer: "Location Service: use a geospatial index (Redis with GEOADD/GEORADIUS or a purpose-built geo DB like PostGIS). Driver location updates are written to Redis Geo sorted sets partitioned by city/zone. This allows O(log N) nearest-neighbor queries. At 500k updates/sec, shard Redis by geographic zone — each zone handles one city or metropolitan area independently. Matching Service: on a rider request, query Location Service for the nearest K available drivers (K=10), then score by ETA using a routing service, assign the top candidate. Assignment must be transactional: use Redis SET NX (atomic set-if-not-exists) on the driver ID with the trip ID as value and a 10-second TTL. If SET NX fails, the driver was already assigned — try the next candidate. This provides optimistic concurrency control without distributed locks. Multi-region: city-level data lives in the region nearest to that city (latency). A rider in London talks to the EU region; all drivers in London are tracked in the EU region. No cross-region coordination needed for matching — each region is autonomous. Global traffic routing via Anycast DNS. Surge pricing uses city-level aggregation that can tolerate 30-second eventual consistency — no global consensus required.",
  },
  {
    code: `System Context:
You are the architect for a fintech platform processing payments.
Current state: a Django monolith deployed on 3 servers behind a load balancer.
The monolith handles: user accounts, payment processing, transaction history,
fraud detection, notifications, and reporting.

Scale metrics:
- Current: 10k transactions/day
- Target (18 months): 1M transactions/day (100x growth)
- Regulatory: PCI-DSS compliance, transaction audit log required for 7 years
- SLA: 99.95% availability for payment processing

Team: 3 squads of 5 engineers each.`,
    question: "Design the migration path from monolith to microservices and the target architecture for the 1M transactions/day scale. Prioritize which services to extract first and why. Address the 7-year audit log requirement and PCI-DSS compliance.",
    answer: "Migration strategy — strangler fig in order of priority: (1) Extract Fraud Detection first: it has different scaling characteristics (CPU-intensive ML model inference vs I/O-bound payment processing), needs independent deployment to update models, and is a clear bounded context. Deploy behind the monolith via API call initially. (2) Extract Notification Service: completely async, lowest risk, zero consistency requirements. Publish events from the monolith; notification service consumes them. (3) Extract Payment Processing: highest value, highest risk. Use dual-write + CDC (Debezium) to migrate transaction data to a new Postgres schema owned by the Payment Service. Target architecture: Payment Service → writes transactions to its own Postgres with event sourcing (append-only ledger for 7-year audit). Each payment event is immutable and timestamped — this satisfies both the audit log requirement and provides temporal query capability. Outbox pattern publishes PaymentProcessed events to Kafka. Fraud Service consumes events and responds asynchronously for post-authorization fraud checks. Transaction History Service: CQRS read model, subscribes to Kafka, projects denormalized transaction views into Elasticsearch for flexible reporting queries. PCI-DSS: cardholder data (PAN) lives only in the Payment Service, encrypted at rest with HSM-managed keys. Other services see only masked card numbers. Network segmentation: Payment Service in a separate VPC with no outbound internet access except to payment gateways. All inter-service calls use mTLS. SLO: 99.95% = 26 minutes downtime/month. Achieve via: multi-AZ Postgres with synchronous replication, auto-failover <60s, circuit breakers on all downstream dependencies, active-passive multi-region with 30-minute RTO.",
  },
  {
    code: `System Context:
Slack-like real-time messaging system.
Requirements:
- 50M DAU, 5B messages/day
- Messages must be delivered in order within a channel
- Offline users receive all messages sent while offline (no message loss)
- Message history searchable back 5 years
- Real-time presence indicators (online/offline/typing)
- Workspace isolation: each enterprise customer's data is logically isolated

WebSocket connections: 50M concurrent at peak.`,
    question: "Design the real-time messaging architecture. Focus on: WebSocket connection management at 50M concurrent connections, message ordering guarantees within a channel, offline message delivery, and the search architecture for 5 years of message history.",
    answer: "Connection layer: WebSocket connections are stateful — cannot be handled by stateless HTTP servers. Deploy specialized WebSocket gateway servers (each handles 50k connections = 1000 server instances). Client connects to the nearest gateway via DNS anycast. Gateway maintains connection state (user ID → connection) in-process and registers in Redis (user_id → gateway_instance_id) for routing incoming messages. Message ordering: each channel has a dedicated partition in Kafka (channel_id % partition_count). Kafka's per-partition ordering guarantee ensures messages within a channel are totally ordered. A sequence number service assigns monotonically increasing message IDs per channel using a Postgres sequence — this is the canonical order. Message storage: write to Cassandra (optimized for time-series writes, horizontal scale for 5B messages/day). Partition key = (workspace_id, channel_id), clustering key = message_id DESC. This supports efficient 'load messages before this ID' pagination. Offline delivery: message delivery receipt is tracked per user per message in Redis (expires after delivery). On reconnect, client sends its last-seen message ID; server queries Cassandra for all messages with higher IDs and pushes them over WebSocket. Search: async pipeline — Kafka consumer indexes messages to Elasticsearch with workspace_id as a field-level security filter (enterprise isolation). 5-year retention is manageable with ILM (index lifecycle management) using warm/cold tiers on cheaper storage. Presence: heartbeat from client every 30s → set Redis key (user:presence) with 60s TTL. Absence of key = offline. Typing indicators are fire-and-forget UDP-like events over WebSocket with no persistence.",
  },
  {
    code: `System Context:
E-commerce platform similar to Amazon.
Black Friday scale: 10x normal traffic for 24 hours.
Normal: 100k orders/day, 1M product views/day.
Black Friday: 1M orders/day, 50M product views/day.

Known bottlenecks from last year:
1. Product catalog DB became a hot spot (read-heavy, lots of price/stock updates)
2. Order processing pipeline backed up — 45-minute delay in order confirmation
3. Inventory oversell: 10k orders placed for items with 0 stock

Systems: Monolith with Postgres, no message queue.`,
    question: "Redesign the architecture to handle Black Friday scale. Address the three known bottlenecks specifically: catalog read performance, order processing throughput, and inventory consistency under concurrent load.",
    answer: "Catalog bottleneck — CQRS + read-through cache: Product catalog has read/write impedance mismatch (reads 50:1 vs writes). Apply CQRS: write model stays in Postgres (handles price and stock updates with full ACID). Read model is a Redis cache per product (TTL 30s, acceptable for stock display). Warm the cache pre-Black Friday. CDN caches product detail pages with 60s TTL for anonymous users — eliminates DB reads for 90% of product views. Stock count displays use 'approximate' read from Redis; the exact check happens only at order placement. Order processing bottleneck — async pipeline: instead of synchronous order creation (validate → reserve inventory → charge payment → update order → send email, all in one HTTP request), publish an OrderRequested event to Kafka and return 202 Accepted immediately. Downstream workers handle: inventory reservation (consumer 1), payment (consumer 2, after inventory confirmed), order confirmation (consumer 3), email (consumer 4). Each stage is independently scalable. Kafka consumer lag is the backpressure mechanism — add consumer instances horizontally during peak load. Inventory oversell — optimistic concurrency control: never use a naive UPDATE stock = stock - quantity WHERE product_id = X. This allows oversell under concurrent load. Use: UPDATE inventory SET quantity = quantity - :qty WHERE product_id = :id AND quantity >= :qty RETURNING quantity. If rows updated = 0, stock was insufficient — return 409. This is a single atomic operation using Postgres row-level locking. For extreme peak (flash sales), use Redis atomic DECR with a floor check: Lua script that decrements only if current value > 0. Redis handles 1M ops/sec — suitable for flash sale inventory bursts. Reconcile Redis counts with Postgres in a background job every 60 seconds.",
  },
  {
    code: `System Context:
Multi-tenant SaaS platform (like Salesforce).
- 5000 enterprise tenants, ranging from 100 to 500k users each
- Data isolation requirement: tenant data must never be visible to other tenants
- Customization: tenants can configure custom fields, workflows, and integrations
- Compliance: SOC2, some tenants require HIPAA/GDPR with data residency in EU
- Cost model: 3 pricing tiers — Starter (shared infra), Pro (shared infra, more limits), Enterprise (isolated infra option)

Current: All tenants share one Postgres instance, schema per tenant (5000 schemas).`,
    question: "Design the multi-tenancy architecture for isolation, compliance, and scalability. Address the data residency requirements for EU tenants, the schema-per-tenant scalability limit, and the infrastructure isolation for Enterprise tier.",
    answer: "Tenancy model strategy — tiered isolation: Starter/Pro: pool model — row-level tenancy with tenant_id column + RLS (Row-Level Security) policies in Postgres. RLS is enforced at the DB level, providing strong isolation even if application code has bugs. Eliminates the 5000-schema problem (hitting Postgres limits and connection pool fragmentation). Enterprise: silo model — dedicated Postgres instance per enterprise customer, deployed to the customer's required region. This provides physical isolation, dedicated resources, and data residency control. Architecture: a Tenant Registry service stores each tenant's tier, assigned database cluster, and region. Every API request goes through middleware that: reads the tenant ID from the JWT, looks up the tenant's DB connection config from the Tenant Registry (cached in Redis), establishes a connection to the correct DB, sets the tenant_id session variable for RLS enforcement. EU data residency: HIPAA/GDPR Enterprise tenants in the EU are deployed to eu-west-1 exclusively. The Tenant Registry maps their tenant_id to the EU cluster. Data from these tenants never leaves the EU region — not even for analytics (a separate EU-region data warehouse). Connection pool management: with 5000 tenants on shared clusters, PgBouncer in transaction mode pools connections — idle tenant sessions do not hold Postgres connections. Customization: custom fields stored as JSONB columns with tenant-specific JSON Schema validation (stored in the Tenant Registry). Workflows stored as DAG definitions in a workflow table. This avoids dynamic schema generation (no ALTER TABLE per tenant) while supporting per-tenant customization. Compliance logging: all data access is logged with tenant_id, user_id, and action to an append-only audit log (immutable S3 bucket with Object Lock for WORM compliance).",
  },
  {
    code: `System Context:
You are the lead architect for a streaming platform (Netflix-scale).
Content library: 15,000 titles, each with multiple quality variants (4K, 1080p, 720p, 480p).
User base: 200M subscribers globally.
Peak concurrent streams: 25M at 8pm in each timezone.
Content delivery: each video segment is 2–10MB, streamed in chunks.
Personalization: 80% of watched content comes from recommendations.

Infrastructure: On-premise data centers (legacy) + AWS (migration in progress).`,
    question: "Design the video streaming architecture. Focus on: the CDN and content delivery strategy for 25M concurrent streams, the recommendation system architecture at 200M users scale, and the hybrid on-premise/cloud migration strategy.",
    answer: "Content delivery — CDN-first architecture: video files are stored in S3 (origin). CloudFront CDN with 200+ PoPs serves video segments globally. At 25M concurrent streams of average 5Mbps = 125Tbps of egress — CloudFront at this scale with Origin Shield reduces origin load by 99%. Cache-key design: each video segment URL includes the quality variant and a content hash (not timestamp) — this maximizes cache hit rate across all users watching the same content. Adaptive bitrate streaming (HLS/DASH): the player selects quality based on available bandwidth, requesting short 2-second segments. The CDN caches each segment independently. New content: when a title is added, a transcoding pipeline (MediaConvert or custom FFmpeg) produces all quality variants and pushes them to S3, then warms the CDN cache by pre-fetching into popular PoPs before the title's release date. Recommendation system: offline component — Spark MLlib trains collaborative filtering models on S3 data weekly (200M users × 15k titles interaction matrix). Model output: per-user recommendation vectors stored in DynamoDB (user_id → [title_ids, scores]). Online component — on homepage load, the recommendation API reads the user's pre-computed vector from DynamoDB (<10ms), applies real-time signals (recently watched, time of day, trending in region), and returns ranked titles. Real-time signals are computed on a Flink stream over Kafka (recent play events). The hybrid model (offline batch + online real-time re-ranking) provides personalization quality close to pure real-time at a fraction of the compute cost. Migration strategy: strangler fig. New traffic is routed to AWS; on-premise handles decreasing legacy traffic. Video assets are migrated to S3 incrementally by content age (newest first). Origin Shield in AWS acts as a unified origin — CDN does not distinguish between on-premise vs S3 origins. The on-premise data centers are decommissioned region by region as AWS regions absorb their traffic.",
  },
  {
    code: `System Context:
Healthcare data platform — EHR (Electronic Health Record) integration hub.
Connects 200 hospital systems to insurance companies and pharmacies.
Data types: patient demographics, lab results, prescriptions, clinical notes (HL7 FHIR format).
Compliance: HIPAA — PHI must be encrypted, access logged, and data never retained longer than necessary.
Volume: 500M FHIR transactions/day.
Latency requirement: real-time lab result routing <5 seconds end-to-end.

Integration challenge: each hospital uses a different EHR vendor (Epic, Cerner, Allscripts)
with slightly different FHIR implementations.`,
    question: "Design the integration hub architecture. Address: the multi-EHR adapter pattern for FHIR normalization, HIPAA-compliant data handling (encryption, access logging, retention), real-time routing for lab results, and the API design for downstream consumers (insurance, pharmacy).",
    answer: "Adapter layer — anti-corruption layer per EHR vendor: each EHR vendor's FHIR dialect is translated to a canonical internal FHIR R4 model by a dedicated adapter service (Epic Adapter, Cerner Adapter, Allscripts Adapter). Adapters are deployed per hospital system and handle vendor-specific quirks (field naming differences, missing required fields with sensible defaults, non-standard extensions). The canonical FHIR model flows into the integration hub. This is the anti-corruption layer pattern from DDD — downstream consumers never see vendor-specific deviations. Routing and real-time delivery: ingested FHIR resources are published to Kafka, partitioned by patient_id (ensures ordering for a given patient's records). A routing engine subscribes to Kafka, applies routing rules stored in a rules DB (lab results from Hospital X → Insurance Y, Pharmacy Z), and pushes to destination-specific queues (SQS for insurance, direct API for pharmacy). p99 latency target: <5s. Kafka + routing processing adds ~200ms. WebSocket push to pharmacy systems for real-time lab results; polling with long-poll for insurance. HIPAA compliance: all data encrypted at rest (AES-256 with KMS-managed keys). Encryption at transit (TLS 1.3). PHI fields (patient name, DOB, SSN) are tokenized using a format-preserving encryption (FPE) service — downstream consumers receive tokens that can be detokenized only with explicit permission. Access logging: every FHIR read/write operation is logged to an immutable audit log (CloudWatch Logs → S3 with Object Lock). Log entries include: who accessed, what resource, from which IP, timestamp, and the purpose code. Retention: FHIR resources are deleted after 90 days (configurable per data type and jurisdiction) via lifecycle policies on S3. The audit log is retained for 6 years per HIPAA requirement. API for downstream consumers: FHIR R4 REST API with SMART on FHIR authorization (OAuth2 scopes mapped to FHIR resource types and access levels). Each consumer has a scoped access token — the pharmacy can only read Prescription resources for their patients; insurance can read only resources covered by their authorization. Rate limiting per consumer via API gateway.",
  },
  {
    code: `System Context:
You are designing the developer platform for a company that has grown from
1 team to 50 engineering teams over 3 years.

Current pain points:
- Each team builds their own CI/CD pipeline from scratch (3-week onboarding)
- No standardized observability — each team uses different tools, no unified dashboard
- Secret management is ad hoc — some teams use .env files in the repo
- 15 different logging formats across 50 teams
- Incident response: no on-call runbooks, no automated alerting, no postmortem process
- Compliance: SOC2 audit failed — no evidence of access controls or change management

Architecture goal: Build an internal developer platform (IDP) that reduces
new service onboarding from 3 weeks to 1 day.`,
    question: "Design the internal developer platform architecture. Prioritize: the service template/golden path, unified observability, secrets management, and the organizational rollout strategy to drive adoption across 50 existing teams.",
    answer: "Platform architecture — four capability domains: (1) Golden path service template: a Cookiecutter/Backstage template generates a new service with: Dockerfile, Kubernetes Helm chart, GitHub Actions CI pipeline (lint → test → build image → push to ECR → deploy via Argo CD), pre-configured OpenTelemetry SDK, structured logging (JSON, standard fields: service, version, trace_id, level), Prometheus metrics endpoint, Vault Agent sidecar for secrets, and a README with runbook links. A new team runs one command and has a production-ready service skeleton in 15 minutes. Backstage provides the software catalog — every service is registered with owner, on-call, dependencies, and SLOs. (2) Unified observability stack: Prometheus (metrics) + Loki (logs) + Tempo (traces) + Grafana (unified query and dashboards). All three signals are linked by trace_id. New services get a pre-built Grafana dashboard (RED metrics per endpoint) on first deploy — zero configuration. Alertmanager routes alerts to PagerDuty by team ownership tag in the service catalog. SLO alerting is pre-configured (multi-window burn rate) for every service that declares an SLO in its catalog entry. (3) Secrets management: Vault with Kubernetes auth backend. Vault Agent sidecar injects secrets as files or env vars at pod startup. No secrets in .env files, no secrets in Terraform state. Dynamic secrets (Vault generates short-lived DB credentials per service) are used for all database access. Vault audit log satisfies SOC2 access control evidence. (4) Rollout strategy: platform adoption cannot be mandated — it must be earned. Phase 1: enable new services only. All greenfield services use the golden path. Phase 2: provide migration tooling for high-pain-point teams (teams with the most on-call burden or longest onboarding). Prioritize quick wins. Phase 3: enable teams (Team Topologies enabling team model) embed with the remaining teams for 4-week sprints to migrate them. SOC2: Argo CD provides GitOps change management — every production change is a reviewed and merged PR, creating the change management audit trail SOC2 requires. RBAC in Kubernetes and Vault provides the access control evidence.",
  },
];

// ─── Topic Data ───────────────────────────────────────────────────────────────

export const topicData: TopicData = {
  topicTitle: "High-Level Design",
  topicMeta: "60–75 min · Senior level",
  lastUpdated: "2026-04-10",
  lastHourConceptIds: [
    "monolith-vs-microservices",
    "bounded-context",
    "event-driven-architecture",
    "outbox-pattern",
    "saga-pattern",
    "slo-budgets",
    "zero-trust",
  ],
  lastHourSummary,
  mentalModel,
  categories,
  mentalModelTree,
  concepts,
  interviewPatterns,
  commonMistakes,
  practiceQuestions,
};
