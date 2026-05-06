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
    "Low-Level Design is the discipline of translating a system's requirements into concrete classes, interfaces, and object relationships — defining how components interact at the code level using OOP principles, design patterns, and SOLID guidelines before a single line of production code is written.",
  whyItExists:
    "High-level architecture tells you what services exist; LLD tells you how each service is actually built internally. Without it, systems become a tangle of god classes, shotgun coupling, and fragile inheritance hierarchies that resist change. LLD gives you a shared vocabulary (patterns) and a set of heuristics (SOLID, composition over inheritance) to produce code that is readable, testable, and extensible under real-world pressure.",
  whenToUse: [
    "Designing a self-contained system from scratch: parking lot, elevator, chess engine, LRU cache, rate limiter",
    "Evaluating whether a feature addition requires modifying existing classes (violation of OCP) or only adding new ones",
    "Choosing between inheritance and composition — when subclasses need to override behavior vs when behaviour is swappable at runtime",
    "Identifying the right design pattern: creational when object creation is complex, structural when you need to adapt or wrap, behavioral when you need to decouple algorithm from caller",
    "Refactoring legacy code: spotting anemic domain models, god objects, and primitive obsession before introducing domain-driven abstractions",
    "In code reviews: arguing why a Decorator is safer than subclassing, or why a Strategy replaces a switch-based dispatcher",
  ],
  whereItFails: [
    "Over-engineering: applying patterns where simple procedural code suffices — Factory for a single concrete type, Observer for a single event",
    "Pattern as hammer: recognizing a pattern first and fitting the problem to it rather than deriving the pattern from the problem",
    "Inheritance abuse: deep hierarchies that violate LSP the moment a subclass needs to throw UnsupportedOperationException",
    "Ignoring thread-safety: designing shared mutable state without considering visibility, atomicity, and ordering under concurrency",
    "Anemic domain model: pushing all logic into services and leaving entities as dumb data bags — technically OOP, functionally procedural",
  ],
};

// ─── Category Metadata ────────────────────────────────────────────────────────

const categories: CategoryMeta[] = [
  {
    id: "solid-principles",
    label: "SOLID Principles",
    description:
      "The five foundational OOP design principles: SRP, OCP, LSP, ISP, DIP — the rules that separate maintainable code from legacy spaghetti",
  },
  {
    id: "creational-patterns",
    label: "Creational Patterns",
    description:
      "Patterns that control object creation: Singleton, Factory Method, Abstract Factory, Builder, Prototype — when and why construction logic deserves its own abstraction",
  },
  {
    id: "structural-patterns",
    label: "Structural Patterns",
    description:
      "Patterns that compose classes and objects into larger structures: Adapter, Decorator, Facade, Composite, Proxy — shaping how components fit together",
  },
  {
    id: "behavioral-patterns",
    label: "Behavioral Patterns",
    description:
      "Patterns that define how objects communicate and distribute responsibility: Observer, Strategy, Command, State, Template Method, Chain of Responsibility, Iterator",
  },
  {
    id: "concurrency-patterns",
    label: "Concurrency Patterns",
    description:
      "Thread-safe design: double-checked locking Singleton, immutable objects, Producer-Consumer, Read-Write lock, Future/Promise — correctness under shared mutable state",
  },
  {
    id: "oop-design",
    label: "OOP Design Principles",
    description:
      "Programming to interfaces, composition over inheritance, Law of Demeter, Tell Don't Ask, cohesion vs coupling — the mindset behind good class design",
  },
  {
    id: "data-modeling",
    label: "Domain & Data Modeling",
    description:
      "Anemic vs rich domain model, Value Objects vs Entities, Aggregate Root, invariant enforcement — how domain logic lives in the right objects",
  },
  {
    id: "lld-interview-approach",
    label: "LLD Interview Approach",
    description:
      "The structured methodology for LLD interviews: gather requirements → identify entities → define relationships → apply patterns → surface trade-offs",
  },
];

// ─── Mental Model Tree ────────────────────────────────────────────────────────

const mentalModelTree: TreeNode = {
  id: "root",
  label: "Low-Level Design",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "solid-principles",
      label: "SOLID Principles",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "srp", label: "Single Responsibility", nodeType: "concept", conceptId: "srp", importance: "critical", relatedIds: ["ocp", "cohesion-coupling"] },
        { id: "ocp", label: "Open/Closed", nodeType: "concept", conceptId: "ocp", importance: "critical", relatedIds: ["strategy-pattern", "decorator-pattern"] },
        { id: "lsp", label: "Liskov Substitution", nodeType: "concept", conceptId: "lsp", importance: "critical", relatedIds: ["composition-over-inheritance"] },
        { id: "isp", label: "Interface Segregation", nodeType: "concept", conceptId: "isp", importance: "high", relatedIds: ["dip"] },
        { id: "dip", label: "Dependency Inversion", nodeType: "concept", conceptId: "dip", importance: "critical", relatedIds: ["factory-method", "isp"] },
      ],
    },
    {
      id: "creational-patterns",
      label: "Creational Patterns",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "singleton-pattern", label: "Singleton", nodeType: "concept", conceptId: "singleton-pattern", importance: "critical", relatedIds: ["thread-safe-singleton"] },
        { id: "factory-method", label: "Factory Method", nodeType: "concept", conceptId: "factory-method", importance: "critical", relatedIds: ["abstract-factory", "dip"] },
        { id: "abstract-factory", label: "Abstract Factory", nodeType: "concept", conceptId: "abstract-factory", importance: "high", relatedIds: ["factory-method"] },
        { id: "builder-pattern", label: "Builder", nodeType: "concept", conceptId: "builder-pattern", importance: "high", relatedIds: ["srp"] },
        { id: "prototype-pattern", label: "Prototype", nodeType: "concept", conceptId: "prototype-pattern", importance: "medium" },
      ],
    },
    {
      id: "structural-patterns",
      label: "Structural Patterns",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "adapter-pattern", label: "Adapter", nodeType: "concept", conceptId: "adapter-pattern", importance: "high", relatedIds: ["facade-pattern"] },
        { id: "decorator-pattern", label: "Decorator", nodeType: "concept", conceptId: "decorator-pattern", importance: "critical", relatedIds: ["ocp", "composition-over-inheritance"] },
        { id: "facade-pattern", label: "Facade", nodeType: "concept", conceptId: "facade-pattern", importance: "high", relatedIds: ["adapter-pattern"] },
        { id: "composite-pattern", label: "Composite", nodeType: "concept", conceptId: "composite-pattern", importance: "medium", relatedIds: ["lld-interview-approach-concept"] },
        { id: "proxy-pattern", label: "Proxy", nodeType: "concept", conceptId: "proxy-pattern", importance: "high", relatedIds: ["thread-safe-singleton"] },
      ],
    },
    {
      id: "behavioral-patterns",
      label: "Behavioral Patterns",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "observer-pattern", label: "Observer", nodeType: "concept", conceptId: "observer-pattern", importance: "critical", relatedIds: ["dip"] },
        { id: "strategy-pattern", label: "Strategy", nodeType: "concept", conceptId: "strategy-pattern", importance: "critical", relatedIds: ["ocp", "composition-over-inheritance"] },
        { id: "command-pattern", label: "Command", nodeType: "concept", conceptId: "command-pattern", importance: "high", relatedIds: ["srp"] },
        { id: "state-pattern", label: "State Machine", nodeType: "concept", conceptId: "state-pattern", importance: "high", relatedIds: ["lld-interview-approach-concept"] },
        { id: "template-method", label: "Template Method", nodeType: "concept", conceptId: "template-method", importance: "medium", relatedIds: ["ocp"] },
        { id: "chain-of-responsibility", label: "Chain of Responsibility", nodeType: "concept", conceptId: "chain-of-responsibility", importance: "medium", relatedIds: ["dip"] },
      ],
    },
    {
      id: "concurrency-patterns",
      label: "Concurrency Patterns",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "thread-safe-singleton", label: "Thread-Safe Singleton", nodeType: "concept", conceptId: "thread-safe-singleton", importance: "critical", relatedIds: ["singleton-pattern"] },
        { id: "immutable-objects", label: "Immutable Objects", nodeType: "concept", conceptId: "immutable-objects", importance: "high", relatedIds: ["value-object"] },
        { id: "producer-consumer", label: "Producer-Consumer", nodeType: "concept", conceptId: "producer-consumer", importance: "high" },
      ],
    },
    {
      id: "oop-design",
      label: "OOP Design Principles",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "composition-over-inheritance", label: "Composition over Inheritance", nodeType: "concept", conceptId: "composition-over-inheritance", importance: "critical", relatedIds: ["lsp", "decorator-pattern"] },
        { id: "cohesion-coupling", label: "Cohesion & Coupling", nodeType: "concept", conceptId: "cohesion-coupling", importance: "high", relatedIds: ["srp"] },
      ],
    },
    {
      id: "data-modeling",
      label: "Domain & Data Modeling",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "value-object", label: "Value Object vs Entity", nodeType: "concept", conceptId: "value-object", importance: "high", relatedIds: ["immutable-objects"] },
        { id: "anemic-vs-rich", label: "Anemic vs Rich Domain Model", nodeType: "concept", conceptId: "anemic-vs-rich", importance: "high", relatedIds: ["srp", "cohesion-coupling"] },
      ],
    },
    {
      id: "lld-interview-approach",
      label: "LLD Interview Approach",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "lld-interview-approach-concept", label: "LLD Interview Framework", nodeType: "concept", conceptId: "lld-interview-approach-concept", importance: "critical" },
      ],
    },
  ],
};

// ─── Last Hour Summary ────────────────────────────────────────────────────────

const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "SOLID is not a checklist — it is a set of pressures: SRP fights god classes, OCP fights fragile modifications, LSP fights broken inheritance, ISP fights fat interfaces, DIP fights tight coupling to concrete types.",
    "Design patterns are solutions to recurring problems in context — always explain the problem first, then the pattern; never lead with the pattern name.",
    "Favor composition over inheritance: inheritance is an 'is-a' contract that is hard to break; composition is a 'has-a' relationship that can be swapped at runtime.",
    "Thread-safe Singleton must use double-checked locking with a volatile field (Java) or the initialization-on-demand holder idiom — naive synchronized getInstance kills performance.",
    "The LLD interview loop is: clarify scope → enumerate actors/entities → define core relationships and multiplicity → identify the one or two patterns that fit → call out trade-offs and extension points.",
    "Observer decouples publishers from subscribers but introduces memory leaks (forgotten listener registration) and unpredictable notification order — always discuss these explicitly.",
    "Builder shines when an object has many optional parameters; it prevents telescoping constructors and makes the construction sequence explicit and validated before object creation.",
  ],
  mustKnowConcepts: [
    { name: "Single Responsibility Principle", oneLiner: "A class should have exactly one reason to change — one actor whose requirements drive its evolution." },
    { name: "Open/Closed Principle", oneLiner: "Classes open for extension, closed for modification — add behaviour by adding code, not editing it." },
    { name: "Dependency Inversion Principle", oneLiner: "High-level modules must not depend on low-level modules; both must depend on abstractions." },
    { name: "Strategy Pattern", oneLiner: "Define a family of interchangeable algorithms, encapsulate each, and make them swappable without touching the client." },
    { name: "Observer Pattern", oneLiner: "One-to-many dependency: when a subject changes state, all registered observers are notified automatically." },
    { name: "Thread-Safe Singleton", oneLiner: "Exactly one instance across all threads, created lazily with double-checked locking and a volatile field to prevent partial construction." },
  ],
  topTraps: [
    "Using Singleton where dependency injection should be used — Singleton makes code untestable and hides coupling; prefer passing collaborators explicitly.",
    "Violating LSP with 'throw UnsupportedOperationException()' in a subclass override — if a subclass can't honour the base contract, inheritance is the wrong model.",
    "Confusing Decorator with Proxy: Decorator adds behaviour, Proxy controls access; both wrap, but intent and ownership differ.",
    "Designing an anemic domain model — pushing all business logic into Service classes and leaving entities as plain data containers makes the OOP surface cosmetic.",
    "Forgetting that Observer can cause memory leaks (strong references in listener list) and cascading failures when one listener throws — always discuss unsubscription and error isolation.",
  ],
};

// ─── Concepts ─────────────────────────────────────────────────────────────────

