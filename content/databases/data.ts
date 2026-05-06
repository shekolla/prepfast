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
    "Databases are the foundation of every application — they determine how data is stored, queried, and scaled. Choosing the right database is not about picking the trendiest technology; it is about matching your data access patterns, consistency requirements, scale needs, and team expertise to a storage engine that was purpose-built for that workload.",
  whyItExists:
    "Different workloads have fundamentally different data access patterns. A payments system needs ACID transactions on individual rows (OLTP). An analytics dashboard needs to scan billions of rows across a few columns (OLAP). A real-time leaderboard needs sub-millisecond key-value lookups. No single database excels at all of these. The discipline of database selection exists because using the wrong database leads to performance cliffs, operational nightmares, and expensive rewrites.",
  whenToUse: [
    "When starting a new project — default to PostgreSQL unless you have a specific reason not to",
    "When your current database is hitting performance limits — diagnose whether it is an indexing, schema, or fundamental engine mismatch problem before migrating",
    "When designing analytics infrastructure — separate your OLTP and OLAP workloads early; do not run analytical queries against your production transactional database",
    "When a feature requires a specialized access pattern: full-text search (Elasticsearch), time-series (TimescaleDB), key-value at massive scale (DynamoDB), or sub-millisecond caching (Redis)",
    "When scaling beyond a single node — understand partitioning, sharding, replication, and connection pooling before you distribute",
    "In interviews when asked to design a system — always justify your database choice based on data size, read/write ratio, consistency needs, and query patterns",
  ],
  whereItFails: [
    "Choosing a database because it is trendy rather than because it fits the workload — MongoDB was used for everything in 2015 and most of those use cases should have been PostgreSQL",
    "Premature optimization: sharding a database at 50GB when a single PostgreSQL instance with proper indexes handles 1TB+ effortlessly",
    "Treating NoSQL as universally faster than SQL — a well-indexed PostgreSQL query is faster than a poorly-designed DynamoDB scan",
    "Ignoring operational complexity: every database you add to your stack requires monitoring, backups, failover testing, version upgrades, and on-call expertise",
  ],
};

// ─── Category Metadata ────────────────────────────────────────────────────────

const categories: CategoryMeta[] = [
  {
    id: "oltp-fundamentals",
    label: "OLTP Fundamentals",
    description:
      "ACID transactions, row-oriented storage, write-optimized engines, and the principles behind transactional databases that power every web application",
  },
  {
    id: "olap-fundamentals",
    label: "OLAP Fundamentals",
    description:
      "Columnar storage, star and snowflake schemas, batch analytics, and the architectural patterns behind analytical databases",
  },
  {
    id: "relational-databases",
    label: "Relational Databases",
    description:
      "PostgreSQL vs MySQL, indexing strategies (B-tree, GIN, GiST, BRIN), MVCC internals, connection pooling, and query optimization techniques",
  },
  {
    id: "document-databases",
    label: "Document & NoSQL",
    description:
      "MongoDB document model and sharding, DynamoDB single-table design and partition keys, Redis data structures and persistence — when NoSQL is the right choice and when it is not",
  },
  {
    id: "analytical-engines",
    label: "Analytical Engines",
    description:
      "Snowflake virtual warehouses and micro-partitions, BigQuery serverless architecture and slot-based pricing, ClickHouse MergeTree engine and real-time OLAP — the modern analytics stack",
  },
  {
    id: "time-series-search",
    label: "Time-Series & Search",
    description:
      "TimescaleDB and InfluxDB for time-series workloads, Elasticsearch inverted indexes and relevance scoring for full-text search and log aggregation",
  },
  {
    id: "data-modeling",
    label: "Data Modeling & Design",
    description:
      "Normalization vs denormalization trade-offs, partitioning strategies (range, hash, list), sharding approaches, and schema design patterns for scale",
  },
  {
    id: "choosing-databases",
    label: "Choosing the Right Database",
    description:
      "A practical decision framework for database selection based on data size, access patterns, consistency needs, team expertise, and total cost of ownership",
  },
];

// ─── Mental Model Tree ───────────────────────────────────────────────────────

const mentalModelTree: TreeNode = {
  id: "root",
  label: "Database Landscape",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "oltp-fundamentals",
      label: "OLTP Fundamentals",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "oltp-vs-olap", label: "OLTP vs OLAP", nodeType: "concept", conceptId: "oltp-vs-olap", importance: "critical", relatedIds: ["olap-columnar-storage", "star-snowflake-schema"] },
        { id: "acid-transactions", label: "ACID Transactions", nodeType: "concept", conceptId: "acid-transactions", importance: "critical", relatedIds: ["postgresql", "mysql"] },
        { id: "row-vs-column-storage", label: "Row vs Column Storage", nodeType: "concept", conceptId: "row-vs-column-storage", importance: "high", relatedIds: ["oltp-vs-olap", "olap-columnar-storage"] },
      ],
    },
    {
      id: "olap-fundamentals",
      label: "OLAP Fundamentals",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "olap-columnar-storage", label: "Columnar Storage", nodeType: "concept", conceptId: "olap-columnar-storage", importance: "high", relatedIds: ["clickhouse", "bigquery", "snowflake"] },
        { id: "star-snowflake-schema", label: "Star & Snowflake Schema", nodeType: "concept", conceptId: "star-snowflake-schema", importance: "high", relatedIds: ["data-modeling-normalization", "snowflake"] },
      ],
    },
    {
      id: "relational-databases",
      label: "Relational Databases",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "postgresql", label: "PostgreSQL", nodeType: "concept", conceptId: "postgresql", importance: "critical", relatedIds: ["acid-transactions", "indexing-strategies", "connection-pooling"] },
        { id: "mysql", label: "MySQL", nodeType: "concept", conceptId: "mysql", importance: "high", relatedIds: ["postgresql", "acid-transactions"] },
        { id: "indexing-strategies", label: "Indexing Strategies", nodeType: "concept", conceptId: "indexing-strategies", importance: "critical", relatedIds: ["postgresql", "query-optimization"] },
        { id: "connection-pooling", label: "Connection Pooling", nodeType: "concept", conceptId: "connection-pooling", importance: "high", relatedIds: ["postgresql", "mysql"] },
        { id: "query-optimization", label: "Query Optimization", nodeType: "concept", conceptId: "query-optimization", importance: "high", relatedIds: ["indexing-strategies", "postgresql"] },
      ],
    },
    {
      id: "document-databases",
      label: "Document & NoSQL",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "mongodb", label: "MongoDB", nodeType: "concept", conceptId: "mongodb", importance: "critical", relatedIds: ["dynamodb", "postgresql"] },
        { id: "dynamodb", label: "DynamoDB", nodeType: "concept", conceptId: "dynamodb", importance: "high", relatedIds: ["mongodb", "redis"] },
        { id: "redis", label: "Redis", nodeType: "concept", conceptId: "redis", importance: "high", relatedIds: ["dynamodb", "connection-pooling"] },
      ],
    },
    {
      id: "analytical-engines",
      label: "Analytical Engines",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "snowflake", label: "Snowflake", nodeType: "concept", conceptId: "snowflake", importance: "critical", relatedIds: ["bigquery", "olap-columnar-storage"] },
        { id: "bigquery", label: "BigQuery", nodeType: "concept", conceptId: "bigquery", importance: "critical", relatedIds: ["snowflake", "clickhouse"] },
        { id: "clickhouse", label: "ClickHouse", nodeType: "concept", conceptId: "clickhouse", importance: "critical", relatedIds: ["bigquery", "snowflake"] },
      ],
    },
    {
      id: "time-series-search",
      label: "Time-Series & Search",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "timescaledb-influxdb", label: "TimescaleDB & InfluxDB", nodeType: "concept", conceptId: "timescaledb-influxdb", importance: "medium", relatedIds: ["postgresql", "clickhouse"] },
        { id: "elasticsearch", label: "Elasticsearch", nodeType: "concept", conceptId: "elasticsearch", importance: "high", relatedIds: ["postgresql", "clickhouse"] },
      ],
    },
    {
      id: "data-modeling",
      label: "Data Modeling & Design",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "data-modeling-normalization", label: "Normalization vs Denormalization", nodeType: "concept", conceptId: "data-modeling-normalization", importance: "high", relatedIds: ["star-snowflake-schema", "postgresql"] },
        { id: "partitioning-strategies", label: "Partitioning Strategies", nodeType: "concept", conceptId: "partitioning-strategies", importance: "high", relatedIds: ["sharding-strategies", "postgresql", "dynamodb"] },
        { id: "sharding-strategies", label: "Sharding Strategies", nodeType: "concept", conceptId: "sharding-strategies", importance: "high", relatedIds: ["partitioning-strategies", "mongodb", "dynamodb"] },
        { id: "schema-migrations", label: "Schema Migrations", nodeType: "concept", conceptId: "schema-migrations", importance: "high", relatedIds: ["postgresql", "mongodb"] },
      ],
    },
    {
      id: "choosing-databases",
      label: "Choosing the Right Database",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "decision-framework", label: "Database Decision Framework", nodeType: "concept", conceptId: "decision-framework", importance: "critical", relatedIds: ["oltp-vs-olap", "postgresql", "mongodb", "snowflake", "clickhouse", "bigquery"] },
        { id: "multi-database-architecture", label: "Multi-Database Architecture", nodeType: "concept", conceptId: "multi-database-architecture", importance: "high", relatedIds: ["decision-framework", "redis", "elasticsearch"] },
        { id: "database-cost-optimization", label: "Database Cost Optimization", nodeType: "concept", conceptId: "database-cost-optimization", importance: "medium", relatedIds: ["snowflake", "bigquery", "dynamodb"] },
      ],
    },
  ],
};

// ─── Last Hour Summary ───────────────────────────────────────────────────────

const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "OLTP (row-stored, ACID, write-optimized) and OLAP (columnar, scan-optimized, batch) are fundamentally different workloads — never run analytical queries against your production OLTP database",
    "PostgreSQL is the correct default for nearly every application under 1TB. With proper indexing, partitioning, and connection pooling, it handles far more than most engineers expect",
    "MongoDB shines for polymorphic data and rapid iteration but becomes painful when you need joins or complex transactions — choose it deliberately, not by default",
    "For sub-second analytics on 1B+ rows, ClickHouse is unmatched in raw query speed. For enterprise BI with managed infrastructure, Snowflake. For serverless analytics on GCP, BigQuery",
    "Redis is not just a cache — sorted sets for leaderboards, streams for event processing, pub/sub for real-time features. But always have a persistent primary database behind it",
    "DynamoDB scales infinitely but demands single-table design discipline. If you do not model your access patterns upfront, you will pay dearly in GSI costs and scan operations",
    "The decision framework: <10GB use PostgreSQL, <1TB with complex queries still PostgreSQL with indexes, 1TB+ analytics use ClickHouse/BigQuery/Snowflake, full-text search add Elasticsearch, key-value at scale use DynamoDB, caching use Redis",
  ],
  mustKnowConcepts: [
    { name: "OLTP vs OLAP", oneLiner: "Row-stored transactional databases vs columnar analytical databases — different engines for different workloads" },
    { name: "PostgreSQL", oneLiner: "The Swiss Army knife: MVCC, JSONB, full-text search, partitioning, and every index type you need — the default choice for most applications" },
    { name: "MongoDB", oneLiner: "Document database that excels at polymorphic data and schema flexibility, but stumbles on joins and complex transactions" },
    { name: "Snowflake", oneLiner: "Separated storage/compute data warehouse with virtual warehouses, micro-partitions, and time travel — built for enterprise BI" },
    { name: "ClickHouse", oneLiner: "MergeTree-powered real-time OLAP engine that queries billions of rows in milliseconds — built for analytics dashboards and observability" },
    { name: "BigQuery", oneLiner: "Google serverless analytics with Dremel columnar engine, slot-based execution, and zero infrastructure management" },
    { name: "Decision Framework", oneLiner: "Match data size, access patterns, and consistency needs to the right engine — do not pick a database because it is trendy" },
  ],
  topTraps: [
    "Using MongoDB when your data has relationships and you need joins — you will end up reimplementing a relational database poorly in application code",
    "Running analytical queries on your OLTP database instead of offloading to a proper OLAP engine — this kills production performance",
    "Not using connection pooling (PgBouncer) with PostgreSQL — each connection costs ~10MB of RAM and you will exhaust connections under load",
    "Choosing Snowflake for real-time dashboards — Snowflake is optimized for batch analytics with seconds-level latency, not sub-second interactive queries",
    "Using Elasticsearch as your primary database — it is an inverted index optimized for search, not a system of record. Data loss on split-brain is a real risk",
  ],
};

// ─── Concepts ────────────────────────────────────────────────────────────────

