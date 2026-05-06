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

const mentalModel: MentalModel = {
  whatItIs:
    "Node.js is a JavaScript runtime built on Chrome's V8 engine, using libuv for asynchronous, event-driven, non-blocking I/O. It runs JavaScript on a single main thread but delegates I/O operations to the OS or a thread pool, receiving results via an event loop that continuously checks for completed work.",
  whyItExists:
    "Traditional web servers spawned a new thread (or process) per request, which was expensive in memory and context-switching. Node.js was designed to handle massive I/O concurrency—thousands of simultaneous connections—without the overhead of threads, making it ideal for real-time APIs, streaming, and microservices.",
  whenToUse: [
    "High-concurrency I/O-bound workloads: REST APIs, GraphQL servers, WebSockets, chat applications",
    "Streaming data: file uploads, media processing pipelines, real-time event feeds",
    "Serverless functions and edge compute where cold-start time and memory footprint matter",
    "Microservices that need fast startup and low baseline memory consumption",
    "Build tooling, CLIs, and developer toolchains (webpack, ESLint, etc.)",
    "BFF (Backend for Frontend) layers that aggregate multiple downstream services",
  ],
  whereItFails: [
    "CPU-bound workloads: long-running computations block the event loop and starve all other requests",
    "Heavy parallel computation: Python with multiprocessing, Go goroutines, or Java threads outperform Node.js for number-crunching",
    "Memory-intensive operations: V8's garbage collector pauses can cause latency spikes in GC-heavy workloads",
    "Unhandled synchronous blocking calls (crypto.pbkdf2Sync, fs.readFileSync in hot paths) eliminate the concurrency advantage",
    "Complex transactional database work that benefits from stored procedures or ORMs with compile-time safety (TypeScript ORMs partially mitigate this)",
  ],
};

const categories: CategoryMeta[] = [
  {
    id: "architecture",
    label: "Architecture",
    description:
      "V8 engine, libuv, single-threaded event loop, non-blocking I/O model, and the Node.js runtime internals",
  },
  {
    id: "event-loop",
    label: "Event Loop",
    description:
      "Event loop phases (timers, pending, poll, check, close), microtask queue, process.nextTick, setImmediate vs setTimeout ordering",
  },
  {
    id: "streams",
    label: "Streams",
    description:
      "Readable, Writable, Duplex, Transform streams, pipe(), backpressure, flowing vs paused mode, stream combinators",
  },
  {
    id: "modules",
    label: "Modules",
    description:
      "CommonJS require/module.exports, ESM import/export, module resolution algorithm, circular dependencies, dynamic imports",
  },
  {
    id: "performance",
    label: "Performance",
    description:
      "Worker threads, cluster module, CPU profiling with --inspect, memory leak detection, flame graphs, V8 optimizations",
  },
  {
    id: "security",
    label: "Security",
    description:
      "Prototype pollution, path traversal, SSRF, ReDoS, npm audit, input validation, Content Security Policy, dependency management",
  },
  {
    id: "deployment",
    label: "Deployment",
    description:
      "PM2, graceful shutdown, health checks, 12-factor app principles, containerization, zero-downtime deploys",
  },
  {
    id: "databases",
    label: "Databases",
    description:
      "Connection pooling, async query patterns, N+1 problem, transactions, ORMs vs query builders, connection management",
  },
];

const mentalModelTree: TreeNode = {
  id: "root",
  label: "Node.js Runtime",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "cat-architecture",
      label: "Architecture",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-event-loop-arch", label: "Single-Threaded Event Loop", nodeType: "concept", conceptId: "event-loop-arch", importance: "critical" },
        { id: "node-libuv", label: "libuv & Thread Pool", nodeType: "concept", conceptId: "libuv", importance: "critical" },
        { id: "node-v8", label: "V8 Engine", nodeType: "concept", conceptId: "v8-engine", importance: "high" },
        { id: "node-nonblocking", label: "Non-Blocking I/O Model", nodeType: "concept", conceptId: "nonblocking-io", importance: "critical" },
      ],
    },
    {
      id: "cat-event-loop",
      label: "Event Loop",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-el-phases", label: "Event Loop Phases", nodeType: "concept", conceptId: "event-loop-phases", importance: "critical" },
        { id: "node-nexttick", label: "process.nextTick", nodeType: "concept", conceptId: "process-nexttick", importance: "critical" },
        { id: "node-setimmediate", label: "setImmediate vs setTimeout", nodeType: "concept", conceptId: "setimmediate-vs-settimeout", importance: "high" },
        { id: "node-microtasks", label: "Microtask Queue", nodeType: "concept", conceptId: "microtask-queue", importance: "critical" },
      ],
    },
    {
      id: "cat-streams",
      label: "Streams",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-stream-types", label: "Stream Types", nodeType: "concept", conceptId: "stream-types", importance: "high" },
        { id: "node-backpressure", label: "Backpressure", nodeType: "concept", conceptId: "backpressure", importance: "critical" },
        { id: "node-pipe", label: "pipe() & pipeline()", nodeType: "concept", conceptId: "pipe-pipeline", importance: "high" },
        { id: "node-stream-modes", label: "Flowing vs Paused Mode", nodeType: "concept", conceptId: "stream-modes", importance: "medium" },
      ],
    },
    {
      id: "cat-modules",
      label: "Modules",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-commonjs", label: "CommonJS", nodeType: "concept", conceptId: "commonjs", importance: "high" },
        { id: "node-esm", label: "ESM (ES Modules)", nodeType: "concept", conceptId: "esm", importance: "high" },
        { id: "node-module-resolution", label: "Module Resolution Algorithm", nodeType: "concept", conceptId: "module-resolution", importance: "high" },
        { id: "node-circular-deps", label: "Circular Dependencies", nodeType: "concept", conceptId: "circular-deps", importance: "medium" },
      ],
    },
    {
      id: "cat-performance",
      label: "Performance",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-worker-threads", label: "Worker Threads", nodeType: "concept", conceptId: "worker-threads", importance: "critical" },
        { id: "node-cluster", label: "Cluster Module", nodeType: "concept", conceptId: "cluster-module", importance: "high" },
        { id: "node-memory-leaks", label: "Memory Leaks", nodeType: "concept", conceptId: "memory-leaks", importance: "high" },
        { id: "node-profiling", label: "CPU Profiling", nodeType: "concept", conceptId: "cpu-profiling", importance: "medium" },
      ],
    },
    {
      id: "cat-security",
      label: "Security",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-proto-pollution", label: "Prototype Pollution", nodeType: "concept", conceptId: "prototype-pollution", importance: "critical" },
        { id: "node-path-traversal", label: "Path Traversal", nodeType: "concept", conceptId: "path-traversal", importance: "high" },
        { id: "node-ssrf", label: "SSRF", nodeType: "concept", conceptId: "ssrf", importance: "high" },
      ],
    },
    {
      id: "cat-deployment",
      label: "Deployment",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-graceful-shutdown", label: "Graceful Shutdown", nodeType: "concept", conceptId: "graceful-shutdown", importance: "critical" },
        { id: "node-pm2", label: "PM2 & Process Management", nodeType: "concept", conceptId: "pm2", importance: "high" },
        { id: "node-12factor", label: "12-Factor App", nodeType: "concept", conceptId: "twelve-factor", importance: "medium" },
      ],
    },
    {
      id: "cat-databases",
      label: "Databases",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-conn-pooling", label: "Connection Pooling", nodeType: "concept", conceptId: "connection-pooling", importance: "critical" },
        { id: "node-async-queries", label: "Async Query Patterns", nodeType: "concept", conceptId: "async-queries", importance: "high" },
        { id: "node-n-plus-one", label: "N+1 Problem", nodeType: "concept", conceptId: "n-plus-one", importance: "high" },
      ],
    },
  ],
};

const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "Node.js is single-threaded for JavaScript execution but uses libuv's thread pool (default size 4) for I/O and crypto; never block the event loop with synchronous CPU work.",
    "The event loop processes phases in strict order: timers → pending callbacks → idle/prepare → poll → check → close. process.nextTick fires before any phase transition; Promise microtasks fire after nextTick but before I/O callbacks.",
    "Backpressure in streams is critical: if you ignore the return value of writable.write() and don't wait for the 'drain' event, you buffer unbounded data and cause OOM crashes.",
    "CommonJS modules are synchronous and cached after first load; ESM modules are asynchronous and support static analysis for tree-shaking. Mixing them requires careful interop (dynamic import() to load ESM from CJS).",
    "Worker threads share memory via SharedArrayBuffer and Atomics; they don't share the event loop. Cluster forks full processes, each with its own heap and event loop—use cluster for load balancing across CPU cores.",
    "The three most exploitable Node.js vulnerabilities are prototype pollution (merge/deepMerge on user input), path traversal (unsanitized user input in fs paths), and ReDoS (catastrophic backtracking in regex against user-controlled strings).",
    "Graceful shutdown requires listening to SIGTERM, stopping the HTTP server from accepting new connections (server.close()), waiting for in-flight requests, releasing DB connections, then exiting—otherwise Kubernetes will SIGKILL after the grace period.",
  ],
  mustKnowConcepts: [
    {
      name: "Event Loop Phases",
      oneLiner:
        "Six ordered phases executed repeatedly; process.nextTick and Promise microtasks interrupt between every phase.",
    },
    {
      name: "libuv Thread Pool",
      oneLiner:
        "Default 4 threads handle fs, crypto, and DNS; CPU-heavy operations here block other async I/O—increase with UV_THREADPOOL_SIZE.",
    },
    {
      name: "Backpressure",
      oneLiner:
        "writable.write() returns false when the internal buffer is full; stop writing until 'drain' fires to prevent memory blow-up.",
    },
    {
      name: "Prototype Pollution",
      oneLiner:
        "Merging user-controlled __proto__ or constructor.prototype keys poisons Object.prototype for every object in the process.",
    },
    {
      name: "Worker Threads",
      oneLiner:
        "True parallelism for CPU-bound JS via threads sharing ArrayBuffer memory; each thread has its own V8 isolate and event loop.",
    },
    {
      name: "Graceful Shutdown",
      oneLiner:
        "SIGTERM → stop accepting → drain in-flight → close DB pools → process.exit(0); skipping any step causes lost requests or resource leaks.",
    },
  ],
  topTraps: [
    "process.nextTick starves the event loop: recursive nextTick callbacks never yield to I/O, deadlocking all pending network calls.",
    "setImmediate vs setTimeout(fn, 0) ordering is non-deterministic when called from the main module but deterministic inside an I/O callback (setImmediate always wins).",
    "CommonJS circular deps return a partially-constructed export object—if module A requires module B which requires module A, B gets whatever A has exported so far (potentially an empty object).",
    "libuv's thread pool is size 4 by default; four simultaneous bcrypt hashes will queue all subsequent fs operations, causing seemingly unrelated slowdowns.",
    "Unhandled promise rejections: in Node.js ≥15 an unhandled rejection crashes the process (exit code 1)—always add a top-level unhandledRejection handler or use async error middleware in Express.",
  ],
};

