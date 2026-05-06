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
    "Java is a statically typed, compiled-to-bytecode language that runs on the Java Virtual Machine (JVM). Source code compiles to platform-neutral bytecode; the JVM interprets and JIT-compiles it at runtime. The language enforces OOP, provides automatic memory management via garbage collection, and ships with a rich standard library.",
  whyItExists:
    "Designed for 'write once, run anywhere' portability across hardware and OS boundaries. Its managed runtime, strong type system, and automatic GC eliminate entire classes of bugs (buffer overflows, dangling pointers) while trading raw performance for developer safety and productivity.",
  whenToUse: [
    "Enterprise backend services and microservices (Spring Boot)",
    "High-throughput, low-latency systems where JIT warm-up is acceptable",
    "Android application development",
    "Large codebases requiring strict type safety and refactorability",
    "Systems that benefit from rich JVM ecosystem tooling (profilers, APMs, JMX)",
  ],
  whereItFails: [
    "Startup-time-sensitive environments — JVM warm-up and class loading add latency (GraalVM native helps but has limits)",
    "Memory-constrained targets — JVM baseline overhead is significant",
    "Hard real-time systems — GC pause unpredictability is a blocker",
    "Systems programming / OS-level code where native memory control is required",
    "Rapid scripting or one-off tooling where interpreted languages are faster to iterate",
  ],
};

// ─── Category Metadata ────────────────────────────────────────────────────────

const categories: CategoryMeta[] = [
  {
    id: "jvm-internals",
    label: "JVM Internals",
    description:
      "ClassLoader hierarchy, bytecode execution, JIT compilation pipeline, runtime data areas, and JVM flags that tune behavior.",
  },
  {
    id: "core-java",
    label: "Core Java",
    description:
      "String pool and interning, equals/hashCode contract, object identity vs equality, immutability, static initializers, and Java fundamentals.",
  },
  {
    id: "oop",
    label: "OOP & Type System",
    description:
      "Abstract classes vs interfaces (default methods), covariant return types, final keyword semantics, sealed classes, and polymorphism mechanics.",
  },
  {
    id: "concurrency",
    label: "Concurrency",
    description:
      "volatile, synchronized, ReentrantLock, ExecutorService, CompletableFuture, ThreadLocal, happens-before ordering, and CAS/AtomicInteger.",
  },
  {
    id: "collections",
    label: "Collections Framework",
    description:
      "HashMap internals (treeify, resize, load factor), ConcurrentHashMap vs synchronizedMap, ArrayList vs LinkedList trade-offs, and fail-fast iterators.",
  },
  {
    id: "spring",
    label: "Spring Framework",
    description:
      "IoC container and DI, Bean lifecycle, @Transactional propagation and isolation levels, AOP proxy mechanics, and @Async caveats.",
  },
  {
    id: "memory-gc",
    label: "Memory & GC",
    description:
      "Heap regions (young/old/metaspace), GC algorithms (Serial, G1, ZGC, Shenandoah), OOM types, and reference types (WeakReference, SoftReference, PhantomReference).",
  },
  {
    id: "generics-types",
    label: "Generics & Types",
    description:
      "Type erasure, wildcards (? extends T vs ? super T), bounded type parameters, PECS rule, and reifiable vs non-reifiable types.",
  },
];

// ─── Mental Model Tree ────────────────────────────────────────────────────────

const mentalModelTree: TreeNode = {
  id: "root",
  label: "Java Platform",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "jvm-internals",
      label: "JVM Internals",
      nodeType: "category",
      importance: "critical",
      children: [
        {
          id: "classloader",
          label: "ClassLoader Hierarchy",
          nodeType: "concept",
          conceptId: "classloader",
          importance: "critical",
        },
        {
          id: "jit-compilation",
          label: "JIT Compilation",
          nodeType: "concept",
          conceptId: "jit-compilation",
          importance: "high",
        },
        {
          id: "bytecode",
          label: "Bytecode & Runtime Data Areas",
          nodeType: "concept",
          conceptId: "bytecode",
          importance: "medium",
        },
      ],
    },
    {
      id: "core-java",
      label: "Core Java",
      nodeType: "category",
      importance: "critical",
      children: [
        {
          id: "string-pool",
          label: "String Pool & Interning",
          nodeType: "concept",
          conceptId: "string-pool",
          importance: "critical",
        },
        {
          id: "equals-hashcode",
          label: "equals() / hashCode() Contract",
          nodeType: "concept",
          conceptId: "equals-hashcode",
          importance: "critical",
        },
        {
          id: "immutability",
          label: "Immutability",
          nodeType: "concept",
          conceptId: "immutability",
          importance: "high",
        },
        {
          id: "static-initializers",
          label: "Static Initializers",
          nodeType: "concept",
          conceptId: "static-initializers",
          importance: "medium",
        },
      ],
    },
    {
      id: "oop",
      label: "OOP & Type System",
      nodeType: "category",
      importance: "high",
      children: [
        {
          id: "abstract-vs-interface",
          label: "Abstract Class vs Interface",
          nodeType: "concept",
          conceptId: "abstract-vs-interface",
          importance: "critical",
        },
        {
          id: "sealed-classes",
          label: "Sealed Classes",
          nodeType: "concept",
          conceptId: "sealed-classes",
          importance: "high",
        },
        {
          id: "covariant-return",
          label: "Covariant Return Types",
          nodeType: "concept",
          conceptId: "covariant-return",
          importance: "medium",
        },
        {
          id: "final-keyword",
          label: "final Keyword",
          nodeType: "concept",
          conceptId: "final-keyword",
          importance: "high",
        },
      ],
    },
    {
      id: "concurrency",
      label: "Concurrency",
      nodeType: "category",
      importance: "critical",
      children: [
        {
          id: "volatile-keyword",
          label: "volatile & Happens-Before",
          nodeType: "concept",
          conceptId: "volatile-keyword",
          importance: "critical",
        },
        {
          id: "synchronized-reentrantlock",
          label: "synchronized vs ReentrantLock",
          nodeType: "concept",
          conceptId: "synchronized-reentrantlock",
          importance: "critical",
        },
        {
          id: "executor-service",
          label: "ExecutorService & Thread Pools",
          nodeType: "concept",
          conceptId: "executor-service",
          importance: "high",
        },
        {
          id: "completable-future",
          label: "CompletableFuture",
          nodeType: "concept",
          conceptId: "completable-future",
          importance: "high",
        },
        {
          id: "cas-atomic",
          label: "CAS & AtomicInteger",
          nodeType: "concept",
          conceptId: "cas-atomic",
          importance: "high",
        },
        {
          id: "threadlocal",
          label: "ThreadLocal",
          nodeType: "concept",
          conceptId: "threadlocal",
          importance: "medium",
        },
      ],
    },
    {
      id: "collections",
      label: "Collections Framework",
      nodeType: "category",
      importance: "critical",
      children: [
        {
          id: "hashmap-internals",
          label: "HashMap Internals",
          nodeType: "concept",
          conceptId: "hashmap-internals",
          importance: "critical",
        },
        {
          id: "concurrent-hashmap",
          label: "ConcurrentHashMap vs synchronizedMap",
          nodeType: "concept",
          conceptId: "concurrent-hashmap",
          importance: "critical",
        },
        {
          id: "arraylist-vs-linkedlist",
          label: "ArrayList vs LinkedList",
          nodeType: "concept",
          conceptId: "arraylist-vs-linkedlist",
          importance: "high",
        },
        {
          id: "fail-fast-iterators",
          label: "Fail-Fast Iterators",
          nodeType: "concept",
          conceptId: "fail-fast-iterators",
          importance: "medium",
        },
      ],
    },
    {
      id: "spring",
      label: "Spring Framework",
      nodeType: "category",
      importance: "high",
      children: [
        {
          id: "spring-ioc-di",
          label: "IoC & Dependency Injection",
          nodeType: "concept",
          conceptId: "spring-ioc-di",
          importance: "critical",
        },
        {
          id: "spring-transactional",
          label: "@Transactional Propagation & Isolation",
          nodeType: "concept",
          conceptId: "spring-transactional",
          importance: "critical",
        },
        {
          id: "spring-aop",
          label: "AOP Proxies",
          nodeType: "concept",
          conceptId: "spring-aop",
          importance: "high",
        },
        {
          id: "spring-async",
          label: "@Async Caveats",
          nodeType: "concept",
          conceptId: "spring-async",
          importance: "medium",
        },
      ],
    },
    {
      id: "memory-gc",
      label: "Memory & GC",
      nodeType: "category",
      importance: "high",
      children: [
        {
          id: "heap-regions",
          label: "Heap Regions",
          nodeType: "concept",
          conceptId: "heap-regions",
          importance: "critical",
        },
        {
          id: "gc-algorithms",
          label: "GC Algorithms (G1, ZGC)",
          nodeType: "concept",
          conceptId: "gc-algorithms",
          importance: "high",
        },
        {
          id: "reference-types",
          label: "Reference Types (Weak/Soft/Phantom)",
          nodeType: "concept",
          conceptId: "reference-types",
          importance: "medium",
        },
      ],
    },
    {
      id: "generics-types",
      label: "Generics & Types",
      nodeType: "category",
      importance: "high",
      children: [
        {
          id: "type-erasure",
          label: "Type Erasure",
          nodeType: "concept",
          conceptId: "type-erasure",
          importance: "critical",
        },
        {
          id: "wildcards",
          label: "Wildcards & PECS",
          nodeType: "concept",
          conceptId: "wildcards",
          importance: "high",
        },
      ],
    },
  ],
};

// ─── Last Hour Summary ────────────────────────────────────────────────────────

const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "HashMap uses array of linked lists/trees; entries treeify at bucket size 8 and untreeify at 6 — know the resize (capacity doubles, rehash) and why non-thread-safe reads during resize cause infinite loops in Java 7.",
    "volatile guarantees visibility (flushes to main memory) and prevents instruction reordering, but does NOT guarantee atomicity — i++ on a volatile int is still a race condition.",
    "equals() and hashCode() must be consistent: if two objects are equal, they MUST have the same hash code. Violating this breaks HashMap, HashSet, and any hash-based collection.",
    "Spring @Transactional uses AOP proxies — self-invocation (calling a @Transactional method from within the same bean) bypasses the proxy and the transaction entirely.",
    "Type erasure means generic type parameters are removed at compile time; at runtime List<String> and List<Integer> are both just List. You cannot do new T[] or instanceof List<String>.",
    "G1 GC divides heap into equal-sized regions and collects the most garbage-dense regions first; ZGC achieves sub-millisecond pauses by doing almost all work concurrently with the application.",
    "ThreadLocal values are stored per-thread and survive thread pool reuse — always call remove() in a finally block or you risk memory leaks and data contamination between requests.",
  ],
  mustKnowConcepts: [
    {
      name: "equals/hashCode Contract",
      oneLiner:
        "Equal objects must have equal hash codes; hash code must be stable for the object's lifetime in a collection.",
    },
    {
      name: "volatile vs synchronized",
      oneLiner:
        "volatile = visibility + ordering; synchronized = visibility + ordering + atomicity + mutual exclusion.",
    },
    {
      name: "HashMap Internals",
      oneLiner:
        "Array of buckets; linked list per bucket; treeifies at size 8 (TreeNode); resizes when size > capacity * loadFactor.",
    },
    {
      name: "@Transactional Self-Invocation",
      oneLiner:
        "Calling a @Transactional method from within the same Spring bean bypasses the AOP proxy — no transaction is started.",
    },
    {
      name: "Type Erasure",
      oneLiner:
        "Generic type parameters are erased at compile time; runtime has no knowledge of T — affects casting, instanceof, and array creation.",
    },
    {
      name: "G1 vs ZGC",
      oneLiner:
        "G1: region-based, predictable pause targets (~200ms); ZGC: concurrent compaction, sub-millisecond pauses, best for large heaps.",
    },
  ],
  topTraps: [
    "String == comparison: string literals are interned and share references, but new String(\"x\") creates a new object — always use .equals() for value comparison.",
    "ConcurrentModificationException: modifying a collection while iterating with a for-each loop throws this; use Iterator.remove() or CopyOnWriteArrayList instead.",
    "@Async on a method in the same class as the caller does nothing — Spring's proxy is not invoked for self-calls, so the method runs synchronously on the calling thread.",
    "double-checked locking without volatile is broken — without volatile, the JVM may reorder instructions so another thread sees a partially constructed object.",
    "Integer cache: Integer.valueOf(127) == Integer.valueOf(127) is true (cached), but Integer.valueOf(128) == Integer.valueOf(128) is false — always use .equals() for Integer comparison.",
  ],
};