const concepts: Concept[] = [
  // ── OLTP Fundamentals ──
  {
    id: "oltp-vs-olap",
    title: "OLTP vs OLAP",
    category: "oltp-fundamentals",
    basic:
      "OLTP (Online Transaction Processing) handles individual transactions — inserts, updates, deletes on specific rows. Think user signups, order placements, payment processing. OLAP (Online Analytical Processing) handles analytical queries — aggregations, scans, and joins across millions or billions of rows. Think revenue dashboards, cohort analysis, funnel reports. OLTP databases store data in rows (great for fetching a complete record). OLAP databases store data in columns (great for scanning a single field across all records).",
    expected:
      "OLTP databases are write-optimized with row-oriented storage (PostgreSQL, MySQL). They use B-tree indexes for point lookups, support ACID transactions, and are normalized (3NF) to avoid write anomalies. OLAP databases are read-optimized with columnar storage (Snowflake, BigQuery, ClickHouse). They use techniques like dictionary encoding, run-length encoding, and bitmap indexes for compression. OLAP schemas are denormalized (star/snowflake schema) to avoid expensive joins at query time. A critical architectural principle: never run OLAP queries against your OLTP database. Use CDC (Change Data Capture) or ETL pipelines to replicate data from OLTP to OLAP systems.",
    deep:
      "The row-vs-column distinction has deep implications for hardware utilization. Row stores load entire rows into CPU cache even when you only need one column — wasting memory bandwidth. Column stores load only the columns you query, achieving 10-100x compression ratios through type-specific encoding (delta encoding for timestamps, dictionary encoding for low-cardinality strings). Modern OLAP engines (ClickHouse, DuckDB) also leverage SIMD instructions to process columnar data in vectorized batches. The boundary between OLTP and OLAP is blurring: PostgreSQL with columnar extensions (Citus, Hydra) can handle moderate analytics, and HTAP databases (TiDB, CockroachDB, AlloyDB) attempt to serve both workloads. However, for serious scale (1B+ rows), dedicated OLAP engines still outperform HTAP systems by 10-100x.",
    interviewAnswer:
      "OLTP and OLAP serve fundamentally different workloads. OLTP is for transactional operations — fetching or modifying individual rows with low latency and ACID guarantees. It uses row-oriented storage and B-tree indexes. OLAP is for analytical queries — scanning and aggregating across millions of rows. It uses columnar storage with aggressive compression. The key architectural principle is to separate these workloads: run your application against an OLTP database (PostgreSQL), and replicate data via CDC or ETL to an OLAP engine (ClickHouse, Snowflake, BigQuery) for analytics. Running analytical queries against your production OLTP database is a common mistake that degrades application performance.",
    trap:
      "Thinking OLTP and OLAP are just about query types rather than storage engine fundamentals. The real difference is row-oriented vs columnar storage and the compression, vectorization, and scan optimizations that follow from that architectural choice.",
    memoryAnchor:
      "OLTP is a cashier ringing up one customer at a time (single-row transactions). OLAP is the manager in the back office reviewing all receipts from the entire year at once (columnar scans across millions of rows).",
  },
  {
    id: "acid-transactions",
    title: "ACID Transactions",
    category: "oltp-fundamentals",
    basic:
      "ACID stands for Atomicity (all-or-nothing), Consistency (data always valid per constraints), Isolation (concurrent transactions do not interfere), Durability (committed data survives crashes). Every relational database supports ACID. It is what makes operations like 'transfer $100 from account A to account B' safe — either both the debit and credit happen, or neither does.",
    expected:
      "Isolation levels are the practical knob you tune: READ UNCOMMITTED (dirty reads possible), READ COMMITTED (PostgreSQL default — sees only committed data), REPEATABLE READ (snapshot at transaction start — MySQL InnoDB default), SERIALIZABLE (full isolation, highest overhead). Most production systems use READ COMMITTED because SERIALIZABLE creates significant lock contention. PostgreSQL implements isolation via MVCC (Multi-Version Concurrency Control) — readers never block writers. MySQL InnoDB also uses MVCC but with a different undo log mechanism. In distributed systems, achieving ACID across multiple nodes requires two-phase commit (2PC) or consensus protocols (Raft/Paxos), which add latency.",
    deep:
      "The subtle trap with isolation levels: REPEATABLE READ in PostgreSQL and MySQL behave differently. PostgreSQL REPEATABLE READ provides true snapshot isolation — it prevents phantom reads. MySQL REPEATABLE READ uses next-key locking for some operations but still allows phantoms in certain edge cases. SERIALIZABLE in PostgreSQL uses Serializable Snapshot Isolation (SSI), which detects dependency cycles and aborts conflicting transactions — this is more performant than traditional lock-based serializability. In distributed databases (Spanner, CockroachDB), achieving external consistency requires synchronized clocks (TrueTime in Spanner) or hybrid logical clocks. The CAP theorem means distributed transactions involve trade-offs: Spanner chooses CP (consistent + partition-tolerant) and accepts higher write latency. DynamoDB chooses AP with eventual consistency by default but offers strongly consistent reads at 2x the cost.",
    interviewAnswer:
      "ACID guarantees that transactions are atomic, consistent, isolated, and durable. In practice, the most important knob is the isolation level. PostgreSQL defaults to READ COMMITTED, which is the right choice for most applications — it prevents dirty reads while avoiding the lock contention of SERIALIZABLE. PostgreSQL implements this via MVCC, where each transaction sees a snapshot of the data and readers never block writers. When I need stronger guarantees — for example, preventing lost updates in a booking system — I use SELECT FOR UPDATE or bump to SERIALIZABLE isolation. For distributed transactions across services, I avoid 2PC in favor of saga patterns with compensating transactions, because 2PC is a single point of failure.",
    trap:
      "Assuming SERIALIZABLE is always the safest choice. It is the most correct but also the most expensive — it dramatically reduces throughput under contention. Most production systems run READ COMMITTED and handle edge cases with explicit locking (SELECT FOR UPDATE) or optimistic concurrency control (version columns).",
    memoryAnchor:
      "ACID is a bank ATM: Atomic (you get all your cash or none), Consistent (your balance is always correct), Isolated (the person behind you can't see your transaction mid-swipe), Durable (even if the power dies, your withdrawal is recorded).",
  },
  {
    id: "row-vs-column-storage",
    title: "Row vs Column Storage",
    category: "oltp-fundamentals",
    basic:
      "Row-oriented storage (PostgreSQL, MySQL) stores all columns of a row together on disk. This is efficient for OLTP workloads where you frequently read or write entire rows. Column-oriented storage (ClickHouse, Parquet, BigQuery) stores all values of a single column together. This is efficient for analytical queries that scan a few columns across millions of rows, because the database reads only the columns it needs and achieves much better compression.",
    expected:
      "Column stores achieve 5-20x compression over row stores because values in a single column have the same data type and often similar values. Compression techniques include dictionary encoding (replacing repeated strings with integer IDs), run-length encoding (storing 'USA' x 1000000 as a single entry), delta encoding (storing timestamp differences), and bit-packing. Column stores also enable vectorized execution — processing a batch of values from one column through a CPU operation in a single SIMD instruction. The downside: column stores are terrible for point lookups and single-row writes because updating one row means touching every column file. This is why OLTP uses row stores and OLAP uses column stores.",
    deep:
      "Modern column stores use a hybrid approach. ClickHouse uses sparse primary indexes (one entry per ~8192 rows) rather than indexing every row, which keeps the index small enough to fit in memory even for trillion-row tables. Parquet files (used by Snowflake, BigQuery, Spark) organize data into row groups, and within each row group, data is stored columnar — this gives the benefits of columnar compression while still allowing row-group-level predicate pushdown. DuckDB brings columnar analytics into a single-process embedded database, making it possible to run OLAP queries on a laptop without a server. The PAX (Partition Attributes Across) storage model in some databases stores data columnar within each page but row-oriented across pages, attempting to get benefits of both.",
    interviewAnswer:
      "Row stores keep all columns of a row together, optimizing for point lookups and transactional writes. Column stores keep all values of a column together, optimizing for analytical scans and aggregations. The key advantage of column stores is compression — same-type values compress 5-20x better — and vectorized execution, where the CPU processes batches of column values in SIMD instructions. In system design, I use row stores (PostgreSQL) for the application layer and column stores (ClickHouse, BigQuery) for analytics. The rule is simple: if your query touches specific rows, use a row store; if it scans millions of rows across a few columns, use a column store.",
    trap:
      "Thinking column stores are universally faster. For a query like 'SELECT * FROM users WHERE id = 123', a row store with a B-tree index returns the answer in microseconds. A column store would need to read every column file and reassemble the row — orders of magnitude slower for point lookups.",
    memoryAnchor:
      "Row storage is a filing cabinet where each drawer holds one person's entire folder. Column storage is a spreadsheet taped to the wall — you can scan one column with your eyes instantly, but grabbing one person's full row means walking across the whole wall.",
  },
  // ── OLAP Fundamentals ──
  {
    id: "olap-columnar-storage",
    title: "Columnar Storage Internals",
    category: "olap-fundamentals",
    basic:
      "Columnar databases store data by column rather than by row. When an analytical query asks for 'average revenue by region,' the database reads only the revenue and region columns, skipping everything else. This reduces I/O by 10-100x compared to row stores that would read entire rows. Columnar data also compresses extremely well because adjacent values have the same type and often similar values.",
    expected:
      "Key columnar techniques: dictionary encoding replaces repeated strings with integer keys (a country column with 200 unique values becomes 1 byte per row instead of variable-length strings). Run-length encoding collapses consecutive identical values. Delta encoding stores differences between sorted values (timestamps become small integers). Bit-packing uses the minimum number of bits per value. These techniques stack — a 1TB raw dataset might compress to 50-100GB in a columnar format. Predicate pushdown and partition pruning further reduce data scanned: if a query filters on date, the engine skips all partitions outside that date range without reading them.",
    deep:
      "The Parquet file format (used by Snowflake, BigQuery, Spark, and many data lake tools) is the de facto standard for columnar storage. It organizes data into row groups (typically 128MB), and within each row group, columns are stored separately with per-column statistics (min, max, count, null count). These statistics enable min/max pruning — if a row group has max(date) = 2024-01-15 and your query filters date > 2024-02-01, the entire row group is skipped. ORC (Optimized Row Columnar) is an alternative format popular in the Hive ecosystem with similar principles but different implementation choices (stripe-level indexes, bloom filters). Zone maps in ClickHouse and Snowflake provide similar skip-scanning capabilities.",
    interviewAnswer:
      "Columnar storage is the foundation of every modern OLAP engine. It works by storing values of each column contiguously, which enables three key optimizations: massive compression through type-specific encoding (dictionary, run-length, delta), reduced I/O by reading only queried columns, and vectorized CPU execution on batches of same-type values. In practice, a 1TB dataset in row format might be 50-100GB in columnar format. Combined with partition pruning and zone maps, analytical queries scan only a fraction of the data. This is why ClickHouse can query billions of rows in milliseconds — it is not magic, it is columnar storage plus aggressive compression plus vectorized execution.",
    trap:
      "Assuming columnar compression ratios are guaranteed. Compression depends on data characteristics: high-cardinality columns (UUIDs, free-text) compress poorly compared to low-cardinality columns (country, status). Sorting data by low-cardinality columns before storage dramatically improves compression.",
    memoryAnchor:
      "Columnar storage is like sorting your closet by item type: all shirts together, all pants together. Need 'all blue items'? You only open the color drawer. Dictionary encoding is labeling hangers 1-5 instead of writing 'blue' a thousand times.",
  },
  {
    id: "star-snowflake-schema",
    title: "Star & Snowflake Schema",
    category: "olap-fundamentals",
    basic:
      "Star schema is the standard data warehouse design pattern. A central fact table (e.g., sales transactions) contains foreign keys to dimension tables (date, product, customer, store). The fact table holds metrics (revenue, quantity), and dimensions hold descriptive attributes. It is called a star because the diagram looks like a star with the fact table in the center. Snowflake schema normalizes the dimensions further (e.g., product -> category -> department), reducing redundancy but adding joins.",
    expected:
      "Star schemas are deliberately denormalized — dimensions contain redundant data to minimize joins. This is the opposite of OLTP normalization, and it is intentional. In OLAP, read performance matters more than storage efficiency. Fact tables are typically very large (billions of rows) and narrow (foreign keys + metrics). Dimension tables are small (thousands to millions of rows) and wide (many descriptive columns). Slowly Changing Dimensions (SCD) handle how dimension attributes change over time: Type 1 (overwrite), Type 2 (new row with version), Type 3 (add a column for previous value). Most data warehouses use Type 2 for critical dimensions like customer.",
    deep:
      "Modern cloud data warehouses have somewhat blurred the star/snowflake distinction. Snowflake (the product) and BigQuery can handle joins efficiently enough that strict star schema design is less critical than in legacy systems (Teradata, Oracle DW). However, the principles still matter: pre-joining data into wide denormalized tables (one-big-table or OBT approach) can significantly reduce query complexity and cost in pay-per-scan engines like BigQuery. The data vault modeling approach (hubs, links, satellites) is gaining popularity for raw data layer modeling because it handles schema evolution better than star schemas, with star schemas built as a semantic/presentation layer on top.",
    interviewAnswer:
      "Star schema is the standard OLAP modeling pattern: a central fact table with foreign keys to dimension tables. Facts hold metrics, dimensions hold descriptive attributes. It is deliberately denormalized to minimize joins and optimize read performance. I use star schemas for BI-facing data marts where query simplicity matters. For the raw/staging layer, I prefer a data vault approach because it handles schema evolution and source system changes more gracefully. The fact/dimension model is important because it determines how your BI tools (Looker, Tableau, Metabase) generate queries — a well-designed star schema means simpler, faster queries.",
    trap:
      "Over-normalizing your data warehouse into a snowflake schema to save storage. Storage is cheap; query performance and simplicity are expensive. In most cases, a star schema with denormalized dimensions is the better choice for OLAP workloads.",
    memoryAnchor:
      "Star schema is a sun with planets: the fat fact table is the sun (billions of sales rows), and dimension tables orbit around it (date, product, store). Snowflake schema is when those planets have their own moons (product -> category -> department) — more normalized, more joins, more headaches.",
  },
  // ── Relational Databases ──
  {
    id: "postgresql",
    title: "PostgreSQL",
    category: "relational-databases",
    basic:
      "PostgreSQL is the most capable open-source relational database available. It is the correct default for nearly any application. It supports ACID transactions, complex queries, JSONB for semi-structured data, full-text search, geospatial queries (PostGIS), and a rich set of index types. If your data fits on one machine (up to several TB with proper tuning), PostgreSQL handles it.",
    expected:
      "PostgreSQL uses MVCC (Multi-Version Concurrency Control) — every transaction sees a snapshot of the data, and readers never block writers. Dead tuples accumulate from updates/deletes and are cleaned up by autovacuum (tune autovacuum_vacuum_cost_delay and autovacuum_vacuum_scale_factor for large tables). The WAL (Write-Ahead Log) ensures durability — every change is written to WAL before the data file, enabling point-in-time recovery. TOAST (The Oversized-Attribute Storage Technique) automatically compresses and stores large values out-of-line. Index types: B-tree (default, for equality and range), Hash (equality only, rarely used), GIN (full-text search, JSONB, arrays), GiST (geospatial, range types), BRIN (block-range for naturally ordered data like timestamps — tiny index for huge tables). Use pg_stat_statements to identify slow queries, and PgBouncer for connection pooling.",
    deep:
      "PostgreSQL internals that matter at scale: the buffer pool (shared_buffers, typically 25% of RAM) caches frequently accessed pages. effective_cache_size tells the planner how much OS page cache to expect (typically 75% of RAM). work_mem controls per-operation sort/hash memory — set too low and sorts spill to disk, set too high and concurrent queries exhaust RAM. Parallel query execution (max_parallel_workers_per_gather) enables scanning large tables with multiple workers. Table partitioning (declarative since v10) is essential for tables over 100M rows — partition by date range for time-series data, by hash for even distribution. Logical replication enables zero-downtime schema migrations by replicating to a new table with the updated schema. pg_stat_user_tables shows dead tuple counts and last autovacuum time — if dead tuples are growing, autovacuum cannot keep up. For very high connection counts (1000+), PgBouncer in transaction mode is mandatory.",
    interviewAnswer:
      "PostgreSQL is my default database choice for almost every application. It handles OLTP workloads excellently with MVCC for concurrency, WAL for durability, and a rich set of index types (B-tree, GIN for JSONB/full-text, GiST for geospatial, BRIN for time-series). For performance at scale, the key levers are: proper indexing (use pg_stat_statements to find slow queries, EXPLAIN ANALYZE to understand plans), connection pooling with PgBouncer (each connection costs ~10MB RAM), autovacuum tuning for tables with high update rates, and declarative partitioning for tables over 100M rows. PostgreSQL comfortably handles single-digit TB with proper tuning. I only reach for other databases when I have a workload it cannot serve: sub-second analytics on billions of rows (ClickHouse), document flexibility without any joins (MongoDB), or key-value at massive scale (DynamoDB).",
    trap:
      "Not using connection pooling. PostgreSQL forks a new process per connection, each consuming ~10MB of RAM. Without PgBouncer, a spike to 500 connections means 5GB of RAM just for connections, and you hit max_connections limits. Always put PgBouncer in front of PostgreSQL in production.",
    memoryAnchor:
      "PostgreSQL is the Swiss Army knife you already own — it does JSONB, full-text search, geospatial, every index type. It is the Honda Civic of databases: boring, reliable, handles 95% of use cases, and you only need a Ferrari (ClickHouse) when you are literally racing.",
  },
  {
    id: "mysql",
    title: "MySQL",
    category: "relational-databases",
    basic:
      "MySQL is the worlds most popular open-source relational database, powering much of the web (Facebook, Uber, Shopify). The InnoDB storage engine (default since MySQL 5.5) provides ACID transactions, row-level locking, and MVCC. MySQL is simpler to operate than PostgreSQL but has fewer advanced features. It excels at read-heavy workloads with straightforward schemas.",
    expected:
      "MySQL InnoDB uses a clustered index — the primary key IS the table storage order. This means primary key lookups are extremely fast (no separate heap fetch), but choosing a poor primary key (like a UUID) causes random I/O and page splits. Use auto-increment integers or ULIDs for primary keys. Secondary indexes store the primary key value (not a row pointer), so wide primary keys bloat every secondary index. Replication: MySQL supports async replication (default), semi-sync (waits for at least one replica to acknowledge WAL receipt), and Group Replication (Paxos-based, similar to a mini-Raft cluster). Replication lag is a common production issue — reads from replicas may return stale data. The query cache was removed in MySQL 8.0 because it caused more contention than benefit.",
    deep:
      "InnoDB internals: the buffer pool (innodb_buffer_pool_size, set to 70-80% of RAM) is the most important tuning parameter. The redo log (innodb_redo_log_capacity in MySQL 8.0.30+) determines crash recovery time and write throughput — larger redo logs mean fewer checkpoints but longer recovery. The undo log stores old row versions for MVCC and can cause tablespace bloat under long-running transactions. MySQL REPEATABLE READ uses next-key locking to prevent phantom reads in most cases, but this also means more lock contention compared to PostgreSQL SSI. The InnoDB change buffer batches secondary index updates for non-unique indexes, improving write performance. MySQL limitations vs PostgreSQL: no partial indexes, no expression indexes (until 8.0 functional indexes), limited JSONB query capabilities, no GiST/GIN/BRIN indexes, no table inheritance, weaker CTE support historically.",
    interviewAnswer:
      "MySQL with InnoDB is a solid OLTP database that excels at read-heavy workloads with straightforward schemas. Its key architectural feature is the clustered index — the primary key determines physical row order, making PK lookups extremely fast. This means primary key choice is critical: always use auto-increment integers or ULIDs, never random UUIDs which cause page splits. For replication, I prefer semi-sync replication for data safety with Group Replication for automatic failover. The main watch-out is replication lag — I handle this by routing writes and their subsequent reads to the primary, or using semi-sync to ensure at least one replica is up to date. Compared to PostgreSQL, MySQL is simpler to operate but has fewer advanced features — no partial indexes, limited JSONB support, and weaker analytics capabilities.",
    trap:
      "Using random UUIDs as the primary key in MySQL InnoDB. Because InnoDB uses a clustered index, random UUIDs cause constant page splits and random I/O. Use auto-increment, UUIDv7 (time-sortable), or ULID instead.",
    memoryAnchor:
      "MySQL's clustered index is like a physical encyclopedia: the primary key IS the page order. Random UUIDs as PKs are like shuffling encyclopedia pages randomly — everything breaks. Auto-increment keeps the pages in order, just like volume numbers.",
  },
  {
    id: "indexing-strategies",
    title: "Indexing Strategies",
    category: "relational-databases",
    basic:
      "Indexes are data structures that speed up queries by avoiding full table scans. A B-tree index (the default in PostgreSQL and MySQL) maintains sorted data and supports equality, range queries, and ORDER BY efficiently. Without proper indexes, a query on a 100M row table scans every row. With the right index, it finds the answer in microseconds by traversing a tree of typically 3-4 levels deep.",
    expected:
      "Index types in PostgreSQL: B-tree for equality and range queries (WHERE status = 'active', WHERE created_at > '2024-01-01'). GIN (Generalized Inverted Index) for full-text search, JSONB containment (@>), and array overlap (&&). GiST (Generalized Search Tree) for geospatial queries (PostGIS), range types, and nearest-neighbor searches. BRIN (Block Range INdex) for naturally ordered data like timestamps — stores min/max per block range, resulting in tiny indexes (MBs vs GBs for B-tree) on large time-series tables. Hash indexes for equality-only lookups (rarely better than B-tree in practice). Partial indexes (WHERE clause on the index) are incredibly powerful: CREATE INDEX idx_active_users ON users(email) WHERE deleted_at IS NULL — indexes only active users, making the index smaller and faster. Composite indexes follow the leftmost prefix rule: an index on (a, b, c) supports queries on (a), (a, b), and (a, b, c) but not (b) or (c) alone.",
    deep:
      "Index maintenance is as important as index creation. pg_stat_user_indexes shows index usage — drop unused indexes because they slow writes and waste space. Index bloat occurs when autovacuum cannot reclaim dead index entries; use pg_stat_user_tables to monitor and REINDEX CONCURRENTLY to rebuild without locking. Covering indexes (INCLUDE clause) store additional columns in the index leaf pages, enabling index-only scans that never touch the heap. Expression indexes (CREATE INDEX ON users(LOWER(email))) support queries on computed values. For write-heavy tables, each additional index slows INSERT/UPDATE/DELETE — benchmark the trade-off. In MySQL, covering indexes work through the clustered index: if all columns are in a secondary index, InnoDB can answer the query from the index alone (index-only scan). The query planner may choose not to use an index if it estimates a sequential scan is faster — this happens when the query returns a large fraction of the table (typically > 5-10%).",
    interviewAnswer:
      "Indexing strategy starts with understanding your query patterns. I use EXPLAIN ANALYZE to identify slow queries, then choose the right index type: B-tree for equality and range, GIN for JSONB and full-text search, BRIN for time-series data (tiny index, huge table). Partial indexes are one of PostgreSQL most powerful features — indexing only the rows that matter (e.g., only active users) keeps the index small and fast. Composite indexes follow the leftmost prefix rule, so I order columns by selectivity. Equally important is index maintenance: I monitor pg_stat_user_indexes for unused indexes, watch for index bloat, and REINDEX CONCURRENTLY when needed. Every index slows writes, so I do not add indexes speculatively — I add them when pg_stat_statements shows a query needs one.",
    trap:
      "Adding indexes for every possible query without measuring. Each index slows every write operation and consumes storage. Use pg_stat_statements to find actual slow queries, and pg_stat_user_indexes to find indexes that are never used. The optimal number of indexes is the minimum needed to keep your important queries fast.",
    memoryAnchor:
      "Indexes are like the index at the back of a textbook: B-tree is alphabetical (great for 'find chapter on Zebras'), GIN is the keyword index (find every page mentioning 'evolution'), BRIN is the table of contents (Chapter 1 is pages 1-50, Chapter 2 is 51-100). Each new index makes the book thicker and slower to update.",
  },
  {
    id: "connection-pooling",
    title: "Connection Pooling",
    category: "relational-databases",
    basic:
      "Connection pooling maintains a pool of pre-established database connections that are reused across application requests, rather than opening a new connection for each request. Opening a PostgreSQL connection takes 50-100ms and allocates ~10MB of RAM per backend process. With hundreds of application servers making requests, connection pooling prevents exhausting the database and eliminates connection overhead.",
    expected:
      "PgBouncer is the standard connection pooler for PostgreSQL. It operates in three modes: session (one-to-one mapping, least benefit), transaction (connection returned to pool after each transaction — the most common choice), and statement (connection returned after each statement — breaks multi-statement transactions). Transaction mode is the sweet spot: 20 PgBouncer connections can serve 1000+ application connections because most application time is spent doing non-database work. Key settings: default_pool_size (connections per user/database pair), max_client_conn (total client connections allowed), server_idle_timeout (how long idle server connections live). In serverless environments (Lambda, Cloud Functions), connection pooling is critical because each invocation might open a new connection — use RDS Proxy (AWS) or PgBouncer sidecar.",
    deep:
      "Transaction-mode PgBouncer has limitations: prepared statements do not work (the prepared statement is tied to a server connection that may change between uses), session-level settings (SET work_mem) are lost between transactions, LISTEN/NOTIFY does not work. Some ORMs use prepared statements aggressively (e.g., Rails, SQLAlchemy) — you may need to disable them or use session mode. Connection pool sizing follows Littles Law: pool_size = throughput * average_latency. If your app processes 100 queries/sec with 10ms average latency, you need 100 * 0.01 = 1 active connection. In practice, add headroom for variance. The PostgreSQL-native connection pooler pgbouncer alternative is now being worked on as a built-in feature. For MySQL, ProxySQL provides similar pooling plus query routing, read/write splitting, and query caching.",
    interviewAnswer:
      "Connection pooling is non-negotiable for any production PostgreSQL deployment. I use PgBouncer in transaction mode, which allows 20-30 database connections to serve thousands of application connections. The key insight is that applications spend most of their time doing non-database work (processing, network calls), so the database connection only needs to be held during the actual transaction. Pool sizing follows Littles Law: connections = throughput times latency. For serverless environments where each invocation might create a new connection, I use a managed pooler like RDS Proxy. The main gotcha with PgBouncer transaction mode is that prepared statements and session-level settings do not work — you need to configure your ORM accordingly.",
    trap:
      "Setting max_connections in PostgreSQL to a very high number (like 1000) instead of using a connection pooler. PostgreSQL performance degrades significantly beyond ~200 connections due to lock contention and memory pressure. The correct solution is PgBouncer in front with a lower max_connections (100-200) on the database.",
    memoryAnchor:
      "Connection pooling is a hotel lobby phone: 1000 guests share 20 phones because nobody talks all day. Without a pool, every guest gets a dedicated phone line — you run out of lines and the phone company (PostgreSQL) collapses at ~200 simultaneous calls.",
  },
  {
    id: "query-optimization",
    title: "Query Optimization",
    category: "relational-databases",
    basic:
      "Query optimization is the process of making database queries faster. The first tool is EXPLAIN ANALYZE, which shows the actual execution plan: which indexes were used, how many rows were scanned, where time was spent. Common fixes include adding indexes, rewriting queries to avoid sequential scans, and ensuring the query planner has accurate statistics (run ANALYZE on tables after bulk loads).",
    expected:
      "Key EXPLAIN ANALYZE patterns to watch for: Seq Scan on a large table (needs an index or query rewrite), Nested Loop with inner Seq Scan (missing index on the join column), Sort with external merge (work_mem too low, spilling to disk), Hash Join with large hash table (consider increasing work_mem). Statistics are crucial: PostgreSQL query planner relies on pg_statistic for row count estimates. If estimates are wildly off (estimated 100 rows, actual 1M rows), the planner chooses bad plans. Fix with ANALYZE or increase default_statistics_target for high-cardinality columns. Common query antipatterns: SELECT * (reads unnecessary columns, especially bad with TOAST), OR conditions that prevent index usage (rewrite as UNION ALL), functions on indexed columns (WHERE UPPER(email) = 'FOO' cannot use a B-tree index on email — use an expression index or citext), and NOT IN with NULLs (use NOT EXISTS instead).",
    deep:
      "Advanced optimization: CTEs in PostgreSQL 12+ are no longer optimization fences — the planner can inline them and push predicates down. However, if a CTE is referenced multiple times, it is materialized to avoid recomputation. JIT compilation (enabled by default for expensive queries) can speed up aggregations by 20-30% by generating native code for expression evaluation. Parallel query execution (max_parallel_workers_per_gather) helps with large sequential scans and aggregations but does not help with index lookups. For partition pruning, use WHERE clauses on the partition key and ensure constraint_exclusion is on. Use pg_stat_statements to find the top queries by total time (not just per-call time) — a query running 10ms but called 1M times/day consumes more resources than a 5s query running 10 times/day.",
    interviewAnswer:
      "My query optimization workflow starts with pg_stat_statements to identify the queries consuming the most total time — the product of call count and average duration. Then I use EXPLAIN ANALYZE on the top offenders to understand the execution plan. I look for sequential scans on large tables (add an index), sort spills to disk (increase work_mem), and row estimate mismatches (run ANALYZE). Common fixes: add partial or composite indexes, rewrite OR as UNION ALL, create expression indexes for function-based filters, and replace SELECT * with specific columns. For large tables, I partition by the most common filter column (usually a timestamp) so partition pruning skips irrelevant data. The goal is to minimize total resource consumption across all queries, not just optimize the single slowest query.",
    trap:
      "Optimizing individual query execution time without considering frequency. A query taking 500ms that runs 10 times a day is far less impactful than a 5ms query running 100,000 times a day. Always prioritize by total time (calls * mean_time) from pg_stat_statements.",
    memoryAnchor:
      "Query optimization is detective work: EXPLAIN ANALYZE is your magnifying glass, pg_stat_statements is your suspect lineup sorted by 'total damage done.' Fix the pickpocket stealing $1 from 100,000 people before the bank robber who hits once a year.",
  },
  // ── Document & NoSQL ──
  {
    id: "mongodb",
    title: "MongoDB",
    category: "document-databases",
    basic:
      "MongoDB is a document database that stores data as JSON-like documents (BSON). Each document can have a different structure, making it ideal for polymorphic data (e.g., a products collection where different product types have different attributes). It supports rich querying, secondary indexes, and aggregation pipelines. MongoDB excels when you need schema flexibility and rapid iteration, and when your data access patterns align with document-level operations.",
    expected:
      "MongoDB uses the WiredTiger storage engine (default since 3.2) with document-level locking, compression, and in-memory caching. Sharding is horizontal scaling by distributing data across shards based on a shard key — choosing the right shard key is the most critical MongoDB design decision. A bad shard key (like a monotonically increasing timestamp) creates hot shards. Good shard keys have high cardinality, distribute writes evenly, and support your query patterns. Replica sets provide high availability with automatic failover: one primary (handles writes), multiple secondaries (handle reads with eventual consistency). The aggregation pipeline ($match, $group, $lookup, $unwind) is powerful but $lookup (joins) performs poorly at scale because MongoDB is not designed for joins. Multi-document transactions (since 4.0) work but add latency and should be used sparingly — if you need transactions everywhere, use PostgreSQL.",
    deep:
      "WiredTiger internals: uses a cache (default 50% of RAM minus 1GB) with write-ahead logging. Compresses data with snappy (default) or zlib/zstd. The oplog is a capped collection that records all write operations for replication — oplog size determines how far behind a secondary can fall before needing a full resync. Change Streams (built on the oplog) provide real-time notifications of data changes — useful for event-driven architectures. Schema validation (JSON Schema) can enforce structure while maintaining flexibility. Atlas Search integrates Lucene-based full-text search directly into the aggregation pipeline, reducing the need for a separate Elasticsearch instance. MongoDB limitations to know: no foreign keys, no real joins (lookup is a hash join and slow at scale), aggregation pipeline memory limit (100MB default per stage), and transactions have a 16MB oplog entry limit.",
    interviewAnswer:
      "I choose MongoDB when I have polymorphic data that does not fit cleanly into a relational schema — for example, a product catalog where electronics, clothing, and food items have completely different attributes. The document model lets each document have its own structure while still supporting indexes and queries. However, I am deliberate about this choice. If my data has relationships that require joins, I use PostgreSQL. The most critical MongoDB design decision is the shard key — it must have high cardinality, distribute writes evenly, and align with query patterns. A bad shard key creates hot shards that cannot be rebalanced without downtime. I also design around the limitation of no efficient joins: I denormalize aggressively and accept some data duplication in exchange for single-document read performance.",
    trap:
      "Choosing MongoDB as a default database because it is popular or because the schema is not yet defined. An undefined schema means you have not yet understood your data model — that is a design problem, not a reason to choose a schemaless database. PostgreSQL with JSONB columns gives you schema flexibility when you need it while maintaining relational integrity for everything else.",
    memoryAnchor:
      "MongoDB is a junk drawer: toss anything in, every item can be shaped differently (documents). Great when your kitchen gadgets are genuinely all different shapes. Terrible when you realize you need to find all the forks (joins) — you end up dumping the whole drawer on the floor.",
  },
  {
    id: "dynamodb",
    title: "DynamoDB",
    category: "document-databases",
    basic:
      "DynamoDB is AWS fully managed NoSQL database designed for single-digit millisecond performance at any scale. It is a key-value and document database that requires you to design your data access patterns upfront. Every item is accessed by a partition key (hash key) and optionally a sort key. DynamoDB scales horizontally by distributing data across partitions based on the partition key hash.",
    expected:
      "Single-table design is the recommended DynamoDB pattern: instead of multiple tables, you put all entity types in one table and use generic attribute names (PK, SK) with prefixes (PK='USER#123', SK='ORDER#456'). This enables fetching related data in a single query. GSI (Global Secondary Index) provides an alternate partition key + sort key for different access patterns — each GSI is a full copy of the projected attributes. LSI (Local Secondary Index) provides alternate sort keys within the same partition key. Capacity modes: on-demand (pay per request, auto-scales, more expensive per request) vs provisioned (fixed throughput, cheaper at predictable workloads, risk of throttling). DynamoDB Streams captures item-level changes for event processing — similar to CDC, commonly used to trigger Lambda functions.",
    deep:
      "Partition internals: each partition handles up to 3000 RCU and 1000 WCU. Hot partitions (one partition key receiving disproportionate traffic) cause throttling even if total table capacity is available. Adaptive capacity (enabled by default) mitigates this by borrowing capacity from less-busy partitions, but severe hot keys still throttle. Write sharding (appending a random suffix to partition keys) distributes writes but complicates reads. Transaction support (TransactWriteItems) provides ACID across up to 100 items but at 2x the WCU cost. On-demand mode has a hidden gotcha: it scales based on previous peak — if traffic suddenly doubles beyond the previous peak, you get throttled for a few minutes. DAX (DynamoDB Accelerator) adds microsecond-latency caching in front of DynamoDB, useful for read-heavy workloads with hot keys. Pricing trap: scanning is extremely expensive because DynamoDB charges for all data read, not just matching items. Always use Query (with partition key), never Scan.",
    interviewAnswer:
      "I choose DynamoDB when I need a key-value or narrow-query database that scales infinitely with single-digit millisecond latency — typically for user sessions, gaming leaderboards, IoT device state, or high-throughput event ingestion. The critical requirement is designing access patterns upfront because DynamoDB does not support ad-hoc queries efficiently. I use single-table design with composite keys (PK='USER#123', SK='PROFILE' or SK='ORDER#2024-01-15') to colocate related data. GSIs provide secondary access patterns. The biggest mistakes I have seen: using Scan instead of Query (costs skyrocket), choosing a low-cardinality partition key (causes hot partitions), and not understanding that GSI storage is a full copy of projected attributes (doubles or triples storage cost).",
    trap:
      "Putting everything in DynamoDB because 'it scales' without understanding single-table design. If you use DynamoDB like a relational database with multiple tables and frequent scans, you get the worst of both worlds: no joins, no ad-hoc queries, and massive cost from scan operations. DynamoDB is only cost-effective when your access patterns are narrow and well-defined.",
    memoryAnchor:
      "DynamoDB is a vending machine: you must know exactly which button to press (partition key + sort key) and you get your item instantly. But if you ask 'show me everything on shelf 3' (scan), the machine charges you per item it looks at. Design your snack requests (access patterns) before you build the machine.",
  },
  {
    id: "redis",
    title: "Redis",
    category: "document-databases",
    basic:
      "Redis is an in-memory data store that is far more than a cache. It supports strings, hashes, lists, sets, sorted sets, streams, bitmaps, and HyperLogLog. Sorted sets are perfect for leaderboards and priority queues. Streams provide a Kafka-like append-only log. Pub/Sub enables real-time messaging. Redis achieves sub-millisecond latency because all data lives in memory.",
    expected:
      "Persistence modes: RDB (point-in-time snapshots at intervals) and AOF (Append-Only File — logs every write). RDB is faster to load but you lose data since the last snapshot. AOF is more durable but slower and produces larger files. The recommended approach is RDB + AOF together, with AOF configured as 'everysec' (fsync every second — at most 1 second of data loss). Redis Cluster shards data across multiple nodes using hash slots (16384 total). Each key is assigned to a slot via CRC16(key) mod 16384. Redis Sentinel provides high availability for non-clustered setups: monitors the primary, detects failure, and promotes a replica. Lua scripting executes atomic operations on the server side — useful for complex operations like distributed locks (Redlock pattern) or rate limiting (sliding window with sorted sets).",
    deep:
      "Memory management: Redis uses jemalloc by default. The maxmemory-policy determines what happens when memory is full: volatile-lru (evict keys with TTL using LRU), allkeys-lru (evict any key using LRU), volatile-ttl (evict keys with shortest TTL), noeviction (return errors on write). For caching, allkeys-lru is usually correct. Active defragmentation (activedefrag yes) combats memory fragmentation that can cause Redis to use 2x the expected memory. Redis 7.0 introduced Redis Functions (replacing Lua scripts with better library management) and multi-part AOF for faster rewrite. Key operational concerns: single-threaded command execution (one slow command blocks everything — avoid KEYS * and large O(N) operations in production), and fork-based persistence (RDB/AOF rewrite forks the process, which on large datasets can cause latency spikes due to copy-on-write memory pressure).",
    interviewAnswer:
      "Redis is my go-to for any workload that needs sub-millisecond latency: caching (obviously), but also session storage, rate limiting (sliding window with sorted sets), leaderboards (sorted sets with ZADD/ZRANGEBYSCORE), distributed locks (Redlock pattern), and real-time event processing (Redis Streams). I always deploy Redis with AOF persistence (everysec) plus RDB snapshots, and I never use Redis as the sole source of truth — it always sits in front of a durable primary database. Memory management is the key operational concern: I set maxmemory with an allkeys-lru eviction policy for caches, and monitor fragmentation ratio. The biggest gotcha is that Redis is single-threaded for command execution — one KEYS * command or a massive SMEMBERS on a set with millions of elements will block all other operations.",
    trap:
      "Using Redis as a primary database without a durable backing store. Redis persistence (RDB + AOF) reduces data loss risk but does not eliminate it — AOF everysec can lose up to one second of data, and catastrophic failures can corrupt both. Always design your system so Redis can be rebuilt from the primary database.",
    memoryAnchor:
      "Redis is a whiteboard in the office kitchen: blazing fast to read and write, supports lists and sorted rankings, but if someone accidentally erases it (crash), you need the filing cabinet (PostgreSQL) to reconstruct everything. Never let the whiteboard be the only copy.",
  },
  // ── Analytical Engines ──
  {
    id: "snowflake",
    title: "Snowflake",
    category: "analytical-engines",
    basic:
      "Snowflake is a cloud-native data warehouse that separates storage and compute. Data is stored in cloud object storage (S3/GCS/Azure Blob), and compute is provided by virtual warehouses (clusters of nodes) that can be independently scaled, paused, and resumed. You pay for storage (cheap) and compute (expensive, per-second billing). This separation means you can scale compute up for a heavy ETL job and then scale it back down without touching your data.",
    expected:
      "Virtual warehouses come in T-shirt sizes (XS to 6XL, each doubling the previous). Multi-cluster warehouses auto-scale by adding clusters for concurrent queries. Micro-partitions are the physical storage unit — 50-500MB compressed, automatically created by Snowflake (you do not partition manually like in PostgreSQL). Clustering keys (similar to a sort key) optimize micro-partition pruning for frequently filtered columns. Time Travel (up to 90 days on Enterprise) lets you query data as of any past point in time or undo accidental deletes — incredibly useful for recovering from mistakes. Zero-copy cloning creates instant copies of databases/schemas/tables for testing without duplicating storage. VARIANT data type stores semi-structured data (JSON, Avro, Parquet) natively with automatic schema detection and columnar optimization.",
    deep:
      "Cost optimization is the most important operational skill with Snowflake. Key strategies: auto-suspend warehouses after 1-5 minutes of inactivity, use multi-cluster warehouses with economy scaling for non-urgent workloads, avoid queuing by right-sizing warehouse for concurrency, use materialized views for repeated expensive queries. Query profile analysis shows which stages consume the most time — remote disk reads indicate data not in the local SSD cache (the warehouse needs to warm up). Result cache returns results instantly for identical queries within 24 hours. Snowpipe enables continuous micro-batch ingestion from cloud storage. The data sharing feature allows exposing live data to other Snowflake accounts without copying — used for data marketplace and cross-organization analytics. Snowflake is not ideal for sub-second interactive analytics (startup time for warehouses and query compilation add latency) — use ClickHouse or a pre-computed OLAP cube for that use case.",
    interviewAnswer:
      "Snowflake is my choice for enterprise data warehousing when the team needs managed infrastructure, BI tool integration, and governance features. Its separation of storage and compute is the key architecture — I can scale a warehouse to 4XL for a heavy ETL job and pause it when done, paying only for the seconds of compute used. Micro-partitions with clustering keys enable efficient pruning, and Time Travel provides a safety net for accidental data changes. I optimize costs by auto-suspending warehouses, using result caching, and right-sizing warehouses for their workload. The main limitation is latency — Snowflake queries have a minimum latency floor (200ms-1s for warehouse startup and query compilation), so it is not suitable for sub-second interactive dashboards. For that, I use ClickHouse or pre-aggregated materialized views.",
    trap:
      "Using Snowflake for real-time interactive dashboards that need sub-second response times. Snowflake is optimized for batch-oriented analytical queries with seconds-level latency. The warehouse startup time, query compilation, and remote storage access create a latency floor that makes it unsuitable for truly interactive real-time analytics. Use ClickHouse or pre-computed aggregations for that use case.",
    memoryAnchor:
      "Snowflake is a rental car company: storage is the parking lot (cheap), compute is the car (pay per second of driving), and you can rent a bigger car (4XL warehouse) for the weekend and return it Monday. Time Travel is the dashcam that lets you rewind to any moment in the last 90 days.",
  },
  {
    id: "bigquery",
    title: "BigQuery",
    category: "analytical-engines",
    basic:
      "BigQuery is Google Cloud serverless data warehouse. There is no infrastructure to manage — no clusters to size, no indexes to create, no vacuuming. You write SQL, BigQuery allocates resources, runs the query, and charges you for data scanned (on-demand) or reserved compute slots (flat-rate). It uses the Dremel columnar engine which can scan petabytes of data in seconds by distributing work across thousands of nodes.",
    expected:
      "Pricing models: on-demand charges per TB scanned ($6.25/TB as of late 2024 — always verify current pricing), which makes it critical to minimize data scanned through partitioning (by date, integer range, or ingestion time) and clustering (sorts data within partitions by up to 4 columns). Flat-rate pricing reserves compute slots (starting at 100 slots) for predictable costs. Materialized views automatically refresh and are used transparently by the query optimizer. BI Engine is an in-memory acceleration layer for sub-second dashboard queries on datasets under 200GB. Streaming inserts provide real-time data ingestion at higher cost vs batch loads (free via Storage Write API). BigQuery ML lets you train ML models directly in SQL — useful for quick experimentation but not production ML. External tables can query data in GCS, Drive, or Bigtable without loading it.",
    deep:
      "BigQuery execution internals: Dremel decomposes a SQL query into a tree of execution stages, distributes leaf stages across thousands of workers, and aggregates results up the tree. Shuffle (data redistribution between stages) is the most expensive operation — queries that require shuffling large amounts of data (DISTINCT on high-cardinality columns, large JOINs without co-partitioning) are slow and expensive. Slot-based execution means your query performance depends on how many slots are allocated — during peak times on shared on-demand pools, queries may be slower. Partitioned tables with require_partition_filter = true force users to include a partition filter, preventing accidental full-table scans. INFORMATION_SCHEMA views provide query history, jobs metadata, and slot utilization — essential for cost monitoring. BigQuery Omni extends BigQuery to AWS and Azure data without moving it. Cost trap: SELECT * on a 10TB table costs $62.50 in on-demand mode — always preview with SELECT specific_columns and use partitioning.",
    interviewAnswer:
      "BigQuery is my choice when I need serverless analytics, especially on GCP. Zero infrastructure management is the killer feature — no clusters to size, no indexes to maintain, no vacuuming. I optimize costs through three mechanisms: partitioning (by timestamp for time-series data), clustering (sorts data within partitions for efficient pruning), and selecting only needed columns (columnar storage means selecting 3 columns out of 100 reads 3% of the data). For predictable workloads, I use flat-rate slot reservations instead of on-demand per-TB pricing. BI Engine provides sub-second caching for dashboard queries. The main trade-off vs Snowflake is ecosystem: BigQuery is deeply integrated with GCP (Dataflow, Pub/Sub, Vertex AI), while Snowflake is cloud-agnostic. Vs ClickHouse, BigQuery trades raw query speed for zero operational overhead.",
    trap:
      "Running SELECT * queries on large BigQuery tables with on-demand pricing. BigQuery charges per byte scanned, and columnar storage means selecting specific columns reads dramatically less data. A SELECT * on a 10TB table costs over $60 per query. Always select only the columns you need and partition your tables.",
    memoryAnchor:
      "BigQuery is an all-you-can-eat buffet that charges by the plate weight: zero kitchen staff to manage (serverless), but SELECT * loads your plate with the entire buffet and costs $60. Pick only the columns you need. Partitioning is putting foods in separate rooms so you only enter the one you want.",
  },
  {
    id: "clickhouse",
    title: "ClickHouse",
    category: "analytical-engines",
    basic:
      "ClickHouse is an open-source columnar OLAP database built for real-time analytics on massive datasets. It can query billions of rows in milliseconds on modest hardware. Originally built by Yandex for web analytics (Yandex.Metrica processes 20+ billion events per day on ClickHouse). If you need sub-second analytics on 100M+ rows — dashboards, observability, event analytics — ClickHouse is likely your best option.",
    expected:
      "The MergeTree engine family is the core: MergeTree (base engine, sorted by primary key, supports TTL for automatic data expiration), ReplacingMergeTree (deduplicates by primary key during merges — eventual, not immediate), AggregatingMergeTree (pre-aggregates data during merges using aggregate function states). The primary key in ClickHouse is a sparse index — it stores one entry per granule (8192 rows by default), not per row. This means the primary key index fits in memory even for trillion-row tables. Materialized views in ClickHouse are incremental — they process only new inserts, not the entire table, making them ideal for pre-aggregating high-volume event streams. Data is inserted in batches (not single rows) — ClickHouse creates a new data part per insert, and too many small inserts cause the 'too many parts' error. Buffer tables or async insert mode solve this.",
    deep:
      "ClickHouse achieves its speed through: columnar storage with LZ4/ZSTD compression (10-30x compression ratios), vectorized query execution (processes data in batches using SIMD), primary key based granule skipping (sparse index), and aggressive parallel execution across cores. The merge process is background: data parts are periodically merged into larger sorted parts, applying deduplication (ReplacingMergeTree) or aggregation (AggregatingMergeTree) during the merge. This means queries on ReplacingMergeTree may see duplicates until the next merge — use FINAL keyword to force deduplication at query time (slower). Projections (since v21.6) are like automatic materialized views stored within the table — the query optimizer transparently uses a projection if it matches the query better than the primary sort order. Distributed tables span multiple shards, with each shard being a ReplicatedMergeTree for HA. ClickHouse Keeper (ZooKeeper replacement) coordinates replication. For real-time dashboards, the pattern is: ingest events via Kafka engine -> materialized view aggregates into AggregatingMergeTree -> dashboard queries the aggregate table.",
    interviewAnswer:
      "ClickHouse is my choice for real-time analytics on massive datasets — observability platforms, event analytics, ad-tech dashboards — anywhere I need sub-second queries on billions of rows. The MergeTree engine with sparse indexing is the key: it stores one index entry per 8192 rows, keeping the index small enough to fit in memory even at trillion-row scale. Materialized views are incremental (process only new inserts), which lets me pre-aggregate high-volume event streams in real-time. I use AggregatingMergeTree for pre-computed rollups and ReplacingMergeTree when I need eventual deduplication. The critical operational requirement is batch inserts — ClickHouse creates a data part per insert, so single-row inserts cause 'too many parts' errors. I batch inserts (at least 1000 rows) or use the Kafka engine for streaming ingestion. Compared to Snowflake/BigQuery, ClickHouse gives me 10-100x better latency but requires more operational work.",
    trap:
      "Inserting data one row at a time into ClickHouse. ClickHouse creates a new data part for each INSERT, and having too many parts causes degraded performance and eventually errors. Always batch inserts (ideally 10,000+ rows per insert) or use Buffer tables / async insert mode for high-frequency writes.",
    memoryAnchor:
      "ClickHouse is a Formula 1 car for analytics: insanely fast on the track (queries billions of rows in milliseconds), but you must fuel it in bulk (batch inserts). Dripping fuel one drop at a time (single-row inserts) clogs the engine with 'too many parts.' The MergeTree is its turbo engine that keeps merging and sorting data parts in the background.",
  },
  // ── Time-Series & Search ──
  {
    id: "timescaledb-influxdb",
    title: "TimescaleDB & InfluxDB",
    category: "time-series-search",
    basic:
      "Time-series databases are optimized for data that is timestamped and primarily appended (metrics, IoT sensor data, financial ticks). TimescaleDB is a PostgreSQL extension that adds automatic time-based partitioning (hypertables), compression, and continuous aggregates. InfluxDB is a purpose-built time-series database with its own query language (Flux) and TSM storage engine optimized for time-series compression and high-cardinality data.",
    expected:
      "TimescaleDB hypertables automatically partition data by time (and optionally by a space dimension like device_id). Continuous aggregates are materialized views that incrementally maintain rolled-up data (e.g., 1-minute averages from raw second-level data). Compression converts chunks from row to columnar format with 20-40x compression. The advantage of TimescaleDB is that it is PostgreSQL — all your existing SQL knowledge, tools, and extensions work. InfluxDB uses a TSM (Time Structured Merge Tree) engine optimized for time-series writes. Its line protocol is efficient for high-volume ingestion. InfluxDB 3.0 (IOx) switched to Apache Arrow and Parquet, moving toward a columnar architecture. For most teams, TimescaleDB (PostgreSQL-based) is the pragmatic choice because it avoids adding a new database to your stack.",
    deep:
      "ClickHouse vs TimescaleDB vs InfluxDB for time-series: ClickHouse wins on raw query speed for analytical queries on time-series data (dashboards, aggregations over millions of time points), but it is not a drop-in PostgreSQL replacement. TimescaleDB wins on PostgreSQL compatibility and operational simplicity — if you already run PostgreSQL, adding TimescaleDB is one extension. InfluxDB wins on purpose-built ingestion throughput for IoT/metrics use cases with millions of unique series. For most application metrics and observability use cases, ClickHouse has become the standard (used by Grafana Cloud, Cloudflare, and many observability platforms). For IoT with millions of devices, InfluxDB purpose-built cardinality handling is valuable. For moderate time-series within an existing PostgreSQL setup, TimescaleDB avoids operational complexity.",
    interviewAnswer:
      "For time-series workloads, my choice depends on scale and existing infrastructure. If I already run PostgreSQL and the time-series data is moderate (up to hundreds of billions of rows), TimescaleDB is the pragmatic choice — it is a PostgreSQL extension, so all existing tooling works. It provides hypertables for automatic partitioning, compression for 20-40x storage reduction, and continuous aggregates for real-time rollups. For analytical dashboards on time-series data at massive scale, I use ClickHouse — it outperforms dedicated time-series databases on analytical queries. InfluxDB is my choice only for IoT-specific workloads with millions of unique series where its purpose-built cardinality handling matters. The general principle: avoid adding a new database to your stack unless the existing options cannot handle the workload.",
    trap:
      "Adding a dedicated time-series database when PostgreSQL with proper partitioning (or the TimescaleDB extension) would suffice. Every new database in your stack adds operational overhead — monitoring, backups, failover, on-call expertise. Only add a specialized database when the scale truly demands it.",
    memoryAnchor:
      "Time-series data is like a river of thermometer readings: always flowing forward, rarely edited. TimescaleDB is adding a time-sorting conveyor belt to your existing PostgreSQL factory. InfluxDB is building a whole new factory just for thermometers. Only build the new factory if the conveyor belt can't keep up.",
  },
  {
    id: "elasticsearch",
    title: "Elasticsearch",
    category: "time-series-search",
    basic:
      "Elasticsearch is a distributed search and analytics engine built on Apache Lucene. It uses an inverted index to provide fast full-text search: given a search term, it instantly finds all documents containing that term. Elasticsearch excels at full-text search (product search, site search), log aggregation (ELK stack), and any workload that requires relevance-ranked text search.",
    expected:
      "The inverted index maps every unique term to the list of documents containing it. When you search for 'blue running shoes,' Elasticsearch looks up 'blue,' 'running,' and 'shoes' in the index and intersects the results. BM25 scoring ranks results by relevance (term frequency, inverse document frequency, field length). Analyzers control text processing: tokenization (splitting text into terms), lowercasing, stemming (running -> run), and stop word removal. Mapping types define field data types — text fields are analyzed for full-text search, keyword fields are exact-match only. Index settings (number_of_shards, number_of_replicas) are set at creation and shards cannot be changed later (you must reindex). An Elasticsearch cluster distributes shards across nodes with primary/replica shard allocation for HA.",
    deep:
      "Elasticsearch operational concerns: shard sizing (target 10-50GB per shard, avoid thousands of tiny shards), JVM heap (set to 50% of RAM but never more than 31GB to stay in compressed oops), and the split-brain problem (use a minimum of 3 master-eligible nodes with discovery.zen.minimum_master_nodes set to quorum). Hot-warm-cold architecture uses index lifecycle management (ILM) to move older indices to cheaper storage tiers. Elasticsearch is NOT a good primary database: it sacrifices consistency for performance (documents are eventually consistent after refresh_interval, default 1 second), it does not support transactions, and data can be lost during split-brain scenarios. Always use it as a secondary index alongside a primary database (PostgreSQL as source of truth, Elasticsearch for search). OpenSearch is the AWS fork after Elastic changed its license — functionally similar for most use cases.",
    interviewAnswer:
      "I use Elasticsearch for two primary use cases: full-text search and log aggregation. For search, the inverted index with BM25 scoring provides relevance-ranked results that relational databases cannot match. For log aggregation, the ELK stack (Elasticsearch, Logstash, Kibana) or its modern alternatives (Loki for logs, but Elasticsearch for structured log analytics) handle high-volume ingestion and fast searching across billions of log entries. Critically, I never use Elasticsearch as a primary database. It is an inverted index optimized for search, not a system of record. It is eventually consistent (default 1-second refresh interval), does not support transactions, and can lose data during split-brain. My architecture is always: primary database (PostgreSQL) -> CDC or event pipeline -> Elasticsearch index. If the index gets corrupted, I rebuild it from the source of truth.",
    trap:
      "Using Elasticsearch as your primary database. Elasticsearch is optimized for search, not for being a system of record. It is eventually consistent, does not support transactions, and data loss during split-brain scenarios is a real risk. Always maintain a separate source of truth (PostgreSQL, DynamoDB) and treat Elasticsearch as a derived index that can be rebuilt.",
    memoryAnchor:
      "Elasticsearch is the index at the back of every book in a library: you say 'blue shoes' and it instantly points to every book and page mentioning them (inverted index). But it is NOT the books themselves — never use the index as your only copy. If the index gets torn, you rebuild it from the actual books (PostgreSQL).",
  },
  // ── Data Modeling & Design ──
  {
    id: "data-modeling-normalization",
    title: "Normalization vs Denormalization",
    category: "data-modeling",
    basic:
      "Normalization (3NF) eliminates data redundancy by splitting data into related tables. Each fact is stored once, reducing inconsistencies. Denormalization intentionally duplicates data to avoid joins and speed up reads. OLTP systems are typically normalized (minimize write anomalies). OLAP systems are typically denormalized (minimize join overhead at query time). The choice depends on whether your workload is write-heavy (normalize) or read-heavy with known query patterns (denormalize).",
    expected:
      "Normalization forms: 1NF (atomic values, no repeating groups), 2NF (no partial dependencies on composite keys), 3NF (no transitive dependencies — every non-key column depends only on the primary key). Most production systems aim for 3NF. Beyond 3NF (BCNF, 4NF, 5NF) is rarely practical. Denormalization strategies: embed related data (store user name in the orders table), pre-compute aggregates (store order_count on the user record), materialize views (create a wide table from joins). The cost of denormalization: data redundancy means updates must propagate to all copies (update a username and you must update it in orders too). Denormalization works well when: reads vastly outnumber writes, query patterns are known and stable, and eventual consistency of denormalized copies is acceptable.",
    deep:
      "In distributed databases, denormalization is often mandatory. DynamoDB single-table design is extreme denormalization — all entity types in one table with composite keys. MongoDB embedding is denormalization — store comments inside the blog post document. Cassandra requires denormalization because it does not support joins at all — you model tables around query patterns. The modern approach is often 'normalize at write, denormalize at read': store normalized data in PostgreSQL, and create denormalized views in ClickHouse, Elasticsearch, or Redis for specific read patterns. Change Data Capture (CDC) via Debezium or native logical replication keeps the denormalized copies in sync. This gives you the best of both worlds: consistency in the source of truth and performance in the read layer.",
    interviewAnswer:
      "My approach is to normalize the source of truth (PostgreSQL in 3NF) and denormalize for read performance where needed. The primary database stores each fact once, ensuring consistency. When specific read patterns need better performance — search, analytics, caching — I create denormalized representations in the appropriate engine (Elasticsearch for search, ClickHouse for analytics, Redis for caching) and keep them in sync via CDC or event streams. This avoids the classic denormalization trap: updating a user name and having to chase that update across 20 tables. The source of truth handles the update once, and downstream consumers get the change via events.",
    trap:
      "Denormalizing your primary database for read performance and then struggling with update anomalies when data changes need to propagate to multiple locations. Keep the primary database normalized and denormalize in secondary read stores that can be rebuilt from the source of truth.",
    memoryAnchor:
      "Normalization is storing your friend's phone number once in your contacts (single source of truth). Denormalization is writing it on sticky notes in every room (fast to find, nightmare to update when they change numbers). OLTP normalizes to avoid sticky-note chaos; OLAP denormalizes because it only reads, never updates.",
  },
  {
    id: "partitioning-strategies",
    title: "Partitioning Strategies",
    category: "data-modeling",
    basic:
      "Partitioning splits a large table into smaller physical pieces while maintaining a single logical table. This improves query performance (partition pruning skips irrelevant partitions), maintenance (vacuum, backup, drop individual partitions), and can distribute data across storage. PostgreSQL supports declarative partitioning since v10 with range, list, and hash partitioning. DynamoDB partitions automatically by partition key hash.",
    expected:
      "Range partitioning: split by date range (monthly partitions for time-series data). This is the most common strategy — queries with date filters prune irrelevant partitions instantly, and old data can be dropped by detaching the partition (instant, no DELETE needed). List partitioning: split by discrete values (partition per region, per tenant). Hash partitioning: distribute evenly by hash of a column — ensures equal partition sizes but does not support range queries on the partition key. Sub-partitioning (multi-level) combines strategies: partition by date range, then sub-partition by hash of tenant_id. Partition count matters: too few partitions means each is too large, too many means partition metadata overhead and query planner slowdown (PostgreSQL can struggle with 10,000+ partitions). Aim for partitions in the 1-50GB range.",
    deep:
      "PostgreSQL partitioning internals: partition pruning happens at plan time (static) and execution time (dynamic, for parameterized queries). For partition-wise joins, PostgreSQL can join individual matching partitions rather than the whole table, dramatically speeding up joins between co-partitioned tables. Partition-wise aggregation similarly pushes aggregations into individual partitions. When migrating a large table to partitioned: create the partitioned table, attach existing table as default partition, then incrementally move data to proper partitions. Alternatively, use logical replication to migrate with zero downtime. In DynamoDB, partitioning is automatic but understanding it is critical: each partition handles 3000 RCU / 1000 WCU. Burst capacity is limited, and hot partitions throttle. Kinesis and Kafka use partition-based ordering guarantees — messages within a partition are ordered, across partitions are not.",
    interviewAnswer:
      "I partition tables when they exceed 100M rows or when I need efficient data lifecycle management. My default strategy for time-series data is range partitioning by month — it enables partition pruning for date-filtered queries and instant data archival by detaching old partitions. For multi-tenant systems, I use list partitioning by tenant_id, which also enables per-tenant backups and enables future tenant isolation if needed. I aim for 1-50GB per partition and avoid going beyond a few hundred partitions to keep the query planner efficient. The key benefit beyond performance is operations: dropping a partition is instant (vs DELETE on millions of rows which is slow and generates dead tuples), and I can attach pre-loaded partitions for bulk imports without affecting online queries.",
    trap:
      "Creating too many partitions. PostgreSQL query planning slows down significantly with thousands of partitions. If you partition daily and retain 10 years of data, that is 3,650 partitions — consider monthly partitions (120) or weekly (520) instead. Also, queries without a partition key filter scan all partitions, which is worse than a single unpartitioned table.",
    memoryAnchor:
      "Partitioning is splitting a massive bookshelf into labeled sections: 'January 2024,' 'February 2024.' Need data from March? Skip straight to that section (partition pruning). Need to delete 2022? Pull out the whole shelf section in one move instead of removing books one by one.",
  },
  {
    id: "sharding-strategies",
    title: "Sharding Strategies",
    category: "data-modeling",
    basic:
      "Sharding distributes data across multiple database instances (shards), each holding a subset of the data. Unlike partitioning (which splits within a single instance), sharding splits across separate servers for horizontal scaling. Common strategies: hash-based (hash the shard key and modulo by shard count), range-based (shard by date or ID range), and directory-based (a lookup table maps keys to shards). Sharding adds significant complexity — only do it when a single instance truly cannot handle the load.",
    expected:
      "Shard key selection is the most critical decision. A good shard key has high cardinality (many unique values), distributes data and queries evenly, and aligns with your most common access pattern (queries should hit a single shard whenever possible). Cross-shard queries (joins across shards) are expensive and should be avoided by co-locating related data on the same shard. Cross-shard transactions require two-phase commit or saga patterns. Rebalancing (adding or removing shards) is painful with simple hash-based sharding because it requires moving data. Consistent hashing reduces data movement during rebalancing by only reassigning keys near the new node. MongoDB handles sharding natively with mongos routing and config servers. PostgreSQL sharding options include Citus (extension) or application-level sharding.",
    deep:
      "Sharding anti-patterns: sharding too early (single-instance PostgreSQL handles multi-TB with proper optimization), choosing a low-cardinality shard key (creates hot shards), and not planning for shard rebalancing. Vitess (used by YouTube, Slack, PlanetScale) provides MySQL sharding with a proxy layer that handles routing, resharding, and schema migrations. CockroachDB and TiDB provide automatic sharding with distributed SQL, avoiding the operational complexity of manual sharding at the cost of higher per-query latency. Application-level sharding (your code decides which shard to query) is the most flexible but puts the burden on the application — every query must include the shard key, every migration must run on every shard, and cross-shard operations require custom orchestration. Consider application-level sharding only when you have exhausted single-instance optimizations and your team has the expertise to maintain it.",
    interviewAnswer:
      "I treat sharding as a last resort after exhausting single-instance optimizations — vertical scaling, read replicas, better indexing, caching, and query optimization. When sharding is truly needed, the shard key is everything. I choose a key with high cardinality that aligns with the primary access pattern (usually tenant_id for SaaS, or user_id for consumer apps) so most queries hit a single shard. I use consistent hashing to minimize data movement when adding shards. For cross-shard queries (analytics, admin dashboards), I replicate data to an analytics database (ClickHouse, BigQuery) via CDC rather than running cross-shard queries. If starting fresh, I consider NewSQL databases (CockroachDB, TiDB) that provide automatic sharding with SQL compatibility, trading some per-query latency for operational simplicity.",
    trap:
      "Sharding prematurely. A properly tuned single PostgreSQL instance handles multiple terabytes. Sharding adds enormous complexity: cross-shard joins, distributed transactions, rebalancing, schema migrations across shards, and operational overhead. Exhaust all single-instance optimizations before considering sharding. Most startups that shard early regret it.",
    memoryAnchor:
      "Sharding is splitting a restaurant into separate kitchens: Kitchen A handles customers A-M, Kitchen B handles N-Z. Fast per-kitchen, but if a couple with last names 'Adams' and 'Zhang' want to share a meal (cross-shard join), a waiter has to run between buildings. Don't build two kitchens until one is truly full.",
  },
  {
    id: "schema-migrations",
    title: "Schema Migrations in Production",
    category: "data-modeling",
    basic:
      "Schema migrations change database structure (add columns, create indexes, modify types) on live production databases. The challenge is making changes without causing downtime. Tools like Flyway, Liquibase, Alembic (Python), and Rails ActiveRecord Migrations track and apply changes in order. Every migration should be forward-compatible — old application code should still work with the new schema during deployment.",
    expected:
      "Safe migration patterns for PostgreSQL: adding a column is safe (with DEFAULT, instant in PG 11+), adding an index must use CONCURRENTLY (otherwise it locks the table for the entire build time), renaming a column is dangerous (old code breaks — use aliases or column addition + backfill + code deploy + old column drop), changing a column type may rewrite the table (avoid on large tables — add a new column instead). NOT NULL constraints with DEFAULT are safe in PG 11+ (stored in catalog, not backfilled to every row). Backfill in batches (UPDATE ... WHERE id BETWEEN x AND y with pg_sleep between batches) to avoid long-running transactions and lock contention. Always test migrations on a copy of production data before running on production.",
    deep:
      "Zero-downtime migration strategy: expand-migrate-contract. Expand: add new columns/tables, deploy code that writes to both old and new, backfill historical data. Migrate: deploy code that reads from new. Contract: drop old columns/tables. This takes three deployments but guarantees no downtime. For large table restructuring, use pg_logical or Debezium to replicate data to a new table with the desired schema, then swap with a rename (requires brief lock). Ghost (GitHub open-source for MySQL) and pgroll (for PostgreSQL) automate online schema changes by creating a shadow table, copying data, capturing ongoing changes, and swapping. In MongoDB, schema migrations are technically optional (schemaless), but in practice you need a migration strategy for schema evolution — usually versioned documents with an application-level migration on read (lazy migration) or batch migration.",
    interviewAnswer:
      "My approach to production schema migrations follows the expand-migrate-contract pattern. First, I expand the schema (add new columns, create new indexes concurrently, deploy code that writes to both old and new). Then, I migrate (backfill historical data in batches, deploy code that reads from new). Finally, I contract (drop old columns once all code uses the new schema). For PostgreSQL, critical rules: always CREATE INDEX CONCURRENTLY (normal index creation locks the table), add columns with DEFAULT (instant in PG 11+), never rename columns in-place (add new, backfill, switch code, drop old), and backfill in small batches with pauses to avoid overwhelming the database. I test every migration on a production-sized copy before running it in production.",
    trap:
      "Running CREATE INDEX without CONCURRENTLY on a large production PostgreSQL table. This acquires a write lock on the entire table for the duration of the index build — which on a 100M row table could be minutes of complete write downtime. Always use CREATE INDEX CONCURRENTLY, even though it is slower and requires more disk space during construction.",
    memoryAnchor:
      "Schema migrations are surgery on a patient who must stay awake (zero downtime). Expand-migrate-contract: first attach the new organ alongside the old one, then reroute blood flow, then remove the old organ. CREATE INDEX CONCURRENTLY is using local anesthesia; without CONCURRENTLY, you knock the whole patient out (table lock).",
  },
  // ── Choosing the Right Database ──
  {
    id: "decision-framework",
    title: "Database Decision Framework",
    category: "choosing-databases",
    basic:
      "Choose your database based on data access patterns, not hype. If your data is under 10GB with any workload, PostgreSQL handles everything. Between 10GB and 1TB with complex queries, PostgreSQL with proper indexing and partitioning is still the answer. Need sub-second analytics on 1TB+ data, use ClickHouse (self-managed, fastest), BigQuery (serverless, GCP), or Snowflake (managed, multi-cloud). Need full-text search? Elasticsearch as a secondary index. Key-value at massive scale with known access patterns? DynamoDB. Caching and real-time features? Redis in front of your primary database.",
    expected:
      "The decision matrix expands by use case: SaaS application backend with complex queries -> PostgreSQL. E-commerce product catalog with polymorphic products -> MongoDB or PostgreSQL with JSONB. Analytics dashboard with 1B+ events/day -> ClickHouse for real-time, Snowflake for BI. User sessions and rate limiting -> Redis. IoT device telemetry with millions of devices -> TimescaleDB or InfluxDB. Full-text product search -> Elasticsearch backed by PostgreSQL. Multi-player game leaderboard -> Redis sorted sets. Event sourcing -> PostgreSQL (simple) or Kafka + ClickHouse (scale). Recommendations engine -> PostgreSQL for small scale, Redis for serving, dedicated ML pipeline for computation. Always consider team expertise — a PostgreSQL expert team will build a better system with PostgreSQL than a team learning DynamoDB on the fly.",
    deep:
      "Advanced considerations: total cost of ownership goes beyond license/hosting. Include operational overhead (monitoring, backups, failover, upgrades, on-call), developer productivity (how fast can you iterate?), and hiring (can you hire engineers who know this technology?). Vendor lock-in: DynamoDB locks you into AWS, BigQuery locks you into GCP, Snowflake is multi-cloud. PostgreSQL, MySQL, ClickHouse, and Redis are open-source and portable. The polyglot persistence pattern (multiple databases for different workloads) is powerful but each database adds operational tax. My rule: start with PostgreSQL + Redis. Add ClickHouse or BigQuery when analytics needs exceed PostgreSQL capabilities. Add Elasticsearch when you need relevance-ranked search. Add DynamoDB only for specific high-throughput key-value workloads. Never add a database just because an article said it is better for some theoretical workload.",
    interviewAnswer:
      "My decision framework is opinionated and practical. Default to PostgreSQL — it handles OLTP, moderate analytics, JSONB documents, full-text search, and geospatial queries in a single engine. Add Redis for caching, sessions, and real-time features. When analytics outgrows PostgreSQL, add ClickHouse for sub-second dashboards or Snowflake/BigQuery for enterprise BI. Add Elasticsearch when you need relevance-ranked text search. Add DynamoDB only for specific high-throughput key-value workloads where you have well-defined access patterns. Add MongoDB only when you have genuinely polymorphic data that does not fit a relational model. The key principle is minimizing database count: every database you add requires monitoring, backups, failover, version upgrades, and on-call expertise. Start simple, add complexity only when measured performance demands it.",
    trap:
      "Choosing a database because an influential blog post or conference talk recommended it for a workload you do not have. The right database is the simplest one that meets your actual requirements. PostgreSQL handles far more than most engineers realize — it should be your default until you have measured evidence that it cannot handle your specific workload.",
    memoryAnchor:
      "Choosing a database is like choosing a vehicle: PostgreSQL is the minivan (does everything, fits everyone). Only get a race car (ClickHouse) if you are racing, a forklift (DynamoDB) if you are moving pallets, or a search helicopter (Elasticsearch) if you need to scan from above. Start with the minivan.",
  },
  {
    id: "multi-database-architecture",
    title: "Multi-Database Architecture",
    category: "choosing-databases",
    basic:
      "Most production systems use multiple databases, each serving a specific purpose. A common pattern: PostgreSQL as the source of truth for transactional data, Redis for caching and sessions, Elasticsearch for search, and ClickHouse or BigQuery for analytics. The key is keeping these systems in sync — typically via Change Data Capture (CDC), event streams (Kafka), or application-level dual writes.",
    expected:
      "Synchronization approaches: CDC (Change Data Capture) via Debezium captures row-level changes from PostgreSQL WAL and streams them to Kafka, which feeds downstream systems (Elasticsearch, ClickHouse, Redis). This is the most reliable approach because it captures all changes including those made outside the application (migrations, manual fixes). Application-level dual writes (write to PostgreSQL and Elasticsearch in the same code path) are simpler but fragile — if the Elasticsearch write fails, data is inconsistent. Event sourcing (store events in Kafka, materialize views in various databases) is the most flexible but most complex. The outbox pattern (write to a database outbox table within the transaction, then asynchronously publish events) provides reliable event publishing without distributed transactions.",
    deep:
      "Eventual consistency between databases is the fundamental trade-off. When a user creates a product in PostgreSQL, the Elasticsearch search index is updated asynchronously — there is a window (typically milliseconds to seconds) where the product exists in the database but is not yet searchable. Design your UX around this: after creating a product, route the user to the product page (from PostgreSQL) rather than the search results page (from Elasticsearch). For critical consistency requirements (financial data), avoid multi-database architectures and keep everything in PostgreSQL. The CQRS (Command Query Responsibility Segregation) pattern formalizes this: commands (writes) go to the primary database, queries (reads) go to optimized read stores. This is powerful but adds complexity — only adopt CQRS when you have proven that a single database cannot serve both your write and read patterns.",
    interviewAnswer:
      "In multi-database architectures, I use CDC (Change Data Capture) via Debezium as the synchronization backbone. PostgreSQL WAL changes flow through Kafka to downstream systems — Elasticsearch for search, ClickHouse for analytics, Redis for caching. CDC is more reliable than application-level dual writes because it captures all changes regardless of origin. The key design principle is that PostgreSQL is the single source of truth, and all other databases are derived views that can be rebuilt from scratch. I design the UX to accommodate the eventual consistency window between databases — for example, after a write, I read from the primary database rather than from the search index. I only adopt CQRS when I have measured evidence that the read and write patterns cannot be served by a single database with read replicas.",
    trap:
      "Using application-level dual writes (write to both PostgreSQL and Elasticsearch in the same code path) instead of CDC. Dual writes are fragile: if the second write fails, data is inconsistent, and there is no automatic recovery. CDC via Debezium captures changes from the WAL and guarantees at-least-once delivery to downstream systems.",
    memoryAnchor:
      "Multi-database architecture is like a newsroom: PostgreSQL is the editor's master copy (source of truth), CDC (Debezium) is the wire service that broadcasts every edit, and downstream databases are different newspaper editions (Elasticsearch for search, ClickHouse for charts, Redis for the ticker). If any edition gets corrupted, reprint it from the master.",
  },
  {
    id: "database-cost-optimization",
    title: "Database Cost Optimization",
    category: "choosing-databases",
    basic:
      "Database costs are often the largest line item in cloud bills. The main cost drivers are compute (instance size, virtual warehouse time), storage (data volume, retention), I/O (reads/writes, data transfer), and licensing. Cost optimization starts with right-sizing: most databases are over-provisioned because engineers fear performance issues.",
    expected:
      "Snowflake costs: auto-suspend warehouses after 1-5 minutes (a 4XL warehouse running idle for 8 hours costs hundreds of dollars), use multi-cluster warehouses with economy scaling for non-urgent queries, leverage result caching to avoid recomputation. BigQuery costs: partition and cluster tables (reduces data scanned, directly reducing on-demand costs), avoid SELECT * (you pay per byte scanned), use flat-rate pricing for predictable workloads. DynamoDB costs: use on-demand mode for unpredictable workloads, provisioned with auto-scaling for predictable workloads, minimize GSI count (each GSI stores a copy of projected attributes), avoid Scan operations. PostgreSQL costs: right-size RDS instances (monitor CPU, memory, I/O), use read replicas for read-heavy workloads, consider Aurora for auto-scaling storage, use reserved instances for 1-3 year commitments (40-60% savings).",
    deep:
      "Advanced cost strategies: data tiering (move cold data to cheaper storage — Snowflake storage is much cheaper than compute, S3 Glacier for archive), TTL-based data expiration (ClickHouse TTL, DynamoDB TTL, PostgreSQL pg_partman with drop_partition), and compute scheduling (pause Snowflake warehouses during off-hours, scale down RDS instances on weekends). For ClickHouse, self-hosted on reserved instances is dramatically cheaper than cloud-managed alternatives for sustained workloads. Monitoring: track Snowflake credits per warehouse per query, BigQuery bytes scanned per query (INFORMATION_SCHEMA.JOBS), DynamoDB consumed capacity units, PostgreSQL query stats via pg_stat_statements. The biggest savings usually come from fixing inefficient queries (a single bad query scanning full tables can cost more than all other queries combined) rather than optimizing infrastructure.",
    interviewAnswer:
      "Database cost optimization follows a clear priority: fix inefficient queries first (a single full-table scan in BigQuery can cost more than a month of well-optimized queries), then right-size compute, then optimize storage. For Snowflake, I auto-suspend warehouses and use multi-cluster economy scaling. For BigQuery, I partition tables, cluster by common filter columns, and select only needed columns. For DynamoDB, I use Query instead of Scan, minimize GSIs, and enable TTL for expired data. For PostgreSQL on RDS, I use reserved instances and read replicas. The meta-principle is monitoring: you cannot optimize what you do not measure. I track per-query costs (BigQuery INFORMATION_SCHEMA, Snowflake query history, pg_stat_statements) and set alerts for anomalous spending.",
    trap:
      "Over-provisioning DynamoDB in provisioned mode with high WCU/RCU to avoid throttling, when on-demand mode would be cheaper for your actual usage pattern. Conversely, using on-demand mode for a steady, predictable workload when provisioned mode with auto-scaling would be 5-7x cheaper. Always model both pricing modes against your actual traffic patterns.",
    memoryAnchor:
      "Database cost optimization is like a utility bill audit: the biggest savings come from finding the one appliance left running 24/7 (bad query doing full-table scans), not from switching lightbulbs (instance sizing). Snowflake warehouses left on are space heaters running in summer — auto-suspend them.",
  },
  // ── Additional Critical Concepts ──
  {
    id: "replication-strategies",
    title: "Replication Strategies",
    category: "relational-databases",
    basic:
      "Replication copies data from a primary database to one or more replicas. It serves two purposes: high availability (if the primary fails, a replica takes over) and read scaling (distribute read queries across replicas). Synchronous replication waits for replicas to confirm before committing — safer but slower. Asynchronous replication commits immediately and sends changes to replicas in the background — faster but replicas may lag.",
    expected:
      "PostgreSQL streaming replication sends WAL records to replicas in real-time. Synchronous replication (synchronous_standby_names) guarantees zero data loss but adds write latency (round-trip to the fastest synchronous replica). Async replication is the default and sufficient for most read-scaling use cases, accepting that replicas may be milliseconds to seconds behind. Logical replication (PostgreSQL 10+) replicates specific tables and supports different schemas on publisher/subscriber — useful for zero-downtime migrations and selective replication. MySQL replication: async is default, semi-sync waits for at least one replica to acknowledge receipt of the binlog (but not apply it), Group Replication provides Paxos-based consensus for automatic failover.",
    deep:
      "Replication lag is the operational challenge. Causes: replica hardware slower than primary, long-running queries on the replica blocking WAL apply, heavy write load on the primary. Monitoring: pg_stat_replication shows replay_lag. Mitigations: dedicated replica hardware, hot_standby_feedback (prevents primary from vacuuming rows still needed by replica queries), and read-your-writes consistency (route reads to the primary immediately after a write, then to replicas after a delay). Multi-region replication introduces network latency — cross-region async replication is standard, cross-region sync replication is impractical for most workloads. CockroachDB and Spanner provide multi-region strong consistency but at significant latency cost for writes. For most applications, async replication with monitoring and read-your-writes routing is the practical choice.",
    interviewAnswer:
      "I use asynchronous streaming replication as the default for PostgreSQL — it provides read scaling and high availability with minimal write latency impact. For critical data (financial transactions), I enable synchronous replication to at least one replica to guarantee zero data loss on primary failure. The main operational concern is replication lag: I monitor pg_stat_replication, set up alerts when lag exceeds a threshold, and implement read-your-writes consistency in the application (route reads to the primary for a short window after a write). For zero-downtime schema migrations, logical replication is invaluable — I can replicate to a new table with the updated schema and switch over with minimal downtime.",
    trap:
      "Assuming replicas are always up to date. Replication lag means a read from a replica immediately after a write to the primary may not see the change. This causes confusing bugs: a user creates a record and then cannot see it. Always implement read-your-writes consistency — route reads to the primary for a short period after writes.",
    memoryAnchor:
      "Replication is a teacher writing on a whiteboard (primary) while TAs copy it onto whiteboards in other rooms (replicas). Sync replication: the teacher waits until at least one TA finishes copying before continuing. Async: the teacher keeps writing and TAs catch up at their own pace — students in other rooms might see yesterday's notes for a few seconds.",
  },
  {
    id: "cap-theorem-practical",
    title: "CAP Theorem in Practice",
    category: "data-modeling",
    basic:
      "The CAP theorem states that a distributed system can provide at most two of three guarantees: Consistency (every read receives the most recent write), Availability (every request receives a response), and Partition tolerance (the system continues to operate despite network partitions). Since network partitions are inevitable in distributed systems, the real choice is between consistency (CP) and availability (AP) during a partition.",
    expected:
      "In practice, CAP is not a binary choice — it is a spectrum. PostgreSQL with synchronous replication is CP: during a partition, the primary refuses writes if it cannot reach the synchronous replica. DynamoDB defaults to AP: during a partition, both sides continue accepting writes with eventual consistency reconciliation. However, DynamoDB also offers strongly consistent reads (CP behavior for reads) at 2x the cost. Cassandra lets you tune consistency per query: QUORUM reads/writes give you strong consistency at the cost of latency, ONE gives you availability. The PACELC theorem extends CAP: when there is no Partition, you still trade Latency for Consistency. Spanner and CockroachDB choose consistency even without partitions, paying a latency tax for distributed consensus on every write.",
    deep:
      "Real-world implications: most web applications should default to strong consistency (PostgreSQL) and only introduce eventual consistency for specific features that need it (like social media feed ranking, where showing a slightly stale feed is acceptable). The distributed systems that successfully use eventual consistency (DynamoDB, Cassandra) provide conflict resolution mechanisms: last-writer-wins (LWW), vector clocks, or application-level merge functions. CRDTs (Conflict-free Replicated Data Types) enable automatic conflict resolution for specific data structures (counters, sets, registers) without coordination. The key insight for interviews: do not treat CAP as a theoretical exercise. State which consistency model you need for each data access pattern and choose the database that provides it. A payment system needs strong consistency (PostgreSQL). A view counter can use eventual consistency (Redis, Cassandra).",
    interviewAnswer:
      "I apply CAP practically rather than theoretically. For each data access pattern, I decide: does this need strong consistency or is eventual consistency acceptable? Payment processing, inventory management, and user authentication need strong consistency — I use PostgreSQL. View counts, activity feeds, and recommendation scores can tolerate eventual consistency — I use Redis or DynamoDB. When using eventually consistent systems, I design for it explicitly: idempotent writes, read-your-writes routing to the primary, and conflict resolution strategies. The PACELC extension is more useful than pure CAP: even without partitions, there is always a latency-consistency trade-off in distributed systems.",
    trap:
      "Treating CAP theorem as a reason to avoid consistency. Some engineers use 'we need to be available' as justification for choosing eventually consistent databases when their use case actually requires strong consistency. A shopping cart that loses items or a bank account that shows the wrong balance is not acceptable availability — it is a bug. Default to strong consistency and relax it only when the business logic truly permits it.",
    memoryAnchor:
      "CAP theorem is a pizza delivery trilemma: Consistent (every branch has the exact same menu), Available (every branch always answers the phone), Partition-tolerant (branches keep working even if the phone line between them is cut). You can only guarantee two. Since phone lines DO get cut, you choose: same menu everywhere (CP) or always answer the phone (AP).",
  },
  {
    id: "multi-tenant-database",
    title: "Multi-Tenant Database Design",
    category: "data-modeling",
    basic:
      "Multi-tenant database design determines how to isolate customer data in a SaaS application. Three approaches: shared database with tenant_id column (cheapest, lowest isolation), shared database with schema-per-tenant (moderate isolation), and database-per-tenant (highest isolation, most expensive). Most SaaS applications start with the shared database approach and migrate to higher isolation as they grow.",
    expected:
      "Shared database with tenant_id: add tenant_id to every table, enforce it in every query via application middleware or Row Level Security (RLS). PostgreSQL RLS (CREATE POLICY) enforces tenant isolation at the database level — even if application code forgets the WHERE clause, the database filters by tenant. This is the most operationally simple approach. Schema-per-tenant: each tenant gets their own schema within the same database. Moderate isolation, schema migrations must run on every schema. Works well up to ~1000 tenants. Database-per-tenant: maximum isolation, simplest per-tenant management (backup, restore, migrate), but operationally expensive at scale (connection pooling across thousands of databases). Used for enterprise customers with compliance requirements (data residency, dedicated encryption keys).",
    deep:
      "Hybrid approach: shared database for small tenants (free, starter plans) with RLS, dedicated schemas for medium tenants, and dedicated databases for enterprise tenants requiring compliance isolation. This maps tenant tier to isolation level. Noisy neighbor problem: one tenant running expensive queries degrades performance for all tenants in a shared database. Mitigations: per-tenant query timeouts (statement_timeout per role), resource queues, or moving heavy tenants to dedicated resources. Connection pooling with multi-tenant: PgBouncer can pool connections across tenants in the shared-database model. For schema-per-tenant, ensure the pooler routes to the correct schema (SET search_path). For database-per-tenant, each database needs its own pool — this scales poorly beyond ~100 databases. Citus (PostgreSQL extension) provides transparent multi-tenant sharding: it distributes tables by tenant_id across nodes while maintaining the single-database SQL interface.",
    interviewAnswer:
      "I design multi-tenant databases starting with shared-database-with-RLS for most tenants and offering dedicated isolation for enterprise customers. PostgreSQL Row Level Security enforces tenant isolation at the database level, which is safer than relying on application code to add WHERE tenant_id = X to every query. For the noisy neighbor problem, I set per-tenant statement timeouts and monitor per-tenant query performance. As we grow, I use a hybrid model: small tenants share the database with RLS, medium tenants get dedicated schemas, and enterprise tenants (with compliance requirements) get dedicated databases. Citus extends this by distributing the shared database across nodes by tenant_id, providing horizontal scaling while maintaining the SQL interface. The key principle is starting simple (shared database) and adding isolation only when specific tenants require it.",
    trap:
      "Starting with database-per-tenant from day one when you have 5 customers. This approach is operationally expensive: each database needs monitoring, backups, connection pooling, and schema migration management. At 5 customers it seems manageable; at 5,000 it is a nightmare. Start with shared database plus RLS and migrate individual tenants to higher isolation when they need it.",
    memoryAnchor:
      "Multi-tenant design is an apartment building: shared database + RLS is everyone in one building with locked doors (cheapest, Row Level Security is the lock). Schema-per-tenant is separate floors with their own keys. Database-per-tenant is separate houses — maximum privacy, but you need a separate plumber, electrician, and security system for each one.",
  },
  {
    id: "database-observability",
    title: "Database Observability",
    category: "relational-databases",
    basic:
      "Database observability means monitoring the health, performance, and behavior of your database in production. Key metrics: query latency (p50, p95, p99), connection count, CPU and memory utilization, disk I/O, replication lag, cache hit ratio, dead tuple count, and slow query logs. Without observability, you are flying blind — performance issues are discovered by users, not engineers.",
    expected:
      "PostgreSQL observability stack: pg_stat_statements (query performance — total time, calls, mean time, rows), pg_stat_user_tables (seq scans, index scans, dead tuples, last autovacuum), pg_stat_user_indexes (index usage), pg_stat_activity (active queries, blocked queries, idle-in-transaction connections), pg_stat_replication (replication lag). Buffer cache hit ratio should be >99% (SELECT sum(heap_blks_hit) / sum(heap_blks_hit + heap_blks_read) FROM pg_statio_user_tables). Alert on: replication lag > 10 seconds, connection count approaching max_connections, cache hit ratio dropping, autovacuum not completing (dead tuples growing). For MySQL: SHOW ENGINE INNODB STATUS, performance_schema, slow query log. For DynamoDB: CloudWatch metrics for consumed capacity, throttled requests, system errors.",
    deep:
      "Advanced observability: auto_explain (PostgreSQL extension) logs execution plans for slow queries without manual EXPLAIN. pg_stat_kcache tracks actual disk I/O and CPU time per query. For lock analysis, pg_stat_activity combined with pg_locks shows blocked and blocking queries. Long-running idle-in-transaction connections are silent killers — they hold locks and prevent autovacuum. Set idle_in_transaction_session_timeout to auto-terminate them. Wait event analysis (pg_stat_activity.wait_event_type) reveals whether queries are waiting on I/O, locks, or CPU. Connection pool monitoring (PgBouncer SHOW STATS) tracks pool utilization, wait time, and query routing. Dashboards should show: top queries by total time (not just slow queries), index hit ratio trend, replication lag over time, autovacuum activity, and connection pool utilization.",
    interviewAnswer:
      "Database observability starts with pg_stat_statements — it tells me which queries consume the most total resources (calls times mean_time). I sort by total_time to find the queries worth optimizing. Beyond that, I monitor: buffer cache hit ratio (should be over 99%), replication lag, connection count vs max_connections, dead tuple growth (indicates autovacuum is not keeping up), and lock waits (pg_stat_activity with wait_event). I set alerts for: replication lag exceeding 10 seconds, connection utilization above 80%, cache hit ratio dropping below 99%, and idle-in-transaction connections exceeding a timeout. The key insight is proactive monitoring: by the time users report slowness, the database has been struggling for a while. Dashboards showing query performance trends catch degradation early.",
    trap:
      "Only monitoring average query latency instead of percentiles. An average of 5ms can hide the fact that p99 is 500ms — meaning 1 in 100 queries is 100x slower. Always monitor p50, p95, and p99 latency. Often the p99 reveals index problems or lock contention that the average conceals.",
    memoryAnchor:
      "Database observability is the dashboard on your car: pg_stat_statements is the speedometer (which queries are burning the most fuel), cache hit ratio is the temperature gauge (should be 99%+ or the engine is overheating), and replication lag is the 'check engine' light. By the time passengers (users) complain, the engine has been knocking for a while.",
  },
];