const concepts: Concept[] = [
  // ── ARCHITECTURE ──────────────────────────────────────────────────────────
  {
    id: "event-loop-arch",
    title: "Single-Threaded Event Loop Architecture",
    category: "architecture",
    basic:
      "Node.js runs JavaScript on a single thread. Instead of blocking while waiting for I/O, it registers callbacks and continues executing other code. When the I/O completes, the callback is queued and executed on the main thread.",
    expected:
      "The main thread runs the V8 JavaScript engine and the libuv event loop. When Node encounters an async operation (fs.readFile, http.get), it hands the operation off to libuv, which either delegates it to the OS kernel (for network I/O via epoll/kqueue/IOCP) or to its internal thread pool (for file I/O, crypto, DNS). The event loop continuously polls for completed operations and dispatches their callbacks.",
    deep:
      "The event loop is implemented in libuv as a loop over six phases. Each iteration (a 'tick') checks: (1) expired timers, (2) pending OS-level callbacks, (3) idle/prepare hooks, (4) poll for new I/O (blocks if queue is empty and timers are not imminent), (5) check phase for setImmediate callbacks, (6) close callbacks. JavaScript execution and V8 GC happen exclusively on the main thread. The 'single-threaded' label applies to JS execution; libuv uses a configurable thread pool (UV_THREADPOOL_SIZE, default 4, max 1024) for operations the OS can't do asynchronously (file I/O, getaddrinfo, CPU-bound crypto like pbkdf2).",
    interviewAnswer:
      "Node.js uses a single thread for JavaScript execution backed by libuv for async I/O. Network I/O uses OS-native async primitives (epoll on Linux, kqueue on macOS), so it truly doesn't block a thread. File I/O and CPU-heavy operations like bcrypt run on libuv's internal thread pool (default 4 threads). This design achieves high concurrency for I/O-bound workloads but struggles with CPU-bound tasks that block the main thread.",
    trap:
      "Senior engineers often say 'Node.js is non-blocking' categorically—but file I/O in Node uses libuv's thread pool, not kernel async I/O. Four concurrent bcrypt calls will exhaust the pool and queue all subsequent fs operations, causing visible latency.",
    memoryAnchor:
      "Think of a restaurant with ONE waiter (main thread) and FOUR kitchen staff (thread pool). The waiter takes everyone's orders without waiting, but if all four cooks are making souffles (CPU work), even a simple salad order gets stuck in the kitchen queue.",
  },
  {
    id: "libuv",
    title: "libuv & Thread Pool",
    category: "architecture",
    basic:
      "libuv is a C library that provides Node.js with cross-platform asynchronous I/O, a thread pool, timers, and the event loop implementation. It abstracts OS differences (epoll, kqueue, IOCP) behind a uniform API.",
    expected:
      "libuv provides two mechanisms for async work: (1) OS-native async I/O (via epoll/kqueue/IOCP) for network sockets—no threads required; (2) a thread pool (default 4 threads) for operations that lack async OS support, including file system operations, DNS lookups (getaddrinfo), and certain crypto functions. You can tune pool size with the UV_THREADPOOL_SIZE environment variable (max 1024).",
    deep:
      "Network I/O in libuv is handled by the I/O watcher, which uses platform-native event notification (Linux epoll, macOS kqueue, Windows IOCP). These are truly non-blocking: a single thread can monitor thousands of sockets. File I/O is fundamentally different—POSIX async file I/O (aio_read) is poorly supported and inconsistent, so libuv uses blocking calls on worker threads and signals completion to the event loop via a pipe/eventfd. This means concurrent file operations compete for the same 4 thread pool slots as bcrypt, getaddrinfo, and any native addon that calls uv_queue_work. Increasing UV_THREADPOOL_SIZE to match I/O + crypto concurrency requirements is a standard production optimization.",
    interviewAnswer:
      "libuv is Node's cross-platform async I/O layer. For network sockets it uses OS-native async notification (epoll/kqueue/IOCP) with zero threads. For file I/O and CPU-heavy crypto it uses a thread pool (default 4 threads, tunable via UV_THREADPOOL_SIZE). Understanding the distinction matters because saturating the thread pool with bcrypt hashes will delay unrelated file system operations.",
    trap:
      "Candidates assume 'non-blocking I/O' means no threads are used. In reality, fs.readFile blocks a libuv thread pool thread. Under high concurrent file I/O load, setting UV_THREADPOOL_SIZE=1 (or leaving it at 4) creates a bottleneck that manifests as slow network responses—a subtle and hard-to-diagnose production issue.",
    memoryAnchor:
      "libuv is the backstage crew at a theater. Network I/O is like the lighting board (one person handles all lights). File I/O is like moving heavy sets—you need actual stagehands (threads), and you only have 4 by default.",
  },
  {
    id: "v8-engine",
    title: "V8 JavaScript Engine",
    category: "architecture",
    basic:
      "V8 is Google's open-source JavaScript engine written in C++. It compiles JavaScript to native machine code using JIT compilation and manages memory via garbage collection. Node.js embeds V8 to execute JavaScript on the server.",
    expected:
      "V8 uses a multi-tier JIT pipeline: Ignition (bytecode interpreter) executes code initially, collecting type feedback. TurboFan (optimizing compiler) recompiles hot functions to optimized machine code using that feedback. If a function's types change (deoptimization), V8 falls back to Ignition. V8 manages the heap with generational garbage collection: a young generation (Scavenger/minor GC) for short-lived objects, and old generation (Mark-Sweep-Compact/major GC) for long-lived ones.",
    deep:
      "V8's heap is split into: new space (small, collected frequently via Cheney's semi-space algorithm), old space (large, collected via incremental marking + lazy sweeping), code space (compiled code), large object space, and map space (hidden class descriptors). 'Hidden classes' (internal shapes/maps) are V8's key optimization: objects with the same property assignment order share a hidden class, enabling inline cache (IC) hits. Adding properties in a different order or adding properties post-construction creates new hidden classes, causing IC misses and deoptimization. Node.js exposes V8 flags via --v8-options; --max-old-space-size controls old generation heap size (default ~1.5GB on 64-bit).",
    interviewAnswer:
      "V8 JIT-compiles JavaScript using Ignition for initial interpretation and TurboFan for optimized machine code on hot paths. It uses generational garbage collection—frequent minor GC for short-lived objects and incremental major GC for long-lived ones. For production Node.js, understanding --max-old-space-size, avoiding heap fragmentation, and not breaking hidden class assumptions (consistent object shapes) are key performance levers.",
    trap:
      "Many engineers think GC pauses are irrelevant in Node.js because it's 'async'. Major GC (mark-sweep) stops all JavaScript execution on the main thread. A 500ms GC pause will stall every in-flight request for that duration. Monitoring process.memoryUsage().heapUsed and GC pause metrics is non-negotiable in production.",
    memoryAnchor:
      "V8 is like a two-gear car: Ignition is first gear (slow but always works), TurboFan is sixth gear (blazing fast but stalls if road conditions change—deoptimization). Garbage collection is the mandatory pit stop that freezes the entire race.",
  },
  {
    id: "nonblocking-io",
    title: "Non-Blocking I/O Model",
    category: "architecture",
    basic:
      "Non-blocking I/O means Node initiates an I/O operation and immediately returns control to the caller rather than waiting for it to complete. A callback or promise resolves when the operation finishes.",
    expected:
      "Node's non-blocking model allows a single thread to handle thousands of concurrent connections. When a request comes in, Node registers event handlers for read/write, processes other requests while waiting, and resumes when data is available. This eliminates the per-connection thread overhead that synchronous servers (Apache prefork) incur, reducing context-switching and memory usage dramatically.",
    deep:
      "The cost is callback orchestration complexity and the risk of blocking the event loop. Any synchronous operation that takes >10ms effectively increases latency for all concurrent requests by that amount. Common inadvertent blockers: JSON.parse of a 50MB payload, synchronous regex with catastrophic backtracking, fs.readFileSync in a hot path, or a tight for-loop over millions of records. The --clinic tool (node-clinic) and the 'blocked-at' npm module can detect event loop lag in production. Express middleware chain synchronously executes until it encounters an async boundary, so synchronous middleware with complex logic compounds the problem.",
    interviewAnswer:
      "Non-blocking I/O means Node doesn't wait for I/O to finish—it registers a callback and processes other events. This lets one thread serve thousands of simultaneous requests. The critical corollary: any synchronous CPU work on the main thread blocks all concurrent requests. Tools like node-clinic and the --inspect profiler identify event loop blockage.",
    trap:
      "JSON.parse is synchronous. Parsing a large request body (e.g., a 10MB JSON payload) on the main thread blocks the event loop for potentially hundreds of milliseconds, stalling all other requests—even if the underlying HTTP reading was async.",
    memoryAnchor:
      "Non-blocking I/O = a chef who never stands idle waiting for water to boil. He starts boiling, chops veggies, preps sauce. But if someone hands him a 50-pound block of cheese to grate (JSON.parse), he blocks the whole kitchen until he's done grating.",
  },

  // ── EVENT LOOP ────────────────────────────────────────────────────────────
  {
    id: "event-loop-phases",
    title: "Event Loop Phases",
    category: "event-loop",
    basic:
      "The event loop cycles through six phases repeatedly: timers, pending callbacks, idle/prepare, poll, check, and close callbacks. Each phase has a FIFO queue of callbacks to execute.",
    expected:
      "1. Timers: executes setTimeout and setInterval callbacks whose delay has elapsed. 2. Pending callbacks: executes I/O callbacks deferred to the next iteration. 3. Idle/prepare: internal use. 4. Poll: retrieves new I/O events; blocks here if queue is empty and no timers are imminent. 5. Check: executes setImmediate callbacks. 6. Close callbacks: socket.on('close', ...) etc. Between every phase transition, Node drains the microtask queue (process.nextTick callbacks first, then Promise microtasks).",
    deep:
      "The poll phase has nuanced behavior: if the poll queue is empty, Node checks if any setImmediate callbacks are scheduled—if yes, it moves to check immediately; otherwise it blocks waiting for I/O (up to the timeout needed by the next timer). This is why setImmediate reliably fires before a setTimeout(fn, 0) when both are scheduled inside an I/O callback: the event loop is already past the timers phase and will hit check before looping back to timers. The exact behavior from the main module is non-deterministic because process startup time affects whether the timer's 1ms minimum has elapsed. Microtask queue draining between phases is a Node.js ≥11 behavior change—in ≤10, microtasks only drained between full loop iterations.",
    interviewAnswer:
      "The event loop has six phases in order: timers → pending I/O → idle → poll → check → close. The poll phase is where Node blocks waiting for I/O if nothing else is pending. setImmediate fires in check (after poll), while setTimeout fires in timers (start of loop). Between every phase, Node drains process.nextTick first, then Promise .then() microtasks.",
    trap:
      "Many candidates memorize 'nextTick fires before promises' but miss that both drain between every phase transition, not just once per loop iteration. A deeply recursive nextTick chain starves I/O callbacks indefinitely because nextTick always wins the drain race.",
    memoryAnchor:
      "The event loop is a theme park ride with 6 stations (phases). The cart stops at each station in order. Between every station, VIP passengers (nextTick) and priority riders (Promises) get to cut the line and board first. The poll station is the lazy river—it idles there if nothing else is scheduled.",
  },
  {
    id: "process-nexttick",
    title: "process.nextTick",
    category: "event-loop",
    basic:
      "process.nextTick schedules a callback to run after the current operation completes but before the event loop continues to the next phase. It is not technically part of the event loop—it runs between phases.",
    expected:
      "nextTick callbacks are stored in a separate nextTick queue that is drained completely before the event loop advances. This makes nextTick useful for deferring work until the current synchronous call stack unwinds, ensuring that event emitters fire after constructors finish setting up listeners. It has higher priority than setImmediate and Promise microtasks.",
    deep:
      "Because the nextTick queue is drained completely before any I/O callbacks or timers, a recursive nextTick (a callback that schedules another nextTick) creates an infinite synchronous loop that permanently blocks the event loop—all pending I/O, timers, and HTTP requests queue up indefinitely. Node.js does not impose a recursion limit on nextTick. In older Node.js code, nextTick was used to make APIs consistently async (to prevent Zalgo—the half-sync, half-async problem). Today, Promise.resolve().then() is often preferred because it doesn't starve I/O as aggressively.",
    interviewAnswer:
      "process.nextTick fires after the current synchronous code but before any I/O callbacks, timers, or setImmediate callbacks. It drains its entire queue before the event loop progresses. The risk: recursive nextTick calls starve I/O indefinitely. Use it for deferring work that must happen before I/O but after the current call stack, such as emitting events post-construction.",
    trap:
      "Using process.nextTick for recursion (e.g., recursive async iteration) instead of setImmediate starves the event loop. setImmediate yields to I/O between each callback; nextTick does not. This is a classic production footgun disguised as a micro-optimization.",
    memoryAnchor:
      "nextTick is the 'one more thing' friend who keeps saying 'wait, one more thing!' before you can leave the room. Recursive nextTick = that friend who never lets you leave. Ever. I/O starves to death at the door.",
  },
  {
    id: "setimmediate-vs-settimeout",
    title: "setImmediate vs setTimeout",
    category: "event-loop",
    basic:
      "setImmediate schedules a callback after the poll phase (check phase). setTimeout(fn, 0) schedules a callback after a minimum delay (≥1ms) in the timers phase. Both defer execution, but to different event loop phases.",
    expected:
      "When called from the main module (outside I/O callbacks), their execution order is non-deterministic because it depends on whether the timer's 1ms minimum has elapsed by the time the timers phase runs. Inside an I/O callback, setImmediate always executes before setTimeout(fn, 0) because the event loop has already passed the timers phase for that iteration and will reach check before looping back to timers.",
    deep:
      "The 1ms minimum timer resolution is a libuv implementation detail inherited from OS timer APIs. On Linux, the minimum timer resolution is typically 1ms; on Windows it can be up to 15ms. Under load, the timers phase may see a setTimeout(fn, 0) as not yet expired even though nominally 0ms have passed. For guaranteed post-I/O, post-poll ordering, setImmediate is the correct tool. setImmediate also has a meaningful performance advantage in high-throughput scenarios because it doesn't involve timer heap management in libuv.",
    interviewAnswer:
      "setImmediate fires in the check phase (after poll); setTimeout(fn, 0) fires in the timers phase (start of loop). From the main module their order is non-deterministic. Inside an I/O callback, setImmediate always fires first. When you need to defer work until after I/O callbacks in the current iteration, setImmediate is the correct choice.",
    trap:
      "Assuming setTimeout(fn, 0) fires before setImmediate anywhere is wrong. The order is only guaranteed inside I/O callbacks. Benchmarks and tests that rely on their relative ordering from the main script will produce flaky results across machines and Node versions.",
    memoryAnchor:
      "setImmediate = 'I'll do it right after this meeting (poll phase).' setTimeout(0) = 'I'll do it first thing tomorrow morning (next timers phase).' Inside an I/O callback, you're already in the meeting, so setImmediate always wins the race home.",
  },
  {
    id: "microtask-queue",
    title: "Microtask Queue",
    category: "event-loop",
    basic:
      "The microtask queue holds Promise .then()/.catch()/.finally() callbacks and queueMicrotask() callbacks. Microtasks run before the event loop moves to the next phase.",
    expected:
      "Node.js maintains two microtask queues: the nextTick queue (highest priority) and the Promise microtask queue. After each synchronous block and between event loop phases, Node drains nextTick completely first, then drains Promise microtasks completely. This ordering changed in Node.js 11—prior to that, microtasks only ran between full loop iterations.",
    deep:
      "queueMicrotask() enqueues directly to the Promise microtask queue (same level as Promise.resolve().then()). async/await is syntactic sugar over Promises, so await suspension points enqueue microtasks. A common gotcha: in an async function, code after every await is a microtask callback. If you await inside a loop over thousands of items, you're creating thousands of microtask continuations that drain before any I/O can fire—effectively blocking I/O for the duration. The fix is to periodically yield with setImmediate or await a small timeout.",
    interviewAnswer:
      "Microtasks (Promise callbacks, queueMicrotask) run after each synchronous block and between every event loop phase. process.nextTick has even higher priority and drains before Promise microtasks. Since Node.js 11, microtasks drain between phases, not just between full loop iterations—this changed observable behavior for code mixing setImmediate and resolved promises.",
    trap:
      "Awaiting inside a for-of loop over a large array doesn't yield I/O control. Each await on an already-resolved promise enqueues a microtask that runs before the next event loop phase—your loop monopolizes the main thread even though it's written with await.",
    memoryAnchor:
      "Microtasks are like post-it notes stuck to your current task. You MUST handle every post-it before moving to the next agenda item (phase). nextTick post-its are neon pink (highest priority); Promise post-its are yellow. A pile of 10,000 post-its = nothing else gets done.",
  },

  // ── STREAMS ───────────────────────────────────────────────────────────────
  {
    id: "stream-types",
    title: "Stream Types (Readable, Writable, Duplex, Transform)",
    category: "streams",
    basic:
      "Node.js has four stream types: Readable (source of data), Writable (sink for data), Duplex (both readable and writable, e.g., TCP socket), and Transform (duplex that transforms data as it passes through, e.g., zlib).",
    expected:
      "Readable streams emit 'data' events in flowing mode or yield data via .read() in paused mode. Writable streams accept data via .write() and signal completion with .end(). Transform streams implement _transform(chunk, encoding, callback) to modify data in transit. Custom streams are created by subclassing the base classes and implementing _read/_write/_transform. Node.js 16+ stream.Readable.from() creates a readable from an async iterable, enabling async generator-based stream composition.",
    deep:
      "Internally, readable streams maintain a highWaterMark buffer. When the buffer fills, the stream stops calling _read (pauses the source). Writable streams also have a highWaterMark; write() returns false when the internal buffer exceeds it, signaling the producer to stop. Transform streams must call callback() in _transform to signal readiness for more input—forgetting it causes the stream to stall silently. ObjectMode streams (objectMode: true) pass JavaScript objects rather than Buffers/strings, with highWaterMark counting objects instead of bytes.",
    interviewAnswer:
      "Node has four stream types: Readable, Writable, Duplex (both), Transform (duplex that modifies data). The core contract: Readable produces data; Writable consumes it. Transform sits in between. The critical operational concern is backpressure—each stream type has a highWaterMark buffer, and producers must respect write() return values to avoid memory overflow.",
    trap:
      "ObjectMode streams change highWaterMark semantics: instead of bytes, it counts object instances. A highWaterMark of 16 in object mode buffers 16 objects, not 16 bytes. A stream of large objects in objectMode can silently buffer gigabytes before backpressure kicks in.",
    memoryAnchor:
      "Four types of water pipes: Readable = faucet (source), Writable = drain (sink), Duplex = garden hose (water flows both ways), Transform = water filter (changes what passes through). Every pipe has a pressure gauge (highWaterMark).",
  },
  {
    id: "backpressure",
    title: "Backpressure",
    category: "streams",
    basic:
      "Backpressure is the mechanism that prevents a fast producer from overwhelming a slow consumer by signaling the producer to pause. In Node.js streams, writable.write() returns false when the consumer's buffer is full.",
    expected:
      "When writable.write() returns false, the producer should stop writing and wait for the 'drain' event before resuming. Failing to respect backpressure causes the internal buffer to grow unboundedly, eventually exhausting heap memory. pipe() handles backpressure automatically—it pauses the readable when write() returns false and resumes it on 'drain'. The highWaterMark option (default 16KB for byte streams, 16 objects for object mode) controls when write() returns false.",
    deep:
      "In practice, backpressure failures are common in code that uses async iteration over readable streams without careful attention to the writable side. When writing: `for await (const chunk of readable) { writable.write(chunk); }` the loop doesn't wait for 'drain', bypassing backpressure entirely. The correct pattern is to await a promisified version of 'drain' when write() returns false. stream.pipeline() (Node.js ≥10) handles this correctly and also propagates errors and cleans up streams on failure—unlike the original pipe() which doesn't forward errors and can leave streams open on failure.",
    interviewAnswer:
      "Backpressure prevents producer-consumer imbalance. writable.write() returns false when the internal buffer exceeds highWaterMark; producers must stop and wait for 'drain'. pipe() and stream.pipeline() handle this automatically. Manual stream consumption via for-await or direct write() calls requires explicit backpressure handling to avoid OOM crashes.",
    trap:
      "pipe() does not propagate errors—if the readable or writable emits an error, the other stream is not automatically destroyed, causing resource leaks (open file handles, sockets). Always use stream.pipeline() in production code, which handles error propagation and cleanup.",
    memoryAnchor:
      "Backpressure = a toilet that says 'STOP FLUSHING, I'm full!' If you ignore the signal (write() returning false) and keep flushing, the bathroom floods (OOM crash). pipe() is the auto-flush handle that listens for you.",
  },
  {
    id: "pipe-pipeline",
    title: "pipe() and stream.pipeline()",
    category: "streams",
    basic:
      "pipe() connects a Readable to a Writable, automatically managing data flow and backpressure. stream.pipeline() is an improved API that also handles error propagation and cleanup.",
    expected:
      "readable.pipe(writable) returns the destination, enabling chaining: readable.pipe(transform).pipe(writable). It pauses the readable when write() returns false and resumes on 'drain'. However, pipe() does not forward errors—an error in any stream in the chain leaves other streams open. stream.pipeline(src, ...transforms, dest, callback) correctly destroys all streams in the pipeline on error and calls the callback with the error.",
    deep:
      "Node.js 15+ exposes stream.pipeline as a promise-based API via stream/promises: `import { pipeline } from 'stream/promises'`. The pipeline function also accepts async generators as stages, enabling powerful composition: `await pipeline(fsReadStream, async function*(source) { for await (const chunk of source) yield transform(chunk); }, fsWriteStream)`. This pattern avoids Transform class boilerplate while maintaining correct backpressure and error handling. AbortController can be passed to pipeline to cancel it mid-stream.",
    interviewAnswer:
      "pipe() manages backpressure automatically but silently ignores errors. stream.pipeline() is the production-safe alternative—it propagates errors, destroys all streams in the chain, and invokes a completion callback. In modern Node.js, `stream/promises` pipeline with async generators is the most ergonomic pattern for complex streaming ETL pipelines.",
    trap:
      "Chaining pipe() without error handlers is a common resource leak. If a gzip transform errors mid-stream, the source file stream and destination writable stay open. In production with many concurrent requests, this accumulates open file descriptors until EMFILE ('too many open files') crashes the process.",
    memoryAnchor:
      "pipe() is duct tape connecting hoses—cheap and fast but if one hose bursts, the others keep spraying water everywhere. pipeline() is professional plumbing with shut-off valves—one burst and everything closes cleanly.",
  },
  {
    id: "stream-modes",
    title: "Flowing vs Paused Mode",
    category: "streams",
    basic:
      "Readable streams operate in two modes: paused (data is read explicitly via .read()) and flowing (data is emitted automatically via 'data' events). Streams start in paused mode.",
    expected:
      "A stream switches to flowing mode when: a 'data' event listener is attached, .resume() is called, or .pipe() is called. It switches back to paused with .pause() or by removing all 'data' listeners. In flowing mode, data is emitted as fast as the readable produces it, potentially faster than the consumer can handle—hence the need for backpressure management. The preferred modern approach is async iteration (for await...of), which handles mode switching internally.",
    deep:
      "The mode system is a legacy from Node.js 0.10 streams. The 'readable' event represents the third mode variant: the stream emits 'readable' when data is available, and the consumer calls .read(n) explicitly. This is the most low-level control. In Node.js internals, streams track mode via readableFlowing property: null (initial), true (flowing), false (paused by .pause()). Switching from null to flowing without a consumer causes data loss—this is a classic gotcha with streams that emit before listeners are attached in async setups.",
    interviewAnswer:
      "Readable streams start paused. Attaching a 'data' listener or calling pipe() switches to flowing mode, emitting data as fast as it's produced. Async iteration (for await...of) is the modern idiom that handles mode management automatically. The key risk in flowing mode is not having a fast enough consumer—data events emit regardless of consumer readiness.",
    trap:
      "Attaching a 'data' event listener then removing it leaves the stream in a null flowing state if readable.readableFlowing is false, potentially causing data loss on the next 'data' listener attachment. The stream may have already consumed buffered data that won't be re-emitted.",
    memoryAnchor:
      "Paused mode = a beer tap you pull manually (one glass at a time). Flowing mode = you opened the tap and walked away—beer pours nonstop whether anyone's drinking or not. Attaching a 'data' listener is like taping the tap open.",
  },

  // ── MODULES ───────────────────────────────────────────────────────────────
  {
    id: "commonjs",
    title: "CommonJS Modules",
    category: "modules",
    basic:
      "CommonJS (CJS) is Node.js's original module system. Files use require() to import and module.exports or exports to export. All require() calls are synchronous.",
    expected:
      "CJS modules are loaded synchronously: require() blocks until the module is parsed, executed, and its exports are returned. Modules are cached after first load—subsequent require() calls return the cached exports object. This caching means module-level state is shared across all importers. The exports shorthand is a reference to module.exports; reassigning exports breaks the link (exports = {} does nothing useful; module.exports = {} works).",
    deep:
      "The CJS module wrapper function is how Node provides module-level scope: `(function(exports, require, module, __filename, __dirname) { /* module code */ })`. This is why __filename and __dirname are available without explicit import. The require() function resolves modules through an algorithm: exact file path → .js/.json/.node extension → index.js/index.json/index.node → node_modules lookup up the directory tree. Loaded module source is cached at require.cache[filename]; deleting an entry from require.cache causes the next require() to re-execute the module. This technique is used in hot-reload implementations but can cause memory leaks if not managed carefully.",
    interviewAnswer:
      "CommonJS loads modules synchronously via require(), wrapping each module in a function that provides exports, require, module, __filename, __dirname. Modules are cached post-load, making module-level singletons reliable. The critical behavior: reassigning exports doesn't affect module.exports—only mutations to the exports object or direct assignment to module.exports work for export.",
    trap:
      "exports.foo = bar works because it mutates the object that module.exports points to. But exports = { foo: bar } reassigns the local variable, breaking the reference. The module still exports whatever module.exports holds (the original empty object). This silently exports nothing and is a classic footgun.",
    memoryAnchor:
      "CommonJS = sending a package via snail mail. You pack it up (module.exports), it ships synchronously, and the recipient gets a snapshot (copy). 'exports' is just a sticky note on the box—rip it off (reassign) and the box ships empty.",
  },
  {
    id: "esm",
    title: "ES Modules (ESM)",
    category: "modules",
    basic:
      "ESM is the official JavaScript module standard (import/export). Node.js supports ESM in .mjs files or .js files when package.json has \"type\": \"module\". ESM imports are static and analyzed at parse time.",
    expected:
      "Unlike CJS, ESM imports are live bindings—if a module updates an exported value, importers see the update. ESM loading is asynchronous: the loader fetches, parses, and links modules before executing them (using a graph traversal). Top-level await is supported in ESM, enabling async initialization at the module level. To import a CJS module from ESM, use a default import; to import ESM from CJS, you must use dynamic import() since CJS require() is synchronous and can't await ESM loading.",
    deep:
      "ESM uses a three-phase loading process: (1) Construction—parse source, build module graph, find all imports; (2) Instantiation—allocate memory for exports, create live binding environment records; (3) Evaluation—execute module code. This means all imports are resolved before any module code runs, enabling static analysis for tree-shaking. Circular ESM dependencies work differently from CJS: because exports are live bindings (not copied values), circular imports don't return partially-constructed objects—they return the binding, which will be populated once evaluation completes. However, using an exported value before the providing module's code has run throws a ReferenceError (temporal dead zone for let/const exports).",
    interviewAnswer:
      "ESM uses static import/export analyzed at parse time, enabling tree-shaking and top-level await. Imports are live bindings to the exporting module's values. Loading is asynchronous (three phases: construct, instantiate, evaluate). Mixing CJS and ESM requires care: CJS can't require() ESM (no sync await), but ESM can import CJS via default import. Use dynamic import() to load ESM from CJS.",
    trap:
      "ESM live bindings mean `import { count } from './counter.js'` gives you a live read-only view of counter.js's count variable. If counter.js increments count, your imported binding reflects the new value. This is fundamentally different from CJS where you get a copy of the value at require() time—and it breaks destructuring-based memoization patterns.",
    memoryAnchor:
      "ESM = a shared Google Doc with live cursors. Everyone sees changes in real time (live bindings). CJS = emailing a PDF copy—you get whatever was written at send time and never see updates. ESM also scans the whole doc before opening (static analysis).",
  },
  {
    id: "module-resolution",
    title: "Module Resolution Algorithm",
    category: "modules",
    basic:
      "When you call require('./foo') or import './foo', Node follows a resolution algorithm to find the actual file: it checks the exact path, then adds extensions (.js, .json, .node), then looks for an index file, and finally searches node_modules directories up the tree.",
    expected:
      "For bare specifiers (require('lodash')), Node searches node_modules in the current directory, then parent directories, up to the filesystem root. The package.json exports field (added in Node.js 12) allows packages to define their public API surface and map subpath imports, taking precedence over direct file path access. The main field in package.json specifies the entry point for CJS; for ESM, the exports field with a '.' key is checked first.",
    deep:
      "The resolution algorithm for ESM bare specifiers is stricter than CJS: you cannot require('lodash/array') if lodash's package.json exports field doesn't expose that path. This breaks existing CJS patterns. The exports field supports conditions (import, require, node, browser, development, production) allowing packages to serve different implementations per environment. The imports field in package.json allows internal package imports with '#' prefix, providing subpath aliasing without exposing them externally. Node.js module resolution hooks (--experimental-loader or register() in Node.js 20+) enable custom resolution for transpilers, mocking, and module federation.",
    interviewAnswer:
      "Node resolves require()/import in order: (1) core modules, (2) relative/absolute paths with extension fallback (.js/.json/.node) and index.js fallback, (3) node_modules traversal up to root. The package.json exports field controls ESM and conditional CJS/ESM resolution, superseding the main field. Bare specifiers without a match in exports will throw ERR_PACKAGE_PATH_NOT_EXPORTED.",
    trap:
      "Adding a package.json exports field with only specific subpaths breaks all other deep imports of that package. Library authors who add exports without including all previously public paths cause semver-major breakage for consumers who were using undocumented deep imports—a common source of ecosystem pain when packages add ESM support.",
    memoryAnchor:
      "Module resolution is like a GPS that tries multiple routes: exact address first, then nearby streets (.js, .json), then the neighborhood index.js, then drives up the directory tree checking every node_modules town until it reaches the root. The 'exports' field in package.json is a bouncer list—unlisted paths get rejected at the door.",
  },
  {
    id: "circular-deps",
    title: "Circular Dependencies",
    category: "modules",
    basic:
      "A circular dependency occurs when module A requires module B which requires module A. Both CJS and ESM handle this, but in different ways that can cause subtle bugs.",
    expected:
      "In CJS, when a circular require() is detected, Node returns whatever the required module has exported so far (a partially-constructed exports object). If module A requires B at the top level and B requires A, B gets A's exports as they were at the point A triggered B's load—typically an empty object. Code that relies on A's exports only later (inside functions, not at module evaluation time) works fine; top-level use of A's exports in B will see the empty object.",
    deep:
      "ESM handles circulars differently via live bindings: exports are references that get populated during evaluation. A circular ESM import doesn't get a snapshot—it gets the live binding. If module A exports `let x = 1` and module B imports x before A's code runs, accessing x throws a ReferenceError (TDZ). But if B only accesses x inside a function called after A has initialized, it works. The practical fix for both systems is to restructure to break the cycle (extract shared code to a third module) or use dependency injection. Tools like madge visualize the dependency graph to identify cycles.",
    interviewAnswer:
      "CJS circular deps return a partial exports object—code relying on top-level exports of a cyclically-imported module sees an empty object. ESM circular deps use live bindings, which avoids the partial object problem but introduces TDZ errors if a binding is accessed before its providing module finishes evaluating. The safest resolution is restructuring to eliminate cycles by extracting shared code.",
    trap:
      "A common CJS circular dep bug: module A exports a class, module B imports it at the top level (for instanceof checks) and also re-exports something A needs. A loads B as part of its initialization; B's top-level require(A) returns A's partial exports (no class yet). Now every instanceof check in B silently fails because the class is undefined. The bug is invisible until you run specific code paths.",
    memoryAnchor:
      "Circular deps are two people each waiting for the other to finish talking before they speak. CJS handles it by giving you a half-written letter (partial exports). ESM gives you a sealed envelope that's empty until the writer finishes—open it too early and it explodes (ReferenceError).",
  },

  // ── PERFORMANCE ───────────────────────────────────────────────────────────
  {
    id: "worker-threads",
    title: "Worker Threads",
    category: "performance",
    basic:
      "The worker_threads module allows Node.js to run JavaScript in parallel on separate threads. Workers have their own V8 instance and event loop but can share memory via SharedArrayBuffer.",
    expected:
      "Workers are appropriate for CPU-bound tasks (image processing, cryptography, ML inference) that would block the main thread. Communication between workers and the main thread uses MessageChannel (postMessage/on('message')), with data structured-cloned by default (copied). SharedArrayBuffer with Atomics enables zero-copy shared memory and atomic operations for synchronization. Workers can also use workerData for initial configuration passed at construction.",
    deep:
      "Creating a worker has significant overhead (~50ms startup, ~30MB memory per worker) due to spinning up a full V8 isolate. Worker pools (reusing workers across tasks) are essential for latency-sensitive workloads—libraries like piscina implement this efficiently. Transferable objects (ArrayBuffer, MessagePort) transfer ownership to the receiver with zero-copy semantics, avoiding the structured-clone overhead for large buffers. Workers cannot access the DOM (irrelevant server-side) or require native addons that aren't thread-safe. SharedArrayBuffer requires cross-origin isolation headers in browser contexts (COOP/COEP) but has no such restriction in Node.js.",
    interviewAnswer:
      "Worker threads run JavaScript in parallel with true OS thread parallelism. Each worker has its own V8 isolate and event loop, communicating via postMessage (structured clone) or SharedArrayBuffer (zero-copy shared memory). Use workers for CPU-bound tasks to prevent event loop blocking. Worker creation is expensive (~50ms, ~30MB); use a worker pool (piscina) for high-frequency task execution.",
    trap:
      "postMessage performs a structured clone of transferred data, which is O(n) in data size. Passing a 100MB Buffer between workers via postMessage copies 100MB synchronously on the sending thread—blocking the event loop for potentially hundreds of milliseconds. Always transfer ownership with the transfer list: `postMessage(buffer, [buffer])` for zero-copy transfer.",
    memoryAnchor:
      "Worker threads = hiring contractors who each bring their own toolbox (V8 isolate) and work in separate rooms. They pass notes through a mail slot (postMessage). SharedArrayBuffer is a whiteboard in the hallway everyone can read/write—but you need locks (Atomics) or they'll scribble over each other.",
  },
  {
    id: "cluster-module",
    title: "Cluster Module",
    category: "performance",
    basic:
      "The cluster module forks multiple Node.js processes (workers) that share the same server port. The primary process manages workers; workers handle requests. This utilizes multiple CPU cores.",
    expected:
      "cluster.fork() creates child processes that each run the same script. The primary process distributes incoming connections to workers using a round-robin algorithm (on Linux/macOS; on Windows it's left to the OS). Workers are independent processes with separate heaps—no shared memory. When a worker crashes, the primary can fork a replacement. cluster is the original multi-core solution; it predates worker_threads.",
    deep:
      "Under the hood, cluster uses child_process.fork() and sets up an IPC channel between primary and workers. The magic: all workers call server.listen() on the same port, but only the primary actually binds to the socket. The primary receives connections and distributes them to workers via the IPC channel, sending the socket handle. This is why round-robin works—the primary controls distribution. In production, PM2 uses the cluster module under the hood with its cluster mode. The key operational concern: session affinity (sticky sessions) requires external load balancing if in-memory session state is used, since different requests from the same client may hit different workers.",
    interviewAnswer:
      "The cluster module forks N processes (typically one per CPU core) that all listen on the same port. The primary process accepts connections and distributes them to workers via IPC-passed socket handles. Workers are fully isolated processes with separate heaps. Cluster provides resilience (respawn crashed workers) and multi-core utilization but requires stateless application design or external session storage for sticky sessions.",
    trap:
      "In-memory caches (like node-cache or a plain Map) are worker-local. A cached item written by worker 1 is invisible to worker 2. Engineers migrating from single-process development to cluster mode discover this when cache hit rates drop to near zero under load. Use Redis or Memcached for shared state in clustered environments.",
    memoryAnchor:
      "Cluster = cloning yourself into N copies, each handling customers at a separate cash register but sharing the same store entrance (port). Each clone has its own brain (heap)—clone #1's shopping list (cache) is invisible to clone #2. Need shared memory? Use an external bulletin board (Redis).",
  },
  {
    id: "memory-leaks",
    title: "Memory Leaks in Node.js",
    category: "performance",
    basic:
      "A memory leak occurs when objects are retained in memory longer than necessary, preventing garbage collection. Common causes include global variables, closures holding references, event listener accumulation, and unbounded caches.",
    expected:
      "Common Node.js memory leak patterns: (1) Event listeners added but never removed (EventEmitter warns at >10 listeners by default—heed these warnings). (2) Closures capturing large objects in long-lived scopes. (3) Global Maps/Sets used as caches without eviction (use Map with LRU eviction or WeakMap for object-keyed caches). (4) Request-scoped data stored in module-level variables. (5) Timer intervals (setInterval) that are never cleared. Detection: monitor process.memoryUsage().heapUsed over time; use --expose-gc with global.gc() to force GC in tests.",
    deep:
      "V8's heap snapshots (via node --inspect + Chrome DevTools 'Memory' tab, or heapdump npm module) show object retention trees—which roots hold references to retained objects. The key workflow: take a baseline snapshot, perform the suspected leaking operation N times, take another snapshot, and diff them to identify objects that grew in count. The 'Retainers' pane shows the reference chain preventing GC. WeakRef and FinalizationRegistry (Node.js 14+) enable weak references that don't prevent GC, useful for implementing memoization caches that release under memory pressure. process.memoryUsage() returns rss (resident set size), heapTotal, heapUsed, external (V8 external allocations like Buffers), and arrayBuffers.",
    interviewAnswer:
      "Node.js memory leaks typically stem from retained closures, accumulating event listeners, unbounded global caches, or setInterval never being cleared. Diagnosis uses V8 heap snapshots (via --inspect and Chrome DevTools) to diff heap between suspected leak operations and trace the retention chain. In production, monitor heapUsed trend; a consistently rising sawtooth pattern without a ceiling indicates a leak.",
    trap:
      "Buffer.allocUnsafe(size) is tracked in process.memoryUsage().external, not heapUsed. Leaking Buffers (e.g., from streams that aren't properly closed) won't show up in heap snapshots or heapUsed metrics—you need to monitor external and arrayBuffers too. Large Buffer leaks can exhaust native heap memory without any V8 GC alarm.",
    memoryAnchor:
      "Memory leaks = a hoarder's house. Event listeners pile up like newspapers by the door. Global Maps grow like junk in the attic with no eviction day. Closures are boxes you forgot about that still hold references to heavy furniture. The heap snapshot is your intervention photo—compare before and after to find what's accumulating.",
  },
  {
    id: "cpu-profiling",
    title: "CPU Profiling & --inspect",
    category: "performance",
    basic:
      "Node.js provides a built-in V8 inspector accessible via `node --inspect` or `node --inspect-brk`. Connect Chrome DevTools to profile CPU usage, take heap snapshots, and debug breakpoints.",
    expected:
      "CPU profiling records which functions consume CPU time using V8's sampling profiler (samples the call stack at ~100μs intervals). The flame graph view shows call hierarchies with width proportional to CPU time consumed. Common bottlenecks: hot JSON.parse/stringify, synchronous regex in request handlers, ORM query building overhead. Clinic.js (node-clinic) provides higher-level profiling tools: clinic doctor (detects event loop lag, I/O issues), clinic flame (flame graphs), clinic bubbleprof (async operation visualization).",
    deep:
      "V8's profiler operates in two modes: (1) tick-based sampling (--prof flag generates a v8.log file, processed with node --prof-process) for minimal overhead profiling; (2) inspector protocol-based profiling (used by Chrome DevTools) with more overhead but better developer experience. The --prof output identifies 'unoptimized' and 'deopted' functions—functions V8 couldn't optimize, often due to inconsistent hidden classes or eval usage. For production profiling without stopping the process, Node.js 16+ supports --cpu-prof flag that writes a .cpuprofile on exit. PerformanceObserver API monitors GC events, HTTP timing, and event loop lag without external tools.",
    interviewAnswer:
      "Use `node --inspect` to open the V8 inspector, then connect Chrome DevTools to take CPU profiles and heap snapshots. The CPU flame graph shows time spent per function. For production, --prof generates low-overhead V8 tick logs, and clinic.js provides higher-level diagnostics. PerformanceObserver enables in-process event loop lag monitoring without external tooling.",
    trap:
      "The V8 inspector protocol has non-trivial overhead—attaching Chrome DevTools to a production process can change its performance characteristics. Functions that were JIT-compiled may deoptimize when the debugger attaches. For production profiling, prefer --prof (sampling profiler) or clinic flame (which uses --prof under the hood) over live DevTools attachment.",
    memoryAnchor:
      "CPU profiling is like a sports replay camera that snapshots the call stack every microsecond. The flame graph is a totem pole of function calls—wider blocks ate more CPU time. --inspect opens the VIP skybox (Chrome DevTools), but watching the game from the skybox changes how the players perform (observer effect).",
  },

  // ── SECURITY ──────────────────────────────────────────────────────────────
  {
    id: "prototype-pollution",
    title: "Prototype Pollution",
    category: "security",
    basic:
      "Prototype pollution is a vulnerability where attacker-controlled input modifies Object.prototype, affecting all objects in the application. It occurs when code recursively merges or assigns properties from user input without sanitizing keys like __proto__ or constructor.",
    expected:
      "An attacker sends JSON like `{\"__proto__\": {\"isAdmin\": true}}`. A vulnerable merge function assigns this to the target object's __proto__, adding isAdmin to Object.prototype. Now every plain object in the process has isAdmin: true. This can bypass authorization checks, enable path traversal (if a property like 'outputFunctionName' is read from Object.prototype in a template engine), or cause DoS via property injection into security-critical code paths.",
    deep:
      "Prototype pollution has led to RCEs in popular packages: lodash (CVE-2019-10744), jQuery, hoek. Mitigations: (1) Use Object.create(null) for dictionaries to create prototype-less objects. (2) Validate and sanitize input keys—reject __proto__, constructor, prototype. (3) Use JSON.parse with a reviver that blocks these keys. (4) Use structuredClone() (Node.js 17+) for deep cloning (it doesn't copy prototype chains). (5) Enable --frozen-intrinsics experimental flag to freeze built-in prototypes. (6) Object.freeze(Object.prototype) at startup. (7) Use Map instead of plain objects for key-value stores. Detection: run npm audit and use static analysis tools like Snyk.",
    interviewAnswer:
      "Prototype pollution happens when user-controlled JSON with __proto__ or constructor keys is recursively merged into objects, poisoning Object.prototype globally. Mitigations: validate input keys (reject __proto__, constructor, prototype), use Object.create(null) for dictionaries, use Map for key-value stores, and consider Object.freeze(Object.prototype) at startup. npm audit and Snyk catch vulnerable dependency versions.",
    trap:
      "Object.assign() does not cause prototype pollution because it uses ownPropertyDescriptors—__proto__ is not an own property but an accessor on Object.prototype. Prototype pollution requires recursive merge (like _.merge). However, `JSON.parse('{\"__proto__\": {\"x\": 1}}')` does create an object with an own __proto__ property, which when assigned via a recursive merge does pollute. The distinction between JSON parse behavior and assignment behavior trips up engineers.",
    memoryAnchor:
      "Prototype pollution = someone sneaking into the city water supply (__proto__) and adding poison. Every faucet (object) in town now dispenses poisoned water ({isAdmin: true}). The fix: use bottled water (Object.create(null)) or lock the water plant (Object.freeze(Object.prototype)).",
  },
  {
    id: "path-traversal",
    title: "Path Traversal",
    category: "security",
    basic:
      "Path traversal (directory traversal) attacks use sequences like ../../../etc/passwd in user-controlled file paths to access files outside the intended directory. Node.js's fs module will happily follow these paths.",
    expected:
      "Vulnerable code: `fs.readFile('./uploads/' + req.params.filename, ...)`. An attacker requests /files/../../../etc/passwd. Fix: use path.resolve() to get the absolute path, then verify it starts with the allowed base directory: `const safe = path.resolve('/uploads', filename); if (!safe.startsWith('/uploads/')) return 403;`",
    deep:
      "path.join() does not protect against traversal—it resolves ../ sequences but doesn't validate against a base directory. path.resolve() resolves to an absolute path, and combining it with a startsWith check is the correct pattern. Additional considerations: (1) URL encoding (%2F, %2e%2e) can bypass naive string checks—always decode before checking or use path.resolve. (2) Null byte injection (filename%00.jpg) can truncate filenames in some native code. (3) Case sensitivity: Windows paths are case-insensitive while Linux paths are not—check for both if deploying to mixed environments. (4) Use a library like resolve-path or serve-static (which handles this internally) rather than rolling your own.",
    interviewAnswer:
      "Path traversal allows file system access outside intended directories via ../ sequences. The fix: resolve the user-provided path with path.resolve('/safe/base', userInput), then assert the result starts with '/safe/base/'. Never use path.join() alone as it resolves ../ but doesn't enforce a base constraint. URL-decode inputs before validation to prevent encoding bypass.",
    trap:
      "path.resolve('/base', '../etc/passwd') returns '/etc/passwd'—it resolves to an absolute path correctly, but a naive check for '/base' prefix passes because '/etc/passwd'.startsWith('/base') is false, which is actually correct behavior. The trap is thinking path.resolve prevents traversal rather than understanding it only resolves the path; the startsWith check is the actual security control.",
    memoryAnchor:
      "Path traversal = someone asking for 'Room 3, go back, back, back, into the vault.' The ../../../ is climbing stairs backwards out of the allowed floor. The fix: resolve the full address, then check 'are you still in the building?' (startsWith). path.resolve is just GPS—it tells you WHERE you'd end up, not whether you're ALLOWED there.",
  },
  {
    id: "ssrf",
    title: "Server-Side Request Forgery (SSRF)",
    category: "security",
    basic:
      "SSRF is a vulnerability where an attacker tricks the server into making HTTP requests to unintended destinations—typically internal services (metadata APIs, databases) that the server can reach but the attacker cannot.",
    expected:
      "Vulnerable pattern: `const data = await fetch(req.body.url)`. An attacker provides http://169.254.169.254/latest/meta-data/ (AWS metadata service) or http://internal-db:5432. Node.js will faithfully make the request with the server's credentials and network access. Mitigations: (1) Allowlist permitted domains. (2) Resolve the URL, then check that the resolved IP is not in private ranges (RFC 1918: 10.x.x.x, 172.16-31.x.x, 192.168.x.x) or localhost. (3) Use a network-level firewall to prevent outbound requests to internal ranges.",
    deep:
      "DNS rebinding is a sophisticated SSRF bypass: the attacker uses a domain they control that initially resolves to a valid public IP (passing allowlist checks), then rapidly changes DNS to resolve to an internal IP. The mitigation is to check the resolved IP at both validation and request time (Time-of-Check-Time-of-Use vulnerability). Libraries like ssrf-req-filter implement this. In cloud environments, block access to the metadata IP (169.254.169.254) at the VPC level (IMDSv2 with session tokens in AWS provides a partial mitigation). Also validate URL scheme (only allow https:), port (disallow 22, 5432, 27017), and consider blocking Referer header leakage.",
    interviewAnswer:
      "SSRF allows attackers to make the server fetch internal resources. Mitigate with: URL allowlisting, resolving target IPs and blocking private/loopback ranges (RFC 1918), enforcing https scheme-only, and network-level egress filtering. DNS rebinding bypasses DNS-based checks—validate the resolved IP at request time, not just at allowlist check time.",
    trap:
      "Checking the hostname against an allowlist before making a request is vulnerable to DNS rebinding. An attacker's domain passes the allowlist check resolving to a public IP, then DNS TTL expires and the attacker changes it to 169.254.169.254. The server makes the request to the now-internal IP. The fix requires checking the resolved IP address at both allowlist validation time and immediately before the TCP connection is established.",
    memoryAnchor:
      "SSRF = tricking your butler (server) into fetching something from the secret room (internal network) by handing him a note that says 'go to 169.254.169.254.' The butler has the keys you don't. DNS rebinding is giving the butler a legit address that magically changes to the secret room's address after the security check.",
  },

  // ── DEPLOYMENT ────────────────────────────────────────────────────────────
  {
    id: "graceful-shutdown",
    title: "Graceful Shutdown",
    category: "deployment",
    basic:
      "Graceful shutdown ensures a Node.js process stops cleanly by finishing in-flight requests and releasing resources before exiting, rather than abruptly terminating active connections.",
    expected:
      "Listen for SIGTERM (sent by Kubernetes, systemd, PM2 before killing the process). Call server.close() to stop accepting new connections while letting existing ones finish. Set a timeout (e.g., 30s) to force-exit if shutdown hangs. Release database connections, message queue connections, and any other resources. Signal readiness to exit with process.exit(0).",
    deep:
      "Kubernetes sends SIGTERM to the pod, then waits terminationGracePeriodSeconds (default 30s) before sending SIGKILL. During this window, the pod is still receiving traffic because the endpoints controller may not have removed it from the load balancer yet. The solution: add a pre-stop sleep (5-10s) or wait for readiness probe failure propagation before closing the server. The full sequence: SIGTERM received → stop readiness probe → sleep N seconds → server.close() → drain DB connections → process.exit(0). Keep-alive connections complicate shutdown because server.close() only stops new connections; existing keep-alive connections stay open. Track active connections with a Set and destroy them on shutdown: `res.socket.destroy()` or `req.socket.destroy()` for persistent connections.",
    interviewAnswer:
      "Graceful shutdown: (1) Listen SIGTERM, (2) stop readiness probe, (3) wait for load balancer propagation (~5-10s sleep or pre-stop hook), (4) server.close() to stop accepting new connections, (5) await in-flight requests, (6) close DB connection pools, (7) process.exit(0). Keep-alive connections require explicit socket tracking and destruction since server.close() doesn't force-close them.",
    trap:
      "server.close() in Node.js stops accepting NEW connections but doesn't close existing keep-alive HTTP/1.1 connections. A client with a persistent connection remains connected indefinitely, preventing clean shutdown. Production servers must explicitly track and destroy active sockets or set a Connection: close header during the shutdown window.",
    memoryAnchor:
      "Graceful shutdown = closing a restaurant properly. SIGTERM is 'last call!' Stop seating new guests (server.close()), let current diners finish their meals (in-flight requests), clean the kitchen (close DB pools), lock the doors (process.exit). Skip any step and you get abandoned plates or a health code violation (SIGKILL).",
  },
  {
    id: "pm2",
    title: "PM2 & Process Management",
    category: "deployment",
    basic:
      "PM2 is a production process manager for Node.js that provides process lifecycle management, clustering, log management, and monitoring. It keeps Node.js applications alive after crashes and system restarts.",
    expected:
      "PM2 key features: (1) Cluster mode (pm2 start app.js -i max) forks one process per CPU core using Node.js cluster module. (2) Zero-downtime reload (pm2 reload): sends SIGINT to old workers, starts new workers, waits for readiness, then kills old workers. (3) Ecosystem config file (ecosystem.config.js) for reproducible deployments. (4) pm2 logs with log rotation. (5) pm2 monit for real-time CPU/memory monitoring. (6) pm2 save + pm2 startup to persist processes across system restarts.",
    deep:
      "PM2's zero-downtime reload works by sending SIGINT (not SIGTERM) to the old worker, waiting for it to send a 'ready' message on process.send('ready') from the new worker, then killing the old one. The application must emit the ready signal after completing initialization (DB connections, cache warmup). In Kubernetes, PM2 is largely redundant since Kubernetes itself handles process supervision and rolling updates—use PM2 in non-orchestrated environments (VMs, bare metal) or as a development tool. In containers, it's better to run Node directly as PID 1 with proper signal handling or use a minimal init (tini) rather than PM2, which adds memory overhead and complexity.",
    interviewAnswer:
      "PM2 manages Node.js process lifecycle with crash restarts, cluster mode for multi-core utilization, and zero-downtime reloads. It's most valuable in non-containerized environments. In Kubernetes, the orchestrator replaces PM2's supervision role; running Node as PID 1 with proper SIGTERM handling is preferred. PM2's cluster mode is a convenient wrapper over Node.js's native cluster module.",
    trap:
      "In Docker containers, PM2 runs as a child of the Node process manager—meaning the container's PID 1 is Node.js running PM2, not your application. Signals (SIGTERM from Docker stop) go to PID 1 (PM2), which may or may not propagate them correctly to your workers. PM2 does forward SIGTERM, but startup/shutdown race conditions in containers cause subtler issues. Test signal handling explicitly in containerized environments.",
    memoryAnchor:
      "PM2 is a helicopter parent for your Node.js processes—restarts them when they crash, clones them across CPU cores (cluster mode), and does hot-swaps (zero-downtime reload). In Kubernetes, the helicopter parent is redundant because K8s is already the overprotective grandparent doing all of that.",
  },
  {
    id: "twelve-factor",
    title: "12-Factor App in Node.js",
    category: "deployment",
    basic:
      "The 12-factor methodology defines principles for building portable, scalable cloud-native applications. Key principles for Node.js: configuration via environment variables, stateless processes, explicit dependency declarations.",
    expected:
      "Key 12-factor principles for Node.js: (I) Codebase—one repo, multiple deploys. (III) Config—environment variables only, never hardcoded or config files in repo (use dotenv for local dev, never in production). (IV) Backing services—treat DB, queue, cache as attached resources via URLs. (VI) Processes—stateless; store session state externally. (VII) Port binding—self-contained HTTP server, not app server. (IX) Disposability—fast startup, graceful shutdown. (XI) Logs—treat logs as event streams (stdout/stderr only; let infrastructure aggregate).",
    deep:
      "Node.js aligns well with most 12-factor principles but tension exists with factor IX (disposability): Node.js startup can be slow with large dependency trees and connection pool warmup. Techniques: lazy initialization of connections, pre-warmed Lambda containers (AWS), or explicit health check readiness gates. Factor XI (logs as streams) conflicts with popular logging libraries that write to files—use structured JSON logging to stdout (pino, winston with stdout transport) and let infrastructure (Fluentd, Datadog agent) aggregate. Config via env vars has a scale problem with many services; Vault or AWS Parameter Store with startup-time injection solves this without violating the factor.",
    interviewAnswer:
      "12-factor principles most relevant to Node.js: configuration exclusively via environment variables, stateless processes (no in-memory session state), logs as stdout streams (not files), explicit dependency declarations (package.json with lockfile), and graceful fast startup/shutdown. Node.js microservices naturally fit this model; friction points are startup time (warmup) and secret management at scale.",
    trap:
      "Storing secrets in .env files committed to version control violates factor III and is a common breach vector. The .env file is for local development only; production config must come from the environment via an orchestration layer (Kubernetes Secrets, AWS SSM, Vault). Libraries like dotenv should be excluded from production builds or guarded with NODE_ENV checks.",
    memoryAnchor:
      "12-factor = the 'house rules' for well-behaved cloud tenants. Config in env vars (not hidden files), logs to stdout (yell out the window, let the building manager collect them), stateless processes (no hoarding stuff in your apartment between visitors), and fast move-in/move-out (disposability).",
  },

  // ── DATABASES ─────────────────────────────────────────────────────────────
  {
    id: "connection-pooling",
    title: "Database Connection Pooling",
    category: "databases",
    basic:
      "Connection pooling maintains a set of reusable database connections rather than opening and closing one per query. Opening a TCP connection and authenticating is expensive; pools amortize this cost across many queries.",
    expected:
      "Pool configuration parameters: min (connections always open), max (maximum connections), idleTimeoutMillis (close idle connections after N ms), connectionTimeoutMillis (throw if no connection available after N ms). A pool size of max=10 means a maximum of 10 concurrent queries to the database; further requests queue. Pool size should be tuned against database max_connections and application concurrency requirements. pg (node-postgres) uses Pool; mysql2 uses createPool; Sequelize and TypeORM have internal pools.",
    deep:
      "Pool sizing is a nuanced science. A common mistake is setting max too high: a PostgreSQL database with max_connections=100 and 10 Node.js instances each with pool max=20 creates 200 potential connections, exceeding the limit. The formula: (pool max per instance) × (Node.js instances) ≤ (DB max_connections - reserved connections for admin). Too few connections starves throughput; too many causes connection overhead and contention on the DB. Connection pools in Node.js are process-local—cluster mode (10 workers, max=10 each) creates 100 DB connections. Monitor pool utilization metrics (pool.totalCount, pool.idleCount, pool.waitingCount in pg) to right-size. PgBouncer as a connection proxy at the DB layer is the scalable solution for many application instances.",
    interviewAnswer:
      "Connection pools reuse TCP connections to the database across queries, avoiding expensive handshake overhead. Key parameters: min, max, idleTimeout, connectionTimeout. Pool max × process count must not exceed DB max_connections. In clustered Node.js, each worker has its own pool—a cluster of 4 workers with pool max=25 creates 100 DB connections. Use PgBouncer for large-scale multi-instance deployments.",
    trap:
      "Async functions that open a pool connection in a try block but throw before releasing it will exhaust the pool. Always use try/finally to release: `const client = await pool.connect(); try { await client.query(...); } finally { client.release(); }`. Without the finally, the connection leaks and the pool eventually blocks all new queries with connection timeout errors.",
    memoryAnchor:
      "Connection pooling = a hotel with N rooms (connections). Guests (queries) check in and out instead of building a new room each time. If all 10 rooms are full, new guests wait in the lobby (queue). Forget to check out (release)? You exhaust the hotel and everyone sleeps in the lobby forever.",
  },
  {
    id: "async-queries",
    title: "Async Query Patterns",
    category: "databases",
    basic:
      "Database queries in Node.js are asynchronous—they return Promises (or accept callbacks in older drivers). Use async/await for sequential queries and Promise.all for parallel independent queries.",
    expected:
      "Sequential (dependent) queries use await: `const user = await getUser(id); const orders = await getOrders(user.id)`. Parallel (independent) queries use Promise.all: `const [user, products] = await Promise.all([getUser(id), getProducts()])`. Promise.allSettled() runs all queries regardless of failures, returning status+value/reason for each. Transactions require a single connection held across multiple queries: acquire a client from the pool, BEGIN, run queries, COMMIT or ROLLBACK on error, release the client.",
    deep:
      "Transaction isolation in Node.js requires careful connection management. Using pool.query() for transactions is wrong—pool.query() may use different connections for each call. Correct pattern: `const client = await pool.connect(); await client.query('BEGIN'); try { await client.query(q1); await client.query(q2); await client.query('COMMIT'); } catch (e) { await client.query('ROLLBACK'); throw e; } finally { client.release(); }`. Async iterators for large result sets: pg's Cursor and many ORMs support streaming query results, enabling per-row processing without buffering the entire result set in memory. For high-throughput bulk inserts, use multi-value INSERT statements or COPY (PostgreSQL) rather than individual INSERT per row.",
    interviewAnswer:
      "Use async/await for sequential queries, Promise.all for parallel independent queries. Database transactions require a single borrowed pool connection across all query calls—using pool.query() for transactions is a bug because different calls may use different connections. Always release connections in a finally block. Stream large result sets with database cursors to avoid buffering entire tables in memory.",
    trap:
      "await query1; await query2 when the queries are independent serializes them unnecessarily. Two 50ms queries run sequentially take 100ms; with Promise.all they take 50ms. In a high-traffic API this serialization compounds across thousands of requests. Profile query execution to identify sequential waits on independent operations and parallelize them.",
    memoryAnchor:
      "Sequential awaits = ordering food, waiting for it to arrive, THEN ordering drinks. Promise.all = ordering food AND drinks at the same time—both arrive in parallel. Transactions = one waiter (connection) who must carry ALL your dishes on one tray (BEGIN...COMMIT) or drop them all (ROLLBACK).",
  },
  {
    id: "n-plus-one",
    title: "N+1 Query Problem",
    category: "databases",
    basic:
      "The N+1 problem occurs when code fetches a list of N items, then makes a separate database query for each item to fetch related data, resulting in N+1 total queries instead of 1-2.",
    expected:
      "Classic example: fetch 100 blog posts, then for each post fetch its author—101 queries. The fix: use a JOIN query to fetch posts with authors in one query, or use a dataloader pattern to batch author queries into a single IN clause query. ORMs with eager loading (Sequelize include, TypeORM relations with eager: true) solve this at the ORM layer. But ORMs with lazy loading (the default in many ORMs) are the root cause—accessing a relation property triggers a query.",
    deep:
      "The DataLoader pattern (from Facebook's dataloader library) batches and caches queries: instead of querying for user 1, user 2, user 3 independently, DataLoader collects all user IDs requested in a single event loop tick and issues one query: SELECT * FROM users WHERE id IN (1, 2, 3). Per-request DataLoader instances ensure caching is request-scoped (avoiding stale data across requests). DataLoader is the standard solution for GraphQL resolvers where each resolver field independently fetches data. In REST APIs, prefer query-level joins or SQL window functions to avoid multiple round trips.",
    interviewAnswer:
      "N+1 occurs when fetching a list triggers per-item queries for related data. Solutions: (1) SQL JOINs to fetch relations in one query, (2) eager loading in ORMs, (3) DataLoader pattern to batch independent lookups into a single IN-clause query. DataLoader is essential in GraphQL resolvers. Always check the number of queries with ORM query logging when developing features involving relations.",
    trap:
      "ORM lazy loading is the silent killer—accessing a relation property like `post.author` outside an explicitly loaded eager context issues a new SQL query invisibly. In a loop over 1000 posts, this creates 1000 queries with no error, just a slow endpoint. Always enable ORM query logging in development and set a query count alert in staging to catch N+1 regressions before production.",
    memoryAnchor:
      "N+1 = asking a librarian for 100 books, then making 100 separate trips to ask 'who wrote this one?' DataLoader is the smart librarian who collects all your author questions, waits a beat, then answers them all with ONE trip to the card catalog (SELECT WHERE id IN (...)).",
  },
];

