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
    "JavaScript is a single-threaded, event-driven, non-blocking language that runs on V8 (Node/Chrome), SpiderMonkey (Firefox), or JavaScriptCore (Safari). Its runtime consists of a call stack, a heap for memory allocation, a Web/Node API layer, a microtask queue (Promises/queueMicrotask), and a macrotask queue (setTimeout/setInterval/I/O). The event loop coordinates these, draining the entire microtask queue after every macrotask before painting or picking up the next task.",
  whyItExists:
    "Designed in 10 days by Brendan Eich as a scripting glue language for the web, JavaScript's single-threaded model avoids race conditions in UI code. Its prototype-based object system, first-class functions, and closures enable powerful patterns without heavyweight OOP ceremony. V8's JIT compilation (TurboFan/Maglev), hidden classes, and inline caches make it fast enough for server workloads too.",
  whenToUse: [
    "Browser UI — the only language that runs natively in all browsers",
    "Server-side APIs and microservices via Node.js or Deno",
    "Real-time applications (WebSockets, SSE) where event-driven I/O excels",
    "Isomorphic/universal rendering (Next.js, Remix) to share code across client and server",
    "CLI tooling and build pipelines (esbuild, Rollup, Vite are all JS/TS)",
    "Edge computing runtimes (Cloudflare Workers, Vercel Edge) with minimal cold starts",
  ],
  whereItFails: [
    "CPU-bound workloads — single thread means one heavy computation blocks everything; offload to Worker threads or WebAssembly",
    "Type safety at scale — dynamic typing leads to runtime bugs; TypeScript mitigates but adds compile step",
    "Numerical precision — IEEE 754 doubles cause 0.1 + 0.2 !== 0.3; use BigInt or decimal libraries for finance",
    "Memory-intensive data pipelines — GC pauses and no manual memory control; Python/Rust/Go are better fits",
    "Strong consistency distributed systems — async event loop design favors eventual consistency patterns",
  ],
};

// ─── Categories ───────────────────────────────────────────────────────────────
const categories: CategoryMeta[] = [
  {
    id: "event-loop",
    label: "Event Loop",
    description:
      "Call stack, heap, task queue, microtask queue — how JavaScript achieves non-blocking concurrency on a single thread",
  },
  {
    id: "closures-scope",
    label: "Closures & Scope",
    description:
      "Lexical scoping, closure mechanics, IIFE, module pattern, variable hoisting — JavaScript's function-centric memory model",
  },
  {
    id: "prototypes-oop",
    label: "Prototypes & OOP",
    description:
      "Prototype chain, Object.create, ES6 class syntax, inheritance, hasOwnProperty — how objects and delegation really work",
  },
  {
    id: "async-patterns",
    label: "Async Patterns",
    description:
      "Callbacks, Promises, async/await, Promise combinators, error handling — building reliable async flows",
  },
  {
    id: "types-coercion",
    label: "Types & Coercion",
    description:
      "Dynamic typing, typeof quirks, implicit coercion rules, == vs ===, truthy/falsy — JavaScript's type system edge cases",
  },
  {
    id: "modern-es6",
    label: "Modern ES6+",
    description:
      "Destructuring, spread/rest, generators, iterators, WeakMap/WeakSet, Symbol, Proxy/Reflect — contemporary JavaScript features",
  },
  {
    id: "performance",
    label: "Performance & Memory",
    description:
      "V8 optimization hints, hidden classes, memory leaks (closures, event listeners, detached DOM), debounce/throttle",
  },
  {
    id: "modules",
    label: "Modules & Bundling",
    description:
      "CommonJS vs ESM, dynamic import(), tree shaking, circular dependencies, bundler implications",
  },
];

// ─── Mental Model Tree ────────────────────────────────────────────────────────
const mentalModelTree: TreeNode = {
  id: "root",
  label: "JavaScript Engine",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "cat-event-loop",
      label: "Event Loop",
      nodeType: "category",
      importance: "critical",
      children: [
        {
          id: "node-call-stack",
          label: "Call Stack",
          nodeType: "concept",
          conceptId: "call-stack",
          importance: "critical",
        },
        {
          id: "node-microtask-queue",
          label: "Microtask Queue",
          nodeType: "concept",
          conceptId: "microtask-queue",
          importance: "critical",
        },
        {
          id: "node-macrotask-queue",
          label: "Macrotask Queue",
          nodeType: "concept",
          conceptId: "macrotask-queue",
          importance: "high",
        },
        {
          id: "node-event-loop-tick",
          label: "Event Loop Tick",
          nodeType: "concept",
          conceptId: "event-loop-tick",
          importance: "critical",
          relatedIds: ["microtask-queue", "macrotask-queue"],
        },
      ],
    },
    {
      id: "cat-closures-scope",
      label: "Closures & Scope",
      nodeType: "category",
      importance: "critical",
      children: [
        {
          id: "node-closure",
          label: "Closure",
          nodeType: "concept",
          conceptId: "closure",
          importance: "critical",
        },
        {
          id: "node-hoisting",
          label: "Hoisting",
          nodeType: "concept",
          conceptId: "hoisting",
          importance: "high",
        },
        {
          id: "node-scope-chain",
          label: "Scope Chain",
          nodeType: "concept",
          conceptId: "scope-chain",
          importance: "high",
        },
        {
          id: "node-iife",
          label: "IIFE & Module Pattern",
          nodeType: "concept",
          conceptId: "iife",
          importance: "medium",
        },
      ],
    },
    {
      id: "cat-prototypes-oop",
      label: "Prototypes & OOP",
      nodeType: "category",
      importance: "critical",
      children: [
        {
          id: "node-prototype-chain",
          label: "Prototype Chain",
          nodeType: "concept",
          conceptId: "prototype-chain",
          importance: "critical",
        },
        {
          id: "node-class-syntax",
          label: "Class Syntax",
          nodeType: "concept",
          conceptId: "class-syntax",
          importance: "high",
        },
        {
          id: "node-this-binding",
          label: "this Binding",
          nodeType: "concept",
          conceptId: "this-binding",
          importance: "critical",
        },
        {
          id: "node-object-create",
          label: "Object.create & Delegation",
          nodeType: "concept",
          conceptId: "object-create",
          importance: "medium",
        },
      ],
    },
    {
      id: "cat-async-patterns",
      label: "Async Patterns",
      nodeType: "category",
      importance: "critical",
      children: [
        {
          id: "node-promises",
          label: "Promises",
          nodeType: "concept",
          conceptId: "promises",
          importance: "critical",
        },
        {
          id: "node-async-await",
          label: "async/await",
          nodeType: "concept",
          conceptId: "async-await",
          importance: "critical",
        },
        {
          id: "node-promise-combinators",
          label: "Promise Combinators",
          nodeType: "concept",
          conceptId: "promise-combinators",
          importance: "high",
        },
        {
          id: "node-error-handling-async",
          label: "Async Error Handling",
          nodeType: "concept",
          conceptId: "error-handling-async",
          importance: "high",
        },
      ],
    },
    {
      id: "cat-types-coercion",
      label: "Types & Coercion",
      nodeType: "category",
      importance: "high",
      children: [
        {
          id: "node-type-coercion",
          label: "Type Coercion",
          nodeType: "concept",
          conceptId: "type-coercion",
          importance: "critical",
        },
        {
          id: "node-equality",
          label: "== vs ===",
          nodeType: "concept",
          conceptId: "equality",
          importance: "high",
        },
        {
          id: "node-typeof-quirks",
          label: "typeof Quirks",
          nodeType: "concept",
          conceptId: "typeof-quirks",
          importance: "medium",
        },
      ],
    },
    {
      id: "cat-modern-es6",
      label: "Modern ES6+",
      nodeType: "category",
      importance: "high",
      children: [
        {
          id: "node-generators",
          label: "Generators & Iterators",
          nodeType: "concept",
          conceptId: "generators",
          importance: "high",
        },
        {
          id: "node-proxy-reflect",
          label: "Proxy & Reflect",
          nodeType: "concept",
          conceptId: "proxy-reflect",
          importance: "medium",
        },
        {
          id: "node-weakmap-weakset",
          label: "WeakMap & WeakSet",
          nodeType: "concept",
          conceptId: "weakmap-weakset",
          importance: "medium",
        },
      ],
    },
    {
      id: "cat-performance",
      label: "Performance & Memory",
      nodeType: "category",
      importance: "high",
      children: [
        {
          id: "node-memory-leaks",
          label: "Memory Leaks",
          nodeType: "concept",
          conceptId: "memory-leaks",
          importance: "high",
        },
        {
          id: "node-debounce-throttle",
          label: "Debounce & Throttle",
          nodeType: "concept",
          conceptId: "debounce-throttle",
          importance: "high",
        },
        {
          id: "node-v8-optimization",
          label: "V8 Optimization",
          nodeType: "concept",
          conceptId: "v8-optimization",
          importance: "medium",
        },
      ],
    },
    {
      id: "cat-modules",
      label: "Modules & Bundling",
      nodeType: "category",
      importance: "high",
      children: [
        {
          id: "node-esm-cjs",
          label: "ESM vs CommonJS",
          nodeType: "concept",
          conceptId: "esm-cjs",
          importance: "high",
        },
        {
          id: "node-dynamic-import",
          label: "Dynamic import()",
          nodeType: "concept",
          conceptId: "dynamic-import",
          importance: "medium",
        },
        {
          id: "node-tree-shaking",
          label: "Tree Shaking",
          nodeType: "concept",
          conceptId: "tree-shaking",
          importance: "medium",
        },
      ],
    },
  ],
};