const concepts: Concept[] = [
  // ── SOLID ──────────────────────────────────────────────────────────────────
  {
    id: "srp",
    title: "Single Responsibility Principle (SRP)",
    category: "solid-principles",
    basic: "A class should have one — and only one — reason to change. 'Reason to change' maps to a specific stakeholder or actor whose requirements drive the class.",
    expected:
      "SRP is often misread as 'do one thing'. The precise definition is: a class should be responsible to one actor. A User class that handles authentication logic, email formatting, and database persistence has three reasons to change (security team, marketing team, DBA) and three axes of instability. The fix is to extract UserAuthenticator, UserEmailFormatter, and UserRepository — each owned by one actor.",
    deep:
      "SRP is the principle most violated by accretion: classes start single-purpose and grow. The smell is a class with more than one cluster of methods that cohesively serve different callers. Measure cohesion with LCOM (Lack of Cohesion of Methods): low LCOM means methods share fields; high LCOM signals multiple responsibilities. SRP at the class level mirrors the Unix philosophy at the process level. Violating SRP at scale produces 'God objects' — a single class that represents the entire application state. In microservices, SRP surfaces as service boundary design: each service owns one business capability.",
    interviewAnswer:
      "SRP says a class should have exactly one reason to change, meaning it is responsible to exactly one actor. If I have an OrderService that calculates pricing, sends confirmation emails, and writes to the database, that is three reasons to change — pricing rules change, email templates change, schema changes. I split it into PricingEngine, OrderNotifier, and OrderRepository. Each is independently testable and deployable in a separate module.",
    trap: "Do not say 'a class should do one thing' — that is the Unix principle, not SRP. The distinction matters: a class can do many related things as long as they all serve the same actor. An interviewer will probe whether you understand the actor framing.",
    memoryAnchor: "SRP = one chef, one station. The grill cook doesn't also wash dishes and seat guests. If the health inspector (actor 1) and the interior designer (actor 2) both change your class, it has two bosses — split it.",
  },
  {
    id: "ocp",
    title: "Open/Closed Principle (OCP)",
    category: "solid-principles",
    basic: "Software entities should be open for extension but closed for modification — you add new behaviour by adding new code, not by editing existing code.",
    expected:
      "OCP is achieved primarily through polymorphism: define an abstraction (interface or abstract class), and introduce new behaviour by implementing or extending it. A payment processor with a giant switch-case over payment types violates OCP — each new payment type requires modifying the switch. Replace it with a PaymentStrategy interface; each payment type is a new class that the client never touches.",
    deep:
      "OCP has a nuanced caveat: it is impossible to close a module against all types of change. Bertrand Meyer's original formulation was about inheritance; Robert Martin reinterpreted it for polymorphism. The key insight is: anticipate the axes of variation (what is likely to change?) and close against those. Do not over-abstract: premature closures add indirection with no payoff. The pattern vocabulary that most directly enforces OCP is Strategy (behaviour variation), Decorator (feature variation), and Template Method (algorithm skeleton variation). OCP also interacts with the Dependency Inversion Principle: to be closed against change, a module must depend on stable abstractions, not volatile concretions.",
    interviewAnswer:
      "OCP means: when requirements change, I want to add a new class rather than edit an existing one. If I'm building a report generator that supports PDF and CSV today, I define a ReportFormatter interface and have PdfFormatter and CsvFormatter implement it. Tomorrow, when Excel support arrives, I write ExcelFormatter — the generator never changes. The violation would be a method full of if-else or switch blocks that I must reopen every time.",
    trap: "Do not claim OCP means you never modify code — you always modify code to add the abstraction in the first place. OCP applies to stable modules: once a module is well-used and tested, protect it from change. Also, over-applying OCP produces needless abstraction for things that will never vary.",
    memoryAnchor: "OCP = a power strip. You plug in new devices (extension) without rewiring the wall (modification). The outlet is closed for renovation but open for new appliances.",
  },
  {
    id: "lsp",
    title: "Liskov Substitution Principle (LSP)",
    category: "solid-principles",
    basic: "Subtypes must be substitutable for their base types without altering the correctness of the program. Any code that uses a base class reference must work correctly when handed any of its subclasses.",
    expected:
      "LSP violations typically manifest as: (1) a subclass that throws UnsupportedOperationException for inherited methods; (2) a subclass that strengthens preconditions (requires more) or weakens postconditions (guarantees less); (3) a subclass that changes the semantic contract of overridden methods. The canonical example is Square extending Rectangle: setWidth on a Square must also change height, breaking any code that sets width and height independently on a Rectangle reference.",
    deep:
      "Formally, LSP requires: contravariance of method parameter types (subclass can accept wider types), covariance of return types (subclass can return narrower types), no new exceptions not in the supertype contract, invariant preservation, and behavioural compatibility (same meaning, not just same signature). Most OOP languages enforce syntactic covariance and contravariance partially, but behavioural compatibility is a programmer responsibility. LSP is the principle that tells you when inheritance is wrong: if you find yourself writing special-case logic ('if x is SquareSubtype then…'), the hierarchy is broken. The fix is almost always to flatten to an interface and use composition.",
    interviewAnswer:
      "LSP says any subclass instance must be usable wherever the parent type is expected, without the caller needing to know the difference. The test: if I hand your code a subclass reference wrapped in a base-type variable, does it still behave correctly? The Square-Rectangle example breaks LSP because Square's setWidth changes height, violating the Rectangle contract. The right fix is not to make Square extend Rectangle — instead, model them as separate implementations of a Shape interface.",
    trap: "Interviewers often ask about the Square-Rectangle problem. The answer is: inheritance models 'is-a' in a behavioural sense, not a taxonomic one. A square is a rectangle in geometry but not in software because the mutability contracts differ. If both are immutable value objects (area(), perimeter()), the hierarchy is fine.",
    memoryAnchor: "LSP = hiring a substitute teacher. The students (callers) shouldn't notice anything weird. If the sub starts teaching yoga instead of math, the substitution is broken — same title, wrong behavior.",
  },
  {
    id: "isp",
    title: "Interface Segregation Principle (ISP)",
    category: "solid-principles",
    basic: "No client should be forced to depend on methods it does not use. Prefer many narrow, role-specific interfaces over one fat, general-purpose interface.",
    expected:
      "A fat interface creates brittle coupling: if a class is forced to implement 10 methods but only 3 are relevant, it must provide stub implementations that violate the contract or throw exceptions. ISP says: split the interface by the set of clients that use it. A Worker interface with work() and eat() forces robots to implement eat() — split into Workable and Feedable. Each client depends only on the interface it uses.",
    deep:
      "ISP is the interface-level complement to SRP. Where SRP splits classes by actor, ISP splits interfaces by client. In practice, the violation is detected by searching for empty/throwing implementations of interface methods. The remedy is role interfaces — each interface represents one role a client plays. In dynamically typed languages (Python, JavaScript), ISP manifests as duck typing: a function that only calls .read() should accept anything with .read(), not mandate a full FileIO interface. In REST API design, ISP appears as the argument against returning monolithic response objects — clients should not receive fields they do not need.",
    interviewAnswer:
      "ISP tells me to keep interfaces narrow and client-focused. If I'm designing a Document interface with open(), save(), print(), and fax() methods, a DocumentViewer that only reads files is forced to depend on save and fax — methods it cannot meaningfully implement. I split into Readable, Writeable, Printable, and Faxable. ViewOnly clients depend only on Readable. This also makes mocking in tests trivial — mock only the interface you need.",
    trap: "ISP does not mean every interface must have exactly one method. Single-method interfaces (SAM) are common in functional code but ISP is about client need. An interface with five methods that all serve the same client cohesively is fine.",
    memoryAnchor: "ISP = restaurant menus. Don't hand the vegan a 40-page steakhouse menu — give them a focused vegan menu. Each diner (client) gets only the options (methods) they can actually use.",
  },
  {
    id: "dip",
    title: "Dependency Inversion Principle (DIP)",
    category: "solid-principles",
    basic: "High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.",
    expected:
      "DIP means your business logic (OrderService) should not directly instantiate or import your infrastructure (MySQLOrderRepository). Both should depend on an OrderRepository interface defined in the domain layer. The dependency flows inward: infrastructure adapts to domain contracts, never the other way. DIP is what makes Dependency Injection (the technique) necessary: since high-level modules no longer create their dependencies, something else must provide them.",
    deep:
      "DIP is the principle that makes large-scale architecture possible. Without it, your entire codebase is a single connected component — a change to a low-level database driver forces recompilation of business logic. With DIP, you invert the dependency graph: the core domain is dependency-free, and all infrastructure points inward. This is the Clean Architecture / Hexagonal Architecture / Ports & Adapters architecture. In Java, this is enforced by putting interfaces in the domain module and implementations in the infrastructure module. The inversion of the Dependency Inversion name is about the inversion of control flow vs source code dependency: the high-level module calls the low-level module at runtime (control flows down), but the source code dependency is inverted (low-level implements the interface defined in high-level).",
    interviewAnswer:
      "DIP says my OrderService should not import MySQLOrderRepository directly — it should import an OrderRepository interface defined in the same domain package. MySQLOrderRepository implements that interface. Now if I swap MySQL for Postgres, the service never changes. DIP also makes unit testing clean: I inject a MockOrderRepository that satisfies the interface, no real database needed. This principle is the motivation behind dependency injection containers and the ports-and-adapters architecture.",
    trap: "DIP is not the same as Dependency Injection. DI is the technique (passing dependencies); DIP is the principle (depend on abstractions). You can violate DIP while using DI if you inject a concrete class rather than an interface.",
    memoryAnchor: "DIP = wall outlets. Your laptop (high-level) doesn't hardwire to a specific power plant (low-level). Both depend on the standard outlet interface. Swap coal for solar — the laptop never knows.",
  },

  // ── Creational Patterns ────────────────────────────────────────────────────
  {
    id: "singleton-pattern",
    title: "Singleton Pattern",
    category: "creational-patterns",
    basic: "Ensure a class has exactly one instance and provide a global access point to it. Use when exactly one object must coordinate actions across the system.",
    expected:
      "The naive implementation (static instance, synchronized getInstance) synchronizes on every call. The better approach is the initialization-on-demand holder: a private static inner class holds the instance, initialized by the JVM's class loader — which is inherently thread-safe and lazy. Alternatively, use a Java enum Singleton (serialization-safe, reflection-safe). Common use cases: thread pool, configuration manager, logging service, connection pool.",
    deep:
      "Singleton has three thread-safety concerns: (1) visibility — without volatile, the JVM may reorder the constructor and assignment, leaving another thread with a partially constructed object; (2) atomicity — check-then-act on null is not atomic; (3) the JVM double-checked locking fix requires volatile in Java 5+ because the Java Memory Model was fixed in JSR-133. The enum Singleton avoids all three: the JVM guarantees each enum value is instantiated exactly once. The deeper critique of Singleton is architectural: it is a global variable with a design-pattern coat. It makes classes that depend on it hard to test (cannot be mocked without reflection or PowerMock) and creates hidden coupling. In most modern code, Singleton is replaced by a DI container scope — the framework controls the lifecycle, your code just declares it wants a single instance.",
    interviewAnswer:
      "I implement Singleton via the initialization-on-demand holder idiom: a private static nested class holds the instance field, which is initialized when the holder class is first loaded. JVM class loading is lazy and thread-safe, so this gives us lazy initialization and thread-safety with zero synchronization overhead on the hot path. In a modern codebase I'd mark it as a singleton scope in a DI framework rather than hardcoding the pattern — it's testable and the lifecycle is explicit.",
    trap: "Double-checked locking without volatile is broken in Java before 5.0. Even in Java 5+, the instance field must be volatile to prevent the JVM from publishing a partially constructed object due to instruction reordering. The safe alternatives are: volatile DCL, enum Singleton, or the holder idiom.",
    memoryAnchor: "Singleton = Highlander: 'There can be only one.' One ring, one throne, one instance. But unlike the movie, your singleton is a global celebrity everyone secretly depends on — famous and hard to replace.",
  },
  {
    id: "factory-method",
    title: "Factory Method Pattern",
    category: "creational-patterns",
    basic: "Define an interface for creating an object but let subclasses decide which class to instantiate. Factory Method defers instantiation to subclasses.",
    expected:
      "Factory Method is a template method applied to object creation. The creator defines a createProduct() method (the factory method); concrete creators override it. Callers use the creator through the abstract interface, never knowing what concrete product they receive. This enforces DIP: the creator depends only on the Product interface. Common use cases: parsing frameworks (createParser returns XMLParser or JSONParser based on format), UI frameworks (createButton returns WinButton or MacButton), logistics (createTransport returns Truck or Ship).",
    deep:
      "Factory Method is most useful when the creating class doesn't know ahead of time what class it needs to instantiate, or when subclasses need the ability to vary what they create. It differs from Simple Factory (a static method that switches on type — not a GoF pattern) and from Abstract Factory (a family of related factories). Factory Method is a single-level deferral; Abstract Factory is a family-level deferral. Factory Method typically yields a parallel hierarchy: one for creators, one for products. This can explode combinatorially. A modern alternative is to use a registry — a map from a key to a factory lambda — which achieves OCP without subclassing.",
    interviewAnswer:
      "Factory Method separates the question of 'what to create' from 'how to use it'. My DocumentParser base class defines a createParser() method. XMLDocumentParser overrides it to return an XMLParser. The client calls parser.parse() without ever knowing which implementation it has. This satisfies DIP — the client depends only on the Parser interface — and OCP — adding YAML support means adding YAMLParser and YAMLDocumentParser without touching the base. For interview purposes: Factory Method = one product type, deferred to subclass; Abstract Factory = multiple related product types, deferred to a factory family.",
    trap: "Factory Method is not just a static method that creates objects — that is a Simple Factory, which is not a GoF pattern. Factory Method is a virtual method overridden by a subclass. If there is no subclass deferral, it is not Factory Method.",
    memoryAnchor: "Factory Method = a pizza shop franchise. The base recipe says 'make dough' but each city's branch (subclass) decides whether it's New York thin crust or Chicago deep dish. The menu (interface) stays the same.",
  },
  {
    id: "abstract-factory",
    title: "Abstract Factory Pattern",
    category: "creational-patterns",
    basic: "Provide an interface for creating families of related or dependent objects without specifying their concrete classes. Ensures products within a family are compatible.",
    expected:
      "Abstract Factory groups related factories behind an interface. A UIFactory might have createButton() and createCheckbox(); WindowsUIFactory and MacUIFactory provide platform-consistent implementations. The client works exclusively through the UIFactory interface — swap the factory, get a different look-and-feel without touching a single client line. This is one level above Factory Method: instead of deferring one product, you defer an entire product family.",
    deep:
      "Abstract Factory is the pattern when the constraint is product family consistency. If a client should never mix MacButton with WindowsCheckbox, an Abstract Factory enforces that constraint structurally: the factory for Windows only produces Windows widgets. The trade-off: adding a new product type (createScrollbar()) requires changing the AbstractFactory interface and all its implementations — a violation of OCP. Abstract Factory shines when the set of products is fixed and the set of platforms varies. The pattern is common in cross-platform UI toolkits (AWT, SWT), database connector families (JPA providers), and testing (a TestDoubleFactory that produces mocks and stubs with consistent wiring).",
    interviewAnswer:
      "I use Abstract Factory when I need to guarantee a family of products is internally consistent. In a cross-platform UI: AbstractUIFactory declares createButton(), createDialog(), createTextField(). WindowsFactory and MacFactory each produce platform-specific widgets. The application bootstraps by selecting the factory based on OS, then every component is created through that factory — no mixing. The downside I always flag: extending the product family (new widget type) requires changes to every concrete factory, so this pattern is best when the family is stable.",
    trap: "Abstract Factory vs Factory Method: Abstract Factory is for families of products (multiple product types, one factory per platform). Factory Method is for a single product type (one product, creation deferred to a subclass). Conflating them is the #1 interview mistake on creational patterns.",
    memoryAnchor: "Abstract Factory = IKEA vs Pottery Barn. Pick a store (factory) and everything you buy — table, chair, lamp — matches the same style. You never mix IKEA legs with Pottery Barn tops.",
  },
  {
    id: "builder-pattern",
    title: "Builder Pattern",
    category: "creational-patterns",
    basic: "Separate the construction of a complex object from its representation, allowing the same construction process to create different representations. Eliminates telescoping constructors.",
    expected:
      "Builder is most valuable when a class has many optional parameters. Instead of constructors with 8 arguments (most null), a Builder accumulates parameters and constructs the object only when build() is called. Fluent builders enable readable, named-parameter-style construction: new Pizza.Builder().size(LARGE).crust(THIN).addTopping(CHEESE).build(). The builder can validate invariants in build() before object creation — fail fast, not at use time.",
    deep:
      "Builder has two forms: (1) the GoF Director/Builder/Product trio for constructing complex composite objects step-by-step; (2) the modern fluent/item builder (Joshua Bloch's Effective Java Item 2) for optional parameter management. The GoF form is used in document builders (HTML, SQL query builders, protobuf builders). The fluent form is ubiquitous in modern APIs (Retrofit, OkHttp, Spring Security). A key design decision: whether the Builder is a static nested class of the Product (preferred for encapsulation — access to private fields) or a separate class. Immutability: Builder pattern is the primary way to construct immutable objects with many fields — all fields are set on the builder, and build() creates a final, unmodifiable Product.",
    interviewAnswer:
      "Builder solves two problems: telescoping constructors (8-argument overloads) and invalid intermediate state (an object that is partially constructed). I put a static Builder nested class in the Product. Each setter returns this for chaining. build() validates all required fields and invariants before calling the Product's private constructor. The object is immutable after construction. I always mention the validation opportunity in build() — it is the key advantage over setting fields directly or using a no-arg constructor with setters.",
    trap: "Builder is not the same as a factory. Factory decides which type to create; Builder constructs one specific type step-by-step. The interviewer may ask when to prefer Builder over a factory — the answer is when the same type has many construction variants driven by parameter choices, not by polymorphic type selection.",
    memoryAnchor: "Builder = Subway sandwich artist. You pick bread, then meat, then cheese, then veggies, then sauce — step by step. At the end they wrap it up (build()). You never get a half-made sandwich thrown at you.",
  },
  {
    id: "prototype-pattern",
    title: "Prototype Pattern",
    category: "creational-patterns",
    basic: "Create new objects by copying (cloning) an existing object, rather than constructing from scratch. Useful when construction is expensive or the type is unknown at compile time.",
    expected:
      "Prototype is appropriate when: (1) object initialization is costly (e.g., loading configuration from DB); (2) the system should be independent of how its products are created; (3) classes to instantiate are specified at runtime. Java implements this via Cloneable and clone(); most modern frameworks use copy constructors or serialization-based cloning. Shallow copy vs deep copy is the critical decision: shallow shares references (dangerous for mutable nested objects); deep duplicates the entire object graph.",
    deep:
      "In Java, clone() is problematic: it is protected in Object, requires Cloneable (a marker interface with no methods), and the default behavior is a shallow copy — which silently shares mutable sub-objects. Effective Java recommends avoiding clone() in favor of copy constructors or static factory methods that accept the source object. Prototype is rarely used directly as a standalone pattern in modern code — it surfaces in object pool implementations (pre-warm a pool of clones), in undo/redo stacks (save state as a prototype snapshot), and in some serialization frameworks. The pattern is more common in JavaScript (prototypal inheritance is prototype at the language level).",
    interviewAnswer:
      "Prototype is the pattern for cloning. I use it when constructing a fresh object is expensive — say, a report template that takes 500ms to build from raw data. I build it once, then clone it for each user session. The critical question is shallow vs deep copy. I use a copy constructor rather than clone() to control exactly what is deep-copied versus shared. In practice, I most often see prototype in undo/redo systems (each state is a clone of the previous) and in game engines (spawn an enemy from a template prototype).",
    trap: "The shallow-vs-deep copy issue is where most prototype discussions break down. Shallow copy shares mutable sub-objects across clones — mutating one mutates all. Always specify whether your clone is shallow or deep, and justify why.",
    memoryAnchor: "Prototype = photocopying a document. Fast and cheap, but if the original has a sticky note (mutable reference), the copy just has a picture of it — you can't peel it off. Deep copy = rewriting the whole doc by hand, sticky notes included.",
  },

  // ── Structural Patterns ────────────────────────────────────────────────────
  {
    id: "adapter-pattern",
    title: "Adapter Pattern",
    category: "structural-patterns",
    basic: "Convert the interface of a class into another interface that clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.",
    expected:
      "Two forms: class adapter (extends the adaptee — requires multiple inheritance, common in C++) and object adapter (wraps the adaptee via composition — preferred in Java/Go). Use cases: wrapping a third-party library behind your own interface, integrating legacy systems, making new code conform to an existing interface contract. In a payment system: your domain defines a PaymentGateway interface; a StripeAdapter wraps the Stripe SDK and translates Stripe's API into your interface.",
    deep:
      "Object adapter via composition is preferred because it does not bind you to the adaptee's class hierarchy, allows adapting classes you cannot subclass (final), and allows adapting multiple adaptees in one adapter. Adapter differs from Facade: Adapter makes one interface look like another (one-to-one mapping); Facade simplifies a complex subsystem behind a single unified interface (many-to-one). Adapter differs from Proxy: Adapter changes the interface; Proxy keeps the interface identical and controls access. Adapter is the pattern of choice for the Anti-Corruption Layer in Domain-Driven Design — it translates between bounded contexts so your domain model is not polluted by external nomenclature.",
    interviewAnswer:
      "Adapter is my go-to for third-party library integration. I define a PaymentGateway interface in my domain. Then I write a StripeAdapter that holds a StripeClient reference and implements PaymentGateway — translating my domain's charge(Money amount) into Stripe's createCharge() call. The domain never imports the Stripe SDK. If I need to switch to Braintree, I write a BraintreeAdapter and change one DI binding. I always use object adapter (composition) over class adapter (inheritance) — it avoids the adaptee's class hierarchy entirely.",
    trap: "Adapter does not add behaviour — it translates. If you find yourself adding logic in the adapter beyond translation, you may have misidentified the pattern. That logic belongs in a service or decorator.",
    memoryAnchor: "Adapter = a travel plug converter. Your US laptop charger (old interface) meets a European wall socket (expected interface). The adapter doesn't change the voltage — it just makes the prongs fit.",
  },
  {
    id: "decorator-pattern",
    title: "Decorator Pattern",
    category: "structural-patterns",
    basic: "Attach additional responsibilities to an object dynamically without modifying its class. Decorators provide a flexible alternative to subclassing for extending functionality.",
    expected:
      "Decorator wraps an object that implements the same interface, delegating to the wrapped object and adding behaviour before or after. Classic example: Java I/O streams — BufferedReader wraps FileReader, GZIPInputStream wraps FileInputStream. Each wrapper adds one responsibility. This directly implements OCP: you extend behaviour without modifying the original class. Decorator vs Inheritance: inheritance is static (decided at compile time); Decorator is dynamic (composed at runtime and stackable).",
    deep:
      "Decorator and Inheritance both solve 'add behaviour to a class', but their trade-offs diverge sharply. Inheritance creates a parallel hierarchy that explodes combinatorially: to have a LoggedCachedEncryptedRepository you need 3! = 6 subclasses for all orderings. Decorator composes: new LoggingDecorator(new CachingDecorator(new EncryptingDecorator(repository))). Order matters and is explicit. Downsides of Decorator: (1) many small objects make debugging harder — stack traces show many wrapper frames; (2) identity equality breaks — decorated object is not == original; (3) if the component interface is fat, each decorator must implement all methods, even those it does not decorate (ISP violation risk). Modern use: Spring AOP generates decorator-like proxies at runtime for @Transactional, @Cacheable, @Retryable.",
    interviewAnswer:
      "Decorator is my preferred alternative to subclassing when I need stackable, runtime-configurable behaviour additions. I define a DataSource interface; FileDataSource is the concrete component. EncryptionDecorator, CompressionDecorator, and LoggingDecorator all implement DataSource and accept a DataSource in their constructor. I compose them: new LoggingDecorator(new CompressionDecorator(new FileDataSource('data.txt'))). Adding logging does not touch FileDataSource. Removing logging is one line. With subclassing, I'd need LoggedCompressedFileDataSource — the hierarchy explodes. I always discuss the identity and debugging trade-offs.",
    trap: "The Decorator and Proxy patterns look identical structurally (both wrap the same interface). The distinction is intent: Decorator adds behaviour; Proxy controls access (lazy init, caching, access control, remote proxy). In interviews, always state the intent before the structure.",
    memoryAnchor: "Decorator = Russian nesting dolls (matryoshka). Each layer wraps the previous one and adds something — paint, glitter, a hat. Unwrap them all and the core doll is unchanged. Stack as many layers as you want.",
  },
  {
    id: "facade-pattern",
    title: "Facade Pattern",
    category: "structural-patterns",
    basic: "Provide a simplified interface to a complex subsystem. A Facade reduces the complexity of using a subsystem and decouples the client from subsystem internals.",
    expected:
      "Facade does not eliminate the subsystem — it hides it. The subsystem classes still exist and can be used directly for advanced use cases. Common examples: a VideoConverter facade that hides codec selection, audio stream management, and format negotiation behind a single convert(file, format) method; a Home Theatre facade that hides amplifier, DVDPlayer, Projector, and Screen behind watchMovie() and endMovie().",
    deep:
      "Facade vs Adapter: Adapter makes an incompatible interface compatible (one-to-one); Facade simplifies many interfaces into one (many-to-one). Facade vs Mediator: Facade is a one-way simplification (clients call the facade; the facade orchestrates the subsystem); Mediator is a two-way hub where subsystem components communicate through the mediator, and the mediator may call back to them. Facade is appropriate for layered architecture: each layer exposes a Facade to the layer above, hiding internal complexity. The Facade becomes the API boundary. A Facade that starts managing state or adding significant business logic has become a service or mediator — the line is worth discussing in interviews.",
    interviewAnswer:
      "Facade is the pattern for API design within a layered system. My OrderFacade exposes placeOrder(cart, customer) — behind the scenes it orchestrates InventoryService, PricingEngine, PaymentGateway, NotificationService, and AuditLog. The client (REST controller) calls one method. The subsystem components can still be used independently for admin workflows. I distinguish Facade from Mediator: Facade is a one-directional simplification — the client calls the facade, which calls the subsystem; the subsystem never calls the facade back.",
    trap: "Facade can grow into a god class if it accretes business logic rather than pure delegation. Monitor facade method count and complexity. If the facade is making decisions (not just orchestrating), refactor the decisions back into the appropriate subsystem.",
    memoryAnchor: "Facade = a hotel concierge. You say 'plan my evening' and they call the restaurant, the theatre, and the taxi company behind the scenes. You never dial three numbers yourself — one friendly face handles the chaos.",
  },
  {
    id: "composite-pattern",
    title: "Composite Pattern",
    category: "structural-patterns",
    basic: "Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.",
    expected:
      "The pattern defines a Component interface implemented by both Leaf (no children) and Composite (has children). Clients call operations on a Component reference — whether it's a leaf or a composite is transparent. Examples: file system (File and Directory both implement FileSystemNode with size() — directory.size() recursively sums children); UI widget tree (Button and Panel both implement Widget with render()); expression trees (Literal and BinaryExpression both implement Expression with evaluate()).",
    deep:
      "The classic Composite challenge is the 'safe vs transparent' trade-off: should add()/remove()/getChildren() be on the Component interface (transparent — callers can call on a Leaf, which must throw; or no-op) or only on Composite (safe — callers need to cast to Composite to manage children)? The GoF recommends transparency for ease of use; in practice, safety (type-check explicitly) is more common. Composite is also naturally recursive — any composite operation that visits the tree must handle cycles if the structure is a graph rather than a true tree. This is common in file system symlinks or UI component references.",
    interviewAnswer:
      "Composite is the pattern when I need to treat a tree uniformly. In a permissions system: Permission is the component interface with isAllowed(action). SinglePermission is a leaf; PermissionGroup is a composite that checks all children. The service calls permission.isAllowed() without knowing whether it's a single permission or a group of groups. This is also the pattern for menu systems, expression parsers, and organizational hierarchies. The design decision I always flag: where to put add/remove — on the component interface for transparency, or only on the composite class for type safety.",
    trap: "Composite assumes a tree structure. If the structure has cycles (directed graph), recursive operations must track visited nodes or they will loop infinitely.",
    memoryAnchor: "Composite = file folders. A folder can contain files AND other folders. 'Get size' works the same whether you call it on a single file or a folder-of-folders — it just recurses down the tree.",
  },
  {
    id: "proxy-pattern",
    title: "Proxy Pattern",
    category: "structural-patterns",
    basic: "Provide a surrogate or placeholder for another object to control access to it. The proxy and the real object implement the same interface.",
    expected:
      "Four common proxy types: (1) Virtual proxy — lazy-initializes an expensive object (loads an image only when first rendered); (2) Protection proxy — checks access rights before delegating; (3) Remote proxy — represents a remote object (RMI stub, gRPC stub); (4) Caching proxy — caches results of expensive operations. Proxy is the structural backbone of AOP: Spring's @Transactional generates a dynamic proxy that wraps your service method with transaction management.",
    deep:
      "In Java, dynamic proxies (java.lang.reflect.Proxy and CGLIB) generate proxy classes at runtime without writing boilerplate. Spring and Hibernate depend on this heavily. The internal mechanics: CGLIB creates a subclass of the proxied class and overrides methods; JDK dynamic proxy creates a proxy for interfaces only using reflection and an InvocationHandler. Proxy vs Decorator: structurally identical — both wrap an object with the same interface. Intent separates them: Decorator enriches behaviour; Proxy controls access, adds cross-cutting concerns (logging, security, transaction), or delays initialization. Proxy is also used for the Null Object pattern (a no-op proxy that implements the interface with empty implementations).",
    interviewAnswer:
      "I use proxy most often for cross-cutting concerns without modifying the target class. A LoggingProxy implements the same service interface, wraps the real service, and logs every method call's duration and result. The client gets the proxy injected — it never knows. Lazy loading is another scenario: a HeavyReportProxy holds no data until the first call to getReport() — then it loads from the DB, caches, and returns. I always clarify: Proxy keeps the same interface and controls access; Decorator keeps the same interface and adds behaviour. The line is intent, not structure.",
    trap: "JDK dynamic proxy only proxies interfaces — it cannot proxy a concrete class directly. CGLIB subclasses the concrete class, but final classes and final methods cannot be proxied. Know which Spring beans are not AOPable (final classes, @Configuration with proxyBeanMethods=false).",
    memoryAnchor: "Proxy = a bouncer at a club. Same door (interface), but the bouncer decides who gets in (access control), checks IDs (protection proxy), or tells you 'the DJ is setting up' until the real party starts (virtual/lazy proxy).",
  },

  // ── Behavioral Patterns ────────────────────────────────────────────────────
  {
    id: "observer-pattern",
    title: "Observer Pattern",
    category: "behavioral-patterns",
    basic: "Define a one-to-many dependency between objects so that when one object (Subject) changes state, all its dependents (Observers) are notified and updated automatically.",
    expected:
      "Subject maintains a list of Observers and calls notify() on state change. Observers register and deregister themselves. Classic Java: java.util.Observable (deprecated) and EventListener. Modern equivalent: event bus (Guava EventBus, Spring ApplicationEventPublisher), reactive streams (RxJava Observable, Project Reactor Flux). Observer enforces DIP: Subject depends on the Observer interface, not concrete observers.",
    deep:
      "Observer has several known failure modes: (1) Memory leaks — Subject holds strong references to Observer; if the Observer is not explicitly removed, it is never GC'd. Solution: use WeakReference or ensure explicit unsubscription lifecycle. (2) Lapsed listener problem — deregistered observer still holds a reference to the Subject. (3) Notification order — observers are called in registration order by default; order dependency between observers is a hidden coupling. (4) Cascading updates — observer A's update triggers B's update which triggers A's update — infinite loop. (5) Exception isolation — if observer A throws, observers B–N are not called. Reactive streams (Project Reactor, RxJava) solve most of these: backpressure, error channels, composable operators, and declarative subscription management.",
    interviewAnswer:
      "Observer decouples the Subject from the logic that reacts to its changes. In an e-commerce order system: OrderService is the Subject; EmailNotifier, InventoryUpdater, and AnalyticsTracker are Observers. When an order completes, the service fires a single event and each observer handles it independently. I always raise two issues: memory leaks from forgotten listener deregistration, and exception isolation (wrap each notification in try/catch so one bad observer doesn't block the rest). For production, I'd use an event bus or message queue to get delivery guarantees and async processing.",
    trap: "Observer assumes synchronous in-process communication. If an observer does IO (sends email, writes to DB), the Subject blocks. For IO-heavy observers, use an async event bus or a message broker (Kafka, RabbitMQ). Do not conflate Observer (in-process, synchronous by default) with publish-subscribe (cross-process, async, broker-mediated).",
    memoryAnchor: "Observer = YouTube subscriptions. The creator (subject) uploads a video, and every subscriber (observer) gets notified automatically. The creator has no idea who's watching — they just hit publish and the bell rings everywhere.",
  },
  {
    id: "strategy-pattern",
    title: "Strategy Pattern",
    category: "behavioral-patterns",
    basic: "Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.",
    expected:
      "Context class holds a reference to a Strategy interface. The strategy is injected (constructor or setter injection). Clients pick a strategy; the context executes it. Examples: sorting strategy (QuickSort, MergeSort, BucketSort — selected based on data characteristics); payment strategy (CreditCard, PayPal, Crypto — selected at checkout); compression strategy (Gzip, Brotli, LZ4 — selected based on content type). Strategy directly implements OCP: new algorithms are new classes; the context never changes.",
    deep:
      "Strategy vs Template Method: Strategy externalizes the algorithm completely (the concrete algorithm is a separate class injected into the context); Template Method internalizes the skeleton (base class defines the steps; subclass overrides specific steps — algorithm is still part of the inheritance hierarchy). Rule of thumb: prefer Strategy when the variation is a self-contained algorithm that can be reused across multiple contexts; prefer Template Method when the variation is a small customization point within a larger fixed algorithm. In functional languages, Strategy is trivially implemented as a higher-order function — pass a function. In Java 8+, Strategy interfaces with one method are functional interfaces and can be replaced by lambdas, eliminating the need for concrete strategy classes.",
    interviewAnswer:
      "Strategy is the pattern that replaces switch-case polymorphism with object polymorphism. Instead of a Sorter.sort() method with if (algorithm == 'quick') ... else if (algorithm == 'merge'), I have a SortStrategy interface with sort(int[] data) and QuickSortStrategy, MergeSortStrategy implementations. The Sorter is injected with a strategy at construction time. To add heapsort, I add HeapSortStrategy — the Sorter is untouched. In Java 8+ I can pass a method reference or lambda for simple strategies, which eliminates the ceremony of a dedicated class.",
    trap: "Strategy increases the number of objects in the system. For simple cases where algorithms will never vary, the pattern is over-engineering. The signal to use Strategy is when you catch yourself writing if-else chains or switch statements based on a type/mode flag.",
    memoryAnchor: "Strategy = GPS navigation modes. Same destination, but you swap the algorithm: fastest route, shortest route, avoid tolls. The car (context) doesn't care which one — it just follows the directions it's given.",
  },
  {
    id: "command-pattern",
    title: "Command Pattern",
    category: "behavioral-patterns",
    basic: "Encapsulate a request as an object, allowing you to parameterize clients with different requests, queue or log requests, and support undoable operations.",
    expected:
      "A Command object contains the receiver reference, the action to perform, and any parameters. The invoker calls command.execute(); the client creates the command and wires receiver to command to invoker. The key power: execute() and undo() as first-class operations. Use cases: text editor operations (each keystroke is a command, undo stack pops commands), task queues (commands serialized and dispatched to workers), macro recording (record a list of commands, replay them).",
    deep:
      "Command is the pattern of deferred execution. By encapsulating the action, you can: (1) Queue it for later execution; (2) Log it to disk for durability and replay; (3) Undo it by maintaining the previous state or a reverse command. Undo implementation: snapshot-based (save full state before execute — simple but memory-intensive) or inverse-based (store the inverse command — space-efficient but not always possible). Command is related to Memento (snapshot-based undo uses Memento to save state). In distributed systems, Command is the basis for the Command Query Responsibility Segregation (CQRS) pattern — write operations are commands, stored as events. This enables event sourcing: replay all commands to reconstruct state at any point in time.",
    interviewAnswer:
      "Command is the pattern for undo/redo and queued execution. In a text editor: every user action (InsertTextCommand, DeleteTextCommand, FormatCommand) is a Command object with execute() and undo(). The editor maintains an undo stack. Ctrl-Z pops the top command and calls undo(). Ctrl-Y re-executes it. The same pattern works for distributed job queues: serialize the command object, push it to a queue, workers call execute(). I always discuss undo strategy: snapshot-based (save entire document state before each command — simple but O(n) space) vs inverse command (for InsertText('hello'), undo is DeleteText(position, 5) — O(1) space but requires computing the inverse).",
    trap: "Command vs Strategy: both encapsulate behavior. Strategy encapsulates an interchangeable algorithm with no receiver — the context IS the receiver. Command encapsulates a specific action on a specific receiver — the command and receiver are separate. Commands are usually short-lived (one action); Strategies are usually long-lived (injected into a context and reused).",
    memoryAnchor: "Command = a restaurant order ticket. The waiter writes down 'one burger, no onions' (the command), pins it to the board (queue), and the cook (receiver) executes it later. You can even cancel the ticket (undo) before the grill fires.",
  },
  {
    id: "state-pattern",
    title: "State Machine / State Pattern",
    category: "behavioral-patterns",
    basic: "Allow an object to alter its behavior when its internal state changes. The object will appear to change its class. State-specific behavior is encapsulated in separate State classes.",
    expected:
      "Context holds a reference to a State interface. When an event occurs, the context delegates to the current state. The state handles the event (and may transition the context to a new state). This eliminates if-else or switch chains on state flags. Classic examples: vending machine states (idle, coin-inserted, dispensing, out-of-stock); traffic light (red/yellow/green with time-based transitions); order lifecycle (pending, paid, shipped, delivered, cancelled).",
    deep:
      "State vs Strategy: structurally identical — both have a Context delegating to an interface. The difference: in Strategy, the context does not change its strategy during normal operation (it is injected once); in State, the state changes during operation as part of the state machine's transitions. Who owns transitions? In GoF State, the concrete states set the next state on the context (state-driven transitions); alternatively, a transition table in the context maps (currentState, event) → nextState (table-driven transitions). Table-driven is more declarative and easier to extend but requires the state machine to be aware of all transitions. For complex state machines, consider a dedicated state machine library (Spring State Machine, XState) — they provide visual modeling, persistence, and history states.",
    interviewAnswer:
      "State is the pattern for objects whose behavior changes dramatically based on internal state. For an Order object: rather than if (status == PENDING) doX() else if (status == PAID) doY(), I have a State interface with ship(), cancel(), refund() methods. PendingState, PaidState, ShippedState each implement the interface — PendingState.cancel() transitions to CancelledState; PaidState.cancel() triggers a refund first. The Order context delegates all lifecycle methods to its current state. Adding a new state (BackorderedState) is a new class, not a change to Order. I always discuss who owns transitions and mention the state machine framework option for complex lifecycles.",
    trap: "For simple two- or three-state objects with minimal transition logic, State is over-engineering. The pattern earns its complexity when states are 5+, transition logic is non-trivial, or state-specific behaviour spans many methods.",
    memoryAnchor: "State = a vending machine. Insert coin and it changes personality: from 'insert coin please' mode to 'pick your snack' mode. Same machine, totally different behavior depending on what state it's in. Each state is a different mood.",
  },
  {
    id: "template-method",
    title: "Template Method Pattern",
    category: "behavioral-patterns",
    basic: "Define the skeleton of an algorithm in a base class, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.",
    expected:
      "The base class implements the algorithm's invariant steps and declares abstract or hook methods for the variable steps. Subclasses override hooks without redefining the overall flow. Examples: data mining framework (openFile(), parseData(), analyzeData(), generateReport() — open and report are fixed; parse and analyze are abstract); JUnit's test lifecycle (setUp, test, tearDown — the skeleton is fixed, test methods are abstract).",
    deep:
      "Template Method is inheritance-based; Strategy is composition-based. Template Method is appropriate when the algorithm skeleton is the primary value and variations are small customizations within a known structure. The downside: it can lead to deep class hierarchies if there are many subclasses, and the Hollywood Principle ('don't call us, we'll call you') makes flow harder to follow. The 'hook' method (a concrete no-op method that subclasses can optionally override) vs 'abstract step' (mandatory override) is a design decision — hooks provide optional extension points without requiring every subclass to implement every step. Template Method appears in every framework: servlet lifecycle (init, service, destroy), Spring's JdbcTemplate (execute wraps connection management; the query logic is provided by the caller as a callback — a functional Template Method).",
    interviewAnswer:
      "Template Method is my pattern when I want subclasses to plug into a fixed algorithm without rewriting it. My DataImporter base class defines import() which calls validate(), transform(), load() in sequence, wrapping each in error handling and logging. Concrete classes like CSVImporter and JSONImporter override validate() and transform() only. The import orchestration never changes. I prefer this over Strategy when the variation is small relative to the fixed algorithm, and when the subclass relationship is genuinely 'is-a specialization'. For more varied algorithms, Strategy is more flexible.",
    trap: "Template Method enforces compile-time coupling via inheritance. If the hook methods change signatures, all subclasses must change. Prefer Strategy when the variation point may evolve independently of the skeleton.",
    memoryAnchor: "Template Method = a tax form. The IRS defines the steps (income, deductions, calculate, sign) but you fill in YOUR specific numbers. The skeleton is fixed; the blanks are yours to override.",
  },
  {
    id: "chain-of-responsibility",
    title: "Chain of Responsibility",
    category: "behavioral-patterns",
    basic: "Pass a request along a chain of handlers. Each handler decides to process the request or pass it to the next handler. Decouples the sender from the receiver.",
    expected:
      "Each handler holds a reference to the next handler. The client sends a request to the first handler; handlers process or forward. Examples: HTTP middleware/filter chains (authentication → authorization → rate limiting → logging → handler); Java servlet filter chain; logging levels (ERROR handler processes errors; WARNING handler processes warnings or passes up; INFO passes to DEBUG); GUI event bubbling (child component handles click or bubbles to parent).",
    deep:
      "Chain of Responsibility provides flexibility in assembling pipelines but has a debugging challenge: tracing which handler processed a request requires logging at each node. Two variants: (1) one handler processes (classic CoR — request stops at the first capable handler); (2) all handlers process (pipeline — used in middleware). For pipelines, the chain is better modeled as a list of handlers iterated by a dispatcher, not a recursive linked list. The pattern is directly implemented in Java Servlet filters, Node.js middleware (Express.js app.use()), and Spring Security filter chains. Each middleware function calls next() to continue the chain or returns a response to short-circuit.",
    interviewAnswer:
      "Chain of Responsibility is the pattern behind every middleware stack I've built. In an API gateway: the request passes through AuthenticationFilter, AuthorizationFilter, RateLimitFilter, RequestValidationFilter, and finally the business handler. Each filter either short-circuits (returns 401/429) or calls chain.doFilter(). Adding a new concern (IP allowlist check) is adding one filter class and inserting it in the chain — no existing filters change. I distinguish classic CoR (first capable handler wins) from pipeline (all handlers execute) — middleware is almost always a pipeline.",
    trap: "Classic CoR has no guarantee that any handler processes the request — if no handler matches, the request is dropped silently. Always have a default handler or explicit error for unhandled requests.",
    memoryAnchor: "Chain of Responsibility = airport security checkpoints. Your bag goes through ID check, then X-ray, then customs. Each station either stops you or waves you through to the next. Add a new scanner? Just insert it in the line.",
  },

  // ── Concurrency Patterns ───────────────────────────────────────────────────
  {
    id: "thread-safe-singleton",
    title: "Thread-Safe Singleton",
    category: "concurrency-patterns",
    basic: "Ensure exactly one instance is created across multiple threads, with lazy initialization and no unnecessary synchronization on the hot path.",
    expected:
      "Three correct implementations: (1) Initialization-on-demand holder: private static class Holder { static final T INSTANCE = new T(); } — JVM class loading is lazy and thread-safe, zero synchronization overhead. (2) Enum Singleton: enum T { INSTANCE; } — reflection-safe, serialization-safe, JVM-guaranteed. (3) Double-checked locking with volatile: check null, synchronize, check null again, instantiate — volatile prevents partial construction visibility.",
    deep:
      "The broken DCL pattern (without volatile) was the source of countless subtle bugs pre-Java 5. The issue: in the Java Memory Model before JSR-133, memory writes could be reordered by the JVM. Thread A could set the instance reference before the constructor had finished — Thread B would see a non-null but incompletely initialized object. The volatile keyword (JSR-133 semantics) establishes a happens-before relationship: the write to the instance field (after full construction) happens-before any subsequent read by another thread. The enum Singleton is the safest: enum values are initialized by the class loader, which is thread-safe; Java's serialization mechanism guarantees enum singletons survive deserialization (serialized enums are resolved to the existing constant); and reflection cannot create new enum instances (IllegalArgumentException). In modern code, prefer DI container scoping over manual Singleton — Spring's @Bean with no scope annotation defaults to singleton scope, managed by the container.",
    interviewAnswer:
      "My preferred thread-safe Singleton is the initialization-on-demand holder idiom: a private static nested class holds the instance field, initialized at class load time by the JVM. The JVM guarantees class loading is atomic and lazy — no synchronization needed. My second choice for serialization-safety is an enum Singleton. I avoid the double-checked locking pattern in new code — it requires volatile and is harder to reason about than the holder idiom. In production systems, I'd replace manual Singleton with a DI container singleton scope — it's testable, mockable, and the lifecycle is managed by the framework.",
    trap: "The most common mistake is synchronized getInstance() — correct but synchronizes on every single call, killing throughput. The second mistake is DCL without volatile — looks correct, fails under the Java Memory Model due to instruction reordering.",
    memoryAnchor: "Thread-Safe Singleton = building a statue in a town square while 100 workers watch. You need to make sure only ONE statue gets built, even if 10 workers start at the same time. Double-check the pedestal is empty, THEN lock the crane.",
  },
  {
    id: "immutable-objects",
    title: "Immutable Objects",
    category: "concurrency-patterns",
    basic: "An immutable object's state cannot be modified after construction. Immutable objects are inherently thread-safe — no synchronization is needed because state cannot change.",
    expected:
      "Requirements for immutability in Java: (1) declare class final (prevent subclass mutability); (2) all fields private final; (3) no setters; (4) deep immutability for mutable fields — return defensive copies, store copies of mutable inputs. Use Builder for complex construction. Examples: String, Integer, Java records, Google Guava ImmutableList.",
    deep:
      "Immutability eliminates an entire class of concurrency bugs: no visibility issues (fields are written once before publication, which establishes happens-before with a safe publication pattern), no atomicity issues (state is consistent by definition), no ordering issues (no mutation to order). The cost is that every 'mutation' creates a new object — this is acceptable for small objects but expensive for large data structures. Persistent data structures (Clojure, Scala's immutable collections) solve this with structural sharing: a new version of a collection shares the unchanged parts with the old version, making 'copy' O(log n) instead of O(n). In domain modeling, immutability is natural for Value Objects (Money, Email, PhoneNumber) — two Money objects with the same amount and currency are equal regardless of identity.",
    interviewAnswer:
      "Immutable objects are my first line of defense in concurrent code. A Money value object is final, with private final long cents and private final Currency currency — no setters, defensive copies in getters that return mutable types, and final class to prevent mutable subclasses. Two threads can share a Money object freely — no locking needed. I use Builder pattern to construct complex immutable objects. The trade-off I always raise: every update creates a new object, so for high-mutation rate scenarios (counters, accumulators), use AtomicLong or similar mutable thread-safe types instead.",
    trap: "Shallow immutability is not true immutability. A class with all final fields can still be mutable if one of those fields is a reference to a mutable object (e.g., final List<String> items — items is final, but items.add() still mutates state). Deep immutability requires all reachable state to be immutable.",
    memoryAnchor: "Immutable Objects = a printed book. Once published, nobody can change the words on the page. Want a revised edition? Print a whole new book. Ten people can read the same copy simultaneously without stepping on each other.",
  },
  {
    id: "producer-consumer",
    title: "Producer-Consumer Pattern",
    category: "concurrency-patterns",
    basic: "Decouple the production of data from its consumption using a shared bounded buffer. Producers enqueue work; consumers dequeue and process it. A BlockingQueue provides the coordination.",
    expected:
      "Java: LinkedBlockingQueue with put() (blocks if full) and take() (blocks if empty) provides all the synchronization. Producers call put(); consumers call take() in a loop. Executor service with a work queue is a framework-level producer-consumer. Use cases: task queues, rate limiting (consumers process at fixed rate), log aggregation (producer logs events; consumer writes to file/network asynchronously).",
    deep:
      "The bounded buffer solves two problems: (1) back-pressure — producer slows down if consumer is overwhelmed (queue full, put() blocks); (2) throughput — producer and consumer run at their natural rates, buffered by the queue. Unbounded queues (LinkedList) remove back-pressure and risk OutOfMemoryError under sustained overload. The design decisions: buffer size (too small → frequent blocking; too large → high latency before back-pressure kicks in); number of producers and consumers (tune empirically based on CPU vs IO bound); poison pill pattern (producer sends a sentinel value to signal consumers to shut down gracefully). At scale, the in-process BlockingQueue is replaced by a distributed message broker (Kafka, RabbitMQ) — the same producer-consumer semantics with durability, replay, and fan-out.",
    interviewAnswer:
      "Producer-Consumer is the pattern for async work decoupling. I use Java's BlockingQueue: producers call queue.put(task) (blocks if queue is full, providing back-pressure); consumers call queue.take() in a loop (blocks if queue is empty, avoiding busy-waiting). In production I'd use an ExecutorService with a bounded work queue — it's the producer-consumer pattern with thread pool management built in. I always discuss: bounded vs unbounded queue (bounded gives back-pressure; unbounded risks OOM), and graceful shutdown via poison pill (producer sends N poison pills for N consumer threads, each consumer exits when it dequeues the pill).",
    trap: "The most common mistake is using an unbounded queue — it works fine under normal load but accumulates tasks under overload until the JVM runs out of memory. Always bound the queue and design the back-pressure behavior explicitly.",
    memoryAnchor: "Producer-Consumer = a sushi conveyor belt. The chef (producer) places plates on the belt (bounded buffer); diners (consumers) grab plates as they pass. If the belt is full, the chef waits. If it's empty, diners wait. Nobody starves, nobody drowns in fish.",
  },

  // ── OOP Design ────────────────────────────────────────────────────────────
  {
    id: "composition-over-inheritance",
    title: "Composition over Inheritance",
    category: "oop-design",
    basic: "Favor assembling behavior from smaller, focused objects (composition) rather than inheriting behavior from parent classes. Composition is more flexible and less fragile than inheritance.",
    expected:
      "Inheritance creates a compile-time 'is-a' relationship that is difficult to change. Composition creates a runtime 'has-a' relationship — the component can be swapped, mocked, or replaced. Concrete example: instead of TextFileReader extends FileReader, use TextFileReader { private final FileReader reader; } — you can inject a MockFileReader for tests. The Decorator and Strategy patterns are both expressions of composition over inheritance.",
    deep:
      "The fragile base class problem: a change to a base class method can break all subclasses, even those that do not override it. This is because subclasses may depend on the internal behavior of the base class (e.g., calling super.method() at the right time, in the right sequence). Josh Bloch's advice: design for inheritance or prohibit it. If a class is not designed with extension in mind (documented override points, invariant preservation), mark it final. Inheritance is appropriate for: (1) a genuine 'is-a' relationship with LSP satisfaction; (2) framework extension points explicitly designed for subclassing; (3) mixin-style interfaces (Java default methods). For everything else, prefer composition. In Go and Rust, inheritance is not available — composition via embedding and traits/interfaces is the only mechanism, which forces better design.",
    interviewAnswer:
      "Composition over inheritance is my default. I use inheritance only for a true 'is-a' relationship where the subclass satisfies the base class contract completely (LSP). For reusing behavior, I compose: a Duck has a FlyBehavior and a QuackBehavior injected via constructor. Rubber duck gets SilentQuack; flying duck gets StandardFly. To change rubber duck to squeak, I swap the QuackBehavior — no class hierarchy change. The test benefit is equally important: composed behaviors can be mocked independently. With inheritance, mocking the base class requires complex framework support.",
    trap: "Composition over inheritance is a guideline, not an absolute rule. Frameworks (e.g., Spring MVC controller base classes, JUnit test case) use inheritance deliberately. The rule is: do not use inheritance for code reuse alone. Use it only when the subclass genuinely IS the base type and satisfies all its contracts.",
    memoryAnchor: "Composition over Inheritance = LEGO vs a carved statue. Inheritance is chiseling a statue — beautiful but permanent, and changing the nose means recarving the whole face. Composition is LEGO — snap pieces together, swap the hat anytime.",
  },
  {
    id: "cohesion-coupling",
    title: "Cohesion & Coupling",
    category: "oop-design",
    basic: "Cohesion measures how closely related the responsibilities within a module are. Coupling measures how dependent modules are on each other. Aim for high cohesion and low coupling.",
    expected:
      "High cohesion: a class does one well-defined thing; its methods all work with the same data and serve the same purpose. Low coupling: a class knows as little as possible about other classes; it depends on abstractions (interfaces) rather than concretions. The two are related: high cohesion naturally limits coupling because a focused class has fewer reasons to reach into other classes.",
    deep:
      "Types of coupling (low to high): data coupling (share only necessary data), stamp coupling (share data structures), control coupling (one module controls another's logic via a flag), common coupling (shared global state), content coupling (one module directly modifies another's internals). Types of cohesion (low to high): coincidental (arbitrary grouping), logical (logically similar but unrelated), temporal (done at the same time), procedural (sequential steps), communicational (same data), sequential (output of one is input of next), functional (single well-defined purpose). Aim for functional cohesion. The Law of Demeter formalizes low coupling: a method should call only methods on its direct collaborators, not on the results of those calls ('talk to your friends, not your friends' friends'). Violations: order.getCustomer().getAddress().getCity() — Order is coupled to Customer, Address, and City.",
    interviewAnswer:
      "I think of cohesion as 'does this class have a clear identity?' and coupling as 'how many things does it need to know about?' A class with high cohesion has methods that all operate on the same data and tell a single story. A class with low coupling talks to abstractions, not concretions, and does not reach through objects to get to data (Law of Demeter). When I see a class with 20 fields and methods scattered across unrelated concerns, that is low cohesion — I split it. When I see a class that imports 15 other classes, that is high coupling — I introduce interfaces or a mediator.",
    trap: "Low coupling does not mean no coupling. Every system must couple somewhere — the goal is to couple at stable abstraction points (interfaces, events) rather than volatile concretions. Zero coupling means zero collaboration, which means nothing gets done.",
    memoryAnchor: "Cohesion & Coupling = a kitchen. High cohesion: all baking tools in one drawer (related things together). Low coupling: the oven doesn't need to know about the dishwasher to work. When your toaster requires the blender to be on, you've got a coupling problem.",
  },

  // ── Data Modeling ─────────────────────────────────────────────────────────
  {
    id: "value-object",
    title: "Value Object vs Entity",
    category: "data-modeling",
    basic: "Entities have identity (two Customer objects with the same data are still different customers if they have different IDs). Value Objects have no identity — they are defined entirely by their attributes (two Money objects with amount=100 and currency=USD are interchangeable).",
    expected:
      "Value Objects are immutable, equality is by value, they have no lifecycle of their own, and they are replaceable. Entities are mutable (over time), equality is by identity (ID), and they have a lifecycle. Design choice: if you can replace one instance with another of the same value and nothing in the system cares, it is a Value Object. Examples: Money, DateRange, EmailAddress, Color — Value Objects. Customer, Order, Product — Entities.",
    deep:
      "Value Objects enforce invariants at construction time — a Money object with negative amount throws in the constructor. This eliminates the scattered null checks and boundary validations typical of primitive types. This is the cure for 'primitive obsession' anti-pattern: instead of storing price as a double (no invariants, no currency), use Money (validated, self-describing, currency-aware). Value Objects can be used as map keys and in sets because their equals() and hashCode() are value-based. In persistence: JPA maps Value Objects with @Embeddable — they are stored in the same table as the owning entity with no surrogate key. DDD aggregates often use Value Objects for attributes that have complex validation: Address, DateRange, PhoneNumber.",
    interviewAnswer:
      "The Entity vs Value Object distinction is central to clean domain modeling. I make Money a Value Object: final class, private final BigDecimal amount, private final Currency currency, all validation in the constructor, equals/hashCode by value, no setters. Two Money(100, USD) objects are identical — I can use either one. A Customer is an Entity: it has a customerId that persists across mutations. Two customers with the same name and address are still different entities. The practical impact: Value Objects are safe to pass by value, copy freely, and use as map keys. Entities must be compared by ID, and their lifecycle must be managed carefully.",
    trap: "Do not make everything an Entity out of habit. Primitive obsession — using int or String for domain concepts — is a design smell. An EmailAddress as a String has no format validation, no domain methods, and no self-documentation. Elevate it to a Value Object.",
    memoryAnchor: "Value Object vs Entity = dollar bills vs people. Two $10 bills are interchangeable — you don't care which specific bill you have (value object). But two people named 'John Smith' are NOT interchangeable — identity matters (entity).",
  },
  {
    id: "anemic-vs-rich",
    title: "Anemic vs Rich Domain Model",
    category: "data-modeling",
    basic: "An anemic domain model has objects that are just data containers (fields + getters/setters) with no behavior. All logic lives in Service classes. A rich domain model puts business logic inside the domain objects themselves.",
    expected:
      "Anemic model symptom: Order class with only getters/setters; OrderService with 15 methods for every possible order operation. Rich model: Order has place(), ship(), cancel(), addLineItem() — business rules enforced inside the entity. Martin Fowler calls anemic domain model an anti-pattern because it is essentially procedural programming with OOP syntax — objects are passive data; services are procedure modules.",
    deep:
      "The anemic model has real trade-offs that make it pragmatic in some contexts: (1) it maps directly to database rows — ORMs like JPA generate entities from tables, and those entities are naturally anemic; (2) it separates concerns explicitly — data is in one place, logic is in another, which can be easier for CRUD-heavy applications; (3) it is easier to serialize/deserialize for API layers. The rich model is superior when: (1) business rules are complex and involve multiple fields together; (2) invariants must be enforced consistently regardless of how the object is accessed; (3) the domain logic is the core value of the application. A balanced approach: Transaction Script (anemic) for simple CRUD; Domain Model (rich) for complex business logic. Within DDD, the Aggregate enforces invariants — all mutations go through the Aggregate Root, which guarantees consistency.",
    interviewAnswer:
      "I prefer rich domain models for complex business logic. An Order knows how to cancel itself: it checks if cancellation is allowed given its current state, calculates any refund, and raises a domain event — all without a service class. OrderService handles only orchestration: getting the order from the repository, calling order.cancel(), saving back, publishing the event. The test is: can a junior developer find the rule 'orders cannot be cancelled after shipment' by looking at the Order class? In a rich model, yes. In an anemic model, they must search through services. I use anemic models for simple CRUD screens where there is genuinely no domain logic.",
    trap: "Rich domain model makes sense for complex domains. Forcing rich models on simple CRUD applications (user settings, admin lookup tables) adds ceremony with no benefit. Know when the domain warrants the investment.",
    memoryAnchor: "Anemic vs Rich = a puppet vs a real dog. An anemic model is a puppet — it just sits there while someone else (the service) moves its limbs. A rich model is a real dog — tell it 'sit' and it knows how. The behavior lives inside the object, not in a puppeteer class.",
  },

  // ── LLD Interview Approach ─────────────────────────────────────────────────
  {
    id: "lld-interview-approach-concept",
    title: "LLD Interview Framework",
    category: "lld-interview-approach",
    basic: "A structured approach to LLD interviews: (1) Clarify scope and requirements; (2) Identify actors and core entities; (3) Define relationships and multiplicity; (4) Apply relevant design patterns; (5) Surface trade-offs and extension points.",
    expected:
      "Step 1 — Clarify: Ask about scale (single machine vs distributed?), persistence, concurrency, functional scope. A parking lot: how many floors, how many spot types, pricing strategy, reservation support? Step 2 — Entities: ParkingLot, Floor, Spot, Vehicle, Ticket, Payment. Step 3 — Relationships: ParkingLot has many Floors; Floor has many Spots; Ticket associated with Spot and Vehicle; one-to-many, multiplicity. Step 4 — Patterns: Strategy for pricing, State for spot/ticket lifecycle, Factory for spot type creation, Observer for notifications. Step 5 — Trade-offs: thread-safety of spot allocation, extensibility for new spot types, separation of parking logic from payment.",
    deep:
      "The LLD interview is an exercise in demonstrating design judgment, not pattern recall. Interviewers look for: (1) Do you ask the right questions before drawing anything? (2) Do you identify the right abstractions — not too many, not too few? (3) Do you apply patterns because they solve a real problem, not because you know their names? (4) Do you proactively surface trade-offs (e.g., 'I'm using a Singleton for the LotManager but in a multi-server deployment this breaks — I'd swap it for a service with a distributed lock')? Common LLD interview systems: parking lot, elevator system, chess, LRU cache, rate limiter, hotel booking, library management, snake and ladder, vending machine. For each: identify the state machine, the primary entity relationships, and the concurrency concerns.",
    interviewAnswer:
      "I follow a five-step framework. First, I spend 3-4 minutes on requirements: what are the actors, what are the core use cases, what is explicitly out of scope? Second, I enumerate entities and their attributes without getting into code. Third, I draw relationships: which entities own which, cardinality, which are Entities vs Value Objects. Fourth, I identify one or two patterns that directly solve a specific problem in this system — I name the problem first, then the pattern. Fifth, I call out at least two trade-offs or extension points — this is where senior engineers demonstrate depth. I keep the design at the interface/class level, not implementation. I code only when asked, and I start with the most critical class.",
    trap: "The worst LLD interview mistake is immediately drawing classes without asking questions. Requirements always contain ambiguities that change the design fundamentally. A close second: naming patterns without explaining why they apply to this specific problem.",
    memoryAnchor: "LLD Interview Framework = building a house. Step 1: ask the client what they want (requirements). Step 2: sketch the rooms (entities). Step 3: draw the hallways (relationships). Step 4: pick materials (patterns). Step 5: warn about the foundation cost (trade-offs). Never start pouring concrete before you have blueprints.",
  },
];