const interviewPatterns: InterviewPattern[] = [
  {
    question: "Explain the Node.js event loop and what happens when you call setTimeout(fn, 0).",
    answer:
      "The event loop cycles through six phases: timers, pending callbacks, idle/prepare, poll, check, and close. setTimeout(fn, 0) schedules the callback in the timers phase with a minimum delay of 1ms. The poll phase blocks waiting for I/O if nothing is scheduled. process.nextTick callbacks drain before every phase transition; Promise microtasks drain after nextTick but before the next phase. So setTimeout(fn, 0) fires at the start of the next loop iteration's timers phase—after all microtasks from the previous phase have drained.",
    whyAsked:
      "Tests understanding of Node.js internals and async execution order, which directly impacts correct usage of async patterns and debugging of race conditions.",
    trap:
      "Saying setTimeout(fn, 0) fires 'immediately after the current code'—it fires at the timers phase, potentially many microtasks and even one full loop iteration later if the poll phase is blocking.",
  },
  {
    question: "How does Node.js handle 10,000 concurrent connections efficiently?",
    answer:
      "Node.js uses OS-native async I/O (epoll on Linux) to monitor all 10,000 socket file descriptors with a single thread. When a socket has data, the OS notifies Node via epoll, and the associated callback is queued. No threads are created per connection. The event loop processes these callbacks sequentially. The bottleneck isn't concurrency (I/O waiting) but CPU time per request—if request handling is fast (~1ms), throughput is ~1000 req/s per core.",
    whyAsked:
      "Core architectural question. Interviewers want to see that you understand the epoll model versus thread-per-connection and the specific conditions where Node excels and fails.",
    trap:
      "Saying Node.js is 'multi-threaded' or conflating libuv's thread pool with connection handling. Network I/O uses zero threads; threads only handle fs, crypto, and DNS.",
  },
  {
    question: "What is backpressure in Node.js streams and how do you handle it?",
    answer:
      "Backpressure signals that a consumer can't keep up with a producer. In Node.js streams, writable.write() returns false when the internal buffer exceeds highWaterMark. The producer should stop calling write() and listen for the 'drain' event. pipe() and stream.pipeline() handle this automatically. Manual consumers using for-await-of or direct write() must explicitly check the return value and await a promisified drain event when false is returned.",
    whyAsked:
      "Stream backpressure is a common interview topic because ignoring it causes OOM crashes in production, and many engineers don't know it exists until they encounter it.",
    trap:
      "Saying pipe() 'handles everything'—pipe() doesn't propagate errors. An error in any stream leaves others open. stream.pipeline() (Node.js 10+) is the correct production choice.",
  },
  {
    question:
      "What is prototype pollution and how would you prevent it in a Node.js API that accepts JSON?",
    answer:
      "Prototype pollution occurs when user-controlled input with __proto__ or constructor keys is recursively merged into an object, adding properties to Object.prototype and affecting all objects in the process. Prevention: (1) validate and reject input keys matching __proto__, constructor, prototype before merging; (2) use Object.create(null) for dictionary objects; (3) use JSON.parse with a reviver that filters these keys; (4) use Map instead of plain objects for user-keyed data; (5) freeze Object.prototype at startup in security-critical applications.",
    whyAsked:
      "Tests security knowledge for production Node.js. This vulnerability has caused critical CVEs in lodash, jQuery, and other widely-used libraries.",
    trap:
      "Thinking JSON.parse is safe by default—JSON.parse('{\"__proto__\":{\"x\":1}}') creates an object with an own __proto__ property, which when spread or merged recursively does pollute the prototype. Parsing alone doesn't protect you.",
  },
  {
    question:
      "Your Node.js app's response times are degrading under load. How do you diagnose and fix it?",
    answer:
      "First, measure event loop lag with a simple setInterval timer or the 'perf_hooks' PerformanceObserver. High lag indicates event loop blocking. Use node --inspect and Chrome DevTools CPU profiler to identify hot functions. Check for: synchronous operations in hot paths (JSON.parse of large payloads, sync crypto, sync fs), N+1 database queries, memory leaks causing GC pressure, and libuv thread pool saturation (check UV_THREADPOOL_SIZE against bcrypt/fs concurrency). Clinic.js automates this with doctor, flame, and bubbleprof tools.",
    whyAsked:
      "Practical production debugging question. Tests knowledge of profiling tools, event loop mechanics, and systematic diagnosis.",
    trap:
      "Jumping to 'add more servers' without diagnosing. Horizontal scaling doesn't fix a blocked event loop—it just distributes the same bottleneck across more instances.",
  },
  {
    question:
      "Explain the difference between worker_threads and the cluster module. When would you use each?",
    answer:
      "Cluster forks independent processes with separate heaps and event loops, sharing a port. Workers are OS-level processes with full process isolation and separate memory—ideal for multi-core HTTP serving and process-level resilience. Worker threads run JavaScript in parallel threads within the same process, sharing memory via SharedArrayBuffer—ideal for CPU-bound computation without the per-process overhead. Use cluster for I/O-bound services needing multi-core utilization and crash isolation. Use worker_threads for CPU-heavy tasks (image processing, cryptography, ML) that would block the main thread.",
    whyAsked:
      "Tests understanding of Node.js concurrency primitives, their tradeoffs, and correct application to production scenarios.",
    trap:
      "Using cluster for CPU-bound tasks—cluster distributes incoming HTTP connections across processes but each process still has a single event loop. A CPU-bound request in a cluster worker blocks that worker's event loop for all its in-flight requests.",
  },
  {
    question:
      "How do you implement graceful shutdown for a Node.js HTTP server in Kubernetes?",
    answer:
      "Listen for SIGTERM. On receipt: (1) mark readiness probe as failing (so Kubernetes removes pod from service endpoints), (2) sleep 5-10 seconds to let in-flight requests at the load balancer drain, (3) call server.close() to stop accepting new connections, (4) track and destroy active keep-alive connections (server.close() doesn't close them), (5) await pending async work (queue consumers, scheduled jobs), (6) close database connection pools, (7) process.exit(0). Set a deadline (e.g., 25s) before terminationGracePeriodSeconds (30s) to force exit before SIGKILL.",
    whyAsked:
      "Critical production Kubernetes knowledge. Tests understanding of pod lifecycle, connection draining, and resource cleanup.",
    trap:
      "Calling server.close() immediately on SIGTERM without the sleep. Kubernetes continues routing traffic to the pod for several seconds after SIGTERM because endpoint removal propagates asynchronously through the control plane.",
  },
  {
    question: "How does CommonJS module caching work and when could it cause bugs?",
    answer:
      "After the first require() of a module, Node caches the exports object in require.cache keyed by the resolved absolute filename. Subsequent require() calls return the cached object without re-executing the module. This makes module-level singletons reliable (e.g., a database connection pool). It can cause bugs when: (1) tests expect a fresh module state between test cases but share the cache, (2) circular dependencies return partially-constructed exports, (3) mocking requires deleting from require.cache before require()—Jest handles this with its module registry. Deleting require.cache entries enables hot-reload but can cause memory leaks if old module closures hold references.",
    whyAsked:
      "Tests deep understanding of CJS behavior, relevant to testing patterns, module singletons, and debugging subtle initialization bugs.",
    trap:
      "Assuming file path changes (symlinks, different casing on case-insensitive filesystems) result in different cache entries—they may or may not depending on how require() resolves the path. On macOS (case-insensitive), require('./Foo') and require('./foo') may resolve to the same cache entry.",
  },
];