// ─── Concepts ─────────────────────────────────────────────────────────────────

const concepts: Concept[] = [
  // ── JVM Internals ────────────────────────────────────────────────────────
  {
    id: "classloader",
    title: "ClassLoader Hierarchy",
    category: "jvm-internals",
    basic:
      "ClassLoaders load .class files into the JVM on demand. There are three built-in loaders: Bootstrap (loads rt.jar / core JDK classes), Platform/Extension, and Application (loads classpath classes). They form a parent-delegation hierarchy.",
    expected:
      "The parent-delegation model means a ClassLoader always asks its parent first before loading a class itself, preventing user code from shadowing core JDK classes. Classes are identified by (ClassLoader, fully-qualified name) pairs — the same class loaded by two different ClassLoaders are distinct types and will fail instanceof checks. Custom ClassLoaders are used in OSGi, application servers, and hot-reload frameworks (Spring DevTools).",
    deep:
      "Each ClassLoader maintains its own namespace. Class unloading only happens when a ClassLoader becomes unreachable — important for preventing PermGen/Metaspace leaks in app servers that deploy/undeploy apps repeatedly. The ClassLoader that loaded a class is its 'defining loader'; others that delegated to it are 'initiating loaders'. Security managers use ClassLoader identity to enforce sandbox boundaries. GraalVM's native-image performs closed-world analysis at build time, effectively collapsing this runtime hierarchy.",
    interviewAnswer:
      "The JVM uses a parent-delegation model: each ClassLoader delegates to its parent before trying to load a class itself, ensuring core JDK classes cannot be overridden by user code. Classes are uniquely identified by their name plus the ClassLoader that defined them — the same .class file loaded by two different ClassLoaders produces two incompatible types. This is why application servers isolate each deployed app with its own ClassLoader and why ClassLoader leaks cause Metaspace OOMs when classes can't be unloaded.",
    trap:
      "Two classes with the same fully-qualified name loaded by different ClassLoaders are NOT the same type — casting between them throws ClassCastException even though the bytecode is identical.",
    memoryAnchor:
      "ClassLoader = bouncer chain at a nightclub. Each bouncer asks the bouncer above them first: 'Do you know this person?' Only if no parent recognizes you does the local bouncer check the list.",
  },
  {
    id: "jit-compilation",
    title: "JIT Compilation",
    category: "jvm-internals",
    basic:
      "The JVM starts by interpreting bytecode. The JIT (Just-In-Time) compiler monitors hot methods (those called frequently) and compiles them to native machine code at runtime, dramatically improving throughput.",
    expected:
      "HotSpot uses two JIT compilers: C1 (client compiler) — fast compilation with light optimization, used for startup; C2 (server compiler) — aggressive optimization (inlining, escape analysis, loop unrolling) for peak throughput. Tiered compilation (default since Java 7u40) uses both: code starts in C1 and graduates to C2 based on invocation and loop-back counters. The JVM can deoptimize (bail out to interpreter) if an optimistic assumption (e.g., monomorphic call site) is violated.",
    deep:
      "Escape analysis allows the JIT to allocate short-lived objects on the stack instead of the heap (scalar replacement), reducing GC pressure. Inline caches and polymorphic inline caches (PICs) accelerate virtual dispatch. Profile-guided optimization means JIT output adapts to actual runtime behavior — which is why JVM performance benchmarks must account for warm-up time. GraalVM's JIT (available via -XX:+UnlockExperimentalVMOptions -XX:+UseJVMCICompiler) is written in Java itself and can produce better peak throughput for some workloads. AOT compilation (GraalVM native-image) trades peak throughput and dynamic features for instant startup.",
    interviewAnswer:
      "HotSpot uses tiered compilation: bytecode is first interpreted, then compiled by C1 for fast startup, and finally by C2 with aggressive optimizations (inlining, escape analysis) for peak throughput. The JIT can deoptimize and fall back to interpreted mode if optimistic assumptions — like a call site being monomorphic — are violated at runtime. This is why JVM applications exhibit a warm-up curve and why load testing must include ramp-up time.",
    trap:
      "Microbenchmarks that don't use JMH (Java Microbenchmark Harness) are often invalidated by JIT dead-code elimination or incomplete warm-up — the JVM may optimize away your benchmark entirely if results are unused.",
    memoryAnchor:
      "JIT = a chef who watches which dishes customers order most, then pre-preps those ingredients. Cold start is the first morning rush; warm-up is the chef learning the popular orders.",
  },
  {
    id: "bytecode",
    title: "Bytecode & Runtime Data Areas",
    category: "jvm-internals",
    basic:
      "Java source compiles to platform-neutral bytecode (.class files). The JVM runtime is partitioned into: heap (objects), method area/Metaspace (class metadata), JVM stack (one per thread, holds stack frames), PC register (per thread), and native method stack.",
    expected:
      "Each stack frame contains local variable array, operand stack, and reference to the runtime constant pool. The method area (Metaspace since Java 8, moved out of heap) stores class structures, method bytecode, and static variables. Metaspace grows dynamically by default (bounded by -XX:MaxMetaspaceSize). The heap is divided into young (Eden + two Survivor spaces) and old generation. Bytecode instructions include: aload/astore (reference), iload/istore (int), invoke variants (invokevirtual, invokestatic, invokeinterface, invokespecial, invokedynamic).",
    deep:
      "invokedynamic (introduced in Java 7, used by lambdas and MethodHandles) defers method dispatch linkage to a bootstrap method at first call, enabling efficient implementation of lambdas, Groovy closures, and dynamic languages on the JVM. The JVM spec defines the verifier which checks bytecode for type safety before execution. StackMapTable attributes (Java 6+) allow the verifier to do a single-pass type inference instead of fixed-point iteration. Tools like ASM and ByteBuddy manipulate bytecode at this level — heavily used by frameworks like Hibernate, Spring, and Mockito for runtime code generation.",
    interviewAnswer:
      "Java compiles to stack-based bytecode that is platform-neutral. The JVM runtime is divided into heap (objects, GC-managed), Metaspace (class metadata, outside heap since Java 8), and per-thread areas: JVM stack (stack frames with local vars and operand stack) and PC register. Key bytecode instruction families are invokevirtual for instance methods, invokestatic for static methods, invokeinterface for interface calls, and invokedynamic for lambdas and runtime-linked dispatch.",
    trap:
      "PermGen was replaced by Metaspace in Java 8 — PermGen OOM errors no longer exist, but Metaspace can still OOM if class loading is unbounded (e.g., CGLib proxy generation loops) unless -XX:MaxMetaspaceSize is set.",
    memoryAnchor:
      "Bytecode = universal recipe card. The JVM kitchen (any OS) can cook it. Stack = each chef's personal cutting board. Heap = the shared pantry. Metaspace = the recipe binder on the shelf.",
  },

  // ── Core Java ────────────────────────────────────────────────────────────
  {
    id: "string-pool",
    title: "String Pool & Interning",
    category: "core-java",
    basic:
      "String literals in Java are stored in a shared pool (String constant pool) in the heap. Two literals with the same content share the same object. String.intern() can add a heap-allocated String to the pool and return the canonical reference.",
    expected:
      "The string pool is stored in the heap (moved from PermGen in Java 7). String literals are automatically interned at class load time. new String(\"hello\") always creates a new heap object even if the pool contains \"hello\". Interning is useful for memory deduplication when storing large numbers of repeated strings, but excessive interning fills the pool and increases GC root scanning time. String is immutable — its hash is lazily cached on first hashCode() call.",
    deep:
      "The string pool is implemented as a hash table in native code (StringTable). Its default capacity is 65536 buckets in Java 11+ (configurable via -XX:StringTableSize). Java 9 introduced compact strings — strings are stored as byte[] (Latin-1 if all chars fit, UTF-16 otherwise) rather than char[], halving memory for ASCII-heavy workloads. String.intern() is a native method with non-trivial cost — benchmarks show it can be a bottleneck under high concurrency due to StringTable locking. G1 GC introduced string deduplication (-XX:+UseStringDeduplication) which deduplicates char arrays in the background without interning.",
    interviewAnswer:
      "String literals are automatically interned into the JVM's string pool (heap-resident since Java 7). Two literals with the same content are == equal because they reference the same pooled object, but new String(\"x\") allocates a new heap object that is != the pooled one. Always use .equals() for string value comparison. String.intern() manually adds a string to the pool and returns the canonical reference — useful for deduplication, but has throughput cost under contention.",
    trap:
      "\"abc\" == \"abc\" is true (both are pooled literals), but new String(\"abc\") == \"abc\" is false — this trips up developers who compare strings with == and only test with literal values in unit tests.",
    memoryAnchor:
      "String Pool = a hotel lost-and-found box. Identical umbrellas share one slot. But 'new String()' is buying a brand-new umbrella even though an identical one is already in the box.",
  },
  {
    id: "equals-hashcode",
    title: "equals() and hashCode() Contract",
    category: "core-java",
    basic:
      "Object.equals() tests logical equality; == tests reference identity. The contract: if a.equals(b) then a.hashCode() == b.hashCode(). The default Object.equals() is reference identity and hashCode() is derived from the object's identity.",
    expected:
      "Full contract: reflexive (a.equals(a)), symmetric (a.equals(b) ↔ b.equals(a)), transitive, consistent (same result unless fields change), and a.equals(null) == false. If you override equals(), you MUST override hashCode(). Failing to do so causes objects to be lost in HashMaps and HashSets — they can be put in but not retrieved because lookup uses hashCode() to find the bucket. Use Objects.equals() and Objects.hash() to handle nulls safely.",
    deep:
      "A common subtle bug: using a mutable field in hashCode() then modifying that field while the object is in a HashSet — the object ends up in the wrong bucket and can never be found or removed (memory leak). Effective Java (Bloch) recommends a prime-number-based polynomial hash to distribute values. Records in Java 16+ auto-generate equals/hashCode based on all components. Lombok's @EqualsAndHashCode has an of/exclude attribute to control which fields participate. In JPA/Hibernate, entities should use surrogate keys (database IDs) in equals/hashCode to avoid issues with transient entities that have no ID yet.",
    interviewAnswer:
      "The contract is: if a.equals(b) is true, then a.hashCode() must equal b.hashCode(). The inverse is not required — hash collisions are legal. Breaking this contract causes silent data loss in hash-based collections: put() uses hashCode() to find the bucket, then equals() to find the key. If hashCode() is inconsistent with equals(), gets and removes miss the stored entry. You must override both methods together — never just one.",
    trap:
      "Overriding equals() without overriding hashCode() (or vice versa) compiles fine and produces no runtime error until you use the class in a HashMap or HashSet, at which point objects appear to vanish.",
    memoryAnchor:
      "equals/hashCode = filing cabinet system. hashCode picks the drawer (bucket), equals checks the exact folder inside. If two identical files land in different drawers, you'll never find the duplicate.",
  },
  {
    id: "immutability",
    title: "Immutability",
    category: "core-java",
    basic:
      "An immutable object's state cannot change after construction. String, Integer, and other boxed types are immutable. Immutable objects are inherently thread-safe and can be freely shared.",
    expected:
      "To make a class immutable: declare it final (prevents subclassing), make all fields private final, initialize all fields in the constructor, do not provide setters, and perform defensive copies of mutable fields (arrays, collections) in the constructor and in getters. java.time types (LocalDate, etc.) are immutable. Collections.unmodifiableList() returns an unmodifiable view — the underlying list can still be mutated. List.of() (Java 9+) returns a truly immutable list.",
    deep:
      "Immutability enables safe publication — because an immutable object's state is fixed at construction and fields are final, the Java Memory Model guarantees that any thread that sees the reference also sees the fully initialized state (final field freeze guarantee in JMM §17.5). This is the reason immutable objects don't need synchronized access. String's cached hash (a non-final field) is a carefully reasoned exception — the lazy initialization is safe because the result is deterministic. Value types (Project Valhalla) push immutability into the type system at a deeper level, enabling stack allocation of value objects.",
    interviewAnswer:
      "Immutable classes must be final, have all private final fields, set all state in the constructor, and defensively copy any mutable inputs and outputs. The JMM's final field freeze guarantee means a thread that reads an object reference through any publication mechanism will see the fully initialized final fields without synchronization. This is why immutable objects are the safest currency for concurrent code — no locks, no races.",
    trap:
      "Making a field final does not make a mutable object it points to immutable — final List<String> means the reference can't change, but the list contents can be freely modified.",
    memoryAnchor:
      "Immutable object = a message carved in stone. You can pass the stone tablet around to anyone safely -- nobody can secretly change the words. Mutable = a whiteboard anyone can erase.",
  },
  {
    id: "static-initializers",
    title: "Static Initializers",
    category: "core-java",
    basic:
      "Static initializer blocks (static { ... }) run once when a class is loaded by the JVM, before any instances are created or static methods called. They initialize static fields that require complex logic.",
    expected:
      "Class initialization is triggered by: creating an instance, calling a static method, reading/writing a static field, or reflection. The JVM guarantees class initialization is thread-safe — only one thread performs it; others block. Static initializers run in textual order. If a static initializer throws an unchecked exception, the class enters a failed initialization state and subsequent attempts to use it throw ExceptionInInitializerError wrapping the original.",
    deep:
      "The initialization-on-demand holder idiom exploits JVM class initialization guarantees to implement lazy, thread-safe singletons without synchronization: a nested private static class holds the singleton instance in a static final field; the outer class triggers the inner class's initialization only when getInstance() is first called. Circular class initialization (A's static initializer triggers loading of B which triggers loading of A) can cause partially initialized classes to be visible, leading to NullPointerExceptions on static fields that haven't been set yet.",
    interviewAnswer:
      "Static initializer blocks run once at class initialization time and are guaranteed by the JVM to be executed by exactly one thread (others block), making them thread-safe. A static initializer that throws will put the class in a permanently failed state — ExceptionInInitializerError is thrown on first access and NoClassDefFoundError on all subsequent accesses. The initialization-on-demand holder pattern exploits this guarantee for zero-overhead lazy singleton initialization.",
    trap:
      "If a static initializer throws a RuntimeException, the class can never be initialized again in that JVM run — subsequent attempts throw NoClassDefFoundError, not the original exception, making debugging confusing.",
    memoryAnchor:
      "Static initializer = the 'grand opening' ribbon-cutting for a store. Happens exactly once, before any customer enters. If the ribbon-cutting catches fire, the store is permanently condemned.",
  },

  // ── OOP ──────────────────────────────────────────────────────────────────
  {
    id: "abstract-vs-interface",
    title: "Abstract Class vs Interface",
    category: "oop",
    basic:
      "An abstract class can have state, constructors, and both abstract and concrete methods. An interface defines a contract (abstract methods) and since Java 8, can have default and static methods. A class can implement multiple interfaces but extend only one class.",
    expected:
      "Post-Java 8/9 interfaces can have: default methods (concrete, inherited by implementors), static methods (not inherited), and private methods (Java 9, for sharing code between defaults). Use an abstract class when you need to share state or provide a common constructor; use an interface when you're defining a capability/role that multiple unrelated classes might fulfill. Functional interfaces (one abstract method) power lambda expressions. Interface default methods enable backward-compatible API evolution without breaking existing implementors.",
    deep:
      "Diamond problem with default methods: if two interfaces provide a default method with the same signature and a class implements both, the compiler forces explicit override resolution via InterfaceA.super.method(). Abstract classes have access to protected constructors and can enforce initialization contracts (Template Method pattern). Interfaces cannot have instance state (only public static final constants) — attempting to model state via interface defaults is an anti-pattern. Java 17+ sealed interfaces (combined with sealed classes) enable exhaustive pattern matching in switch expressions.",
    interviewAnswer:
      "Abstract classes allow shared state, constructors, and access modifiers on members — use them for 'is-a' relationships with shared implementation. Interfaces define contracts and, since Java 8, can provide default implementations for backward compatibility. The key practical difference: a class can implement many interfaces but extend only one abstract class. For new API design, prefer interfaces (gives implementors flexibility); use abstract classes when you need to enforce initialization or share significant implementation.",
    trap:
      "Adding a default method to a widely-used interface is both source- and binary-compatible, but can be behaviorally incompatible: if a class already has a method with the same signature, the class method wins by JLS resolution rules, so the default method is silently ignored — the semantics may diverge from what the interface author intended.",
    memoryAnchor:
      "Abstract class = a partially built house (has walls, plumbing, rooms). Interface = a building code (rules to follow, no bricks). You can follow many codes but only inherit one house.",
  },
  {
    id: "sealed-classes",
    title: "Sealed Classes & Pattern Matching",
    category: "oop",
    basic:
      "Sealed classes (Java 17, stable) restrict which classes can extend or implement them, declared with the permits clause. Combined with pattern matching in switch (Java 21, stable), they enable exhaustive type switching.",
    expected:
      "Permitted subclasses must be in the same compilation unit (or same package with --enable-preview in some versions) and must be final, sealed, or non-sealed. Sealed classes enable the compiler to verify exhaustiveness in switch expressions — if all permitted subtypes are handled, no default branch is needed. Records are implicitly final and work naturally as sealed class leaves. This models algebraic data types (sum types) from functional languages.",
    deep:
      "Sealed types with pattern matching in switch (JEP 441, Java 21) allow: case Shape s when s.area() > 100 — combining type checks with guard clauses. This replaces the visitor pattern in many codecs and AST transformation scenarios without the verbosity. Sealed hierarchies are also leveraged by the compiler for null analysis and by serialization frameworks (Jackson supports sealed classes via PolymorphicTypeValidator). The combination of sealed classes + records + pattern matching + switch expressions brings Java ADT expressiveness close to Kotlin's sealed class + when.",
    interviewAnswer:
      "Sealed classes let you declare all permitted subtypes at compile time, enabling the compiler to enforce exhaustive pattern matching. This is the Java way to express algebraic sum types — useful for modeling things like Result<T> (Ok | Err), event hierarchies, or AST nodes where you own all variants. In Java 21+, switch expressions over sealed types with pattern matching eliminate boilerplate instanceof chains and make illegal states unrepresentable.",
    trap:
      "Sealed classes only restrict direct subclassing — a non-sealed permitted subclass can itself be freely extended, breaking the exhaustiveness guarantee.",
    memoryAnchor:
      "Sealed class = a VIP guest list at a party. Only the names on the 'permits' list can get in. The compiler is the bouncer who checks every switch-case against the guest list -- no default needed if everyone's accounted for.",
  },
  {
    id: "covariant-return",
    title: "Covariant Return Types",
    category: "oop",
    basic:
      "A subclass can override a method and declare a more specific (narrower) return type than the parent method. This is covariant return type and does not break the Liskov Substitution Principle.",
    expected:
      "Covariant return types enable fluent builder patterns and clone() overrides that return the concrete type instead of Object. The overriding method must return a subtype of the overridden method's return type. Under the hood the compiler generates a synthetic bridge method with the original return type that delegates to the specific override, preserving binary compatibility with older call sites that expect the wider type.",
    deep:
      "Bridge methods are also generated for generic type erasure — when a class implements Comparable<MyClass>, the compiler generates a bridge compareTo(Object) that delegates to compareTo(MyClass). In bytecode there may therefore be two methods with the same name and different signatures (distinguished by return type, which is valid in bytecode but not in source). This is one of the few places where JVM bytecode is more expressive than Java source code.",
    interviewAnswer:
      "Covariant return types let an overriding method return a subtype of the parent's declared return type. The compiler inserts synthetic bridge methods so older callers expecting the wider type still work. This is most visible in clone() overrides (returning the concrete class instead of Object) and builder patterns. It does not violate LSP because any code that expects the supertype still gets a valid instance of it.",
    trap:
      "Covariant return types are a source-level feature only — if you load bytecode compiled with an old JDK, bridge methods ensure binary compatibility, but mixing source and bytecode with mismatched expectations can cause verify errors.",
    memoryAnchor:
      "Covariant return = a restaurant menu that says 'returns Dessert,' but the subclass kitchen always serves Chocolate Cake specifically. You asked for dessert, you got something better -- still dessert, just more specific.",
  },
  {
    id: "final-keyword",
    title: "final Keyword Semantics",
    category: "oop",
    basic:
      "final on a variable: can be assigned only once. final on a method: cannot be overridden. final on a class: cannot be subclassed. String, Integer, and other core types are final classes.",
    expected:
      "final fields get special JMM treatment: after a constructor completes, a final field's value is guaranteed visible to all threads without synchronization (final field freeze). This is what makes immutable objects safely publishable. final local variables are required for use in lambdas and anonymous inner classes (effectively final in Java 8+). Declaring a method final lets the JIT inline it aggressively because there can be no polymorphic dispatch.",
    deep:
      "The JMM final field freeze guarantee (JLS §17.5) specifies a 'freeze' action at the end of the constructor — all writes to final fields happen-before any read of those fields through any reference. This is stronger than the normal happens-before — it applies even if the reference escapes via a data race (unsafe publication), though fully safe publication still requires synchronization. Marking frequently called methods final can improve JIT performance because the JIT knows monomorphic dispatch is safe without needing to speculate and later deoptimize.",
    interviewAnswer:
      "final has three distinct uses: a final variable can be assigned exactly once (enabling effectively-final in lambdas); a final method cannot be overridden, enabling JIT inlining without speculative deoptimization; a final class cannot be subclassed, which (combined with private final fields) is the foundation of immutability. The JMM's final field freeze guarantee is critical for safe concurrent publication of immutable objects — no synchronization required if all shared fields are final.",
    trap:
      "final on a reference type variable means the reference cannot be reassigned, not that the referenced object is immutable — final List<String> list still allows list.add(\"x\").",
    memoryAnchor:
      "final = superglue. On a variable: the label is glued to one jar (can't point elsewhere, but jar contents can change). On a method: glued shut, no override. On a class: glued the family tree -- no children allowed.",
  },

  // ── Concurrency ───────────────────────────────────────────────────────────
  {
    id: "volatile-keyword",
    title: "volatile & Happens-Before",
    category: "concurrency",
    basic:
      "volatile ensures that reads and writes to a variable are always done directly to main memory, not to thread-local CPU caches. It prevents visibility bugs where one thread's writes are not seen by another.",
    expected:
      "volatile establishes a happens-before relationship: a write to a volatile variable happens-before every subsequent read of that same variable. This also prevents certain instruction reorderings by the JIT and CPU. volatile does NOT provide atomicity for compound operations — volatile long/double reads and writes are guaranteed atomic by the JMM (Java 5+) on all JVMs regardless of word size, but i++ on volatile int is still a three-step read-modify-write that can race. Use cases: flags (boolean running = true), double-checked locking (the instance field must be volatile), publishing immutable objects.",
    deep:
      "The JMM (Java Memory Model, JSR-133, Java 5+) defines happens-before as a partial order on memory operations. volatile writes/reads are a subset of synchronization actions that impose total order among themselves and create happens-before edges. The model is defined in terms of actions and orders, not in terms of caches — it specifies what values a read is allowed to see, not the mechanism. CPU memory barriers (mfence on x86, dmb on ARM) are the hardware implementation. StampedLock's optimistic reads avoid volatile reads for the common case — readers check a stamp and retry if a write occurred.",
    interviewAnswer:
      "volatile guarantees visibility (writes are flushed to main memory, reads bypass CPU cache) and prevents specific instruction reorderings, establishing a happens-before relationship between a write and subsequent reads of that variable. It does NOT provide atomicity — use AtomicInteger or synchronized for compound read-modify-write operations. The canonical use case is a boolean stop flag: one thread sets volatile boolean stopped = true; the worker thread's while (!stopped) loop will eventually see it without synchronization.",
    trap:
      "double-checked locking without volatile is broken — without it, the JVM can reorder the constructor call and the reference assignment, allowing another thread to see a non-null but partially constructed object.",
    memoryAnchor:
      "volatile = a town crier who shouts every update to the whole village. Everyone hears the news (visibility), but two criers can still shout at the same time and garble the message (no atomicity).",
  },
  {
    id: "synchronized-reentrantlock",
    title: "synchronized vs ReentrantLock",
    category: "concurrency",
    basic:
      "synchronized is the built-in Java locking mechanism — it can guard a method or a code block and is automatically released when the block exits (including exceptions). ReentrantLock is an explicit lock from java.util.concurrent.locks that must be manually unlocked.",
    expected:
      "Both provide mutual exclusion and visibility guarantees. ReentrantLock extras: tryLock() (non-blocking attempt), tryLock(timeout) (timed attempt), lockInterruptibly() (can be interrupted while waiting), multiple Condition objects (finer-grained wait/notify than the single wait set of Object monitors), and fairness policy (FIFO ordering, at a throughput cost). synchronized is easier to use correctly (automatic release); ReentrantLock is more flexible but requires try/finally to guarantee unlock. Reentrancy: a thread holding the lock can re-acquire it without deadlocking — both support this.",
    deep:
      "HotSpot JVM implements synchronized with biased locking (disabled by default Java 15, removed Java 18), lightweight locking (CAS-based thin lock), and heavyweight (inflated) monitor. Lock inflation follows contention. JEP 374 disabled biased locking by default in Java 15 because modern concurrent workloads showed revocation overhead outweighing the benefit. Virtual threads (Project Loom, Java 21) cannot park on synchronized monitors without pinning the carrier thread (limits scalability) — ReentrantLock with LockSupport is preferred for Loom-friendly code. StampedLock adds optimistic reads for read-heavy workloads at the cost of not being reentrant.",
    interviewAnswer:
      "synchronized is simpler and automatically releases on block exit (including exceptions), but offers only one wait set and no timeout. ReentrantLock gives you tryLock(), timed and interruptible acquisition, fairness options, and multiple Condition queues — necessary for producer-consumer with separate 'not full' and 'not empty' conditions. Always unlock ReentrantLock in a finally block. With Java 21 virtual threads, prefer ReentrantLock over synchronized to avoid pinning the carrier thread.",
    trap:
      "Forgetting to unlock a ReentrantLock in an exception path (by not using try/finally) leaves the lock permanently held and deadlocks all threads waiting for it — synchronized never has this problem.",
    memoryAnchor:
      "synchronized = automatic bathroom door lock (unlocks when you leave, even if you faint). ReentrantLock = a padlock you carry -- more features (timed, interruptible), but forget to unlock and everyone waits forever.",
  },
  {
    id: "executor-service",
    title: "ExecutorService & Thread Pools",
    category: "concurrency",
    basic:
      "ExecutorService manages a pool of threads that execute submitted tasks (Runnable or Callable). Executors factory methods create common pool types: fixed, cached, single, scheduled.",
    expected:
      "ThreadPoolExecutor parameters: corePoolSize (threads kept alive), maximumPoolSize (max threads), keepAliveTime, BlockingQueue (task queue). Fixed pool: queue is unbounded LinkedBlockingQueue — tasks queue up indefinitely under load. Cached pool: queue is SynchronousQueue (no buffering), creates threads up to Integer.MAX_VALUE — can OOM under burst load. Always prefer explicit ThreadPoolExecutor construction over Executors factories in production. Shutdown: shutdown() stops accepting new tasks and lets queued tasks finish; shutdownNow() interrupts running tasks.",
    deep:
      "Thread pool sizing is workload-dependent: CPU-bound tasks benefit from N+1 threads (N = available cores); I/O-bound tasks can use many more. The ForkJoinPool (used by parallelStream() and CompletableFuture.supplyAsync()) uses work-stealing — idle threads steal tasks from busy threads' deques, improving utilization for recursive divide-and-conquer. With Java 21 virtual threads, the carrier thread pool is a ForkJoinPool of platform threads; one virtual thread per task eliminates the need for manual pool sizing for I/O-bound workloads. Structured concurrency (JEP 480, Java 21 preview) brings task-scoped lifetime management to prevent thread and resource leaks.",
    interviewAnswer:
      "ExecutorService decouples task submission from thread management. For production, construct ThreadPoolExecutor explicitly with a bounded queue (e.g., ArrayBlockingQueue) and a RejectedExecutionHandler to prevent unbounded task accumulation. Fixed-size pools with LinkedBlockingQueue are the most common source of silent OOM bugs — the queue grows without bound when consumers are slower than producers. Always call shutdown() in a finally block or via try-with-resources (Java 19+ AutoCloseable) to prevent thread leaks.",
    trap:
      "Executors.newFixedThreadPool(n) uses an unbounded queue — if producers outpace consumers, the queue grows without bound and causes OutOfMemoryError, not backpressure.",
    memoryAnchor:
      "Thread pool = a restaurant kitchen with a fixed number of chefs. Tasks are orders on the ticket rail. An unbounded queue is a ticket rail that stretches to infinity -- eventually the kitchen drowns in paper.",
  },
  {
    id: "completable-future",
    title: "CompletableFuture",
    category: "concurrency",
    basic:
      "CompletableFuture represents an async computation. It can be manually completed (complete(), completeExceptionally()) or created from async operations (supplyAsync(), runAsync()). It supports chaining via thenApply(), thenCompose(), thenCombine().",
    expected:
      "thenApply() transforms the result (like map). thenCompose() chains another CompletableFuture (like flatMap — avoids nested CompletableFuture<CompletableFuture<T>>). thenCombine() merges two independent futures. exceptionally() handles errors. allOf() / anyOf() combine multiple futures. Without an explicit executor, callbacks run on the ForkJoinPool.commonPool() — avoid blocking operations in callbacks. thenApplyAsync() dispatches the callback to an executor thread, preventing callback chains from blocking the upstream thread.",
    deep:
      "CompletableFuture's error model: each stage can fail independently; exceptionally() recovers; handle() handles both success and failure. join() is like get() but throws CompletionException (unchecked) instead of ExecutionException. Cancellation propagates only forward (downstream) not backward (upstream) — cancelling a derived future does not cancel the original computation. For structured async code in Java 21+, virtual threads combined with blocking code are often simpler and more readable than deeply nested CompletableFuture chains. Project Loom's structured concurrency (StructuredTaskScope) provides deterministic cancellation semantics.",
    interviewAnswer:
      "CompletableFuture enables non-blocking async pipelines: thenApply() transforms results, thenCompose() chains async steps (avoiding nested futures), exceptionally() or handle() manages errors. The critical operational gotcha: without specifying an executor, callbacks run on the ForkJoinPool common pool — blocking inside a callback starves the pool for other tasks. Always pass an explicit executor to *Async methods in production code and handle exceptions explicitly, as unhandled CompletableFuture exceptions are silently swallowed.",
    trap:
      "Unhandled exceptions in CompletableFuture stages are silently swallowed unless you call get()/join() or attach an exceptionally()/whenComplete() handler — the exception disappears and the future stays permanently incomplete.",
    memoryAnchor:
      "CompletableFuture = a promise note chain. thenApply = 'when pizza arrives, add cheese.' thenCompose = 'when pizza arrives, order dessert too.' Errors vanish into a black hole unless you attach an exceptionally() safety net.",
  },
  {
    id: "cas-atomic",
    title: "CAS & AtomicInteger",
    category: "concurrency",
    basic:
      "Compare-And-Swap (CAS) is a CPU-level atomic instruction that updates a memory location only if it currently holds an expected value. Java's Atomic* classes (AtomicInteger, AtomicReference, etc.) expose CAS via compareAndSet().",
    expected:
      "AtomicInteger.incrementAndGet() uses CAS in a spin loop — read current value, compute new value, CAS; retry if CAS fails (another thread changed the value). This is lock-free but not wait-free (a thread can spin indefinitely under extreme contention). LongAdder (Java 8+) outperforms AtomicLong under high contention by striping the counter across cells and reducing CAS conflicts — use for metrics/counters. AtomicReference enables lock-free data structures. VarHandle (Java 9+) generalizes Unsafe-based atomics with type-safe access to fields and array elements.",
    deep:
      "ABA problem: CAS succeeds even if the value was changed from A to B and back to A between the read and the CAS — the swap cannot detect this. AtomicStampedReference and AtomicMarkableReference add a stamp/mark to detect ABA. Non-blocking algorithms (Michael-Scott queue, CLH queue for locks) use CAS chains. Project Valhalla's value types will require rethinking CAS semantics since value objects have no identity. LongAdder's @Contended annotation on Cell padding fields prevents false sharing — each cell occupies its own cache line.",
    interviewAnswer:
      "CAS is the foundation of all lock-free concurrency in Java — it atomically tests-and-sets a memory location using a single CPU instruction (CMPXCHG on x86). AtomicInteger wraps CAS in a retry loop for common operations. Under low contention it outperforms synchronized; under high contention, LongAdder is superior because it stripes state across cells. The ABA problem — where a value changes A→B→A and CAS falsely succeeds — requires AtomicStampedReference when object identity matters (e.g., lock-free stack pop).",
    trap:
      "CAS spin-loops under high contention cause CPU waste and can be slower than a mutex — use LongAdder for high-frequency counter increments, not AtomicLong.incrementAndGet().",
    memoryAnchor:
      "CAS = picking up the last donut: 'I see a glazed donut, I'll grab it -- but only if it's still glazed when my hand arrives.' If someone swapped it, you pull back and try again. ABA = someone replaced it with an identical donut.",
  },
  {
    id: "threadlocal",
    title: "ThreadLocal",
    category: "concurrency",
    basic:
      "ThreadLocal provides thread-confined storage — each thread that accesses a ThreadLocal variable gets its own independent copy. Changes in one thread are not visible to others.",
    expected:
      "Common use cases: per-thread SimpleDateFormat (which is not thread-safe), per-thread database connections, Spring's SecurityContextHolder and TransactionSynchronizationManager. Implemented as a map inside each Thread object (Thread.threadLocals — a ThreadLocalMap). InheritableThreadLocal propagates values to child threads at fork time (but not dynamically after that — not suitable for async handoff). ThreadLocal.withInitial() takes a Supplier for lazy initialization.",
    deep:
      "Thread pool memory leak: if a thread in a pool calls ThreadLocal.set() but never calls remove(), the value persists for the lifetime of that thread. In a servlet container running on a thread pool, this means per-request data (e.g., user identity, database connections) can leak between requests. The fix: always call remove() in a finally block (or use a request-scoped Spring bean). ThreadLocalMap uses WeakReference keys (the ThreadLocal itself) so if the ThreadLocal variable goes out of scope, its entry can be GC'd — but the value (a strong reference) stays until the thread dies or the entry is cleaned. Virtual threads (Java 21) are cheap enough that a new virtual thread per request eliminates the need for ThreadLocal for many use cases.",
    interviewAnswer:
      "ThreadLocal gives each thread its own slot for a value — used for per-thread caching of non-thread-safe objects (e.g., SimpleDateFormat) or passing context implicitly down a call stack without method parameters (Spring's TransactionSynchronizationManager). The critical operational rule: always call ThreadLocal.remove() when done, especially in thread pools, to prevent memory leaks and cross-request data contamination. ThreadLocalMap's WeakReference key prevents leak of the ThreadLocal itself, but not of the value.",
    trap:
      "In a thread pool, failing to call ThreadLocal.remove() means the next request handled by that thread inherits the previous request's data — a security and correctness bug that only manifests under load when threads are reused.",
    memoryAnchor:
      "ThreadLocal = a personal locker at a gym. Each thread gets its own locker. But in a thread pool, threads are reused like rental lockers -- if you don't clean yours out, the next renter finds your sweaty towel.",
  },

  // ── Collections ───────────────────────────────────────────────────────────
  {
    id: "hashmap-internals",
    title: "HashMap Internals",
    category: "collections",
    basic:
      "HashMap stores key-value pairs in an array of buckets. Keys are hashed; the hash determines the bucket index. Collisions (different keys in the same bucket) are handled by a linked list (or tree) at that bucket.",
    expected:
      "Default initial capacity: 16 buckets. Load factor: 0.75 (resize when size > capacity * 0.75). Resize: new array 2x the size, all entries rehashed and redistributed. Treeification (Java 8+): when a single bucket's linked list reaches 8 entries, it converts to a red-black tree (TreeNode) for O(log n) lookup; untreeifies back to a list at 6. hash() applies a secondary hash (spread higher bits into lower bits) to reduce collisions from poor hashCode() implementations. HashMap is NOT thread-safe — concurrent reads during a resize caused infinite loops in Java 7 (fixed in Java 8 by using a tail-insertion algorithm).",
    deep:
      "The treeify threshold of 8 was chosen statistically — with a good hash function, the probability of 8 collisions in a bucket follows a Poisson distribution with probability ~0.00000006. The HashMap's internal Node class becomes TreeNode (extends LinkedHashMap.Entry) for treeified buckets, adding left/right/parent/red fields. LinkedHashMap extends HashMap and maintains a doubly-linked list of entries in insertion order (or access order for LRU caches). The Java 8 HashMap resize fix changed from head-insertion (which reversed bucket order) to tail-insertion, eliminating the cycle that caused infinite loops under concurrent access without synchronization.",
    interviewAnswer:
      "HashMap uses an array of buckets where each bucket is a linked list that treeifies to a red-black tree at size 8 (reverts at 6). Resize triggers when occupancy exceeds capacity × 0.75 — doubles the array and rehashes all entries. A good hashCode() is critical: poor distribution fills a few buckets deeply, degrading O(1) gets to O(n) (or O(log n) after treeify). HashMap is not thread-safe — use ConcurrentHashMap for concurrent access; synchronized access during iteration still risks ConcurrentModificationException.",
    trap:
      "Using a mutable object as a HashMap key and then mutating it changes its hashCode(), which means the map can no longer find the entry — it's effectively lost in the map (a silent memory leak).",
    memoryAnchor:
      "HashMap = a post office with numbered P.O. boxes. hashCode picks the box number, the linked list is mail inside. Treeify at 8 = when one box overflows, it gets upgraded to a sorted filing cabinet.",
  },
  {
    id: "concurrent-hashmap",
    title: "ConcurrentHashMap vs Collections.synchronizedMap",
    category: "collections",
    basic:
      "ConcurrentHashMap is a thread-safe HashMap optimized for concurrent reads and fine-grained writes. Collections.synchronizedMap() wraps any Map with a synchronized keyword on every method.",
    expected:
      "synchronizedMap() locks the entire map for every operation — only one thread can read or write at a time. ConcurrentHashMap (Java 8+) uses CAS for empty buckets and synchronized on the first node of a bin for non-empty buckets — effectively per-bucket locking, allowing many threads to read and write different buckets concurrently. ConcurrentHashMap does NOT allow null keys or values (throws NPE). Aggregate operations (putIfAbsent, compute, computeIfAbsent, merge) are atomic in ConcurrentHashMap. size() is an estimate under concurrent modification.",
    deep:
      "Java 7 ConcurrentHashMap used explicit ReentrantLock-based segments (default 16 segments). Java 8 removed segments entirely — the implementation now uses the array of bins directly with CAS + synchronized, reducing memory overhead and improving throughput. The compute() family of methods is critical for correct atomic updates: map.computeIfAbsent(key, k -> new ArrayList<>()).add(value) is atomic; the equivalent get()+put() is not. LongAdder-based size counter. Under Java 21 virtual threads, ConcurrentHashMap's synchronized blocks can still pin carrier threads — Loom-aware alternatives are being explored.",
    interviewAnswer:
      "ConcurrentHashMap achieves high concurrency via CAS for empty-bucket puts and synchronized on only the bucket head for occupied buckets — multiple threads write different buckets simultaneously. synchronizedMap wraps every operation in a single lock, serializing all access. Prefer ConcurrentHashMap for concurrent use. The gotcha: iterating a synchronizedMap still requires external locking on the map object; ConcurrentHashMap's iterators are weakly consistent (reflect state at some point during iteration, no ConcurrentModificationException).",
    trap:
      "ConcurrentHashMap.size() does not reflect a snapshot — under concurrent modification it returns an approximation. Conditional logic like if (map.size() == 0) ... is a race condition; use map.isEmpty() or isEmpty() inside a compute() for correctness.",
    memoryAnchor:
      "synchronizedMap = one giant padlock on the entire warehouse door (everyone waits). ConcurrentHashMap = individual locks on each aisle -- shoppers in different aisles never block each other.",
  },
  {
    id: "arraylist-vs-linkedlist",
    title: "ArrayList vs LinkedList",
    category: "collections",
    basic:
      "ArrayList is backed by a dynamic array — O(1) random access, O(n) insertion/removal in the middle. LinkedList is a doubly-linked list — O(n) random access (no index), O(1) insertion/removal at a known node.",
    expected:
      "In practice, ArrayList outperforms LinkedList for most workloads due to cache locality — array elements are contiguous in memory, enabling CPU prefetching. LinkedList nodes are scattered in heap; each node traversal is a pointer dereference that likely causes a cache miss. LinkedList wins only when you have a persistent iterator positioned at the insertion point and perform frequent insertions at that position. LinkedList implements Deque and can be used as a stack or queue. ArrayList.add() is amortized O(1) — occasionally triggers a resize (new array at 1.5x capacity, copy all elements).",
    deep:
      "Modern hardware makes LinkedList's theoretical O(1) insert advantage largely irrelevant for small to medium lists because cache misses dominate. Memory overhead: each LinkedList node adds 24 bytes of object overhead (prev pointer, next pointer, object header) vs ArrayList's 4 bytes per reference. ArrayDeque is preferred over LinkedList as a queue/deque — it's backed by a resizable circular array and avoids per-element allocation overhead. For high-throughput queues, consider Disruptor's ring buffer (lock-free, cache-friendly).",
    interviewAnswer:
      "In theory LinkedList has O(1) insert/remove at known positions vs ArrayList's O(n). In practice ArrayList almost always wins due to cache locality — contiguous array memory is prefetched efficiently by CPUs, while LinkedList's scattered nodes cause cache misses on every traversal. Use ArrayList as the default; LinkedList only when you have a persistent iterator pointing to the insert location and are doing many such operations. For queue semantics, use ArrayDeque.",
    trap:
      "Calling LinkedList.get(index) is O(n) — the list traverses from the head or tail each time. A loop that calls get(i) in a for loop over a LinkedList is O(n²).",
    memoryAnchor:
      "ArrayList = a bookshelf with numbered slots (instant access by position). LinkedList = a treasure hunt where each clue points to the next. Fast to insert a clue mid-chain, but finding clue #50 means following 49 clues first.",
  },
  {
    id: "fail-fast-iterators",
    title: "Fail-Fast Iterators",
    category: "collections",
    basic:
      "Most java.util collection iterators are fail-fast — if the collection is structurally modified while iterating (add/remove), they throw ConcurrentModificationException on the next iterator operation.",
    expected:
      "Fail-fast is implemented via a modCount counter — incremented on every structural modification. The iterator captures modCount at creation; each next()/remove() checks if modCount has changed. To safely remove during iteration: use Iterator.remove() (which updates the internal expectedModCount). To safely add during iteration: use ListIterator.add(). For concurrent modification from another thread: use CopyOnWriteArrayList (snapshot semantics, expensive writes) or ConcurrentHashMap's weakly-consistent iterators (no CME, reflects state at some point).",
    deep:
      "ConcurrentModificationException is a best-effort detection, not a guarantee — the JMM does not guarantee visibility of modCount changes between threads without synchronization, so a concurrent modification may go undetected (especially on multi-core hardware). The Java documentation explicitly warns that it should be used only to detect bugs, not for correctness. CopyOnWriteArrayList creates a new array on every write — O(n) write cost — and its iterators operate on a snapshot, so add/remove from within an iterator loop are silently ignored (the original list is modified, but the iterator sees the old snapshot).",
    interviewAnswer:
      "Fail-fast iterators throw ConcurrentModificationException when the collection's structure changes between iterator creation and use. The implementation uses a modCount field — the iterator checks it on each operation. Safe removal requires Iterator.remove(), not Collection.remove(). For multi-threaded scenarios, fail-fast is not a reliable safety mechanism — use ConcurrentHashMap or CopyOnWriteArrayList whose iterators are weakly consistent or snapshot-based respectively.",
    trap:
      "Calling collection.remove(object) inside a for-each loop throws ConcurrentModificationException, but calling Iterator.remove() inside a manual Iterator loop does not — the for-each loop uses an iterator internally, and external remove() increments modCount without updating the iterator's expectedModCount.",
    memoryAnchor:
      "Fail-fast iterator = a librarian reading a shelf aloud. If someone sneaks in and removes a book mid-reading, the librarian screams (ConcurrentModificationException). Only the librarian herself can remove books safely (Iterator.remove()).",
  },

  // ── Spring ────────────────────────────────────────────────────────────────
  {
    id: "spring-ioc-di",
    title: "Spring IoC Container & Dependency Injection",
    category: "spring",
    basic:
      "Spring's IoC (Inversion of Control) container manages bean creation, wiring, and lifecycle. DI (Dependency Injection) means beans declare their dependencies; Spring fulfills them rather than the bean constructing them directly.",
    expected:
      "Three DI styles: constructor injection (recommended — immutable, testable, fails fast at startup if dependency is missing), setter injection (optional dependencies), field injection (@Autowired on a field — discouraged, makes testing harder, hides dependencies). Bean scopes: singleton (default, one instance per container), prototype (new instance per request), request/session/application (web-scoped). @Component/@Service/@Repository/@Controller are all @Component specializations scanned by @ComponentScan. @Configuration + @Bean defines beans programmatically.",
    deep:
      "BeanFactory is the core container; ApplicationContext extends it with event publishing, i18n, resource loading, and eager singleton initialization. The BeanDefinition is a metadata descriptor of a bean. BeanPostProcessor and BeanFactoryPostProcessor hooks allow modifying bean definitions and instances at different lifecycle phases — Spring AOP, @Autowired processing, and @Value injection are all implemented as BeanPostProcessors. Circular dependency: constructor injection circular dependencies fail at startup (good); setter/field injection circular dependencies are resolved by Spring (risky — partially constructed beans). Spring Boot's auto-configuration uses @Conditional and @Import to conditionally register beans based on classpath and properties.",
    interviewAnswer:
      "Spring's IoC container creates and wires beans based on configuration (annotations, XML, or Java config). Prefer constructor injection: it makes dependencies explicit, enables immutable beans, and causes fast startup failure when a dependency is missing. @Autowired by type first, then by name (@Qualifier) if multiple candidates exist. Singleton scope means one instance is shared across the application — stateful fields in singleton beans are a concurrency hazard. Use prototype scope for stateful beans that must be independent per consumer.",
    trap:
      "Injecting a prototype-scoped bean into a singleton bean defeats prototype semantics — the singleton holds one reference that never changes. Use ApplicationContext.getBean(), a Provider<T>, or @Lookup to get a fresh prototype on each use.",
    memoryAnchor:
      "IoC = a restaurant where you don't cook; you just say 'I need pasta' and the kitchen (Spring container) delivers it to your table. DI = the waiter bringing you ingredients you listed on the menu, not you raiding the fridge.",
  },
  {
    id: "spring-transactional",
    title: "@Transactional: Propagation & Isolation",
    category: "spring",
    basic:
      "@Transactional marks a method to run inside a database transaction. Spring manages transaction begin/commit/rollback via AOP. By default, it rolls back on RuntimeException and Error, but NOT on checked exceptions.",
    expected:
      "Propagation levels (most important): REQUIRED (default — join existing or create new), REQUIRES_NEW (always create new, suspend existing), NESTED (savepoint within existing), MANDATORY (must exist), SUPPORTS, NOT_SUPPORTED, NEVER. Isolation levels: READ_UNCOMMITTED, READ_COMMITTED (default in most DBs), REPEATABLE_READ, SERIALIZABLE. Higher isolation prevents more anomalies (dirty read, non-repeatable read, phantom read) but increases lock contention. rollbackFor can extend rollback to checked exceptions; noRollbackFor can prevent rollback for specific runtime exceptions.",
    deep:
      "AOP proxy mechanism: Spring wraps the bean in a JDK dynamic proxy (if interface exists) or CGLIB proxy. The proxy intercepts calls from outside the bean, starts/commits the transaction, and delegates to the real method. Self-invocation bypasses the proxy entirely — a @Transactional method called by another method in the same class runs without a transaction (or joins the existing outer one, but does NOT trigger a new propagation). Fix: inject the bean into itself (ugly), use AopContext.currentProxy(), or restructure into separate beans. Transaction synchronization: Spring registers callbacks (afterCommit, beforeCompletion) via TransactionSynchronizationManager — useful for sending events only after commit.",
    interviewAnswer:
      "@Transactional works via AOP proxies — Spring intercepts calls to annotated methods from outside the bean. Self-invocation (this.method()) bypasses the proxy and ignores @Transactional. REQUIRES_NEW suspends the current transaction and opens a new one — changes in the inner transaction commit/rollback independently; this is useful for audit logging that must persist even if the outer transaction rolls back. By default, only unchecked exceptions trigger rollback; add rollbackFor = Exception.class to rollback on checked exceptions.",
    trap:
      "@Transactional on a private method is silently ignored — the proxy cannot intercept private calls. It must be on a public method of a Spring bean, called from outside the bean.",
    memoryAnchor:
      "@Transactional = a bodyguard at your office door who handles all visitors. Self-invocation (this.method()) is sneaking through the back door -- the bodyguard never sees you, so no transaction protection kicks in.",
  },
  {
    id: "spring-aop",
    title: "Spring AOP Proxies",
    category: "spring",
    basic:
      "Spring AOP (Aspect-Oriented Programming) applies cross-cutting concerns (logging, transactions, security) via proxies. Spring AOP is proxy-based (not full AspectJ bytecode weaving) and only works for method execution join points on Spring beans.",
    expected:
      "Two proxy types: JDK dynamic proxy (requires interface — proxy implements the same interface) and CGLIB proxy (no interface required — subclasses the target class, so the class cannot be final). Spring Boot defaults to CGLIB proxies. Advice types: @Before, @After, @AfterReturning, @AfterThrowing, @Around. @Around is the most powerful — controls whether the real method is called at all. Pointcut expressions target methods by signature. AOP applies at runtime (not compile time) — no bytecode modification, just object wrapping.",
    deep:
      "Spring AOP is a subset of AspectJ. Full AspectJ (load-time or compile-time weaving) can intercept field access, static methods, and constructor calls — Spring AOP cannot. The proxy is created by AbstractAutoProxyCreator (a BeanPostProcessor) after the bean is instantiated. Proxies can be stacked — @Transactional and @Async and custom security advice can all wrap the same bean. Ordering (@Order / Ordered) determines the advice execution sequence. A common pitfall: casting a Spring bean to a concrete class fails when CGLIB is used and the class has a final method — CGLIB cannot override it, causing proxy creation failure or silent advice bypass.",
    interviewAnswer:
      "Spring AOP wraps beans in JDK dynamic proxies (interface-based) or CGLIB proxies (subclass-based) at runtime. Interception only works for calls that go through the proxy — calls from outside the bean. Internal self-calls skip the proxy. CGLIB cannot proxy final classes or override final methods — those escape all AOP advice. @Around advice is the most powerful: it controls invocation via ProceedingJoinPoint.proceed() and can modify arguments, return values, or suppress the call entirely.",
    trap:
      "If a Spring bean's class is final (e.g., a Kotlin data class by default), CGLIB cannot subclass it — Spring fails to create the proxy and the @Transactional/@Async/@Cacheable annotations on it are silently ignored. Mark Kotlin classes open or use the allopen plugin.",
    memoryAnchor:
      "AOP Proxy = a stunt double who intercepts all incoming calls and adds special effects (logging, transactions) before passing to the real actor. Self-calls skip the stunt double entirely -- the actor talks to themselves, no special effects.",
  },
  {
    id: "spring-async",
    title: "@Async Caveats",
    category: "spring",
    basic:
      "@Async on a Spring bean method causes it to execute asynchronously on a separate thread (by default the SimpleAsyncTaskExecutor, which creates a new thread per invocation). Returns must be void or Future/CompletableFuture.",
    expected:
      "Like @Transactional, @Async relies on the AOP proxy — self-invocation bypasses it and the method runs synchronously. SimpleAsyncTaskExecutor creates an unbounded number of threads — in production, always configure a custom ThreadPoolTaskExecutor (via @EnableAsync + @Bean TaskExecutor). The SecurityContext is NOT automatically propagated to async threads — use DelegatingSecurityContextExecutorService or store/restore the context manually. Exceptions thrown from a void @Async method are lost unless an AsyncUncaughtExceptionHandler is configured.",
    deep:
      "CompletableFuture returned by @Async is not backed by the ForkJoinPool.commonPool() — it uses the configured task executor. Callers can still chain .thenApply() etc. Exception handling: for Future-returning async methods, the exception is captured in the Future and re-thrown on get(). For void methods, without an AsyncUncaughtExceptionHandler, the exception is logged and silently dropped. @Async and @Transactional can coexist on the same method but require careful ordering — @Async creates a new thread (so the transaction from the caller thread doesn't propagate), which is almost always what you want (a transaction per async task).",
    interviewAnswer:
      "@Async dispatches the annotated method to a thread pool (configure a custom ThreadPoolTaskExecutor — the default creates a new thread per call and is unsuitable for production). Self-invocation bypasses the proxy, so the method runs synchronously. Exceptions from void @Async methods are silently swallowed without an AsyncUncaughtExceptionHandler. The Spring SecurityContext is not automatically inherited by async threads — explicitly propagate it via DelegatingSecurityContextRunnable or a custom executor decorator.",
    trap:
      "Calling an @Async method on this (self-call) within the same bean executes synchronously — no new thread is created, no proxy intercepts the call — and there is no compile-time or runtime warning.",
    memoryAnchor:
      "@Async = dropping a letter in a mailbox for later delivery. But self-invocation is handing the letter to yourself -- you just read it immediately. No mailman, no async, no new thread.",
  },

  // ── Memory & GC ───────────────────────────────────────────────────────────
  {
    id: "heap-regions",
    title: "Heap Regions & Generations",
    category: "memory-gc",
    basic:
      "The JVM heap is divided into generations: Young Generation (newly allocated objects), Old Generation (long-lived objects), and Metaspace (class metadata, off-heap since Java 8). Young is further split into Eden and two Survivor spaces (S0, S1).",
    expected:
      "Minor GC (Young GC): collects Eden and one Survivor; surviving objects are copied to the other Survivor (incrementing age). Objects that survive a threshold number of minor GCs (default 15) are promoted to Old Generation. Major/Full GC: collects Old Generation (and possibly Young) — much more expensive. Generational hypothesis: most objects die young (short-lived) — this is why the generational split improves GC efficiency. Stack allocation (JIT escape analysis) avoids heap allocation entirely for some short-lived objects.",
    deep:
      "G1 GC abandons fixed contiguous Young/Old regions — the heap is divided into equal-sized regions (~1-32MB each) and each region is dynamically assigned as Eden, Survivor, Old, or Humongous (for objects > region size / 2). G1 tracks per-region liveness and collects the most garbage-dense regions first (hence 'Garbage First'). Humongous objects are allocated directly in Old Generation and can cause premature Full GC. JVM ergonomics automatically tuned heap sizing (InitialHeapSize, MaxHeapSize) based on physical RAM until Java 8; Docker containers require -XX:+UseContainerSupport (default Java 10+) to read cgroup memory limits instead of host RAM.",
    interviewAnswer:
      "The heap has Young Generation (Eden + two Survivors) for new objects and Old Generation for long-lived ones. Minor GC uses stop-the-world copying within Young — fast and frequent. Major/Full GC is slower and stops all threads longer. Objects are promoted to Old after surviving multiple minor GCs (threshold configurable, default 15). In G1, the heap is equal-sized regions dynamically assigned to generations — G1 targets a configurable pause time by selecting the highest-garbage regions to collect first.",
    trap:
      "Allocating many large objects (> half a G1 region) places them as Humongous objects in Old Generation, bypassing Young GC entirely — they accumulate until a Full GC, causing unexpected long pauses.",
    memoryAnchor:
      "Heap = a nursery (Young) and retirement home (Old). New objects are born in the nursery (Eden). Survivors graduate through toddler rooms (Survivor spaces). Only the toughest make it to the retirement home. Metaspace is the staff office -- outside the building.",
  },
  {
    id: "gc-algorithms",
    title: "GC Algorithms: G1, ZGC, Shenandoah",
    category: "memory-gc",
    basic:
      "Java ships with multiple GC implementations: Serial (single-thread), Parallel (throughput), G1 (balanced), ZGC (ultra-low latency), Shenandoah (low latency). The default since Java 9 is G1.",
    expected:
      "G1: region-based, concurrent marking phase (runs with app threads), evacuation (stop-the-world but bounded by pause-time target). -XX:MaxGCPauseMillis=200 is the target (not guarantee). Best for: multi-GB heaps, apps that need predictable pauses. ZGC (Java 15+, production-ready): concurrent relocation — almost all GC work runs concurrently, pauses are < 1ms regardless of heap size. Scales to multi-TB heaps. Best for: latency-critical apps with large heaps. Shenandoah (Red Hat, OpenJDK): similar concurrent relocation model to ZGC. Parallel GC: highest throughput (batch/offline processing), longest pauses.",
    deep:
      "ZGC uses colored pointers (bits in the 64-bit pointer encode GC state — load barriers on every object read update the pointer). This enables concurrent relocation: the GC can move objects while the application runs, using load barriers to intercept reads and return the new location. Shenandoah uses Brooks forwarding pointers (an extra word per object). Both trade increased per-read overhead for pause reduction. G1's concurrent marking uses a tri-color invariant (white/grey/black) and write barriers (SATB — Snapshot At The Beginning) to handle objects modified during marking. Java 21's Generational ZGC adds generational collection to ZGC's concurrent model for better throughput.",
    interviewAnswer:
      "G1 is the default GC — region-based with configurable pause targets, good for multi-GB heaps where you want predictable but not ultra-low pauses. ZGC (Java 15+) does nearly all work concurrently using colored pointers and load barriers, achieving sub-millisecond pauses at multi-TB heap sizes — use it for latency-critical services. Parallel GC maximizes throughput for batch workloads at the cost of longer stop-the-world pauses. Tune GC with -Xmx, -Xms, and -XX:MaxGCPauseMillis; monitor with GC logs (-Xlog:gc*).",
    trap:
      "Setting -Xmx and -Xms to the same value prevents heap resizing (good for predictability) but means the JVM requests max memory from the OS immediately — in containerized environments this can trigger OOM kills if other processes share the host.",
    memoryAnchor:
      "G1 = a cleaning crew that tackles the messiest rooms first (Garbage-First). ZGC = a Roomba that cleans while you walk around -- you barely notice it (sub-ms pauses). Parallel GC = shutting down the whole house for a deep clean (max throughput, longest pause).",
  },
  {
    id: "reference-types",
    title: "Reference Types: Weak, Soft, Phantom",
    category: "memory-gc",
    basic:
      "Beyond strong references (normal object references), Java provides WeakReference, SoftReference, and PhantomReference. They allow the GC to collect objects when memory is needed, enabling cache and lifecycle patterns.",
    expected:
      "WeakReference: collected at the next GC cycle once no strong references remain — used in WeakHashMap for caches where entries should disappear when the key is GC'd. SoftReference: collected only when the JVM is under memory pressure (before OOM) — good for memory-sensitive caches. PhantomReference: always returns null on get(); used with ReferenceQueue to perform post-finalization cleanup (replacing finalize()). All three can be registered with a ReferenceQueue — when the referent is collected, the Reference object is enqueued for cleanup notification. Cleaner (Java 9+) is the preferred finalization mechanism over finalize().",
    deep:
      "The GC processes reference queues after marking — once a weakly-reachable object is identified, its WeakReference is enqueued and the referent can be freed. WeakHashMap's Entry extends WeakReference<K>; when the key is GC'd, the Entry appears in the queue and a background expunge removes it on next map access. PhantomReference's get() always returns null by design — the cleanup action must be performed by the thread draining the ReferenceQueue, not by reading the referent. The Cleaner API wraps this pattern: register a Runnable cleanup action that runs after the object becomes phantom-reachable. finalize() is deprecated (Java 9) and deprecated for removal (Java 18) — it still exists but emits warnings; it was slow, unpredictable, and could resurrect objects. Use Cleaner instead.",
    interviewAnswer:
      "SoftReferences are collected only under memory pressure — ideal for in-memory caches that should yield memory to prevent OOM. WeakReferences are collected at the next GC — used in WeakHashMap where entries should automatically expire when the key is no longer referenced. PhantomReferences are for post-GC cleanup actions (replacing the deprecated finalize()) — register a Cleaner action that runs after the object is collected, with no risk of object resurrection. All three integrate with ReferenceQueue for cleanup notification.",
    trap:
      "WeakHashMap keys must be objects with identity-based equality (not Strings or other interned/cached objects) — interned strings are always strongly referenced by the string pool, so WeakHashMap<String, V> entries are never collected.",
    memoryAnchor:
      "Strong ref = holding a dog on a leash. Soft ref = a sticky note on the fridge (removed only when you need fridge space). Weak ref = writing a name in sand (gone at the next wave/GC). Phantom ref = a ghost that haunts the ReferenceQueue after death.",
  },

  // ── Generics & Types ──────────────────────────────────────────────────────
  {
    id: "type-erasure",
    title: "Type Erasure",
    category: "generics-types",
    basic:
      "Java generics are erased at compile time — generic type parameters are replaced with their bounds (Object if unbounded). At runtime, List<String> and List<Integer> are both just List.",
    expected:
      "Type erasure consequences: you cannot do new T[], instanceof List<String>, or get the generic type T at runtime via reflection from a normal class (only from class literals, supertype tokens, or TypeToken). The compiler inserts unchecked casts at usage sites. Bridge methods are generated for overrides of generic methods to maintain binary compatibility. Reifiable types (whose full type is available at runtime): raw types, non-generic types, arrays of reifiable types, wildcards (List<?>). Non-reifiable: List<String>, Map<K,V>.",
    deep:
      "Heap pollution: a variable of type List<String> can hold a List<Integer> at runtime if an unchecked cast is involved (the JVM can't check it). This produces an unchecked warning at compile time. @SafeVarargs suppresses heap pollution warnings for methods whose varargs parameter is not modified. TypeToken (Guava) / ParameterizedType (java.lang.reflect) enable runtime capture of generic types by creating an anonymous subclass (List<String>{} captures the type argument). The Reflection API's Type hierarchy (ParameterizedType, TypeVariable, WildcardType, GenericArrayType) represents generic signatures in class files even though erasure removes them from the runtime.",
    interviewAnswer:
      "Java generics are compile-time only — type parameters are erased to their bounds (usually Object) in bytecode. This means you can't instantiate a generic type parameter (new T()), check instanceof with a parameterized type (x instanceof List<String>), or create generic arrays (new T[]). Unchecked casts are inserted by the compiler at usage sites. The upside: generics are backward-compatible with pre-Java-5 raw type code. Use TypeToken or Class<T> tokens when you need runtime type information.",
    trap:
      "Overloading methods that differ only by generic type parameter (void process(List<String>) and void process(List<Integer>)) causes a compile error — after erasure both have the same signature void process(List).",
    memoryAnchor:
      "Type erasure = wearing a name tag at a costume party, but the bouncer rips off all tags at the door. Inside the party (runtime), List<String> and List<Integer> are both just 'List' -- nobody remembers who's who.",
  },
  {
    id: "wildcards",
    title: "Wildcards & PECS Rule",
    category: "generics-types",
    basic:
      "Wildcards (?) express unknown type parameters. ? extends T means the type is T or a subtype (upper-bounded). ? super T means the type is T or a supertype (lower-bounded). PECS: Producer Extends, Consumer Super.",
    expected:
      "PECS: if a collection produces elements you read from, use ? extends T (covariant — read-only). If it consumes elements you write to, use ? super T (contravariant — write-only). List<? extends Number> lets you read Numbers but not add any type (the compiler doesn't know the exact element type). List<? super Integer> lets you add Integers but you can only read Objects. Unbounded wildcard List<?> is useful when you don't care about the element type (printing, counting). Collections.copy() source uses ? extends T, dest uses ? super T — textbook PECS.",
    deep:
      "Wildcard capture: when a method receives List<?>, the compiler performs wildcard capture internally to give the unknown type a name — used in helper methods. ? is not a type — it's a syntactic shorthand for an existential type. Type inference (Java 8+ target typing) often makes explicit wildcards unnecessary in many situations (e.g., Stream APIs). Bounded type parameters (T extends Comparable<? super T>) appear in Collections.sort and TreeMap comparisons — the ? super T allows passing a Comparator<Animal> to sort a List<Dog>, which is more flexible than requiring Comparator<Dog>.",
    interviewAnswer:
      "PECS (Producer Extends, Consumer Super) guides wildcard choice: use ? extends T to read from a generic collection (you get T or a subtype — safe to read, unsafe to write because you don't know the exact type). Use ? super T to write into it (you know at minimum T can be stored — safe to write, only Object can be safely read). This is why Collections.copy(dst, src) is copy(List<? super T> dst, List<? extends T> src). Prefer bounded wildcards in public APIs to maximize flexibility for callers.",
    trap:
      "You cannot add anything (except null) to a List<? extends Number> — the compiler cannot verify type safety for the specific unknown subtype, so all adds are rejected at compile time.",
    memoryAnchor:
      "PECS = 'Producer Extends, Consumer Super.' Think of a fruit bowl: '? extends Fruit' = you can TAKE fruit out (produce/read), but can't put any in (is it an Apple bowl or Orange bowl?). '? super Apple' = you can PUT apples in (consume/write), but what you take out is just 'Object.'",
  },
];

