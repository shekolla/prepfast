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
    "System design is the discipline of decomposing a vague product requirement into a concrete, scalable architecture: choosing the right data stores, communication protocols, consistency guarantees, and operational safeguards so the system meets its SLOs under expected and unexpected load.",
  whyItExists:
    "No single machine can handle internet-scale traffic. System design exists to reason about how to distribute work across thousands of machines while keeping data consistent, latency low, and failures contained — because at scale, everything fails eventually and every trade-off has a measurable cost.",
  whenToUse: [
    "When building a new product feature that will serve millions of users — design before you code",
    "When a service is hitting scaling limits: latency rising, error rates climbing, databases at capacity",
    "When evaluating architectural changes: adding a cache layer, switching databases, introducing a message queue",
    "In interviews whenever the prompt includes traffic numbers, availability requirements, or cross-service interactions",
    "When doing capacity planning: estimating storage, bandwidth, compute needs for the next 12–24 months",
    "When designing for reliability: identifying single points of failure and planning mitigation",
  ],
  whereItFails: [
    "Over-engineering for scale that will never come — premature distribution adds operational complexity with no benefit",
    "Ignoring the operational cost: every new component (Kafka, Redis, Cassandra) needs monitoring, on-call, and expertise",
    "Treating CAP theorem as binary — real systems tune consistency per operation, not globally",
    "Designing the happy path only and ignoring cascading failure modes, partial failures, and network partitions",
  ],
};

// ─── Category Metadata ────────────────────────────────────────────────────────

const categories: CategoryMeta[] = [
  {
    id: "scalability",
    label: "Scalability",
    description:
      "Horizontal vs vertical scaling, stateless services, sharding strategies, and auto-scaling patterns for handling growth",
  },
  {
    id: "databases",
    label: "Databases",
    description:
      "RDBMS vs NoSQL trade-offs, replication, indexing internals, ACID vs BASE, and connection pooling",
  },
  {
    id: "caching",
    label: "Caching",
    description:
      "Cache topologies (aside, write-through, write-behind), eviction policies, stampede prevention, CDN, and Redis vs Memcached",
  },
  {
    id: "messaging",
    label: "Messaging",
    description:
      "Pub/sub vs message queues, delivery guarantees, Kafka internals, idempotency, and backpressure",
  },
  {
    id: "consistency",
    label: "Consistency",
    description:
      "CAP theorem, eventual vs strong consistency, consensus algorithms (Raft/Paxos), vector clocks, and CRDTs",
  },
  {
    id: "networking",
    label: "Networking",
    description:
      "Load balancers (L4 vs L7), DNS, TCP vs UDP, HTTP/2, WebSockets, gRPC, and API gateways",
  },
  {
    id: "reliability",
    label: "Reliability",
    description:
      "SLA/SLO/SLI, circuit breakers, bulkheads, rate limiting algorithms, chaos engineering, and graceful degradation",
  },
  {
    id: "interview-framework",
    label: "Interview Framework",
    description:
      "Structured approach: requirements gathering, back-of-envelope estimation, API design, data modeling, and scaling discussion",
  },
];

// ─── Mental Model Tree ────────────────────────────────────────────────────────

const mentalModelTree: TreeNode = {
  id: "root",
  label: "System Design",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "scalability",
      label: "Scalability",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "horizontal-vs-vertical", label: "Horizontal vs Vertical Scaling", nodeType: "concept", conceptId: "horizontal-vs-vertical", importance: "critical" },
        { id: "stateless-services", label: "Stateless Services", nodeType: "concept", conceptId: "stateless-services", importance: "critical" },
        { id: "sharding", label: "Sharding Strategies", nodeType: "concept", conceptId: "sharding", importance: "critical" },
        { id: "auto-scaling", label: "Auto-Scaling", nodeType: "concept", conceptId: "auto-scaling", importance: "high" },
      ],
    },
    {
      id: "databases",
      label: "Databases",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "rdbms-vs-nosql", label: "RDBMS vs NoSQL", nodeType: "concept", conceptId: "rdbms-vs-nosql", importance: "critical" },
        { id: "read-replicas", label: "Read Replicas", nodeType: "concept", conceptId: "read-replicas", importance: "high" },
        { id: "indexes", label: "Index Types (B-tree, LSM)", nodeType: "concept", conceptId: "indexes", importance: "high" },
        { id: "acid-base", label: "ACID vs BASE", nodeType: "concept", conceptId: "acid-base", importance: "critical" },
        { id: "connection-pools", label: "DB Connection Pools", nodeType: "concept", conceptId: "connection-pools", importance: "medium" },
      ],
    },
    {
      id: "caching",
      label: "Caching",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "cache-strategies", label: "Cache Strategies", nodeType: "concept", conceptId: "cache-strategies", importance: "critical" },
        { id: "eviction-policies", label: "Eviction Policies", nodeType: "concept", conceptId: "eviction-policies", importance: "high" },
        { id: "cache-stampede", label: "Cache Stampede", nodeType: "concept", conceptId: "cache-stampede", importance: "high" },
        { id: "cdn", label: "CDN", nodeType: "concept", conceptId: "cdn", importance: "high" },
        { id: "redis-vs-memcached", label: "Redis vs Memcached", nodeType: "concept", conceptId: "redis-vs-memcached", importance: "medium" },
      ],
    },
    {
      id: "messaging",
      label: "Messaging",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "pubsub-vs-queue", label: "Pub/Sub vs Message Queue", nodeType: "concept", conceptId: "pubsub-vs-queue", importance: "high" },
        { id: "delivery-guarantees", label: "Delivery Guarantees", nodeType: "concept", conceptId: "delivery-guarantees", importance: "critical" },
        { id: "kafka-internals", label: "Kafka Internals", nodeType: "concept", conceptId: "kafka-internals", importance: "high" },
        { id: "idempotency", label: "Idempotency", nodeType: "concept", conceptId: "idempotency", importance: "critical" },
      ],
    },
    {
      id: "consistency",
      label: "Consistency",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "cap-theorem", label: "CAP Theorem", nodeType: "concept", conceptId: "cap-theorem", importance: "critical" },
        { id: "eventual-vs-strong", label: "Eventual vs Strong Consistency", nodeType: "concept", conceptId: "eventual-vs-strong", importance: "critical" },
        { id: "consensus", label: "Consensus (Raft/Paxos)", nodeType: "concept", conceptId: "consensus", importance: "high" },
        { id: "vector-clocks-crdts", label: "Vector Clocks & CRDTs", nodeType: "concept", conceptId: "vector-clocks-crdts", importance: "medium" },
      ],
    },
    {
      id: "networking",
      label: "Networking",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "load-balancers", label: "Load Balancers (L4 vs L7)", nodeType: "concept", conceptId: "load-balancers", importance: "critical" },
        { id: "tcp-vs-udp", label: "TCP vs UDP", nodeType: "concept", conceptId: "tcp-vs-udp", importance: "high" },
        { id: "http2-websockets-grpc", label: "HTTP/2, WebSockets, gRPC", nodeType: "concept", conceptId: "http2-websockets-grpc", importance: "high" },
        { id: "api-gateway", label: "API Gateway", nodeType: "concept", conceptId: "api-gateway", importance: "high" },
      ],
    },
    {
      id: "reliability",
      label: "Reliability",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "sla-slo-sli", label: "SLA / SLO / SLI", nodeType: "concept", conceptId: "sla-slo-sli", importance: "critical" },
        { id: "circuit-breaker", label: "Circuit Breaker", nodeType: "concept", conceptId: "circuit-breaker", importance: "critical" },
        { id: "rate-limiting", label: "Rate Limiting", nodeType: "concept", conceptId: "rate-limiting", importance: "high" },
        { id: "chaos-engineering", label: "Chaos Engineering", nodeType: "concept", conceptId: "chaos-engineering", importance: "medium" },
      ],
    },
    {
      id: "interview-framework",
      label: "Interview Framework",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "requirements-gathering", label: "Requirements Gathering", nodeType: "concept", conceptId: "requirements-gathering", importance: "critical" },
        { id: "back-of-envelope", label: "Back-of-Envelope Estimation", nodeType: "concept", conceptId: "back-of-envelope", importance: "critical" },
      ],
    },
  ],
};

// ─── Last Hour Summary ────────────────────────────────────────────────────────

const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "Every design decision is a trade-off: consistency vs availability, latency vs throughput, simplicity vs scalability — state the trade-off explicitly before choosing.",
    "Stateless services are the foundation of horizontal scaling: any state must live in an external store (DB, cache, session store) so any instance can serve any request.",
    "Sharding distributes write load; replication distributes read load — most systems need both, and consistent hashing minimizes resharding cost when nodes are added/removed.",
    "Caching is a force multiplier but creates consistency challenges: always define your cache invalidation strategy before adding a cache, not after.",
    "The CAP theorem says you must choose between consistency and availability during a network partition — but PACELC extends this to also cover latency vs consistency during normal operation.",
    "Idempotency is the key to safe retries in distributed systems: design every write operation to be safely retryable with the same outcome, using idempotency keys or conditional writes.",
    "SLOs drive architecture: a 99.9% availability target (8.7h downtime/year) has very different design implications than 99.99% (52 min/year) — always clarify the target before designing.",
  ],
  mustKnowConcepts: [
    { name: "Consistent Hashing", oneLiner: "Maps keys to nodes on a ring so adding/removing a node remaps only 1/N of keys, not all of them." },
    { name: "CAP Theorem", oneLiner: "A distributed system can guarantee only two of: Consistency, Availability, Partition Tolerance — and P is unavoidable in practice." },
    { name: "Cache-Aside Pattern", oneLiner: "App reads cache first; on miss, reads DB and populates cache — application controls caching logic, not the DB." },
    { name: "Idempotency", oneLiner: "An operation that produces the same result whether executed once or many times — essential for safe retries in at-least-once delivery systems." },
    { name: "Circuit Breaker", oneLiner: "Stops calls to a failing downstream service after a threshold, allowing it to recover instead of amplifying the failure with retries." },
    { name: "Write-Ahead Log (WAL)", oneLiner: "Every change is written to an append-only log before being applied to the data structure, enabling crash recovery and replication." },
    { name: "SLO (Service Level Objective)", oneLiner: "An internal target (e.g., p99 latency < 200ms, availability > 99.9%) that teams design and operate to — the contract is the SLA, the target is the SLO." },
  ],
  topTraps: [
    "Jumping to solutions before clarifying requirements: interviewers expect you to ask about scale, read/write ratio, consistency needs, and latency targets before drawing any boxes.",
    "Treating CAP as a permanent global choice: real systems choose consistency vs availability per-operation (e.g., shopping cart can be AP, payments must be CP).",
    "Adding caching without an invalidation strategy: cache-aside with TTL-only invalidation causes stale reads; write-through keeps cache consistent but increases write latency.",
    "Conflating 'at-least-once delivery' with correctness: at-least-once means duplicates will arrive — your consumer must be idempotent or you will process events multiple times.",
    "Ignoring the thundering herd: when a cache expires under high load, thousands of requests hit the DB simultaneously — use probabilistic early expiration or a distributed lock to prevent stampede.",
  ],
};

// ─── Concepts ─────────────────────────────────────────────────────────────────