const commonMistakes: CommonMistake[] = [
  {
    wrong:
      "Using fs.readFileSync, crypto.pbkdf2Sync, or other *Sync methods inside HTTP request handlers",
    correct:
      "Use async counterparts (fs.readFile with promises, crypto.pbkdf2, etc.) to avoid blocking the event loop and stalling all concurrent requests",
  },
  {
    wrong:
      "Ignoring the return value of writable.write() and writing continuously without waiting for 'drain'",
    correct:
      "Check the return value of write(); if false, stop writing and attach a one-time 'drain' listener before resuming. Use stream.pipeline() when possible",
  },
  {
    wrong:
      "Using pipe() in production stream pipelines without error handling (`readable.pipe(transform).pipe(writable)`)",
    correct:
      "Use stream.pipeline(readable, transform, writable, (err) => { if (err) handle(err); }) which propagates errors and destroys all streams on failure",
  },
  {
    wrong:
      "Setting module.exports by reassigning the exports shorthand: `exports = { foo: 'bar' }`",
    correct:
      "Assign directly to module.exports (`module.exports = { foo: 'bar' }`) or add properties to exports (`exports.foo = 'bar'`). Reassigning exports breaks the reference",
  },
  {
    wrong:
      "Creating a new database connection per HTTP request instead of using a connection pool",
    correct:
      "Initialize a connection pool at startup and reuse it across all requests. Close the pool on graceful shutdown",
  },
  {
    wrong:
      "Acquiring a pool connection for a transaction but releasing it in the success path only, not in catch blocks",
    correct:
      "Always release connections in a finally block: `try { await client.query(...); } finally { client.release(); }` to prevent pool exhaustion",
  },
  {
    wrong:
      "Using process.nextTick for recursive async iteration (scanning a large array and calling nextTick per item)",
    correct:
      "Use setImmediate for recursive async patterns that need to yield to I/O. nextTick drains completely before any I/O callback, starving network operations",
  },
  {
    wrong:
      "Merging user-controlled request body into objects without sanitizing __proto__ and constructor keys",
    correct:
      "Validate input keys before deep merging, use Object.create(null) for dictionaries, or use the structuredClone() built-in for safe deep cloning",
  },
  {
    wrong:
      "Serving user-provided filenames directly: `res.sendFile('./uploads/' + req.params.file)`",
    correct:
      "Resolve and validate: `const p = path.resolve('/uploads', req.params.file); if (!p.startsWith('/uploads/')) return 403; res.sendFile(p);`",
  },
  {
    wrong:
      "Calling server.close() immediately on SIGTERM without waiting for load balancer propagation in Kubernetes",
    correct:
      "After SIGTERM, mark health check failing, sleep 5-10 seconds for LB propagation, then close server and drain connections before process.exit(0)",
  },
  {
    wrong:
      "Setting pool.max too high across multiple Node.js instances without checking the database's max_connections limit",
    correct:
      "Ensure (pool.max × instance count) ≤ (DB max_connections − reserved slots). Use PgBouncer for large deployments to multiplex connections",
  },
  {
    wrong:
      "Fetching a list then looping over it with individual await queries for related data (N+1 pattern)",
    correct:
      "Use SQL JOINs, ORM eager loading, or the DataLoader batching pattern to consolidate related data into one or two queries",
  },
];

