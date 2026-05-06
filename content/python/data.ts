// Import shared types for use in this file
import type {
  DepthLevel,
  Concept,
  CategoryMeta,
  TreeNode,
  InterviewPattern,
  CommonMistake,
  PracticeQuestion,
  TopicData,
  LastHourSummary,
} from "@/content/types";

// Re-export so existing imports from this file keep working
export type {
  DepthLevel,
  Concept,
  CategoryMeta,
  TreeNode,
  InterviewPattern,
  CommonMistake,
  PracticeQuestion,
  LastHourSummary,
};

// Python-specific category labels (documentation only — not enforced at runtime)
export type ConceptCategory =
  | "execution-model"
  | "memory-model"
  | "functions"
  | "oop-data-model"
  | "concurrency"
  | "data-structures"
  | "protocols-types";

// ─── Mental Model ─────────────────────────────────────────────────────────────

export const mentalModel = {
  whatItIs:
    "Python is a high-level, interpreted language with dynamic typing, automatic memory management (reference counting + GC), and a design philosophy centered on readability. CPython is the reference implementation — everything runs through its bytecode VM.",
  whyItExists:
    "Built to reduce boilerplate and maximize developer productivity — 'batteries included' stdlib, duck typing, and clean syntax make it fast to write and reason about. Trade-off is runtime speed and GIL-limited CPU parallelism.",
  whenToUse: [
    "Scripting and automation",
    "Data science, ML pipelines (NumPy, Pandas, PyTorch)",
    "Backend APIs (Django, FastAPI, Flask)",
    "Rapid prototyping and tooling",
    "Glue code between systems",
  ],
  whereItFails: [
    "CPU-bound parallel workloads (GIL bottleneck)",
    "Mobile / embedded targets",
    "Hard real-time or ultra-low-latency systems",
    "When raw execution speed is critical (use C/Rust/Go)",
  ],
};

// ─── Category Metadata ────────────────────────────────────────────────────────

export const categories: CategoryMeta[] = [
  {
    id: "execution-model",
    label: "Execution Model",
    description: "How Python code becomes running bytecode — CPython, GIL, scoping, imports",
  },
  {
    id: "memory-model",
    label: "Memory Model",
    description: "How objects are allocated, tracked, and freed — refcount, GC, interning, slots",
  },
  {
    id: "functions",
    label: "Functions & Callables",
    description: "Closures, decorators, generators, async/await — Python's functional core",
  },
  {
    id: "oop-data-model",
    label: "OOP & Data Model",
    description: "Classes, dunder methods, MRO, descriptors, metaclasses — Python's object system",
  },
  {
    id: "concurrency",
    label: "Concurrency",
    description: "Threading, asyncio, multiprocessing — when to use each and why",
  },
  {
    id: "data-structures",
    label: "Built-in Data Structures",
    description: "list, dict, set internals — time complexities, trade-offs, collections module",
  },
  {
    id: "protocols-types",
    label: "Protocols & Type System",
    description: "Iterator protocol, context managers, type hints, duck typing",
  },
];

// ─── Mental Model Tree ────────────────────────────────────────────────────────

export const mentalModelTree: TreeNode = {
  id: "root",
  label: "Python Runtime",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "cat-execution",
      label: "Execution Model",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "cpython-bytecode", label: "CPython & Bytecode", nodeType: "concept", conceptId: "cpython-bytecode", importance: "high" },
        { id: "gil-tree", label: "GIL", nodeType: "concept", conceptId: "gil", importance: "critical" },
        { id: "legb-scoping-tree", label: "LEGB Scoping", nodeType: "concept", conceptId: "legb-scoping", importance: "high" },
        { id: "import-system-tree", label: "Import System", nodeType: "concept", conceptId: "import-system", importance: "medium" },
      ],
    },
    {
      id: "cat-memory",
      label: "Memory Model",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "reference-counting-tree", label: "Reference Counting", nodeType: "concept", conceptId: "reference-counting", importance: "critical" },
        { id: "gc-cycles-tree", label: "Cyclic Garbage Collector", nodeType: "concept", conceptId: "gc-cycles", importance: "high" },
        { id: "object-interning-tree", label: "Object Interning", nodeType: "concept", conceptId: "object-interning", importance: "medium" },
        { id: "slots-tree", label: "__slots__", nodeType: "concept", conceptId: "slots", importance: "medium" },
      ],
    },
    {
      id: "cat-functions",
      label: "Functions & Callables",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "closures-tree", label: "Closures & LEGB", nodeType: "concept", conceptId: "closures", importance: "high", relatedIds: ["legb-scoping"] },
        { id: "decorators-tree", label: "Decorators", nodeType: "concept", conceptId: "decorators", importance: "critical" },
        { id: "generators-tree", label: "Generators & yield", nodeType: "concept", conceptId: "generators", importance: "critical" },
        { id: "coroutines-async-tree", label: "Coroutines / async def", nodeType: "concept", conceptId: "coroutines-async", importance: "critical", relatedIds: ["asyncio"] },
      ],
    },
    {
      id: "cat-oop",
      label: "OOP & Data Model",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "dunder-methods-tree", label: "Dunder Methods", nodeType: "concept", conceptId: "dunder-methods", importance: "critical" },
        { id: "mro-tree", label: "MRO (C3 Linearization)", nodeType: "concept", conceptId: "mro", importance: "critical" },
        { id: "descriptors-tree", label: "Descriptors", nodeType: "concept", conceptId: "descriptors", importance: "high", relatedIds: ["dunder-methods"] },
        { id: "metaclasses-tree", label: "Metaclasses", nodeType: "concept", conceptId: "metaclasses", importance: "high" },
      ],
    },
    {
      id: "cat-concurrency",
      label: "Concurrency",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "threading-tree", label: "Threading (I/O bound)", nodeType: "concept", conceptId: "threading", importance: "high", relatedIds: ["gil"] },
        { id: "asyncio-tree", label: "asyncio (event loop)", nodeType: "concept", conceptId: "asyncio", importance: "critical", relatedIds: ["coroutines-async"] },
        { id: "multiprocessing-tree", label: "Multiprocessing (CPU bound)", nodeType: "concept", conceptId: "multiprocessing", importance: "high", relatedIds: ["gil"] },
      ],
    },
    {
      id: "cat-ds",
      label: "Data Structures",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "list-internals-tree", label: "list (dynamic array)", nodeType: "concept", conceptId: "list-internals", importance: "high" },
        { id: "dict-internals-tree", label: "dict (hash table)", nodeType: "concept", conceptId: "dict-internals", importance: "critical" },
        { id: "collections-module-tree", label: "collections module", nodeType: "concept", conceptId: "collections-module", importance: "medium" },
      ],
    },
    {
      id: "cat-protocols",
      label: "Protocols & Type System",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "iterator-protocol-tree", label: "Iterator Protocol", nodeType: "concept", conceptId: "iterator-protocol", importance: "high", relatedIds: ["generators"] },
        { id: "context-manager-tree", label: "Context Managers", nodeType: "concept", conceptId: "context-manager", importance: "high" },
        { id: "type-hints-tree", label: "Type Hints & Protocols", nodeType: "concept", conceptId: "type-hints", importance: "medium" },
      ],
    },
  ],
};

// ─── Concepts ─────────────────────────────────────────────────────────────────