const concepts: Concept[] = [
  // SCALABILITY
  {
    id: "horizontal-vs-vertical",
    title: "Horizontal vs Vertical Scaling",
    category: "scalability",
    basic: "Vertical scaling means adding more CPU/RAM/disk to a single machine. Horizontal scaling means adding more machines and distributing load across them.",
    expected: "Vertical scaling has a hard ceiling (the biggest available instance) and creates a single point of failure. Horizontal scaling is theoretically unbounded but requires stateless application design, a load balancer, and distributed coordination. Most web services scale horizontally for the application tier and vertically (then shard) for the database tier.",
    deep: "Vertical scaling is often the right first move: it's operationally simpler, avoids distributed systems complexity, and modern cloud instances (e.g., AWS r6i.32xlarge with 128 vCPUs and 1TB RAM) can handle enormous workloads. Horizontal scaling introduces network overhead, distributed consistency problems, and operational complexity. The right architecture usually combines both: scale stateless app servers horizontally, scale databases vertically until you must shard. For stateful services, horizontal scaling requires solving data locality (consistent hashing, sticky sessions) and coordination (distributed locks, leader election).",
    interviewAnswer: "I'd start with vertical scaling for simplicity, then move to horizontal when approaching resource limits. For stateless app servers, horizontal scaling behind a load balancer is straightforward. For databases, I'd scale vertically first, then add read replicas for read-heavy workloads, and finally shard writes when single-node write throughput is the bottleneck. The key enabler for horizontal scaling is stateless services — all session and application state must live in external stores.",
    trap: "Assuming horizontal scaling is always better. It's operationally more complex and introduces distributed systems problems. Many systems run perfectly well on a single well-provisioned machine for years.",
    memoryAnchor: "Vertical = building a taller skyscraper (eventually hits the sky). Horizontal = building more houses across a neighborhood (sprawl forever, but now you need roads between them).",
  },
  {
    id: "stateless-services",
    title: "Stateless Services",
    category: "scalability",
    basic: "A stateless service holds no in-memory state between requests. Any server instance can handle any request because all persistent state lives in an external store.",
    expected: "Statelessness is the prerequisite for horizontal scaling. It enables any-to-any load balancing, zero-downtime deployments (blue/green, canary), and effortless auto-scaling. State is externalized to a database, distributed cache (Redis), or object store (S3). Session tokens (JWTs) let clients carry their own state, validated by any server without a central session store.",
    deep: "True statelessness is harder than it looks. 'Warm' state like in-memory caches or compiled regex patterns are fine (they're reconstructible). Problematic state includes: local file writes (use S3), in-process websocket connections (requires sticky sessions or a pub/sub broker for fan-out), and in-memory rate limiting counters (must use Redis for distributed counting). For WebSocket servers, sticky sessions via L7 load balancers are a pragmatic middle ground, but the preferred approach routes all messages through a pub/sub layer (Redis pub/sub, Kafka) so any node can deliver to any connection.",
    interviewAnswer: "For stateless design, I ensure the application tier stores no request-to-request state in process memory. Sessions use JWT tokens (stateless validation) or are stored in Redis (shared across instances). Any file uploads go to S3, not local disk. For WebSocket connections, I use sticky sessions at the load balancer plus a pub/sub broker so any backend node can publish to any connected client.",
    trap: "Thinking JWT eliminates all session management concerns. JWTs can't be revoked server-side without a token blacklist (which reintroduces state), so logout and permission revocation require careful design.",
    memoryAnchor: "Stateless waiters: they don't remember your order -- it's written on the ticket. Any waiter can deliver your food because the ticket (JWT) carries all the info.",
  },
  {
    id: "sharding",
    title: "Sharding Strategies",
    category: "scalability",
    basic: "Sharding splits a dataset across multiple database nodes so each node holds a subset of the data, distributing write and storage load horizontally.",
    expected: "Three main strategies: (1) Range sharding — shard by key range (user IDs 1–1M on shard 1). Simple to implement and supports range queries, but creates hot spots if data isn't uniformly distributed. (2) Hash sharding — apply a hash function to the key and mod by shard count. Distributes load evenly but makes range queries require scatter-gather across all shards. (3) Consistent hashing — place keys and nodes on a ring; a key belongs to the next node clockwise. Adding/removing a node remaps only ~1/N of keys, minimizing resharding cost.",
    deep: "Consistent hashing with virtual nodes (vnodes) is the production standard (used by Cassandra, DynamoDB, Riak). Each physical node owns multiple virtual positions on the ring, so load is balanced even with heterogeneous hardware and node churn is absorbed smoothly. Shard key selection is the most critical design decision: a poor shard key (e.g., timestamp for time-series data) causes write hot spots. Compound shard keys (tenant_id + entity_id) can distribute load while keeping tenant data co-located. Cross-shard transactions require 2PC or are avoided by design — most sharded systems achieve isolation by keeping related data on the same shard.",
    interviewAnswer: "I'd use consistent hashing with virtual nodes for most sharded systems. The shard key choice is critical — I'd pick a high-cardinality key that distributes writes evenly and avoids hot spots. For a social network, I'd shard users by user_id hash; for multi-tenant SaaS, by tenant_id. I'd plan for resharding from day one by using logical shards (e.g., 1024 virtual shards mapped to N physical nodes), so scaling out means remapping virtual shards, not rehashing all data.",
    trap: "Sharding by a monotonically increasing key (auto-increment ID, timestamp) causes all new writes to hit the same shard — the 'hot partition' problem. Always analyze write patterns before choosing a shard key.",
    memoryAnchor: "SHARDing = SHARing the Dish. You slice a pizza into pieces so multiple people eat simultaneously. Consistent hashing = a lazy Susan -- spin the table, each guest grabs the slice nearest to them.",
  },
  {
    id: "auto-scaling",
    title: "Auto-Scaling",
    category: "scalability",
    basic: "Auto-scaling automatically adds or removes compute instances in response to load metrics, keeping capacity aligned with demand without manual intervention.",
    expected: "Auto-scaling policies trigger on metrics: CPU utilization, request queue depth, p99 latency, or custom business metrics. Reactive scaling (scale when CPU > 70%) has a lag of 3–5 minutes (boot time + warmup). Predictive scaling uses historical patterns to pre-provision capacity. Scale-in must be slower and more conservative than scale-out to avoid oscillation. Cooldown periods prevent thrashing.",
    deep: "Boot time is the primary constraint on reactive auto-scaling. Strategies to reduce it: pre-warmed instance pools, baked AMIs (dependencies pre-installed), containerized services with fast startup (< 5s for Go/Rust, longer for JVM). For JVM services, 'slow start' algorithms at the load balancer ramp traffic to new instances gradually, avoiding cold-start latency spikes. Stateful services (database, Kafka) cannot auto-scale horizontally without data rebalancing — auto-scaling is primarily for stateless app tiers. For databases, read replicas can be added automatically; write capacity requires pre-planning. Kubernetes HPA (Horizontal Pod Autoscaler) scales on CPU/memory or custom metrics via the metrics API.",
    interviewAnswer: "I'd design auto-scaling with fast instance startup as the primary constraint. For app servers, I'd use containerized services (Docker/Kubernetes) with baked images to get startup under 30 seconds. I'd scale on a leading indicator — request queue depth or p95 latency — rather than CPU, which is a lagging indicator. I'd keep a minimum baseline capacity to avoid cold starts on traffic spikes and use predictive scaling for known traffic patterns (e.g., business hours).",
    trap: "Scaling on CPU alone is a lagging indicator. By the time CPU is saturated, users are already experiencing degradation. Scale on upstream metrics like queue depth or latency instead.",
    memoryAnchor: "Auto-scaling = a restaurant that hires extra cooks when the order line gets long, then sends them home when it's slow. Hiring on 'how sweaty the cook looks' (CPU) is too late -- hire when the ticket queue grows.",
  },

  // DATABASES
  {
    id: "rdbms-vs-nosql",
    title: "RDBMS vs NoSQL Trade-offs",
    category: "databases",
    basic: "Relational databases (PostgreSQL, MySQL) use structured schemas, SQL, and enforce ACID transactions. NoSQL databases sacrifice some of those guarantees for horizontal scalability, flexible schemas, or specialized data models.",
    expected: "Choose RDBMS when: data is relational (foreign keys, joins), you need ACID transactions across multiple entities, or schema is stable. Choose NoSQL when: you need horizontal write scalability beyond a single node (Cassandra, DynamoDB), your access patterns are simple key-value or document lookups (no complex joins), or your schema evolves rapidly. NoSQL sub-types: document (MongoDB), key-value (DynamoDB, Redis), wide-column (Cassandra, HBase), graph (Neo4j), time-series (InfluxDB).",
    deep: "The NoSQL vs RDBMS framing is often false. Modern PostgreSQL handles JSON documents, array types, and full-text search. CockroachDB and Spanner provide distributed SQL with ACID transactions. The real question is: what is your primary access pattern? If you always query by primary key (user profile by user_id), a key-value or document store is simpler and faster. If you need ad-hoc querying, aggregations, and complex joins, RDBMS wins. For write-heavy time-series data, LSM-tree-based stores (Cassandra, RocksDB) vastly outperform B-tree stores due to sequential I/O. Denormalization is often required in NoSQL to support access patterns — you model data around queries, not around entities.",
    interviewAnswer: "My default is PostgreSQL — it handles most use cases and ACID transactions prevent entire classes of bugs. I'd move to NoSQL when I need: (1) write throughput beyond what a single Postgres node can handle after vertical scaling and sharding are exhausted, (2) a flexible schema for rapidly evolving data, or (3) a specialized access pattern like wide-column time-series data. I'd be explicit about which ACID properties I'm giving up and design compensating mechanisms.",
    trap: "Assuming NoSQL is automatically more scalable. PostgreSQL with proper indexing, connection pooling, and read replicas can handle hundreds of thousands of QPS. NoSQL adds operational complexity and gives up ACID — only make that trade when you have a concrete need.",
    memoryAnchor: "RDBMS = a filing cabinet with labeled folders and strict rules about where things go. NoSQL = a giant warehouse of bins -- throw anything in fast, but good luck finding it without a label.",
  },
  {
    id: "read-replicas",
    title: "Read Replicas & Replication",
    category: "databases",
    basic: "Read replicas are copies of the primary database that receive writes via replication and serve read queries, offloading read traffic from the primary.",
    expected: "Asynchronous replication means replicas lag behind the primary by milliseconds to seconds. Applications reading from replicas must tolerate stale data. For reads that require fresh data (e.g., after a write), route to the primary or use synchronous replication with the performance penalty accepted. Replication lag monitoring is critical — lag spikes during high write throughput or replica rebuilds. Multi-region replication enables disaster recovery and reduces read latency for geographically distributed users.",
    deep: "PostgreSQL streaming replication uses the WAL (Write-Ahead Log): the primary ships WAL segments to replicas which replay them. Synchronous replication waits for at least one replica to acknowledge before the primary commits — zero data loss but +1 network RTT on every write. Semi-synchronous (MySQL) waits only for the replica to receive the WAL, not apply it. For failover, automated tools like Patroni (PostgreSQL) manage leader election using etcd or Consul as a distributed coordination layer. Read-after-write consistency (reading your own writes immediately) requires routing that user's reads to the primary for a short window post-write or using a monotonic read token. Aurora PostgreSQL achieves sub-10ms replica lag by sharing storage across compute nodes rather than shipping WAL.",
    interviewAnswer: "I'd add read replicas as the first scaling step for read-heavy workloads. I'd explicitly handle replica lag: route reads requiring freshness (e.g., immediately after a write) to the primary using a read-your-writes routing layer. I'd monitor replication lag with alerts at 1s and circuit-break at 10s. For cross-region reads, I'd accept eventual consistency and design the UI to reflect that (e.g., 'feed may take a moment to update').",
    trap: "Routing all reads to replicas including reads that follow a write. This causes read-your-own-writes failures where a user creates an item and immediately doesn't see it. Maintain a primary-read window post-write or use session consistency routing.",
    memoryAnchor: "Read replicas = photocopies of the boss's notebook. They're slightly outdated, but 100 interns can read copies simultaneously instead of lining up at the boss's desk.",
  },
  {
    id: "indexes",
    title: "Index Types: B-tree vs LSM-tree",
    category: "databases",
    basic: "Indexes speed up reads by maintaining a sorted data structure that maps key values to data locations. B-tree indexes are the standard in RDBMS; LSM-tree indexes underpin most NoSQL write-optimized stores.",
    expected: "B-tree: balanced tree with O(log N) reads and writes. In-place updates, good for read-heavy workloads. Used by PostgreSQL, MySQL, SQLite. Each write requires random I/O to update pages in place — slow for high write throughput. LSM-tree (Log-Structured Merge): writes go to an in-memory buffer (MemTable) then a sorted on-disk SSTable. Background compaction merges SSTables. Writes are sequential I/O (fast); reads may require checking multiple SSTables (mitigated by Bloom filters). Used by Cassandra, RocksDB, LevelDB, HBase.",
    deep: "B-tree write amplification is typically 5–10x (writing one logical byte may update multiple tree nodes). LSM write amplification is higher in total (compaction rewrites data multiple times) but the critical I/O is sequential, which SSDs handle far more efficiently than random I/O. LSM space amplification is also worse (deleted data persists until compaction). For OLTP read-heavy workloads: B-tree. For write-heavy time-series, logging, or event storage: LSM. Covering indexes in PostgreSQL (INCLUDE clause) store column values in the index itself, turning index scans into index-only scans — critical for query performance. Partial indexes (WHERE clause in CREATE INDEX) reduce index size dramatically for sparse data.",
    interviewAnswer: "For a write-heavy system like event logging or time-series data, I'd choose an LSM-tree-based store (Cassandra, RocksDB) because sequential writes are an order of magnitude faster than B-tree random writes at scale. For the core transactional database with complex queries and joins, I'd use PostgreSQL B-tree indexes with careful index design: composite indexes ordered to match query predicates, partial indexes for frequently-filtered subsets, and covering indexes to eliminate table heap lookups.",
    trap: "Over-indexing in RDBMS: every additional index increases write latency (each write updates all relevant indexes) and storage. Only index columns that appear in WHERE, JOIN, or ORDER BY clauses of actual queries — measure before adding.",
    memoryAnchor: "B-tree = a library card catalog (great for finding any book, but re-sorting cards on every new arrival is slow). LSM-tree = a 'to-file' inbox that stacks up and gets sorted in bulk later -- fast intake, slower lookup.",
  },
  {
    id: "acid-base",
    title: "ACID vs BASE",
    category: "databases",
    basic: "ACID (Atomicity, Consistency, Isolation, Durability) guarantees database transactions behave correctly even under failures. BASE (Basically Available, Soft state, Eventually consistent) is the weaker model adopted by many distributed databases to gain availability and partition tolerance.",
    expected: "ACID: Atomicity — transaction commits entirely or not at all. Consistency — DB moves from one valid state to another. Isolation — concurrent transactions don't interfere. Durability — committed data survives crashes (via WAL). BASE: Basically Available — system responds even during partial failures (possibly with stale/partial data). Soft state — state may change over time even without input (convergence). Eventually consistent — replicas will converge given no new writes.",
    deep: "Isolation is the most nuanced ACID property. SQL standard defines four isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable. PostgreSQL's default is Read Committed; MySQL InnoDB defaults to Repeatable Read. Serializable (via Serializable Snapshot Isolation in PostgreSQL) prevents all anomalies but reduces throughput. Most production systems operate at Read Committed and handle application-level anomalies explicitly. Two-phase commit (2PC) extends ACID across distributed nodes but is slow (two network round trips) and blocks on coordinator failure. Google Spanner achieves distributed ACID using TrueTime (GPS + atomic clocks) for external consistency — a global wall clock with bounded uncertainty.",
    interviewAnswer: "For financial transactions, inventory management, or any system where correctness is non-negotiable, I'd use ACID transactions. For systems that can tolerate eventual consistency — social feeds, view counts, recommendation updates — BASE is fine and enables better horizontal scalability. I'd be explicit: 'The payment deduction is ACID; the feed update is eventually consistent with a max lag SLO of 5 seconds.'",
    trap: "Thinking BASE means 'no consistency at all.' Eventual consistency still guarantees convergence — all replicas will eventually agree. The question is the convergence window and what you do during that window.",
    memoryAnchor: "ACID = a bank vault (every transaction locked down tight, nothing gets lost). BASE = a coffee shop tip jar (roughly right, eventually counted, nobody panics if a penny is off).",
  },
  {
    id: "connection-pools",
    title: "DB Connection Pools",
    category: "databases",
    basic: "A connection pool maintains a set of pre-established database connections that application threads reuse, avoiding the latency cost of creating new connections per request.",
    expected: "Creating a PostgreSQL connection takes 20–50ms (TCP handshake, TLS, auth). At 10k RPS, creating a new connection per request would be catastrophic. Connection pools (PgBouncer for PostgreSQL, HikariCP for Java) keep N persistent connections open and queue requests when all connections are busy. Pool size is critical: too small causes queuing; too large overwhelms the database (PostgreSQL has process-per-connection overhead, typically max 100–500 connections).",
    deep: "PostgreSQL's process-per-connection model means each connection uses ~5–10MB of RAM. With 500 connections, that's 2.5–5GB for connection overhead alone. PgBouncer in transaction-mode pooling multiplexes thousands of application connections over tens of database connections by releasing the DB connection back to the pool after each transaction. This enables cloud deployments with thousands of Lambda functions or serverless instances hitting the same database. Serverless architectures are particularly problematic: AWS Lambda can instantiate thousands of concurrent instances each trying to open a DB connection — use RDS Proxy or PgBouncer as a middleware pool. Pool sizing formula: pool_size = (core_count * 2) + effective_spindle_count (from PostgreSQL wiki).",
    interviewAnswer: "I'd always run a connection pooler in front of PostgreSQL at any meaningful scale. PgBouncer in transaction mode is my default — it multiplexes thousands of app connections over a small pool of real DB connections. For serverless functions, I'd add RDS Proxy to prevent connection storms. I'd size the pool conservatively (50–100 DB connections) and monitor queue wait time as the key metric — if wait time rises, investigate query latency before increasing pool size.",
    trap: "Increasing connection pool size when the database is under load. If queries are slow, more connections just pile up waiting. Fix slow queries first; add connections only to prevent queuing of fast queries.",
    memoryAnchor: "Connection pool = a valet parking lot with a fixed number of keys. Opening a new DB connection is like buying a new car for every trip -- just reuse the parked ones.",
  },

  // CACHING
  {
    id: "cache-strategies",
    title: "Cache Strategies: Aside, Write-Through, Write-Behind",
    category: "caching",
    basic: "Cache-aside: app reads from cache; on miss, loads from DB and populates cache. Write-through: writes go to cache and DB synchronously. Write-behind (write-back): writes go to cache immediately, then async to DB.",
    expected: "Cache-aside is the most common pattern: lazy population, app controls the cache, works with any DB. Downside: cold start (empty cache on first load), write operations bypass cache causing inconsistency until TTL expires. Write-through keeps cache and DB consistent at the cost of higher write latency (both cache and DB must acknowledge). Write-behind optimizes write throughput (write returns after cache write) but risks data loss if the cache fails before async DB write completes — suitable for analytics/logging, not financial data.",
    deep: "Cache-aside with TTL creates a consistency window: stale data is served for up to TTL seconds after a DB write. To reduce this, use cache invalidation on write: after updating the DB, delete the cache key (not update it — delete forces a cache miss and fresh DB read on next access, avoiding race conditions where a slow cache write overlaps a DB write). Cache invalidation is hard: the classic approach is 'write to DB first, then delete cache key' — if the cache delete fails, the stale entry expires via TTL. For read-heavy systems with complex computed values (e.g., user feed), consider a 'read-through' cache where the cache itself fetches from the DB on a miss, giving you a centralized caching layer.",
    interviewAnswer: "My default is cache-aside with explicit invalidation. On any write, I update the DB first, then delete the cache key (not update it). Deletion is safer than update because it avoids race conditions. I use TTL as a safety net, not the primary invalidation mechanism. For write-heavy paths where DB write latency is the bottleneck, write-behind with a durable queue (Kafka) between cache and DB gives me fast writes with eventual DB consistency — acceptable for non-critical data.",
    trap: "Updating the cache after a DB write instead of deleting it. A concurrent reader may be about to write a stale value to the cache at the same moment, causing the fresh value to be immediately overwritten. Delete forces a clean miss; update creates a race window.",
    memoryAnchor: "Cache-aside = checking your sticky note before calling the office. Write-through = updating the sticky note AND the master file at once. Write-behind = scribbling a note now and filing it later (hope the sticky doesn't fall off).",
  },
  {
    id: "eviction-policies",
    title: "Cache Eviction Policies",
    category: "caching",
    basic: "When a cache reaches capacity, an eviction policy determines which entries to remove. Common policies: LRU (Least Recently Used), LFU (Least Frequently Used), FIFO, and TTL-based expiration.",
    expected: "LRU evicts the entry that was accessed least recently. It works well for temporal locality (recently accessed items tend to be accessed again). LFU evicts the least frequently accessed entry — better for stable working sets where some items are persistently popular. FIFO is simple but ignores access patterns. TTL expiration evicts entries after a fixed time regardless of access frequency — appropriate for data with known staleness tolerance.",
    deep: "LRU is O(1) with a doubly-linked list + hash map: the map gives O(1) access to any node, the linked list maintains recency order. On access, move the node to the head; on eviction, remove from the tail. Redis uses an approximated LRU (sample 5 random keys, evict the oldest) to avoid the memory overhead of exact LRU tracking. LFU in Redis 4.0 uses a probabilistic counter (Morris counter) that increments logarithmically — avoids counter overflow while tracking relative frequency. For cache warming at startup, pre-populate with the highest-frequency keys from logs to avoid cold-start storms. Segment-aware caching (e.g., Caffeine's Window TinyLFU) splits the cache into a small admission filter and a main protected region, providing better hit rates than pure LRU or LFU for real workloads.",
    interviewAnswer: "For a general web application cache, I'd use LRU — it handles temporal locality well and is simple to reason about. For a cache serving a catalog of items with stable but uneven popularity (e.g., product pages where top 1% of products get 80% of traffic), LFU is better — it keeps the persistent hot items in cache. I'd always combine an eviction policy with TTL: eviction handles capacity, TTL handles staleness.",
    trap: "Assuming LRU is universally optimal. For scan-heavy workloads (full table scans, batch jobs), LRU is catastrophic — the scan floods the cache with one-time entries, evicting the working set. Use a scan-resistant variant or bypass the cache entirely for batch reads.",
    memoryAnchor: "LRU = a fridge with limited shelf space. Whatever you haven't touched in the longest time gets tossed when you bring home new groceries. LFU = toss what you RARELY eat, even if you bought it yesterday.",
  },
  {
    id: "cache-stampede",
    title: "Cache Stampede (Thundering Herd)",
    category: "caching",
    basic: "A cache stampede occurs when a popular cache entry expires and many concurrent requests simultaneously miss the cache, all rushing to recompute or fetch the value from the database, overwhelming it.",
    expected: "Mitigation strategies: (1) Probabilistic early expiration — start recomputing before the TTL expires, with probability increasing as expiration approaches. (2) Mutex/distributed lock — first miss acquires a lock and recomputes; other misses wait or serve stale data. (3) Background refresh — a background job proactively refreshes entries before they expire. (4) Stale-while-revalidate — serve the stale entry immediately while triggering an async refresh.",
    deep: "The XFetch algorithm (probabilistic early expiration) is mathematically elegant: a cache entry with remaining TTL δ is recomputed with probability exp(-δ/β) where β is a tuning parameter. As expiration approaches (δ → 0), recomputation probability approaches 1, distributing the recompute load across the expiration window. Redis doesn't natively implement this but it's easy to add at the application layer. Distributed mutex using Redis SET NX (set if not exists) with a short TTL: the first thread to acquire the lock recomputes; others either wait or return stale. The lock TTL must exceed recompute time — set it conservatively. A simpler approach: 'jitter' the TTL. Instead of all entries expiring at T, expire them at T + random(0, T*0.1). This spreads stampedes over time for batch-loaded caches.",
    interviewAnswer: "I'd use stale-while-revalidate as my primary defense: always serve whatever is in the cache (even if expired) and trigger an async background refresh. This keeps latency low and protects the database. For entries where serving stale is unacceptable, I'd use a Redis NX lock with a short TTL: winner recomputes, losers serve the stale value (or wait briefly if no stale value exists). I'd also add TTL jitter at population time to spread expirations.",
    trap: "Using a distributed lock without a fallback for the lock waiters. If the lock holder crashes mid-recompute, all waiters either deadlock (waiting for the lock to expire) or hammer the DB simultaneously when it does. Always set a lock TTL and serve stale while waiting.",
    memoryAnchor: "Thundering herd = a Black Friday crowd waiting behind a locked door. The moment it opens, EVERYONE stampedes in. Fix: let one person in to restock while everyone else gets yesterday's flyer (stale-while-revalidate).",
  },
  {
    id: "cdn",
    title: "CDN (Content Delivery Network)",
    category: "caching",
    basic: "A CDN is a geographically distributed network of edge servers that cache static and dynamic content close to users, reducing latency and offloading origin servers.",
    expected: "CDNs serve static assets (JS, CSS, images, videos) with high cache hit rates from edge nodes. Cache-Control headers control TTL at the edge. CDN invalidation (purging) removes stale entries by URL, tag, or path prefix. For dynamic content, CDN edge caching with short TTLs (1–60s) reduces origin load during traffic spikes. CDN also provides DDoS protection, TLS termination, and HTTP/2 or HTTP/3 multiplexing at the edge.",
    deep: "Origin shield is a CDN optimization: an intermediate cache layer between edge nodes and the origin, so only one node per region (rather than every edge node) fetches from origin on a miss. This dramatically reduces origin fan-in. For personalized content, Vary headers on cache keys (by cookie, user-agent) fragment the cache, reducing hit rates — prefer public/private content separation: cache the public frame, fetch personalized fragments via client-side API calls. Edge computing (Cloudflare Workers, Lambda@Edge) runs code at CDN edge nodes, enabling request-time customization (A/B testing, auth, geolocation routing) without origin round trips. For media streaming, CDN + HLS/DASH adaptive bitrate ensures smooth playback by serving the right quality segment for each client's bandwidth.",
    interviewAnswer: "For any system with static assets, CDN is the highest-ROI optimization — it eliminates origin load for assets that represent 80%+ of bytes transferred. I'd set long Cache-Control max-age (1 year) for fingerprinted assets (content-addressed filenames) and short TTLs (5–60s) for HTML. I'd use origin shield to prevent CDN edge nodes from stampeding the origin on a miss. For API responses, I'd use CDN caching for public, non-personalized endpoints with appropriate Surrogate-Control headers.",
    trap: "Relying on CDN caching for authenticated or personalized content without cache key customization. Without a user-specific cache key, one user's data is served to another. Use Cache-Control: private for personalized content, or use a CDN that supports custom cache keys.",
    memoryAnchor: "CDN = vending machines placed in every neighborhood instead of making everyone drive to the factory. Same snacks, way closer. Origin shield = one regional warehouse between the vending machines and the factory.",
  },
  {
    id: "redis-vs-memcached",
    title: "Redis vs Memcached",
    category: "caching",
    basic: "Both are in-memory key-value stores used for caching. Redis supports rich data structures, persistence, pub/sub, and clustering. Memcached is simpler, multi-threaded, and optimized for pure caching with higher throughput per core.",
    expected: "Choose Redis when you need: rich data types (lists, sets, sorted sets, hashes), pub/sub messaging, Lua scripting, persistence (RDB snapshots, AOF logging), distributed data structures (distributed locks, rate limiters, leaderboards). Choose Memcached when you need: maximum throughput for simple string key-value caching, multi-threading (Redis is single-threaded per shard), or a very simple operational footprint.",
    deep: "Redis's single-threaded event loop processes commands atomically — this enables operations like INCR (atomic increment) and Lua scripts to be race-condition free. Redis 6.0 introduced I/O threading for network operations while keeping command processing single-threaded. Redis Cluster shards data across nodes using 16,384 hash slots; each node owns a subset of slots. Client libraries route requests to the correct node based on CRC16(key) mod 16384. Redis persistence tradeoffs: AOF (Append Only File) logs every write for durability (can replay on restart) at the cost of write amplification; RDB (periodic snapshots) is faster to restore but loses writes since the last snapshot. For rate limiting and distributed locks, Redis SETNX + EXPIRE is the foundation of the Redlock algorithm (though Redlock's safety in the face of clock skew is debated by Martin Kleppmann).",
    interviewAnswer: "I default to Redis for almost all caching use cases because its rich data structures enable patterns beyond simple caching: sorted sets for leaderboards and rate limiting, lists for queues, pub/sub for real-time notifications. I'd use Memcached only if benchmarking showed it to be the bottleneck and the use case is purely string key-value with no need for persistence or complex structures. In practice, the operational simplicity of using Redis for both caching and lightweight messaging outweighs Memcached's marginal throughput advantage.",
    trap: "Using Redis persistence (AOF) for a cache without understanding the write amplification. AOF rewrites every write to disk — on a cache-heavy write workload, this can saturate disk I/O. For pure cache use cases, disable persistence entirely (appendonly no, save '').",
    memoryAnchor: "Redis = a Swiss Army knife that also happens to be blazing fast (data structures, pub/sub, scripting). Memcached = a single-purpose hammer -- it only does one thing (string caching) but swings with both hands (multi-threaded).",
  },

  // MESSAGING
  {
    id: "pubsub-vs-queue",
    title: "Pub/Sub vs Message Queue",
    category: "messaging",
    basic: "Message queues deliver each message to one consumer (point-to-point). Pub/sub systems deliver each message to all subscribers of a topic (broadcast). Both decouple producers from consumers.",
    expected: "Message queues (SQS, RabbitMQ) are used for task distribution: one job should be processed by exactly one worker. Pub/sub (SNS, Kafka, Google Pub/Sub) broadcasts events to multiple independent consumers — an order placed event might be consumed by inventory, billing, and notification services simultaneously. Kafka blurs the line: it's a pub/sub log where each consumer group gets a full copy of the stream, but within a group, partitions are assigned to individual consumers (queue semantics within the group).",
    deep: "The fundamental difference is consumer model. Queues have competing consumers (N workers share a queue, each message processed once). Pub/sub has independent subscriber groups, each getting all messages. Kafka achieves both: topic partitions are the unit of parallelism. Within a consumer group, each partition goes to one consumer (queue semantics, ordered processing per partition). Multiple independent consumer groups each read all partitions independently (pub/sub semantics). This makes Kafka ideal for event streaming where the same event stream drives multiple downstream systems. For ordered processing within a logical unit (all events for user_id=123 processed in order), Kafka's partition key ensures all events for that key go to the same partition.",
    interviewAnswer: "For work distribution (process this job once), I use a queue (SQS). For event broadcasting where multiple systems need the same event, I use pub/sub (Kafka topics with multiple consumer groups). Kafka is my default for event-driven architectures at scale because it combines both: each consumer group gets a full ordered stream, and within a group, processing is parallelized across partitions. The durable log also enables replay — new consumers can process historical events from offset 0.",
    trap: "Assuming pub/sub means fire-and-forget with no durability. Kafka retains messages for a configurable retention period (days/weeks). Even after all current consumers have read a message, it's available for replay. Design producers to be append-only to the log; let consumer groups manage their own offset position.",
    memoryAnchor: "Message queue = a to-do list on the fridge (one person crosses it off). Pub/sub = a radio broadcast (everyone with a radio hears it). Kafka = a recorded podcast -- broadcast AND replayable.",
  },
  {
    id: "delivery-guarantees",
    title: "Delivery Guarantees",
    category: "messaging",
    basic: "At-most-once: messages may be lost but never duplicated. At-least-once: messages are never lost but may be delivered multiple times. Exactly-once: every message is delivered precisely once.",
    expected: "At-most-once: fire-and-forget, producer doesn't retry. Suitable for metrics, logs where occasional loss is acceptable. At-least-once: producer retries on failure; consumer must be idempotent to handle duplicates. This is the practical standard for most systems. Exactly-once: requires coordination between producer, broker, and consumer — expensive and often an illusion at the system level even if the broker guarantees it (a consumer may crash after processing but before acknowledging).",
    deep: "Kafka exactly-once semantics (EOS): producer idempotence (each message has a sequence number; broker deduplicates retries within a session) + transactional producer (atomic writes across partitions + consumer offset commits in a single transaction). This achieves exactly-once within the Kafka ecosystem. But truly end-to-end exactly-once requires idempotent consumers too — if a consumer processes a message and crashes before committing the offset, it will reprocess on restart. The solution: transactional outbox pattern. Write to DB and outbox table in one ACID transaction; a relay process polls the outbox and publishes to Kafka. Consumer processes and commits result atomically. This gives end-to-end exactly-once semantics with at-least-once Kafka delivery plus idempotent consumers.",
    interviewAnswer: "I design for at-least-once delivery with idempotent consumers — it's simpler and more reliable than exactly-once. Every consumer checks whether it has already processed a message (using the message ID as a deduplication key in a DB or Redis set) before processing. For payment or financial operations, I use the transactional outbox pattern: write the state change and the outbound event atomically in the DB, then a relay publishes to Kafka. This guarantees the event is published if and only if the DB transaction commits.",
    trap: "Trusting Kafka's exactly-once producer setting alone to give end-to-end exactly-once. Kafka EOS covers the broker layer; your consumer can still process a message, crash, and reprocess it on restart. Idempotent consumers are always required.",
    memoryAnchor: "At-most-once = shouting across a canyon (maybe they hear you, maybe not). At-least-once = sending a certified letter with return receipt (they WILL get it, possibly twice). Exactly-once = teleportation (theoretically perfect, practically very expensive).",
  },
  {
    id: "kafka-internals",
    title: "Kafka Partitions & Consumer Groups",
    category: "messaging",
    basic: "Kafka topics are divided into partitions — ordered, immutable append-only logs. Consumer groups allow multiple consumers to read from a topic in parallel, with each partition assigned to one consumer in the group.",
    expected: "Partitions are the unit of parallelism: N partitions can be processed by up to N consumers in a group simultaneously. Messages within a partition are totally ordered; across partitions, ordering is not guaranteed. Producers assign messages to partitions by key (consistent hash) or round-robin. Consumer groups track progress via committed offsets stored in the __consumer_offsets topic. Rebalancing occurs when consumers join or leave a group — partitions are reassigned.",
    deep: "Partition count determines max consumer parallelism: you can't have more active consumers than partitions in a group. Plan partition count carefully — it's hard to decrease partitions (requires topic recreation). Kafka retains messages by retention.ms (time) or retention.bytes (size) regardless of consumption — this enables replay. Leader/follower replication: each partition has one leader broker and N-1 followers. Producers write to and consumers read from the leader. ISR (In-Sync Replicas) — followers within a configurable lag. acks=all (producer) + min.insync.replicas=2 ensures a write is acknowledged only when written to the leader and at least one follower, preventing data loss on leader failure. Consumer group rebalancing with incremental cooperative rebalancing (Kafka 2.4+) reduces the rebalance stop-the-world effect by only moving partitions that need to change rather than revoking all assignments.",
    interviewAnswer: "I'd design partition count based on expected throughput and consumer parallelism. A rule of thumb: size for 2x expected peak throughput to allow room to grow without adding partitions. I'd use a partition key that distributes load evenly while keeping related events together (e.g., user_id for user event streams). I'd set acks=all and min.insync.replicas=2 for any topic carrying business-critical data. For consumer lag monitoring, I'd track the lag per partition and alert when lag exceeds a threshold that corresponds to my maximum acceptable processing delay.",
    trap: "Using a poor partition key that creates hot partitions. If you partition by event type and one type has 100x more volume, one partition gets all the load. Always analyze message volume distribution before choosing a partition key.",
    memoryAnchor: "Kafka = a multi-lane highway with a logbook. Each lane (partition) is one-way and in-order. Consumer groups = teams of toll booth operators, each team reading every lane once. More lanes = more throughput.",
  },
  {
    id: "idempotency",
    title: "Idempotency",
    category: "messaging",
    basic: "An idempotent operation produces the same result whether executed once or many times. In distributed systems, idempotency enables safe retries without side effects.",
    expected: "Idempotency is essential when using at-least-once delivery: the same message may be delivered multiple times and must be processed safely. Implementation: (1) Natural idempotency — some operations are inherently idempotent (set a value, put a record by primary key). (2) Idempotency keys — client generates a unique key per request; server stores processed keys and returns cached response on duplicate. (3) Conditional writes — use a version number or ETag; the write only succeeds if the current version matches the expected version.",
    deep: "Idempotency key storage: the server must persist idempotency keys durably and check them atomically with the operation. A race condition exists if two identical requests arrive simultaneously — use a DB unique constraint on the idempotency key and handle the uniqueness violation as a duplicate. The idempotency key must be scoped appropriately: per-user + per-operation to prevent one user's key from blocking another's. TTL for idempotency keys: keys should expire after a window long enough to cover all reasonable retry windows (24 hours for async operations, 30 days for financial transactions). Stripe's idempotency implementation stores the full request and response: on duplicate, returns the stored response without re-executing. This handles cases where the original request succeeded but the response was lost.",
    interviewAnswer: "For any write operation that crosses a network boundary, I design for idempotency. For API endpoints, I require clients to send an idempotency key (UUID) in a header. The server stores (idempotency_key, user_id, response) in a DB table with a unique constraint. On duplicate, return the stored response. For consumer-side idempotency, I store processed message IDs in a Redis set with TTL matching the message retention period. Before processing, I check for the message ID — skip if already processed, else process and add to the set atomically using a Redis transaction.",
    trap: "Implementing idempotency checks outside of a transaction with the actual operation. If the check and write are not atomic (e.g., check in Redis, write in PostgreSQL), a crash between the two leaves the system in a state where the operation completed but the idempotency key was not recorded — allowing reprocessing.",
    memoryAnchor: "Idempotency = an elevator button. Pressing it 10 times doesn't call 10 elevators. The first press registers; the rest are no-ops. Your API should work the same way.",
  },

  // CONSISTENCY
  {
    id: "cap-theorem",
    title: "CAP Theorem",
    category: "consistency",
    basic: "CAP theorem states that a distributed system can provide at most two of three guarantees: Consistency (all nodes see the same data at the same time), Availability (every request gets a response), and Partition Tolerance (system continues operating when network partitions occur).",
    expected: "Network partitions are unavoidable in distributed systems — you can't choose to not be partition tolerant. So the real choice is: during a partition, do you prioritize consistency (CP: reject writes or return errors until partition heals) or availability (AP: accept writes and serve reads, accepting that nodes may have different data)? CP systems: ZooKeeper, etcd, HBase, Spanner. AP systems: Cassandra, CouchDB, Riak, DynamoDB (with eventual consistency).",
    deep: "CAP is widely misapplied. 'Consistency' in CAP is linearizability (reads see the most recent write), which is stronger than ACID's 'C' (data integrity constraints). 'Availability' in CAP means every non-failing node responds, which is stronger than practical availability (SLA uptime). PACELC extends CAP: during normal operation (no partition), the trade-off is between Latency and Consistency. Spanner accepts higher latency to achieve consistency via TrueTime. Cassandra accepts lower consistency (read repair, anti-entropy) for lower latency. In practice, systems tune consistency per-operation: DynamoDB's ConsistentRead flag, Cassandra's per-query consistency level (ONE, QUORUM, ALL). A QUORUM write (majority of replicas must acknowledge) + QUORUM read guarantees reading the latest write without requiring ALL replicas to be up.",
    interviewAnswer: "I'd present CAP not as a static global choice but as a per-operation tuning knob. For the payment confirmation path, I'd use strong consistency (QUORUM or ALL reads) because showing a stale balance is a business problem. For the activity feed, I'd use eventual consistency (ONE read) because 100ms of staleness is acceptable and latency matters more. I'd design the system so that the consistency level of each operation is a conscious decision documented in the API contract.",
    trap: "Treating CAP as a permanent architectural choice you make once. Modern distributed databases (Cassandra, DynamoDB) let you tune consistency per request. Design your system to use the weakest consistency level that meets the correctness requirement for each operation.",
    memoryAnchor: "CAP = planning a party with 3 friends: Consistent info, Available hosts, Partition-tolerant (works if some can't talk). The network WILL glitch (P is mandatory), so pick: does everyone get the same answer (C), or does everyone answer the phone (A)?",
  },
  {
    id: "eventual-vs-strong",
    title: "Eventual vs Strong Consistency",
    category: "consistency",
    basic: "Strong consistency guarantees that after a write, all subsequent reads see the new value. Eventual consistency guarantees that if no new writes occur, all replicas will eventually converge to the same value.",
    expected: "Strong consistency requires coordination between replicas on every write — adds latency (at least one extra network round trip). Typically implemented via consensus protocols (Raft, Paxos) or synchronous replication. Eventual consistency allows lower write latency and higher availability — replicas accept writes independently and reconcile later. Conflicts are resolved by LWW (Last Write Wins using timestamps), vector clocks, or CRDTs.",
    deep: "Linearizability (the strongest consistency model) means operations appear instantaneous: if write W completes before read R begins, R must see W's value. Sequential consistency is slightly weaker: all operations appear in some sequential order consistent with each process's program order. Eventual consistency is the weakest: no guarantees about intermediate states, only eventual convergence. Read-your-writes consistency (session consistency) is a practical middle ground: a user always sees their own writes, even if other users see stale data. This is achievable by routing a user's reads to the replica that received their write or by using a sticky session. Monotonic reads consistency: once you read a value v, subsequent reads return v or a newer value — never an older value. This prevents a user from seeing a post disappear after seeing it.",
    interviewAnswer: "I'd classify each data type by its consistency requirement. User account balance: strong consistency (linearizable). Shopping cart: session consistency (read-your-writes). Social feed: eventual consistency. For strong consistency, I'd use Raft-based stores (etcd, CockroachDB) or PostgreSQL synchronous replication. For eventual consistency, I'd choose a conflict resolution strategy upfront: LWW for simple overwrites, CRDTs for counters and sets that need safe merging.",
    trap: "Assuming eventual consistency means 'might never converge.' Real eventually consistent systems (Cassandra, DynamoDB) typically converge within milliseconds under normal conditions. The concern is the divergence window during failures and how your application behaves during that window.",
    memoryAnchor: "Strong consistency = a live scoreboard (always current). Eventual consistency = the morning newspaper (accurate, just a few hours behind). Both give you the final score -- the question is when.",
  },
  {
    id: "consensus",
    title: "Consensus: Raft and Paxos",
    category: "consistency",
    basic: "Consensus algorithms allow a group of distributed nodes to agree on a single value even if some nodes fail, forming the foundation for distributed coordination, leader election, and replicated state machines.",
    expected: "Paxos was the first practical consensus algorithm (Lamport, written ~1990, published 1998) but is notoriously hard to understand and implement. Raft was designed explicitly for understandability and is now the standard: nodes elect a leader; all writes go through the leader which replicates to followers; commits happen when a majority (quorum) acknowledges. Raft is used in etcd (Kubernetes), CockroachDB, TiKV, and Consul.",
    deep: "Raft phases: Leader election — nodes start as followers; if no heartbeat received within election timeout, a follower becomes a candidate and requests votes. The candidate with the most up-to-date log (highest term + log index) wins. Log replication — leader receives client writes, appends to its log, sends AppendEntries RPCs to followers, commits when a majority acknowledges, then responds to client. Log safety — a leader can only commit entries from its current term; this prevents the 'ghost entry' problem. Raft's key insight: leader-based with strong leader invariants makes reasoning tractable. Multi-Paxos optimizes classic Paxos for repeated consensus by maintaining a stable leader. In practice, latency of consensus is 1 RTT (leader to quorum) — this is the unavoidable cost of strong consistency. Geo-distributed consensus requires crossing regional network RTTs (50–200ms), making it unsuitable for low-latency write paths.",
    interviewAnswer: "For distributed coordination (leader election, distributed locks, configuration management), I'd use etcd — it's battle-tested Raft and already in every Kubernetes cluster. For data stores requiring strong consistency, I'd use CockroachDB or Spanner rather than implementing Raft myself. The key design question is: can I afford the latency cost of consensus on my write path? For a payment service where consistency is non-negotiable, yes. For a user-facing write path where latency matters, I'd push consistency off the critical path using async reconciliation.",
    trap: "Thinking consensus is free in terms of latency. Every consensus round requires responses from a quorum of N/2+1 nodes — that's at minimum 1 network round trip to the slowest quorum member. In a 3-AZ setup, that's at minimum 1ms intra-region latency on every write. For cross-region consensus, latency is 50–200ms. Design your hot path to avoid consensus or use pre-leasing techniques.",
    memoryAnchor: "Raft = electing a class president. One leader, majority vote to pass anything. If the president is absent, hold a new election. Simple democracy -- everyone understands the rules, unlike Paxos (parliamentary procedure nobody can follow).",
  },
  {
    id: "vector-clocks-crdts",
    title: "Vector Clocks & CRDTs",
    category: "consistency",
    basic: "Vector clocks track causality between events in distributed systems. CRDTs (Conflict-free Replicated Data Types) are data structures designed to merge concurrent updates without conflicts.",
    expected: "Vector clocks: each node maintains a counter per node in the system. On send, increment own counter and attach the vector. On receive, merge by taking the max of each element. If vector A is strictly less than vector B in all positions, A happened-before B. If neither dominates, the events are concurrent — a conflict resolution strategy is needed. CRDTs: data types where all concurrent updates can be merged commutatively and associatively. Examples: G-Counter (grow-only, merge by max), PN-Counter (add/subtract, two G-Counters), OR-Set (add/remove sets with add-wins semantics), LWW-Register (last write wins by timestamp).",
    deep: "Vector clocks scale poorly with the number of nodes (O(N) metadata per message). Dotted version vectors (used by Riak) reduce this overhead. DynamoDB originally used vector clocks but moved to LWW with a 'last writer wins' timestamp due to client complexity in resolving conflicts. CRDTs are the principled solution to automatic conflict resolution. They're used in: Redis (CRDT-based data types in Redis Enterprise), Riak, collaborative editing (Google Docs uses operational transformation — a related concept), distributed shopping carts (add-wins OR-Set). The key CRDT insight: if all operations commute and are idempotent, replica state can be merged in any order and always converge. The tradeoff: CRDT semantics don't always match business intent (a shopping cart OR-Set never forgets an add — a removed item might reappear after a network partition heal).",
    interviewAnswer: "I'd use CRDTs for data that naturally supports merge semantics: counters (view counts, like counts), sets (tags, reactions), and presence indicators. For a shopping cart, I'd use an OR-Set CRDT so concurrent adds from multiple devices are preserved. For like counts, a PN-Counter. For data that doesn't naturally merge (e.g., a user's shipping address), LWW with explicit conflict detection is simpler — surface the conflict to the user rather than silently picking a winner.",
    trap: "Assuming CRDTs eliminate all consistency concerns. CRDTs guarantee eventual convergence of the data structure state, but the business semantics of the merged state may still be wrong. An OR-Set shopping cart that preserves all adds from a network partition may show a doubled quantity. Application-level validation is still needed.",
    memoryAnchor: "Vector clocks = each friend stamps their letter with 'I've seen messages 1-5 from Alice, 1-3 from Bob.' CRDTs = LEGO bricks designed so no matter what order you snap them together, you get the same castle.",
  },

  // NETWORKING
  {
    id: "load-balancers",
    title: "Load Balancers: L4 vs L7",
    category: "networking",
    basic: "Load balancers distribute incoming traffic across multiple backend servers. L4 (transport layer) balances based on TCP/UDP without inspecting payload. L7 (application layer) understands HTTP and can route based on URL, headers, and cookies.",
    expected: "L4 load balancers (AWS NLB, HAProxy TCP mode): operate on IP and port, extremely fast (nanoseconds per packet), support any TCP/UDP protocol, no TLS termination at the balancer level (TLS passthrough). L7 load balancers (AWS ALB, Nginx, Envoy): inspect HTTP headers and URLs, enable path-based routing (/api to service A, /static to CDN), host-based routing (api.example.com vs www.example.com), sticky sessions by cookie, TLS termination, WebSocket upgrades, HTTP/2 support. Algorithms: round-robin, least connections, IP hash (sticky), weighted round-robin.",
    deep: "L7 load balancers are the standard for microservices — they serve as the ingress layer for service routing, auth middleware, rate limiting, and observability. Envoy Proxy is the sidecar of choice in service meshes (Istio, Linkerd) — each pod gets an Envoy sidecar that handles all inbound/outbound traffic with circuit breaking, retries, and distributed tracing built in. Health checks: L4 checks whether the TCP port is open; L7 sends HTTP requests to a /health endpoint and checks the response code. L7 health checks catch application-level failures (DB connection pool exhausted) that L4 misses. Consistent hashing in load balancers: for stateful upstreams (caching tiers), consistent hashing ensures the same request always routes to the same upstream server, maximizing cache utilization. Connection draining: when removing a backend from rotation, the load balancer stops sending new connections but waits for existing connections to complete — critical for zero-downtime deployments.",
    interviewAnswer: "For a typical web application, I'd use L7 load balancing (ALB or Nginx) at the edge for HTTP routing, TLS termination, and health checking. Behind it, I'd use L4 for any non-HTTP protocols. In a microservices architecture, I'd use a service mesh (Istio + Envoy) for internal service-to-service load balancing — it gives me circuit breaking, retries, and distributed tracing for free. For the cache tier, I'd configure the load balancer with consistent hashing to maximize cache hit rates.",
    trap: "Forgetting that L7 load balancers introduce additional latency and are themselves a single point of failure. Always run multiple load balancer instances behind a VIP (Virtual IP) with ECMP routing, and monitor load balancer CPU — they can saturate under TLS handshake load.",
    memoryAnchor: "L4 load balancer = a highway traffic cop waving cars to different lanes (fast, doesn't care what's inside). L7 = a hotel concierge reading your reservation to send you to the right floor (smarter, but takes a moment to read).",
  },
  {
    id: "tcp-vs-udp",
    title: "TCP vs UDP",
    category: "networking",
    basic: "TCP is a connection-oriented, reliable protocol that guarantees ordered delivery via acknowledgments and retransmissions. UDP is connectionless and unreliable — packets may be lost, duplicated, or reordered, but it has lower overhead.",
    expected: "TCP: use when reliability and ordering are required (HTTP, databases, file transfer). Three-way handshake adds 1 RTT latency at connection establishment; retransmissions add latency on packet loss. UDP: use when low latency matters more than reliability (video streaming, gaming, DNS, VoIP). Applications can implement their own reliability on top of UDP if needed (QUIC is essentially TCP semantics over UDP). HTTP/3 uses QUIC (UDP-based), eliminating TCP's head-of-line blocking.",
    deep: "TCP's head-of-line blocking: within a TCP stream, a lost packet blocks delivery of all subsequent packets until retransmitted. HTTP/2 multiplexes multiple streams over one TCP connection — a lost packet blocks all streams simultaneously (head-of-line blocking at the TCP level). HTTP/3 + QUIC solves this: each HTTP/3 stream is independently flow-controlled at the QUIC layer — a lost packet only blocks the stream it belongs to, not all streams. QUIC also bakes TLS 1.3 into the handshake, reducing connection setup to 1 RTT (vs TCP's 3-way handshake + TLS handshake = 2 RTTs). For real-time applications (gaming, WebRTC), UDP with application-level selective retransmission gives control over which packets are worth retransmitting — stale video frames are discarded rather than retransmitted.",
    interviewAnswer: "I use TCP for everything requiring reliability (APIs, databases, messaging). I'd choose UDP (via QUIC or WebRTC) for real-time media or gaming where head-of-line blocking in TCP would cause perceptible jitter. For a live video streaming system, I'd use HLS (HTTP/TCP) for broad compatibility but offer a WebRTC (UDP-based) path for real-time low-latency streams. For the API layer, I'd adopt HTTP/3 at the edge to eliminate TLS+TCP handshake overhead on mobile networks.",
    trap: "Assuming UDP means you lose all reliability. QUIC over UDP implements its own reliable ordered delivery per stream. WebRTC has its own congestion control (NACK/FEC). UDP is not 'unreliable' in applications — it's 'unreliable at the transport layer, with optional application-layer reliability.'",
    memoryAnchor: "TCP = sending a certified letter (signature required, guaranteed delivery, slow). UDP = shouting across the yard (fast, no guarantee they heard you, perfect for 'dinner's ready!' where a retry is just shouting louder).",
  },
  {
    id: "http2-websockets-grpc",
    title: "HTTP/2, WebSockets, and gRPC",
    category: "networking",
    basic: "HTTP/2 multiplexes multiple requests over a single TCP connection and supports header compression. WebSockets provide full-duplex persistent connections over HTTP. gRPC is an RPC framework using HTTP/2 and Protocol Buffers for efficient service-to-service communication.",
    expected: "HTTP/2: multiple concurrent requests on one TCP connection (no need for connection pooling tricks), server push, header compression (HPACK). No head-of-line blocking at HTTP level (but still TCP-level HOL blocking — solved by HTTP/3). WebSockets: upgrade from HTTP/1.1, bidirectional real-time communication (chat, live updates, gaming). Server maintains persistent connection per client — stateful, requires careful scaling. gRPC: uses HTTP/2 for multiplexing + Protocol Buffers for binary serialization (10x smaller than JSON, faster parse). Supports streaming (client, server, bidirectional). Strongly typed via .proto contracts. Ideal for internal microservice communication.",
    deep: "gRPC vs REST trade-offs: gRPC has a steeper learning curve (.proto files, code generation), limited browser support (requires gRPC-web proxy), but offers 5–10x lower latency and bandwidth vs JSON/REST for high-frequency internal calls. Proto3 backward compatibility: adding fields is safe (unknown fields ignored); removing requires a deprecation cycle. gRPC streaming enables patterns impossible in REST: server-streaming for real-time subscriptions, bidirectional streaming for collaborative editing. WebSocket scaling challenge: a persistent connection to a specific server makes horizontal scaling and zero-downtime deploys harder. Solutions: nginx upstream keepalive + connection draining, or a dedicated WebSocket gateway layer backed by a pub/sub system (Redis pub/sub, Kafka) so any server can send a message to any connected client regardless of which server holds the connection.",
    interviewAnswer: "For client-to-server APIs consumed by browsers and mobile clients, I'd use REST/HTTP with HTTP/2 enabled at the edge. For real-time bidirectional communication (chat, live notifications), WebSockets via a dedicated gateway backed by Redis pub/sub for fan-out across multiple gateway instances. For internal microservice-to-microservice communication, gRPC — the binary protocol and strong typing with code generation reduce boilerplate and surface schema mismatches at compile time rather than runtime.",
    trap: "Using WebSockets for every 'real-time' use case. Server-Sent Events (SSE) over HTTP/2 handle most unidirectional server-push needs (notifications, live counts) without the WebSocket overhead and scaling complexity. Use WebSockets only when you need true bidirectional communication.",
    memoryAnchor: "HTTP/2 = a multi-lane highway on one road (multiplexing). WebSockets = a walkie-talkie (both sides talk anytime). gRPC = a drive-through intercom with a strict menu (proto contract) -- fast, typed, no misunderstandings.",
  },
  {
    id: "api-gateway",
    title: "API Gateway",
    category: "networking",
    basic: "An API gateway is a single entry point for all client requests. It handles routing to backend services, authentication, rate limiting, request transformation, and observability.",
    expected: "API gateways consolidate cross-cutting concerns: auth (JWT validation, OAuth), rate limiting, SSL termination, request logging, and routing. Backend services don't need to implement these individually. Common implementations: AWS API Gateway, Kong, Nginx, Envoy, Apigee. In a microservices architecture, the gateway routes /users/* to the user service and /orders/* to the order service — clients see one endpoint.",
    deep: "API gateway patterns: BFF (Backend for Frontend) — a specialized gateway per client type (mobile BFF, web BFF) that aggregates and transforms data for the specific client's needs, reducing over-fetching and chattiness. GraphQL as API gateway — a single GraphQL schema over multiple microservices, enabling clients to request exactly the data they need. GraphQL federation (Apollo Federation) allows each microservice to own its portion of the schema. Gateway vs service mesh: a gateway manages north-south traffic (external clients to internal services); a service mesh manages east-west traffic (service to service). In production, both are used together. Rate limiting at the gateway: token bucket or sliding window per client API key. Centralized rate limiting requires a distributed counter (Redis) to aggregate limits across multiple gateway instances.",
    interviewAnswer: "I'd place an API gateway at the edge for all external traffic — it's the right place for auth, rate limiting, and routing. I'd keep the gateway thin (routing + auth only) and push business logic into services to avoid the gateway becoming a bottleneck. For internal services, I'd use a service mesh (Istio) rather than routing internal calls through the external gateway. I'd implement rate limiting using a sliding window counter in Redis, keyed by (API_key, time_window) with atomic INCR + EXPIRE.",
    trap: "Building too much logic into the API gateway. Gateways that perform data transformation, business logic, or database queries become a shared bottleneck and single point of failure. Keep gateways as dumb routers; put logic in services.",
    memoryAnchor: "API Gateway = the front desk of a hotel. It checks your ID (auth), tells you which floor (routing), and limits how many people enter (rate limiting). But the front desk should NOT cook your food -- that's the kitchen's (service's) job.",
  },

  // RELIABILITY
  {
    id: "sla-slo-sli",
    title: "SLA, SLO, and SLI",
    category: "reliability",
    basic: "SLI (Service Level Indicator) is a metric (e.g., p99 latency). SLO (Service Level Objective) is the target for that metric (p99 latency < 200ms, 99.9% of requests). SLA (Service Level Agreement) is a contractual commitment to customers with penalties for violations.",
    expected: "SLIs are the raw measurements: latency percentiles, error rate, availability (successful requests / total requests). SLOs are the internal targets teams operate to — they should be tighter than SLAs to leave an error budget. The error budget is the allowed failure time/rate before the SLO is breached: 99.9% availability allows ~43.8 minutes of downtime per month. Error budgets drive decisions: if you're burning budget fast, halt feature releases and focus on reliability. If budget is healthy, you can afford riskier changes.",
    deep: "Availability math: 99.9% = 43.8 min/month downtime. 99.99% = 4.38 min/month. 99.999% = 26 sec/month. Each nine is 10x harder to achieve and costs significantly more. The error budget framework (Google SRE): teams own their error budget. If a system violates its SLO, the team must prioritize reliability over features until the budget recovers. This creates a business-driven incentive for reliability without top-down mandates. Measuring availability correctly: don't just track uptime (is the server running?). Measure request success rate at the client level — a server that returns 500s for all requests is 'up' but has 0% availability. Use synthetic monitoring (probes from multiple regions) plus real user monitoring (RUM) for comprehensive coverage. Latency SLOs should target percentiles, not averages: if p99 is 2 seconds, 1% of users have a terrible experience — that's 10,000 users per million requests. Design for the tail.",
    interviewAnswer: "I'd define SLOs before building: what does 'reliable' mean for this system? Typically: availability (99.9% or 99.99%), latency (p50/p95/p99 targets), and error rate (< 0.1%). I'd instrument every service to emit these SLIs and set up error budget alerts. When the budget is 50% consumed in the first half of the month, I'd trigger a reliability review. I'd choose SLOs based on what users actually need — a batch processing job has very different requirements than a payment API.",
    trap: "Conflating SLA and SLO. The SLA is the external promise (often 99.9% with service credits). The SLO is the internal target (99.95%) — always tighter to catch problems before they breach the SLA. Never tell a customer your SLO is the same as your SLA.",
    memoryAnchor: "SLI = the speedometer reading. SLO = the speed limit you set for yourself (55 mph). SLA = the speed limit on the sign with a fine if you break it. Always drive under YOUR limit so you never pay the ticket.",
  },
  {
    id: "circuit-breaker",
    title: "Circuit Breaker",
    category: "reliability",
    basic: "A circuit breaker stops calls to a failing downstream service after a failure threshold is exceeded, returning an error immediately (or a cached fallback) until the service recovers, preventing cascading failures.",
    expected: "Three states: Closed (normal operation, calls pass through), Open (calls fail fast, downstream not called), Half-Open (allow a test request; if it succeeds, close the circuit; if it fails, remain open). Failure threshold triggers Open state: e.g., 50% error rate over 10 requests in 60 seconds. The breaker periodically transitions to Half-Open to test recovery. Libraries: Hystrix (Netflix), Resilience4j, Polly (.NET).",
    deep: "Circuit breakers prevent cascading failures: if Service A calls Service B, and B is slow (not failing fast), A's threads accumulate waiting for B. Eventually A's thread pool is exhausted and A fails for all callers, propagating the failure upstream. The breaker cuts this cascade by failing fast — A gets an immediate error (or cached response) instead of waiting, freeing its threads. Count-based vs time-based windows: count-based opens after N consecutive failures (simple but can open on a burst of unrelated errors). Time-based sliding window (Resilience4j default) tracks failures in the last N seconds — more accurate for noisy systems. Fallback strategies: return cached data (acceptable for feeds, product catalogs), return degraded response (search returns fewer results), or return a clear error (better than a silent timeout). Bulkhead pattern complements circuit breakers: isolate thread pools per downstream service so a slow dependency consumes only its allocated threads, not the entire service thread pool.",
    interviewAnswer: "I'd implement circuit breakers at every external service call boundary. I'd configure failure thresholds conservatively (80% error rate over 20 calls) to avoid false trips on bursty traffic. The fallback is critical — for product recommendations, I'd return a static 'trending items' list; for search, return the previous result. I'd pair circuit breakers with bulkheads: separate Hystrix thread pools (or semaphore limits) per downstream service so one failing dependency can't exhaust all threads.",
    trap: "Opening the circuit breaker too aggressively. If the threshold is 10% error rate over 5 requests, a temporary network blip opens the circuit and takes down a dependency unnecessarily. Tune thresholds based on baseline error rates from production metrics, not theoretical minimums.",
    memoryAnchor: "Circuit breaker = your home's electrical breaker panel. When a downstream appliance (service) short-circuits, the breaker TRIPS to protect the whole house. Half-open = cautiously flipping the switch back to test if the toaster stopped smoking.",
  },
  {
    id: "rate-limiting",
    title: "Rate Limiting",
    category: "reliability",
    basic: "Rate limiting restricts the number of requests a client can make in a time window to prevent abuse, protect backend resources, and ensure fair usage across clients.",
    expected: "Token bucket: each client has a bucket of N tokens. Each request consumes one token. Tokens refill at a fixed rate. Allows bursting up to bucket capacity, then limits to refill rate. Leaky bucket: requests enter a queue (the bucket) and are processed at a constant rate — smooths traffic but adds latency. Fixed window counter: count requests in each minute window. Simple but vulnerable to boundary spikes (2x allowed requests straddle two window boundaries). Sliding window log: track timestamps of each request; count requests in the last N seconds. Accurate but memory-intensive. Sliding window counter: approximate sliding window using weighted average of current and previous window counts — good balance of accuracy and efficiency.",
    deep: "Distributed rate limiting: per-instance counters are inaccurate (a user can bypass a 100 req/s limit by hitting 100 instances at 1 req/s each). Centralized rate limiting requires a distributed counter — Redis INCR with EXPIRE is the standard approach. For high-throughput rate limiting, use Redis with Lua scripts (atomic read-increment-compare) or Redis 7's built-in function feature. Token bucket in Redis: store (last_refill_time, token_count) per key. On each request, compute tokens to add since last refill, check if sufficient, decrement atomically. Cloudflare and Stripe use sliding window counters at the edge; they accept 1-2% over-counting at boundaries as an acceptable trade-off for efficiency. For API monetization, rate limits are per-plan: free tier at 10 req/min, paid at 1000 req/min — stored in a configuration service and looked up at request time.",
    interviewAnswer: "I'd implement rate limiting in the API gateway using a sliding window counter in Redis. The key is (client_id, time_window_bucket) with atomic INCR. For each request, I'd compute the weighted average of the previous window and current window to get a smooth rate estimate. I'd expose rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After) to clients so they can self-throttle. For different tiers, I'd store the limit per API key in a configuration store and cache it locally with a short TTL.",
    trap: "Implementing rate limiting purely per-instance without a distributed counter. A user hitting 10 app servers can exceed the limit by 10x. Always use a shared counter for rate limiting in horizontally scaled services.",
    memoryAnchor: "Rate limiting = a bouncer with a clicker counter at the club door. Token bucket = you get 10 drink tickets per hour; spend them whenever, but once they're gone, wait for the next refill. Leaky bucket = drinks pour out at a steady drip no matter how fast you order.",
  },
  {
    id: "chaos-engineering",
    title: "Chaos Engineering",
    category: "reliability",
    basic: "Chaos engineering deliberately injects failures into production systems to find weaknesses before they cause real outages, building confidence in the system's resilience.",
    expected: "Netflix pioneered this with Chaos Monkey (randomly terminates EC2 instances). The process: define a steady state (system behaves normally), form a hypothesis (system will remain stable if X fails), run the experiment in production or staging, compare results to steady state. Chaos experiments: kill random instances, inject network latency, drop packets, saturate disk, cause dependency failures. Tools: Chaos Monkey, Gremlin, AWS Fault Injection Simulator, Litmus (Kubernetes).",
    deep: "Chaos engineering is not random destruction — it's controlled experiments with blast radius management. Start in staging, then move to production with kill switches. Limit experiments to non-peak hours initially. Define the minimal experiment scope: one instance, one AZ, one dependency. The goal is to find the gap between your design assumptions and system behavior. Key insights from chaos experiments: circuit breakers that are configured but never tested often have wrong thresholds; auto-scaling groups that look correct in theory can fail to scale in time; health check misconfigurations let unhealthy instances serve traffic. Game Days extend this: the team runs a planned disaster scenario (region outage, database failure) together, observing system behavior and practicing runbooks. Google DiRT (Disaster Recovery Testing) runs multi-day exercises simulating datacenter failures.",
    interviewAnswer: "I'd introduce chaos engineering in three phases: first, run chaos experiments in staging to validate that circuit breakers, retries, and failover work as designed. Second, move to production during off-peak hours with strict blast radius limits (one instance, one AZ at a time). Third, run Game Days quarterly where the team practices responding to simulated outages. The metric for success is that chaos experiments find failures before users do — every chaos-induced incident is a win.",
    trap: "Treating chaos engineering as a one-time activity. The value comes from continuous experimentation as the system evolves. New features, configuration changes, and dependency updates can break previously validated resilience properties — run chaos experiments in CI/CD pipelines.",
    memoryAnchor: "Chaos engineering = a fire drill for your servers. You deliberately set small controlled fires to find the exits that are blocked BEFORE the real emergency. Netflix's Chaos Monkey = a gremlin that unplugs random machines to keep engineers honest.",
  },

  // INTERVIEW FRAMEWORK
  {
    id: "requirements-gathering",
    title: "Requirements Gathering",
    category: "interview-framework",
    basic: "Before designing anything, clarify functional requirements (what the system does), non-functional requirements (scale, latency, availability, consistency), and constraints (technology, team, budget).",
    expected: "Functional requirements: core features to support, user actions, data to store and query. Non-functional requirements: scale (DAU, QPS, data volume), latency targets (p99 < 200ms), availability SLO (99.9% vs 99.99%), consistency needs (strong vs eventual), geographic distribution (single region vs multi-region). Constraints: read/write ratio (read-heavy systems design differently than write-heavy), data size per entity, retention period. Always clarify before designing — the 'right' answer depends entirely on the requirements.",
    deep: "Experienced interviewers listen for what you ask as much as what you design. Asking 'What's the read/write ratio?' signals you understand that read-heavy systems (more replicas, caching) differ from write-heavy (sharding, write-optimized stores). Asking 'What's the consistency requirement?' shows you know the CAP trade-off. Red flags in requirements gathering: assuming the interviewer wants the most complex design, asking about specific technologies before understanding the problem, not asking about scale at all. Structure your questions: start with functional ('What are the core user actions?'), then scale ('How many users, how many requests per second?'), then constraints ('Any existing infrastructure or technology preferences?'), then non-functional ('What's the acceptable latency? What's the availability target?').",
    interviewAnswer: "I always spend the first 5 minutes on requirements. My standard questions: (1) What are the core user-facing features in scope? (2) What's the expected scale — DAU, peak QPS for reads and writes? (3) What's the consistency requirement — can users see slightly stale data? (4) What are the latency targets? (5) What's the availability SLO? (6) Any geographic constraints (single region vs global)? Then I summarize what I heard and confirm before moving to design. This prevents designing a globally distributed real-time system when the interviewer wanted a simple CRUD app.",
    trap: "Spending too long on requirements gathering and not enough time on design. Allocate 5 minutes maximum, get the key answers, and design. You can revisit assumptions as you go. Interviewers want to see architectural thinking, not a requirements document.",
    memoryAnchor: "Requirements gathering = asking the waiter questions before ordering. 'How spicy is it? Is it gluten-free? How big is the portion?' Skip this and you'll design a feast for 1,000 when they wanted a sandwich for 10.",
  },
  {
    id: "back-of-envelope",
    title: "Back-of-Envelope Estimation",
    category: "interview-framework",
    basic: "Quick calculations to determine system scale: storage requirements, bandwidth, QPS, server count. These numbers drive design decisions — whether you need sharding, caching, CDN, and how many servers are required.",
    expected: "Key numbers to memorize: latency (L1 cache 0.5ns, RAM 100ns, SSD 100μs, network same DC 500μs, cross-region 150ms), throughput (1Gbps network, SSD 500MB/s), storage units (1KB text, 100KB image, 4MB video segment). Approach: start with users (100M DAU), derive requests (10% active at peak = 10M users, 10 requests/user/hour = 100M req/hour = 28K QPS), derive storage (100M users × 1KB profile = 100GB), derive bandwidth (28K QPS × 10KB avg response = 280MB/s).",
    deep: "Common estimation mistakes: not distinguishing peak from average (design for peak: typically 3–5x average), forgetting replication factor (3 replicas = 3x storage), ignoring metadata overhead (indexes, logs, backups add 30–50% to raw data storage). Essential formula: QPS = DAU × requests_per_user_per_day / 86400. For storage growth: data_per_day × days_retention × replication_factor. For read throughput: peak_QPS × avg_response_size. Server count: (QPS × avg_latency) / (cores_per_server × utilization_target). Single server handles ~1000-10000 QPS for CPU-bound, more for I/O bound with async. Bandwidth: 1Gbps NIC is ~100MB/s TCP throughput (TCP overhead). A video streaming server at 1Mbps per stream serves 100 concurrent viewers per Gbps NIC.",
    interviewAnswer: "I structure estimations in three buckets: (1) Traffic: QPS = DAU × actions/day / 86400, scale for 3x peak. (2) Storage: entities × size_per_entity × replication × retention. (3) Bandwidth: peak QPS × average payload size. Then I translate those to component requirements: if I need > 100K QPS, I'll need sharding or a distributed cache. If storage is > 10TB, I need distributed storage. I keep math simple and round aggressively — the goal is an order of magnitude, not an exact number.",
    trap: "Skipping estimation and going straight to architecture. Numbers drive decisions: a system serving 100 QPS has completely different constraints than one serving 1M QPS. Without estimation, you might design a distributed system for a workload that fits on one server, or a single-server system that will fall over under real load.",
    memoryAnchor: "Back-of-envelope = napkin math at a restaurant. 'We need 100M users x 1KB each = 100GB. That fits on one SSD!' It's not about precision -- it's about knowing if you need a bicycle or a freight train.",
  },
];