// ─── Interview Patterns ──────────────────────────────────────────────────────

const interviewPatterns: InterviewPattern[] = [
  {
    question: "When would you choose MongoDB over PostgreSQL?",
    answer:
      "I choose MongoDB when the data is genuinely polymorphic — different documents have fundamentally different structures that would require dozens of nullable columns or complex EAV patterns in a relational database. Classic examples: a product catalog where electronics, clothing, and food have completely different attributes, or a CMS where each content type has unique fields. MongoDB also shines for rapid prototyping when the schema is evolving daily. However, the moment I need joins between collections, complex transactions, or strong consistency guarantees, I stay with PostgreSQL. PostgreSQL JSONB columns give me document flexibility for individual fields while maintaining relational integrity for the rest of the schema.",
    whyAsked:
      "Tests whether the candidate understands the actual strengths and limitations of document databases vs relational databases, rather than defaulting to NoSQL because it is trendy.",
    trap:
      "Saying MongoDB is faster than PostgreSQL or that it scales better. A well-indexed PostgreSQL query outperforms a poorly-designed MongoDB query. And PostgreSQL with read replicas and partitioning scales further than most engineers realize.",
  },
  {
    question: "Explain the difference between OLTP and OLAP",
    answer:
      "OLTP handles transactional operations — individual row reads and writes with low latency and ACID guarantees. It uses row-oriented storage (PostgreSQL, MySQL) and B-tree indexes. OLAP handles analytical queries — scanning and aggregating millions or billions of rows. It uses columnar storage (ClickHouse, Snowflake, BigQuery) with compression and vectorized execution. The key architectural principle is workload separation: never run analytical queries against your production OLTP database. Use CDC or ETL to replicate data to a dedicated OLAP engine. Row stores optimize for 'give me this specific order' while column stores optimize for 'what was the average order value by region last quarter.' The storage format determines everything: row stores load entire rows (wasteful for analytics), column stores load only queried columns (wasteful for point lookups).",
    whyAsked:
      "Fundamental database knowledge that determines whether a candidate can make sound architectural decisions about data storage and processing.",
    trap:
      "Describing OLTP and OLAP as just different query types without explaining the storage engine differences (row vs column) that make each optimized for its workload.",
  },
  {
    question: "How would you design a database for an analytics dashboard with 1B+ events/day?",
    answer:
      "I would use ClickHouse as the primary analytics engine. The architecture: events flow from the application to Kafka, a ClickHouse Kafka engine table consumes them, and materialized views pre-aggregate into AggregatingMergeTree tables for common dashboard queries. Raw events go into a MergeTree table partitioned by date with TTL for automatic expiration (e.g., 90 days for raw data, 2 years for aggregates). The primary key (sparse index) should match the most common query pattern — typically (tenant_id, event_type, timestamp). For dashboard queries, pre-aggregated materialized views provide sub-second responses even on billions of rows. I batch inserts (10,000+ rows per insert) to avoid the too-many-parts problem. For the serving layer, the dashboard queries ClickHouse directly for ad-hoc analysis and reads from Redis-cached aggregates for the main dashboard view. If the team prefers managed infrastructure, BigQuery or Snowflake with pre-computed materialized views is the alternative, accepting higher query latency.",
    whyAsked:
      "Tests ability to design a real-time analytics pipeline with appropriate technology choices and understanding of scale constraints.",
    trap:
      "Suggesting PostgreSQL or MongoDB for 1B+ events/day analytics. Neither is designed for columnar analytical queries at this scale. Also, suggesting Snowflake for sub-second dashboard queries — Snowflake has a latency floor that makes it unsuitable for truly interactive dashboards.",
  },
  {
    question: "Compare Snowflake vs BigQuery vs ClickHouse",
    answer:
      "These serve different analytics niches. Snowflake: managed multi-cloud data warehouse with separated storage/compute, virtual warehouse scaling, Time Travel, zero-copy cloning. Best for enterprise BI teams using tools like Looker, Tableau, or dbt. Cost model is credit-based for compute. Latency floor of ~200ms-1s makes it batch-oriented. BigQuery: serverless on GCP with zero infrastructure management. Dremel engine scans petabytes. On-demand pricing charges per byte scanned, making column selection and partitioning critical for cost control. Best for GCP-native shops wanting zero ops. ClickHouse: open-source, self-managed (or ClickHouse Cloud), fastest raw query performance on analytical workloads. MergeTree sparse index and vectorized execution deliver sub-100ms queries on billions of rows. Best for real-time dashboards, observability, and teams comfortable with self-management. My rule: sub-second interactive dashboards -> ClickHouse. Enterprise BI with governance -> Snowflake. Serverless analytics on GCP -> BigQuery.",
    whyAsked:
      "Tests depth of knowledge across the modern analytics stack and ability to recommend the right tool for different scenarios.",
    trap:
      "Treating all three as interchangeable data warehouses. They have fundamentally different architectures and latency characteristics. ClickHouse is real-time OLAP, Snowflake is batch-oriented data warehousing, BigQuery is serverless analytics.",
  },
  {
    question: "When should you use Redis beyond caching?",
    answer:
      "Redis data structures enable use cases far beyond caching. Sorted sets: leaderboards (ZADD/ZRANGEBYSCORE), priority queues, rate limiting with sliding windows. Streams: event processing similar to Kafka for moderate throughput, with consumer groups for parallel processing. Pub/Sub: real-time notifications, chat messages, live updates. HyperLogLog: approximate unique counting (count unique visitors with 0.81% error using 12KB of memory). Bitmaps: feature flags, user activity tracking (was user X active on day Y). Lua scripting: atomic multi-step operations like distributed locks (Redlock) or sliding window rate limiters. Sets: social graph operations (mutual friends via SINTER). The key principle: Redis gives you sub-millisecond access to these data structures, but always back it with a durable primary database. Redis persistence (RDB + AOF) reduces data loss risk but does not eliminate it.",
    whyAsked:
      "Reveals whether the candidate understands Redis as a versatile data structure server or just thinks of it as a key-value cache.",
    trap:
      "Mentioning Redis use cases without acknowledging the durability limitation. Every Redis use case should account for the fact that Redis can lose data — either the data is reconstructible from the primary database, or the temporary loss is acceptable (like a leaderboard that can be rebuilt).",
  },
  {
    question: "How do you handle schema migrations in production?",
    answer:
      "I follow the expand-migrate-contract pattern for zero-downtime migrations. Expand: add new columns or tables without removing old ones. Deploy application code that writes to both old and new schema. Migrate: backfill historical data in batches (1000-10000 rows per batch with pg_sleep between batches to avoid overwhelming the database). Deploy code that reads from the new schema. Contract: once all code uses the new schema, drop old columns. Critical PostgreSQL rules: always CREATE INDEX CONCURRENTLY (non-concurrent index creation locks the table), adding columns with DEFAULT is instant in PG 11+ (no table rewrite), never rename columns in-place (add new, backfill, switch code, drop old). For large table restructuring, I use logical replication to a new table with the target schema and swap with a brief lock. I test every migration on a production-sized copy before deploying.",
    whyAsked:
      "Tests operational maturity and understanding of how schema changes impact running applications. A common source of production incidents.",
    trap:
      "Suggesting a maintenance window for schema migrations. Modern applications should handle schema changes with zero downtime. Also, forgetting CONCURRENTLY when creating indexes — this is the most common cause of migration-related outages.",
  },
  {
    question: "What happens when your PostgreSQL database becomes too slow?",
    answer:
      "I follow a systematic diagnostic workflow. First: identify the slow queries using pg_stat_statements sorted by total_time (not just per-call time). Second: EXPLAIN ANALYZE the top offenders — look for sequential scans on large tables (add an index), sort spills to disk (increase work_mem), and row estimate errors (run ANALYZE). Third: check for missing connection pooling (PgBouncer in transaction mode). Fourth: check autovacuum health — is it keeping up with dead tuples? Fifth: consider partitioning for tables over 100M rows. Sixth: add read replicas for read-heavy workloads. Seventh: if the workload is analytical queries on the transactional database, offload analytics to ClickHouse or BigQuery via CDC. I only consider sharding or migrating to a different database after exhausting all these optimizations. A single PostgreSQL instance with proper tuning handles multiple terabytes.",
    whyAsked:
      "Tests diagnostic methodology and whether the candidate jumps to sharding/rewriting or follows a systematic optimization approach.",
    trap:
      "Immediately suggesting migration to a NoSQL database or sharding. Most PostgreSQL performance problems are caused by missing indexes, unoptimized queries, lack of connection pooling, or autovacuum not keeping up — not by PostgreSQL being fundamentally too slow.",
  },
  {
    question: "Design a multi-tenant SaaS database architecture",
    answer:
      "I start with a shared PostgreSQL database using Row Level Security (RLS) for tenant isolation. Every table has a tenant_id column, and RLS policies enforce that each tenant can only see their own data — this is enforced at the database level, so even buggy application code cannot leak data. PgBouncer handles connection pooling in transaction mode. For the noisy neighbor problem, I set per-tenant statement timeouts and monitor per-tenant query patterns. As we grow, I adopt a hybrid model: most tenants share the database with RLS, medium-tier tenants may get dedicated schemas, and enterprise tenants with compliance requirements (data residency, dedicated encryption) get dedicated databases or dedicated Citus nodes. Citus distributes tables by tenant_id across nodes while maintaining the SQL interface. For analytics, I replicate tenant data via CDC to ClickHouse where dashboards query across all tenants. The key principle: start with the simplest isolation model that meets your compliance requirements and increase isolation per tenant as needed.",
    whyAsked:
      "Tests ability to design for multi-tenancy with appropriate isolation, performance, and operational trade-offs at different scales.",
    trap:
      "Starting with database-per-tenant for a startup with 10 customers. This is operationally expensive and unnecessary at small scale. Also, relying only on application-level tenant filtering (WHERE tenant_id = X) without database-level enforcement (RLS) — application bugs will leak data between tenants.",
  },
];