// ─── Interview Patterns ───────────────────────────────────────────────────────

const interviewPatterns: InterviewPattern[] = [
  {
    question: "Design a Parking Lot system with multiple floors, spot types, and a dynamic pricing strategy.",
    answer:
      "Entities: ParkingLot (singleton manager), Floor, ParkingSpot (abstract with subclasses: CompactSpot, LargeSpot, HandicappedSpot), Vehicle (Car, Truck, Motorcycle), Ticket, Payment. Relationships: ParkingLot aggregates floors; Floor aggregates spots; Ticket is associated with one Spot and one Vehicle. Patterns: Strategy for PricingStrategy (HourlyPricing, FlatRatePricing, WeekendPricing); State for Spot (Available, Occupied, Reserved, Maintenance) and Ticket (Active, Paid, Expired); Factory Method for SpotFactory to create typed spots. Concurrency: spot allocation requires a lock or optimistic locking — use synchronized or a ConcurrentHashMap keyed by spot ID with CAS. Extension: add reservation with a future availability model.",
    whyAsked: "Tests entity modeling, state machine design, use of Strategy for behavioral variation, and concurrency awareness in a resource allocation scenario.",
    trap: "Forgetting that spot allocation is a concurrent operation — two threads booking the same spot. Always discuss synchronization strategy even if not asked explicitly.",
  },
  {
    question: "When would you use Decorator over subclassing? Give a concrete example.",
    answer:
      "Use Decorator when: (1) you need to combine behaviors dynamically at runtime; (2) the number of combinations would explode with subclassing; (3) you cannot or should not modify the base class. Example: a DataSource interface for reading/writing data. FileDataSource is the concrete component. EncryptionDecorator, CompressionDecorator, LoggingDecorator each implement DataSource and wrap another DataSource. You compose at runtime: new LoggingDecorator(new CompressionDecorator(new FileDataSource())). With inheritance: LoggedCompressedFileDataSource, LoggedFileDataSource, CompressedFileDataSource — 2^N combinations for N features. Decorator gives O(N) classes for N features with O(N) composition flexibility.",
    whyAsked: "Tests understanding of composition over inheritance, OCP, and awareness of combinatorial explosion in deep hierarchies.",
    trap: "Saying 'Decorator adds methods that subclassing cannot' — that is wrong. Decorator and subclassing both add behavior. The distinction is static (compile-time, fixed hierarchy) vs dynamic (runtime, stackable, combinatorial).",
  },
  {
    question: "How would you implement a thread-safe LRU Cache?",
    answer:
      "Core data structures: a HashMap<K, Node> for O(1) get/put, and a doubly linked list for O(1) move-to-front and evict-from-tail. Node holds key, value, prev, next. get() looks up the node, moves it to the head of the list (most recently used), returns the value. put() adds or updates a node, moves to head; if over capacity, evicts the tail node and removes it from the map. Thread safety option 1: synchronize the entire get() and put() — simple, correct, but a global lock limits throughput. Option 2: ReadWriteLock — get() acquires read lock (multiple concurrent reads), put() acquires write lock. Option 3: use ConcurrentHashMap with explicit segment locking; use a concurrent skip list for ordering. Production: use Caffeine (Java) or Guava's CacheBuilder — they implement a lock-striped, high-throughput LRU with asynchronous eviction.",
    whyAsked: "Tests data structure composition (HashMap + doubly linked list), concurrency design (what lock granularity?), and knowledge of production-ready alternatives.",
    trap: "Using a LinkedHashMap with accessOrder=true is a valid base (it maintains insertion/access order), but its removeEldestEntry() is not thread-safe. You still need synchronization, and you lose the fine-grained control over eviction policy.",
  },
  {
    question: "Explain the Dependency Inversion Principle and how it relates to testability.",
    answer:
      "DIP: high-level modules depend on abstractions; low-level modules implement those abstractions. In practice: OrderService depends on an OrderRepository interface, not MySQLOrderRepository. The implementation is injected. Testability link: to unit-test OrderService, inject a MockOrderRepository (implements the interface, returns hardcoded data, no DB needed). Without DIP, OrderService creates MySQLOrderRepository internally — tests require a real database, making them slow, fragile, and environment-dependent. DIP is the principle; Dependency Injection is the technique; IoC containers (Spring) are the tooling. The three together make large codebases testable and modular.",
    whyAsked: "Tests understanding of the connection between design principles and engineering practices (testability, modularity, clean architecture).",
    trap: "Confusing DIP with Dependency Injection. DIP is about which direction the source code dependency points. DI is about who provides the dependency. You can do DI (inject a concrete class) while violating DIP (depending on a concretion).",
  },
  {
    question: "Design the Observer pattern for a stock price alert system, handling concurrency and memory leaks.",
    answer:
      "StockObserver interface: onPriceChange(String ticker, BigDecimal newPrice). StockMarket (Subject): maintains a Map<String, List<StockObserver>> — ticker to observer list. subscribe(ticker, observer) adds; unsubscribe(ticker, observer) removes. Use CopyOnWriteArrayList for each observer list: thread-safe for iteration under high read / low write scenarios. For memory leak prevention: use WeakReference<StockObserver> in the list — observers that are GC'd stop receiving events. Alternatively, enforce explicit lifecycle (AutoCloseable subscription handle that removes the observer in close()). For large fan-out: dispatch notifications asynchronously via an ExecutorService — wrap each observer call in try/catch so one bad observer doesn't block others. For guaranteed delivery under failures, move to Kafka.",
    whyAsked: "Tests event system design, concurrency safety of the observer list, memory management, and awareness of async notification trade-offs.",
    trap: "Not discussing memory leaks is a red flag. Observer's core failure mode is forgotten registration — strong references in the observer list prevent GC of the observer and everything it references.",
  },
  {
    question: "What is the Liskov Substitution Principle? Why does Square extending Rectangle violate it?",
    answer:
      "LSP: any code that works correctly with a base type must work correctly with any subtype. No special-casing, no UnsupportedOperationException, no behavioral surprises. The Square-Rectangle violation: Rectangle has setWidth(w) and setHeight(h) that change each independently. Square extends Rectangle but overrides setWidth to also set height (and vice versa), maintaining the invariant that all sides are equal. Code that does: rect.setWidth(5); rect.setHeight(4); assert rect.area() == 20 fails when rect is a Square — area is 16. The code correctly uses a Rectangle reference but gets wrong behavior with a Square. The fix: do not inherit. Model both as immutable implementations of a Shape interface, or make them separate with no inheritance relationship.",
    whyAsked: "LSP is the most subtle SOLID principle. Interviewers use Square-Rectangle as a litmus test for whether the candidate understands behavioral compatibility, not just syntactic conformance.",
    trap: "The trap answer is 'Square IS a Rectangle mathematically.' True in geometry; false in software with mutable state. LSP is about behavioral compatibility of the mutable contract, not taxonomic classification.",
  },
  {
    question: "Design an elevator system with multiple elevators and floors.",
    answer:
      "Entities: ElevatorSystem (singleton controller), Elevator (state machine), Floor, Request (type: INTERNAL from panel inside car, EXTERNAL from hall button), Direction enum. Elevator state machine: IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN, MAINTENANCE — State pattern. Dispatch algorithm (Strategy): SCAN/LOOK algorithm (elevator reverses direction at extreme requests, like a disk scheduler — minimizes average wait); simple FCFS; nearest-elevator. Elevator holds a sorted set of floor stops for its current direction — when the set for current direction is empty, reverse. Concurrency: requestLock on each Elevator for safe modification of the stop set; ElevatorSystem coordinates dispatch. OCP: adding a new dispatch strategy is a new class implementing DispatchStrategy. Observer: Elevator notifies FloorPanel (lights) and ElevatorDisplay (floor indicator) on state change.",
    whyAsked: "Tests state machine design (Elevator lifecycle), Strategy for interchangeable dispatch algorithms, Observer for UI updates, and concurrency in a shared resource allocation problem.",
    trap: "Modeling the elevator as a simple enum of states without behavior per state is an anemic state machine. Use the State pattern: each state class handles the events relevant to it and owns the transition logic.",
  },
  {
    question: "Explain Singleton's drawbacks and when to avoid it.",
    answer:
      "Drawbacks: (1) Hidden coupling — classes that use a Singleton do not declare the dependency; it is a hidden global; (2) Untestable — cannot inject a mock without reflection or PowerMock; (3) Violates SRP — the class manages both its domain logic and its own instantiation; (4) Breaks in distributed systems — Singleton guarantees one instance per JVM, but a service with 20 pods has 20 instances; (5) Lifecycle management — when does the Singleton initialize? When does it shut down? Hard to control. Avoid Singleton when: the class holds mutable state accessed across modules (use explicit scope via DI), when testability matters (use DI scoping), when the application runs in multiple JVMs (use distributed cache or stateless service). Use Singleton (or DI singleton scope) only for truly shared stateless or read-once-configured resources: logging instances, config holders, connection pools managed by a framework.",
    whyAsked: "Tests whether the candidate blindly applies patterns or understands the trade-offs. Senior engineers should know when NOT to use a pattern.",
    trap: "Defending Singleton as always appropriate for 'global services' without acknowledging testability and distributed-system limitations is a senior-level red flag.",
  },
];