// ─── Interview Patterns ───────────────────────────────────────────────────────

const interviewPatterns: InterviewPattern[] = [
  {
    question: "How do you approach a system design interview question?",
    answer: "I follow a 5-step framework: (1) Requirements — 5 min clarifying functional and non-functional requirements, confirming scale and constraints. (2) Estimation — back-of-envelope for QPS, storage, and bandwidth. (3) High-level design — draw the major components (clients, load balancers, app servers, databases, caches) and data flow. (4) Deep dive — pick 2–3 critical components and go deep (schema design, sharding strategy, cache invalidation, consistency model). (5) Trade-offs — explicitly state what you chose and what you gave up, and how you'd evolve the design if requirements changed.",
    whyAsked: "Interviewers want to see structured thinking, not random facts. The framework demonstrates that you can navigate ambiguity, prioritize, and communicate trade-offs — skills critical for senior engineers.",
    trap: "Jumping directly to a specific technology (Kafka, Redis, Cassandra) before understanding the problem. Technology choices should follow from requirements, not precede them.",
  },
  {
    question: "How would you design a URL shortener like bit.ly?",
    answer: "Requirements: 100M URLs/day written, 10B reads/day (100:1 read:write ratio). Estimation: 100K writes/s at peak, 10M reads/s at peak. Key design: (1) ID generation — use a base62 encoding of a 64-bit ID (7 chars) from a distributed ID generator (Snowflake or database sequence). (2) Write path: write (short_id, long_url, created_at, user_id) to a database; short_id is the primary key. (3) Read path: user requests /abc123 → lookup in Redis cache (miss → DB) → 301 redirect. Cache hit ratio should be > 99% since top URLs get most traffic. (4) Database: key-value access pattern — DynamoDB or PostgreSQL with short_id primary key. (5) Analytics: async event stream to Kafka for click counting without blocking the redirect path.",
    whyAsked: "URL shorteners test: ID generation at scale, high read throughput caching, read/write separation, and redirect mechanics.",
    trap: "Using auto-increment IDs without distributed coordination — multiple DB nodes will generate duplicates. Use a single sequence generator service, hash of the long URL + collision detection, or a pre-generated ID pool.",
  },
  {
    question: "How do you design a system to handle 1 million concurrent WebSocket connections?",
    answer: "Key insight: WebSocket connections are long-lived and stateful — one connection per user maintained at a specific server. (1) Gateway layer: dedicated WebSocket gateway servers (Go or Rust for efficient async I/O — can handle 100K connections per server, need 10 servers for 1M). (2) Stateless fanout: gateways don't know what to send — they subscribe to a pub/sub system (Redis pub/sub or Kafka) keyed by user_id. Any backend service publishes a message to user_123's channel; the gateway holding user_123's connection delivers it. (3) Connection registry: a Redis hash maps user_id → gateway_server_id for targeted delivery. (4) Heartbeat and reconnect: clients send pings every 30s; gateway disconnects silent clients. (5) Scaling: add gateway servers as connection count grows; existing connections stay on their server, new connections go to new servers. Redis pub/sub handles the fanout across gateways.",
    whyAsked: "Tests understanding of stateful connection management, horizontal scaling of stateful services, and pub/sub patterns for message delivery.",
    trap: "Routing WebSocket messages through the same API gateway as HTTP requests. WebSocket servers have fundamentally different resource profiles (long-lived connections, memory-bound) and need separate scaling from HTTP services.",
  },
  {
    question: "How do you design a distributed rate limiter?",
    answer: "Requirements: rate limit API requests per user (1000 req/min), distributed across 50 app servers. Design: (1) Algorithm — sliding window counter: store (current_window_count, previous_window_count) per user key in Redis. For each request, compute weighted rate = prev_count × (1 - elapsed/window) + curr_count. (2) Redis implementation: MULTI/EXEC or Lua script for atomic read-increment. Use Redis Cluster for distribution. Key structure: rate_limit:{user_id}:{window_start_timestamp}. (3) Fallback: if Redis is down, fail open (allow requests) or fail closed (reject all) — fail open is usually right to avoid cascading failures. (4) Headers: return X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset on every response so clients can self-throttle. (5) Tiered limits: store each user's limit in a config store; cache locally with 60s TTL to avoid Redis lookup on every request.",
    whyAsked: "Tests knowledge of rate limiting algorithms, distributed coordination, Redis usage, and failure handling — common in API platform and infrastructure roles.",
    trap: "Implementing rate limiting in application memory without Redis. With 50 servers each allowing 1000 req/min, a user can make 50,000 req/min by spreading load across instances.",
  },
  {
    question: "How do you ensure data consistency when a payment service needs to update multiple databases atomically?",
    answer: "Options from strongest to most flexible: (1) Two-phase commit (2PC): distributed transaction coordinator asks all participants to prepare, then commit. Strong consistency but blocking on coordinator failure and high latency. Not suitable for high-throughput systems. (2) Saga pattern: break the transaction into a sequence of local transactions, each publishing an event. If a step fails, compensating transactions roll back previous steps. Two flavors: choreography (each service listens to events and decides next action) or orchestration (a central saga orchestrator drives the sequence). (3) Transactional outbox: write both the state change and outbound event to the same DB in one ACID transaction. A relay reads the outbox and publishes to Kafka. Guarantees event is published if and only if the DB commits. Best for most microservice payment scenarios. I'd use the outbox pattern for payments — it gives exactly-once event publishing with at-least-once Kafka delivery and idempotent consumers.",
    whyAsked: "Distributed transactions are a core challenge in microservices. This question tests your knowledge of consistency patterns beyond simple single-DB ACID.",
    trap: "Reaching for 2PC as the default. 2PC blocks on coordinator failure and adds 2 RTTs to every write. Use it only when you control all participants and the latency cost is acceptable. For microservices, the saga + outbox pattern is almost always the right answer.",
  },
  {
    question: "How would you design a notification system (push, email, SMS) at scale?",
    answer: "Design: (1) Notification service receives requests (via API or from other services). Validates, enriches, and writes to an outbox table in the DB. (2) Fanout worker reads the outbox and routes to channel-specific queues (push_queue, email_queue, sms_queue). (3) Channel workers dequeue and call third-party providers (APNs/FCM for push, SendGrid for email, Twilio for SMS). (4) Retry with exponential backoff for transient failures. Idempotency key per notification to avoid duplicate sends. (5) User preferences service: before sending, check notification preferences (opted out of marketing emails, etc.) cached in Redis. (6) Priority queues: separate queues for transactional (OTP, password reset — high priority) vs marketing (low priority). (7) Rate limiting per user: no more than N notifications per day per channel to avoid spamming. (8) Observability: track delivery rates, bounce rates, and open rates per channel.",
    whyAsked: "Notification systems test async processing, queue design, third-party integration reliability, idempotency, and user preference management.",
    trap: "Synchronously calling third-party notification providers inline in the request path. Third-party providers have variable latency and availability — always async via a queue. If SendGrid is down, your queue retries; if your API is down for the same reason, users get errors.",
  },
  {
    question: "How do you design a system for global low-latency data access with multi-region writes?",
    answer: "Options: (1) Single region with global CDN for reads: suitable if writes are rare and stale reads are acceptable. (2) Multi-region with primary-secondary replication: writes go to the primary region, replicated asynchronously to secondary regions for reads. Cross-region replication lag is 50–200ms. Secondary regions serve reads; writes are routed to primary (adds latency for non-primary users). (3) Multi-region active-active: writes accepted in any region, replicated everywhere. Requires conflict resolution (LWW, CRDTs, or application-level merging). Google Spanner and CockroachDB support this with strong consistency via Paxos but with higher write latency. DynamoDB Global Tables uses LWW for conflict resolution. Design choice: if the workload is read-heavy (> 95% reads), option 2 (primary with replicas) gives most of the benefit with much less complexity. For collaborative real-time apps where write latency in all regions is critical, active-active with conflict resolution is required.",
    whyAsked: "Multi-region design tests your understanding of the latency vs consistency trade-off in geographically distributed systems — a critical topic for FAANG-scale infrastructure.",
    trap: "Proposing active-active multi-region for all use cases. Active-active with strong consistency (Spanner) is expensive and adds write latency. Active-active with eventual consistency requires conflict resolution logic that many application developers underestimate in complexity.",
  },
  {
    question: "How do you design for zero-downtime deployments?",
    answer: "Strategy: (1) Blue-green deployment: maintain two identical environments (blue = current, green = new). Deploy to green, run smoke tests, then switch the load balancer to route traffic to green. Rollback = flip back to blue. Requires 2x infrastructure cost but enables instant rollback. (2) Canary deployment: gradually roll out the new version to a small percentage of traffic (1% → 5% → 25% → 100%), monitoring error rates and latency at each step. Automated rollback if metrics degrade. (3) Feature flags: deploy new code to all instances but enable features progressively via a flag. Decouples deployment from feature release. (4) Database migrations must be backward compatible: never drop or rename columns in the same deploy as the code change. Process: (a) Deploy code that works with both old and new schema. (b) Run migration to add new column/table. (c) Deploy code that uses new schema. (d) Clean up old schema in a later release. (5) Connection draining at load balancer: when taking a server out of rotation, wait for in-flight requests to complete before terminating.",
    whyAsked: "Zero-downtime deployments test operational maturity and understanding of the interplay between code and database deployments — essential for senior engineers.",
    trap: "Treating schema migrations as trivial. Adding a NOT NULL column without a default to a table with 500M rows will lock the table for hours. Always use non-locking migration techniques: add with a default, backfill in batches, then remove the default.",
  },
];