// ─── Interview Patterns ───────────────────────────────────────────────────────

const interviewPatterns: InterviewPattern[] = [
  {
    question: "Explain the HashMap internal structure and what happens during a resize.",
    answer:
      "HashMap uses an array of Node buckets. Each bucket is a linked list that converts to a red-black tree when it exceeds 8 entries. When the number of entries exceeds capacity × load factor (default 0.75), the array doubles in size and all entries are rehashed into the new array. The Java 8 resize uses tail-insertion to maintain order within each bucket, avoiding the cycle that caused infinite loops under concurrent access in Java 7.",
    whyAsked:
      "Tests understanding of the most fundamental Java data structure — HashMap internals appear in nearly every mid-to-senior Java interview. Reveals depth of knowledge about time complexity, hash collisions, and concurrency implications.",
    trap:
      "Candidates often forget to mention treeification (Java 8 improvement), the tail-insertion fix for Java 7 concurrent resize loops, or that a poor hashCode() degrades HashMap to O(n) per operation.",
  },
  {
    question: "What is the difference between volatile and synchronized, and when do you use each?",
    answer:
      "volatile ensures visibility and ordering — writes are flushed to main memory and reads bypass CPU cache, establishing happens-before between a write and subsequent reads. synchronized adds mutual exclusion and atomicity on top of visibility. Use volatile for single-variable flags or for safely publishing an immutable object reference. Use synchronized (or ReentrantLock) for compound check-then-act operations, multi-variable invariants, or any read-modify-write sequence.",
    whyAsked:
      "Concurrency is the most common source of production bugs in Java systems. This question distinguishes candidates who understand the Java Memory Model from those who think synchronization is just 'making things thread-safe'.",
    trap:
      "Saying 'volatile makes operations atomic' is wrong — volatile long/double is atomic, but volatile int i; i++ is not. Candidates also often don't mention the happens-before guarantee or instruction reordering prevention.",
  },
  {
    question: "What happens when @Transactional is called from within the same Spring bean?",
    answer:
      "Spring @Transactional uses AOP proxies — the proxy intercepts calls from outside the bean. When a method calls another @Transactional method on the same bean via this.method(), it bypasses the proxy entirely. The called method runs in whatever transactional context already exists (or none) — no new transaction is started, no propagation occurs. Fix: inject the bean into itself via @Autowired, restructure into two separate beans, or use AopContext.currentProxy() (requires AspectJ mode).",
    whyAsked:
      "Self-invocation bypassing AOP proxies is the #1 Spring @Transactional gotcha in production. It reveals understanding of how Spring AOP works under the hood vs. treating it as magic.",
    trap:
      "Candidates often say '@Transactional doesn't work on private methods' (true) but miss that it also silently fails on public methods called internally — both have the same root cause (proxy bypass).",
  },
  {
    question: "Explain type erasure and its implications for generics in Java.",
    answer:
      "Java generics are a compile-time feature — type parameters are erased to their bounds (usually Object) in bytecode. At runtime, List<String> and List<Integer> are indistinguishable. Implications: you cannot do instanceof List<String>, new T[], or get T's runtime class directly. The compiler inserts unchecked casts at call sites. This enables backward compatibility with pre-Java-5 raw type code but prevents some type-safe patterns possible in C# or Kotlin reified generics.",
    whyAsked:
      "Type erasure is frequently encountered when working with reflection, serialization, and frameworks (Jackson, Spring). Understanding it separates developers who work around symptoms from those who understand the cause.",
    trap:
      "Candidates forget that generic type information IS preserved in class file signatures (via ParameterizedType in reflection) — it's only erased from the runtime type of instances, not from class/method metadata.",
  },
  {
    question: "Walk me through what happens when you call ConcurrentHashMap.computeIfAbsent().",
    answer:
      "computeIfAbsent(key, mappingFunction) is an atomic operation: it checks if the key exists — if not, it calls the mapping function and inserts the result, all under bin-level locking (synchronized on the bin head). This prevents the race condition present in the check-then-act pattern get()+putIfAbsent(). Under Java 8's implementation, the mapping function runs while holding the bin lock — any blocking or recursive ConcurrentHashMap access inside the function risks deadlock or performance issues.",
    whyAsked:
      "Tests understanding of the gap between theoretical thread safety and practical usage — computeIfAbsent is atomic, but the function running under the lock has real constraints. Reveals operational maturity.",
    trap:
      "Calling computeIfAbsent inside the mapping function of computeIfAbsent on the same ConcurrentHashMap can deadlock in Java 8 (the mapping function re-locks an already-locked bin). This was partially improved in Java 9+.",
  },
  {
    question: "What is the difference between G1 GC and ZGC, and when would you choose each?",
    answer:
      "G1 is the default GC — region-based, targets configurable pause times (default 200ms), good for heaps of 4GB-16GB with reasonable latency requirements. ZGC (Java 15+ stable) does concurrent relocation using colored pointers and load barriers, achieving sub-millisecond pauses regardless of heap size (tested up to multi-TB). Choose G1 for most production services. Choose ZGC for latency-critical services (trading, real-time APIs) with large heaps where even 200ms pauses are unacceptable. Java 21's Generational ZGC improves ZGC throughput for short-lived objects.",
    whyAsked:
      "GC tuning and selection is a senior-level skill. Misidentifying the GC or not knowing tradeoffs indicates a candidate who hasn't dealt with production JVM performance issues.",
    trap:
      "ZGC's near-zero pause comes at a cost — higher per-read overhead from load barriers and higher CPU usage for concurrent GC work. It's not always faster than G1 for throughput-oriented workloads.",
  },
  {
    question: "How does the ClassLoader delegation model work, and what problem does it solve?",
    answer:
      "Every ClassLoader (except Bootstrap) has a parent. When asked to load a class, it always delegates to its parent first. Only if the parent cannot load it does the child attempt loading. This ensures core JDK classes (java.lang.String, etc.) are always loaded by the Bootstrap ClassLoader — user code cannot substitute malicious replacements. Application servers use isolated ClassLoaders per application to prevent class conflicts between deployed apps.",
    whyAsked:
      "Understanding ClassLoaders is essential for debugging ClassNotFoundException, ClassCastException across ClassLoader boundaries, and Metaspace leaks in dynamic deployment environments.",
    trap:
      "Candidates conflate ClassNotFoundException (class not found on classpath) with NoClassDefFoundError (class was found at compile time but not at runtime — often a classpath dependency missing at runtime or a failed static initializer).",
  },
  {
    question: "Explain the PECS rule for Java generics wildcards.",
    answer:
      "PECS: Producer Extends, Consumer Super. If a parameterized type produces values you read from it, use ? extends T — you can read T from it (safe), but not write (compiler doesn't know the exact subtype). If it consumes values you write to it, use ? super T — you can write T to it (safe), but reads return only Object. Collections.copy(List<? super T> dest, List<? extends T> src) is the canonical example — dest consumes, src produces.",
    whyAsked:
      "Wildcard usage in public APIs is a common API design decision. Misusing wildcards leads to unnecessarily restrictive APIs. Tests understanding of variance in type systems.",
    trap:
      "Candidates invert PECS or confuse it with upper/lower bounds on type parameters (T extends Comparable<T>) vs. wildcards on use sites. The rule applies to use-site wildcards, not declaration-site bounds.",
  },
];

