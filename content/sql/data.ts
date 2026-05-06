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
    "SQL (Structured Query Language) is a declarative language for querying and manipulating relational data. You describe WHAT data you want; the database engine's query planner decides HOW to retrieve it — choosing join algorithms, index paths, and execution order based on statistics and cost estimates. Modern SQL extends far beyond simple CRUD: window functions compute aggregates over sliding partitions without collapsing rows, CTEs make complex queries composable, and EXPLAIN/EXPLAIN ANALYZE expose the query planner's execution strategy so you can tune it. The underlying engine (PostgreSQL, MySQL, SQLite) translates your SQL into a physical execution plan involving B-tree index scans, hash joins, sort/merge operations, and buffer pool I/O.",
  whyItExists:
    "Before SQL (1974), databases required procedural navigation — you told the database how to find records step by step. SQL's declarative model abstracted this, letting developers express queries in terms of sets and relations. Edgar Codd's relational model proved that set-based operations were mathematically complete for data retrieval. The query optimizer takes on the burden of finding the most efficient execution path, adapting as data distributions change without requiring code changes. This separation of concerns is why SQL has survived 50 years of competition from NoSQL, NewSQL, and object databases.",
  whenToUse: [
    "OLTP workloads — high-concurrency transactional data with ACID guarantees (banking, e-commerce, user records)",
    "Ad-hoc analytical queries where the data model is well-understood and access patterns vary",
    "Reporting and aggregation — GROUP BY, window functions, CTEs are far more expressive than NoSQL alternatives",
    "Data with complex relationships — joins express relationships that require denormalization to model in document stores",
    "When data integrity is critical — foreign keys, check constraints, and ACID transactions prevent invalid states",
    "ETL and data transformation — SQL is the lingua franca of data pipelines in dbt, Spark SQL, BigQuery",
  ],
  whereItFails: [
    "Hierarchical/graph data — recursive CTEs work but are slow compared to graph databases for deep traversal",
    "Unstructured or schema-less data — NoSQL document stores handle dynamic schemas without migrations",
    "Extreme write throughput — relational engines with strong consistency can't match Cassandra/DynamoDB at millions of writes/sec",
    "Full-text search — LIKE patterns don't scale; use Elasticsearch or dedicated full-text indexes",
    "Time-series data at scale — specialized engines (TimescaleDB, InfluxDB) outperform relational databases for high-frequency sensor data",
  ],
};

// ─── Categories ───────────────────────────────────────────────────────────────
const categories: CategoryMeta[] = [
  {
    id: "query-fundamentals",
    label: "Query Fundamentals",
    description:
      "JOIN types, subqueries, set operations, aggregation, filtering — the core building blocks of every SQL query",
  },
  {
    id: "window-functions",
    label: "Window Functions",
    description:
      "ROW_NUMBER, RANK, DENSE_RANK, LEAD/LAG, NTILE, running totals, moving averages — analytics without collapsing rows",
  },
  {
    id: "ctes",
    label: "CTEs & Recursive Queries",
    description:
      "Common Table Expressions, WITH clause, recursive CTEs for hierarchies and graphs, CTE vs subquery tradeoffs",
  },
  {
    id: "indexes",
    label: "Indexes & Query Plans",
    description:
      "B-tree, composite, covering, partial, expression indexes; EXPLAIN ANALYZE; index selectivity and cost model",
  },
  {
    id: "transactions",
    label: "Transactions & Isolation",
    description:
      "ACID properties, isolation levels (READ COMMITTED, REPEATABLE READ, SERIALIZABLE), MVCC, deadlocks, lock types",
  },
  {
    id: "performance",
    label: "Performance Tuning",
    description:
      "Query plan analysis, N+1 problem, denormalization, materialized views, partitioning, statistics and autovacuum",
  },
  {
    id: "advanced-sql",
    label: "Advanced SQL",
    description:
      "LATERAL joins, pivoting with CASE/FILTER, JSON/JSONB operators, UPSERT, DISTINCT ON, array operations",
  },
  {
    id: "internals",
    label: "Database Internals",
    description:
      "B-tree page structure, WAL (Write-Ahead Log), MVCC tuple versions, vacuum, buffer pool, checkpoint",
  },
];

// ─── Mental Model Tree ────────────────────────────────────────────────────────
const mentalModelTree: TreeNode = {
  id: "root",
  label: "SQL Deep Dive",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "cat-fundamentals",
      label: "Query Fundamentals",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-joins", label: "JOIN Types", nodeType: "concept", conceptId: "join-types", importance: "critical" },
        { id: "node-aggregation", label: "Aggregation & GROUP BY", nodeType: "concept", conceptId: "aggregation-groupby", importance: "critical" },
        { id: "node-subqueries", label: "Subqueries", nodeType: "concept", conceptId: "subqueries", importance: "high" },
        { id: "node-set-ops", label: "Set Operations", nodeType: "concept", conceptId: "set-operations", importance: "medium" },
      ],
    },
    {
      id: "cat-window",
      label: "Window Functions",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-ranking", label: "Ranking Functions", nodeType: "concept", conceptId: "ranking-functions", importance: "critical" },
        { id: "node-lag-lead", label: "LAG & LEAD", nodeType: "concept", conceptId: "lag-lead", importance: "critical" },
        { id: "node-running-totals", label: "Running Totals & Frames", nodeType: "concept", conceptId: "running-totals-frames", importance: "critical" },
        { id: "node-partition", label: "PARTITION BY & ORDER BY", nodeType: "concept", conceptId: "partition-order", importance: "critical" },
      ],
    },
    {
      id: "cat-ctes",
      label: "CTEs",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-cte-basics", label: "CTE Basics", nodeType: "concept", conceptId: "cte-basics", importance: "high" },
        { id: "node-recursive-cte", label: "Recursive CTEs", nodeType: "concept", conceptId: "recursive-cte", importance: "high" },
      ],
    },
    {
      id: "cat-indexes",
      label: "Indexes & Plans",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-btree", label: "B-tree Indexes", nodeType: "concept", conceptId: "btree-indexes", importance: "critical" },
        { id: "node-composite", label: "Composite Indexes", nodeType: "concept", conceptId: "composite-indexes", importance: "critical" },
        { id: "node-covering", label: "Covering Indexes", nodeType: "concept", conceptId: "covering-indexes", importance: "high" },
        { id: "node-explain", label: "EXPLAIN ANALYZE", nodeType: "concept", conceptId: "explain-analyze", importance: "critical" },
      ],
    },
    {
      id: "cat-transactions",
      label: "Transactions",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-acid", label: "ACID Properties", nodeType: "concept", conceptId: "acid-properties", importance: "critical" },
        { id: "node-isolation", label: "Isolation Levels", nodeType: "concept", conceptId: "isolation-levels", importance: "critical" },
        { id: "node-mvcc", label: "MVCC", nodeType: "concept", conceptId: "mvcc", importance: "high" },
        { id: "node-deadlocks", label: "Deadlocks", nodeType: "concept", conceptId: "deadlocks", importance: "high" },
      ],
    },
    {
      id: "cat-performance",
      label: "Performance",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-partitioning", label: "Partitioning", nodeType: "concept", conceptId: "partitioning", importance: "high" },
        { id: "node-matviews", label: "Materialized Views", nodeType: "concept", conceptId: "materialized-views", importance: "high" },
        { id: "node-vacuum", label: "Vacuum & Autovacuum", nodeType: "concept", conceptId: "vacuum-autovacuum", importance: "medium" },
      ],
    },
    {
      id: "cat-advanced",
      label: "Advanced SQL",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-lateral", label: "LATERAL Joins", nodeType: "concept", conceptId: "lateral-joins", importance: "high" },
        { id: "node-jsonb", label: "JSON & JSONB", nodeType: "concept", conceptId: "json-jsonb", importance: "medium" },
        { id: "node-upsert", label: "UPSERT & ON CONFLICT", nodeType: "concept", conceptId: "upsert-on-conflict", importance: "medium" },
      ],
    },
    {
      id: "cat-internals",
      label: "Internals",
      nodeType: "category",
      importance: "medium",
      children: [
        { id: "node-wal", label: "WAL & Durability", nodeType: "concept", conceptId: "wal-durability", importance: "high" },
        { id: "node-buffer-pool", label: "Buffer Pool", nodeType: "concept", conceptId: "buffer-pool", importance: "medium" },
      ],
    },
  ],
};