export const concepts: Concept[] = [
  // ── Execution Model ──────────────────────────────────────────────────────────
  {
    id: "cpython-bytecode",
    title: "CPython & Bytecode",
    category: "execution-model",
    basic:
      "CPython compiles Python source to bytecode (.pyc files), then executes that bytecode in a stack-based virtual machine.",
    expected:
      "Compilation happens automatically before execution. .pyc files are cached in __pycache__ keyed by Python version and source hash. The dis module lets you inspect bytecode. CPython is the reference implementation — PyPy, Jython, etc. are alternatives with different trade-offs.",
    deep:
      "The bytecode VM is stack-based, not register-based. Each frame object holds its own stack, local variables, and reference to the code object. Frame creation is a major overhead for function calls. dis.dis(func) shows you exactly what the interpreter executes. LOAD_FAST / STORE_FAST are the cheapest local variable operations; LOAD_GLOBAL is slower (dict lookup). Python 3.11+ introduced specialized adaptive bytecode that self-optimizes hot paths.",
    interviewAnswer:
      "CPython first compiles source to bytecode — a lower-level representation stored in .pyc files. Then the bytecode runs in a stack-based VM. This is why Python is 'interpreted' but not line-by-line — it compiles first. You can inspect bytecode with dis.dis(). CPython is the default implementation; PyPy uses JIT compilation for significantly faster execution of CPU-bound code.",
    trap:
      "Python is NOT purely interpreted line-by-line. It compiles to bytecode first. 'Interpreted' means the bytecode VM runs at runtime, not that compilation doesn't happen.",
    memoryAnchor:
      "Think of CPython as a translator who first writes down the speech in shorthand (bytecode), then reads the shorthand aloud (VM execution). It's not improvising live — there's always a written step first.",
  },
  {
    id: "gil",
    title: "GIL (Global Interpreter Lock)",
    category: "execution-model",
    basic:
      "A mutex in CPython that allows only one thread to execute Python bytecode at a time.",
    expected:
      "The GIL exists to protect CPython's reference-counting memory management from race conditions. It serializes thread execution — multi-threading gives NO CPU parallelism for CPU-bound tasks. However, the GIL is released during I/O operations, so threading is still useful for I/O-bound work.",
    deep:
      "The GIL is a per-interpreter lock. Python 3.12 introduced per-subinterpreter GILs (PEP 684). Python 3.13 added an experimental free-threaded build (PEP 703) that removes the GIL entirely. In Python 3, the GIL is released based on a time interval (sys.getswitchinterval(), default 5ms) — not every N bytecode instructions as in Python 2. C extensions can explicitly release the GIL (Py_BEGIN_ALLOW_THREADS) — NumPy and OpenSSL do this, enabling true parallelism in their operations. The GIL's overhead actually slows down multi-threaded CPU-bound code compared to single-threaded.",
    interviewAnswer:
      "The GIL ensures only one thread runs Python bytecode at a time in CPython. It protects reference counting from race conditions. For CPU-bound tasks, this means threading gives no speedup — use multiprocessing. For I/O-bound tasks, threading works well because the GIL is released during I/O waits. Python 3.13 introduced an experimental free-threaded build (PEP 703) that removes the GIL for true thread parallelism.",
    trap:
      "The GIL does NOT prevent all concurrency. I/O-bound programs benefit greatly from threading because the GIL releases during I/O. Also, C extensions like NumPy explicitly release the GIL — so NumPy operations run in parallel across threads.",
    memoryAnchor:
      "GIL = Giant Invisible Leash. Imagine all your threads are dogs on one leash — only one can run ahead at a time. But when a dog stops to sniff (I/O), the leash lets the next dog go.",
  },
  {
    id: "legb-scoping",
    title: "LEGB Scoping Rule",
    category: "execution-model",
    basic:
      "Python resolves names in this order: Local → Enclosing → Global → Built-in (LEGB).",
    expected:
      "Local: inside the current function. Enclosing: in an enclosing function (for closures). Global: module-level. Built-in: Python's built-in namespace (len, print, etc.). The global keyword lets you write to global scope from inside a function. The nonlocal keyword lets you write to an enclosing scope.",
    deep:
      "Python determines at compile time whether a variable is local or global — if a name is assigned anywhere in a function, it's treated as local throughout that function (even before the assignment). This causes the UnboundLocalError trap. Each module has its own global scope — there is no single 'global' across modules. Class scope is NOT part of LEGB — comprehensions inside classes can't access class-scope variables directly.",
    interviewAnswer:
      "Python resolves names using LEGB — Local, Enclosing, Global, Built-in. Each function call creates a new local scope. For closures, the enclosing scope is captured. Use 'global x' to write to module scope, 'nonlocal x' to write to an enclosing function's scope. Note: class bodies are NOT part of the LEGB chain — that catches people off guard with comprehensions inside classes.",
    trap:
      "If you assign to a variable anywhere in a function, Python treats it as local for the entire function — even above the assignment. Reading it before assignment gives UnboundLocalError, not the global value.",
    memoryAnchor:
      "LEGB = Look Everywhere for Groceries, Buddy. You check your pocket (Local), your friend's bag (Enclosing), the car trunk (Global), then the store itself (Built-in). Always closest pocket first.",
  },
  {
    id: "import-system",
    title: "Import System",
    category: "execution-model",
    basic:
      "import foo searches sys.path, executes the module file once, and caches it in sys.modules. Subsequent imports return the cached version.",
    expected:
      "sys.path is a list of directories searched in order (current dir, PYTHONPATH, stdlib, site-packages). Packages require __init__.py (or are namespace packages in Python 3.3+). Relative imports use dots: from . import sibling, from .. import parent. __all__ controls what from module import * exports.",
    deep:
      "The import machinery uses finders and loaders (importlib). sys.meta_path contains meta path finders checked first. sys.modules is the module cache — you can hot-reload by deleting a key and re-importing. Circular imports work if you import the module (not specific names) and access names after the circular import resolves. import foo runs foo.py top-to-bottom in a new module namespace — side effects at module level execute immediately.",
    interviewAnswer:
      "Python's import system finds modules via sys.path, executes them once, and caches in sys.modules — so reimporting is cheap. __init__.py makes a directory a package. Circular imports are possible but tricky — import the module, not specific names, and access them after the import cycle resolves. You can inspect the import machinery via importlib.",
    trap:
      "Modules are executed once and cached. If module A modifies global state at import time, that state is shared across all importers. Reimporting doesn't reset it — you need importlib.reload() for that.",
    memoryAnchor:
      "Importing is like microwaving a frozen dinner — it cooks (executes) the first time, then sits in sys.modules like leftovers in the fridge. Grabbing it again just opens the fridge door.",
  },

  // ── Memory Model ─────────────────────────────────────────────────────────────
  {
    id: "reference-counting",
    title: "Reference Counting",
    category: "memory-model",
    basic:
      "Every Python object has a reference count. When it reaches zero, memory is freed immediately.",
    expected:
      "sys.getrefcount(obj) returns the current count (always at least 1 because the getrefcount call itself creates a reference). Each assignment, function argument pass, or container append increments the count. del x decrements it. When the count hits 0, __del__ is called and the memory is freed. This is deterministic and fast for most cases.",
    deep:
      "Reference counting is O(1) per operation — no GC pause for non-cyclic objects. But it can't handle cycles (A → B → A both have count > 0 even if nothing external references them). The cyclic GC handles this separately. Reference counting also interacts with the GIL — the GIL protects reference count modifications from data races. In CPython, every object starts with ob_refcnt in its header. The __del__ finalizer may resurrect an object, which can cause subtle bugs.",
    interviewAnswer:
      "Python's primary memory management is reference counting — each object tracks how many references point to it. When the count hits 0, memory is freed immediately. sys.getrefcount() lets you inspect it. This gives deterministic cleanup for most objects. The weakness is cycles — if A references B and B references A, neither count reaches 0, so the cyclic garbage collector handles those separately.",
    trap:
      "del x does NOT immediately free memory. It only decrements the reference count. Memory is freed only when the count reaches 0. If anything else holds a reference, the object lives on.",
    memoryAnchor:
      "ref-COUNT = a library book's checkout card. Each borrower adds a tally. The book goes back on the shelf (freed) only when the last borrower returns it — zero tallies left.",
  },
  {
    id: "gc-cycles",
    title: "Cyclic Garbage Collector",
    category: "memory-model",
    basic:
      "Python's gc module handles objects with circular references that reference counting alone cannot free.",
    expected:
      "The GC runs periodically in three generations (0, 1, 2). Objects survive to older generations the longer they live — most objects die young (generational hypothesis). You can trigger manually with gc.collect(). gc.disable() turns off the cyclic GC (safe if you avoid circular references). Objects tracked by the GC have a small overhead.",
    deep:
      "The GC uses a 'mark and sweep'-like algorithm — it finds all container objects that are reachable only from other cyclic garbage. The three generations have thresholds (default 700/10/10): when generation 0 exceeds its threshold, a collection runs and survivors are promoted. The GC overhead is why some high-performance Python code explicitly avoids circular references and disables gc.collect(). Python 3.12 improves GC performance significantly. __del__ complicates GC — objects with finalizers were historically uncollectable in cycles (fixed in Python 3.4+).",
    interviewAnswer:
      "Reference counting can't free circular references. Python's cyclic GC periodically scans container objects for cycles and frees them. It uses three generations for efficiency — most objects die young so only gen-0 runs frequently. You can tune thresholds with gc.set_threshold() or disable it entirely with gc.disable() in performance-critical code where you control your object graph.",
    trap:
      "gc.disable() doesn't disable reference counting — that always runs. It only disables the cyclic collector. If you have no cycles, gc.disable() has no downside and can speed up allocation-heavy code.",
    memoryAnchor:
      "Cyclic GC = the janitor who untangles Christmas lights. Ref counting handles lone bulbs fine, but when two strands are tangled in a loop, only the janitor can cut through and reclaim them.",
  },
  {
    id: "object-interning",
    title: "Object Interning",
    category: "memory-model",
    basic:
      "Python reuses the same object for small integers (-5 to 256) and some strings instead of creating new ones.",
    expected:
      "Integers from -5 to 256 are pre-allocated singletons — a is b is True for these. Strings that look like identifiers (alphanumeric, underscore) are often interned automatically. sys.intern(s) forces string interning. This is an implementation detail of CPython, not guaranteed by the language spec.",
    deep:
      "Integer interning is a startup-time optimization: CPython pre-allocates 262 integer objects. For strings, CPython interns compile-time string constants that look like identifiers. Runtime strings (e.g., built by concatenation) are typically NOT interned. This matters for performance when doing many string equality checks — interned strings use is (pointer comparison) rather than character-by-character comparison. The interning cache for strings is a dict in the interpreter state.",
    interviewAnswer:
      "Python interns small integers (-5 to 256) and identifier-like strings — reusing the same object instead of creating duplicates. This means 'a is b' can be True for small ints and compile-time strings even without explicit assignment. It's a CPython implementation detail, not a language guarantee. sys.intern() forces a string into the intern table. The practical implication: always use == for value comparison, never rely on is for strings or ints outside the known range.",
    trap:
      "a = 1000; b = 1000; a is b may be True or False depending on context — Python may or may not optimize this. Never use is to compare integers or strings for value equality. Always use ==.",
    memoryAnchor:
      "interning = a hotel giving everyone asking for Room 42 the SAME key. Small integers (-5 to 256) are permanent hotel residents — everyone shares their key. Big numbers get a fresh room each time.",
  },
  {
    id: "slots",
    title: "__slots__",
    category: "memory-model",
    basic:
      "A class-level declaration that replaces the per-instance __dict__ with fixed-size descriptor slots, reducing memory usage.",
    expected:
      "Normally each instance has a __dict__ (a hash table) storing its attributes — flexible but memory-heavy. With __slots__ = ('x', 'y'), the class uses C-level struct slots instead. Result: ~40–50% less memory per instance, faster attribute access, and no __dict__ (so no arbitrary attribute assignment).",
    deep:
      "Slots use descriptors (slot_wrapper objects) at the class level. __slots__ only applies to the class that declares it — subclasses still get __dict__ unless they also declare __slots__. Mixing __slots__ classes in multiple inheritance is tricky — slots from different bases can conflict. Pickle works with slots but requires custom __getstate__/__setstate__. Slots don't work with weak references unless '__weakref__' is included in __slots__.",
    interviewAnswer:
      "Adding __slots__ to a class replaces each instance's __dict__ with fixed descriptor slots. This saves ~40-50% memory when you have millions of instances with known, fixed attributes — think data objects, lightweight value types. The trade-off: you can't add arbitrary attributes at runtime. I'd use it in data-intensive code — e.g., a Point class in a geometry engine.",
    trap:
      "__slots__ on a subclass doesn't eliminate __dict__ unless the parent also uses __slots__. Inheriting from a regular class and adding __slots__ to the subclass still gives every instance a __dict__.",
    memoryAnchor:
      "__slots__ = assigned parking spots instead of a free-for-all parking garage (__dict__). Fixed spots use way less space, but you can't park anywhere you want anymore.",
  },

  // ── Functions ─────────────────────────────────────────────────────────────────
  {
    id: "closures",
    title: "Closures & LEGB in Practice",
    category: "functions",
    basic:
      "A closure is a function that captures variables from its enclosing scope even after the outer function has returned.",
    expected:
      "Closures capture variables by reference, not by value. The enclosed variables live in a 'cell' object shared between the closure and the enclosing scope. This is how factories and decorators maintain state across calls. nonlocal allows a closure to rebind (not just read) an enclosing variable.",
    deep:
      "Each closure has a __closure__ attribute — a tuple of cell objects. cell.cell_contents gives you the captured value. Because closures capture by reference, the classic loop-closure bug occurs: closures created in a loop all share the same variable (they capture the variable, not the value at that moment). Fix: default argument (lambda i=i: ...) or functools.partial. This is also why you need nonlocal to increment a counter in a closure — without it, assignment makes the variable local.",
    interviewAnswer:
      "A closure captures variables from its enclosing scope by reference — the cell object holds a live reference, not a snapshot. This lets inner functions maintain state after the outer function returns. The key gotcha is loop closures: all closures created in a loop share the same loop variable. Fix with default arguments: lambda i=i: i. Inspect closures with func.__closure__ and cell.cell_contents.",
    trap:
      "Classic loop closure bug: funcs = [lambda: i for i in range(3)] — all three lambdas return 2 (the final value of i), not 0, 1, 2. They all capture the same i cell, not a copy of each iteration's value.",
    memoryAnchor:
      "A closure is like a backpack that keeps a LIVE walkie-talkie to the outer function's variables — not a photo of them. The variable can change, and the backpack always hears the latest value.",
  },
  {
    id: "decorators",
    title: "Decorators",
    category: "functions",
    basic:
      "A function that wraps another function to extend or modify its behavior. @decorator is syntactic sugar for func = decorator(func).",
    expected:
      "@decorator runs at definition time, not call time. The returned wrapper replaces the original function. Decorators are commonly used for logging, auth, caching (@functools.lru_cache), retries, and timing. Always use @functools.wraps(func) in the wrapper to preserve __name__, __doc__, and __wrapped__.",
    deep:
      "Decorators can be stacked — @A @B def f() is f = A(B(f)), applied bottom-up. Decorators with arguments need an extra wrapper layer: decorator_factory(arg) returns the actual decorator. Class-based decorators implement __call__. @functools.wraps copies over __module__, __name__, __qualname__, __doc__, __dict__, __annotations__, and sets __wrapped__. Without it, introspection tools (sphinx, pytest fixtures) break. Descriptor-based decorators (like @property) are a different mechanism entirely.",
    interviewAnswer:
      "A decorator is a callable that takes a function and returns a new one. @my_decorator on a function is exactly my_decorator(func) — happens at import/definition time. Stacked decorators apply bottom-up. Always use @functools.wraps to preserve the wrapped function's metadata — without it you'll break introspection and debugging. For decorators that take arguments, you need one extra level of nesting: the outer callable takes args and returns the actual decorator.",
    trap:
      "Stacked decorators apply bottom-up, not top-down. @A @B def f() → f = A(B(f)). B wraps f first. Also: decorators with arguments like @retry(3) vs @retry — the former calls retry(3) which must return a decorator, the latter passes the function directly.",
    memoryAnchor:
      "Decorators = gift wrapping. @decorator wraps your function in fancy paper at definition time. Stacked decorators? The bottom wrapper goes on first, then the outer one wraps around it — like nesting dolls.",
  },
  {
    id: "generators",
    title: "Generators & yield",
    category: "functions",
    basic:
      "Functions that use yield to produce values lazily one at a time, suspending execution between calls.",
    expected:
      "Calling a generator function returns a generator object without executing the body. Execution runs up to the next yield on each next() call and suspends there. StopIteration is raised when the function returns. Generator expressions (x for x in ...) are the lazy equivalent of list comprehensions — constant memory regardless of dataset size.",
    deep:
      "Generator state is stored in a frame object — local variables, the instruction pointer, and the stack are all preserved between yields. send(value) resumes execution AND passes a value back into the generator (yield becomes an expression that evaluates to the sent value). throw(exc) injects an exception at the yield point. yield from sub_gen delegates to a sub-generator and properly propagates send/throw/close. Generators are the foundation of Python coroutines — async def is syntactic sugar over generators + the event loop.",
    interviewAnswer:
      "Generators produce values lazily — execution suspends at each yield and resumes on next(). This gives constant memory usage regardless of data size, which is critical for large files or streams. send() can pass values back in (making them coroutines). yield from delegates to a sub-generator. Generators are exhausted after one pass — create a new generator object to re-iterate.",
    trap:
      "Generators are single-use. list(gen) exhausts it — a second list(gen) returns []. Also, generator expressions aren't evaluated until iterated — the iterable they reference is evaluated at creation, but the body runs lazily.",
    memoryAnchor:
      "A generator is a lazy vending machine — it only makes the next snack when you press the button (next()). It remembers which slot it's on, and once it's empty, it's done forever. No refills.",
  },
  {
    id: "coroutines-async",
    title: "Coroutines & async/await",
    category: "functions",
    basic:
      "async def defines a coroutine. await suspends the coroutine until the awaited object completes, yielding control to the event loop.",
    expected:
      "Coroutines don't run until awaited or scheduled with asyncio.create_task(). await can only appear inside async def. async for and async with support asynchronous iteration and context management. asyncio.gather() runs multiple coroutines concurrently on the same event loop thread.",
    deep:
      "Under the hood, async def compiles to a coroutine object (a specialized generator). await is equivalent to yield from for coroutine objects. The event loop drives all coroutines — it picks up suspended coroutines when their awaited I/O completes. asyncio.create_task() schedules a coroutine to run concurrently (not a new thread — still single-threaded). asyncio.run() creates a new event loop and runs the coroutine to completion. Python 3.11+ introduced task groups (async with asyncio.TaskGroup()) for structured concurrency.",
    interviewAnswer:
      "async def defines a coroutine — a function that can suspend at await points and let the event loop run other coroutines. It's cooperative multitasking on a single thread. await doesn't block — it yields control until I/O completes. Use asyncio.create_task() to schedule coroutines concurrently. asyncio.gather() collects results. Key point: async code only helps if you await non-blocking coroutines — calling a blocking function without run_in_executor blocks the entire event loop.",
    trap:
      "async def does not make code concurrent by itself. If you call time.sleep() instead of await asyncio.sleep(), or do CPU work, you block the entire event loop — no other coroutine runs during that time. Always use awaitable I/O or run_in_executor for blocking calls.",
    memoryAnchor:
      "async/await = a chef juggling multiple dishes. 'await' means 'this is in the oven, let me chop veggies for another dish.' But if you stand and watch the oven (blocking call), every other dish burns.",
  },

  // ── OOP & Data Model ─────────────────────────────────────────────────────────
  {
    id: "dunder-methods",
    title: "Dunder Methods (Python Data Model)",
    category: "oop-data-model",
    basic:
      "Special methods prefixed and suffixed with double underscores (__init__, __str__, etc.) that Python calls implicitly to implement operators and built-in functions.",
    expected:
      "__init__(self) initializes an instance (not the constructor — __new__ constructs it). __str__ is called by str() and print() — for end users. __repr__ is called by repr() and in the REPL — for developers, should be unambiguous. __len__, __getitem__, __contains__ make objects work with len(), [], and in. __eq__ enables ==; __hash__ enables use as dict keys / set members (if you define __eq__ you should define __hash__ too).",
    deep:
      "__new__(cls) actually creates the instance — it's a static method that returns the new object, then __init__ initializes it. __getattr__ is called only when normal lookup fails (for missing attributes). __getattribute__ is called for every attribute access — override with extreme care. __slots__ uses descriptors internally. __call__(self) makes instances callable. __enter__/__exit__ implement the context manager protocol. The data model is how Python's 'everything is an object' works — even classes are objects (instances of their metaclass).",
    interviewAnswer:
      "Dunder methods let your classes integrate with Python's operators and built-ins. __repr__ should return a developer-facing unambiguous string — ideally eval()-able. __str__ is user-facing. __eq__ enables ==. __hash__ must be defined consistently with __eq__ — if two objects are equal they must have the same hash. __getitem__ and __len__ make your class work with [] and len(). I use them to make domain objects feel Pythonic rather than requiring explicit method calls.",
    trap:
      "Defining __eq__ automatically sets __hash__ to None in Python 3, making instances unhashable (can't be dict keys or in sets). You must explicitly define __hash__ if you want both equality comparison and hashability.",
    memoryAnchor:
      "Dunder methods = secret handshakes. When Python sees 'len(x)', it whispers '__len__?' to your object. If your object knows the handshake, it responds. Double underscores = double secret.",
  },
  {
    id: "mro",
    title: "Method Resolution Order (MRO)",
    category: "oop-data-model",
    basic:
      "The order Python searches base classes when looking up a method or attribute in a class hierarchy.",
    expected:
      "Python uses C3 linearization (also called C3 MRO). Inspect it with ClassName.__mro__ or inspect.getmro(ClassName). In multiple inheritance, the order matters — Python searches left-to-right across base classes, depth-first but with local precedence. super() follows the MRO, not just the direct parent.",
    deep:
      "C3 linearization ensures: (1) each class appears once, (2) base classes maintain their original order, (3) local precedence is preserved. The algorithm merges the MROs of all bases plus the base list itself. If a consistent linearization can't be found (e.g., conflicting order constraints), Python raises TypeError at class definition time. Mixins work because super() in each class calls the next class in the MRO — so a mixin's super() call chains correctly even though the mixin doesn't know what it'll be mixed with. This is cooperative multiple inheritance.",
    interviewAnswer:
      "Python uses C3 linearization to compute the MRO — the order it searches classes for attributes and methods. You can inspect it with ClassName.__mro__. super() doesn't just call the direct parent — it calls the next class in the MRO. This makes mixins work correctly: each mixin's super() call chains to the next class in the resolved order. The algorithm prevents ambiguity — if two bases have conflicting orderings, Python raises TypeError at class creation.",
    trap:
      "super() is not 'call my parent class'. It's 'call the next class in the MRO'. In multiple inheritance with mixins, that next class might not be what you expect. Always trace ClassName.__mro__ to understand the actual call chain.",
    memoryAnchor:
      "MRO = the seating chart at a family dinner. With multiple inheritance, Python uses C3 rules to decide who sits where — no one sits twice, and left-side family always comes before right-side.",
  },
  {
    id: "descriptors",
    title: "Descriptors",
    category: "oop-data-model",
    basic:
      "Objects that define __get__, __set__, or __delete__ and control attribute access on classes that own them.",
    expected:
      "@property is a built-in descriptor. @staticmethod and @classmethod are too. A data descriptor defines both __get__ and __set__ (or __delete__) — it takes priority over instance __dict__. A non-data descriptor defines only __get__ — instance __dict__ takes priority. Descriptors only work when defined on a class, not on an instance.",
    deep:
      "Attribute lookup order: (1) data descriptors from the class hierarchy, (2) instance __dict__, (3) non-data descriptors and other class attributes. This is why @property (data descriptor) can intercept writes even if an instance dict entry exists. Descriptors are the mechanism behind functions becoming bound methods — function objects implement __get__ which returns a bound method when accessed via an instance. __slots__ uses descriptors internally. Writing a reusable validation descriptor (e.g., one that type-checks all instances of a class) is a common senior interview exercise.",
    interviewAnswer:
      "Descriptors are the protocol behind @property, @classmethod, @staticmethod, and even how methods work. A descriptor defines __get__ and optionally __set__/__delete__ on a class to intercept attribute access. Data descriptors (with __set__) override instance __dict__. Non-data descriptors don't. This is why you can define a @property and instance.x = value still routes through the setter. I use custom descriptors for reusable validation logic across multiple classes.",
    trap:
      "Descriptors only activate when defined on the class, not on an instance. obj.x = some_descriptor_instance does NOT activate the descriptor protocol — it just sets a value in obj.__dict__.",
    memoryAnchor:
      "Descriptors = a bouncer at the door of an attribute. @property is a bouncer that intercepts every get/set. A non-data descriptor is a lazy bouncer who only checks on the way in (__get__), not out.",
  },
  {
    id: "metaclasses",
    title: "Metaclasses",
    category: "oop-data-model",
    basic:
      "A metaclass is the class of a class. Just as a class defines how its instances behave, a metaclass defines how a class behaves.",
    expected:
      "type is the default metaclass of all classes. class Foo(metaclass=MyMeta) uses a custom metaclass. __new__ and __init__ on the metaclass run when the class is defined (not when instances are created). Metaclasses are how ORMs (Django models), ABCs, and some frameworks (e.g., attrs, pydantic) work under the hood.",
    deep:
      "__prepare__ on the metaclass returns the namespace dict used during class body execution (used to support ordered attributes, etc.). __new__(mcs, name, bases, namespace) creates the class object. Most metaclass use cases are now better served by __init_subclass__ (Python 3.6+) or class decorators — they're simpler and less surprising. Metaclass conflicts occur when multiple bases have different metaclasses that aren't in a subclass relationship. The conflict must be resolved by creating a metaclass that inherits from all conflicting ones.",
    interviewAnswer:
      "Every class in Python is an instance of a metaclass — by default, type. A custom metaclass lets you intercept class creation: modify class attributes, register subclasses, enforce interfaces, or auto-generate methods. I'd use __init_subclass__ first (simpler, cleaner) and reach for a full metaclass only when I need to control the class namespace itself via __prepare__. ORMs like Django use metaclasses to turn class attributes (Field instances) into database column definitions.",
    trap:
      "Metaclasses run at class definition time, not instantiation time. A bug in your metaclass can make a class impossible to define — the error fires at import time, which is confusing to debug.",
    memoryAnchor:
      "Metaclass = the blueprint for blueprints. If a class is a cookie cutter and instances are cookies, the metaclass is the factory that manufactures cookie cutters. Meta = one level up from the thing itself.",
  },

  // ── Concurrency ───────────────────────────────────────────────────────────────
  {
    id: "threading",
    title: "Threading",
    category: "concurrency",
    basic:
      "Python's threading module provides OS threads that share memory. Useful for I/O-bound concurrency. CPU-bound tasks see no speedup due to the GIL.",
    expected:
      "threading.Thread(target=fn, args=(...)).start() launches a thread. Thread safety for shared state requires explicit synchronization: threading.Lock(), RLock (reentrant lock), Semaphore, Event, Condition. ThreadPoolExecutor from concurrent.futures provides a higher-level API with submit() and as_completed().",
    deep:
      "Thread creation is expensive (~1ms overhead per thread). For I/O-bound workloads with high concurrency, asyncio is more efficient. The GIL is released during I/O syscalls, during C extension calls that drop it, and every 5ms (sys.getswitchinterval()). Daemon threads die with the main thread. threading.local() provides per-thread storage. Lock acquisition order bugs cause deadlocks — always acquire locks in a consistent order or use timeout parameters. Python 3.13 adds experimental free-threaded mode (--disable-gil build).",
    interviewAnswer:
      "Threading is ideal for I/O-bound work — file reads, network calls, database queries — because the GIL releases during I/O, so threads genuinely run concurrently during those waits. For CPU-bound work, threads give no benefit (and actually add overhead) due to the GIL. Use ThreadPoolExecutor for a clean pool-based API. For shared mutable state, use Lock or higher-level Queue. For high-concurrency I/O, asyncio is more efficient than threads.",
    trap:
      "Even in Python, shared mutable state between threads is dangerous. The GIL prevents data corruption for simple reference count updates, but compound operations (read-modify-write) are not atomic. Use threading.Lock() for any critical section.",
    memoryAnchor:
      "Threads = cooks sharing one kitchen (memory) but taking turns at one stove (GIL). Great when everyone is waiting for the oven (I/O), useless when everyone needs the stove (CPU).",
  },
  {
    id: "asyncio",
    title: "asyncio & Event Loop",
    category: "concurrency",
    basic:
      "A single-threaded concurrency model using an event loop that drives coroutines. Coroutines cooperatively yield control at await points.",
    expected:
      "asyncio.run(main()) starts the event loop. asyncio.create_task() schedules a coroutine to run concurrently on the same loop. asyncio.gather(*coros) runs multiple coroutines and collects results. Blocking calls (time.sleep, file reads) must be wrapped with loop.run_in_executor() to avoid blocking the event loop. aiohttp and asyncpg are async-native HTTP/DB clients.",
    deep:
      "The event loop is a selector-based I/O multiplexer (select/epoll/kqueue under the hood). When a coroutine awaits an I/O operation, it registers a callback with the selector and yields. The loop runs the next ready coroutine. When I/O completes, the selector fires the callback and the coroutine resumes. asyncio.create_task() wraps a coroutine in a Task object that the loop drives. Python 3.11 added asyncio.TaskGroup for structured concurrency — tasks in the group share a lifetime and cancel together on exception. asyncio.Semaphore controls concurrency limits. asyncio.Queue enables producer-consumer patterns.",
    interviewAnswer:
      "asyncio is a single-threaded cooperative concurrency model. The event loop runs coroutines that voluntarily yield at await points — there's no preemption. This makes it extremely efficient for I/O-bound workloads with many concurrent connections because there's no thread-switching overhead or locking. The limit: a blocking call in any coroutine stalls every other coroutine. Use run_in_executor() to offload blocking work to a thread pool. For CPU-bound work, asyncio doesn't help — use multiprocessing.",
    trap:
      "Forgetting await is silent: result = some_async_fn() assigns the coroutine object, not the result. Python 3.4+ warns about unawaited coroutines, but it's easy to miss. Always await coroutines.",
    memoryAnchor:
      "asyncio = an air traffic controller on a single runway. Planes (coroutines) take off and land cooperatively. One plane hogging the runway (blocking call) means every other plane circles forever.",
  },
  {
    id: "multiprocessing",
    title: "Multiprocessing",
    category: "concurrency",
    basic:
      "The multiprocessing module spawns separate OS processes, each with their own Python interpreter and memory space — bypassing the GIL entirely.",
    expected:
      "ProcessPoolExecutor (from concurrent.futures) is the high-level API. Processes communicate via Queue, Pipe, or shared memory (Value, Array). Data passed between processes must be picklable. Process startup is expensive (~50–100ms per process) — use pools, not one-off processes. multiprocessing.Pool.map() distributes work across a pool of workers.",
    deep:
      "The default start method is 'spawn' on Windows and macOS (fork-safe issues), 'fork' on Linux. Fork is fast but inherits parent memory including file descriptors and lock state — can cause deadlocks if locks are held at fork time. 'spawn' starts a fresh interpreter (safe, slower). 'forkserver' is a compromise. Shared memory (multiprocessing.shared_memory in Python 3.8+) avoids pickling overhead for large arrays. For ML/data workloads, use ProcessPoolExecutor with chunksize tuning. Interprocess communication via Queue uses pickle — large objects are expensive to transfer.",
    interviewAnswer:
      "Multiprocessing bypasses the GIL by running separate Python processes — each process has its own interpreter, memory space, and GIL. This gives true CPU parallelism across cores. Use ProcessPoolExecutor for the cleanest API. The costs: process startup is ~100ms, and passing data between processes requires serialization (pickling). For CPU-bound number crunching, the parallelism benefit far outweighs these costs. For data-heavy workloads, use shared_memory to avoid pickling overhead.",
    trap:
      "Lambdas and locally-defined functions can't be pickled and thus can't be passed to ProcessPoolExecutor on non-Linux platforms. Define workers at module level. Also, if you modify a shared object in a subprocess, changes are NOT reflected in the parent — processes have independent memory.",
    memoryAnchor:
      "Multiprocessing = opening separate restaurant branches. Each branch (process) has its own kitchen, staff, and inventory. No shared stove fights, but shipping ingredients between branches (pickling) is expensive.",
  },

  // ── Data Structures ───────────────────────────────────────────────────────────
  {
    id: "list-internals",
    title: "list Internals",
    category: "data-structures",
    basic:
      "Python lists are dynamic arrays — contiguous memory blocks that resize automatically.",
    expected:
      "O(1) amortized append (doubles capacity when full — amortized because occasional O(n) resizes are amortized over many appends). O(1) index access. O(n) insert/delete in the middle (shifts elements). O(n) search (in operator). list.sort() uses Timsort — O(n log n) worst case, O(n) best case (already sorted), stable. list comprehensions are faster than equivalent for loops due to CPython optimization.",
    deep:
      "CPython allocates extra capacity using the formula: new_capacity = (n * 9 / 8) + 6. Over-allocation reduces the frequency of resizes. Slicing creates a new list (shallow copy). list.copy() and list[:] both shallow copy. For memory efficiency with large numbers of uniform-type items, use array.array or numpy.ndarray. sys.getsizeof([]) shows base overhead (~56 bytes for an empty list). The list object has a pointer to an array of object pointers — not a contiguous array of values (unlike C arrays).",
    interviewAnswer:
      "Python lists are dynamic arrays — O(1) append amortized, O(1) index. Insertion/deletion in the middle is O(n) due to shifting. Search is O(n). For a deque (fast append/pop from both ends), use collections.deque — O(1) both ends. For sorted data with binary search, use the bisect module. Timsort makes list.sort() extremely fast on partially-sorted data, which is common in practice.",
    trap:
      "list.insert(0, x) is O(n) — it shifts every element. If you need a queue (FIFO), use collections.deque, not a list. list.pop(0) is also O(n).",
    memoryAnchor:
      "A Python list is like a row of people on a bench. Adding someone to the end is easy (scoot over). Inserting at the front? Everyone has to stand up and shift one seat right.",
  },
  {
    id: "dict-internals",
    title: "dict Internals",
    category: "data-structures",
    basic:
      "Python dicts are hash tables — O(1) average-case get/set/delete, O(n) worst case (hash collisions).",
    expected:
      "As of Python 3.7+, dicts preserve insertion order (guaranteed by the language spec, not just CPython). O(1) average for get, set, delete, and in. Keys must be hashable (immutable). dict.get(key, default) avoids KeyError. dict comprehensions: {k: v for k, v in items}. Merging: {**a, **b} (Python 3.5+) or a | b (Python 3.9+).",
    deep:
      "CPython's dict uses open addressing with a compact table redesign (Python 3.6+). The hash table stores indices into a separate array of (hash, key, value) entries — this keeps insertion order while maintaining O(1) lookup. Load factor is ~2/3 — when 2/3 full, the table resizes (doubles). Hash collisions are handled by probing. The dict's memory layout is split-table for class __dict__ (shared key table across instances with the same attributes) vs combined-table for general dicts. Unhashable types (list, dict, set) can't be keys — they define __eq__ but not __hash__.",
    interviewAnswer:
      "Python dicts are hash tables with O(1) average operations. They preserve insertion order since Python 3.7. Keys must be hashable — defining __eq__ without __hash__ makes a type unhashable. For counting, use Counter. For missing-key defaults, use defaultdict. For ordered operations like LRU cache, OrderedDict has move_to_end(). The dict resize happens at ~2/3 capacity — keep this in mind if you're pre-sizing a dict for performance.",
    trap:
      "Modifying a dict while iterating over it raises RuntimeError. Iterate over list(d.keys()) or list(d.items()) if you need to delete during iteration.",
    memoryAnchor:
      "A dict is a coat check room. You hand over your hashable ticket (key), and they instantly find your coat (value). Since Python 3.7, coats hang in the order they arrived.",
  },
  {
    id: "collections-module",
    title: "collections Module",
    category: "data-structures",
    basic:
      "The collections module provides specialized container types: deque, defaultdict, Counter, OrderedDict, namedtuple, ChainMap.",
    expected:
      "deque: O(1) append/pop from both ends (use instead of list for queues). defaultdict(int/list): auto-initializes missing keys — eliminates KeyError boilerplate. Counter(iterable): counts elements, most_common(n), arithmetic operations. namedtuple: immutable, memory-efficient, positional and named access. OrderedDict: dict with move_to_end() for LRU patterns (less needed since 3.7 dicts are ordered).",
    deep:
      "deque is implemented as a doubly-linked list of fixed-size blocks — O(1) at both ends, O(n) random access. deque(maxlen=N) creates a circular buffer that auto-discards the oldest item when full — useful for sliding windows. Counter extends dict — missing keys return 0, not KeyError. Counter subtraction clamps at 0 (use subtract() for signed). namedtuple creates a new class with __slots__ equivalent performance. dataclasses (Python 3.7+) is the modern alternative to namedtuple when you need mutability or defaults.",
    interviewAnswer:
      "collections is one of the most useful standard library modules in interviews. Counter for frequency counting in O(n). defaultdict to eliminate boilerplate. deque for O(1) queue operations. I use collections.deque(maxlen=N) for sliding window problems — it automatically evicts old elements. namedtuple for lightweight value objects. Knowing these lets you write cleaner, more efficient code than with just list and dict.",
    trap:
      "Counter['missing_key'] returns 0, not KeyError. This is intentional and useful, but be careful if you're checking for key presence — 'key' in counter is the correct check, not counter['key'].",
    memoryAnchor:
      "collections = the specialty aisle in the grocery store. deque is a double-ended conveyor belt, Counter is a tally clicker, defaultdict is a vending machine that auto-stocks when empty.",
  },

  // ── Protocols & Type System ───────────────────────────────────────────────────
  {
    id: "iterator-protocol",
    title: "Iterator Protocol",
    category: "protocols-types",
    basic:
      "An iterator implements __iter__() (returns self) and __next__() (returns next item or raises StopIteration).",
    expected:
      "An iterable implements __iter__() that returns an iterator (not necessarily self). Lists, dicts, sets are iterables — each call to iter() returns a fresh iterator. The for loop calls iter() then next() in a loop until StopIteration. Generators implement the iterator protocol automatically. iter(obj) can also take a callable and sentinel: iter(f, sentinel) calls f() until it returns sentinel.",
    deep:
      "Iterables and iterators are distinct: a list is iterable (can produce multiple independent iterators), while a generator is an iterator (single-pass, position is inside the object). This distinction matters for algorithms that need to restart iteration. Implementing a lazy sequence: __iter__ returns self, __next__ computes the next value on demand. The itertools module provides composable iterator tools: chain, islice, product, groupby — all lazy (no memory allocation). StopIteration bubbling inside a generator body is a subtle bug — in Python 3.7+, it's converted to RuntimeError.",
    interviewAnswer:
      "The iterator protocol is __iter__ + __next__. Iterables have __iter__ that returns an iterator — they can produce multiple independent iterations. Iterators are single-pass (hold position state). Generators implement the protocol automatically. This protocol powers for loops, list comprehensions, unpacking, and itertools. When building a custom collection, implement __iter__ to return an independent iterator so multiple independent loops can traverse it simultaneously.",
    trap:
      "A generator is both an iterable AND an iterator — iter(gen) returns gen itself. This means you can't restart a generator by calling iter() on it again — you get the same exhausted object.",
    memoryAnchor:
      "Iterator protocol = a TV remote with two buttons: __iter__ (turn on) and __next__ (next channel). StopIteration = you hit the last channel. A list is a DVR (rewind anytime); a generator is live TV (one pass only).",
  },
  {
    id: "context-manager",
    title: "Context Managers",
    category: "protocols-types",
    basic:
      "Objects that implement __enter__ and __exit__ to guarantee setup/teardown around a with block, even if an exception occurs.",
    expected:
      "with open('f') as f: calls f.__enter__() at entry and f.__exit__() at exit (even on exception). __exit__(exc_type, exc_val, exc_tb) receives exception info — return True suppresses the exception. contextlib.contextmanager turns a generator function into a context manager: yield = the with body runs here. contextlib.suppress(ExceptionType) suppresses specific exceptions.",
    deep:
      "contextlib.contextmanager is the most practical way to write context managers without a full class. The generator must have exactly one yield. Try/finally in the generator ensures cleanup: try: yield finally: cleanup(). contextlib.ExitStack manages a dynamic number of context managers (useful when you don't know at code-writing time how many resources to open). __exit__ returning a truthy value suppresses the exception — this is a feature, not a bug, used by contextlib.suppress. Async context managers use __aenter__/__aexit__ and async with.",
    interviewAnswer:
      "Context managers guarantee cleanup via __enter__/__exit__, even on exceptions. with statements call __exit__ regardless of how the block exits. I use contextlib.contextmanager to write them as generators — much cleaner than a full class. The pattern is: setup, yield, cleanup in a try/finally. Common uses: database transactions (commit or rollback), file locks, temporary directories, mocking in tests. __exit__ can suppress exceptions by returning True.",
    trap:
      "contextlib.contextmanager functions must have exactly one yield. If an exception occurs in the with body, it's re-raised at the yield point — handle it with try/except around the yield if you want to react to it.",
    memoryAnchor:
      "Context manager = a responsible babysitter. __enter__ = babysitter arrives, __exit__ = babysitter cleans up toys before leaving, NO MATTER WHAT happened (even if the kid threw a tantrum/exception).",
  },
  {
    id: "type-hints",
    title: "Type Hints & Protocols",
    category: "protocols-types",
    basic:
      "Type annotations (PEP 484) let you declare expected types for variables, arguments, and return values. They are not enforced at runtime by default.",
    expected:
      "def f(x: int) -> str: ... Type hints are metadata — Python doesn't check them at runtime. mypy, pyright, and pytype are static type checkers. from typing import List, Dict, Optional, Union, Callable, TypeVar, Generic. Optional[X] is Union[X, None]. Python 3.10+ uses X | None instead. TypedDict for typed dicts. Literal for specific values.",
    deep:
      "typing.Protocol (PEP 544, Python 3.8+) enables structural subtyping: a class satisfies a Protocol if it has the required methods, regardless of inheritance (duck typing + static checking). This is more Pythonic than ABC for defining interfaces. TypeVar and Generic enable generic classes. from __future__ import annotations defers annotation evaluation (PEP 563) so forward references work. Python 3.12 adds type keyword for type aliases. Runtime annotation access: typing.get_type_hints(func) evaluates string annotations.",
    interviewAnswer:
      "Type hints are documentation that tools can verify. I use them for public APIs and complex logic — they make intent explicit and catch bugs with mypy/pyright before runtime. Optional[X] means 'X or None'. For structural typing (duck typing + static checks), use Protocol instead of ABC — a class satisfies a Protocol by having the right methods, no inheritance needed. This aligns with Python's duck-typing philosophy while adding static safety.",
    trap:
      "Type hints are NOT enforced at runtime. def f(x: int): pass; f('hello') runs fine. Use a runtime validation library (pydantic, beartype) if you need runtime enforcement. Also, using isinstance() checks for type hints at runtime is almost always wrong — that's what the static checker is for.",
    memoryAnchor:
      "Type hints = sticky notes on your fridge saying 'milk goes here.' Python won't stop you from putting juice there — it's just a suggestion. mypy is the roommate who actually reads the notes and yells at you.",
  },
];