// ─── Common Mistakes ─────────────────────────────────────────────────────────

const commonMistakes: CommonMistake[] = [
  {
    wrong: "Using MongoDB when your data has complex relationships that require joins. You end up with $lookup pipelines that are slow and hard to maintain, or you denormalize excessively and struggle with update consistency.",
    correct: "Use PostgreSQL for relational data. If you need document flexibility for specific fields, use PostgreSQL JSONB columns. Reserve MongoDB for genuinely polymorphic data where different records have fundamentally different structures.",
  },
  {
    wrong: "Choosing Snowflake for real-time interactive dashboards that need sub-second response times. Snowflake virtual warehouse startup, query compilation, and remote storage access create a latency floor of 200ms-1s.",
    correct: "Use ClickHouse for sub-second interactive analytics. Use Snowflake for batch-oriented BI workloads where users expect 2-10 second query times. Pre-aggregate data into materialized views for the fastest dashboard experience.",
  },
  {
    wrong: "Using Elasticsearch as your primary database. It is eventually consistent (1-second refresh interval), does not support transactions, and can lose data during split-brain scenarios.",
    correct: "Use Elasticsearch as a secondary search index backed by a durable primary database (PostgreSQL). Sync data via CDC (Debezium) or event streams. If the index is corrupted, rebuild it from the source of truth.",
  },
  {
    wrong: "Not using connection pooling with PostgreSQL. Each connection forks a backend process consuming ~10MB of RAM. At 500 connections, that is 5GB just for connections, and performance degrades from lock contention.",
    correct: "Always deploy PgBouncer in transaction mode in front of PostgreSQL. 20-30 database connections can serve thousands of application connections. Set max_connections in PostgreSQL to 100-200, not 1000.",
  },
  {
    wrong: "Putting everything in DynamoDB because 'it scales infinitely' without understanding single-table design, access pattern modeling, and GSI costs. You end up with expensive Scan operations and multiple tables that cannot be joined.",
    correct: "Use DynamoDB only for specific high-throughput key-value workloads with well-defined access patterns. Model all access patterns upfront using single-table design. If you need ad-hoc queries or joins, use PostgreSQL.",
  },
  {
    wrong: "Not partitioning large PostgreSQL tables. A 500M row table without partitioning means full-table autovacuum runs take hours, index bloat grows uncontrolled, and dropping old data requires slow DELETE operations.",
    correct: "Partition tables over 100M rows. Use range partitioning by timestamp for time-series data. Benefits: partition pruning for queries, instant data archival by detaching partitions, and per-partition autovacuum. Aim for 1-50GB per partition.",
  },
  {
    wrong: "Using SELECT * in analytical queries on columnar stores (BigQuery, Snowflake, ClickHouse). Columnar storage stores each column separately — SELECT * reads every column, defeating the purpose of columnar storage.",
    correct: "Always select only the columns you need. In BigQuery with on-demand pricing, SELECT * on a 10TB table costs over $60 per query. Selecting 3 columns out of 100 reads only 3% of the data and costs proportionally less.",
  },
  {
    wrong: "Ignoring index maintenance — never checking for unused indexes, not monitoring index bloat, and adding new indexes without removing obsolete ones. Each unused index slows every write and wastes storage.",
    correct: "Regularly audit indexes using pg_stat_user_indexes (look for idx_scan = 0). Drop unused indexes. Monitor index bloat and REINDEX CONCURRENTLY when needed. Before adding a new index, check if an existing index can be extended.",
  },
  {
    wrong: "Running analytical queries directly against the production OLTP database. A complex aggregation query locks rows and consumes CPU, degrading performance for transactional operations.",
    correct: "Separate OLTP and OLAP workloads. Use read replicas for simple reporting queries. For complex analytics, replicate data via CDC to a dedicated OLAP engine (ClickHouse, BigQuery, Snowflake). Your production database should only handle transactional operations.",
  },
  {
    wrong: "Using random UUIDs as primary keys in MySQL InnoDB. InnoDB uses a clustered index — random UUIDs cause constant page splits, random I/O, and fragmented storage.",
    correct: "Use auto-increment integers, UUIDv7 (time-sortable), or ULID as primary keys in MySQL. In PostgreSQL, random UUIDs are acceptable because the heap is not clustered by primary key, though sequential IDs still provide better cache locality.",
  },
  {
    wrong: "Creating indexes on every column 'just in case.' Each index consumes storage, slows every INSERT/UPDATE/DELETE, and adds to autovacuum workload. Tables with 20+ indexes have significantly degraded write performance.",
    correct: "Create indexes based on actual query patterns identified through pg_stat_statements and EXPLAIN ANALYZE. Follow the rule: the minimum indexes needed to keep your important queries fast. A covering composite index often replaces multiple single-column indexes.",
  },
  {
    wrong: "Choosing a database because a blog post said it is the best for your general category of application, without evaluating your actual data size, access patterns, consistency requirements, and team expertise.",
    correct: "Evaluate databases against your specific requirements: data size, read/write ratio, query patterns, consistency needs, operational expertise on the team, and total cost of ownership. Default to PostgreSQL and add specialized databases only when measured performance demands it.",
  },
];