// ─── Concepts ─────────────────────────────────────────────────────────────────
const concepts: Concept[] = [
  // ── Query Fundamentals ──
  {
    id: "join-types",
    title: "JOIN Types",
    category: "query-fundamentals",
    basic:
      "SQL joins combine rows from two tables based on a related column. INNER JOIN returns only matching rows. LEFT JOIN returns all left table rows plus matching right rows (NULLs for non-matches). RIGHT JOIN is the mirror. FULL OUTER JOIN returns all rows from both tables.",
    expected:
      "INNER JOIN: rows present in both tables. LEFT JOIN: all left rows, NULL for right when no match — use to find rows with no related records. CROSS JOIN: Cartesian product (all combinations). SELF JOIN: table joined to itself (e.g., employee-manager hierarchy). JOIN execution algorithms: Nested Loop (good for small tables or indexed lookups), Hash Join (good for large, unsorted tables), Merge Join (good for pre-sorted data). The query planner picks the algorithm based on estimated row counts and available indexes.",
    deep:
      "JOIN order matters for performance even though SQL is declarative — the planner uses table statistics (pg_statistic) and cost estimates to determine join order. For n tables, there are n! possible join orders; the planner uses dynamic programming for small n and genetic algorithms (GEQO) for large n. The join condition's selectivity determines how many rows survive — high-selectivity joins filter aggressively early. Anti-joins (NOT EXISTS, NOT IN, EXCEPT) have subtle differences: NOT IN fails unexpectedly with NULLs in the subquery (returns empty result set). NOT EXISTS correctly handles NULLs and is generally faster with correlated subqueries.",
    interviewAnswer:
      "I use INNER JOIN when I only want matching rows, LEFT JOIN to include rows with no match (find orphans), and FULL OUTER JOIN for reconciliation queries. The planner chooses Nested Loop, Hash Join, or Merge Join based on statistics. A critical gotcha: NOT IN returns empty if the subquery contains any NULLs — I always use NOT EXISTS instead for anti-joins.",
    trap:
      "Using NOT IN when the subquery might return NULLs. SELECT * FROM orders WHERE customer_id NOT IN (SELECT id FROM customers) — if any customer id IS NULL, the entire NOT IN returns false for every row, giving an empty result. Use NOT EXISTS instead.",
    memoryAnchor:
      "Joins are Venn diagrams: INNER is the overlap, LEFT is the left circle + overlap, FULL OUTER is both circles combined. NOT IN with NULLs is like a guest list that includes a blank name — nobody can get in because you can't confirm nobody is the blank name.",
  },
  {
    id: "aggregation-groupby",
    title: "Aggregation & GROUP BY",
    category: "query-fundamentals",
    basic:
      "GROUP BY collapses rows sharing the same value into groups, applying aggregate functions (COUNT, SUM, AVG, MAX, MIN) per group. HAVING filters groups after aggregation, like WHERE filters rows before.",
    expected:
      "Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. You cannot use column aliases from SELECT in WHERE or HAVING (they're evaluated before SELECT). DISTINCT eliminates duplicate rows from the result, not from aggregation. COUNT(*) counts all rows including NULLs; COUNT(column) ignores NULLs. GROUPING SETS, ROLLUP, and CUBE generate multiple grouping levels in one query — ROLLUP(year, month) produces (year, month), (year), and () totals.",
    deep:
      "GROUP BY can reference expression results or positional references (GROUP BY 1, 2). PostgreSQL allows GROUP BY on columns not in SELECT (unlike some stricter SQL modes). The optimizer may use a hash aggregate (build hash table of groups, spills to disk if hash exceeds work_mem) or a sort aggregate (sort the data, then scan for group boundaries). For large aggregations, consider partial aggregation in parallel workers. FILTER clause on aggregates: COUNT(*) FILTER (WHERE status = 'active') — conditional aggregation without CASE inside the aggregate.",
    interviewAnswer:
      "GROUP BY groups rows for aggregate functions. The key rule is that every non-aggregated column in SELECT must appear in GROUP BY. I use HAVING for group-level filtering, WHERE for row-level filtering before grouping. COUNT(*) includes NULLs; COUNT(column) doesn't. ROLLUP generates subtotals in one query — I use it for reports needing totals at multiple levels.",
    trap:
      "Using WHERE to filter aggregate results. WHERE filters before GROUP BY — aggregates don't exist yet. HAVING filters after GROUP BY, where aggregates exist. SELECT department, AVG(salary) WHERE AVG(salary) > 50000 is invalid; use HAVING AVG(salary) > 50000.",
    memoryAnchor:
      "GROUP BY is a spreadsheet pivot table — it collapses matching rows into a single row per bucket. HAVING is the filter you apply AFTER the pivot; WHERE is the filter before the pivot.",
  },
  {
    id: "subqueries",
    title: "Subqueries",
    category: "query-fundamentals",
    basic:
      "A subquery is a SELECT statement nested inside another query. It can appear in SELECT, FROM, WHERE, or HAVING. Scalar subqueries return one value, row subqueries return one row, and table subqueries return multiple rows.",
    expected:
      "Types: Correlated subquery — references columns from the outer query, re-evaluated for each outer row (can be slow). Non-correlated subquery — evaluated once, result used as a constant. EXISTS/NOT EXISTS — short-circuits on first match (faster than IN for large subqueries). IN — compares against a list; not null-safe. Subquery in FROM — derived table, materialized or inlined by the planner. The planner often 'unnests' subqueries and rewrites them as joins for better optimization.",
    deep:
      "Correlated subqueries have O(n×m) complexity by default (one execution per outer row). The planner can sometimes convert them to joins via 'subquery unnesting' optimization — check the EXPLAIN plan to verify. LATERAL subquery (covered separately) is the explicit form of a correlated subquery in FROM. Scalar subqueries in SELECT that return more than one row cause a runtime error. The planner can push predicates into subqueries (predicate pushdown) if the subquery lacks DISTINCT, LIMIT, or aggregate functions that would change the result. EXISTS with an uncorrelated subquery (e.g., WHERE EXISTS (SELECT 1)) is a tautology — always true if the subquery returns any rows.",
    interviewAnswer:
      "I prefer non-correlated subqueries or CTEs over correlated ones for readability and performance. EXISTS is my default for 'does a match exist' checks — it short-circuits and handles NULLs correctly. Correlated subqueries are sometimes unavoidable (e.g., row-by-row comparison logic) but I check EXPLAIN to ensure the planner can convert them to joins.",
    trap:
      "Assuming correlated subqueries are always re-evaluated per row. Modern planners often unnest them into hash joins. But you can't rely on this — always check EXPLAIN and test with large data sets.",
    memoryAnchor:
      "Subqueries are questions within questions. A correlated subquery is like asking 'for each employee, how many colleagues earn more?' — you have to re-check everyone for each employee. EXISTS is like peeking through a door crack — stop as soon as you see anything inside.",
  },
  {
    id: "set-operations",
    title: "Set Operations",
    category: "query-fundamentals",
    basic:
      "UNION combines results of two queries, removing duplicates. UNION ALL combines without removing duplicates (faster). INTERSECT returns rows in both result sets. EXCEPT returns rows in the first set not in the second.",
    expected:
      "Rules: both queries must have the same number of columns with compatible types. Column names come from the first query. UNION is equivalent to UNION ALL + SELECT DISTINCT — it performs a sort or hash to deduplicate, which is expensive. Use UNION ALL whenever duplicates are acceptable or impossible. INTERSECT and EXCEPT are equivalent to semi-join and anti-join respectively, and the planner may convert them. ORDER BY applies to the final combined result, not individual parts.",
    deep:
      "UNION ALL is almost always preferred over UNION for performance — UNION adds an O(n log n) deduplication step. Use UNION only when you genuinely need distinct rows across multiple queries. EXCEPT is null-safe (unlike NOT IN) — two NULLs are treated as equal for the purpose of set difference. For finding symmetric differences (rows in either set but not both), combine two EXCEPTs with UNION ALL. INTERSECT can be faster than EXISTS for some query shapes because the planner has a dedicated INTERSECT path.",
    interviewAnswer:
      "I use UNION ALL by default — UNION adds expensive deduplication. EXCEPT is my preference over NOT IN for anti-joins because it handles NULLs correctly. INTERSECT for rows present in both result sets. The columns must match in count and compatible types across all parts of the set operation.",
    trap:
      "Using UNION instead of UNION ALL when results can't have duplicates anyway. The extra deduplication sort/hash costs CPU and memory with zero benefit.",
    memoryAnchor:
      "UNION is a merge of two playlists removing duplicate songs (expensive dedup). UNION ALL is just combining both playlists. INTERSECT is songs on both playlists. EXCEPT is songs on the first playlist but not the second.",
  },

  // ── Window Functions ──
  {
    id: "ranking-functions",
    title: "ROW_NUMBER, RANK, DENSE_RANK, NTILE",
    category: "window-functions",
    basic:
      "Ranking window functions assign a position to each row within a partition without collapsing rows. ROW_NUMBER assigns unique sequential numbers. RANK skips numbers after ties. DENSE_RANK doesn't skip. NTILE divides rows into N equal buckets.",
    expected:
      "ROW_NUMBER: always unique (1, 2, 3...). RANK: ties get the same rank, next rank skips (1, 1, 3). DENSE_RANK: ties get same rank, next rank doesn't skip (1, 1, 2). NTILE(4): assigns rows to quartiles (1–4). Syntax: ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC). PARTITION BY resets the numbering per group; ORDER BY defines ranking order. Without PARTITION BY, all rows are one partition.",
    deep:
      "ROW_NUMBER is deterministic only if ORDER BY is unique. With ties in ORDER BY (same salary, same department), the row number assignment is arbitrary — add a tiebreaker (id column) for determinism. RANK and DENSE_RANK are more appropriate when ties are meaningful (leaderboards). PERCENT_RANK returns (rank - 1) / (count - 1) as a fraction 0–1. CUME_DIST returns fraction of rows with value ≤ current row. For top-N per group queries, ROW_NUMBER() OVER (PARTITION BY group ORDER BY metric DESC) with WHERE row_num <= N in a subquery or CTE is the canonical pattern.",
    interviewAnswer:
      "I pick ROW_NUMBER for top-N per group (guaranteed unique ranks), RANK for competition leaderboards where ties share rank (and next rank skips), DENSE_RANK when ties share rank but you don't want gaps. NTILE for quartile/percentile bucketing. The key pattern for top-N per group: wrap the window function in a CTE or subquery, then filter WHERE rn <= N.",
    trap:
      "ROW_NUMBER with a non-deterministic ORDER BY (ties in the sort key) produces unpredictable, inconsistent rankings across query runs. Always add a unique tiebreaker (primary key) to the ORDER BY for deterministic results.",
    memoryAnchor:
      "RANK is the Olympics — tied for gold? Both get gold (#1), nobody gets silver (#2), bronze is #3. DENSE_RANK is a class rank — tied for first, both are #1, next student is #2 (no skipped ranks). ROW_NUMBER is attendance — regardless of ties, each person gets a unique number.",
  },
  {
    id: "lag-lead",
    title: "LAG & LEAD",
    category: "window-functions",
    basic:
      "LAG accesses a value from a previous row within the partition. LEAD accesses a value from a following row. Both take an offset (default 1) and an optional default value when the row doesn't exist.",
    expected:
      "Usage: LAG(salary, 1, 0) OVER (PARTITION BY department ORDER BY hire_date) — returns previous employee's salary, defaulting to 0 for the first employee. LEAD is the forward equivalent. Common use cases: period-over-period comparisons (current month vs last month), consecutive event analysis (time between events), detecting state changes (previous status ≠ current status). Without a default, LAG/LEAD returns NULL when no previous/next row exists.",
    deep:
      "LAG and LEAD are sugar over FIRST_VALUE/LAST_VALUE with specific frame specs, but they're cleaner and the planner optimizes them directly. For multi-step lookback, use LAG with offset > 1: LAG(value, 3) to look 3 rows back. Detecting consecutive sequences: rows where the row_number minus the value rank forms a constant island. LAG is commonly used to compute deltas: value - LAG(value) OVER (...) AS change. For time-series gap detection: LEAD(event_time) - event_time AS gap, then filter for gaps exceeding a threshold.",
    interviewAnswer:
      "LAG and LEAD are essential for time-series analysis — comparing current vs previous period, computing deltas, and finding state transitions. Pattern: SELECT date, revenue, LAG(revenue) OVER (ORDER BY date) AS prev_revenue, revenue - LAG(revenue) OVER (ORDER BY date) AS change. Always specify a default value to avoid NULLs for boundary rows.",
    trap:
      "Forgetting ORDER BY in the window spec for LAG/LEAD. Without ORDER BY, 'previous' and 'next' are undefined — the result is non-deterministic. Window functions that reference row position always require ORDER BY.",
    memoryAnchor:
      "LAG is looking in the rearview mirror (previous row). LEAD is looking out the windshield (next row). Without ORDER BY, you don't know which direction you're driving.",
  },
  {
    id: "running-totals-frames",
    title: "Running Totals & Window Frames",
    category: "window-functions",
    basic:
      "Window frames define the set of rows each calculation considers. ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW computes a running total. ROWS BETWEEN 2 PRECEDING AND CURRENT ROW computes a 3-row moving average.",
    expected:
      "Frame modes: ROWS (physical row count), RANGE (logical values — ties included), GROUPS (PostgreSQL 11+, by groups of equal ORDER BY values). Default frame when ORDER BY is specified: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. Default without ORDER BY: ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING (entire partition). Running total: SUM(amount) OVER (PARTITION BY user_id ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW). FIRST_VALUE/LAST_VALUE respect the frame — specify ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING for LAST_VALUE to work as expected.",
    deep:
      "RANGE vs ROWS: with RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, all rows with the same ORDER BY value as the current row are included (ties are all in the 'current' range). With ROWS, only physically preceding rows are included. This matters for running totals with ties — ROWS gives consistent cumulative sums for tied dates; RANGE may jump the total at each group of ties. EXCLUDE clause (PostgreSQL 14+): EXCLUDE CURRENT ROW, EXCLUDE TIES. The optimizer may compute running totals using incremental aggregation rather than a full window evaluation per row, making them O(n) instead of O(n²).",
    interviewAnswer:
      "Window frames let me compute running totals, moving averages, and bounded-window aggregations. The frame spec ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW is the standard for cumulative sums. For a 7-day moving average: AVG(metric) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW). I use ROWS mode over RANGE for predictable behavior with tied values.",
    trap:
      "Using LAST_VALUE without specifying the full frame. The default frame ends at CURRENT ROW, so LAST_VALUE returns the current row's value, not the last row of the partition. Specify ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING to get the true last value.",
    memoryAnchor:
      "Window frame is a sliding magnifying glass over your data — UNBOUNDED PRECEDING means the glass starts at the beginning, CURRENT ROW means it ends here. Move it to see a rolling view.",
  },
  {
    id: "partition-order",
    title: "PARTITION BY & OVER Clause",
    category: "window-functions",
    basic:
      "The OVER clause turns an aggregate or ranking function into a window function, computing the result over a defined window of rows without collapsing them. PARTITION BY subdivides the window; ORDER BY defines row ordering within each partition.",
    expected:
      "Without PARTITION BY: all rows are one partition. With PARTITION BY department: each department is an independent partition. Window functions run after WHERE, GROUP BY, and HAVING — they operate on the result set, not the base table. This means you can combine GROUP BY with window functions: first aggregate with GROUP BY, then rank groups with a window function in a CTE. Multiple window functions with the same OVER spec are optimized by the planner to a single pass.",
    deep:
      "WINDOW clause (SQL standard): define named windows to avoid repeating OVER specs. SELECT salary, AVG(salary) OVER w, RANK() OVER w FROM employees WINDOW w AS (PARTITION BY dept ORDER BY salary). The planner evaluates all window functions sharing the same partition/order with a single sort and scan. Window functions cannot be used in WHERE or HAVING directly — wrap in a subquery or CTE. In PostgreSQL, window function execution happens after all other clauses, using a sequential scan of the (materialized or sorted) intermediate result.",
    interviewAnswer:
      "OVER() is what makes a function a window function instead of an aggregate. PARTITION BY is like GROUP BY but without collapsing rows. ORDER BY within OVER controls row ordering for ranking and frame-based calculations. I use the WINDOW clause when multiple functions share the same OVER spec to keep the query DRY and help the optimizer plan a single pass.",
    trap:
      "Trying to filter on a window function result in WHERE. Window functions are evaluated after WHERE — you can't filter them there. Wrap the query in a CTE or subquery, then apply WHERE on the outer query.",
    memoryAnchor:
      "OVER() is a window in the wall — you look through it at a specific section of data (partition) in a specific order, without destroying the wall (collapsing rows). Each window function is its own window.",
  },

  // ── CTEs ──
  {
    id: "cte-basics",
    title: "CTEs (WITH Clause)",
    category: "ctes",
    basic:
      "A CTE (Common Table Expression) defines a named temporary result set within a query using the WITH clause. It improves readability by naming complex subqueries and can be referenced multiple times in the main query.",
    expected:
      "Syntax: WITH cte_name AS (SELECT ...) SELECT * FROM cte_name. Multiple CTEs: WITH a AS (...), b AS (...) SELECT ... . PostgreSQL treats CTEs as optimization fences by default in older versions — the CTE is materialized once, and the planner cannot push predicates inside it. Since PostgreSQL 12, CTEs are inlined by default (treated like subqueries, allowing predicate pushdown) unless they are recursive or contain side effects. WITH MATERIALIZED forces materialization; WITH NOT MATERIALIZED forces inlining.",
    deep:
      "CTE vs Subquery: for non-recursive, non-side-effect CTEs in PostgreSQL 12+, they're equivalent — the planner inlines CTEs. In older versions, CTEs were always materialized, making them useful as optimization barriers (sometimes intentional to prevent planner mistakes). CTE materialization can hurt performance if the CTE produces many rows that are then filtered, but can help if the CTE result is expensive and referenced multiple times. Writeable CTEs: INSERT/UPDATE/DELETE in a CTE with RETURNING — chain data modifications: WITH deleted AS (DELETE FROM old_table RETURNING *) INSERT INTO archive SELECT * FROM deleted.",
    interviewAnswer:
      "CTEs make complex queries readable by naming intermediate steps. In PostgreSQL 12+, non-recursive CTEs without side effects are inlined by default (same as subqueries; recursive CTEs are still materialized). I use CTEs for readability and to structure multi-step logic. Writable CTEs (INSERT/UPDATE/DELETE with RETURNING) let me chain DML operations atomically — delete from one table and insert into another in a single statement.",
    trap:
      "Assuming CTEs always create a temporary table and are materialized once. In PostgreSQL 12+, non-recursive CTEs are inlined — predicate pushdown applies. In pre-12, they were always materialized, which could hurt or help performance.",
    memoryAnchor:
      "CTEs are like naming a sticky note. Instead of rewriting a complex formula every time, you name it 'monthly_sales' and refer to that name throughout the query. Each reference is a lookup to the same sticky note.",
  },
  {
    id: "recursive-cte",
    title: "Recursive CTEs",
    category: "ctes",
    basic:
      "Recursive CTEs traverse hierarchical or graph data (org charts, bill of materials, folder structures) using a self-referencing WITH RECURSIVE clause. A base case provides initial rows; the recursive term references the CTE itself to add next-level rows.",
    expected:
      "Structure: WITH RECURSIVE tree AS (SELECT id, parent_id, name FROM org WHERE parent_id IS NULL -- base case UNION ALL SELECT o.id, o.parent_id, o.name FROM org o INNER JOIN tree t ON o.parent_id = t.id -- recursive term). Execution: evaluate base case → evaluate recursive term joining against previous iteration → repeat until no new rows → union all results. UNION removes duplicates; UNION ALL is faster and correct unless the graph has cycles. Depth/path tracking: add a depth counter or accumulated path for breadcrumb trails.",
    deep:
      "Cycle detection: for graph (not tree) data, recursive CTEs can loop infinitely. Strategies: track visited IDs in an array (array_agg), add a depth limit (WHERE depth < 100), or use PostgreSQL's graph cycle detection syntax (CYCLE id SET is_cycle USING path). Performance: recursive CTEs use a working table iteratively — each iteration scans the previous iteration's results and the base table. Index on the parent_id column is critical. For very deep hierarchies (>50 levels), recursive CTEs can be slow — consider storing the materialized path (ltree extension in PostgreSQL) instead.",
    interviewAnswer:
      "Recursive CTEs traverse hierarchical data with a base case plus recursive term joined back to itself. The classic use case is org chart traversal — find all reports under a manager. I always add UNION ALL (not UNION) for speed and a depth counter for cycle protection in graph data. For very deep or frequently queried hierarchies, I consider the ltree extension or storing materialized paths for O(1) ancestor lookups.",
    trap:
      "Running a recursive CTE on graph data with cycles (not a tree) without cycle detection. The query will loop indefinitely. Add a depth limit (WHERE depth < 1000) or visited-IDs array as a safety valve.",
    memoryAnchor:
      "Recursive CTE is a chain of dominoes — the base case tips the first one (root node), and each falling domino (iteration) tips the next row in line until none are left standing.",
  },

  // ── Indexes & Query Plans ──
  {
    id: "btree-indexes",
    title: "B-tree Indexes",
    category: "indexes",
    basic:
      "B-tree (Balanced Tree) is the default and most common index type. It maintains a sorted tree structure enabling O(log n) lookups and efficient range scans. Every column you ORDER BY, filter with =, <, >, BETWEEN, or LIKE 'prefix%' can benefit from a B-tree index.",
    expected:
      "B-tree structure: root → internal nodes (contain sorted key copies and child pointers) → leaf nodes (contain actual key values and heap tuple pointers, linked as a doubly-linked list for range scans). Index scan vs sequential scan: the planner chooses based on selectivity. For > ~5% of rows, sequential scan is often faster (sequential I/O is faster than random I/O). Bitmap index scan: fetches many index entries, sorts by heap block address, then scans blocks in order — combines index precision with sequential I/O efficiency.",
    deep:
      "Index page splits happen when a leaf page is full — the page splits into two, propagating up the tree. This causes write amplification and index bloat. High-frequency sequential inserts (auto-increment IDs) cause fewer splits than random UUIDs, which cause ~50% page fills and more bloat. VACUUM FULL or pg_repack rebuilds bloated indexes. Index correlation: pg_stats.correlation measures how well the physical row order matches the index order (1.0 = perfect, 0 = random). Low correlation means index scans require random I/O; the planner may prefer sequential scan. Partial indexes on predicates reduce index size: CREATE INDEX ON orders (created_at) WHERE status = 'pending' — only indexes pending orders.",
    interviewAnswer:
      "B-tree is the right index for equality, range, and prefix searches. The planner uses it when selectivity is high enough — low-selectivity columns (boolean, status) often aren't worth indexing. I create partial indexes on filtered subsets (WHERE status = 'active') to reduce index size and keep it hot in cache. UUID primary keys cause index bloat from page splits — I use ULID or sequential IDs for high-insert tables.",
    trap:
      "Creating an index on a low-cardinality column like status (3 values) and expecting it to be used for range queries. The planner will choose a sequential scan for > ~5% row access. Indexes help when they eliminate most of the table.",
    memoryAnchor:
      "A B-tree index is a library card catalog — sorted alphabetically (the tree), each card points to the shelf location (heap pointer). A range scan is flipping through a section of cards sequentially. Sequential scan skips the catalog and just walks every shelf.",
  },
  {
    id: "composite-indexes",
    title: "Composite Indexes & Column Order",
    category: "indexes",
    basic:
      "A composite (multi-column) index covers multiple columns in a specified order. The leftmost prefix rule applies: an index on (a, b, c) can be used for queries filtering on a, on (a, b), or on (a, b, c), but NOT on b alone or c alone.",
    expected:
      "Column order in composite indexes is critical. Rules of thumb: (1) equality columns before range columns — index on (status, created_at) supports WHERE status = 'active' AND created_at > '2024-01-01' better than (created_at, status). (2) Most selective column first — columns that eliminate the most rows go first for equality conditions. (3) Include ORDER BY columns last to avoid a sort step. A query hitting only the first column of a composite index still uses the index, but less efficiently than a dedicated single-column index.",
    deep:
      "The index condition pushdown (ICP) optimization evaluates index conditions as the index is scanned, reducing heap access. Skip scanning (MySQL/PostgreSQL 14+): the planner can sometimes use an index even if the leading column isn't in the filter — by scanning distinct values of the leading column, then applying the actual filter. Covering indexes (index-only scans) — when all queried columns are in the index, the planner never touches the heap. Functional indexes on expressions: CREATE INDEX ON lower(email) — enables case-insensitive searches. Index on jsonb path: CREATE INDEX ON users ((data->>'email')).",
    interviewAnswer:
      "I design composite indexes by considering query patterns: equality filters first (most selective), then range filters, then ORDER BY columns. An index on (user_id, created_at DESC) perfectly supports 'get last 10 orders for user X'. I verify with EXPLAIN that the index is actually used and check whether an index-only scan is possible (all needed columns in the index).",
    trap:
      "Putting a range column before equality columns. Index on (created_at, user_id) with WHERE user_id = 5 AND created_at > '2024-01-01' — the planner can't use the index efficiently for user_id because it's not the leading column. Reverse the order.",
    memoryAnchor:
      "Composite index is a phone book sorted by (last name, first name). You can find 'Smith, John' easily (full match). You can find all 'Smiths' (leading prefix). But you can't find all 'Johns' without scanning every page — first name alone doesn't help because the book isn't sorted by first name.",
  },
  {
    id: "covering-indexes",
    title: "Covering Indexes & Index-Only Scans",
    category: "indexes",
    basic:
      "A covering index includes all columns needed to satisfy a query entirely from the index, without accessing the heap (main table). This 'index-only scan' is significantly faster because it eliminates random I/O to fetch row data.",
    expected:
      "A query is index-only if every column referenced (SELECT, WHERE, ORDER BY, GROUP BY) is stored in the index. In PostgreSQL, INCLUDE clause adds non-key columns to the leaf pages without affecting index sort order: CREATE INDEX ON orders (user_id, created_at) INCLUDE (status, amount). This enables index-only scans for SELECT status, amount WHERE user_id = ? ORDER BY created_at without adding status and amount to the sort key. Visibility map: PostgreSQL must consult the visibility map to confirm rows are visible to the current transaction — heap access may still occur if the visibility map indicates uncertainty.",
    deep:
      "The INCLUDE clause (PostgreSQL 11+, SQL Server since 2005) is a game changer — it stores extra columns in the leaf pages without bloating the internal tree nodes (which would slow down index traversal). INCLUDEd columns can't be used for filtering or ordering, only for covering. In MySQL, secondary indexes always include the primary key, making them implicitly covering for queries selecting PK columns. Covering indexes can significantly reduce I/O for OLAP-style queries on OLTP tables — a well-designed covering index on a reporting query can turn a multi-second full-table scan into a millisecond index-only scan.",
    interviewAnswer:
      "Covering indexes are my primary tuning tool for high-frequency read queries. I add columns to the INCLUDE clause to enable index-only scans. For a query like 'get user's order count and total amount by status', an index on (user_id, status) INCLUDE (amount) turns a heap scan into an index-only scan. I check EXPLAIN output for 'Index Only Scan' to confirm.",
    trap:
      "Over-including columns in indexes, making them huge. Wide covering indexes consume more memory (buffer pool), slow down writes, and may not fit hot data in cache. Include only the columns needed for the specific high-frequency query pattern.",
    memoryAnchor:
      "A covering index is a self-contained answer sheet — all the answers (columns) are on the sheet itself (index leaf), no need to look up the textbook (heap). INCLUDE columns are bonus answers appended to the sheet that don't affect how the sheet is sorted.",
  },
  {
    id: "explain-analyze",
    title: "EXPLAIN ANALYZE",
    category: "indexes",
    basic:
      "EXPLAIN shows the query plan the planner chose without executing the query. EXPLAIN ANALYZE actually executes the query and shows actual row counts, timings, and loop counts alongside the planner's estimates. The difference between estimates and actuals reveals planner mistakes.",
    expected:
      "Key EXPLAIN nodes: Seq Scan (full table scan), Index Scan (random I/O via index), Index Only Scan (all data in index), Bitmap Heap Scan (index then sorted heap access), Hash Join / Merge Join / Nested Loop (join algorithms), Sort (explicit sort), Hash Aggregate / Group Aggregate (aggregation). Read bottom-up — innermost nodes execute first. 'rows=X' is the estimate; 'actual rows=X' is truth. Huge discrepancy (off by 10x+) indicates stale statistics — run ANALYZE.",
    deep:
      "EXPLAIN (ANALYZE, BUFFERS) shows buffer hit/miss counts — crucial for I/O analysis. Shared Buffers Hit: served from cache. Shared Read: read from disk. High read count for a simple query suggests a missing index or cold cache. EXPLAIN (ANALYZE, FORMAT JSON) provides machine-readable output for tooling. Planning time vs Execution time: for very fast queries, planning overhead can dominate — use prepared statements to amortize planning. pg_stat_statements extension tracks cumulative statistics (total time, calls, mean time) across all executions — essential for production query tuning.",
    interviewAnswer:
      "EXPLAIN ANALYZE is my primary debugging tool. I read it bottom-up, looking for: (1) Seq Scan on large tables where an index should exist. (2) Huge estimate vs actual row discrepancy (stale statistics → run ANALYZE). (3) Nested Loop over large row counts (consider Hash Join). (4) Sort nodes that could be eliminated by index ORDER BY. Adding BUFFERS shows if the query is I/O-bound vs CPU-bound.",
    trap:
      "Running EXPLAIN ANALYZE on INSERT/UPDATE/DELETE to see the plan — it actually executes the DML, modifying your data. Wrap in a transaction and roll back: BEGIN; EXPLAIN ANALYZE UPDATE ...; ROLLBACK;",
    memoryAnchor:
      "EXPLAIN ANALYZE is a postmortem autopsy — EXPLAIN is the planned procedure, ANALYZE is what actually happened on the operating table. Read the notes bottom-up (innermost first) and compare expected vs actual blood loss (row counts).",
  },

  // ── Transactions & Isolation ──
  {
    id: "acid-properties",
    title: "ACID Properties",
    category: "transactions",
    basic:
      "ACID stands for Atomicity (all-or-nothing), Consistency (data remains valid per constraints), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes). These four properties define a reliable transaction.",
    expected:
      "Atomicity: if any statement in a transaction fails, all changes roll back. Consistency: transactions move the database from one valid state to another — constraints, triggers, and rules maintain invariants. Isolation: the degree to which concurrent transactions appear independent (controlled by isolation level). Durability: committed data is written to the WAL before the client receives acknowledgment, surviving power failure. ACID is implemented via WAL (durability), MVCC (isolation), constraint checking (consistency), and undo logging (atomicity).",
    deep:
      "NoSQL databases often trade ACID for availability and throughput — they offer BASE (Basically Available, Soft state, Eventual consistency). Distributed ACID (2PC — Two-Phase Commit) coordinates transactions across multiple nodes but introduces latency and availability risk (coordinator failure). Postgres' savepoints allow partial rollbacks within a transaction: SAVEPOINT my_save; ...; ROLLBACK TO my_save (retry part of a transaction without restarting the whole thing). DDL statements in PostgreSQL are transactional — you can CREATE TABLE, INSERT, and ROLLBACK all in one transaction. Most other databases (MySQL, Oracle) have implicit DDL commits.",
    interviewAnswer:
      "ACID guarantees reliable transactions. Atomicity prevents partial updates. Consistency enforces data invariants. Isolation controls concurrency anomalies. Durability ensures commits survive crashes via WAL. PostgreSQL implements all four natively. I explain the tradeoff: higher isolation = more correct but more contention. PostgreSQL's DDL is transactional, letting me develop migrations with rollback safety.",
    trap:
      "Confusing Consistency in ACID with Consistency in CAP theorem. ACID Consistency is about database constraint satisfaction. CAP Consistency is about all nodes seeing the same data simultaneously. They're completely different concepts.",
    memoryAnchor:
      "ACID is the integrity pledge: Atomicity (all or nothing — like a marriage vow), Consistency (data stays clean), Isolation (private booth at a restaurant — other tables don't hear your conversation), Durability (written in stone — survives the restaurant burning down).",
  },
  {
    id: "isolation-levels",
    title: "Transaction Isolation Levels",
    category: "transactions",
    basic:
      "SQL defines four isolation levels that control what anomalies concurrent transactions can see: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, and SERIALIZABLE. Higher isolation prevents more anomalies but increases contention.",
    expected:
      "Anomalies: Dirty Read (reading uncommitted changes — prevented at READ COMMITTED+), Non-Repeatable Read (reading same row twice gets different values — prevented at REPEATABLE READ+), Phantom Read (re-running a range query returns different rows — prevented at SERIALIZABLE). PostgreSQL default: READ COMMITTED. MySQL default: REPEATABLE READ. PostgreSQL's REPEATABLE READ is snapshot isolation (SI) — uses MVCC, not range locks. PostgreSQL SERIALIZABLE uses SSI (Serializable Snapshot Isolation), providing true serializability with minimal locking.",
    deep:
      "PostgreSQL doesn't implement READ UNCOMMITTED — it treats it as READ COMMITTED (dirty reads are never allowed). Snapshot Isolation (used by PostgreSQL's REPEATABLE READ): each transaction sees a snapshot of committed data at transaction start. This prevents non-repeatable reads and phantoms, but allows write skew — two transactions read overlapping rows, both decide to update, both commit, violating an invariant. SSI detects potential write skew patterns using the theory of serialization anomalies and aborts one conflicting transaction. The write skew example: two doctors simultaneously check on-call count (sees 2), both decide to go off-call, both commit — now 0 doctors on call (violates minimum 1 invariant). Only SERIALIZABLE prevents this.",
    interviewAnswer:
      "I use READ COMMITTED (PostgreSQL default) for most OLTP — it prevents dirty reads with minimal overhead. REPEATABLE READ for read-heavy analytics transactions that mustn't see concurrent updates mid-read. SERIALIZABLE for financial transactions with correctness invariants (no overdrafts, no double-booking). PostgreSQL's SSI provides true serializability without reader-writer blocking, which is a major advantage over traditional lock-based serialization.",
    trap:
      "Thinking REPEATABLE READ prevents all concurrency anomalies. Write skew is still possible under snapshot isolation (REPEATABLE READ). Only SERIALIZABLE prevents it — at the cost of potential serialization failures that require retries.",
    memoryAnchor:
      "Isolation levels are privacy curtains. READ COMMITTED: you see the finished paintings on the wall (committed). REPEATABLE READ: you photograph the wall at the start — updates don't change your photo. SERIALIZABLE: you're in a sealed room; nobody paints while you're there.",
  },
  {
    id: "mvcc",
    title: "MVCC (Multi-Version Concurrency Control)",
    category: "transactions",
    basic:
      "MVCC maintains multiple versions of each row, allowing readers and writers to operate concurrently without blocking each other. Readers see a consistent snapshot of committed data; writers create new row versions without overwriting old ones.",
    expected:
      "PostgreSQL MVCC: each row (heap tuple) has xmin (transaction that created it) and xmax (transaction that deleted/updated it). A reader's snapshot determines which tuples are visible based on transaction IDs. UPDATE creates a new tuple with xmin = current transaction, sets xmax = current transaction on the old tuple. Old tuple versions accumulate as 'dead tuples' until VACUUM reclaims them. This is why PostgreSQL needs regular vacuuming; MySQL (InnoDB) stores old versions in a separate undo log segment.",
    deep:
      "Transaction ID wraparound is an existential PostgreSQL risk: XIDs are 32-bit integers (~2 billion). When wrapping around, old tuples appear 'in the future' — all data becomes invisible. PostgreSQL freezes old tuples (marks them as always visible) via autovacuum to prevent wraparound. pg_database.age(datfrozenxid) tracks how close a database is to wraparound — if it approaches 2 billion, emergency VACUUM FREEZE is needed. Bloat: high update/delete workloads create many dead tuples, inflating table/index size, slowing sequential scans, and wasting disk. pg_repack rebuilds tables online without a full lock.",
    interviewAnswer:
      "MVCC enables readers and writers to never block each other by keeping multiple row versions. Readers see a consistent snapshot; writers create new versions. The tradeoff is dead tuple bloat that requires regular vacuuming. I monitor pg_stat_user_tables for n_dead_tup and ensure autovacuum runs frequently on high-churn tables. Transaction ID wraparound is a critical operational concern — I set up monitoring on datfrozenxid age.",
    trap:
      "Thinking VACUUM is optional. Without regular vacuuming, dead tuples accumulate (table bloat), sequential scans slow, and eventually XID wraparound causes catastrophic data loss. Autovacuum must be tuned for high-churn tables.",
    memoryAnchor:
      "MVCC is a multi-draft document system — every edit creates a new draft (row version). Readers read the last approved draft (snapshot). Old drafts pile up in the filing cabinet (dead tuples). VACUUM is the intern who shreds old drafts to free up cabinet space.",
  },
  {
    id: "deadlocks",
    title: "Deadlocks & Lock Types",
    category: "transactions",
    basic:
      "A deadlock occurs when two transactions each hold a lock the other needs, waiting forever. PostgreSQL detects deadlocks and aborts one transaction with an error. Deadlocks are always caused by inconsistent lock ordering.",
    expected:
      "PostgreSQL lock types: ShareLock (SELECT FOR SHARE), ShareRowExclusiveLock, ExclusiveLock (for index updates), AccessExclusiveLock (for ALTER TABLE, VACUUM FULL — blocks all access). Row-level locks: FOR UPDATE (exclusive row lock), FOR NO KEY UPDATE, FOR SHARE, FOR KEY SHARE. Lock queues: a long-running transaction holding a lock causes all subsequent requests to queue, even readers (with AccessExclusiveLock). Prevention: always acquire locks in a consistent order across transactions (alphabetical table order, ascending ID order).",
    deep:
      "Deadlock example: T1 locks row A, then row B; T2 locks row B, then row A. They deadlock. Fix: both transactions must lock in the same order (A then B). PostgreSQL checks for deadlocks approximately every deadlock_timeout (default 1s) — don't reduce this to 0. Lock monitoring: pg_locks and pg_stat_activity reveal current locks and waiting queries. Aggressive locks: ALTER TABLE acquires AccessExclusiveLock — blocks all reads and writes for the duration. For zero-downtime schema changes: pg_repack, online DDL patterns (add nullable column first, then populate, then add constraint), or Percona Online Schema Change (MySQL). Advisory locks provide application-level locking (pg_advisory_lock) without associating to rows — useful for distributed coordination.",
    interviewAnswer:
      "Deadlocks happen when transactions acquire locks in different orders. Prevention: consistent lock ordering (always lock tables and rows in the same sequence). Detection: PostgreSQL automatically resolves them by aborting one transaction. For production, I monitor pg_locks for long-held locks, set statement_timeout to prevent runaway queries, and design migrations as non-blocking (add nullable columns, populate in batches, then add constraints).",
    trap:
      "Running ALTER TABLE on a large production table without preparation. It acquires AccessExclusiveLock, blocking all reads and writes for potentially minutes. Use concurrent index creation (CREATE INDEX CONCURRENTLY) and stepwise migrations instead.",
    memoryAnchor:
      "Deadlock is two cars at an intersection, each blocking the other, neither able to move. PostgreSQL is the traffic cop who flips a coin and sends one car backward (aborts transaction). Prevention: build a roundabout (consistent lock order).",
  },

  // ── Performance Tuning ──
  {
    id: "partitioning",
    title: "Table Partitioning",
    category: "performance",
    basic:
      "Partitioning splits a large table into smaller physical pieces (partitions) based on a key column. Queries that filter on the partition key only scan relevant partitions (partition pruning), dramatically reducing I/O.",
    expected:
      "PostgreSQL partition types: RANGE (date ranges — monthly partitions for time-series), LIST (discrete values — by country or status), HASH (even distribution by hash — for tables without a natural range key). Partition pruning: the planner eliminates irrelevant partitions when the filter uses the partition key. Local indexes: each partition has its own index — smaller, more cache-friendly than a monolithic index. Constraint exclusion and partition pruning must be enabled. Operations on a partition (VACUUM, ANALYZE, index rebuild) run independently, improving maintenance parallelism.",
    deep:
      "Partitioning enables dropping old data instantly: DROP TABLE orders_2022 is O(1) vs DELETE FROM orders WHERE year = 2022 which is O(n) with MVCC overhead. Partition-wise join (PostgreSQL 11+): when joining two partitioned tables on the partition key, the planner can join matching partitions independently in parallel. Sub-partitioning: partition by year, then sub-partition each year's partition by month. Partition overhead: the planner must visit each partition's metadata on every query — large numbers of partitions (>1000) can slow planning time significantly. pg_partman extension automates partition creation and maintenance.",
    interviewAnswer:
      "Partitioning is essential for time-series tables (logs, events, orders by date). I use RANGE partitioning by month with automatic partition creation via pg_partman. Old partition dropping (DROP TABLE monthly_partition) is instantaneous vs DELETE. Partition pruning eliminates irrelevant month scans. I keep partition counts reasonable (<500) to avoid slow planning time.",
    trap:
      "Partitioning without filtering on the partition key in queries. Without a WHERE clause on the partition key, PostgreSQL scans ALL partitions — worse than a single table with an index because of the per-partition overhead.",
    memoryAnchor:
      "Partitioning is a filing cabinet with labeled drawers (2024-Jan, 2024-Feb). Searching for January files? Open only the January drawer (partition pruning). Archiving 2022? Pull out the 2022 drawer and discard it (DROP PARTITION).",
  },
  {
    id: "materialized-views",
    title: "Materialized Views",
    category: "performance",
    basic:
      "A materialized view stores the result of a query on disk, like a precomputed cache. Queries against it are instant (no aggregation needed), but the data may be stale until refreshed. REFRESH MATERIALIZED VIEW updates it.",
    expected:
      "Regular views are just named queries — no stored data, no performance benefit (the planner inlines them). Materialized views physically store the result. REFRESH MATERIALIZED VIEW CONCURRENTLY updates data without locking out readers (requires a unique index on the view). Use cases: expensive aggregations over large tables (monthly sales totals), pre-joining tables for reporting, computing OLAP metrics from OLTP data. Freshness tradeoff: refresh more frequently for more current data, less frequently for less compute overhead.",
    deep:
      "REFRESH MATERIALIZED VIEW (without CONCURRENTLY) acquires an ExclusiveLock — blocking all reads during refresh. CONCURRENTLY computes the new result separately, then diffs and applies changes, releasing the old version only when the new one is ready. No blocking reads, but twice the compute and time. Automating refreshes: pg_cron or external schedulers (cron, Airflow) trigger REFRESH on a schedule. Incremental materialized views (full incremental maintenance) aren't natively supported in PostgreSQL — the entire view is recomputed on each refresh. Solutions: dbt (models as materialized views with incremental refresh logic), Materialize (streaming SQL, continuously updated), or application-level incremental aggregation tables.",
    interviewAnswer:
      "Materialized views are my go-to for expensive reports that run frequently. I create a unique index on the view and use REFRESH CONCURRENTLY to avoid blocking reads. I schedule refreshes via pg_cron — every hour for dashboards, nightly for heavy aggregations. For real-time freshness needs, I layer an application-level incremental table updated by triggers or CDC rather than refreshing the entire materialized view.",
    trap:
      "Refreshing a large materialized view without CONCURRENTLY in a production system. It acquires an ExclusiveLock, blocking all reads for the duration — potentially minutes for large views.",
    memoryAnchor:
      "A materialized view is a printed report filed in a drawer — instant to read (no computation), but potentially outdated. REFRESH is printing a new report. CONCURRENTLY is printing it in the back room and swapping it in the drawer without disturbing people reading the current one.",
  },
  {
    id: "vacuum-autovacuum",
    title: "VACUUM & Autovacuum",
    category: "performance",
    basic:
      "VACUUM reclaims storage occupied by dead tuples left by MVCC (after UPDATE and DELETE). VACUUM FULL rewrites the entire table (compacts it, but requires an exclusive lock). Autovacuum runs VACUUM automatically based on configurable thresholds.",
    expected:
      "VACUUM marks dead tuple space as reusable (doesn't return it to OS). VACUUM FULL compacts the table and returns space to OS, but blocks all access. ANALYZE updates the table statistics used by the query planner — outdated statistics cause bad plans. VACUUM ANALYZE does both. Autovacuum triggers when dead tuples exceed: autovacuum_vacuum_threshold (default 50) + autovacuum_vacuum_scale_factor (default 0.2 = 20% of rows) dead tuples. For high-churn tables, lower scale_factor to trigger more frequent vacuuming.",
    deep:
      "The two critical functions of VACUUM: (1) Reclaim dead tuple space to prevent table bloat. (2) Advance the oldest transaction horizon to prevent XID wraparound. pg_stat_user_tables tracks n_live_tup, n_dead_tup, last_autovacuum, last_analyze — monitor these to ensure autovacuum keeps up. Autovacuum can be overwhelmed by very high write rates — increase autovacuum_max_workers and autovacuum_vacuum_cost_delay. Bloat estimation: use the pgstattuple extension or community queries on pg_class. pg_repack rebuilds bloated tables online (no full lock, unlike CLUSTER or VACUUM FULL).",
    interviewAnswer:
      "Autovacuum is critical for PostgreSQL health — it prevents table bloat and XID wraparound. I tune autovacuum_vacuum_scale_factor lower (0.01–0.05) for large, high-churn tables so it runs more frequently before bloat accumulates. I monitor pg_stat_user_tables for n_dead_tup and last_autovacuum. If a table is already badly bloated, I use pg_repack for online repack without service disruption.",
    trap:
      "Disabling autovacuum to improve write performance. This is catastrophically wrong — dead tuples accumulate, queries slow, and eventually XID wraparound causes total data loss. Tune autovacuum instead of disabling it.",
    memoryAnchor:
      "VACUUM is a street sweeper for dead data — it clears debris (dead tuples) from the road (table pages) so future traffic (queries) moves faster. Autovacuum is a scheduled street-cleaning service. XID wraparound is what happens if the street is never cleaned — the city floods.",
  },

  // ── Advanced SQL ──
  {
    id: "lateral-joins",
    title: "LATERAL Joins",
    category: "advanced-sql",
    basic:
      "LATERAL allows a subquery in FROM to reference columns from earlier items in the FROM clause — it's a correlated subquery that can return multiple rows and be used as a joined table. Each outer row produces a different subquery result.",
    expected:
      "Without LATERAL, subqueries in FROM cannot reference outer table columns. With LATERAL: SELECT u.name, last_orders.total FROM users u, LATERAL (SELECT SUM(amount) AS total FROM orders WHERE user_id = u.id ORDER BY created_at DESC LIMIT 3) last_orders. Common uses: top-N per group (LATERAL with LIMIT), unnesting arrays with a function (generate_series, unnest), calling set-returning functions per row. LATERAL JOIN vs CROSS JOIN LATERAL: both work; LEFT JOIN LATERAL ... ON TRUE returns the outer row even if the subquery returns no rows.",
    deep:
      "LATERAL is the SQL equivalent of a flatMap operation — for each outer row, produce zero or more rows from the subquery. This enables patterns impossible with standard joins: 'for each user, find their most recent 5 orders' using LATERAL with LIMIT (not achievable with a window function inside a join without a subquery). LATERAL with unnest: SELECT id, tag FROM articles, LATERAL unnest(tags) AS tag — normalizes an array column into rows. LATERAL with set-returning functions enables table-valued function calls per row. Performance: LATERAL is essentially a correlated subquery — each outer row triggers one execution of the subquery. Index on the correlated column (user_id in the example) is critical.",
    interviewAnswer:
      "LATERAL is my go-to for top-N per group and per-row function calls. For 'last 3 orders per user': JOIN LATERAL (SELECT * FROM orders WHERE user_id = u.id ORDER BY created_at DESC LIMIT 3) last ON TRUE. The index on orders.user_id makes this fast. Without LATERAL, this requires ROW_NUMBER() OVER (...) in a subquery, which is fine but LATERAL is often more readable.",
    trap:
      "Using LATERAL without an index on the correlated column. Since the subquery runs once per outer row, a sequential scan of orders for each user produces O(users × orders) — catastrophically slow. Index on the join condition column is mandatory.",
    memoryAnchor:
      "LATERAL is a correlated subquery that's allowed to sit at the table. Regular FROM subqueries are strangers who must answer your question without knowing anything about you. LATERAL subqueries know exactly who you are (outer row columns) and tailor their answer.",
  },
  {
    id: "json-jsonb",
    title: "JSON & JSONB in PostgreSQL",
    category: "advanced-sql",
    basic:
      "PostgreSQL supports JSON (stored as text, exact whitespace preserved) and JSONB (stored in binary format, deduplicates keys, supports indexing). JSONB is almost always preferred for queryable, indexable JSON.",
    expected:
      "Key operators: -> returns JSON element (as JSON), ->> returns text, #> for path, #>> for path as text. Array access: data->0, data->'key'. JSONB-specific: @> (contains), <@ (contained by), ? (key exists), ?| (any key exists), ?& (all keys exist). Indexing JSONB: GIN index on the entire column for @>, ?, operators. Functional index on specific path for equality: CREATE INDEX ON users ((data->>'email')). jsonb_each, jsonb_array_elements expand JSONB to rows.",
    deep:
      "JSONB uses a binary decomposed format that supports efficient operations: GIN indexes enable containment queries (@>) across millions of documents. jsonb_path_query (PostgreSQL 12+) implements SQL/JSON Path Language for complex traversals: SELECT * FROM data WHERE jsonb_path_exists(doc, '$.items[*].price ? (@ > 100)'). JSONB can partially simulate a document store pattern — store semi-structured data in a JSONB column on a relational table for flexibility without full schema commitment. The JSONB GIN index can be created with gin_trgm_ops for trigram search on text fields inside JSON. For read-heavy workloads, GENERATED COLUMNS can extract frequently queried JSONB fields to regular columns with a regular B-tree index.",
    interviewAnswer:
      "I use JSONB for JSON storage — it's binary-optimized and supports GIN indexes for containment queries. Common pattern: store flexible metadata in a JSONB column on a relational table with a GIN index for @> queries. For high-cardinality JSONB fields queried frequently, I add a functional index on the extracted path: CREATE INDEX ON users ((data->>'email')). Generated columns can promote JSONB fields to first-class columns with B-tree indexes.",
    trap:
      "Storing deeply nested arrays in JSONB and querying them with @> on every request without a GIN index. @> without a GIN index is a full-table scan of JSONB data — very slow. Always create a GIN index when using @>, ?, or containment operators.",
    memoryAnchor:
      "JSONB is a filing cabinet with smart labels — you can find documents by what they contain (@>) if you set up the label system (GIN index). JSON is a plain text file — you read every word to find what you want.",
  },
  {
    id: "upsert-on-conflict",
    title: "UPSERT & ON CONFLICT",
    category: "advanced-sql",
    basic:
      "UPSERT inserts a row if it doesn't exist, or updates it if it does — atomically, without a race condition. PostgreSQL implements it with INSERT ... ON CONFLICT.",
    expected:
      "Syntax: INSERT INTO users (id, name, updated_at) VALUES (1, 'Alice', NOW()) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, updated_at = EXCLUDED.updated_at. EXCLUDED refers to the row that would have been inserted. ON CONFLICT DO NOTHING ignores conflicts without updating. The conflict target can be a column, columns, or a constraint name (ON CONFLICT ON CONSTRAINT uk_email). UPSERT is atomic — no race condition between checking existence and inserting.",
    deep:
      "UPSERT uses an internal 'speculative insertion' — it attempts the INSERT, and on conflict, falls back to UPDATE without releasing the row lock. This prevents the read-then-write race condition of application-level check-then-insert. The UPDATE in ON CONFLICT can reference complex expressions: SET count = users.count + 1 for increment patterns. For batch upserts, insert multiple rows in one INSERT ... ON CONFLICT statement — much faster than individual upserts. Conditional UPSERT: ON CONFLICT DO UPDATE WHERE condition — only update if the condition is true (e.g., only update if the new value is higher).",
    interviewAnswer:
      "INSERT ... ON CONFLICT is my go-to for idempotent write operations — event processing, data ingestion, syncing. It eliminates the check-then-insert race condition and works atomically. I use ON CONFLICT DO NOTHING for 'insert if not exists' and ON CONFLICT DO UPDATE SET ... = EXCLUDED.column for full upsert semantics. For increment patterns: ON CONFLICT DO UPDATE SET count = table.count + 1.",
    trap:
      "Using an application-level 'check then insert' pattern (SELECT → if not found → INSERT) as an alternative. This has a race condition — two concurrent transactions both see no row and both insert, causing a duplicate key error or data loss.",
    memoryAnchor:
      "UPSERT is a bouncer with a VIP list — if you're already on the list (conflict), the bouncer updates your table (DO UPDATE). If not, you get added (INSERT). No two bouncers argue about who checks first — it's atomic.",
  },

  // ── Database Internals ──
  {
    id: "wal-durability",
    title: "WAL (Write-Ahead Log)",
    category: "internals",
    basic:
      "WAL (Write-Ahead Log) is PostgreSQL's mechanism for durability. All changes are written to the WAL (append-only log on disk) before being applied to data files. On crash recovery, PostgreSQL replays the WAL to restore the committed state.",
    expected:
      "WAL guarantees durability (the D in ACID): before reporting a COMMIT to the client, PostgreSQL flushes the WAL record to disk (fsync). The actual data file changes can be deferred — the WAL is the source of truth for recovery. Streaming replication: WAL segments are streamed to standby servers that replay them, maintaining a hot standby. Logical replication: WAL decoding interprets WAL records as row-level changes (INSERT/UPDATE/DELETE) for replication to heterogeneous systems (Debezium, Kafka CDC). checkpoint_completion_target controls how aggressively PostgreSQL writes dirty buffers to data files.",
    deep:
      "WAL LSN (Log Sequence Number): monotonically increasing pointer into the WAL stream. pg_current_wal_lsn() returns the current write position. Replication lag: replica_lag = primary_lsn - replica_received_lsn. WAL archives: pg_basebackup + WAL archiving provides PITR (Point-in-Time Recovery) — replay WAL from a base backup to any point in time. wal_level: minimal (no replication), replica (streaming replication), logical (logical decoding for CDC). synchronous_commit: on (flush WAL to replica), remote_apply (wait for replica to apply), off (async — faster but risks data loss on primary failure). WAL writer and checkpointer are background processes that balance durability and I/O pressure.",
    interviewAnswer:
      "WAL is what makes PostgreSQL durable — all commits are written to the sequential WAL before acknowledging success. On crash, replay from last checkpoint restores committed state. I use WAL-based streaming replication for standby databases and logical replication (Debezium) to stream changes to Kafka. For PITR, I archive WAL segments to S3 and take base backups — recoverable to any point in time.",
    trap:
      "Setting synchronous_commit = off for performance thinking it's safe. It risks losing the last few milliseconds of commits on primary failure (the WAL isn't flushed to disk before acknowledging). For financial data, always use synchronous_commit = on.",
    memoryAnchor:
      "WAL is a flight recorder (black box) — before the plane moves (data changes), the recorder logs the action. If the plane crashes (server failure), investigators (recovery) replay the recording to reconstruct exactly what happened.",
  },
  {
    id: "buffer-pool",
    title: "Buffer Pool & Shared Buffers",
    category: "internals",
    basic:
      "The buffer pool (shared_buffers in PostgreSQL) is an in-memory cache of database pages (8KB each). Frequently accessed pages stay in memory, avoiding disk I/O. Larger shared_buffers means more cache hits and faster queries.",
    expected:
      "PostgreSQL recommended setting: shared_buffers = 25% of RAM (OS page cache handles the rest). Cache hit rate: (shared buffers hits) / (shared buffers hits + reads from disk). Target > 99% for OLTP. Page replacement policy: PostgreSQL uses a clock-sweep algorithm (simpler than LRU). The OS page cache is a second caching layer — PostgreSQL I/O goes to OS cache before disk. This double-caching means effective_cache_size (planning hint, not allocation) should be set to total RAM for the planner to use optimistic I/O estimates. Random I/O is expensive on spinning disks (HDD) but cheap on SSDs — this changes index scan vs seq scan decisions significantly.",
    deep:
      "Buffer pool internals: each 8KB page has a buffer descriptor with pin count (how many backend processes hold it), dirty flag, and usage count (for clock-sweep eviction). Large shared_buffers doesn't always help — too large reduces OS page cache available for WAL and temporary sort files. PostgreSQL 14+ reduced buffer pool contention with per-partition buffer table. pg_buffercache extension reveals which relations occupy buffer pool pages. Huge pages (Linux THP) reduce TLB pressure for large shared_buffers. For read-heavy workloads, PgBouncer connection pooling reduces the overhead of too many backends all holding buffer pins.",
    interviewAnswer:
      "I set shared_buffers to 25% of RAM and effective_cache_size to 75% (for planner cost estimates). I monitor cache hit rate via pg_stat_bgwriter — target > 99%. For SSD-backed databases, the planner's I/O cost assumptions may be too pessimistic — I tune random_page_cost down (1.1 for SSDs vs 4.0 default) to encourage index scans over sequential scans.",
    trap:
      "Setting shared_buffers to 80% of RAM. This starves the OS page cache needed for WAL and temp files, causing unexpected disk I/O. Keep it at 25%.",
    memoryAnchor:
      "Shared buffers is the RAM cache on your desk — pages you worked on recently sit there for quick access. The OS page cache is a larger filing cabinet in the same room. Disk is the warehouse outside — slow to walk to.",
  },
];