// ─── Last Hour Summary ────────────────────────────────────────────────────────
const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "The event loop drains ALL microtasks (Promise callbacks, queueMicrotask) before picking the next macrotask — Promise.then always runs before setTimeout even with 0ms delay.",
    "Closures capture the variable binding, not the value — classic loop-with-var bug: all callbacks share the same 'i' reference; fix with let (block scope) or IIFE.",
    "JavaScript classes are syntactic sugar over prototype delegation — 'class' does not create a copy; it sets up [[Prototype]] links. super() must be called before accessing 'this' in a derived constructor.",
    "async/await is Promise syntax sugar — an async function always returns a Promise, and await only pauses the current async function, not the thread. Forgetting await on a Promise is the #1 async bug.",
    "== triggers abstract equality (type coercion); === is strict identity with no coercion. In production code, always use === except when intentionally checking null || undefined with == null.",
    "Memory leaks most commonly come from: forgotten event listeners on removed DOM nodes, closures holding large objects alive, and global variable accumulation. WeakMap/WeakRef allow GC-able references.",
    "ESM is statically analyzable (enabling tree shaking), uses live bindings, and is always strict mode. CommonJS uses runtime require() with cached module objects and mutable exports — mixing them requires careful interop.",
  ],
  mustKnowConcepts: [
    {
      name: "Event Loop",
      oneLiner:
        "Single-threaded concurrency model: call stack → microtask queue (drained fully) → macrotask queue → repeat.",
    },
    {
      name: "Closure",
      oneLiner:
        "A function that retains access to its outer lexical scope even after that scope has returned.",
    },
    {
      name: "Prototype Chain",
      oneLiner:
        "Property lookups walk [[Prototype]] links until null; classes and Object.create both set up this chain.",
    },
    {
      name: "Promise / async-await",
      oneLiner:
        "Promises are eager (executor runs immediately); async functions execute synchronously up to the first await, then defer. Both schedule continuations as microtasks.",
    },
    {
      name: "Type Coercion",
      oneLiner:
        "== coerces operands via ToPrimitive/ToNumber rules; + with a string concatenates instead of adding.",
    },
    {
      name: "this Binding",
      oneLiner:
        "Determined at call time (not definition time) — call/apply/bind, new, method call, arrow (lexical) are the four rules.",
    },
  ],
  topTraps: [
    "setTimeout(fn, 0) does NOT run immediately — it queues a macrotask; any pending Promise .then callbacks run first.",
    "var declarations are function-scoped and hoisted (as undefined); let/const are block-scoped and in the TDZ until initialized — accessing them before declaration throws ReferenceError, not undefined.",
    "typeof null === 'object' is a decades-old spec bug — null is not an object; always check with === null.",
    "Promise.all short-circuits on the first rejection and discards other settled values; use Promise.allSettled when you need all results regardless of failures.",
    "Arrow functions have no own 'this', 'arguments', or 'prototype' — they cannot be used as constructors and should never be used as object methods when 'this' is needed.",
  ],
};