// ─── Interview Patterns ───────────────────────────────────────────────────────

export const interviewPatterns: InterviewPattern[] = [
  {
    question: "What is the GIL and how do you work around it?",
    answer:
      "The GIL ensures only one thread runs CPython bytecode at a time. For CPU-bound tasks, use multiprocessing — separate processes each have their own GIL. For I/O-bound tasks, threading or asyncio both work because the GIL releases during I/O. For numeric computation, NumPy releases the GIL internally, enabling parallel threads.",
    whyAsked:
      "Core Python internals knowledge. Tests whether the candidate understands the actual constraint vs. the urban legend ('Python can't do concurrency').",
    trap:
      "Saying 'the GIL prevents all concurrency'. It prevents CPU parallelism in threads. I/O concurrency, asyncio, and multiprocessing all work fine.",
  },
  {
    question: "What is the difference between __str__ and __repr__?",
    answer:
      "__repr__ targets developers — should be unambiguous, ideally eval()-able to recreate the object. __str__ targets end users — readable, concise display. If only __repr__ is defined, it serves as fallback for __str__. In a REPL, the return value calls __repr__.",
    whyAsked:
      "Tests knowledge of the data model and whether the candidate writes debuggable code with meaningful representations.",
    trap: "Saying they're basically the same. __repr__ is for debugging, __str__ is for display.",
  },
  {
    question: "How does Python handle mutable default arguments?",
    answer:
      "Default arguments are evaluated once at function definition time, not on each call. A mutable default like [] is shared across all calls. Fix: use None as the default and create the object inside the function: if items is None: items = [].",
    whyAsked: "Classic Python gotcha. Nearly every Python developer hits this bug — tests practical experience.",
    trap: "Writing def f(x=[]) thinking x resets to [] each call. It's the same list object every time.",
  },
  {
    question: "Explain Python's MRO and how super() works in multiple inheritance",
    answer:
      "Python uses C3 linearization to compute the MRO — the search order for methods and attributes. super() calls the next class in the MRO, not just the direct parent. This makes mixins work via cooperative inheritance: each class calls super() to chain to the next class in the resolved order, even though the mixin doesn't know what it's mixed with.",
    whyAsked: "Senior-level question. Tests understanding of Python's object system and mixin patterns.",
    trap:
      "Confusing super() with 'call my parent'. In multiple inheritance, super() follows the full MRO which may call a sibling class before a parent.",
  },
  {
    question: "What's the difference between @classmethod and @staticmethod?",
    answer:
      "@classmethod receives the class as its first argument (cls) — it's a method that knows which class it was called on. Used for alternative constructors (e.g., MyClass.from_json(...)). @staticmethod receives no implicit first argument — it's a regular function namespaced under the class. Neither receives the instance. @property is a descriptor that makes method access look like attribute access.",
    whyAsked: "Tests practical OOP knowledge. @classmethod for factories is a common pattern.",
    trap:
      "@classmethod called on a subclass receives the subclass as cls, not the parent. This is what makes it useful for inheritable factories.",
  },
  {
    question: "When would you use a generator vs. a list comprehension?",
    answer:
      "Generator expression when: the full sequence isn't needed at once, the dataset is large, or it will be consumed once. List comprehension when: you need random access, multiple passes, len(), or the result will be iterated more than once. Generator expressions have identical syntax but with () instead of []. The memory difference is O(1) vs O(n).",
    whyAsked: "Tests understanding of lazy evaluation and memory trade-offs.",
    trap:
      "Saying generators are always better. They can only be iterated once — if you need the data twice, a list or storing results is correct.",
  },
  {
    question: "How would you implement a thread-safe counter in Python?",
    answer:
      "Use threading.Lock() around the increment. Better: use queue.Queue for producer-consumer patterns. Best for a simple counter: threading.local() if per-thread, or an atomic increment via threading.Lock(). Note: i += 1 is NOT atomic — it's LOAD, ADD, STORE — three bytecode operations. The GIL doesn't protect this compound operation from a context switch between threads.",
    whyAsked: "Tests understanding of thread safety, atomic operations, and whether the candidate knows the GIL's limits.",
    trap:
      "Assuming i += 1 is safe because of the GIL. The GIL can release between the LOAD and STORE bytecode instructions, creating a race condition.",
  },
  {
    question: "Explain how Python's with statement and context managers work internally",
    answer:
      "The with statement calls __enter__() on entry and guarantees __exit__() is called on exit — even if an exception occurs. __exit__ receives exception info (type, value, traceback). Returning True from __exit__ suppresses the exception. contextlib.contextmanager turns a generator into a context manager — the yield point is where the with body runs.",
    whyAsked:
      "Tests understanding of resource management and exception handling patterns. Common in infrastructure/backend roles.",
    trap:
      "Thinking with replaces try/finally. They're equivalent, but with is cleaner for reusable resource management. with doesn't swallow exceptions unless __exit__ explicitly returns True.",
  },
];