// ─── Interview Patterns ───────────────────────────────────────────────────────
const interviewPatterns: InterviewPattern[] = [
  {
    question: "Find the top 3 salaries per department.",
    answer:
      "WITH ranked AS (SELECT name, department, salary, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk FROM employees) SELECT name, department, salary FROM ranked WHERE rnk <= 3. Use DENSE_RANK (not ROW_NUMBER) so ties at rank 3 both appear. Use ROW_NUMBER if you need exactly 3 rows per department regardless of ties.",
    whyAsked: "Classic window function question testing PARTITION BY, ranking functions, and tie-handling awareness.",
    trap: "Using ROW_NUMBER when DENSE_RANK is semantically correct for leaderboards. Also, many candidates attempt a self-join or correlated subquery instead of window functions, which is far less readable.",
  },
  {
    question: "Explain the difference between RANK, DENSE_RANK, and ROW_NUMBER.",
    answer:
      "For values [100, 100, 80]: ROW_NUMBER assigns (1, 2, 3) — always unique, arbitrary for ties. RANK assigns (1, 1, 3) — ties share rank, next rank skips. DENSE_RANK assigns (1, 1, 2) — ties share rank, next rank doesn't skip. Use ROW_NUMBER for top-N where uniqueness is required, RANK/DENSE_RANK when ties are semantically meaningful.",
    whyAsked: "Tests window function knowledge — a staple of SQL interviews at every level.",
    trap: "Confusing RANK and DENSE_RANK. The 'dense' refers to no gaps in ranks after ties.",
  },
  {
    question: "How do you design an index for a query with both equality and range filters?",
    answer:
      "Put equality columns first, range column last. For WHERE status = 'active' AND created_at > '2024-01-01': index on (status, created_at). The planner can use the index to seek to status='active' entries, then range-scan on created_at. Reversing the order (created_at, status) would force a full range scan on created_at before filtering by status — far less efficient.",
    whyAsked: "Tests practical index design knowledge, one of the most impactful performance skills.",
    trap: "Thinking a range column as the leading column of a composite index is equivalent. It's not — range on the leading column prevents efficient filtering on subsequent columns.",
  },
  {
    question: "What is the difference between DELETE and TRUNCATE?",
    answer:
      "DELETE removes rows one by one, creates WAL records for each, fires triggers, and is MVCC-aware (rows become dead tuples, visible to concurrent transactions until committed). Slow for large tables. TRUNCATE drops and recreates the table's data pages instantly, is DDL (transactional in PostgreSQL), doesn't fire row-level triggers, and resets sequences. TRUNCATE is not permitted for tables referenced by foreign keys (unless CASCADE). For large tables, TRUNCATE is orders of magnitude faster.",
    whyAsked: "Tests understanding of table operations, MVCC, and when to use each.",
    trap: "Thinking TRUNCATE is non-transactional. In PostgreSQL, TRUNCATE is DDL but IS transactional — you can rollback a TRUNCATE. In MySQL, TRUNCATE is DDL with an implicit commit and cannot be rolled back.",
  },
  {
    question: "How do CTEs interact with the query planner in PostgreSQL?",
    answer:
      "In PostgreSQL 12+, non-recursive CTEs without side effects are inlined by default — the planner treats them like subqueries and can push predicates inside them. In PostgreSQL < 12, CTEs were always materialized (evaluated once, result stored) — an 'optimization fence'. WITH MATERIALIZED forces materialization (useful when the CTE is referenced multiple times and you want to pay the cost once). WITH NOT MATERIALIZED forces inlining.",
    whyAsked: "Advanced question testing PostgreSQL-specific CTE behavior and ability to reason about planner behavior.",
    trap: "Assuming CTEs always create a temporary table. In modern PostgreSQL, they're usually inlined. Candidates who learned SQL pre-PostgreSQL 12 often have this misconception.",
  },
  {
    question: "How would you detect and handle deadlocks in PostgreSQL?",
    answer:
      "Prevention: acquire locks in consistent order (always lock resources alphabetically or by ascending ID). Detection: PostgreSQL automatically detects deadlocks after deadlock_timeout (default 1s) and aborts one transaction with error code 40P01. Application-level: catch the error and retry. Monitoring: pg_locks joined with pg_stat_activity shows current lock holders and waiters. pg_stat_activity.wait_event_type = 'Lock' identifies blocked queries. Long-running transactions are the primary cause — set statement_timeout and lock_timeout to bound damage.",
    whyAsked: "Tests understanding of concurrency control, a critical production operations topic.",
    trap: "Thinking deadlocks are always bugs to be fixed. Deadlocks are a natural consequence of concurrent access — robust applications must handle them with retry logic.",
  },
  {
    question: "What are the different isolation levels and what anomalies does each prevent?",
    answer:
      "READ UNCOMMITTED: allows dirty reads (PostgreSQL doesn't implement this — treats it as READ COMMITTED). READ COMMITTED (PG default): prevents dirty reads. REPEATABLE READ: prevents dirty reads + non-repeatable reads. Uses snapshot isolation in PostgreSQL — also prevents phantom reads (unlike SQL standard). SERIALIZABLE: prevents all anomalies including write skew — implemented via SSI in PostgreSQL without blocking reads.",
    whyAsked: "Core database theory question relevant to transaction design and debugging concurrency bugs.",
    trap: "Saying REPEATABLE READ in PostgreSQL allows phantom reads. PostgreSQL's snapshot isolation prevents phantoms at REPEATABLE READ. The SQL standard allows phantoms at REPEATABLE READ, but PostgreSQL goes further.",
  },
  {
    question: "How would you calculate a running total without window functions?",
    answer:
      "Self-join: SELECT a.date, SUM(b.amount) AS running_total FROM sales a JOIN sales b ON b.date <= a.date GROUP BY a.date ORDER BY a.date. This is O(n²) — every row joins against all preceding rows. With window functions: SELECT date, SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total. O(n) with incremental aggregation. The window function version is orders of magnitude faster for large datasets.",
    whyAsked: "Tests ability to solve problems with window functions and understand performance implications.",
    trap: "Not knowing the self-join approach at all (shows lack of SQL fundamentals) OR only knowing the self-join (shows unfamiliarity with window functions — a major gap).",
  },
];