// ─── Concepts ─────────────────────────────────────────────────────────────────
const concepts: Concept[] = [
  // ── Event Loop ──────────────────────────────────────────────────────────────
  {
    id: "call-stack",
    title: "Call Stack",
    category: "event-loop",
    basic:
      "The call stack is a LIFO data structure that tracks the currently executing function. Each function call pushes a frame; return pops it. When the stack is empty, the event loop can push new work.",
    expected:
      "JavaScript is single-threaded — only one execution context runs at a time. The call stack holds stack frames containing the function's local variables, arguments, and the return address. Synchronous exceptions unwind the stack until a catch block is found or the error reaches the top (uncaught exception). Stack overflow occurs when recursion exceeds the engine's maximum call stack depth (typically ~10,000 frames in V8).",
    deep:
      "Each stack frame corresponds to an Execution Context containing a Variable Environment, Lexical Environment, and ThisBinding. V8 uses a fixed-size C++ stack for native frames and a separate JavaScript frame stack. The stack is inspectable via Error.stack, which V8 captures lazily using shadow stacks to avoid overhead on the happy path. Tail call optimization (TCO) was in ES2015 spec but only Safari implements it — don't rely on it in Node or Chrome. For infinite recursion patterns, use trampolining: return a thunk instead of recursing, and have a trampoline loop that calls it, keeping the stack flat.",
    interviewAnswer:
      "The call stack is a LIFO structure tracking active function calls in a single-threaded JS runtime. Each invocation pushes a new execution context; return pops it. When the stack is empty, the event loop picks the next task. Stack overflow happens when recursion is too deep — the fix is either iteration or trampolining.",
    trap:
      "Async functions do NOT block the call stack — await suspends the async function and releases control back to the event loop, allowing other code to run. Many engineers think await 'blocks' like a sleep, which leads to misunderstanding why UI stays responsive during await.",
    memoryAnchor:
      "The call stack is a stack of plates at a buffet — you can only wash (execute) the top plate. Drop a plate (error) and everything above it crashes down until someone catches it.",
  },
  {
    id: "microtask-queue",
    title: "Microtask Queue",
    category: "event-loop",
    basic:
      "The microtask queue holds callbacks scheduled by Promise.then/catch/finally and queueMicrotask(). It is processed after every task completes, before the event loop picks up the next macrotask.",
    expected:
      "After each macrotask (or after initial script execution), the event loop drains the entire microtask queue — not just one item, but all of them, including any microtasks added during draining. This means a recursive Promise chain can starve the macrotask queue indefinitely. MutationObserver callbacks are also microtasks. The order is: current task → drain all microtasks → render step (browser) → next macrotask.",
    deep:
      "The spec defines microtask checkpoints at multiple points: after each task, after each microtask (nested), and at various Web API integration points. In Node.js, process.nextTick() callbacks run in a separate 'nextTick queue' that is actually drained BEFORE the Promise microtask queue within each iteration of libuv — a Node-specific behavior not in the browser. This means process.nextTick is effectively 'higher priority' than Promise.then in Node. In browsers, the microtask checkpoint is called after every callback execution, including event handler callbacks inside a task.",
    interviewAnswer:
      "The microtask queue is drained completely after every task — all Promise .then callbacks run before any setTimeout callback, even with 0ms. This matters for ordering guarantees: anything you need to run 'immediately after this synchronous block' should use Promise.resolve().then() or queueMicrotask(), not setTimeout(fn, 0).",
    trap:
      "In Node.js, process.nextTick callbacks run before Promise microtasks — this is a Node-specific deviation from the browser's event loop model. Code relying on nextTick vs Promise ordering will behave differently in browser environments.",
    memoryAnchor:
      "Microtasks are VIP guests who cut the line — after each regular guest (macrotask) is served, ALL VIPs jump in and get served before the next regular guest, even if more VIPs keep showing up.",
  },
  {
    id: "macrotask-queue",
    title: "Macrotask Queue (Task Queue)",
    category: "event-loop",
    basic:
      "The macrotask queue (also called the task queue) holds callbacks from setTimeout, setInterval, setImmediate (Node), I/O events, and UI events. The event loop picks one macrotask per loop iteration.",
    expected:
      "Only ONE macrotask is dequeued per event loop iteration, after which the entire microtask queue is drained before the next macrotask runs. setTimeout(fn, 0) doesn't mean 'run immediately' — it means 'enqueue a macrotask no sooner than 0ms'. Browsers clamp minimum delay to ~4ms for nested timers after the 5th level. There are actually multiple macrotask queues with different priorities (e.g., user interaction queues are prioritized over timer queues in browsers).",
    deep:
      "The HTML spec defines 'task sources' — each source has its own queue, and the browser's rendering pipeline decides which queue to service next based on priority. The 'scheduling' proposal (scheduler.postTask) exposes this priority system explicitly. In Node.js, libuv's event loop has distinct phases: timers → pending callbacks → idle/prepare → poll (I/O) → check (setImmediate) → close callbacks. setImmediate runs in the 'check' phase after I/O, making it more predictable than setTimeout(fn, 0) inside I/O callbacks.",
    interviewAnswer:
      "The event loop picks exactly one macrotask per iteration, then drains all microtasks before the next one. setTimeout/setInterval, I/O callbacks, and UI events are all macrotasks. The practical implication: you can split a long computation into setTimeout(fn, 0) chunks to yield to the UI, but Promise chains between those chunks will all resolve before the next chunk runs.",
    trap:
      "setTimeout(fn, 0) is not guaranteed to fire in 0ms — browsers enforce a minimum delay (~4ms for nested timers) and the callback only fires when the call stack is empty AND no microtasks are pending. Under heavy microtask load, a 0ms timer can wait significantly longer.",
    memoryAnchor:
      "Macrotasks are the regular waiting room at the DMV — only one person is called per round, and those VIP microtask folks always cut in between.",
  },
  {
    id: "event-loop-tick",
    title: "Event Loop Tick & Ordering",
    category: "event-loop",
    basic:
      "One event loop 'tick' is: execute one macrotask (or the initial script), then drain all microtasks, then optionally render, then pick the next macrotask.",
    expected:
      "The ordering of async operations is: synchronous code → microtasks (Promise.then, queueMicrotask) → macrotasks (setTimeout, I/O). A common interview question is predicting the output of interleaved Promises and setTimeouts. Promise.resolve().then(A) will always run A before setTimeout(B, 0) runs B, regardless of which was registered first.",
    deep:
      "Between the microtask checkpoint and the next macrotask, browsers may run a rendering step — but only if there is a pending visual update and enough time has passed (~16ms at 60fps). requestAnimationFrame callbacks run as part of the rendering step, not as macrotasks or microtasks. This means rAF fires after microtasks but before the next setTimeout. The rendering step is skippable — if the browser determines no visual update is needed, it jumps to the next macrotask.",
    interviewAnswer:
      "The canonical event loop order is: run current task → drain microtask queue → (browser: rendering step if needed) → pick next macrotask. This means Promise chains always complete before setTimeout(fn, 0) fires. requestAnimationFrame sits between microtasks and the next macrotask in browsers, making it the right tool for synchronizing with the rendering pipeline.",
    trap:
      "requestAnimationFrame is not a macrotask and not a microtask — it runs as part of the browser's rendering step. Putting animation logic in setTimeout is wrong because it's not synchronized with the display refresh rate, causing jank. Putting it in a Promise chain is wrong because microtasks block rendering.",
    memoryAnchor:
      "One event loop tick is like one spin of a washing machine: wash one load (macrotask), rinse ALL the soap out (drain microtasks), optionally hang to dry (render), then grab the next load.",
  },
  // ── Closures & Scope ────────────────────────────────────────────────────────
  {
    id: "closure",
    title: "Closure",
    category: "closures-scope",
    basic:
      "A closure is a function that retains access to variables from its lexical scope even after that outer function has returned. The inner function 'closes over' those variables.",
    expected:
      "Closures are created every time a function is defined inside another function. They enable private state, factory functions, and the module pattern. The classic bug: using var in a loop and capturing the loop variable in a callback — all callbacks share the same variable binding (not value), so they all see the final value. Fix: use let (block scope) or IIFE to create a new scope per iteration.",
    deep:
      "Under the hood, closures are implemented via the Environment Record in the spec and as HeapClosure objects in V8. Variables captured by a closure are 'promoted' to the heap (a context object) rather than living on the stack. V8's escape analysis determines which variables need heap promotion. This is why closures have a memory cost: the entire lexical environment chain is kept alive as long as any inner function references it. For large data, this can cause unintended memory retention — the fix is to explicitly nullify references or restructure so the closure captures only what it needs.",
    interviewAnswer:
      "A closure is a function bundled with its lexical environment — the variables in scope when the function was defined. They enable private state and encapsulation without classes. The key insight is that closures capture variable bindings (references), not values, which causes the classic loop-with-var bug where all async callbacks see the loop variable's final value.",
    trap:
      "Closures in loops with var are perhaps the most common JavaScript interview trap. var is function-scoped, so all iterations share one binding. Using let creates a new binding per iteration. The IIFE fix works but is outdated — in modern code, always prefer let/const in loops.",
    memoryAnchor:
      "A closure is a backpack that a function carries everywhere — inside the backpack are all the variables from where it was born, even if that birthplace no longer exists.",
  },
  {
    id: "hoisting",
    title: "Hoisting & TDZ",
    category: "closures-scope",
    basic:
      "Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code executes. var declarations are hoisted and initialized to undefined; function declarations are fully hoisted (name and body).",
    expected:
      "let and const are also hoisted but NOT initialized — accessing them before their declaration throws a ReferenceError due to the Temporal Dead Zone (TDZ). The TDZ is the region between the start of the block scope and the variable's declaration line. Function expressions (const fn = function() {}) are not hoisted as callable — only the variable declaration is hoisted (as undefined for var, TDZ for let/const).",
    deep:
      "Hoisting is actually a two-phase process in V8: the parsing/compilation phase registers all declarations in the scope's Environment Record before any code runs, then execution begins. For var, the binding is created and initialized to undefined immediately. For let/const, the binding is created but not initialized — the TDZ is the gap between creation and initialization. class declarations are also subject to the TDZ, even though they look like statements. This matters for mutually recursive class definitions or classes that reference each other.",
    interviewAnswer:
      "var declarations are hoisted to function scope and initialized to undefined — reading them before their line returns undefined, not a ReferenceError. let and const are hoisted to block scope but remain in the Temporal Dead Zone until their declaration is reached — accessing them before throws ReferenceError. Function declarations are fully hoisted: both name and body, so they can be called before they appear in source code.",
    trap:
      "class declarations are subject to the TDZ — you cannot instantiate a class before its declaration in the source, even though it 'looks' like a statement. This surprises engineers who assume class behaves like function declarations.",
    memoryAnchor:
      "Hoisting = JS reads your code like a guest list before the party starts. 'var' guests get a name tag (undefined) at the door. 'let/const' guests are on the list but stuck in a velvet-rope TDZ until their name is called.",
  },
  {
    id: "scope-chain",
    title: "Scope Chain & Lexical Scoping",
    category: "closures-scope",
    basic:
      "JavaScript uses lexical (static) scoping: a variable's scope is determined by where it is written in the source code, not where the function is called from. Scope chain is the sequence of environments searched when looking up a variable.",
    expected:
      "When a variable is referenced, the engine searches the current scope, then each outer scope in the chain, up to the global scope. ES6 introduced block scoping with let/const, creating new scopes for if blocks, for loops, and bare braces. Arrow functions create their own scope for variables but don't bind their own this/arguments — they inherit those from the enclosing lexical scope. with is a SyntaxError in strict mode; eval() still works but gets its own scope (cannot introduce variables into the enclosing scope), limiting its ability to alter the scope chain.",
    deep:
      "The scope chain is implemented as a linked list of Environment Records in the spec. Outer references are set at function creation time (not call time), which is what makes lexical scoping work even across async gaps. V8 represents this as a Context chain (Context objects on the heap). The engine can optimize scope lookup by statically analyzing the chain at compile time and using direct slot access instead of name lookups, but dynamic code (eval, with) breaks this optimization — hence the strict mode prohibition.",
    interviewAnswer:
      "JavaScript uses lexical scoping: scope is determined at write time, not call time. When resolving a variable, the engine walks from the innermost scope outward through the scope chain. This is what enables closures — an inner function's scope chain includes the outer function's scope even after the outer function returns.",
    trap:
      "Dynamic scoping (where 'this' goes) is NOT the same as lexical scoping (where variables go). this is determined at call time by the call site; variable names are resolved at compile time via lexical scope. Confusing 'this lookup' with 'variable lookup' is a common mistake.",
    memoryAnchor:
      "Scope chain is a series of nested Russian dolls — when looking for a variable, you open the smallest doll first, then the next bigger one, all the way to the giant global doll. The nesting is fixed at write time, not call time.",
  },
  {
    id: "iife",
    title: "IIFE & Module Pattern",
    category: "closures-scope",
    basic:
      "An Immediately Invoked Function Expression (IIFE) is a function that is defined and called in one expression: (function() { ... })(). It creates a private scope to avoid polluting the global namespace.",
    expected:
      "IIFEs were the primary tool for encapsulation before ES modules. The module pattern uses an IIFE to return a public API while keeping private state in the closure. The revealing module pattern explicitly lists what is public. Named IIFEs are better for debugging since the name appears in stack traces. Arrow function IIFEs are also valid: (() => { ... })(). In modern code, IIFEs are rarely needed since let/const and ES modules handle scope and encapsulation.",
    deep:
      "The IIFE pattern predates ES modules and was popularized by jQuery and similar libraries to avoid global variable conflicts. UMD (Universal Module Definition) wrappers use IIFEs with factory functions that detect the environment (CommonJS, AMD, global) and export accordingly. The parentheses wrapping the function are needed to change the parser context from a function statement to an expression — without them, the engine expects a function name and throws a syntax error. Alternatively, prefix operators like ! or void also work: !function(){}(). Modern bundlers still wrap modules in function scopes for isolation in non-ESM output.",
    interviewAnswer:
      "An IIFE creates a new function scope immediately on execution, providing private encapsulation without polluting the global scope. It was the foundation of the module pattern in pre-ES6 code. Today, ES modules provide better encapsulation natively, but IIFEs still appear in compiled/bundled output and UMD library wrappers.",
    trap:
      "Forgetting the wrapping parentheses causes a SyntaxError — function() {}() is a statement (function declaration), which can't be immediately invoked. Wrapping in parens or prefixing with ! makes it an expression. Also: IIFEs don't have 'name' by default, making debugging harder — always name your IIFEs: (function myModule() { ... })().",
    memoryAnchor:
      "IIFE = a self-destructing message in a spy movie. It runs once, does its job, and its private contents are gone from the outside world forever. The parentheses are the detonator.",
  },
  // ── Prototypes & OOP ────────────────────────────────────────────────────────
  {
    id: "prototype-chain",
    title: "Prototype Chain",
    category: "prototypes-oop",
    basic:
      "Every JavaScript object has an internal [[Prototype]] link to another object (or null). Property lookups traverse this chain: if a property isn't found on the object itself, the engine checks [[Prototype]], then [[Prototype]]'s [[Prototype]], and so on.",
    expected:
      "Object.getPrototypeOf(obj) reads [[Prototype]]; Object.setPrototypeOf() sets it (avoid — performance killer). The prototype chain ends at Object.prototype (whose [[Prototype]] is null). hasOwnProperty() checks only the object itself, not the chain. The prototype of functions is Function.prototype; the prototype of Function.prototype is Object.prototype. Array.prototype methods (map, filter) are on the Array.prototype object, not on individual arrays.",
    deep:
      "V8 uses hidden classes (called 'Maps' internally) to represent the shape of objects — a flat lookup table for own properties with an inline cache for fast access. When a property is found on the prototype chain, V8 caches the lookup result in an inline cache at the call site (polymorphic inline cache, PIC). If the prototype chain shape changes (via Object.setPrototypeOf or property addition), V8 must deoptimize and re-walk the chain. This is why mutating [[Prototype]] at runtime is catastrophically slow — always establish the chain at creation time via new, Object.create, or class.",
    interviewAnswer:
      "The prototype chain is JavaScript's delegation mechanism for property lookup. When you access a property, the engine checks the object itself, then walks [[Prototype]] links until it finds the property or hits null. Classes use this same mechanism — methods live on the prototype, not on each instance, which saves memory. hasOwnProperty() lets you distinguish own properties from inherited ones.",
    trap:
      "for...in iterates over ALL enumerable properties including inherited ones from the prototype chain. Use Object.keys() for own enumerable properties, or add a hasOwnProperty check inside for...in. This is the source of many subtle bugs when augmenting built-in prototypes like Array.prototype.",
    memoryAnchor:
      "Prototype chain = a family tree of sticky notes. You ask the kid for a recipe; if they don't have it, ask mom, then grandma, all the way up. Everyone shares grandma's recipes without making copies.",
  },
  {
    id: "class-syntax",
    title: "ES6 Class Syntax",
    category: "prototypes-oop",
    basic:
      "ES6 classes are syntactic sugar over prototype-based inheritance. class Foo { constructor() {} method() {} } is equivalent to a constructor function with methods on its prototype.",
    expected:
      "Classes are NOT hoisted (TDZ applies). extends sets up the prototype chain for both the class and its prototype. super() in a derived constructor must be called before accessing this — it's what creates the this object when extending built-ins. Static methods are on the class (constructor function) itself, not on instances. Private fields (#field) are truly private — not on the prototype, not accessible via prototype tricks, enforced by the engine.",
    deep:
      "Under the hood, class Foo extends Bar creates: (1) Foo.prototype = Object.create(Bar.prototype), (2) Object.setPrototypeOf(Foo, Bar) for static inheritance, (3) Foo.prototype.constructor = Foo. Private fields (#) use a WeakMap-like internal slot — they are stored per-instance and brand-checked (not name-checked) on access, which is why you can use instanceof alternatives with #field in operator: #field in obj. Class fields defined in the class body (without # or static) are syntactic sugar for this.field = ... in the constructor, adding own properties to instances — they do NOT go on the prototype.",
    interviewAnswer:
      "ES6 classes are syntactic sugar over prototypes — they don't change the underlying delegation model. Methods defined in a class body go on the prototype and are shared across instances; class fields go on each instance. Private fields (#) are truly private and engine-enforced, unlike the old _underscore convention. Always call super() before accessing this in a derived class constructor.",
    trap:
      "Class methods defined in the class body are on the prototype and are NOT bound — passing them as callbacks will lose this. The fix is either a class field arrow function (which creates a per-instance function) or explicit binding in the constructor. The tradeoff: arrow class fields sacrifice prototype sharing and break method override.",
    memoryAnchor:
      "ES6 classes are a fancy suit over the same prototype body. Under the tuxedo, it is still prototype delegation all the way down. The 'class' keyword is just JavaScript dressing up for a job interview.",
  },
  {
    id: "this-binding",
    title: "this Binding Rules",
    category: "prototypes-oop",
    basic:
      "'this' refers to the object that is the context of the current function call. Its value is determined at call time, not definition time (except for arrow functions, which capture 'this' lexically).",
    expected:
      "The four rules in priority order: (1) new binding — new Foo() creates a new object and binds this to it; (2) explicit binding — call/apply/bind set this explicitly; (3) implicit binding — obj.method() binds this to obj; (4) default binding — standalone function() call binds this to global (undefined in strict mode). Arrow functions are NOT a separate rule — they simply inherit 'this' from their enclosing lexical scope and cannot be rebound.",
    deep:
      "The spec defines this as part of the Execution Context's ThisBinding. When you call a method via a reference (obj.method), the GetValue operation returns the method function, but the Reference holds the base object (obj) as the this value. When you extract the method (const fn = obj.method; fn()), the Reference loses its base — defaulting to the global this. This is why callback extraction (passing obj.method as an argument) loses context. bind() creates a bound function via BoundFunctionExoticObject — it wraps the original with a fixed [[BoundThis]], overriding any later call/apply. Bound functions cannot be rebound.",
    interviewAnswer:
      "this is determined by the call site, following four rules in priority: new > explicit (call/apply/bind) > implicit (method call) > default (global/undefined in strict mode). Arrow functions capture this from the enclosing lexical scope at definition time and cannot be rebound. The most common bug is losing this when a method is used as a callback — fix with .bind(), an arrow wrapper, or an arrow class field.",
    trap:
      "Event listeners that use 'this' inside class methods will lose context because the listener is called with this = the DOM element, not the class instance. The idiomatic fix is a class field arrow function: handleClick = () => { ... } — but be aware this creates a new function per instance rather than a shared prototype method.",
    memoryAnchor:
      "'this' is like a name tag at a party. It doesn't say who you ARE, it says who INVITED you. new = you made the party, call/apply = someone slaps a specific tag on you, obj.method() = the host tags you, alone = you are 'global nobody'.",
  },
  {
    id: "object-create",
    title: "Object.create & Delegation",
    category: "prototypes-oop",
    basic:
      "Object.create(proto) creates a new object with proto as its [[Prototype]], enabling prototypal inheritance without constructor functions or classes.",
    expected:
      "Object.create(null) creates a truly bare object with no prototype — useful for pure hash maps since there are no inherited properties like toString or hasOwnProperty to interfere. Object.create is the underlying primitive that class extends uses. You can use it to set up delegation chains explicitly: const animal = { speak() {} }; const dog = Object.create(animal); dog.bark = function(){}. Object.assign copies own enumerable properties but does NOT set up the prototype chain.",
    deep:
      "Object.create with a property descriptor second argument allows fine-grained control: Object.create(proto, { x: { value: 1, writable: false, enumerable: false, configurable: false } }). This is how many framework internals create non-enumerable, non-writable slots. Differential inheritance (OLOO — Objects Linked to Other Objects, coined by Kyle Simpson) argues that object delegation via Object.create is a more idiomatic JS pattern than pseudo-classical inheritance with classes, since it directly uses the prototype mechanism rather than emulating class-based OOP.",
    interviewAnswer:
      "Object.create(proto) creates an object that delegates to proto via the prototype chain without needing a constructor. It is the most explicit way to set up prototype delegation and is what class extends compiles to under the hood. Object.create(null) is the correct choice for pure dictionary objects since it avoids prototype property collisions.",
    trap:
      "Object.assign(target, source) does a shallow copy of own enumerable properties — it does NOT set up prototype delegation. const child = Object.assign({}, parent) creates an object with copied own properties but child.__proto__ is still Object.prototype, not parent. Use Object.create(parent) for delegation.",
    memoryAnchor:
      "Object.create(parent) is adopting a child who inherits the family name and can ask parents for anything. Object.assign is photocopying someone's homework — you get a copy, but no ongoing relationship.",
  },
  // ── Async Patterns ──────────────────────────────────────────────────────────
  {
    id: "promises",
    title: "Promises",
    category: "async-patterns",
    basic:
      "A Promise is an object representing the eventual completion or rejection of an asynchronous operation. It has three states: pending, fulfilled, or rejected. Callbacks registered with .then() and .catch() are scheduled as microtasks.",
    expected:
      "Promises are eager — the executor function runs synchronously when the Promise is created. .then() always returns a new Promise, enabling chaining. Returning a value from .then() wraps it in a resolved Promise; throwing unwraps to a rejected Promise. .catch(fn) is shorthand for .then(undefined, fn). Unhandled promise rejections trigger a global event and in Node.js can crash the process (--unhandled-rejections=throw is the default since Node 15).",
    deep:
      "Promise resolution is defined by the Promise Resolution Procedure (spec §25.6.1.3.2): if the resolution value is a thenable (has a .then method), the Promise 'assimilates' it by calling .then — this is why custom thenables work with native Promises. Promise chaining always inserts at least one microtask hop, even for already-resolved Promises — this ensures consistent async behavior and prevents stack overflows. The Zalgo problem (sometimes sync, sometimes async callbacks) is solved by Promises: .then is always async. Promise.resolve(x) where x is already a native Promise returns x itself (same reference) without wrapping — an optimization in the spec.",
    interviewAnswer:
      "Promises provide a composable, chainable way to handle asynchronous results. The executor runs synchronously; .then callbacks always run as microtasks. Chaining works because .then returns a new Promise — throw inside .then produces a rejection, return produces a resolution. The most important thing to know in interviews: Promise chains only catch errors if you have a .catch at the end or a second argument to .then — silently swallowed rejections are a common production bug.",
    trap:
      "Wrapping an existing Promise in a new Promise constructor (the 'deferred anti-pattern') is unnecessary and breaks error propagation: new Promise((resolve) => resolve(existingPromise)) — the outer promise will resolve with the inner promise as its value if done incorrectly. Use Promise.resolve(existingPromise) instead, which returns the existing promise directly.",
    memoryAnchor:
      "A Promise is an IOU note from a restaurant kitchen. Pending = order placed. Fulfilled = food arrives. Rejected = 'sorry, we are out of that.' You can chain IOUs: 'when my food arrives, THEN bring dessert.'",
  },
  {
    id: "async-await",
    title: "async/await",
    category: "async-patterns",
    basic:
      "async functions always return a Promise. await pauses execution of the async function until the awaited Promise settles, then resumes with the resolved value or throws the rejection.",
    expected:
      "await can only be used inside async functions (or top-level modules). Sequential await means each call waits for the previous — useful for ordering but inefficient when operations are independent. For parallel execution, use Promise.all([a(), b()]) with a single await. Errors thrown in async functions or from awaited rejections can be caught with try/catch. Forgetting await means you get a Promise object instead of the resolved value — one of the most common async bugs.",
    deep:
      "async/await desugars to generator functions and Promise machinery. An async function is essentially a state machine compiled by the transpiler or engine — each await point is a suspension/resumption boundary. V8 implements this with a native generator-like mechanism rather than actual generator objects, making it more efficient than babel-compiled async code. The spec requires that await always introduces at least two microtask hops (one to resolve, one to resume) — this was changed from three hops in V8 7.2 via an optimization (PromiseResolve inlining). Returning a native Promise from an async function also went from 3 hops to 2 in this optimization.",
    interviewAnswer:
      "async/await is Promise syntax sugar that makes async code look synchronous. An async function always returns a Promise; await unwraps a Promise value inline. The key performance gotcha: sequential awaits run operations serially even when they could be parallel — always use Promise.all for independent concurrent operations. Error handling uses try/catch, which works identically to .catch() on a Promise chain.",
    trap:
      "await in a forEach callback does NOT pause the outer async function — Array.forEach is not async-aware. Each callback creates its own async context. Use for...of with await or Promise.all(array.map(async (item) => ...)) to correctly await iterations.",
    memoryAnchor:
      "async/await is putting a bookmark in your novel. 'await' = put the book down, go do laundry, come back to the exact page when the dryer buzzes. The story reads top-to-bottom, but you are free between chapters.",
  },
  {
    id: "promise-combinators",
    title: "Promise Combinators",
    category: "async-patterns",
    basic:
      "Promise.all, Promise.race, Promise.allSettled, and Promise.any are static methods that combine multiple Promises. Each has different semantics for handling fulfillment and rejection.",
    expected:
      "Promise.all([p1,p2,p3]) resolves when ALL resolve (returns array of values in order); rejects immediately on first rejection. Promise.race resolves/rejects with the first settled promise. Promise.allSettled waits for all to settle regardless of outcome — returns an array of {status, value|reason} objects. Promise.any resolves with the first fulfillment; rejects with AggregateError if ALL reject. For parallel fetching with no failure tolerance, use all. For timeouts, use race. For best-effort parallel, use allSettled.",
    deep:
      "Promise.all preserves input order in the results array regardless of resolution order — this is a spec guarantee, not an implementation detail. AggregateError (from Promise.any) is a special error type with an .errors array property containing all individual rejections. In high-concurrency scenarios, creating thousands of Promises simultaneously can cause memory spikes — consider batching with a semaphore pattern or using a library like p-limit. Note that all combinators accept any iterable, not just arrays, enabling use with generators and Sets.",
    interviewAnswer:
      "The four combinators handle different failure modes: Promise.all fails fast on first rejection (use for required parallel dependencies), Promise.allSettled always resolves with all outcomes (use for best-effort parallel), Promise.race settles with the first outcome (use for timeouts), Promise.any resolves with first success (use for redundant sources, fallback patterns). Know which to reach for based on your failure tolerance needs.",
    trap:
      "Promise.all does NOT cancel in-flight promises when one rejects — it merely ignores their results. The other promises continue executing in the background, potentially wasting resources or causing side effects. JavaScript has no native promise cancellation; use AbortController for fetch or a cancellation token pattern for custom async operations.",
    memoryAnchor:
      "Promise.all = 'everyone must finish the group project or we all fail.' Promise.race = 'first one to the finish line wins.' Promise.any = 'I just need ONE yes from all these job applications.' Promise.allSettled = 'tell me how everyone did, pass or fail.'",
  },
  {
    id: "error-handling-async",
    title: "Async Error Handling",
    category: "async-patterns",
    basic:
      "Errors in async code must be explicitly caught. Promise rejections without a .catch handler generate an unhandledRejection warning (and crash in Node 15+). In async/await, use try/catch blocks.",
    expected:
      "A common pattern is wrapping each await in its own try/catch for fine-grained handling, or using a helper like async-safe wrappers: const [err, result] = await to(promise) that returns [error, null] or [null, value] similar to Go-style error handling. Always add a top-level .catch() to Promise chains, even if just for logging. In Express/Koa, unhandled async errors won't reach error middleware unless explicitly passed to next(err) — a frequent source of silent failures.",
    deep:
      "The unhandledRejection event fires when a rejection has no handler at the end of the current microtask queue drain. A rejection CAN be retroactively handled — if you call .catch() on a rejected promise after the fact, the unhandledRejection event fires but can be 'handled' by the rejectionHandled event. However, relying on this timing is fragile. In Node.js, using --unhandled-rejections=throw (default) or process.on('unhandledRejection') as a global safety net is essential for production. For structured error handling in complex systems, consider result types via libraries like neverthrow or creating discriminated union types with TypeScript.",
    interviewAnswer:
      "Async errors must be explicitly caught — unhandled rejections crash Node.js processes in modern versions. try/catch works with async/await for centralized handling; .catch() chains work for Promise chains. The most insidious bug is a missing await before a Promise-returning call — the error lands in an unhandled rejection instead of the surrounding try/catch.",
    trap:
      "Returning a Promise from inside a try block without awaiting it means the try/catch will NOT catch its rejection — the rejection escapes to the outer scope. Always await Promises inside try blocks if you want their errors caught: try { await fetchData(); } not try { return fetchData(); }.",
    memoryAnchor:
      "Async error handling = a safety net under a trapeze artist. No net (no .catch or try/catch) means the performer (rejection) falls and crashes the whole show. In Node 15+, unhandled rejections literally kill the process — the show stops.",
  },
  // ── Types & Coercion ────────────────────────────────────────────────────────
  {
    id: "type-coercion",
    title: "Type Coercion",
    category: "types-coercion",
    basic:
      "JavaScript automatically converts values between types in certain contexts. String + Number uses string concatenation; comparison operators trigger numeric conversion. This is called implicit type coercion.",
    expected:
      "The + operator is overloaded: if either operand is a string, it concatenates. All other arithmetic operators (-,*,/) coerce to numbers. Abstract Equality (==) uses the Abstract Equality Comparison algorithm which coerces types. Key rules: null == undefined is true; null == 0 is false; false == 0 is true; '' == 0 is true; '' == false is true. Boolean conversion: 0, '', null, undefined, NaN, false are falsy; everything else (including [], {}, '0') is truthy.",
    deep:
      "Type coercion routes through ToPrimitive(hint) → toString/valueOf. For + with an object, ToPrimitive is called with 'default' hint (which resolves to 'number' for most objects, but 'string' for Date). The algorithm first tries valueOf() then toString() for number hint, or toString() first for string hint. You can override this by defining [Symbol.toPrimitive](hint) on an object. This is why [] + [] is '', [] + {} is '[object Object]', and {} + [] is either 0 or '[object Object]' depending on whether {} is parsed as a block or object literal.",
    interviewAnswer:
      "JavaScript coercion follows ToPrimitive rules: the + operator concatenates if either operand is a string, all other arithmetic coerces to number. Abstract equality (==) coerces per the spec's Abstract Equality Comparison — use === in production to avoid surprises. The most important coercion rules: falsy values are 0, '', null, undefined, NaN, false; [] and {} are truthy despite being 'empty'.",
    trap:
      "[] == false is true but Boolean([]) is true — these are not contradictory but deeply confusing. == triggers ToNumber coercion on [] (gives 0) then compares 0 == 0. Boolean() applies ToBoolean rules where all objects are truthy. This is why if([]) runs the branch, but [] == false is true.",
    memoryAnchor:
      "Type coercion is JS playing telephone — you whisper 'five' and by the time it reaches the other end, it has become the number 5, the string '5', or boolean true. The + operator is the worst gossip: sees a string and turns everything into a string.",
  },
  {
    id: "equality",
    title: "== vs === (Equality)",
    category: "types-coercion",
    basic:
      "=== (strict equality) checks value and type without coercion. == (abstract equality) checks value after type coercion if types differ. Almost always use ===.",
    expected:
      "The one legitimate use of == is null checking: x == null is true for both null and undefined, which is often exactly what you want when checking for 'no value'. typeof checks don't need === since typeof always returns a string. NaN !== NaN is a spec quirk — use Number.isNaN() to check for NaN (isNaN() coerces first: isNaN('hello') is true). Object equality with === checks reference identity, not structural equality — {a:1} !== {a:1}.",
    deep:
      "The Abstract Equality Comparison algorithm (spec §7.2.14) is 12 steps of coercion rules. The interesting ones: if one operand is null and the other is undefined, return true. If one is a number and the other is a string, convert string to number. If one is boolean, convert it to number (ToNumber(false)=0, ToNumber(true)=1). If one is an object and the other is a primitive, call ToPrimitive on the object. Object.is() provides SameValueZero semantics: Object.is(NaN, NaN) is true, Object.is(-0, +0) is false — Map/Set use SameValueZero for key comparison.",
    interviewAnswer:
      "Use === by default. The one exception: x == null catches both null and undefined in a single check. === checks type and value without coercion; == applies the Abstract Equality Comparison algorithm which has counterintuitive edge cases. For NaN, use Number.isNaN() since NaN !== NaN. For structural equality of objects, implement a deep-equal function or use a library.",
    trap:
      "Number.isNaN(x) and isNaN(x) behave differently: Number.isNaN only returns true for actual NaN values; global isNaN coerces its argument first (isNaN('hello') === true, Number.isNaN('hello') === false). Always prefer Number.isNaN.",
    memoryAnchor:
      "=== is a strict bouncer: 'Are you EXACTLY on the list? Same name, same type?' == is the lazy bouncer: 'Eh, close enough — come in.' NaN is the person who doesn't even recognize themselves in a mirror: NaN !== NaN.",
  },
  {
    id: "typeof-quirks",
    title: "typeof & Type Checking Quirks",
    category: "types-coercion",
    basic:
      "typeof returns a string representing the type of the operand. The 8 possible returns are: 'undefined', 'boolean', 'number', 'bigint', 'string', 'symbol', 'function', 'object'.",
    expected:
      "typeof null === 'object' is a historical bug from the original JavaScript engine (1995) — null's internal type tag was 0, the same tag used for object references. To check for null: value === null. typeof undeclaredVariable is 'undefined' and does NOT throw — this was useful before let/const for feature detection. typeof [] is 'object' — use Array.isArray() for arrays. typeof function(){} is 'function' even though functions are objects. instanceof checks the prototype chain: [] instanceof Array is true, but fails across frames (different window objects have different Array constructors).",
    deep:
      "The spec defines 7 language types: Undefined, Null, Boolean, Number, BigInt, String, Symbol, and Object (functions are callable objects). typeof maps these to 8 string values (Null returns 'object' as the bug). For robust type checking: null check (=== null), Array.isArray(), instanceof for class hierarchies, Object.prototype.toString.call(value) for granular type tags ('[object Date]', '[object RegExp]', etc.). Symbol.toStringTag allows objects to customize their toString tag. In TypeScript, you can use type predicates (value is Type) for narrowing.",
    interviewAnswer:
      "typeof is safe (never throws, even on undeclared variables) but has the famous null bug: typeof null === 'object'. Use === null for null checks, Array.isArray() for arrays, instanceof for class instances. For comprehensive type identification, Object.prototype.toString.call(value) returns reliable '[object Type]' strings that can't be spoofed without Symbol.toStringTag.",
    trap:
      "typeof in the TDZ does NOT save you for let/const — typeof undeclaredLetVar throws ReferenceError during the TDZ. The safety of typeof for undeclared variables only applies to truly undeclared names (not in the current or enclosing scope at all), not to names declared with let/const that haven't been initialized yet.",
    memoryAnchor:
      "typeof null === 'object' is JavaScript's original sin from 1995 — a bug so old it has a pension. Think of typeof as a label gun that mislabeled null at the factory and nobody ever recalled it.",
  },
  // ── Modern ES6+ ─────────────────────────────────────────────────────────────
  {
    id: "generators",
    title: "Generators & Iterators",
    category: "modern-es6",
    basic:
      "Generator functions (function*) return an iterator that produces values lazily via yield. Each call to .next() runs the function body until the next yield, pauses, and returns {value, done}.",
    expected:
      "Generators implement the iterator protocol ({next(){return {value, done}}}) and the iterable protocol ([Symbol.iterator](){return this}), making them usable in for...of loops, spread, and destructuring. Generators enable lazy sequences (infinite lists), cooperative multitasking, and custom iteration. Two-way communication: .next(valueToSend) passes a value INTO the generator as the result of the yield expression. .throw() and .return() inject errors or completions. yield* delegates to another iterable.",
    deep:
      "Generators were the foundation of async/await before native support — co, Koa, and redux-saga use generators for async flow control. The generator state machine is captured in the generator object — resuming a generator reconstructs the execution context from the saved state. Generators are pull-based (consumer controls pace); async iterators (for await...of) combine generator semantics with async steps. Infinite generators must be managed carefully: for...of on an infinite generator loops forever. break exits cleanly by calling .return() on the iterator. In performance-critical paths, generators have overhead vs direct iteration — profile before using in hot paths.",
    interviewAnswer:
      "Generators are functions that can pause execution at yield points and resume later, enabling lazy evaluation, infinite sequences, and custom iteration protocols. They implement both the iterator and iterable protocols. The key advanced use: generators can receive values via next(val), enabling bidirectional communication. Libraries like redux-saga use this for testable async side effect management.",
    trap:
      "A generator function call does NOT execute any of the body — it just creates the generator object. The body runs only when .next() is first called. This surprises engineers who expect the code before the first yield to run on generator creation.",
    memoryAnchor:
      "A generator is a vending machine with a crank. Each .next() turns the crank once and a snack (value) drops out. The machine pauses between cranks and remembers which row it was on. yield = 'here is your snack, crank me again for the next one.'",
  },
  {
    id: "proxy-reflect",
    title: "Proxy & Reflect",
    category: "modern-es6",
    basic:
      "Proxy wraps an object and intercepts fundamental operations (get, set, delete, apply, construct, etc.) via handler traps. Reflect provides the same operations as methods, making it easy to forward to the target.",
    expected:
      "Common Proxy use cases: validation (throw in set trap if value invalid), default values (return fallback in get trap), reactivity (trigger effects on set), logging/debugging, mocking in tests. Proxy is transparent — typeof, instanceof, and === work on the proxy as if it's the target for most uses. Reflect methods mirror Proxy traps 1:1, making handler code cleaner: return Reflect.set(target, key, value, receiver) in a set trap forwards correctly without repeating logic. The receiver parameter in get/set traps is critical for prototype-based access — always forward it.",
    deep:
      "Vue 3's reactivity system uses Proxy instead of Object.defineProperty (Vue 2) to intercept array mutations and new property additions, which defineProperty couldn't detect. Proxies can wrap functions (apply trap) to create middleware or memoization wrappers. Proxy invariants enforce consistency — some traps have rules that prevent the proxy from lying (e.g., a get trap cannot return a different value for a non-writable, non-configurable own property). Revocable proxies (Proxy.revocable()) can be disabled: proxy.revoke() makes all further trap calls throw — useful for capability-based security patterns.",
    interviewAnswer:
      "Proxy intercepts fundamental object operations with handler traps, enabling meta-programming: validation, reactivity, logging, and virtualization. Always use Reflect in trap bodies to forward operations correctly, especially with inheritance (the receiver parameter preserves correct this for prototype getters/setters). Vue 3's reactivity is the canonical production Proxy use case.",
    trap:
      "Proxies cannot be transparently used with built-in types that rely on internal slots — for example, a Proxy around a Map won't work because Map methods check for the [[MapData]] internal slot on the actual this, not the proxy. You must forward the 'this' correctly using the get trap: get(target, key) { const val = target[key]; return typeof val === 'function' ? val.bind(target) : val; }.",
    memoryAnchor:
      "Proxy is a bodyguard standing in front of an object. Every time someone tries to get, set, or delete a property, the bodyguard intercepts and decides what to do. Reflect is the bodyguard's earpiece to relay the original request faithfully.",
  },
  {
    id: "weakmap-weakset",
    title: "WeakMap & WeakSet",
    category: "modern-es6",
    basic:
      "WeakMap and WeakSet hold weak references to their object keys/values — if there are no other references to the object, it can be garbage collected even if still in the WeakMap/WeakSet.",
    expected:
      "WeakMap keys must be objects (or registered symbols in newer spec). Values can be anything. No iteration, no size property, no clear() — these are intentionally limited to prevent resurrecting GC'd references. Use cases: private data storage per-object without preventing GC, caching computed results keyed by object instances, tracking object state in frameworks without leaking memory. WeakSet: store a set of objects without preventing their GC — useful for tracking 'visited' objects in graph traversals without leaking.",
    deep:
      "WeakMap/WeakSet keys are 'weakly held' — they don't increment the object's reference count for GC purposes. The GC can collect the key object at any point, after which the WeakMap entry is also collected (but the timing is non-deterministic and not observable from JS). WeakRef provides a direct weak reference to an object with .deref() that returns undefined if collected. FinalizationRegistry allows registering a callback to run after an object is GC'd — useful for cleanup of external resources (e.g., unregistering native handles). In practice, WeakMap is the right tool for associating metadata with DOM nodes or objects controlled by another system.",
    interviewAnswer:
      "WeakMap/WeakSet allow caching or metadata storage keyed by objects without preventing garbage collection of those objects. The classic use: a framework stores per-node metadata in a WeakMap<Node, Metadata> — when the node is removed from the DOM and dereferenced, the metadata is automatically eligible for GC. The limitation — no iteration, no size — is by design to preserve GC semantics.",
    trap:
      "WeakMap keys cannot be primitives. If you try to use a string or number as a WeakMap key, you get a TypeError. This rules out WeakMap as a general-purpose map replacement — it's specifically for object-keyed metadata patterns.",
    memoryAnchor:
      "WeakMap is a coat check at a club — it holds your coat (metadata) while you (the object) are inside, but the moment you leave (get garbage collected), your coat vanishes too. No inventory list, no way to count coats.",
  },
  // ── Performance & Memory ────────────────────────────────────────────────────
  {
    id: "memory-leaks",
    title: "Memory Leaks in JavaScript",
    category: "performance",
    basic:
      "A memory leak occurs when objects that are no longer needed remain reachable (directly or through closures/references), preventing garbage collection. Common sources: forgotten event listeners, closures over large data, detached DOM nodes.",
    expected:
      "The four main leak patterns: (1) Forgotten event listeners — addEventListener without a corresponding removeEventListener on teardown; (2) Closures holding large objects — a short-lived closure references a large array/object, keeping it alive as long as any function in the closure chain is alive; (3) Global variables — accidentally assigning to an undeclared variable in non-strict mode creates a global; (4) Detached DOM nodes — removing a node from the DOM while JS still holds a reference to it keeps the entire subtree in memory.",
    deep:
      "V8's garbage collector uses a generational, mark-and-sweep algorithm. Objects in 'young generation' (nursery) are collected frequently; surviving objects are promoted to 'old generation' (tenured), collected less often. A leak keeps an object in old generation indefinitely. Detecting leaks: Chrome DevTools heap snapshots — compare snapshots before and after an action; look for detached DOM trees, growing counts of specific object types. The 'three snapshot technique': take snap after initial load, trigger the suspected leak action N times, take snap — objects that appear N times are leak candidates. WeakRef and FinalizationRegistry can help in frameworks that must track objects without owning them.",
    interviewAnswer:
      "The most common JavaScript memory leaks are: event listeners not removed on component unmount, closures that inadvertently capture and hold large objects alive, and DOM references held in JavaScript while the node is removed from the tree (detached DOM subtrees). In SPAs, module-level or closure-scoped data that grows over time is a major source. Detect with Chrome's Memory panel heap snapshots; fix by explicitly removing listeners, nullifying references, and using WeakMap for object metadata.",
    trap:
      "Using an arrow function as an event listener makes it impossible to remove: element.addEventListener('click', () => handler()) — the arrow function is a new object each time, so removeEventListener with 'the same' arrow function won't match. Always store a reference to the listener function to remove it later.",
    memoryAnchor:
      "Memory leaks are like forgetting to turn off faucets in a house — event listeners, closures, and detached DOM nodes are dripping water. Individually tiny, but leave enough running and the house floods.",
  },
  {
    id: "debounce-throttle",
    title: "Debounce & Throttle",
    category: "performance",
    basic:
      "Debounce delays execution until after N ms have passed since the last invocation — use for search input, resize handlers. Throttle limits execution to at most once every N ms — use for scroll handlers, rate-limited API calls.",
    expected:
      "Debounce implementation: store a timer ID; on each call, clear the previous timer and set a new one. The callback only fires if the timer completes without interruption. Leading-edge debounce fires immediately on first call, then ignores until quiet period — better UX for button clicks. Throttle implementation: track last execution time; only invoke if the elapsed time exceeds the interval. requestAnimationFrame throttle is a common pattern for scroll handlers: call rAF once per scroll event, update once per frame, cancel pending rAF before registering a new one.",
    deep:
      "Lodash's debounce has a sophisticated implementation with leading/trailing edge options, maxWait (ensures at least one call within a window), and cancellation. The core challenge: debounce/throttle must preserve this binding and arguments — modern implementations use rest parameters and closures. For React hooks, useCallback(debounce(...), []) is an anti-pattern because debounce creates a new closure each render, losing timer state — the correct approach is useRef to store the debounced function across renders or useMemo with an empty dep array. For TypeScript, preserving the function signature with generics is important: function debounce<T extends (...args: unknown[]) => unknown>(fn: T, ms: number): (...args: Parameters<T>) => void.",
    interviewAnswer:
      "Debounce collapses multiple rapid calls into one, firing after the quiet period — ideal for input events where you only care about the final value. Throttle limits call rate to once per interval — ideal for scroll/resize where you want regular updates but can't handle every event. Both prevent performance bottlenecks by reducing work. Can you implement debounce? — store a timer, clearTimeout on each call, setTimeout for the callback, return the wrapper function.",
    trap:
      "In React, creating a debounced function inside a functional component without useRef/useMemo creates a new debounce closure every render, resetting the timer state. This means the debounce never actually delays — every re-render gives you a fresh debounce with no pending timer. Store debounced functions in useRef.",
    memoryAnchor:
      "Debounce = elevator doors: they keep resetting the close timer every time someone walks in. Throttle = a subway train: it leaves every 5 minutes no matter how many people are waiting on the platform.",
  },
  {
    id: "v8-optimization",
    title: "V8 Optimization & Hidden Classes",
    category: "performance",
    basic:
      "V8 uses Just-In-Time (JIT) compilation and hidden classes (internal shape representations) to optimize property access. Code that is predictable in shape and types is compiled to fast machine code.",
    expected:
      "Hidden classes (V8's 'Maps') are created based on the order and names of properties added to an object. Objects with the same property assignment order share a hidden class, enabling V8 to use offset-based property access instead of hash table lookups. Adding properties out-of-order or conditionally creates different hidden classes and prevents optimization. Monomorphic call sites (always the same hidden class) are the fastest; polymorphic (2-4 shapes) are slower; megamorphic (5+) fall back to generic hash lookup.",
    deep:
      "V8's optimization pipeline: Ignition (interpreter, generates bytecode) → Maglev (mid-tier JIT, 2023) → TurboFan (optimizing JIT). TurboFan deoptimizes ('deopt') when assumptions are violated — e.g., an integer-typed variable suddenly receives a float. Deopt triggers a bailout to interpreted code and re-profiling. Arguments objects, try-catch blocks in hot functions, eval, and with can inhibit optimization. Monomorphic functions are inlined by TurboFan, eliminating call overhead. To profile V8 optimizations: node --prof script.js generates a V8 profiler log; node --trace-deopt shows deoptimizations.",
    interviewAnswer:
      "V8 optimizes code by building hidden classes for object shapes and using inline caches at property access sites. For maximum performance: initialize all object properties in the constructor (same order every time), avoid deleting properties, keep function argument types consistent, and avoid mixing integers and floats in typed arrays. Predictable, monomorphic code is what TurboFan can compile to machine code.",
    trap:
      "delete obj.property is highly detrimental to V8 optimization — it changes the object's hidden class, breaking the inline cache. Instead of deleting, set the property to undefined (same type slot, different value) or null. For truly optional properties that shouldn't exist, use Map instead of plain objects.",
    memoryAnchor:
      "Hidden classes are like cookie cutters — V8 makes one cutter per object shape. If all your cookies have the same shape, V8 stamps them out lightning fast. Change the shape mid-batch (add/delete a property) and V8 has to throw away the cutter and carve by hand.",
  },
  // ── Modules ─────────────────────────────────────────────────────────────────
  {
    id: "esm-cjs",
    title: "ESM vs CommonJS",
    category: "modules",
    basic:
      "CommonJS (require/module.exports) is Node's original module system: synchronous, runtime resolution. ESM (import/export) is the TC39 standard: static, async-capable, always strict mode.",
    expected:
      "ESM differences from CJS: (1) static analysis — import statements are parsed at compile time, not executed; (2) live bindings — imported values reflect mutations in the exporting module (unlike CJS snapshots); (3) always strict mode; (4) top-level await support; (5) .mjs extension or 'type: module' in package.json for Node ESM. CJS exports a cached module object — require() is synchronous and caches. Mixing CJS and ESM: you can require() a CJS module from ESM, but you cannot require() an ESM module from CJS (use dynamic import instead).",
    deep:
      "ESM loading goes through three phases: Construction (parse and resolve all imports recursively, build module graph), Instantiation (allocate bindings, connect live bindings without values), Evaluation (execute module code, fill bindings). This makes circular dependency handling different from CJS: CJS returns the partially-built module.exports at the time of the circular require (a snapshot); ESM has live bindings that can be filled later. Top-level await in ESM blocks the instantiation of dependent modules — modules that depend on an async module wait until it resolves. Dual package hazard: publishing both CJS and ESM versions of a package can lead to two separate module instances if bundlers or Node mix them, breaking singleton patterns.",
    interviewAnswer:
      "ESM and CommonJS are fundamentally different: ESM is statically analyzed at parse time (enabling tree shaking), uses live bindings (exports reflect mutations), and runs in strict mode. CJS is dynamic (require is a runtime call), returns snapshots of module.exports, and works synchronously. In modern Node.js, prefer ESM with 'type: module'. The key interview point: ESM's static structure is what enables bundlers to tree-shake dead code.",
    trap:
      "ESM imports are LIVE BINDINGS, not copies. If a module exports let count = 0 and later mutates it, importing modules see the updated value. This is unlike CJS where you get a snapshot of the value at require() time. This live binding behavior is intentional for circular dependency support but can be surprising.",
    memoryAnchor:
      "CJS require() is taking a Polaroid photo — you get a snapshot, and the original can change without your photo updating. ESM import is a live security camera feed — you always see the current state in real time.",
  },
  {
    id: "dynamic-import",
    title: "Dynamic import()",
    category: "modules",
    basic:
      "import(moduleSpecifier) is a runtime function that loads an ESM module asynchronously and returns a Promise resolving to the module's namespace object. It enables code splitting and conditional loading.",
    expected:
      "Dynamic import works in both ESM and CJS (as a syntax feature, not a function). It returns a Promise of the module namespace — use destructuring: const { default: Component } = await import('./Component.js'). Use cases: route-based code splitting in SPAs, conditionally loading polyfills, loading locale files, lazy-loading heavy libraries. Bundlers (Webpack, Vite, Rollup) use import() as a split point — everything in the dynamic import chain becomes a separate chunk.",
    deep:
      "Dynamic import is a language syntax, not a real function — you can't do const importFn = import; import is not an identifier. This means you can't apply/call it or pass it as a value. The module specifier can be dynamic (a variable or expression), but bundlers analyze static strings at build time for splitting — computed/variable specifiers result in 'dynamic' imports that bundlers handle with magic patterns or glob imports. In Vite: import.meta.glob('./components/*.vue') generates an object of all matching files as dynamic imports. Preloading: <link rel='modulepreload'> or bundler hints like /* webpackChunkName: 'name' */ improve loading performance.",
    interviewAnswer:
      "Dynamic import() loads modules asynchronously at runtime, returning a Promise of the module namespace. This enables route-level code splitting (only load what's needed for the current page), conditional polyfill loading, and lazy-loading heavy dependencies. Bundlers treat import() as a code-split point — everything below it becomes a separate chunk downloaded on demand.",
    trap:
      "import() is syntax, not a function — you cannot assign it to a variable, spread it, or use .call/.apply. Also: dynamic import of a default export requires .default from the namespace object: const mod = await import('./foo'); mod.default() — not mod().",
    memoryAnchor:
      "Dynamic import() is ordering food delivery instead of cooking at home. You only pay (download) when you are actually hungry (need the module), not when you wrote the grocery list (build time). Each import() call is a separate delivery order (chunk).",
  },
  {
    id: "tree-shaking",
    title: "Tree Shaking",
    category: "modules",
    basic:
      "Tree shaking is dead code elimination based on ES module static analysis. Bundlers remove exports that are never imported, reducing bundle size. It only works with ESM, not CommonJS.",
    expected:
      "Tree shaking relies on ESM's static import/export statements — the bundler can determine at build time which exports are used. Side-effectful modules cannot be tree-shaken unless marked 'sideEffects: false' in package.json. Named exports tree-shake better than re-exported namespace objects. Bundlers mark unused exports as 'dead code' then remove them in the minification phase (e.g., Terser). Conditional exports and computed property access on namespaces prevent tree shaking.",
    deep:
      "True tree shaking requires both static export analysis AND side-effect awareness. A module with side effects (e.g., attaches to window, modifies global state) must be included even if none of its exports are used — sideEffects field in package.json tells bundlers which files are safe to exclude. Rollup pioneered tree shaking; Webpack added it in v2. Scope hoisting (module concatenation in Webpack/Rollup) inlines small modules into the bundle's outer scope, reducing function call overhead and enabling better minification (shorter variable names, more inlining). CSS modules and CSS-in-JS also support tree shaking via the same static analysis principle.",
    interviewAnswer:
      "Tree shaking removes unused exports at build time using ESM's static import/export analysis — bundlers know at compile time exactly which exports are used. It requires ESM (not CJS), and libraries must mark side-effect-free files with 'sideEffects: false' in package.json. The practical impact: importing { debounce } from 'lodash-es' includes only debounce; importing from 'lodash' (CJS) includes the entire library.",
    trap:
      "Using barrel files (index.ts that re-exports everything) can break tree shaking if the bundler can't statically resolve which exports are used — especially with namespace re-exports (export * from './utils'). Some bundlers handle this well; others include the entire barrel. Profile your bundle with source-map-explorer or Bundle Analyzer before assuming tree shaking worked.",
    memoryAnchor:
      "Tree shaking is shaking a Christmas tree after the holidays — dead ornaments (unused exports) fall off, live ones (used imports) stay attached. Only works if the ornaments are on static hooks (ESM). Tangled wire lights (CJS) mean everything stays.",
  },
];