// ─── Common Mistakes ──────────────────────────────────────────────────────────

export const commonMistakes: CommonMistake[] = [
  {
    wrong: "GIL means Python has no concurrency",
    correct:
      "GIL only blocks CPU parallelism in threads — I/O-bound concurrency (threading, asyncio) and multiprocessing work fine",
  },
  {
    wrong: "del x immediately frees memory",
    correct: "del decrements the reference count — memory is freed only when count reaches 0",
  },
  {
    wrong: "Mutable default arguments reset on each call",
    correct: "Defaults are evaluated once at definition time — mutable defaults are shared across all calls",
  },
  {
    wrong: "super() calls my direct parent class",
    correct:
      "super() calls the next class in the MRO — in multiple inheritance this may be a sibling, not the parent",
  },
  {
    wrong: "async def automatically makes code concurrent",
    correct:
      "Concurrency only happens at await points — blocking calls inside async functions block the entire event loop",
  },
  {
    wrong: "is and == are interchangeable for comparison",
    correct:
      "== checks value equality; is checks object identity (same memory address). Small ints and interned strings may fool you",
  },
  {
    wrong: "i += 1 is thread-safe because of the GIL",
    correct:
      "i += 1 is three bytecode operations (LOAD, ADD, STORE) — a thread switch can occur between them. Use threading.Lock()",
  },
  {
    wrong: "Defining __eq__ on a class keeps it hashable",
    correct:
      "Defining __eq__ sets __hash__ to None in Python 3 — the class becomes unhashable unless you explicitly define __hash__",
  },
  {
    wrong: "type(x) is the right way to check type in most cases",
    correct:
      "isinstance(x, SomeType) is correct — it handles subclasses. type(x) is SomeType is strict identity, ignoring inheritance",
  },
  {
    wrong: "list.append() inside a loop is slow — always pre-allocate",
    correct:
      "list.append() is O(1) amortized — pre-allocation is a C mindset. List comprehensions are faster than append loops due to CPython's bytecode optimization",
  },
];