// ─── Common Mistakes ──────────────────────────────────────────────────────────
const commonMistakes: CommonMistake[] = [
  {
    wrong: "SELECT * FROM orders WHERE customer_id NOT IN (SELECT id FROM customers) -- returns empty when customers has NULLs",
    correct: "Use NOT EXISTS: SELECT * FROM orders o WHERE NOT EXISTS (SELECT 1 FROM customers c WHERE c.id = o.customer_id). NOT EXISTS is null-safe.",
  },
  {
    wrong: "SELECT department, AVG(salary) FROM employees WHERE AVG(salary) > 50000",
    correct: "Use HAVING for aggregate filters: SELECT department, AVG(salary) FROM employees GROUP BY department HAVING AVG(salary) > 50000.",
  },
  {
    wrong: "Using index on low-cardinality column (status VARCHAR with 3 values) expecting it to speed up range queries",
    correct: "Indexes on low-cardinality columns are often ignored by the planner. Use a partial index (WHERE status = 'active') or composite index with a high-cardinality leading column.",
  },
  {
    wrong: "Creating a composite index (a, b, c) and querying only on column b, expecting the index to be used",
    correct: "The leftmost prefix rule: index (a, b, c) is only used when the query filters on 'a' alone, 'a,b', or 'a,b,c'. A query on 'b' alone requires a separate index on (b).",
  },
  {
    wrong: "Using UNION instead of UNION ALL when duplicates aren't possible",
    correct: "UNION adds an expensive sort/hash deduplication step. When the result sets can't have duplicates (different ID ranges, different tables), always use UNION ALL.",
  },
  {
    wrong: "LAST_VALUE(salary) OVER (PARTITION BY dept ORDER BY hire_date) returning current row's value",
    correct: "Default frame ends at CURRENT ROW. Specify full frame: LAST_VALUE(salary) OVER (PARTITION BY dept ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING).",
  },
  {
    wrong: "Running EXPLAIN ANALYZE on an UPDATE query without a transaction to roll it back",
    correct: "Wrap in a transaction: BEGIN; EXPLAIN ANALYZE UPDATE ...; ROLLBACK; EXPLAIN ANALYZE executes DML — without ROLLBACK, you modify production data.",
  },
  {
    wrong: "Expecting an index on LOWER(email) to be used for WHERE email = 'alice@example.com'",
    correct: "An index on LOWER(email) is only used when querying LOWER(email) or using lower() in the predicate. For case-insensitive email search: WHERE LOWER(email) = LOWER('Alice@Example.com') or use a citext column.",
  },
  {
    wrong: "Using a correlated subquery for 'top N per group' without ROW_NUMBER",
    correct: "Use ROW_NUMBER() OVER (PARTITION BY group_col ORDER BY metric DESC) in a CTE, then filter WHERE rn <= N. Correlated subqueries for this are O(n²).",
  },
  {
    wrong: "Assuming DELETE and TRUNCATE are equivalent for large tables",
    correct: "DELETE is row-by-row with WAL and MVCC overhead — very slow for large tables. TRUNCATE drops and recreates data pages — O(1) regardless of row count. Use TRUNCATE when you want to empty a table completely.",
  },
  {
    wrong: "Setting ORDER BY inside a CTE or subquery expecting it to propagate to the outer query",
    correct: "ORDER BY inside a subquery or CTE has no guaranteed effect on the outer query — relational sets are unordered. Apply ORDER BY only in the final outer SELECT.",
  },
  {
    wrong: "Disabling autovacuum on a table to improve write performance",
    correct: "Tune autovacuum parameters instead (lower scale_factor, more workers). Disabling autovacuum causes table bloat, performance degradation, and eventual XID wraparound — a catastrophic failure mode.",
  },
];