// ─── Practice Questions ──────────────────────────────────────────────────────

const practiceQuestions: PracticeQuestion[] = [
  {
    code: `-- PostgreSQL: This query runs on a 200M row orders table
SELECT customer_id, SUM(total_amount) as lifetime_value
FROM orders
WHERE created_at > '2024-01-01'
  AND status = 'completed'
GROUP BY customer_id
ORDER BY lifetime_value DESC
LIMIT 100;

-- Current execution: Seq Scan on orders, 45 seconds
-- Table has only a primary key index on (id)`,
    question: "How would you optimize this query to run in under 1 second?",
    answer:
      "Three optimizations in priority order. First, add a composite index: CREATE INDEX CONCURRENTLY idx_orders_status_created ON orders(status, created_at) INCLUDE (customer_id, total_amount). This enables an index-only scan — the INCLUDE clause adds the columns needed by SELECT/GROUP BY without making the index larger for lookups. Second, partition the orders table by created_at (monthly range partitions). This enables partition pruning — the query only scans partitions after 2024-01-01 instead of the entire table. Third, if this is a dashboard query run frequently, create a materialized view that pre-aggregates lifetime values and refresh it on a schedule. With the composite index alone, the query should drop from 45 seconds to under 1 second by scanning only the relevant index entries instead of all 200M rows.",
  },
  {
    code: `// DynamoDB table design for an e-commerce platform
// Current tables:
// - Users (PK: userId)
// - Orders (PK: orderId)
// - Products (PK: productId)
// - OrderItems (PK: orderItemId)

// Access patterns needed:
// 1. Get user profile by userId
// 2. Get all orders for a user
// 3. Get order details with items
// 4. Get all orders containing a specific product
// 5. Get recent orders (last 7 days) across all users`,
    question: "Redesign this as a DynamoDB single-table design with appropriate keys and GSIs.",
    answer:
      "Single-table design: PK and SK with entity type prefixes. User profile: PK='USER#userId', SK='PROFILE'. User orders: PK='USER#userId', SK='ORDER#orderId' (enables Query for all user orders). Order items: PK='ORDER#orderId', SK='ITEM#productId' (enables Query for order details). GSI1 for product orders: GSI1-PK='PRODUCT#productId', GSI1-SK='ORDER#orderId'. GSI2 for recent orders: GSI2-PK='ORDER_DATE', GSI2-SK=createdAt (use a date-bucketed partition key like 'ORDER_DATE#2024-01-15' to avoid hot partitions). Access pattern 5 (recent orders across all users) is the hardest — it requires a GSI with a bucketed partition key. Without bucketing, a single partition key like 'ALL_ORDERS' creates a hot partition. Daily buckets distribute the load while allowing queries for the last 7 days by querying 7 partition keys.",
  },
  {
    code: `-- ClickHouse: Raw events table receiving 500K events/second
CREATE TABLE raw_events (
    event_id UUID,
    tenant_id UInt32,
    event_type LowCardinality(String),
    user_id UInt64,
    properties String, -- JSON blob
    timestamp DateTime64(3)
) ENGINE = MergeTree()
ORDER BY (timestamp)
PARTITION BY toYYYYMMDD(timestamp);

-- Dashboard query taking 30 seconds on 10B rows:
SELECT event_type, count(), uniq(user_id)
FROM raw_events
WHERE tenant_id = 42
  AND timestamp >= now() - INTERVAL 7 DAY
GROUP BY event_type
ORDER BY count() DESC;`,
    question: "Why is the dashboard query slow and how would you optimize it?",
    answer:
      "The query is slow because the ORDER BY key is (timestamp), but the query filters on tenant_id first. ClickHouse sparse index skips granules based on the ORDER BY key — with only timestamp in the key, it cannot skip granules for a specific tenant. Fix 1: Change ORDER BY to (tenant_id, event_type, timestamp). Now the sparse index efficiently finds granules for tenant_id = 42. Fix 2: Create a materialized view with AggregatingMergeTree that pre-aggregates counts and unique users by tenant_id, event_type, and date. The dashboard queries the aggregate table (millions of rows) instead of the raw table (billions of rows). Fix 3: For the properties JSON blob, use String type and parse with JSON functions, or better yet, extract commonly queried fields into dedicated columns. The combination of ORDER BY reordering and a materialized view should bring the query from 30 seconds to under 100 milliseconds.",
  },
  {
    code: `# Current architecture:
# - PostgreSQL 14 on db.r6g.2xlarge (8 vCPU, 64GB RAM)
# - 800GB database, largest table: 500M rows (events)
# - 200 application servers connecting directly (no pooler)
# - pg_stat_statements shows:
#   - Top query: SELECT * FROM events WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50
#     calls: 2M/day, mean_time: 850ms
#   - Second: Complex analytics query joining 4 tables, calls: 500/day, mean_time: 120s
# - max_connections: 500, active connections avg: 180, peak: 450
# - Buffer cache hit ratio: 94%
# - Autovacuum on events table: last completed 3 days ago`,
    question: "Diagnose all the performance issues and provide a remediation plan in priority order.",
    answer:
      "Issues in priority order: 1) Missing connection pooler — 200 app servers connecting directly is dangerous. Deploy PgBouncer in transaction mode, reduce max_connections to 100-150. This alone prevents connection exhaustion under load. 2) The top query uses SELECT * (reads all columns when you likely need a few), has no proper index for (user_id, created_at DESC), and runs 2M times/day at 850ms each — that is 472 CPU-hours/day. Add CREATE INDEX CONCURRENTLY ON events(user_id, created_at DESC) INCLUDE (needed_columns) and select specific columns. Expected: 850ms -> sub-10ms. 3) Buffer cache hit ratio of 94% is too low (target >99%). shared_buffers is likely set too low — increase to 16GB (25% of 64GB RAM). 4) Autovacuum on the 500M row events table has not completed in 3 days — dead tuples are accumulating, causing index bloat and slower queries. Tune autovacuum for this table: autovacuum_vacuum_scale_factor = 0.01, autovacuum_vacuum_cost_delay = 2ms. 5) The 120-second analytics query should not run on the production database. Replicate events data to ClickHouse via CDC for analytics. 6) Partition the events table by month for better autovacuum and data lifecycle management.",
  },
  {
    code: `// Scenario: You are building a ride-sharing application
// Requirements:
// - 10M active users, 500K rides/day
// - Real-time driver location tracking (updates every 5 seconds)
// - Ride matching (find nearest available driver)
// - Ride history and analytics
// - Surge pricing based on demand in geographic zones
// - Payment processing with ACID guarantees
// - Real-time ETAs and route display`,
    question: "Design the database architecture. Which databases would you use for each component and why?",
    answer:
      "Multi-database architecture: 1) PostgreSQL as the primary transactional database for users, rides, payments, and driver profiles. ACID transactions ensure payment integrity. Use PostGIS extension for geospatial queries (find drivers within a radius). 2) Redis for real-time driver locations: use geospatial data type (GEOADD/GEORADIUS) for finding nearest drivers with sub-millisecond latency. Also use Redis for: surge pricing zone calculations (sorted sets), rate limiting, and session storage. Driver location updates (10M * 5-sec intervals = 2M updates/sec) are too frequent for PostgreSQL. 3) Kafka for the event stream: ride events, location updates, and pricing signals flow through Kafka for decoupling. 4) ClickHouse for analytics: ride history aggregations, surge pricing analysis, driver performance metrics. Ingest from Kafka via ClickHouse Kafka engine. Data flow: driver location -> Redis (real-time) + Kafka -> ClickHouse (analytics). Ride requests -> PostgreSQL (transactional) + Kafka -> ClickHouse. Payment -> PostgreSQL only (ACID critical). This uses 4 databases, each for its strength: PostgreSQL for transactions, Redis for real-time lookups, Kafka for event streaming, ClickHouse for analytics.",
  },
  {
    code: `-- BigQuery: Monthly cost has grown from $5K to $50K
-- Top queries by bytes scanned:
-- 1. SELECT * FROM events (50TB table, run daily by BI tool)
--    Bytes scanned: 50TB, Cost: $312/run
-- 2. SELECT user_id, event_type, timestamp FROM events WHERE date > CURRENT_DATE - 30
--    Bytes scanned: 15TB (no partitioning), Cost: $93/run
-- 3. Complex join between events and users, run 100x/day
--    Bytes scanned: 5TB per run, Cost: $31/run x 100 = $3100/day

-- Current table definition:
CREATE TABLE events (
    event_id STRING,
    user_id STRING,
    event_type STRING,
    properties STRING,
    timestamp TIMESTAMP,
    date DATE
);`,
    question: "Reduce the BigQuery monthly cost by at least 80% while maintaining query functionality.",
    answer:
      "Four changes to reduce cost by 80%+: 1) Partition the events table by date column: ALTER TABLE events SET OPTIONS (partition_expiration_days=365, require_partition_filter=true). This forces all queries to include a date filter and prunes irrelevant partitions. The 30-day query drops from 50TB to ~5TB scanned. 2) Cluster by (event_type, user_id) — this sorts data within partitions so queries filtering on these columns read fewer bytes. 3) Fix the BI tool query: change SELECT * to SELECT only needed columns. On a 50TB table with 20 columns, selecting 3 columns reads ~7.5TB instead of 50TB. Better yet, create a materialized view for the BI tool with only the columns and aggregations it needs. 4) For the join query running 100x/day: create a materialized view that pre-joins the data. BigQuery automatically uses materialized views when possible. If queries are identical across runs, the result cache returns results for free (24-hour TTL). Also consider switching from on-demand to flat-rate pricing (capacity reservations) if monthly spend is consistently above $10K. These changes together: partitioning saves 70% on date-filtered queries, column selection saves 85% on the BI query, and materialized views eliminate redundant computation.",
  },
  {
    code: `# MongoDB sharding scenario:
# - E-commerce orders collection: 2B documents, 5TB
# - Current shard key: { orderId: 1 } (ObjectId-based, monotonically increasing)
# - 4 shards, but shard4 receives 90% of writes (hot shard)
# - Read patterns:
#   - Get order by orderId (frequent)
#   - Get all orders for a customer (frequent)
#   - Get orders by date range (analytics)
# - Write pattern: 10K new orders/second, all going to latest shard`,
    question: "The shard key is causing a hot shard. Redesign the sharding strategy to distribute writes evenly while supporting all read patterns.",
    answer:
      "The problem: ObjectId-based orderId is monotonically increasing, so all new inserts go to the shard owning the highest range — a classic hot-shard anti-pattern. Solution: change the shard key to { customerId: 'hashed' } as the primary shard key. This distributes writes evenly across shards (hashed keys distribute randomly) and colocates all orders for a customer on the same shard (supporting the 'get all orders for customer' pattern with a targeted query). For the 'get order by orderId' pattern, create a unique index on orderId — the query will be a scatter-gather across shards (slightly slower) but this is an acceptable trade-off since most reads are by customer. For date-range analytics, do not run these on the operational MongoDB — replicate to ClickHouse via MongoDB Change Streams for analytical queries. Alternative shard key: { customerId: 1, orderId: 1 } (compound, not hashed) gives range query support on customerId but requires enough unique customerIds for even distribution. With 10K orders/second spread across millions of customers, the hashed approach is safer for write distribution. Important: resharding a 5TB collection requires careful planning — use MongoDB 5.0+ resharding feature or set up a new sharded collection and migrate data.",
  },
  {
    code: `// Scenario: You are the tech lead choosing a database for a new product
// The product is an internal analytics tool for a 500-person company
// Requirements:
// - Dashboard showing sales metrics, user engagement, funnel analysis
// - Data sources: PostgreSQL (application DB), Salesforce, Google Analytics
// - Data volume: ~50GB total, growing 5GB/month
// - Users: 20 analysts, 5 engineers
// - Budget: limited (startup)
// - Team expertise: strong PostgreSQL, no experience with Snowflake/BigQuery/ClickHouse
// - Query patterns: mostly pre-defined dashboard queries, some ad-hoc exploration`,
    question: "Which analytics database would you recommend and why? Consider all the constraints.",
    answer:
      "Recommendation: PostgreSQL with materialized views, not a dedicated analytics engine. At 50GB (growing to ~110GB in a year), PostgreSQL handles this comfortably. The team has strong PostgreSQL expertise and no experience with analytics engines — the learning curve and operational overhead of Snowflake, BigQuery, or ClickHouse is not justified at this data volume. Architecture: create a separate PostgreSQL instance (not the production app DB) as the analytics database. Use tools like Airbyte or Fivetran to sync data from the app DB, Salesforce, and Google Analytics into this analytics instance. Create materialized views for the dashboard queries and refresh them on a schedule (every 15-30 minutes). Use a BI tool like Metabase (free, open-source) on top. This costs a fraction of Snowflake/BigQuery and leverages existing expertise. Revisit the decision when data exceeds 500GB or query performance becomes insufficient. The principle: do not introduce a new technology when your existing stack handles the workload. Every new database adds operational overhead that a 5-engineer team cannot afford.",
  },
];

// ─── Export ──────────────────────────────────────────────────────────────────

export const topicData: TopicData = {
  topicTitle: "Databases",
  topicMeta: "60\u201375 min \xB7 Mid to Senior level",
  lastUpdated: "2026-04-10",
  lastHourConceptIds: [
    "oltp-vs-olap",
    "postgresql",
    "mongodb",
    "snowflake",
    "clickhouse",
    "bigquery",
    "decision-framework",
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