// ─── Common Mistakes ──────────────────────────────────────────────────────────

const commonMistakes: CommonMistake[] = [
  {
    wrong: "Using synchronized getInstance() on every call for a thread-safe Singleton.",
    correct: "Use the initialization-on-demand holder idiom (private static nested class) or an enum Singleton — both are lazy, thread-safe, and have zero synchronization overhead on the hot path.",
  },
  {
    wrong: "Interpreting SRP as 'a class should only have one method' or 'a class should do one thing'.",
    correct: "SRP means one actor / one reason to change. A class can have many related methods that all serve the same stakeholder. The test is: if two groups of methods are driven by different business actors, split the class.",
  },
  {
    wrong: "Making Square extend Rectangle and overriding setWidth to also change height.",
    correct: "Model Square and Rectangle as separate implementations of an immutable Shape interface. Mutable inheritance breaks LSP whenever the subclass must constrain what the base class's setters can do independently.",
  },
  {
    wrong: "Confusing Decorator with Proxy because both wrap the same interface.",
    correct: "Decorator adds new behaviour (enriches); Proxy controls access (defers, caches, secures, remotes). The structure is identical; the intent is different. Always state intent before structure in an interview.",
  },
  {
    wrong: "Designing an anemic domain model with Order having only getters/setters and putting all rules in OrderService.",
    correct: "Put business logic inside the domain object — Order.cancel(), Order.ship() — so invariants are enforced at the source and business rules are co-located with the data they govern.",
  },
  {
    wrong: "Using Observer for high-throughput events without considering memory leaks or synchronization.",
    correct: "Use CopyOnWriteArrayList or synchronized blocks for the observer list; use WeakReference or explicit unsubscription for memory safety; dispatch notifications asynchronously (ExecutorService) for IO-heavy observers; wrap each notification in try/catch.",
  },
  {
    wrong: "Applying the Factory Method pattern to a static method that creates objects — calling it 'Factory Method' when it is a Simple Factory.",
    correct: "Factory Method (GoF) is a virtual/overridable method in a creator class, overridden by subclasses to create different products. A static 'create' method is a Simple Factory — a useful idiom but not a GoF pattern.",
  },
  {
    wrong: "Violating DIP by making a Service class directly instantiate or import a repository implementation.",
    correct: "Define a Repository interface in the domain layer; the Service depends only on the interface. The infrastructure module provides the implementation, injected by a DI container. The dependency arrow points inward (towards the domain), not outward.",
  },
  {
    wrong: "Using an unbounded BlockingQueue in a Producer-Consumer pattern.",
    correct: "Always bound the queue (LinkedBlockingQueue with a capacity). Unbounded queues provide no back-pressure — under sustained overload they accumulate until OutOfMemoryError. Design the blocking (producer blocks when queue is full) behavior explicitly.",
  },
  {
    wrong: "Implementing LSP as 'subclass must have the same methods' (structural) rather than 'subclass must behave the same way' (behavioral).",
    correct: "LSP is about behavioral compatibility: same preconditions (or weaker), same postconditions (or stronger), same invariants. Throwing UnsupportedOperationException in a subclass override satisfies structural LSP but violates behavioral LSP.",
  },
  {
    wrong: "Jumping into drawing classes at the start of an LLD interview without asking clarifying questions.",
    correct: "Always spend 3-5 minutes on requirements: who are the actors, what are the core use cases, what is out of scope, what are the scale constraints? Requirements drive design decisions — wrong requirements produce right-looking but wrong designs.",
  },
  {
    wrong: "Naming a design pattern during an interview without explaining why it applies to this specific problem.",
    correct: "Describe the problem you're solving first ('I need to add behaviors dynamically without modifying the base class'), then name the pattern ('That's the Decorator pattern'), then show how it applies. Pattern-first answers suggest memorization, not understanding.",
  },
];