// ─── Practice Questions ───────────────────────────────────────────────────────
const practiceQuestions: PracticeQuestion[] = [
  {
    code: `-- Table: employees (id, name, department, salary, hire_date)
-- Write a query to find, for each department:
-- 1. The top-earning employee
-- 2. The average salary
-- 3. How many employees earn above the department average`,
    question: "Solve all three requirements in a single query using window functions and CTEs.",
    answer: `WITH dept_stats AS (
  SELECT
    id, name, department, salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank,
    AVG(salary) OVER (PARTITION BY department) AS dept_avg
  FROM employees
)
SELECT
  department,
  MAX(CASE WHEN salary_rank = 1 THEN name END) AS top_earner,
  ROUND(MAX(dept_avg), 2) AS avg_salary,
  COUNT(CASE WHEN salary > dept_avg THEN 1 END) AS above_avg_count
FROM dept_stats
GROUP BY department;`,
  },
  {
    code: `-- Table: orders (id, customer_id, amount, created_at)
-- For each customer, calculate:
-- - Total amount
-- - Running total (cumulative sum ordered by date)
-- - Previous order's amount (LAG)
-- - Percentage of their total this order represents`,
    question: "Write the SQL query using window functions.",
    answer: `SELECT
  id,
  customer_id,
  amount,
  created_at,
  SUM(amount) OVER (
    PARTITION BY customer_id
    ORDER BY created_at
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total,
  LAG(amount) OVER (
    PARTITION BY customer_id
    ORDER BY created_at
  ) AS prev_order_amount,
  ROUND(
    amount * 100.0 / SUM(amount) OVER (PARTITION BY customer_id),
    2
  ) AS pct_of_total
FROM orders
ORDER BY customer_id, created_at;`,
  },
  {
    code: `-- Table: employees (id, name, manager_id, department)
-- manager_id references employees.id (NULL for CEO)
-- Find all employees under a specific manager (any depth)`,
    question: "Write a recursive CTE to traverse the org chart and find all reports under manager_id = 5.",
    answer: `WITH RECURSIVE reports AS (
  -- Base case: direct reports of manager 5
  SELECT id, name, manager_id, 1 AS depth
  FROM employees
  WHERE manager_id = 5

  UNION ALL

  -- Recursive case: reports of reports
  SELECT e.id, e.name, e.manager_id, r.depth + 1
  FROM employees e
  INNER JOIN reports r ON e.manager_id = r.id
)
SELECT id, name, depth
FROM reports
ORDER BY depth, name;
-- Add WHERE depth < 10 as cycle protection if graph data`,
  },
  {
    code: `-- You have this slow query (runs in 8 seconds):
SELECT u.name, COUNT(o.id) AS order_count, SUM(o.amount) AS total
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.country = 'US'
  AND o.created_at > '2024-01-01'
GROUP BY u.id, u.name
ORDER BY total DESC
LIMIT 20;

-- EXPLAIN ANALYZE shows: Seq Scan on orders (cost=0..890000 rows=5M)`,
    question: "What indexes would you create to speed up this query? Explain why each helps.",
    answer: `-- Index 1: Filter on users
CREATE INDEX idx_users_country ON users (country);
-- Allows index scan instead of seq scan on users for WHERE country = 'US'

-- Index 2: Composite on orders for join + filter (equality on user_id, range on created_at)
CREATE INDEX idx_orders_user_date ON orders (user_id, created_at)
  INCLUDE (amount);
-- user_id: equality join condition (leftmost = used for join)
-- created_at: range filter (after user_id equality filters)
-- INCLUDE amount: enables index-only scan (avoids heap fetch for SUM)

-- Verify with:
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;
-- Look for: Index Scan on users, Index Only Scan on orders, no Seq Scans`,
  },
  {
    code: `-- Table: sessions (user_id, event, created_at)
-- Detect users who performed events in sequence:
-- 'login' followed by 'purchase' within 1 hour
-- (both events exist for the user, purchase after login, within 1 hour)`,
    question: "Write the SQL to find these users using window functions or self-join.",
    answer: `-- Approach 1: Self-join (clear intent)
SELECT DISTINCT l.user_id
FROM sessions l
JOIN sessions p ON p.user_id = l.user_id
  AND p.event = 'purchase'
  AND p.created_at > l.created_at
  AND p.created_at <= l.created_at + INTERVAL '1 hour'
WHERE l.event = 'login';

-- Approach 2: Window function with LEAD
WITH next_event AS (
  SELECT
    user_id, event, created_at,
    LEAD(event) OVER (PARTITION BY user_id ORDER BY created_at) AS next_event,
    LEAD(created_at) OVER (PARTITION BY user_id ORDER BY created_at) AS next_time
  FROM sessions
)
SELECT DISTINCT user_id
FROM next_event
WHERE event = 'login'
  AND next_event = 'purchase'
  AND next_time <= created_at + INTERVAL '1 hour';`,
  },
  {
    code: `-- Explain what this query does and identify the potential issue:
SELECT *
FROM products
WHERE id NOT IN (
  SELECT product_id
  FROM order_items
  WHERE product_id IS NOT NULL
);`,
    question: "What does this query find? Is there a problem? How would you rewrite it safely?",
    answer: `-- Intent: find products with no order items (products never ordered)
-- Problem: NOT IN with NULLs is dangerous. While this query has IS NOT NULL,
-- the pattern is fragile — if that filter is ever removed, ANY NULL in the
-- subquery makes NOT IN return no rows (NULL comparison propagates).
-- More fundamentally, NOT IN with a subquery is generally slower than NOT EXISTS.

-- Safe rewrite using NOT EXISTS (null-safe, often faster):
SELECT *
FROM products p
WHERE NOT EXISTS (
  SELECT 1 FROM order_items oi
  WHERE oi.product_id = p.id
);

-- Alternative using LEFT JOIN:
SELECT p.*
FROM products p
LEFT JOIN order_items oi ON oi.product_id = p.id
WHERE oi.product_id IS NULL;
-- Index on order_items.product_id is critical for both approaches.`,
  },
];