// ─── Interview Patterns ───────────────────────────────────────────────────────
const interviewPatterns: InterviewPattern[] = [
  {
    question: "Explain the event loop. What is the difference between microtasks and macrotasks?",
    answer:
      "JavaScript is single-threaded. The event loop continuously checks: if the call stack is empty, take a task from the queue. The distinction: macrotasks (setTimeout, I/O, UI events) are queued one at a time — the event loop picks ONE per iteration. Microtasks (Promise.then, queueMicrotask, MutationObserver) are drained COMPLETELY after every task — every pending microtask, including ones added during draining. This means Promise callbacks always run before the next setTimeout, even at 0ms.",
    whyAsked:
      "Tests whether candidates truly understand JavaScript's concurrency model vs. assuming it's multithreaded. Senior engineers must predict async ordering to write correct code and debug race conditions.",
    trap:
      "Saying 'Promises are asynchronous' without explaining WHEN they run. The precision: Promise .then callbacks are microtasks, which run synchronously within the event loop iteration (before the next paint or timer).",
  },
  {
    question:
      "What is a closure and how would you use one to create a private counter?",
    answer:
      "A closure is a function that retains access to its outer lexical scope after the outer function has returned. For a private counter: function makeCounter() { let count = 0; return { increment() { return ++count; }, decrement() { return --count; }, value() { return count; } }; } — count is private; only the returned methods can access it. The variable lives on the heap because the returned object closes over it.",
    whyAsked:
      "Closures are the foundation of encapsulation, factory functions, and module patterns in JavaScript. Interviewers use this to probe understanding of scope, memory, and encapsulation without classes.",
    trap:
      "Confusing closure with the returned object — the closure is the function (or functions) that capture the variable, not the object itself. Also: forgetting that all methods in the above example share the same count variable — they're all in the same closure.",
  },
  {
    question:
      "What is the difference between Promise.all, Promise.allSettled, Promise.race, and Promise.any?",
    answer:
      "Promise.all: resolves when ALL resolve, rejects immediately on first rejection — use for required parallel dependencies. Promise.allSettled: waits for ALL to settle (resolve or reject), always resolves with an array of {status, value|reason} — use for best-effort parallel. Promise.race: resolves/rejects with the FIRST to settle — use for timeouts. Promise.any: resolves with the FIRST to resolve, rejects with AggregateError only if ALL reject — use for redundant sources.",
    whyAsked:
      "Real-world async code requires choosing the right combinator. Interviewers want to know candidates can match the failure semantics to the use case rather than defaulting to Promise.all everywhere.",
    trap:
      "Promise.all doesn't cancel other promises on rejection — they keep running. Also: Promise.any is ES2021 and may require a polyfill in older environments. Confusing race (first settled) with any (first resolved) is common.",
  },
  {
    question:
      "How does prototypal inheritance work in JavaScript? How is it different from classical inheritance?",
    answer:
      "JavaScript uses delegation: objects have a [[Prototype]] link to another object. When you access a property, the engine walks the chain until it finds it or hits null. ES6 classes are syntactic sugar over this — class Foo extends Bar sets Bar.prototype as Foo.prototype's [[Prototype]]. Classical inheritance (Java, C++) copies behavior into subclasses at compile time. JS delegation means behavior is looked up at runtime on shared prototype objects — one prototype method serves all instances, which is memory-efficient but means mutating the prototype affects all instances.",
    whyAsked:
      "Foundational to understanding JS object model. Interviewers distinguish engineers who understand the prototype chain from those who just know class syntax.",
    trap:
      "Saying JS has 'classical inheritance' because of the class keyword. Classes are syntax sugar — the underlying mechanism is prototype delegation, which is fundamentally different (shared mutable prototypes, runtime lookup, no copying).",
  },
  {
    question: "Explain 'this' in JavaScript. How does binding work?",
    answer:
      "this is determined at call time by four rules in priority order: (1) new — new Foo() binds this to the new object; (2) explicit — call/apply/bind set this explicitly; (3) implicit — obj.method() binds this to obj; (4) default — standalone call in non-strict mode binds to global, strict mode gives undefined. Arrow functions are not a rule — they capture this from their enclosing lexical scope at definition time and cannot be rebound with call/apply/bind.",
    whyAsked:
      "this is one of the most misunderstood aspects of JavaScript. It's tested because incorrect this assumptions cause real bugs in class methods used as callbacks, event handlers, and async code.",
    trap:
      "Arrow functions don't have their own this — calling .bind() on an arrow function returns a function with no effect on this. Also: in class methods, this is NOT bound by default — passing class methods as callbacks loses the instance context unless bound or wrapped in an arrow.",
  },
  {
    question:
      "What are the differences between CommonJS and ES modules? Why does it matter for tree shaking?",
    answer:
      "CommonJS: require() is a runtime function call, synchronous, returns module.exports (a snapshot). ESM: import/export are static syntax parsed before execution, exports are live bindings (reflect mutations), always strict mode. Tree shaking requires ESM because bundlers can statically determine which exports are imported during the parse phase — CJS require() can be dynamic (require(computedPath)), making dead code analysis impossible.",
    whyAsked:
      "Modern front-end development requires understanding of module systems for bundle optimization. Senior engineers are expected to know why ESM is the modern standard and what practical differences it creates.",
    trap:
      "ESM exports are live bindings, not snapshots — if the exporting module changes an exported variable, all importing modules see the new value. This is unlike CJS where you get the value at require() time.",
  },
  {
    question:
      "How do you prevent memory leaks in a JavaScript SPA? Give concrete examples.",
    answer:
      "The main leak vectors in SPAs: (1) Event listeners on global objects (window, document) registered on component mount but never removed on unmount — always pair addEventListener with removeEventListener in cleanup; (2) Closures retaining references to large objects in module scope; (3) Timers (setInterval) not cleared on unmount; (4) Detached DOM nodes referenced in JS — remove references when nodes are removed. In React: return cleanup functions from useEffect. Use Chrome's Memory panel heap snapshots to detect growing object counts.",
    whyAsked:
      "Memory leaks cause page degradation over time — a critical issue in SPAs where the page never fully reloads. Senior engineers must proactively prevent leaks in component lifecycle management.",
    trap:
      "Storing event listener callbacks as inline arrow functions makes them impossible to remove — always store the reference: const handler = () => {}; element.addEventListener('click', handler); /* later */ element.removeEventListener('click', handler).",
  },
  {
    question:
      "What is the Temporal Dead Zone? How does it differ between var, let, and const?",
    answer:
      "The Temporal Dead Zone is the period between entering a block scope and a let/const declaration being initialized. Accessing a TDZ variable throws ReferenceError. var is different: it's hoisted and initialized to undefined immediately — no TDZ. let and const are hoisted (their names are registered in the block scope) but not initialized — any access before the declaration line throws. const additionally requires initialization at declaration and cannot be reassigned.",
    whyAsked:
      "TDZ is a frequently tested gotcha that distinguishes engineers who deeply understand ES6 semantics from those who only know the surface-level 'let and const are block-scoped'.",
    trap:
      "let and const ARE hoisted — they're just not initialized. This surprises many who say 'let and const are not hoisted'. The hoisting happens, but the binding sits in the TDZ (uninitialized state) until the declaration is reached in the execution flow.",
  },
];