// ─── Common Mistakes ──────────────────────────────────────────────────────────

const commonMistakes: CommonMistake[] = [
  {
    wrong: "Starting with a specific technology (Kafka, Cassandra, Redis) before understanding requirements.",
    correct: "Start with requirements: functional features, scale, latency, consistency. Then let technology choices follow from the requirements.",
  },
  {
    wrong: "Treating the CAP theorem as a single global choice: 'this system is CP' or 'this system is AP.'",
    correct: "Tune consistency per-operation. The payment confirmation is CP; the activity feed is AP. Modern databases support per-query consistency levels.",
  },
  {
    wrong: "Adding a cache without defining an invalidation strategy — relying on TTL alone.",
    correct: "Define invalidation strategy upfront: on write, delete the cache key (not update). Use TTL as a safety net, not the primary mechanism.",
  },
  {
    wrong: "Designing for at-least-once delivery without making consumers idempotent.",
    correct: "At-least-once delivery means duplicates will arrive. Always make consumers idempotent using deduplication keys stored in a DB or Redis.",
  },
  {
    wrong: "Sharding by a monotonically increasing key (timestamp, auto-increment ID) causing all writes to hit one shard.",
    correct: "Use a high-cardinality, uniformly distributed shard key (user_id hash, tenant_id). Analyze write patterns before choosing a shard key.",
  },
  {
    wrong: "Scaling the database by adding more connections when queries are slow.",
    correct: "More connections do not fix slow queries — they pile up waiting. Fix slow queries first (indexes, query optimization). Add connections only to prevent queuing of fast queries.",
  },
  {
    wrong: "Using synchronous calls between microservices for operations that don't need an immediate response.",
    correct: "Use async messaging (Kafka, SQS) for operations where the caller doesn't need an immediate result. This decouples services and improves resilience.",
  },
  {
    wrong: "Neglecting back-of-envelope estimation and designing based on intuition about scale.",
    correct: "Always estimate QPS, storage, and bandwidth. Numbers drive decisions — whether you need sharding, caching, or CDN cannot be decided without them.",
  },
  {
    wrong: "Designing the happy path only — no discussion of failure modes, partial failures, or recovery.",
    correct: "For each component, ask: what happens when this fails? Define retry policy, circuit breaker threshold, fallback behavior, and data recovery path.",
  },
  {
    wrong: "Using the same database for OLTP (transactional) and OLAP (analytical) workloads.",
    correct: "Separate OLTP and OLAP: run analytics on a read replica or a dedicated data warehouse (Redshift, BigQuery). Analytical queries can saturate the primary DB and impact application latency.",
  },
  {
    wrong: "Proposing a database migration with a breaking schema change (DROP COLUMN, RENAME COLUMN) in the same deployment as the application code change.",
    correct: "Use expand-contract migrations: add the new schema alongside the old, migrate data in batches, update code to use new schema, then remove the old schema in a subsequent release.",
  },
  {
    wrong: "Implementing rate limiting per-instance in application memory for a horizontally scaled service.",
    correct: "Use a centralized counter (Redis) for distributed rate limiting. Per-instance limits multiply by the number of instances, making the limit meaningless.",
  },
];