// ─── Common Mistakes ──────────────────────────────────────────────────────────

const commonMistakes: CommonMistake[] = [
  {
    wrong: "Comparing strings with == : if (userInput == \"admin\") { ... }",
    correct:
      "Use .equals() for value comparison: if (\"admin\".equals(userInput)) { ... } — putting the literal first also guards against NullPointerException.",
  },
  {
    wrong: "Overriding equals() without overriding hashCode(), or implementing one with different fields than the other.",
    correct:
      "Always override both together using the same fields. Use Objects.equals() and Objects.hash() for null-safe, concise implementations.",
  },
  {
    wrong: "Using Executors.newFixedThreadPool(n) in production without concern for the queue size.",
    correct:
      "Construct ThreadPoolExecutor explicitly with a bounded BlockingQueue (ArrayBlockingQueue) and a RejectedExecutionHandler to prevent unbounded task accumulation and OOM.",
  },
  {
    wrong:
      "Calling a @Transactional or @Async method from within the same Spring bean (this.method()) and expecting Spring's proxy behavior to apply.",
    correct:
      "Restructure logic into separate Spring beans, or use @Autowired self-injection, so the call goes through the proxy. Self-calls bypass AOP interception silently.",
  },
  {
    wrong: "Not calling ThreadLocal.remove() when using ThreadLocals in a thread pool.",
    correct:
      "Always call threadLocal.remove() in a finally block after the unit of work completes to prevent value leakage between requests handled by the same pooled thread.",
  },
  {
    wrong: "Using Collections.synchronizedMap() and then iterating without external synchronization on the map.",
    correct:
      "Synchronize on the map object during iteration: synchronized(map) { for (Entry e : map.entrySet()) { ... } }. Or use ConcurrentHashMap whose iterators are weakly consistent.",
  },
  {
    wrong:
      "Implementing double-checked locking without declaring the instance field volatile: if (instance == null) { synchronized(lock) { if (instance == null) instance = new Singleton(); } }",
    correct:
      "Declare the field volatile: private volatile Singleton instance; — without volatile, the JVM can reorder the constructor and the reference assignment, exposing a partially-constructed object.",
  },
  {
    wrong: "Using a mutable object (with fields participating in hashCode) as a HashMap key, then mutating it.",
    correct:
      "Use immutable objects (or at minimum objects whose hashCode-contributing fields never change after insertion) as map keys. Mutable keys lose their entries permanently after mutation.",
  },
  {
    wrong: "Catching Exception or Throwable in a @Transactional method, handling it, and returning normally — expecting the transaction to commit.",
    correct:
      "If you catch an exception inside a @Transactional method and don't rethrow it, Spring sees a normal return and commits. Explicitly call TransactionAspectSupport.currentTransactionStatus().setRollbackOnly() if you want to roll back after swallowing.",
  },
  {
    wrong:
      "Using instanceof for generic type checks: if (list instanceof List<String>) — this is a compile error or unchecked warning due to type erasure.",
    correct:
      "Check the raw type: if (list instanceof List<?>) and then cast carefully. For runtime type tokens, pass a Class<T> parameter or use Guava's TypeToken.",
  },
  {
    wrong: "Expecting LinkedList.get(index) to be efficient in a loop: for (int i = 0; i < list.size(); i++) { list.get(i); }",
    correct:
      "Use an Iterator or for-each loop for LinkedList traversal, or switch to ArrayList for random-access patterns. LinkedList.get(i) traverses from head/tail each time — O(n) per call.",
  },
  {
    wrong: "Ignoring exceptions from CompletableFuture chains without a whenComplete() or exceptionally() handler.",
    correct:
      "Always attach error handlers to CompletableFuture chains: .exceptionally(ex -> { log.error(...); return fallback; }) or .whenComplete((result, ex) -> { ... }). Unhandled exceptions are silently swallowed.",
  },
];