// ─── Common Mistakes ──────────────────────────────────────────────────────────
const commonMistakes: CommonMistake[] = [
  {
    wrong:
      "for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); } // logs 3, 3, 3",
    correct:
      "for (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); } // logs 0, 1, 2 — let creates a new binding per iteration",
  },
  {
    wrong:
      "async function fetchAll(ids) { ids.forEach(async (id) => { await fetch(id); }); } // awaits don't propagate out of forEach",
    correct:
      "async function fetchAll(ids) { await Promise.all(ids.map(async (id) => fetch(id))); } // correctly awaits all parallel fetches",
  },
  {
    wrong:
      "const obj = { greet() { return this.name; } }; const fn = obj.greet; fn(); // this is undefined in strict mode",
    correct:
      "const fn = obj.greet.bind(obj); fn(); // or: const fn = () => obj.greet(); — preserves the correct 'this' binding",
  },
  {
    wrong:
      "Promise.all([fetchA(), fetchB()]).catch(err => console.log('one failed')); // ignores which failed and what succeeded",
    correct:
      "Promise.allSettled([fetchA(), fetchB()]).then(results => results.forEach(r => r.status === 'rejected' && console.error(r.reason))); // handles each outcome",
  },
  {
    wrong:
      "if (typeof null === 'object') { /* assumes null is an object */ } — treating typeof null as reliable",
    correct:
      "if (value === null) { /* use strict equality */ } // typeof null === 'object' is a bug; always use === null to check for null",
  },
  {
    wrong:
      "element.addEventListener('click', () => handleClick()); /* later */ element.removeEventListener('click', () => handleClick()); // arrow creates new function reference — listener never removed",
    correct:
      "const handler = () => handleClick(); element.addEventListener('click', handler); /* later */ element.removeEventListener('click', handler); // same reference required",
  },
  {
    wrong:
      "const result = isNaN('hello'); // true — isNaN coerces string to NaN first",
    correct:
      "const result = Number.isNaN('hello'); // false — Number.isNaN only returns true for actual NaN, not coerced values",
  },
  {
    wrong:
      "class Foo { constructor() { this.handler = this.handleClick.bind(this); } } new Proxy(new Foo(), {}); // Proxy breaks internal slot access for built-ins",
    correct:
      "// Proxying objects that rely on internal slots (Map, Set, Date) requires forwarding 'this': get trap must bind methods to target, not the proxy",
  },
  {
    wrong:
      "import _ from 'lodash'; // imports entire 3MB lodash library even if only debounce is used",
    correct:
      "import debounce from 'lodash-es/debounce'; // or: import { debounce } from 'lodash-es' with a tree-shaking bundler — only includes debounce",
  },
  {
    wrong:
      "delete obj.property; // changes object's hidden class, kills V8 inline cache optimization",
    correct:
      "obj.property = undefined; // preserves hidden class shape; or use Map if you need truly dynamic keys",
  },
  {
    wrong:
      "async function withTimeout(promise) { return new Promise((resolve, reject) => { setTimeout(() => reject(new Error('timeout')), 5000); promise.then(resolve).catch(reject); }); } // doesn't abort the original promise",
    correct:
      "async function withTimeout(promise, ms) { const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), ms); try { return await fetch(url, { signal: controller.signal }); } finally { clearTimeout(timeout); } } // AbortController actually cancels fetch",
  },
  {
    wrong:
      "const debounced = debounce(fn, 300); // called at the top level of a functional component without useMemo/useRef — creates a brand new debounce instance every render, resetting the timer each time so the debounce never actually delays",
    correct:
      "const debounced = useRef(debounce(fn, 300)); // stores stable debounce instance across renders; access via debounced.current()",
  },
];