// ─── Last Hour Summary ────────────────────────────────────────────────────────

export const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "GIL = one thread runs Python bytecode at a time. Use multiprocessing for CPU parallelism, asyncio/threading for I/O.",
    "Reference counting is the primary memory mechanism; cyclic GC handles reference cycles. del decrements refcount, doesn't free immediately.",
    "Decorators are syntactic sugar for higher-order functions: @deco on def f is f = deco(f). Always use @wraps to preserve metadata.",
    "MRO (C3 linearization) defines method lookup order in multiple inheritance. super() follows MRO, not just the direct parent.",
    "asyncio is single-threaded concurrency — one coroutine runs at a time, cooperatively yielding at await points. Not parallel.",
    "dict is ordered (insertion order, Python 3.7+), implemented as a hash table with open addressing — O(1) get/set.",
    "Generators are lazy iterators — they yield one value at a time, never materializing the full sequence in memory.",
  ],
  mustKnowConcepts: [
    { name: "GIL", oneLiner: "Mutex ensuring only one thread executes CPython bytecode at once — releases during I/O and C extensions." },
    { name: "Reference Counting", oneLiner: "Every object has a refcount; reaches 0 → immediately freed. Cyclic GC handles self-referential cycles." },
    { name: "Decorators", oneLiner: "Higher-order functions that wrap another function — @decorator is equivalent to func = decorator(func)." },
    { name: "MRO & super()", oneLiner: "C3 linearization defines class search order; super() follows MRO, enabling cooperative multiple inheritance." },
    { name: "asyncio", oneLiner: "Single-threaded event loop — one coroutine runs at a time, yields control at await, no GIL contention." },
    { name: "dict internals", oneLiner: "Hash table with open addressing — O(1) avg lookup; preserves insertion order since Python 3.7." },
  ],
  topTraps: [
    "Mutable default arguments (def f(x=[])) are evaluated ONCE at definition — all calls share the same list.",
    "GIL doesn't make compound operations atomic — i += 1 is LOAD + ADD + STORE, a race condition between threads.",
    "Generators are exhausted after one iteration — list(gen) a second time returns [].",
    "Closures capture variables by reference, not value — all lambdas in a loop see the loop variable's final value.",
    "asyncio is NOT parallel — two coroutines never run simultaneously on the same thread.",
  ],
};