// ─── Practice Questions ───────────────────────────────────────────────────────

const practiceQuestions: PracticeQuestion[] = [
  {
    code: `// Design a Parking Lot system
// Scope: multiple floors, three spot types (compact, large, handicapped),
//        vehicle types (motorcycle, car, truck), dynamic pricing, ticket-based entry.

interface ParkingSpot { /* spotId, type, isAvailable, assignVehicle(), free() */ }
interface Vehicle { /* plateNumber, vehicleType */ }
interface PricingStrategy { /* calculate(ticket: Ticket): Money */ }
interface Ticket { /* ticketId, entryTime, exitTime, spot, vehicle */ }
class ParkingLot { /* floors, findAvailableSpot(vehicleType), issueTicket(), processExit() */ }
class Floor { /* floorId, spots by type */ }`,
    question: "Design a complete Parking Lot system using OOP principles. Identify entities, relationships, state machines, and the applicable design patterns. Discuss concurrency handling for spot allocation.",
    answer:
      "Entities: ParkingLot (singleton), Floor, ParkingSpot (abstract + CompactSpot, LargeSpot, HandicappedSpot), Vehicle (Motorcycle, Car, Truck), Ticket, Payment, PricingStrategy. Relationships: ParkingLot 1→N Floor, Floor 1→N ParkingSpot; Ticket 1→1 ParkingSpot (while active), Ticket 1→1 Vehicle. State machines: ParkingSpot (AVAILABLE → OCCUPIED → AVAILABLE; also MAINTENANCE); Ticket (ISSUED → ACTIVE → PAID → CLOSED). Patterns: (1) Strategy — PricingStrategy interface with HourlyPricing, FlatRatePricing, WeekendPricing; injected into ParkingLot; (2) State — Spot lifecycle via SpotState enum or full State classes; (3) Factory — SpotFactory.create(type) returns the correct subclass; (4) Observer — notify SpotAvailabilityDisplay on state change. Concurrency: spotAllocationLock (ReentrantLock per floor or per spot) guards findAvailableSpot + mark-as-occupied atomically — a check-then-act race would double-book spots. Extension points: reservation (pre-book a spot, time-boxed), EV charging spot type (new subclass, no changes to existing hierarchy), surge pricing (new PricingStrategy implementation).",
  },
  {
    code: `// Design an Elevator System
// Scope: N elevators, M floors, internal (panel) and external (hall button) requests,
//        configurable dispatch algorithm.

enum Direction { UP, DOWN, IDLE }
enum ElevatorState { IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN, MAINTENANCE }
interface DispatchStrategy { /* assignElevator(request, elevators): Elevator */ }
class Elevator { /* id, currentFloor, state, stops: SortedSet<Integer> */ }
class ElevatorSystem { /* elevators, dispatch(request) */ }
class Request { /* floor, direction, type: INTERNAL|EXTERNAL */ }`,
    question: "Design a multi-elevator system with a SCAN dispatch algorithm. Model the elevator's state machine and discuss concurrency safety.",
    answer:
      "Entities: ElevatorSystem (singleton, owns all elevators), Elevator (state machine), Floor, Request (INTERNAL from inside car, EXTERNAL from hall button). Elevator state machine (State pattern): IDLE (waits for request), MOVING_UP (adds ascending stops), MOVING_DOWN (adds descending stops), DOOR_OPEN (waits N seconds), MAINTENANCE (rejects requests). State transitions: IDLE → MOVING_UP/DOWN on request; MOVING_UP → DOOR_OPEN at each stop → MOVING_UP or MOVING_DOWN based on remaining stops; MOVING_UP → IDLE when stop set empty. SCAN algorithm (Strategy): each Elevator maintains two SortedSets — upStops and downStops. While moving up: process upStops in ascending order; when empty, switch direction and process downStops in descending order. DispatchStrategy interface → SCANDispatch, NearestElevatorDispatch. Concurrency: each Elevator has a ReentrantLock guarding its stop sets; ElevatorSystem acquires a read lock over all elevators for dispatch decisions. Observer: Elevator notifies FloorDisplayObserver (floor numbers on external panels) and CarDisplayObserver (current floor inside car) on floor change. OCP: new dispatch algorithm = new class; new elevator type (express elevator with skip floors) = new subclass.",
  },
  {
    code: `// Design a thread-safe LRU Cache
// Capacity: configurable. O(1) get and put.
// Thread safety: multiple readers, single writer or concurrent access.

class Node<K, V> { K key; V value; Node<K,V> prev, next; }
class LRUCache<K, V> {
  private final int capacity;
  private final Map<K, Node<K,V>> map;
  private final Node<K,V> head, tail; // dummy sentinels
  // get(K key): O(1), put(K key, V value): O(1)
}`,
    question: "Implement a thread-safe LRU Cache. Explain the data structure choice, thread-safety mechanism, and trade-offs between different locking strategies.",
    answer:
      "Data structures: HashMap<K, Node> for O(1) lookup by key; doubly linked list (with dummy head/tail sentinels) for O(1) move-to-front and remove-from-tail. Node stores key (needed during eviction to remove from map) and value. get(key): if key absent, return null/Optional.empty(); else move node to just after head (most recently used), return value. put(key, value): if key exists, update value and move to front; else create node at front, add to map; if size > capacity, remove node just before tail (LRU), remove its key from map. Thread safety: Option 1 — synchronized methods (global mutex, simple, correct, contended under high load). Option 2 — ReentrantReadWriteLock: get() acquires read lock (concurrent reads safe since we're only moving a node, which IS a write — so reads actually need write lock too; ReadWriteLock only helps if get() is truly read-only, i.e., no LRU update on read, breaking LRU semantics). Option 3 — full synchronization on both get() and put() (correct LRU); use lock striping if key space allows. Production recommendation: Caffeine (Java) uses a lock-striped ring buffer for access recording and asynchronous LRU maintenance — read operations are near-lock-free. Key design decision: approximate LRU (Caffeine's Window TinyLFU) vs strict LRU (full synchronization) — strict LRU is a bottleneck under concurrent read-heavy workloads.",
  },
  {
    code: `// Design a Rate Limiter
// Algorithms: token bucket, sliding window, fixed window counter
// Scope: per-user rate limiting, configurable limits, thread-safe

interface RateLimiter { boolean allowRequest(String userId); }
class TokenBucketLimiter implements RateLimiter {
  // tokens: double, lastRefillTimestamp: long
  // capacity: int, refillRatePerSecond: double
}
class SlidingWindowLimiter implements RateLimiter {
  // timestamps: Deque<Long> per user
  // windowMillis: long, maxRequests: int
}`,
    question: "Design a rate limiter supporting multiple algorithms (token bucket, sliding window). Discuss thread safety, memory usage, and which algorithm fits which use case.",
    answer:
      "Token Bucket: each user has a bucket with capacity C and refill rate R tokens/second. On request: compute elapsed time since last refill, add tokens (elapsed × R), cap at C, then consume one token if available. Thread safe: per-user lock or CAS on (tokens, lastRefillTimestamp) as an atomic pair. Memory: O(users) — one bucket per user. Best for: bursty traffic allowed (burst up to C, then steady R); API rate limits. Sliding Window Log: per user, maintain a sorted deque of timestamps. On request: remove timestamps older than (now - windowMillis), count remaining; allow if count < maxRequests; add current timestamp. Thread safe: per-user ReentrantLock. Memory: O(users × maxRequests) — stores every request timestamp. Best for: strict rate limit (no burst), small maxRequests. Fixed Window Counter: per user, a counter reset every window. On request: if (now / windowDuration) > lastWindow, reset counter; if counter < limit, increment and allow. Memory: O(users). Downside: allows 2× the limit at window boundaries. Architecture: in single-node, use ConcurrentHashMap<userId, AtomicState>. For distributed: store state in Redis (INCR with TTL for fixed window; Lua script for atomic token bucket update). Interface: RateLimiter.allowRequest(userId) returns boolean; compose multiple limiters (per-user, per-IP, global) with a Chain of Responsibility.",
  },
  {
    code: `// Design a Chess Game
// Scope: two players, standard chess rules, move validation, check/checkmate detection

abstract class Piece { Color color; abstract List<Move> validMoves(Board board, Position pos); }
class King extends Piece { /* castling, check detection */ }
class Board { Piece[][] grid; /* 8x8 */ }
class Game { Board board; Player white, black; Player currentTurn; }
class Move { Position from, to; MoveType type; /* NORMAL, CASTLING, EN_PASSANT, PROMOTION */ }`,
    question: "Design a Chess game with full move validation and check/checkmate detection. Identify which pieces benefit from polymorphism and how to model special moves.",
    answer:
      "Entities: Game, Board (8×8 grid, Piece[][]), Position (Value Object: row, col — immutable, equals by value), Piece (abstract), concrete pieces (King, Queen, Rook, Bishop, Knight, Pawn), Player (WHITE, BLACK), Move (from, to, type). Piece hierarchy: each concrete Piece implements validMoves(Board, Position) returning all squares it can move to ignoring check — pure geometric moves. Board provides getPiece(pos) and isEmpty(pos). Game orchestrates: on move request — (1) verify it is the right player's turn; (2) verify piece belongs to player; (3) call piece.validMoves(board, pos), check requested move is in the list; (4) check the move does not leave own King in check (simulate move, call isInCheck()); (5) apply move, switch turn. Special moves: CASTLING (King not in check, neither King nor Rook has moved, squares between are empty and not under attack — store hasMoved flag on King and Rook); EN_PASSANT (Pawn captures diagonally to an empty square only if last move was a 2-step pawn advance); PROMOTION (Pawn reaching rank 8 — prompts for piece type, replaced by new Piece). Check detection: isInCheck(board, king position, color) — iterate all opponent pieces, check if any validMoves includes the king's position. Checkmate: isInCheck AND no legal move by any piece eliminates check. Patterns: Template Method in Piece (validMoves is the hook, slideInDirection() is a shared utility for sliding pieces); Command for move history and undo; Observer for board change → UI update. State: Game is a state machine (ACTIVE, WHITE_IN_CHECK, BLACK_IN_CHECK, CHECKMATE, STALEMATE, DRAW).",
  },
  {
    code: `// Design a Notification System
// Scope: multiple notification types (email, SMS, push), user preferences,
//        template rendering, retry on failure, pluggable channels

interface NotificationChannel { void send(Notification n) throws DeliveryException; }
class EmailChannel implements NotificationChannel { /* SMTP client */ }
class SMSChannel implements NotificationChannel { /* Twilio client */ }
interface TemplateEngine { String render(String templateId, Map<String,Object> context); }
class NotificationService { /* channels, userPreferenceRepo, templateEngine */ }`,
    question: "Design a notification system supporting multiple channels, user preferences, template rendering, and retry logic. Identify the patterns that make it extensible.",
    answer:
      "Core entities: Notification (notificationId, userId, type, templateId, context map, status, createdAt), NotificationChannel (interface), UserPreference (userId → Set<ChannelType>), Template. Patterns: (1) Strategy — NotificationChannel interface; EmailChannel, SMSChannel, PushChannel are strategies; NotificationService selects channels based on user preference; adding WhatsApp = new class, no changes to service. (2) Template Method — BaseChannel.send() defines the flow: validate → render template → deliver → mark status; concrete channels override deliver() only. (3) Decorator — RetryDecorator wraps any channel and retries on DeliveryException with exponential backoff; LoggingDecorator wraps for audit. Compose: new RetryDecorator(new LoggingDecorator(new EmailChannel()), maxRetries=3). (4) Observer — NotificationService publishes NotificationSentEvent; DeliveryAnalyticsListener and InboxSyncListener react independently. (5) Factory — ChannelFactory.getChannel(type) returns the correct implementation, hiding instantiation from the service. Template rendering: TemplateEngine interface (FreemarkerEngine, MustacheEngine) — Strategy. User preferences: UserPreferenceRepository returns Set<ChannelType>; NotificationService intersects preferred channels with available channels. Retry: RetryDecorator catches DeliveryException, sleeps (exponential backoff with jitter), retries up to N times; after N failures, sends to dead-letter queue. Thread safety: channels are stateless; the service can be called concurrently with no shared mutable state.",
  },
  {
    code: `// Design a Vending Machine
// Scope: multiple products, coin/bill input, change dispensing,
//        maintenance mode, item selection, out-of-stock handling

enum VendingState { IDLE, COIN_INSERTED, ITEM_SELECTED, DISPENSING, MAINTENANCE }
interface State { void insertCoin(Machine m, Coin c); void selectItem(Machine m, String itemCode); void dispense(Machine m); void cancel(Machine m); }
class VendingMachine { State currentState; Inventory inventory; Money balance; }`,
    question: "Design a Vending Machine using the State pattern. Model state transitions and invariants for each state. Discuss what happens on invalid transitions.",
    answer:
      "States: IdleState (no coins inserted), CoinInsertedState (money accumulated, awaiting selection), ItemSelectedState (item chosen, awaiting confirmation or more coins), DispensingState (dispensing product and change), MaintenanceState (no customer operations). Transitions: Idle → CoinInserted on insertCoin(); CoinInserted → CoinInserted on additional insertCoin() (accumulate); CoinInserted → ItemSelected on selectItem() if item available and balance ≥ price; ItemSelected → Dispensing on confirm(); Dispensing → Idle after dispense() and returnChange() complete; any state → Maintenance on adminToggleMaintenance(). Invalid transitions: insertCoin() in Dispensing — ignored or queued; selectItem() in Idle — display 'Insert coins first' and stay; selectItem() for out-of-stock item — display error, stay in CoinInserted; selectItem() when balance < price — display 'Insufficient funds'. Each State method has a default no-op or error-display implementation in an AbstractState base class; only valid transitions are overridden. Entities: Product (code, name, price, quantity), Inventory (Map<code, Product>), Coin enum (NICKEL=5, DIME=10, QUARTER=25, DOLLAR=100 in cents), Money (Value Object). Machine methods: insertCoin() and selectItem() delegate entirely to currentState. Context (VendingMachine) exposes transition methods: transitionTo(State newState) — only States can call this, enforcing that transitions are state-driven. Coin change: ChangeDispenser uses a greedy algorithm (largest coins first) from the available coin inventory; if exact change impossible, refund all and transition to CoinInserted with an error message.",
  },
  {
    code: `// Identify SOLID violations and refactor
class UserService {
  private MySQLUserRepository userRepo = new MySQLUserRepository(); // direct instantiation
  private EmailSender emailSender = new SMTPEmailSender();          // direct instantiation

  public void registerUser(String name, String email, String password) {
    // 1. Validate email format
    if (!email.contains("@")) throw new IllegalArgumentException("Bad email");
    // 2. Hash password
    String hashed = MD5Hash(password); // weak hash, hardcoded algorithm
    // 3. Persist
    userRepo.save(new User(name, email, hashed));
    // 4. Send welcome email inline
    emailSender.send(email, "Welcome " + name, buildWelcomeBody(name));
    // 5. Log to System.out
    System.out.println("User registered: " + email);
  }
}`,
    question: "Identify all SOLID violations in the UserService above and design a refactored version with proper class decomposition, interfaces, and dependency injection.",
    answer:
      "Violations identified: (1) SRP — UserService has 5 responsibilities: validation, password hashing, persistence, email notification, logging. Each is a separate reason to change (security policy changes hashing algorithm; marketing changes email body; DBA changes persistence; logging policy changes output). (2) OCP — hardcoded MD5 hashing; adding bcrypt requires modifying registerUser(). (3) DIP — UserService directly instantiates MySQLUserRepository and SMTPEmailSender; it is coupled to concretions, not abstractions; untestable without a real DB and SMTP. (4) Minor ISP — if EmailSender has methods beyond send(), UserService is forced to depend on a fat interface. Refactored design: interfaces: UserRepository.save(User), EmailService.sendWelcome(User), PasswordHasher.hash(String), EmailValidator.validate(String), Logger.log(String). Implementations: JpaUserRepository, SmtpEmailService, BCryptPasswordHasher. UserService (constructor injection of all four): registerUser() calls validator.validate(email); calls hasher.hash(password); calls userRepo.save(new User(name, email, hashed)); calls emailService.sendWelcome(user); calls logger.log(). Each dependency is an interface — MockUserRepository and MockEmailService suffice for unit tests, no infrastructure needed. Adding SHA-256 hashing = new SHA256PasswordHasher, one DI binding change. Adding Slack notification = new SlackNotificationService, compose with Observer or add to a NotificationService list. Net result: 6 focused classes instead of 1 god class; each is independently testable and replaceable.",
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

export const topicData: TopicData = {
  topicTitle: "Low-Level Design",
  topicMeta: "50–60 min · Mid to Senior level",
  lastUpdated: "2026-04-10",
  lastHourConceptIds: [
    "srp",
    "dip",
    "singleton-pattern",
    "decorator-pattern",
    "observer-pattern",
    "strategy-pattern",
    "lld-interview-approach-concept",
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