// ─── Practice Questions ───────────────────────────────────────────────────────
const practiceQuestions: PracticeQuestion[] = [
  {
    code: `console.log('start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve()
  .then(() => console.log('promise 1'))
  .then(() => console.log('promise 2'));

console.log('end');`,
    question: "What is the output and in what order? Explain why.",
    answer:
      "Output: start → end → promise 1 → promise 2 → timeout. Synchronous code runs first (start, end). The Promise microtasks drain completely before the setTimeout macrotask fires — promise 1 then promise 2. The second .then is queued as a new microtask after promise 1 resolves, still before the timeout.",
  },
  {
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 100);
}`,
    question: "What does this log? How do you fix it to log 0, 1, 2?",
    answer:
      "Logs 3, 3, 3. var is function-scoped — all callbacks share one i binding, which is 3 after the loop completes. Fix 1: replace var with let (block-scoped, creates new binding per iteration). Fix 2: IIFE — setTimeout((function(j) { return function() { console.log(j); }; })(i), i * 100) — captures i by value in j.",
  },
  {
    code: `const obj = {
  name: 'Alice',
  greet: function() {
    return () => {
      console.log(this.name);
    };
  }
};

const arrow = obj.greet();
arrow(); // ?

const greet2 = obj.greet;
const arrow2 = greet2();
arrow2(); // ?`,
    question: "What does each call log?",
    answer:
      "arrow() logs 'Alice'. obj.greet() is called as a method — this inside greet is obj. The returned arrow function captures this lexically from greet's context (obj), so this.name is 'Alice'. arrow2() logs undefined (or throws in strict mode). greet2() is called without a receiver — this is the global object (or undefined in strict mode). The arrow captures that outer this, so this.name is undefined.",
  },
  {
    code: `async function fetchData() {
  try {
    const result = doSomethingAsync(); // missing await
    return result;
  } catch (err) {
    console.log('caught:', err.message);
  }
}

function doSomethingAsync() {
  return Promise.reject(new Error('boom'));
}

fetchData().then(val => console.log('val:', val));`,
    question: "What is logged? Will the catch block run?",
    answer:
      "The catch block does NOT run. Without await, result is a pending/rejected Promise object — try/catch only catches synchronous throws or awaited rejections. Since result (the rejected Promise) is returned without await, the async function's own returned Promise adopts that rejection. So fetchData() returns a rejected Promise, .then() is skipped entirely, and an unhandledRejection fires. Fix: add await before doSomethingAsync() so the rejection is caught by the try/catch.",
  },
  {
    code: `console.log(typeof null);
console.log(typeof undefined);
console.log(typeof []);
console.log(typeof function(){});
console.log(typeof NaN);`,
    question: "What does each typeof call return?",
    answer:
      "'object' — the famous null bug; null is not an object but typeof returns 'object'. 'undefined' — correct. 'object' — arrays are objects; use Array.isArray() to distinguish. 'function' — functions are callable objects; typeof returns the special 'function' string. 'number' — NaN is of type Number; use Number.isNaN() to check for NaN specifically.",
  },
  {
    code: `function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(3));   // ?
console.log(add10(3));  // ?
console.log(add5 === add10); // ?`,
    question: "What are the outputs? What concept does this demonstrate?",
    answer:
      "8, 13, false. Demonstrates closures and factory functions. Each call to makeAdder creates a new closure with its own x binding (5 and 10 respectively) — add5 and add10 are separate function objects (=== is false) each enclosing a different x. This is the factory function pattern: parameterize behavior by capturing state in closures.",
  },
  {
    code: `const a = { x: 1 };
const b = Object.assign({}, a);
const c = Object.create(a);

console.log(b.x); // ?
console.log(c.x); // ?

a.x = 99;

console.log(b.x); // ?
console.log(c.x); // ?

console.log(b.hasOwnProperty('x')); // ?
console.log(c.hasOwnProperty('x')); // ?`,
    question: "What does each log after a.x is mutated?",
    answer:
      "Initial: b.x = 1 (own property copy), c.x = 1 (inherited from a via prototype). After a.x = 99: b.x = 1 (b has own copy, unaffected by a's mutation), c.x = 99 (c delegates to a via prototype — no own 'x', so lookup finds a.x which is now 99). hasOwnProperty: b.hasOwnProperty('x') = true (own copy). c.hasOwnProperty('x') = false (inherited, not own).",
  },
  {
    code: `function* range(start, end) {
  while (start < end) {
    yield start++;
  }
}

const gen = range(1, 4);

console.log(gen.next()); // ?
console.log(gen.next()); // ?
console.log([...gen]);   // ?
console.log(gen.next()); // ?`,
    question: "What does each call return/log?",
    answer:
      "gen.next() → {value: 1, done: false}. gen.next() → {value: 2, done: false}. [...gen] → [3] (spread consumes remaining values; the generator is at start=3, yields 3, then start=4 meets end condition and stops). gen.next() → {value: undefined, done: true} (generator exhausted). Key insight: the spread operator calls next() until done is true, consuming the generator.",
  },
];

// ─── Topic Data Export ────────────────────────────────────────────────────────
export const topicData: TopicData = {
  topicTitle: "JavaScript",
  topicMeta: "45–60 min · Mid to Senior level",
  lastUpdated: "2026-04-10",
  lastHourConceptIds: [
    "event-loop-tick",
    "closure",
    "prototype-chain",
    "async-await",
    "type-coercion",
    "this-binding",
    "memory-leaks",
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