// ─── Practice Questions ───────────────────────────────────────────────────────

export const practiceQuestions: PracticeQuestion[] = [
  {
    question: "What is the output?",
    code: `def add(x, items=[]):
    items.append(x)
    return items

print(add(1))
print(add(2))
print(add(3))`,
    answer:
      "[1]\n[1, 2]\n[1, 2, 3]\n\nThe default list is created once at definition time and shared across all calls.",
  },
  {
    question: "What is the output?",
    code: `x = [1, 2, 3]
y = x
y.append(4)
print(x)`,
    answer:
      "[1, 2, 3, 4]\n\ny = x copies the reference, not the list. Both point to the same object.",
  },
  {
    question: "What is the output?",
    code: `gen = (x * 2 for x in range(3))
print(list(gen))
print(list(gen))`,
    answer: "[0, 2, 4]\n[]\n\nGenerators are exhausted after one iteration.",
  },
  {
    question: "What is the output?",
    code: `funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])`,
    answer:
      "[2, 2, 2]\n\nAll lambdas capture the same variable i (by reference). After the loop, i is 2. Fix: lambda i=i: i",
  },
  {
    question: "What is the output?",
    code: `class A:
    x = 1

a = A()
b = A()
a.x = 10
print(b.x)
print(A.x)`,
    answer:
      "1\n1\n\na.x = 10 sets an instance attribute on a only. b.x and A.x still resolve to the class attribute (1).",
  },
  {
    question: "What is the output?",
    code: `a = 256
b = 256
print(a is b)

c = 257
d = 257
print(c is d)`,
    answer:
      "True\nFalse (usually)\n\nIntegers -5 to 256 are interned singletons. 257 may or may not be the same object — implementation detail.",
  },
  {
    question: "What is the output and why?",
    code: `def outer():
    x = 10
    def inner():
        x += 1
        return x
    return inner

f = outer()
print(f())`,
    answer:
      "UnboundLocalError: local variable 'x' referenced before assignment\n\nx += 1 implies x is local (assignment in function). But it's read before assignment. Fix: use nonlocal x in inner().",
  },
  {
    question: "What is the output?",
    code: `from functools import wraps

def my_decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet():
    """Says hello"""
    pass

print(greet.__name__)
print(greet.__doc__)`,
    answer:
      "wrapper\nNone\n\nWithout @wraps(func), the wrapper replaces the original's metadata. Fix: add @wraps(func) to wrapper.",
  },
];

export const topicData: TopicData = {
  topicTitle: "Python",
  topicMeta: "45–60 min · Mid to Senior level",
  lastUpdated: "2026-04-10",
  lastHourConceptIds: [
    "gil",
    "asyncio",
    "mro",
    "reference-counting",
    "decorators",
    "dict-internals",
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