// ─── Last Hour Summary ────────────────────────────────────────────────────────
const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "Window functions (OVER clause) compute aggregates per partition without collapsing rows — essential for ranking, running totals, LAG/LEAD comparisons",
    "Composite index column order: equality columns before range columns; leftmost prefix rule — index (a,b,c) is usable for filters on a, (a,b), or (a,b,c) only",
    "NOT IN with NULLs in the subquery returns empty set — always prefer NOT EXISTS for anti-joins",
    "Isolation levels: READ COMMITTED (PG default) prevents dirty reads; REPEATABLE READ (snapshot) also prevents phantoms in PG; SERIALIZABLE prevents write skew",
    "MVCC creates dead tuples on UPDATE/DELETE — autovacuum must run to prevent bloat and XID wraparound; never disable it",
    "CTEs in PostgreSQL 12+ are inlined by default (not always materialized) — use WITH MATERIALIZED to force caching when referenced multiple times",
    "EXPLAIN ANALYZE: read bottom-up; compare estimated vs actual rows; huge discrepancy means stale statistics → ANALYZE",
  ],
  mustKnowConcepts: [
    { name: "Window Functions OVER()", oneLiner: "Aggregate/rank over a partition without collapsing rows; PARTITION BY groups, ORDER BY determines position, ROWS frame limits scope" },
    { name: "ROW_NUMBER vs RANK vs DENSE_RANK", oneLiner: "ROW_NUMBER: always unique. RANK: ties share rank, next skips. DENSE_RANK: ties share rank, no skips" },
    { name: "LAG / LEAD", oneLiner: "Access previous/next row's value within partition; requires ORDER BY; critical for period-over-period comparisons" },
    { name: "Composite Index Column Order", oneLiner: "Equality columns first, range column last; leftmost prefix rule determines which queries can use the index" },
    { name: "EXPLAIN ANALYZE", oneLiner: "Executes query and shows actual rows vs estimates; read bottom-up; large discrepancy = stale stats" },
    { name: "NOT IN vs NOT EXISTS", oneLiner: "NOT IN returns empty set if subquery has ANY NULL; NOT EXISTS is null-safe and usually faster — always prefer it for anti-joins" },
    { name: "Isolation Levels", oneLiner: "READ COMMITTED → dirty read safe. REPEATABLE READ → non-repeatable read + phantom safe (PG). SERIALIZABLE → write skew safe" },
    { name: "MVCC & VACUUM", oneLiner: "UPDATE/DELETE create dead tuples; VACUUM reclaims space and prevents XID wraparound; autovacuum must be tuned, never disabled" },
    { name: "Recursive CTEs", oneLiner: "Base case UNION ALL recursive term; traverses hierarchies; add depth limit for cycle protection on graph data" },
    { name: "Covering Index (INCLUDE)", oneLiner: "Include query columns in index leaf pages for index-only scans; INCLUDE columns aren't sorted, just stored for coverage" },
  ],
  topTraps: [
    "NOT IN with a subquery that can contain NULLs — returns empty set for ALL outer rows; use NOT EXISTS always",
    "LAST_VALUE without full frame spec — default frame ends at CURRENT ROW, making LAST_VALUE return the current value, not the partition's last",
    "Composite index with range column leading — (created_at, user_id) can't efficiently filter on user_id; reverse to (user_id, created_at)",
    "EXPLAIN ANALYZE on UPDATE/DELETE without a transaction wrapper — it actually executes the DML and modifies data",
    "Disabling autovacuum for performance — leads to table bloat, slow scans, and eventual XID wraparound catastrophe",
    "Assuming CTEs always materialize in modern PostgreSQL — they're inlined by default in PG12+; use WITH MATERIALIZED to explicitly force it",
  ],
};

// ─── Last Hour Concept IDs ────────────────────────────────────────────────────
const lastHourConceptIds: string[] = [
  "ranking-functions",
  "lag-lead",
  "running-totals-frames",
  "partition-order",
  "btree-indexes",
  "composite-indexes",
  "explain-analyze",
  "isolation-levels",
  "join-types",
  "recursive-cte",
  "mvcc",
  "cte-basics",
];

// ─── Export ───────────────────────────────────────────────────────────────────
export const topicData: TopicData = {
  topicTitle: "SQL Deep Dive",
  topicMeta: "45–60 min · Mid to Senior level",
  lastUpdated: "2026-04-10",
  lastHourConceptIds,
  lastHourSummary,
  mentalModel,
  categories,
  mentalModelTree,
  concepts,
  interviewPatterns,
  commonMistakes,
  practiceQuestions,
};