// ─── Practice Questions ───────────────────────────────────────────────────────

const practiceQuestions: PracticeQuestion[] = [
  {
    code: `public class StringTest {
    public static void main(String[] args) {
        String a = "hello";
        String b = "hello";
        String c = new String("hello");
        String d = c.intern();

        System.out.println(a == b);       // (1)
        System.out.println(a == c);       // (2)
        System.out.println(a == d);       // (3)
        System.out.println(a.equals(c));  // (4)
    }
}`,
    question:
      "What are the outputs of (1) through (4)? Explain each line in terms of the string pool.",
    answer:
      "(1) true — both 'a' and 'b' refer to the same interned literal in the string pool. (2) false — new String(\"hello\") allocates a new heap object, bypassing the pool. (3) true — intern() returns the canonical pool reference, which is the same object as 'a'. (4) true — .equals() compares character content, not references, so it returns true for all same-content strings.",
  },
  {
    code: `import java.util.*;

public class HashMapTrap {
    public static void main(String[] args) {
        Map<List<Integer>, String> map = new HashMap<>();
        List<Integer> key = new ArrayList<>(Arrays.asList(1, 2, 3));
        map.put(key, "value");

        key.add(4); // mutate the key

        System.out.println(map.get(key));          // (1)
        System.out.println(map.containsKey(key));  // (2)
        System.out.println(map.size());            // (3)
    }
}`,
    question:
      "What do lines (1), (2), and (3) print? Why is (2) surprising, and what does this reveal about using mutable objects as HashMap keys?",
    answer:
      "(3) prints 1 — the entry exists. (1) and (2) print null and false — mutating the key changes its hashCode(), so the lookup hashes to a different bucket than the one where the entry was stored. The entry is 'lost' — present in the map but unreachable. This is why mutable objects (especially collections) are dangerous HashMap keys.",
  },
  {
    code: `import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

public class ConcurrencyTest {
    private static volatile int counter = 0;
    private static AtomicInteger atomicCounter = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) {
                counter++;          // (A)
                atomicCounter.incrementAndGet(); // (B)
            }
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start(); t2.start();
        t1.join(); t2.join();

        System.out.println("volatile: " + counter);
        System.out.println("atomic:   " + atomicCounter.get());
    }
}`,
    question:
      "After both threads complete, what are the possible values of counter and atomicCounter? Explain why they differ.",
    answer:
      "atomicCounter will always be exactly 2000 — AtomicInteger.incrementAndGet() uses CAS, making the increment atomic. counter will be some value <= 2000 (potentially far less) — volatile guarantees visibility but not atomicity. counter++ is read-modify-write: two threads can both read 5, both compute 6, and both write 6 — losing one increment. The race is not prevented by volatile.",
  },
  {
    code: `import java.util.*;

public class IteratorTrap {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("a", "b", "c", "d"));

        // Attempt 1: for-each + remove
        try {
            for (String s : list) {
                if (s.equals("b")) list.remove(s);
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("CME in for-each");
            list = new ArrayList<>(Arrays.asList("a", "b", "c", "d")); // reset
        }

        // Attempt 2: iterator remove
        Iterator<String> it = list.iterator();
        while (it.hasNext()) {
            if (it.next().equals("b")) it.remove();
        }
        System.out.println(list);
    }
}`,
    question: "What does each attempt print? Why does attempt 1 throw and attempt 2 succeed?",
    answer:
      "Attempt 1 prints 'CME in for-each' — the for-each loop uses an iterator internally; calling list.remove() increments modCount without updating the iterator's expectedModCount, triggering ConcurrentModificationException on the next iteration. Attempt 2 prints [a, c, d] — Iterator.remove() removes the last element returned by next() and updates expectedModCount internally, keeping the iterator consistent.",
  },
  {
    code: `import java.util.*;
import java.util.function.*;

public class TypeErasureTrap {
    public static <T> void process(List<T> items) {
        if (items instanceof List<?>) {
            System.out.println("is a List: " + true);
        }
        // if (items instanceof List<String>) {} // compile error
        System.out.println(items.getClass().getSimpleName());
    }

    public static void main(String[] args) {
        process(new ArrayList<String>());
        process(new ArrayList<Integer>());

        List<String> strings = new ArrayList<>();
        @SuppressWarnings("unchecked")
        List<Integer> ints = (List<Integer>) (List<?>) strings; // heap pollution
        ints.add(42);
        String s = strings.get(0); // (X)
    }
}`,
    question:
      "What does process() print for both calls, and what happens at line (X)? What does this reveal about type erasure and heap pollution?",
    answer:
      "process() prints 'is a List: true' and 'ArrayList' for both calls — at runtime both are just ArrayList with no type parameter. Line (X) throws ClassCastException — the cast to List<Integer> was unchecked (erased at runtime), so ints.add(42) succeeds silently, inserting an Integer into the String list. When strings.get(0) returns it, the implicit cast to String fails. This is heap pollution: a variable of parameterized type holds a value of an incompatible type.",
  },
  {
    code: `@Service
public class OrderService {
    @Autowired
    private OrderService self; // self-injection

    @Transactional
    public void placeOrder(Order order) {
        saveOrder(order);        // direct call
        self.sendConfirmation(order); // via proxy
    }

    public void saveOrder(Order order) { /* ... */ }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void sendConfirmation(Order order) {
        // send email, log audit record
    }
}`,
    question:
      "Why does sendConfirmation() require self-injection via 'self.sendConfirmation()' rather than a direct this.sendConfirmation() call? What transaction behavior does REQUIRES_NEW provide here?",
    answer:
      "Direct this.sendConfirmation() would bypass Spring's AOP proxy — @Transactional(REQUIRES_NEW) would be ignored, and sendConfirmation would join the existing placeOrder transaction. Via self.sendConfirmation(), the call goes through the proxy, which suspends the current transaction and opens a new one. REQUIRES_NEW ensures that the confirmation audit log commits independently — even if placeOrder's transaction later rolls back, the confirmation record is preserved.",
  },
  {
    code: `import java.lang.ref.*;
import java.util.*;

public class WeakRefDemo {
    public static void main(String[] args) throws InterruptedException {
        Object obj = new Object();
        WeakReference<Object> weakRef = new WeakReference<>(obj);
        ReferenceQueue<Object> queue = new ReferenceQueue<>();
        WeakReference<Object> tracked = new WeakReference<>(obj, queue);

        System.out.println("Before GC: " + weakRef.get()); // (1)

        obj = null; // remove strong reference
        System.gc();
        Thread.sleep(100); // give GC time

        System.out.println("After GC: " + weakRef.get());  // (2)
        System.out.println("Queued: " + (queue.poll() != null)); // (3)
    }
}`,
    question: "What do lines (1), (2), and (3) print? Explain the lifecycle of a WeakReference.",
    answer:
      "(1) prints the object's toString (e.g., 'java.lang.Object@...') — the strong reference obj keeps the object alive. (2) prints null — once obj = null removes the last strong reference and GC runs, the weakly-reachable object is collected and weakRef.get() returns null. (3) prints true — the tracked WeakReference was enqueued in the ReferenceQueue when its referent was collected, enabling cleanup actions. This is the mechanism WeakHashMap uses to expire entries.",
  },
  {
    code: `import java.util.*;
import java.util.function.*;

public class GenericsWildcard {
    public static double sumList(List<? extends Number> list) {
        return list.stream().mapToDouble(Number::doubleValue).sum();
    }

    public static void addNumbers(List<? super Integer> list, int count) {
        for (int i = 0; i < count; i++) list.add(i);
    }

    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.5, 2.5);
        List<Number> numbers = new ArrayList<>();

        System.out.println(sumList(ints));    // (1)
        System.out.println(sumList(doubles)); // (2)
        addNumbers(numbers, 3);               // (3)
        addNumbers(ints, 3);               // (4) — compiles but throws at runtime, explain why
        System.out.println(numbers);          // (5)
    }
}`,
    question:
      "What do (1)–(5) print or throw? Why does (4) fail at runtime?",
    answer:
      "(1) prints 6.0, (2) prints 4.0, (3) succeeds because 'numbers' is a mutable ArrayList. (4) compiles because List<Integer> matches List<? super Integer>, but throws UnsupportedOperationException at runtime because Arrays.asList() returns a fixed-size list backed by the original array — add() is not supported. (5) prints [0, 1, 2, 3]. The deeper point: ? extends is for reading (producer), ? super is for writing (consumer) — PECS. But even when generics allow the call, the underlying collection must support the operation.",
  },
];

// ─── Topic Data Export ────────────────────────────────────────────────────────

export const topicData: TopicData = {
  topicTitle: "Java",
  topicMeta: "50–60 min · Mid to Senior level",
  lastUpdated: "2026-04-10",
  lastHourConceptIds: [
    "equals-hashcode",
    "hashmap-internals",
    "volatile-keyword",
    "spring-transactional",
    "type-erasure",
    "heap-regions",
    "concurrent-hashmap",
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