const practiceQuestions: PracticeQuestion[] = [
  {
    code: `const promises = [];
for (let i = 0; i < 1000; i++) {
  promises.push(db.query(\`SELECT * FROM users WHERE id = \${i}\`));
}
const results = await Promise.all(promises);`,
    question:
      "What problem does this code have, and how would you fix it for a production API that needs to fetch 1000 user records?",
    answer:
      "This creates 1000 simultaneous database queries, potentially exhausting the connection pool and overwhelming the database. Fix: batch the IDs into a single query using WHERE id IN (...): `const results = await db.query('SELECT * FROM users WHERE id = ANY($1)', [Array.from({length: 1000}, (_, i) => i)])`. For more complex per-item resolution (e.g., in GraphQL), use the DataLoader library to batch and cache requests within a single event loop tick.",
  },
  {
    code: `process.nextTick(function tick() {
  doSomeWork();
  process.nextTick(tick);
});

http.createServer((req, res) => {
  res.end('hello');
}).listen(3000);`,
    question: "What happens when this server receives an HTTP request? Will it respond?",
    answer:
      "The server will never respond to HTTP requests. The recursive process.nextTick creates an infinite loop that drains the nextTick queue perpetually. Because the event loop cannot advance past any phase (all phase transitions drain the nextTick queue first), the poll phase that would receive the HTTP connection is never reached. Fix: replace process.nextTick(tick) with setImmediate(tick) to yield to I/O between iterations.",
  },
  {
    code: `const http = require('http');
const server = http.createServer((req, res) => {
  res.end('OK');
});
server.listen(3000);

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});`,
    question:
      "This is deployed on Kubernetes. What are the two main production problems with this shutdown handler?",
    answer:
      "Problem 1: No sleep after SIGTERM before server.close(). Kubernetes continues routing traffic to the pod for ~5-10 seconds after SIGTERM while endpoints propagation completes. Requests arriving during this window are refused because the server is already closed. Problem 2: server.close() only stops new connections—existing keep-alive HTTP/1.1 connections stay open indefinitely, so the close callback may never fire. Fix: add a 5-10s sleep before server.close(), track active sockets and call socket.destroy() on each during shutdown, and add a forced process.exit timeout as a safety net.",
  },
  {
    code: `const merge = (target, source) => {
  for (const key of Object.keys(source)) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key]) target[key] = {};
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};

app.post('/config', (req, res) => {
  const config = merge({}, req.body);
  res.json({ success: true });
});`,
    question:
      "Identify the security vulnerability and demonstrate how an attacker would exploit it.",
    answer:
      "This is a prototype pollution vulnerability. The merge function iterates Object.keys(source), which for JSON input `{\"__proto__\": {\"isAdmin\": true}}` includes the string '__proto__'. The assignment `target['__proto__'] = {}` followed by `target['__proto__']['isAdmin'] = true` sets Object.prototype.isAdmin = true, making every subsequent `{}` in the process have isAdmin = true. An attacker POSTs `{\"__proto__\": {\"isAdmin\": true}}` and now `({}).isAdmin === true` everywhere. Fix: replace `Object.keys(source)` with a key allowlist, reject keys matching /^(__proto__|constructor|prototype)$/, or use structuredClone() for deep copying.",
  },
  {
    code: `const fs = require('fs');
const { Readable, Writable } = require('stream');

const readable = new Readable({
  read() {
    for (let i = 0; i < 1e6; i++) {
      this.push(Buffer.alloc(1024, 'x'));
    }
    this.push(null);
  }
});

const writable = new Writable({
  write(chunk, encoding, callback) {
    setTimeout(callback, 10); // simulate slow consumer
  }
});

readable.pipe(writable);`,
    question:
      "The Readable's _read is called once and pushes 1 million 1KB chunks. Describe what happens to memory usage.",
    answer:
      "Memory usage will spike dramatically. The Readable's _read pushes all 1 million chunks (1GB total) in a single synchronous call, filling the Readable's internal buffer. pipe() will pause the Readable once the Writable's highWaterMark is exceeded, but by then all 1GB is already buffered because _read pushed everything synchronously before backpressure could take effect. Fix: push chunks lazily—push one chunk per _read call: `read() { this.push(Buffer.alloc(1024, 'x')); }`. Node calls _read again when the consumer is ready for more, enabling proper backpressure.",
  },
  {
    code: `const pool = require('./db'); // pg Pool instance

app.get('/user/:id', async (req, res) => {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  client.release();
  res.json(result.rows[0]);
});`,
    question:
      "This endpoint leaks database connections under certain conditions. When does the leak occur and how do you fix it?",
    answer:
      "If client.query() throws an error (e.g., a database error or malformed query), the code throws before reaching client.release(), permanently leaking the connection. With enough errors, the pool exhausts and all subsequent requests hang waiting for an available connection. Fix: wrap in try/finally: `const client = await pool.connect(); try { const result = await client.query(...); res.json(result.rows[0]); } catch (err) { res.status(500).json({ error: err.message }); } finally { client.release(); }`. Alternatively, use pool.query() directly for single queries—it acquires and releases the connection automatically.",
  },
  {
    code: `// ESM module: counter.mjs
export let count = 0;
export function increment() { count++; }

// consumer.mjs
import { count, increment } from './counter.mjs';
console.log(count); // 0
increment();
console.log(count); // ?`,
    question:
      "What does the second console.log print, and would the answer be different in CommonJS?",
    answer:
      "The second console.log prints 1. ESM exports are live bindings—count is not a copy but a live reference to the exporting module's count variable. When increment() modifies the module-level count, the binding in consumer.mjs reflects the change. In CommonJS, `const { count, increment } = require('./counter')` destructures count into a local copy (primitive value). After increment(), the local count is still 0—it's a copy made at require() time, not a live binding. This is a fundamental semantic difference between ESM and CJS that affects mutable exported primitives.",
  },
  {
    code: `async function processItems(items) {
  const results = [];
  for (const item of items) {
    const result = await expensiveAsyncOperation(item);
    results.push(result);
  }
  return results;
}`,
    question:
      "This processes 10,000 items. What are the performance implications and what are two better approaches?",
    answer:
      "Sequential await processes items one at a time. If expensiveAsyncOperation takes 10ms each, 10,000 items take 100 seconds. Each await creates a microtask that drains before I/O, but the real issue is serial execution. Approach 1—Full parallelism: `const results = await Promise.all(items.map(item => expensiveAsyncOperation(item)))`. Runs all 10,000 concurrently; risk: overwhelming external services or the DB connection pool. Approach 2—Controlled concurrency with a semaphore or p-limit: `const limit = pLimit(50); const results = await Promise.all(items.map(item => limit(() => expensiveAsyncOperation(item))))`. Runs 50 at a time, balancing throughput and resource pressure. This is production-correct for rate-limited APIs and bounded DB pools.",
  },
];

export const topicData: TopicData = {
  topicTitle: "Node.js",
  topicMeta: "45–60 min · Mid to Senior level",
  lastUpdated: "2026-04-10",
  lastHourConceptIds: [
    "event-loop-phases",
    "libuv",
    "backpressure",
    "prototype-pollution",
    "worker-threads",
    "graceful-shutdown",
    "connection-pooling",
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