// ─── Practice Questions ───────────────────────────────────────────────────────

const practiceQuestions: PracticeQuestion[] = [
  {
    code: "Traffic: 500M DAU, 50 tweets/user/day written, 300 followers/user on average, read:write ratio 100:1. Latency target: feed load < 200ms p99.",
    question: "Design a Twitter-like home feed system. How do you generate and serve the feed for each user efficiently at this scale?",
    answer: "Fan-out on write (push model) for users with fewer than 10,000 followers: when a tweet is posted, a fanout service reads the poster's follower list and writes the tweet ID into each follower's feed cache (a sorted set in Redis keyed by user_id, scored by timestamp). Feed reads are pure Redis lookups — O(1) per user, sub-millisecond. Fan-out on read (pull model) for celebrities with > 10,000 followers (the 'hot key' problem): do not pre-compute celebrity feeds. When a user loads their feed, merge the pre-computed feed for non-celebrity accounts with a real-time pull of the top N tweets from followed celebrities. This hybrid model avoids the write amplification of fanning out to 50M followers per Beyoncé tweet. Storage: Redis sorted sets per user with 24-hour TTL (200 tweet IDs × 8 bytes × 500M users = ~800GB Redis, feasible with Redis Cluster). Tweet content lives in a separate database (Cassandra for write throughput), fetched by ID after the feed list is retrieved. CDN caches media attachments. Timeline service assembles the feed: fetch tweet IDs from Redis, hydrate with tweet content from cache/DB, return in < 50ms.",
  },
  {
    code: "Scale: 10M rides/day, 1M concurrent drivers broadcasting GPS location every 5 seconds, riders query nearest drivers in real-time. Match latency target: < 1 second.",
    question: "Design a ride-sharing matching system like Uber. How do you handle real-time location updates and nearest-driver queries at scale?",
    answer: "Location ingestion: drivers send GPS updates every 5s via WebSocket to a Location Service (stateless, horizontally scaled behind a L7 load balancer). Each update is written to a Redis geospatial index (GEOADD) keyed by city/region — Redis natively supports geospatial queries with GEORADIUS. Redis handles 100K writes/s per instance — 1M drivers / 5s = 200K writes/s, so 2–3 Redis instances with geographic sharding (drivers in NYC → NYC Redis cluster). Matching query: when a rider requests a ride, the Matching Service calls GEORADIUS to find all available drivers within 2km, applies a scoring function (ETA, rating, vehicle type), and offers the ride to the top-ranked driver. If the driver doesn't accept within 5s, offer to the next. Driver location in Redis has a TTL of 15s — a driver who stops sending updates is automatically considered offline. Geospatial sharding: shard Redis by geographic cell (S2 or Geohash cells). Queries near cell boundaries query adjacent cells. For real-time ETA computation, a separate service uses road network graph (OSRM or Google Maps API) rather than straight-line distance. Surge pricing: a separate analytics stream aggregates supply/demand ratios per cell in near-real-time using Kafka + Flink.",
  },
  {
    code: "Scale: 1B users, 10M videos uploaded/day (avg 500MB each), 1B video views/day. Storage budget: unlimited. Latency target: video start time < 2 seconds globally.",
    question: "Design a YouTube-like video streaming platform. Cover upload processing, storage, and adaptive bitrate delivery.",
    answer: "Upload pipeline: client uploads raw video to S3 via presigned URL (bypasses your servers, directly to S3). S3 event triggers a message to a Transcoding Queue (SQS). A fleet of Transcoding Workers (spot instances for cost) pull from the queue and transcode each video into multiple resolutions and bitrates (2160p, 1080p, 720p, 480p, 360p) using FFmpeg, outputting HLS or DASH segments (2–10 second chunks). Outputs are stored in S3 with a path structure: /videos/{video_id}/{resolution}/{segment_index}.ts. A playlist manifest file (.m3u8) lists all segments and variants. Storage: 10M videos/day × 500MB raw = 5PB/day raw; transcoded outputs at multiple bitrates add ~3x = 15PB/day growth. Use S3 with lifecycle policies: move to S3 Glacier after 30 days for long tail. Hot content stays in S3 Standard. Delivery: CloudFront CDN with edge locations in every major region. The HLS manifest and segments are CDN-cached — 99%+ of playback traffic is served from CDN edge nodes, not origin S3. Video start time < 2s is achievable because the first 2–10 second segment starts loading immediately while subsequent segments buffer. Adaptive bitrate (ABR): the client player monitors download speed and switches between quality levels by switching to a different variant in the manifest. Database: video metadata (title, description, uploader, status) in PostgreSQL. View counts use a write-buffered counter in Redis (increment in Redis, async flush to DB every minute) to avoid DB write hotspots on viral videos. Search uses Elasticsearch over video metadata.",
  },
  {
    code: "Scale: 100M users, 10B messages/day (100:1 read:write ratio for group chats), groups up to 1000 members. Latency target: message delivery < 100ms p99.",
    question: "Design a messaging system like WhatsApp or Slack. Cover message storage, delivery, and group fanout.",
    answer: "Message storage: Cassandra is the standard choice (WhatsApp uses it) — wide-column store optimized for write throughput and time-series access patterns. Schema: partition key = (conversation_id), clustering key = (message_timestamp, message_id) — queries are always 'get last N messages for conversation X,' which maps perfectly to this schema. One-to-one messaging: sender writes message to Cassandra, publishes to the recipient's message queue (Redis list or SQS). Recipient's device polls via WebSocket connection. Delivery: each user maintains a persistent WebSocket connection to a Chat Server. A connection registry (Redis hash: user_id → chat_server_id) allows any service to route a message to the correct Chat Server, which delivers it over the open WebSocket. Group messaging fanout: for small groups (< 100 members), use fan-out on write — write one message to the DB, then notify each member's Chat Server via pub/sub. For large groups (100–1000 members), fan-out happens asynchronously via a Kafka consumer group to avoid blocking the write path. Message status: a 'delivery receipts' service updates message_status (sent, delivered, read) in Cassandra. Push notifications (APNs/FCM) for offline users, backed by a notification queue. End-to-end encryption: client generates session keys per conversation (Signal Protocol); the server stores only encrypted ciphertext — zero-knowledge design. Offline message sync: on reconnect, client sends its last-seen message timestamp; server returns all newer messages in the conversation.",
  },
  {
    code: "Scale: 50M DAU, 5M searches/day, product catalog of 100M items. Latency target: search results < 100ms p99. Relevance: ranked by text match, popularity, and personalization.",
    question: "Design an e-commerce search system. How do you index 100M products, serve low-latency queries, and rank results?",
    answer: "Search index: Elasticsearch (or Solr) is the backbone — it shards a 100M product index across multiple nodes, provides full-text search with BM25 ranking, and supports faceted filtering (category, price range, brand). Index each product document with all searchable fields (title, description, attributes, brand) plus filterable fields stored as keyword types. Query pipeline: user query → spell correction (SymSpell or Elasticsearch's suggest API) → query expansion (synonyms: 'tv' → 'television', 'tv set') → Elasticsearch query with function score (BM25 score × popularity score × in-stock boost) → result ranking → personalization re-ranking. Personalization: after Elasticsearch returns top 100 candidates, a lightweight ML re-ranking model (gradient boosted trees or a two-tower neural model) rescores based on user history (clicked, purchased, searched). Model runs in < 20ms using a feature store (Redis) for real-time user features. Caching: cache top 10K most common queries in Redis (TTL: 5 minutes) — cache hit rate > 90% for a product catalog where search patterns cluster. Auto-suggest (typeahead): a separate Elasticsearch index of popular queries with prefix matching, served with < 30ms latency from edge. Index freshness: product updates (price, stock) flow through Kafka → Elasticsearch indexing pipeline. Near-real-time indexing with < 5 second lag. Database of record: PostgreSQL stores the canonical product data; Elasticsearch is a derived index rebuilt from it.",
  },
  {
    code: "Scale: 10M DAU, 1M new posts/day, social graph of 500M follow relationships. Requirement: show top trending topics globally and per user's social network in near-real-time.",
    question: "Design a trending topics system. How do you compute and serve trending topics at scale in near-real-time?",
    answer: "Event ingestion: every post, like, and share event is published to Kafka with topic_tags, timestamp, and user_id. Stream processing: Flink (or Spark Streaming) consumes from Kafka and maintains a sliding window count of topic mentions (15-minute, 1-hour, 24-hour windows). Trending score = count_in_window × recency_boost × diversity_factor (avoid a single viral post dominating). Trending computation is stateful — Flink checkpoints state to S3 for fault tolerance. Top-K selection: use a min-heap of size K (top 10) per window in Flink state — O(N log K) where N is the number of unique topics. Results written to Redis sorted sets every 30 seconds (global trending: key = 'trending:global', score = trending_score). Personalized trending: compute trending separately per geographic region (trending:region:US) and per interest cluster. For follow-graph-based trending (topics popular among my followers), this is more expensive: precompute a user's 'social sphere' trending using their follower graph. For celebrity accounts with millions of followers, use approximation — sample 1000 followers and compute trending for them. Storage: Redis sorted sets for top-K global and regional trending (trivial storage). Trend velocity (rate of change) is computed as the derivative of the count over time — a sudden spike in mentions indicates a breaking trend even if absolute count is low. Abuse prevention: bot detection and deduplication (same IP/device posting the same tag repeatedly is discounted) using a Bloom filter to detect suspiciously repeated contributions.",
  },
  {
    code: "Requirements: Users upload receipts (images), system extracts line items (OCR), stores transaction history, and generates spending reports. Scale: 5M users, 10M receipt uploads/month.",
    question: "Design a personal finance tracker that processes receipt images and generates spending analytics. Cover the ML pipeline and analytics query path.",
    answer: "Upload flow: client uploads receipt image to S3 via presigned URL. S3 event triggers a message to an OCR Processing Queue (SQS). OCR workers pull from the queue and call a vision ML service (AWS Textract or a self-hosted Tesseract + custom NLP model) to extract: merchant name, date, line items with prices, and total. Extracted data is stored in PostgreSQL: receipts table (receipt_id, user_id, s3_url, merchant, date, total, status) and line_items table (item_id, receipt_id, description, category, amount). Category classification: a text classification model (fine-tuned BERT or a rules-based classifier) maps item descriptions to spending categories (Groceries, Restaurants, Transportation). Model served via a low-latency inference service (TorchServe or Triton). Storage: PostgreSQL for transactional data (receipts, line items). Timescale DB (PostgreSQL extension for time-series) or Redshift for analytics queries (spending trends, category breakdowns, monthly summaries). An ETL pipeline syncs from PostgreSQL to Redshift nightly. Analytics API: pre-computed aggregates (monthly spending by category) stored in Redis with daily refresh — most analytics queries read pre-computed data, not running live SQL aggregates. For ad-hoc queries (custom date ranges, specific merchants), query Redshift directly. Background jobs (monthly report generation) run via Celery/SQS. Mobile experience: push notification when a receipt is processed (< 30 seconds from upload). If OCR confidence is low (< 80%), flag for user review in the app.",
  },
  {
    code: "Requirements: Booking a hotel room must be atomic — no double-booking. Scale: 1M hotels, 100M room-nights available, 50K concurrent booking attempts at peak (events like Black Friday travel sales).",
    question: "Design a hotel booking system with strong consistency to prevent double-bookings under high concurrency.",
    answer: "Inventory model: each room-night is a row in an inventory table: (hotel_id, room_type_id, date, available_count, reserved_count). Booking flow: (1) Search phase: read available_count from a read replica (eventually consistent, acceptable for search). (2) Hold phase: user selects a room and initiates checkout — optimistically lock the inventory with a time-limited hold (UPDATE ... SET reserved_count = reserved_count + 1 WHERE available_count > reserved_count AND hold_expires < NOW(); if 0 rows updated, inventory exhausted). Hold expires after 10 minutes. (3) Payment phase: process payment with the payment provider (Stripe). (4) Confirmation phase: convert hold to booking in a single transaction: write the booking record and decrement available_count atomically. If payment fails, release the hold. Concurrency control: use database-level row locking (SELECT FOR UPDATE on the inventory row) during the hold creation to prevent race conditions. This is safe because hold creation is fast (< 100ms) and the lock duration is brief. At 50K concurrent bookings, lock contention is per (hotel_id, room_type_id, date) — a popular hotel on a popular night is the hot row. Mitigate by: (a) partitioning inventory by hotel_id so different hotels don't contend, (b) using a booking queue per hot inventory item (serialize booking attempts through a queue rather than competing for the DB lock). Idempotency: each booking attempt has a client-generated idempotency key stored in the bookings table — retries return the existing booking without creating duplicates. Read replicas serve availability queries; writes always go to the primary PostgreSQL. Cache availability counts in Redis with a short TTL (30 seconds) for search — users see approximately correct availability, with exact enforcement at booking time.",
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

export const topicData: TopicData = {
  topicTitle: "System Design",
  topicMeta: "60–90 min · Senior level",
  lastUpdated: "2026-04-10",
  lastHourConceptIds: [
    "cap-theorem",
    "sharding",
    "cache-strategies",
    "delivery-guarantees",
    "circuit-breaker",
    "sla-slo-sli",
    "requirements-gathering",
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
