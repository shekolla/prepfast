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
    "React is a declarative, component-based UI library that maintains a virtual DOM (fiber tree) and uses a reconciliation algorithm to efficiently compute the minimal set of real DOM mutations needed when state changes. React 18+ introduces concurrent rendering — the ability to prepare multiple versions of the UI simultaneously, yielding to the browser between work units so the main thread stays responsive. Server Components (RSC) extend this model by running components on the server, sending a serialized UI description (not HTML) to the client, enabling zero-bundle-cost components that can directly access databases and file systems.",
  whyItExists:
    "Manually updating the DOM in response to data changes is error-prone and hard to reason about. React's one-way data flow (props down, events up) plus immutable state snapshots make UI predictable. The virtual DOM abstraction lets React batch and optimize updates, while the component model encourages reusable, testable UI pieces. Concurrent features solve the fundamental tension between responsiveness and consistency in complex UIs.",
  whenToUse: [
    "Single-page applications with complex, interactive UIs and frequent state changes",
    "Server-rendered applications via Next.js, Remix, or React Router for SEO and fast initial loads",
    "Cross-platform mobile apps via React Native sharing business logic with web",
    "Data-heavy dashboards where component composition and memoization manage rendering cost",
    "Incremental adoption — React can mount into a single div in an existing page",
    "Design system component libraries consumed across multiple products",
  ],
  whereItFails: [
    "Simple static sites — React's runtime overhead is unnecessary; use plain HTML or Astro",
    "Extremely performance-critical animations — direct DOM manipulation or Canvas/WebGL is faster",
    "SEO-only content sites with no interactivity — static site generators produce smaller payloads",
    "Tiny widgets — the ~40 KB baseline (React + ReactDOM gzipped) matters when the widget itself is 2 KB",
    "Real-time collaborative editing — CRDTs and operational transforms need specialized data structures, not React state",
  ],
};

// ─── Categories ───────────────────────────────────────────────────────────────
const categories: CategoryMeta[] = [
  {
    id: "hooks",
    label: "Hooks",
    description:
      "useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext, custom hooks — React's primitive building blocks for state and side effects",
  },
  {
    id: "fiber-reconciliation",
    label: "Fiber & Reconciliation",
    description:
      "Fiber architecture, virtual DOM, diffing algorithm, reconciliation, keys, concurrent rendering — how React decides what to re-render",
  },
  {
    id: "component-patterns",
    label: "Component Patterns",
    description:
      "Composition, compound components, render props, higher-order components, controlled vs uncontrolled, children patterns",
  },
  {
    id: "state-management",
    label: "State Management",
    description:
      "Local state, lifting state, Context API, useReducer, external stores, state machines — strategies for managing application state",
  },
  {
    id: "server-components",
    label: "Server Components & RSC",
    description:
      "React Server Components, 'use client' / 'use server' directives, streaming SSR, Server Actions, serialization boundary",
  },
  {
    id: "performance",
    label: "Performance Optimization",
    description:
      "React.memo, useMemo, useCallback, lazy loading, Suspense, code splitting, profiler, avoiding unnecessary re-renders",
  },
  {
    id: "rendering",
    label: "Rendering & Virtual DOM",
    description:
      "Render phases (render vs commit), batching, concurrent features, transitions, Suspense boundaries, error boundaries",
  },
  {
    id: "testing",
    label: "Testing",
    description:
      "React Testing Library, component testing philosophy, mocking, act(), user events, snapshot testing, integration vs unit",
  },
];

// ─── Mental Model Tree ────────────────────────────────────────────────────────
const mentalModelTree: TreeNode = {
  id: "root",
  label: "React",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "cat-hooks",
      label: "Hooks",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-usestate", label: "useState", nodeType: "concept", conceptId: "usestate", importance: "critical" },
        { id: "node-useeffect", label: "useEffect", nodeType: "concept", conceptId: "useeffect", importance: "critical" },
        { id: "node-useref", label: "useRef", nodeType: "concept", conceptId: "useref", importance: "high" },
        { id: "node-usememo", label: "useMemo", nodeType: "concept", conceptId: "usememo", importance: "high" },
        { id: "node-usecallback", label: "useCallback", nodeType: "concept", conceptId: "usecallback", importance: "high" },
        { id: "node-usereducer", label: "useReducer", nodeType: "concept", conceptId: "usereducer", importance: "medium" },
        { id: "node-usecontext", label: "useContext", nodeType: "concept", conceptId: "usecontext", importance: "high" },
        { id: "node-custom-hooks", label: "Custom Hooks", nodeType: "concept", conceptId: "custom-hooks", importance: "critical" },
      ],
    },
    {
      id: "cat-fiber",
      label: "Fiber & Reconciliation",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-fiber-arch", label: "Fiber Architecture", nodeType: "concept", conceptId: "fiber-architecture", importance: "critical" },
        { id: "node-reconciliation", label: "Reconciliation", nodeType: "concept", conceptId: "reconciliation", importance: "critical" },
        { id: "node-keys", label: "Keys & Diffing", nodeType: "concept", conceptId: "keys-and-diffing", importance: "high" },
        { id: "node-concurrent", label: "Concurrent Rendering", nodeType: "concept", conceptId: "concurrent-rendering", importance: "high" },
      ],
    },
    {
      id: "cat-patterns",
      label: "Component Patterns",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-composition", label: "Composition", nodeType: "concept", conceptId: "composition", importance: "critical" },
        { id: "node-compound", label: "Compound Components", nodeType: "concept", conceptId: "compound-components", importance: "medium" },
        { id: "node-render-props", label: "Render Props", nodeType: "concept", conceptId: "render-props", importance: "medium" },
        { id: "node-hoc", label: "Higher-Order Components", nodeType: "concept", conceptId: "higher-order-components", importance: "medium" },
        { id: "node-controlled", label: "Controlled vs Uncontrolled", nodeType: "concept", conceptId: "controlled-vs-uncontrolled", importance: "high" },
      ],
    },
    {
      id: "cat-state",
      label: "State Management",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-lifting-state", label: "Lifting State", nodeType: "concept", conceptId: "lifting-state", importance: "high" },
        { id: "node-context-api", label: "Context API", nodeType: "concept", conceptId: "context-api", importance: "high" },
        { id: "node-external-stores", label: "External Stores", nodeType: "concept", conceptId: "external-stores", importance: "medium" },
      ],
    },
    {
      id: "cat-rsc",
      label: "Server Components",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-rsc", label: "React Server Components", nodeType: "concept", conceptId: "react-server-components", importance: "critical" },
        { id: "node-server-actions", label: "Server Actions", nodeType: "concept", conceptId: "server-actions", importance: "high" },
        { id: "node-streaming-ssr", label: "Streaming SSR", nodeType: "concept", conceptId: "streaming-ssr", importance: "high" },
      ],
    },
    {
      id: "cat-perf",
      label: "Performance",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-memo", label: "React.memo", nodeType: "concept", conceptId: "react-memo", importance: "high" },
        { id: "node-lazy", label: "Lazy & Suspense", nodeType: "concept", conceptId: "lazy-and-suspense", importance: "high" },
        { id: "node-rerenders", label: "Preventing Re-renders", nodeType: "concept", conceptId: "preventing-rerenders", importance: "critical" },
      ],
    },
    {
      id: "cat-rendering",
      label: "Rendering",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-render-commit", label: "Render vs Commit", nodeType: "concept", conceptId: "render-vs-commit", importance: "critical" },
        { id: "node-error-boundaries", label: "Error Boundaries", nodeType: "concept", conceptId: "error-boundaries", importance: "high" },
        { id: "node-transitions", label: "Transitions", nodeType: "concept", conceptId: "transitions", importance: "medium" },
      ],
    },
    {
      id: "cat-testing",
      label: "Testing",
      nodeType: "category",
      importance: "medium",
      children: [
        { id: "node-rtl", label: "React Testing Library", nodeType: "concept", conceptId: "react-testing-library", importance: "high" },
      ],
    },
  ],
};

// ─── Concepts ─────────────────────────────────────────────────────────────────
const concepts: Concept[] = [
  // ── Hooks ──
  {
    id: "usestate",
    title: "useState",
    category: "hooks",
    basic:
      "useState is a hook that adds local state to a function component. It returns a [value, setter] tuple. Calling the setter triggers a re-render with the new value.",
    expected:
      "State updates are asynchronous and batched — calling setState three times in an event handler produces one re-render, not three. When the new state depends on the previous state, you must use the functional form: setState(prev => prev + 1). React uses Object.is to bail out of re-renders if the new value is the same reference as the old one. Initial state can be a lazy initializer function to avoid expensive computation on every render.",
    deep:
      "Under the hood, each useState call is stored as a node in a linked list on the fiber. The position in the list is determined by call order, which is why hooks cannot be called conditionally — it would shift the list and map values to wrong hooks. During concurrent rendering, React may render a component multiple times before committing; the state snapshot captured in each render is immutable, giving you a consistent view even if more updates arrive. The batching behavior was expanded in React 18 to cover all contexts (setTimeout, promises, native event handlers), not just React synthetic events as in React 17.",
    interviewAnswer:
      "useState gives function components local state. It returns a value and a setter. Updates are batched and asynchronous — React may combine multiple setState calls into a single re-render. When new state depends on old state, I always use the functional updater form. React 18 batches updates everywhere, not just in event handlers.",
    trap:
      "Setting state with the same object reference (e.g., mutating an array and calling setState with it) won't trigger a re-render because React uses Object.is comparison. You must create a new reference: setState([...arr]).",
    memoryAnchor:
      "Think of useState as a sticky note on the component's desk — the note persists between renders, but you must write a NEW note (new reference) to get the component to look at it again.",
  },
  {
    id: "useeffect",
    title: "useEffect",
    category: "hooks",
    basic:
      "useEffect runs side effects after the component renders and DOM updates are committed. It takes a callback and an optional dependency array. The cleanup function runs before the next effect and on unmount.",
    expected:
      "Effects run after paint (not after render), so they don't block the browser from updating the screen. An empty dependency array [] means the effect runs once after mount. Omitting the array means it runs after every render. Each render captures its own props and state (closure), so the effect sees the values from the render that scheduled it. The cleanup function is essential for subscriptions, timers, and event listeners to prevent memory leaks.",
    deep:
      "React compares dependencies with Object.is. If all dependencies are the same, the effect is skipped. In Strict Mode (development), React intentionally double-invokes effects to surface missing cleanups. useLayoutEffect is the synchronous alternative — it runs after DOM mutations but before paint, useful for measuring DOM elements or preventing visual flicker. In concurrent rendering, React may render a component but not commit it, meaning effects from that render never fire. Effects are technically scheduled as passive effects in a microtask-like queue after the browser paints.",
    interviewAnswer:
      "useEffect is for side effects — data fetching, subscriptions, DOM manipulation. It runs after paint so it doesn't block rendering. I use the dependency array to control when it re-runs, and always return a cleanup function for subscriptions. The key mental model is that each render has its own effect with its own closure over that render's state and props.",
    trap:
      "Putting an object or array literal in the dependency array causes the effect to re-run every render because a new reference is created each time. Either memoize the dependency or destructure to primitives.",
    memoryAnchor:
      "useEffect is like a post-it reminder that fires AFTER you've finished painting a room — you don't stop painting to read it, and you tear up the old reminder before reading the new one (cleanup).",
  },
  {
    id: "useref",
    title: "useRef",
    category: "hooks",
    basic:
      "useRef returns a mutable object { current: value } that persists across renders without causing re-renders when mutated. It's commonly used to hold DOM element references and mutable instance variables.",
    expected:
      "Unlike state, changing ref.current does NOT trigger a re-render. This makes refs ideal for storing values that need to persist (like interval IDs, previous state values, or imperative API handles) without the overhead of re-rendering. When passed as a ref prop to a JSX element, React sets ref.current to the DOM node after mount and null on unmount. forwardRef (or the ref prop in React 19) lets child components expose their DOM nodes to parents.",
    deep:
      "Refs are stored on the fiber just like state, but they're exempt from the reconciliation comparison. React processes ref attachments during the commit phase — after all DOM mutations — so ref.current always points to the committed DOM. useImperativeHandle combined with forwardRef lets you customize what the parent sees, exposing an API object instead of the raw DOM node. In concurrent mode, refs may point to stale DOM during the render phase; only read refs in effects or event handlers, never during render.",
    interviewAnswer:
      "useRef gives me a mutable container that persists across renders without triggering re-renders. I use it for DOM access, storing interval IDs, and keeping mutable values like previous props. The key rule is to never read or write refs during render in concurrent mode — only in effects and event handlers.",
    trap:
      "Reading ref.current during render can cause bugs in concurrent mode because the ref might point to a DOM node from a different render. Always access refs inside useEffect or event handlers.",
    memoryAnchor:
      "useRef is a locker at the gym — you can store things between workouts (renders), grab them anytime, and nobody else notices when you swap the contents.",
  },
  {
    id: "usememo",
    title: "useMemo",
    category: "hooks",
    basic:
      "useMemo caches the result of an expensive computation between re-renders. It takes a factory function and a dependency array, returning the memoized value. It only recomputes when dependencies change.",
    expected:
      "useMemo is a performance optimization, not a semantic guarantee — React may throw away cached values under memory pressure. Common use cases: filtering/sorting large lists, computing derived data, creating objects/arrays passed as props to memoized children. Without useMemo, a new object reference on every render would defeat React.memo on child components. The factory runs during render, so it must be pure — no side effects.",
    deep:
      "In the React compiler (React Compiler), memoization is applied automatically, making manual useMemo largely unnecessary. The compiler analyzes data flow and inserts memoization at the optimal granularity. Until adoption is widespread, manual useMemo remains important. Profile before memoizing — useMemo itself has overhead (dependency comparison, closure creation, cache storage). For truly expensive computations, consider moving the work to a Web Worker instead of memoizing on the main thread.",
    interviewAnswer:
      "useMemo caches expensive computations between renders, recomputing only when dependencies change. I use it for derived data from large lists, or to stabilize object references passed to memoized children. I always profile first because useMemo has its own cost — the React compiler will eventually automate this.",
    trap:
      "useMemo is not a guarantee — React can evict the cache. Don't rely on it for correctness (e.g., to prevent an effect from running). Also, memoizing cheap operations adds overhead for no benefit.",
    memoryAnchor:
      "useMemo is a recipe card with a Post-it: 'Same ingredients? Serve the leftovers. New ingredients? Cook again.'",
  },
  {
    id: "usecallback",
    title: "useCallback",
    category: "hooks",
    basic:
      "useCallback memoizes a function definition between re-renders. It returns the same function reference as long as its dependencies haven't changed. It's essentially useMemo(() => fn, deps).",
    expected:
      "The primary use case is preventing unnecessary re-renders of child components wrapped in React.memo. Without useCallback, a parent re-render creates a new function reference each time, which breaks the shallow prop comparison in React.memo. useCallback is also needed when a function is used as a dependency in useEffect — without it, the effect would re-run on every render because the function reference changes.",
    deep:
      "useCallback doesn't prevent the function from being created — JavaScript still creates the closure on every render. It just returns the old reference if deps haven't changed. The real savings come downstream: a stable reference means React.memo children skip rendering, and effects with that dependency don't re-fire. In React 19, the compiler can auto-memoize callbacks, making useCallback optional. Until then, the rule of thumb is: only use useCallback when the function is passed to a memoized child or used as an effect dependency.",
    interviewAnswer:
      "useCallback returns a stable function reference between renders when dependencies haven't changed. I use it to prevent child components wrapped in React.memo from re-rendering unnecessarily, and to stabilize function dependencies in useEffect. It doesn't avoid creating the function — it just reuses the old reference.",
    trap:
      "Wrapping every function in useCallback without a React.memo child or effect dependency is pure overhead — you're paying for dependency comparison with zero benefit.",
    memoryAnchor:
      "useCallback is a name badge at a conference — 'Hi, I'm the same handleClick as last time' — so the bouncer (React.memo) lets you through without re-checking.",
  },
  {
    id: "usereducer",
    title: "useReducer",
    category: "hooks",
    basic:
      "useReducer is an alternative to useState for complex state logic. It takes a reducer function (state, action) => newState and an initial state, returning [state, dispatch]. You update state by dispatching action objects.",
    expected:
      "useReducer shines when state transitions depend on multiple values or the next state depends on the previous state in complex ways. The reducer is a pure function — given the same state and action, it always returns the same result, making it easy to test. dispatch is identity-stable (never changes reference), so it's safe to pass down without useCallback. It's the React equivalent of Redux's reducer pattern without the external store.",
    deep:
      "React calls the reducer during rendering to compute the next state, so it must be pure — no API calls, no mutations of external variables. In strict mode, React double-invokes reducers to catch impurities. useReducer can be combined with Context to create a mini state management system: provide dispatch via context so deep children can update state without prop drilling. For complex forms, a reducer with action types like 'SET_FIELD', 'VALIDATE', 'RESET' is far cleaner than multiple useState calls.",
    interviewAnswer:
      "useReducer handles complex state transitions through a pure reducer function. I dispatch actions instead of calling setters directly, which makes state logic testable and predictable. The dispatch function is referentially stable, so it's great for passing through context without causing re-renders. I reach for it over useState when state has multiple sub-values or when transitions are complex.",
    trap:
      "Mutating state inside the reducer instead of returning a new object. Reducers must be pure — always return new state objects. React won't detect mutations since it checks reference equality.",
    memoryAnchor:
      "useReducer is a vending machine — you insert a coin (dispatch an action), the machine processes it internally (reducer), and out comes your snack (new state). You never reach inside the machine.",
  },
  {
    id: "usecontext",
    title: "useContext",
    category: "hooks",
    basic:
      "useContext reads a value from a React context created by createContext. Any component calling useContext(MyContext) re-renders whenever the context value changes. A Provider component higher in the tree supplies the value.",
    expected:
      "Context is designed for data that's global to a subtree — theme, locale, auth status. Every consumer re-renders when the provider's value changes, even if the specific slice they care about didn't change. This is the main performance pitfall: putting a large object in context means every consumer re-renders on any property change. Splitting contexts by update frequency (one for theme, one for user) mitigates this.",
    deep:
      "React uses the provider's value prop with Object.is comparison to decide whether consumers need updating. If you pass value={{ user, theme }}, a new object is created every render, causing all consumers to re-render — memoize it with useMemo. React 19 simplifies context with Context as a provider directly (<MyContext value={...}>) instead of <MyContext.Provider>. For high-frequency updates (mouse position, scroll), context is too coarse — use external stores with useSyncExternalStore for selective subscriptions.",
    interviewAnswer:
      "useContext lets components consume values from a context provider without prop drilling. The gotcha is that ALL consumers re-render when the context value changes, so I split contexts by update frequency and memoize the value object. For high-frequency updates, I prefer external stores with useSyncExternalStore for selective re-rendering.",
    trap:
      "Passing an object literal as the context value without memoizing it: <Provider value={{ user }}> creates a new object every render, forcing all consumers to re-render even if user hasn't changed.",
    memoryAnchor:
      "Context is a radio station broadcast — every radio tuned to that frequency (consumer) hears the update, whether they care about the news segment or the weather. Split stations for targeted listening.",
  },
  {
    id: "custom-hooks",
    title: "Custom Hooks",
    category: "hooks",
    basic:
      "Custom hooks are JavaScript functions starting with 'use' that compose built-in hooks to extract and reuse stateful logic across components. They share logic, not state — each component using the hook gets its own independent state.",
    expected:
      "Custom hooks are the primary mechanism for code reuse in modern React, replacing mixins, HOCs, and render props for most use cases. Examples: useLocalStorage, useFetch, useDebounce, useMediaQuery. They can call any other hook and return whatever the consumer needs — state, callbacks, refs, JSX. The 'use' prefix is required so React's linter can enforce the rules of hooks inside them.",
    deep:
      "Custom hooks enable the 'headless component' pattern — hooks that manage all the logic (state machines, keyboard navigation, ARIA attributes) while the consumer provides the UI. Libraries like Downshift and React Aria use this pattern. A well-designed custom hook has a clear API surface (like a component's props), handles cleanup properly, and documents its re-render characteristics. Testing custom hooks is done via renderHook from React Testing Library, which creates a thin wrapper component.",
    interviewAnswer:
      "Custom hooks extract reusable stateful logic into functions prefixed with 'use'. Each consumer gets independent state — hooks share logic, not state. I use them to build headless components, encapsulate fetch/subscription logic, and keep components focused on rendering. They fully replace HOCs and render props for most reuse patterns.",
    trap:
      "Assuming two components using the same custom hook share state. They don't — each call creates independent state. If you need shared state, use context or an external store inside the hook.",
    memoryAnchor:
      "A custom hook is a recipe — two chefs following the same recipe each make their own separate dish. The recipe (logic) is shared, but the dishes (state) are independent.",
  },

  // ── Fiber & Reconciliation ──
  {
    id: "fiber-architecture",
    title: "Fiber Architecture",
    category: "fiber-reconciliation",
    basic:
      "Fiber is React's internal reconciliation engine introduced in React 16. Each component instance, DOM node, or fragment is represented as a fiber node — a JavaScript object that tracks the component's state, props, and position in the tree.",
    expected:
      "The key innovation of Fiber is incremental rendering — the ability to split rendering work into chunks and spread it across multiple frames. Each fiber has a return (parent), child (first child), and sibling pointer, forming a linked list tree. React processes fibers using a work loop that can pause, resume, or abort work. This enables concurrent features like startTransition, Suspense, and prioritized updates. High-priority updates (user input) can interrupt low-priority ones (data fetching results).",
    deep:
      "React maintains two trees: the current tree (what's on screen) and the work-in-progress (WIP) tree being built. This double-buffering allows React to prepare the next frame without mutating the current UI. Each fiber stores an effect tag (Placement, Update, Deletion) that tells the commit phase what DOM operations to perform. The work loop uses a cooperative scheduling model via MessageChannel (not requestIdleCallback, which React considered but rejected for lack of control) to yield control back to the browser. React 18's concurrent mode uses lanes — a bitmask-based priority system replacing the older expiration time model — to classify updates by urgency.",
    interviewAnswer:
      "Fiber is React's reconciliation engine that represents the component tree as a linked list of fiber nodes. Its key innovation is incremental rendering — splitting work into chunks so React can pause and resume, yielding to the browser for user input. It maintains two trees (current and work-in-progress) using double-buffering. React 18 uses a lanes priority system to schedule high-priority updates like user input ahead of lower-priority ones.",
    trap:
      "Thinking Fiber is the virtual DOM. Fiber is the reconciliation architecture that processes the virtual DOM. The virtual DOM is the element tree (React.createElement output); fibers are the internal work units that track component instances.",
    memoryAnchor:
      "Fiber is an air traffic controller — it doesn't fly the planes (components), but it schedules their landing (rendering) order, can tell one to circle (pause), and prioritizes emergencies (user input) over routine flights.",
  },
  {
    id: "reconciliation",
    title: "Reconciliation Algorithm",
    category: "fiber-reconciliation",
    basic:
      "Reconciliation is the process React uses to diff the previous and next virtual DOM trees and determine the minimum set of DOM mutations needed. It uses two heuristic assumptions to achieve O(n) instead of O(n³) complexity.",
    expected:
      "The two heuristics: (1) elements of different types produce entirely different trees — React tears down the old subtree and builds a new one. (2) Keys identify which children are stable across renders — without keys, React matches children by index, leading to bugs with reorderable lists. When the same component type appears in the same position, React reuses the fiber and updates props. When the type changes, the entire subtree unmounts and remounts.",
    deep:
      "For child lists, React uses a two-pass algorithm: first, it builds a map of existing children by key, then it iterates through the new list, reusing or creating fibers. This makes key-based reordering O(n). The commit phase is synchronous and uninterruptible — once React starts mutating the DOM, it finishes all mutations before yielding. This ensures the user never sees a partially updated UI. React processes effects (useEffect, useLayoutEffect, ref attachments) in a specific order during commit: all mutations first, then all layout effects, then the browser paints, then all passive effects.",
    interviewAnswer:
      "Reconciliation diffs the old and new element trees using two heuristics: different element types produce different trees (tear down and rebuild), and keys identify stable children across renders. This gives O(n) complexity. React reuses fibers when the component type and position match, and tears down the subtree when they don't. The commit phase is synchronous to prevent partial UI updates.",
    trap:
      "Using array index as key in a reorderable list. When items are reordered, the key stays with the index, not the item — React reuses the wrong component instances, causing state bugs like inputs showing the wrong value.",
    memoryAnchor:
      "Reconciliation is a hotel check-in — if your name (key) is on the reservation, you get your old room (reuse fiber). If you're a different type of guest (element type changed), the whole room gets gutted and refurnished.",
  },
  {
    id: "keys-and-diffing",
    title: "Keys & List Diffing",
    category: "fiber-reconciliation",
    basic:
      "Keys are special string attributes that help React identify which items in a list have changed, been added, or been removed. They must be stable, unique among siblings, and not change between renders.",
    expected:
      "Good keys are stable IDs from your data (database ID, UUID). Bad keys are array indexes (break on reorder/insert/delete) or Math.random() (forces remount every render, destroying state). Keys also serve as a reset mechanism: changing a component's key forces React to unmount and remount it with fresh state. This is useful for resetting forms or animations. Keys only need to be unique among siblings, not globally.",
    deep:
      "React's list diffing uses keys to build an internal map for O(1) lookups when matching old children to new children. Without keys, React falls back to index-based matching, which is only correct for static, non-reorderable lists. The key must be derivable from the data, not the rendering context. When you key a component with a changing value (like a selected user ID), it forces a complete remount — this is the 'key as state reset' pattern, often cleaner than useEffect-based resets.",
    interviewAnswer:
      "Keys tell React which list items are stable across renders, enabling efficient reordering without unnecessary DOM mutations. I always use stable data IDs, never array indexes for dynamic lists. A powerful pattern is using key as a reset trigger — changing a component's key forces a full remount with fresh state, which is cleaner than manual cleanup in useEffect.",
    trap:
      "Using index as key seems to work for static lists, but causes subtle state bugs the moment the list is filtered, sorted, or items are inserted. The state 'sticks' to the index position, not the data item.",
    memoryAnchor:
      "Keys are name tags at a party — without them, React just matches people by where they're standing (index). With name tags, it can track who moved, who left, and who's new.",
  },
  {
    id: "concurrent-rendering",
    title: "Concurrent Rendering",
    category: "fiber-reconciliation",
    basic:
      "Concurrent rendering lets React prepare multiple UI states simultaneously and choose which to show. It can pause rendering work to handle urgent updates (like typing) and resume less urgent work later.",
    expected:
      "Enabled by React 18, concurrent features include: startTransition (marks updates as non-urgent), useDeferredValue (defers re-rendering with a stale value), Suspense for data fetching (shows fallback while components load). React doesn't render faster — it renders smarter by prioritizing what matters. The old synchronous rendering model blocked the main thread; concurrent rendering yields between fiber units of work.",
    deep:
      "Concurrent rendering introduces the concept of 'lanes' — a bitmask priority system where each bit represents a priority level. SyncLane (user input) has the highest priority; TransitionLane is lower. React can start rendering a transition, detect a higher-priority SyncLane update, shelve the transition render, process the sync update, then resume the transition. This requires all render-phase code to be pure and idempotent because React may call it multiple times. Strict Mode's double rendering catches violations. The scheduler uses MessageChannel (not requestIdleCallback) for more predictable timing.",
    interviewAnswer:
      "Concurrent rendering is React 18's ability to work on multiple UI updates simultaneously with different priorities. User input gets high priority (SyncLane), while transitions and data fetching get lower priority. React can interrupt a low-priority render to handle a keystroke, then resume. It uses lanes — a bitmask priority system — for scheduling. The key requirement is that render-phase code must be pure since React may call it multiple times.",
    trap:
      "Thinking concurrent rendering makes React faster. It doesn't reduce total work — it makes the UI more responsive by ensuring high-priority updates aren't blocked by low-priority rendering.",
    memoryAnchor:
      "Concurrent rendering is a chef who can pause making a complex dish to plate an urgent appetizer, then resume the complex dish exactly where they left off — the kitchen (main thread) never gets blocked.",
  },

  // ── Component Patterns ──
  {
    id: "composition",
    title: "Composition over Inheritance",
    category: "component-patterns",
    basic:
      "React favors composition over inheritance. Instead of extending a base component, you compose behavior by nesting components and passing children. The React team has never found a use case where inheritance is better than composition.",
    expected:
      "Composition patterns include: children prop for generic containers, specialized components that configure a general one via props, and render props for injecting behavior. A Layout component that wraps content with <Sidebar> and <Header> is composition. Slots can be achieved by passing JSX as named props: <Page header={<Header />} sidebar={<Nav />}>. This is more flexible than inheritance because each piece can be independently tested and replaced.",
    deep:
      "React's composition model aligns with functional programming principles — components are pure functions from props to JSX. This makes them composable like mathematical functions: f(g(x)). Context provides an escape hatch for cross-cutting concerns without explicit prop passing. The children prop is essentially an 'inversion of control' pattern — the parent decides what renders inside the child's layout. This enables patterns like headless UI libraries where the hook/logic component inverts control to the consumer for rendering.",
    interviewAnswer:
      "React exclusively uses composition over inheritance. I compose UIs by nesting components, using children props, and passing JSX as named props for slot-like patterns. This gives better separation of concerns, easier testing, and more flexibility than inheritance hierarchies. The React team explicitly recommends against class inheritance for component reuse.",
    trap:
      "Creating deeply nested wrapper components ('wrapper hell') when a custom hook would be cleaner. Composition is for UI structure; hooks are for stateful logic reuse.",
    memoryAnchor:
      "Composition is LEGO — you snap independent bricks together to build anything. Inheritance is a Russian nesting doll — each doll is trapped inside the shape of its parent.",
  },
  {
    id: "compound-components",
    title: "Compound Components",
    category: "component-patterns",
    basic:
      "Compound components are a pattern where a parent component shares implicit state with its children, working together as a cohesive unit. Think <select> and <option> — they're meaningless apart but powerful together.",
    expected:
      "Implementation uses Context: the parent provides state and callbacks, children consume them. Example: <Tabs> provides activeIndex and setActiveIndex, <Tab> reads activeIndex to style itself, <TabPanel> renders content based on activeIndex. The consumer uses it declaratively: <Tabs><Tab>A</Tab><Tab>B</Tab><TabPanel>Content A</TabPanel></Tabs>. This gives the user full control over rendering order and markup while the parent manages state.",
    deep:
      "Advanced compound components use React.Children.map or the Context pattern to support flexible nesting (children can be wrapped in divs or fragments). The Context approach is more robust because it doesn't rely on direct parent-child relationships. Libraries like Radix UI and Headless UI use this pattern extensively. Type safety can be achieved by constraining the context type and exposing only the compound component's public API through the parent's static properties: Tabs.Tab, Tabs.Panel.",
    interviewAnswer:
      "Compound components let a parent and its children share implicit state via Context, working as a cohesive unit like HTML's select/option. The parent manages state, children consume it, and the user gets a declarative API with full control over rendering. I prefer the Context-based approach over React.Children manipulation for flexibility with nested structures.",
    trap:
      "Using React.Children.map breaks when children are wrapped in fragments or intermediate components. The Context-based approach avoids this fragility.",
    memoryAnchor:
      "Compound components are a band — the lead singer (parent) sets the tempo, and each musician (child) plays their part by listening to the same rhythm (context). They're meaningless as solos.",
  },
  {
    id: "render-props",
    title: "Render Props",
    category: "component-patterns",
    basic:
      "A render prop is a prop whose value is a function that returns JSX. The component calls this function to render part of its UI, passing it internal state or behavior. It's a technique for sharing logic between components.",
    expected:
      "Classic example: <Mouse render={({ x, y }) => <Cursor x={x} y={y} />} />. The Mouse component tracks position and delegates rendering to the consumer. This pattern was popular pre-hooks for sharing stateful logic. The children-as-a-function variant uses children as the render prop: <Mouse>{({ x, y }) => ...}</Mouse>. Render props give the consumer complete control over what's rendered with the shared data.",
    deep:
      "Render props have been largely superseded by custom hooks, which achieve the same logic sharing without the nesting. However, render props still have a niche: when you need conditional rendering at the JSX level (e.g., Formik's <Field> component) or when the shared logic involves lifecycle-like behavior that's tightly coupled to the render tree. Performance tip: if the render prop function is defined inline, it creates a new function every render, which can defeat memoization of the child. Extract it to a variable or use useCallback.",
    interviewAnswer:
      "Render props are functions passed as props that return JSX, allowing components to share logic while letting consumers control rendering. The pattern has been mostly replaced by custom hooks, but still has value in libraries like Formik and Downshift where JSX-level composition is needed. I prefer hooks for new code since they avoid the nesting problem.",
    trap:
      "Nesting multiple render prop components creates 'callback hell' in JSX. This was the primary motivation for hooks — they flatten the same logic sharing into sequential hook calls.",
    memoryAnchor:
      "Render props are a fill-in-the-blank form — the component writes the questions (state/logic) and leaves blanks (render prop) for you to write your own answers (UI).",
  },
  {
    id: "higher-order-components",
    title: "Higher-Order Components (HOC)",
    category: "component-patterns",
    basic:
      "A higher-order component is a function that takes a component and returns a new component with enhanced behavior. It's the React equivalent of a decorator pattern: withAuth(Dashboard) returns an AuthenticatedDashboard.",
    expected:
      "HOCs wrap a component, injecting props from shared logic. Examples: withRouter (React Router v5), connect (Redux), withTheme. HOCs should pass through all received props to the wrapped component and hoist static methods using hoist-non-react-statics. They compose well: compose(withAuth, withTheme, withRouter)(MyComponent). The drawback is 'wrapper hell' in DevTools and potential prop name collisions.",
    deep:
      "HOCs are largely replaced by hooks in modern React, but understanding them is important for legacy codebases and for the pattern itself. Key rules: don't mutate the original component (create a new one), forward refs with React.forwardRef, and copy over displayName for debugging. HOCs break if applied inside render (creates new component type each render, causing remount). Always apply HOCs outside the component definition. TypeScript generic HOCs are notoriously hard to type correctly.",
    interviewAnswer:
      "HOCs are functions that wrap a component to inject additional behavior via props. They were the go-to pattern before hooks for cross-cutting concerns like auth, theming, and routing. I still encounter them in legacy codebases and Redux's connect. For new code, I prefer hooks because they avoid wrapper hell, prop collisions, and the DevTools debugging challenges of deeply nested HOCs.",
    trap:
      "Applying an HOC inside a render method creates a new component type on every render, causing the entire subtree to unmount and remount. Always apply HOCs at the module level.",
    memoryAnchor:
      "An HOC is a phone case — it wraps around your phone (component), adds features (grip, card holder), but the phone inside works the same. Stack too many cases and it gets unwieldy.",
  },
  {
    id: "controlled-vs-uncontrolled",
    title: "Controlled vs Uncontrolled Components",
    category: "component-patterns",
    basic:
      "A controlled component has its value driven by React state — the component renders what state says and updates state on change. An uncontrolled component manages its own internal state, and you read its value via a ref when needed.",
    expected:
      "Controlled: <input value={name} onChange={e => setName(e.target.value)} />. Every keystroke flows through React state. This gives you full control for validation, formatting, and conditional updates. Uncontrolled: <input defaultValue='hello' ref={inputRef} />, read inputRef.current.value on submit. Uncontrolled is simpler for forms that only need values on submit. Mixing controlled and uncontrolled on the same input (switching between value and defaultValue) causes React warnings.",
    deep:
      "File inputs are always uncontrolled in React because their value is read-only for security. The controlled pattern is a specific instance of React's data flow principle: the component is a pure function of its props/state. React 19 form actions and useFormStatus introduce a hybrid approach where form state is managed by React but submitted declaratively. Third-party libraries like React Hook Form use the uncontrolled approach with refs for performance (fewer re-renders than controlled) while providing a controlled-like API.",
    interviewAnswer:
      "Controlled components derive their value from React state, giving full control over validation and formatting. Uncontrolled components manage their own state internally, read via refs. I use controlled for complex forms with real-time validation and uncontrolled for simple forms or when integrating non-React libraries. Libraries like React Hook Form use uncontrolled inputs internally for better performance.",
    trap:
      "Setting value without an onChange handler makes the input read-only (React warns). Either add onChange for controlled, or use defaultValue for uncontrolled.",
    memoryAnchor:
      "Controlled = puppet on strings (React pulls every string). Uncontrolled = a pet with a GPS collar (does its own thing, you check location when needed).",
  },

  // ── State Management ──
  {
    id: "lifting-state",
    title: "Lifting State Up",
    category: "state-management",
    basic:
      "When two sibling components need to share state, move (lift) that state to their closest common parent. The parent owns the state and passes it down as props, along with a callback to update it.",
    expected:
      "This is React's fundamental state-sharing mechanism before reaching for Context or external stores. Example: two temperature inputs (Celsius/Fahrenheit) that sync — lift the temperature value to the parent, convert in each child. The downside is prop drilling: if the common ancestor is many levels up, you end up threading props through intermediate components that don't use them. Context or composition (passing components as props) solves this.",
    deep:
      "Lifting state creates a single source of truth, which is a core React principle. The tradeoff is re-rendering: when the parent's state changes, all children re-render. React.memo on children and useMemo for derived values mitigate this. The decision of where to place state follows the 'state colocation' principle — keep state as close to where it's used as possible, only lift when sharing is required. Over-lifting (putting everything in a top-level store) causes global re-renders and defeats React's component isolation.",
    interviewAnswer:
      "Lifting state moves shared state to the closest common parent, creating a single source of truth. The parent passes state down as props and update callbacks. I follow the state colocation principle — keep state close to where it's used, only lift when sibling components need to share. For deep trees, I use Context to avoid prop drilling rather than lifting to the root.",
    trap:
      "Lifting too much state to the top level. This turns the app into a re-render cascade where every state change re-renders the entire tree. Only lift what genuinely needs to be shared.",
    memoryAnchor:
      "Lifting state is like moving the TV remote to the coffee table so everyone on the couch can reach it — instead of each person having their own remote that might get out of sync.",
  },
  {
    id: "context-api",
    title: "Context API Deep Dive",
    category: "state-management",
    basic:
      "The Context API provides a way to pass data through the component tree without explicit prop drilling. createContext creates a context, Provider supplies a value, and useContext consumes it.",
    expected:
      "Context is not a state management solution — it's a dependency injection mechanism. It doesn't manage state; it just transports it. You still need useState or useReducer to hold the state. The performance issue is that all consumers re-render when the provider value changes. Strategies: split contexts by update frequency, memoize the value, use children pattern to prevent parent re-renders. React.memo does NOT block context-triggered re-renders.",
    deep:
      "Context uses a provider-consumer model where React maintains a stack of provider values. When a consumer renders, it walks up the fiber tree to find the nearest matching provider. If no provider is found, the default value from createContext is used (not undefined — a common misunderstanding). For high-frequency updates, consider useSyncExternalStore with an external store (like Zustand or Jotai) that enables granular subscriptions. React 19 simplifies the API: <MyContext value={...}> works directly, no .Provider needed.",
    interviewAnswer:
      "Context is a dependency injection mechanism, not state management — it transports state that's managed by useState or useReducer. I split contexts by update frequency to prevent unnecessary re-renders. For high-frequency updates like cursor position, I use external stores with useSyncExternalStore for selective subscriptions instead of context.",
    trap:
      "Thinking Context replaces Redux or Zustand. Context re-renders ALL consumers on any change; state management libraries provide selective subscriptions. Context is for low-frequency data like theme, locale, auth.",
    memoryAnchor:
      "Context is a building's PA system — everyone hears every announcement. A state management library is a phone system — each person only gets calls meant for them.",
  },
  {
    id: "external-stores",
    title: "External State Stores",
    category: "state-management",
    basic:
      "External stores (Redux, Zustand, Jotai, MobX) manage state outside React's tree. Components subscribe to specific slices of the store and only re-render when their subscribed data changes, solving Context's 'all consumers re-render' problem.",
    expected:
      "useSyncExternalStore is React 18's official hook for integrating external stores. It ensures consistent reads during concurrent rendering by detecting tearing (when different parts of the UI show different versions of the same state). Zustand provides a minimal API: create a store with create(), use it with useStore(selector). Redux Toolkit simplifies Redux with createSlice and configureStore. The choice depends on app complexity: Zustand for simple apps, Redux for large teams needing middleware and devtools.",
    deep:
      "The tearing problem in concurrent rendering: without useSyncExternalStore, a component tree could render with mixed state versions if the store updates mid-render. useSyncExternalStore prevents this by checking if the snapshot changed between the start and end of rendering and forcing a synchronous re-render if it did. Signal-based stores (Preact Signals, Jotai) achieve even finer granularity by tracking which specific atoms/signals each component reads. The React team's long-term direction (React Compiler compiler) may reduce the need for external stores by making React's own state management more efficient.",
    interviewAnswer:
      "External stores manage state outside React's tree with selective subscriptions — components only re-render when their specific slice changes, unlike Context. useSyncExternalStore is the official integration hook that prevents tearing in concurrent rendering. I pick Zustand for most apps due to its minimal API, and Redux Toolkit for large teams that need middleware, devtools, and structured patterns.",
    trap:
      "Using an external store without useSyncExternalStore in concurrent mode can cause tearing — different parts of the UI showing different state versions during the same render.",
    memoryAnchor:
      "An external store is a bank vault — your money (state) lives outside your house (component tree), and each family member (component) has a key to only their safety deposit box (selector).",
  },

  // ── Server Components & RSC ──
  {
    id: "react-server-components",
    title: "React Server Components",
    category: "server-components",
    basic:
      "React Server Components (RSC) run only on the server and send serialized UI (not HTML) to the client. They can directly access databases, file systems, and server APIs. They have zero impact on the client JavaScript bundle size.",
    expected:
      "Components are server by default in frameworks like Next.js App Router. Add 'use client' at the top of a file to make it a Client Component. Server Components can render Client Components, but Client Components cannot import Server Components (they can receive them as children/props though). RSC output is a React-specific wire format (not HTML) that supports streaming and preserves client component state during navigation.",
    deep:
      "The RSC wire format is a JSON-like streaming protocol where each line represents a chunk of the UI tree, including references to client component bundles. Client components in the payload are represented as module references that the client runtime resolves and hydrates. This enables partial hydration — only interactive (client) components ship JavaScript. Server Components can use async/await directly at the component level: async function Page() { const data = await db.query(...); return <List data={data} />; }. The mental model: Server Components are the 'data fetching and layout layer', Client Components are the 'interactivity layer'.",
    interviewAnswer:
      "Server Components run exclusively on the server, directly access backend resources, and add zero bytes to the client bundle. They send a streaming wire format, not HTML, which preserves client component state during navigation. The boundary is 'use client' — server components handle data and layout, client components handle interactivity. Server components can render client components, but not vice versa for imports.",
    trap:
      "Thinking Server Components are the same as SSR. SSR renders the entire tree to HTML on the server then hydrates everything on the client. RSC runs specific components on the server permanently — they never hydrate, never ship JS, and can be re-fetched without losing client state.",
    memoryAnchor:
      "Server Components are the kitchen staff at a restaurant — they prep the ingredients (data) and plate the food (layout) but never come to the dining room (client). The waiters (Client Components) handle the customer interaction.",
  },
  {
    id: "server-actions",
    title: "Server Actions",
    category: "server-components",
    basic:
      "Server Actions are async functions marked with 'use server' that run on the server but can be called from client components like regular functions. They simplify form submissions and mutations (though API routes are still needed for webhooks, third-party integrations, and non-Next.js consumers).",
    expected:
      "Server Actions can be passed as the action prop to <form>, enabling progressive enhancement (forms work without JavaScript). They automatically handle serialization of FormData. They can also be called directly from event handlers: onClick={() => await deleteItem(id)}. Under the hood, the framework creates an HTTP endpoint for each action. They integrate with React's transition system, so calling a Server Action can trigger Suspense boundaries.",
    deep:
      "Server Actions use a POST request with a special encoding. The framework generates a unique ID for each action function, and the client sends this ID plus serialized arguments. Return values are serialized back to the client and can update the UI via revalidation. Security considerations: Server Actions are public HTTP endpoints, so they must validate inputs and check authorization — the 'use server' directive doesn't make them secure by default. They work with useActionState (React 19) for optimistic updates, pending states, and error handling.",
    interviewAnswer:
      "Server Actions are async server functions marked with 'use server' that can be called from client components. They simplify mutations by removing the need for manual API routes, and work as form actions with progressive enhancement. Key security point: they're public HTTP endpoints under the hood, so input validation and auth checks are still required. I pair them with useActionState for optimistic updates and pending states.",
    trap:
      "Assuming 'use server' provides security. It only marks the function as a server endpoint. You must still validate inputs, check authentication, and sanitize data — just like any API route.",
    memoryAnchor:
      "Server Actions are a drive-through window — you place your order (call the action) from your car (client), the kitchen (server) prepares it, and hands it back. But the kitchen still needs to check your payment (auth) and verify the order makes sense (validation).",
  },
  {
    id: "streaming-ssr",
    title: "Streaming SSR & Suspense",
    category: "server-components",
    basic:
      "Streaming SSR sends HTML to the browser in chunks as components resolve, instead of waiting for the entire page to render. Suspense boundaries define where to show fallback UI while parts of the tree are still loading.",
    expected:
      "With renderToPipeableStream (Node) or renderToReadableStream (Edge), React streams HTML progressively. The browser can start rendering the shell (header, nav, layout) immediately while data-dependent sections load. When a suspended component resolves, React injects the HTML inline with a <script> that swaps it in place. This dramatically improves Time to First Byte (TTFB) and Largest Contentful Paint (LCP) compared to traditional SSR that blocks on the slowest data fetch.",
    deep:
      "Streaming SSR works with selective hydration — React prioritizes hydrating components that the user is interacting with. If the user clicks a button that's still being hydrated, React bumps its priority. The <Suspense> boundary serves dual purpose: SSR fallback (what to show while streaming) and client-side transition fallback. Nested Suspense boundaries create a 'loading waterfall' by design — outer shells appear first, inner content fills in. Error boundaries combined with Suspense handle both loading and error states. React's streaming format interleaves HTML chunks with inline scripts that perform DOM surgery to replace fallbacks.",
    interviewAnswer:
      "Streaming SSR sends HTML progressively as components resolve, improving TTFB and LCP. Suspense boundaries define fallback UI for loading sections. The browser renders the shell immediately while data-heavy sections stream in. React also prioritizes hydration for components the user interacts with — selective hydration. I use nested Suspense boundaries to create progressive loading experiences.",
    trap:
      "Assuming Suspense boundaries only work client-side. In streaming SSR, Suspense controls what HTML is sent first (the shell) and what streams in later. It's a server and client concept.",
    memoryAnchor:
      "Streaming SSR is a newspaper printing press — headlines (shell) print first and hit the streets while the detailed articles (data-heavy sections) are still being typeset. Readers start reading immediately.",
  },

  // ── Performance ──
  {
    id: "react-memo",
    title: "React.memo",
    category: "performance",
    basic:
      "React.memo is a higher-order component that skips re-rendering a component if its props haven't changed. It performs a shallow comparison of props by default and can accept a custom comparison function.",
    expected:
      "React.memo only prevents re-renders caused by parent re-rendering with the same props. It does NOT prevent re-renders from state changes or context changes inside the component. Common mistake: wrapping a component in React.memo while passing inline objects or functions as props — new references defeat the memo. You must combine React.memo with useMemo (for objects) and useCallback (for functions) on the parent side for it to be effective.",
    deep:
      "React.memo's shallow comparison checks every prop with Object.is. If any prop has a new reference, the component re-renders. The custom comparator receives (prevProps, nextProps) and returns true to skip rendering (opposite of shouldComponentUpdate). React.memo is applied to the component definition, not the usage site, so it affects all instances. In React 19 with the compiler, manual React.memo becomes unnecessary as the compiler can determine when components need re-rendering. Profile first — React.memo adds comparison overhead per render, which can be slower than just re-rendering for simple components.",
    interviewAnswer:
      "React.memo skips re-rendering when props haven't changed via shallow comparison. I pair it with useMemo and useCallback on the parent to ensure stable prop references. It doesn't block re-renders from internal state or context changes. I always profile before memoizing — for simple components, the comparison overhead can exceed the rendering cost.",
    trap:
      "Wrapping everything in React.memo. For components that almost always receive different props, memo adds overhead without benefit. Also, React.memo doesn't prevent Context-triggered re-renders.",
    memoryAnchor:
      "React.memo is a bouncer checking IDs — 'Same props? You're already inside, no need to enter again.' But if you keep getting a new ID (new reference) every time, the bouncer can't help you.",
  },
  {
    id: "lazy-and-suspense",
    title: "React.lazy & Code Splitting",
    category: "performance",
    basic:
      "React.lazy enables code splitting by loading components dynamically via dynamic import(). Combined with Suspense, it shows a fallback while the component's code is being fetched over the network.",
    expected:
      "Usage: const LazyChart = lazy(() => import('./Chart')). Wrap in <Suspense fallback={<Spinner />}>. The component's code is split into a separate bundle chunk that's only downloaded when first rendered. Route-based splitting is the most impactful — split each page into its own chunk. Named exports need a wrapper: lazy(() => import('./utils').then(m => ({ default: m.Chart }))). Preloading can improve UX: trigger the import() on hover/focus before the user navigates.",
    deep:
      "Under the hood, lazy() creates a component that throws a promise during its first render. Suspense catches this promise (using the error boundary mechanism), renders the fallback, and re-renders when the promise resolves. This is the same mechanism used for data fetching with Suspense-compatible libraries. In SSR with streaming, lazy components can be loaded server-side too — the code still splits for the client bundle, but the server renders the component immediately. React.lazy doesn't support Server Components directly; server components are inherently code-split because they never ship to the client.",
    interviewAnswer:
      "React.lazy with Suspense enables code splitting — loading component code on demand. I use it primarily for route-based splitting, which has the highest impact. The mechanism works by throwing a promise that Suspense catches, showing a fallback until the code loads. I preload chunks on hover for better UX and combine with route prefetching in frameworks like Next.js.",
    trap:
      "Using React.lazy for every small component. The overhead of an extra network request can outweigh the bundle savings for tiny components. Split at meaningful boundaries: routes, modals, heavy visualizations.",
    memoryAnchor:
      "React.lazy is like a library's reserve section — the book (component code) isn't on the shelf until you request it. Suspense is the 'fetching your book' sign while you wait.",
  },
  {
    id: "preventing-rerenders",
    title: "Preventing Unnecessary Re-renders",
    category: "performance",
    basic:
      "Unnecessary re-renders happen when a component renders again producing the same output. The main strategies to prevent them: React.memo for components, useMemo/useCallback for values/functions, and proper state structure to avoid cascading updates.",
    expected:
      "Key techniques: (1) Move state down — if only one child needs state, don't put it in the parent. (2) Lift content up — pass children as props so the parent's re-render doesn't recreate the children. (3) React.memo + stable props. (4) Split Context by update frequency. (5) Use key to reset instead of effects. A re-render is not inherently bad — React's diffing is fast. Only optimize when you measure actual performance problems with the React Profiler or browser DevTools.",
    deep:
      "The 'children as props' pattern is underappreciated: <ExpensiveParent>{children}</ExpensiveParent> — when ExpensiveParent re-renders, children is the same JSX reference (created by the grandparent), so React skips diffing the subtree. This is free memoization without React.memo. React DevTools Profiler's 'Why did this render?' shows exactly which props or state changed. The experimental React compiler (React Compiler) aims to eliminate most manual memoization by automatically tracking dependencies and memoizing at the optimal granularity.",
    interviewAnswer:
      "I follow a hierarchy: first, colocate state close to where it's used. Then, use the 'children as props' pattern for free memoization. Next, React.memo with stable props via useMemo/useCallback. Finally, split contexts and use external stores for high-frequency data. I always profile before optimizing — React's diffing is fast, and premature optimization adds complexity. The React compiler will automate most of this.",
    trap:
      "Optimizing without measuring. Adding React.memo, useMemo, and useCallback everywhere makes code harder to read and maintain while often having zero measurable impact. Profile first, optimize the actual bottlenecks.",
    memoryAnchor:
      "Preventing re-renders is like soundproofing a house — first close the obvious gaps (state colocation), then add insulation (memo), but don't soundproof rooms that aren't noisy (premature optimization).",
  },

  // ── Rendering ──
  {
    id: "render-vs-commit",
    title: "Render Phase vs Commit Phase",
    category: "rendering",
    basic:
      "React's update cycle has two phases: the render phase (calling component functions to build the virtual DOM, pure and can be paused) and the commit phase (applying DOM mutations, synchronous and uninterruptible).",
    expected:
      "During the render phase, React calls your component functions and diffs the old and new element trees. No DOM mutations happen here. This phase must be pure — no side effects, no DOM access, no subscriptions. In concurrent mode, React may pause, discard, or restart the render phase. The commit phase applies the computed DOM mutations (insertions, updates, deletions), attaches refs, and fires synchronous effects (useLayoutEffect). After the browser paints, passive effects (useEffect) run.",
    deep:
      "The commit phase has sub-phases: (1) Before mutation — snapshot lifecycle methods, getSnapshotBeforeUpdate. (2) Mutation — actual DOM operations are performed. (3) Layout — useLayoutEffect callbacks fire, ref.current is set. (4) After paint — useEffect callbacks fire in a microtask. In concurrent rendering, the render phase can be called multiple times for the same update, but the commit phase runs exactly once. This is why side effects in render functions are dangerous — they'd execute multiple times. The commit phase processes effects depth-first: child layout effects before parent layout effects, ensuring children are fully mounted when parents read refs.",
    interviewAnswer:
      "Render phase is where React calls component functions and diffs the virtual DOM — it's pure and interruptible in concurrent mode. Commit phase applies DOM mutations synchronously, then fires layout effects, then browser paints, then passive effects. Side effects only go in the commit phase (effects and event handlers) because the render phase may run multiple times.",
    trap:
      "Performing side effects (API calls, subscriptions, DOM manipulation) during the render phase. In concurrent mode, your render function may be called multiple times for one update, causing duplicate side effects.",
    memoryAnchor:
      "Render phase is the architect drafting blueprints (can revise, restart, discard). Commit phase is the construction crew building from the final blueprint (uninterruptible, one shot).",
  },
  {
    id: "error-boundaries",
    title: "Error Boundaries",
    category: "rendering",
    basic:
      "Error boundaries are React components that catch JavaScript errors in their child component tree during rendering, in lifecycle methods, and in constructors. They display a fallback UI instead of crashing the whole app.",
    expected:
      "Error boundaries are class components implementing static getDerivedStateFromError (to render fallback UI) and/or componentDidCatch (for error logging). They do NOT catch errors in event handlers (use try/catch), async code (use promise catch), SSR, or errors thrown in the boundary itself. Place them strategically: a top-level boundary prevents a white screen, granular boundaries isolate failures to specific widgets. You can reset an error boundary by changing its key prop.",
    deep:
      "There's no hook equivalent of error boundaries — they require class components (or a library like react-error-boundary that wraps the class). The react-error-boundary library provides a functional API with ErrorBoundary component, fallbackRender, onReset, and resetKeys. In React 19, error boundaries work with Suspense for server component errors — if a server component throws, the nearest error boundary catches it. Error boundaries pair well with Suspense: <ErrorBoundary fallback={<Error />}><Suspense fallback={<Loading />}><AsyncComponent /></Suspense></ErrorBoundary>.",
    interviewAnswer:
      "Error boundaries catch rendering errors in the child tree and display fallback UI. They're class components — no hook equivalent exists yet, so I use the react-error-boundary library for a functional API. I place them at multiple levels: a top-level one for crash prevention and granular ones around risky widgets. They pair with Suspense to handle both loading and error states.",
    trap:
      "Expecting error boundaries to catch errors in event handlers or async code. They only catch errors during React's render and commit phases. Use try/catch for event handlers and .catch() for promises.",
    memoryAnchor:
      "Error boundaries are safety nets at a circus — they catch performers (components) who fall during the act (rendering), but they can't help if someone trips backstage (event handlers).",
  },
  {
    id: "transitions",
    title: "Transitions (startTransition)",
    category: "rendering",
    basic:
      "startTransition marks a state update as non-urgent, telling React it can be interrupted by higher-priority updates like user input. The UI stays responsive even during expensive re-renders.",
    expected:
      "Usage: startTransition(() => setSearchResults(filtered)). While the transition is pending, isPending from useTransition is true, useful for showing a spinner. Transitions don't delay the update — they allow React to interrupt it. If the user types again before the transition completes, React discards the in-progress render and starts a new one with the latest value. useDeferredValue is the value-based equivalent: it returns a deferred version of a value that lags behind during transitions.",
    deep:
      "Under the hood, startTransition marks the update with a TransitionLane — a lower-priority lane than SyncLane (user input). The scheduler can interrupt transition rendering when a sync update arrives. This is the core benefit of concurrent rendering: without it, React would block the main thread completing the transition render, making the UI unresponsive. Transitions compose with Suspense: a transition can trigger a Suspense boundary without immediately showing the fallback (it shows the old UI as stale instead). This prevents loading state flicker for fast transitions.",
    interviewAnswer:
      "startTransition marks state updates as interruptible low-priority work. The UI stays responsive because React handles user input at a higher priority, discarding in-progress transition renders if new input arrives. I use useTransition for the isPending flag to show loading indicators, and useDeferredValue for derived values. Transitions compose with Suspense to avoid flashing loading states.",
    trap:
      "Wrapping synchronous computations in startTransition and expecting them to be 'debounced'. Transitions don't defer execution — they mark the update as interruptible. The computation still runs; it can just be interrupted.",
    memoryAnchor:
      "startTransition is a 'low priority' stamp on a mail package — the post office (React) delivers express mail (user input) first and comes back to your package when there's time, discarding it if you send a replacement.",
  },

  // ── Testing ──
  {
    id: "react-testing-library",
    title: "React Testing Library",
    category: "testing",
    basic:
      "React Testing Library (RTL) tests components from the user's perspective — finding elements by accessible roles, text, and labels rather than implementation details like component names or state. Its philosophy: 'The more your tests resemble the way your software is used, the more confidence they give you.'",
    expected:
      "Core API: render(<Component />) returns a container. Queries prioritize: getByRole > getByLabelText > getByText > getByTestId (last resort). userEvent simulates real user interactions (typing, clicking) with event propagation, preferred over fireEvent. act() ensures all state updates and effects are processed before assertions. waitFor() handles async updates. screen is the recommended way to access queries: screen.getByRole('button', { name: 'Submit' }).",
    deep:
      "RTL renders into a real DOM (jsdom), not a shallow render, giving higher confidence that components integrate correctly. renderHook() tests custom hooks without wrapper components. For async testing: findBy* queries combine getBy* with waitFor(), retrying until the element appears or a timeout hits. MSW (Mock Service Worker) intercepts network requests at the service worker level for realistic API mocking. Testing Server Components requires different tools since they run on the server — use integration tests or the framework's testing utilities (e.g., Next.js test mode).",
    interviewAnswer:
      "React Testing Library tests from the user's perspective using accessible queries — getByRole, getByLabelText, getByText. I use userEvent over fireEvent for realistic interactions, waitFor for async updates, and MSW for API mocking. The key principle is testing behavior, not implementation — I never query by component name or internal state. For custom hooks, I use renderHook.",
    trap:
      "Testing implementation details like state values, component instances, or internal methods. When you refactor (changing state structure, extracting hooks), these tests break even though behavior is unchanged. Test what the user sees and does.",
    memoryAnchor:
      "RTL is a mystery shopper — they don't inspect the kitchen (implementation); they sit at the table, read the menu (accessible labels), order food (user events), and check if the right dish arrives (assertions).",
  },
];

// ─── Interview Patterns ───────────────────────────────────────────────────────
const interviewPatterns: InterviewPattern[] = [
  {
    question: "Explain React's reconciliation algorithm and why keys matter.",
    answer:
      "React diffs the old and new virtual DOM trees using two heuristics: different element types produce different subtrees (full teardown), and keys identify stable children in lists. Keys enable O(n) list diffing by letting React match old and new items without comparing every pair. Without keys, React uses index matching, which breaks when items are reordered or deleted, causing mismatched state and incorrect UI.",
    whyAsked:
      "Tests understanding of React's core rendering mechanism and ability to debug subtle UI bugs caused by missing or incorrect keys.",
    trap:
      "Saying keys 'improve performance' without explaining why — it's about correctness first. Wrong keys cause state bugs; performance is a secondary benefit.",
  },
  {
    question: "What's the difference between useEffect and useLayoutEffect?",
    answer:
      "useEffect runs asynchronously after the browser paints — it doesn't block visual updates. useLayoutEffect runs synchronously after DOM mutations but before paint — it blocks the browser from painting until it completes. Use useLayoutEffect for DOM measurements and mutations that must be visually synchronous (tooltip positioning, scroll restoration). Use useEffect for everything else (data fetching, subscriptions).",
    whyAsked:
      "Reveals deep understanding of React's commit phase timing and when visual consistency matters.",
    trap:
      "Using useLayoutEffect for data fetching — it blocks paint, making the UI feel slower. It should only be used when you need to read/write DOM before the user sees the result.",
  },
  {
    question: "How do React Server Components differ from SSR?",
    answer:
      "SSR renders the entire component tree to HTML on the server, sends it to the client, then hydrates the whole tree with JavaScript. RSC runs specific components permanently on the server — they never ship JavaScript and never hydrate. RSC sends a streaming wire format (not HTML) that preserves client component state during navigation. Server Components can be re-fetched without losing client-side state, while SSR always produces a full HTML page that requires re-hydration.",
    whyAsked:
      "Tests understanding of the modern React architecture and ability to make informed choices about where computation happens.",
    trap:
      "Conflating RSC with SSR or thinking 'use client' means client-only rendering. 'use client' components still SSR — the directive means they ship JavaScript for hydration.",
  },
  {
    question: "How do you prevent unnecessary re-renders in React?",
    answer:
      "First, colocate state where it's used — don't lift unnecessarily. Second, use the children-as-props pattern for free memoization. Third, React.memo with stable props via useMemo and useCallback. Fourth, split Context by update frequency. Fifth, use useDeferredValue or startTransition for expensive non-urgent updates. Always profile before optimizing — React's diffing is fast, and premature memoization adds complexity.",
    whyAsked:
      "Assesses understanding of React's rendering model and practical performance optimization skills.",
    trap:
      "Jumping straight to React.memo without considering simpler solutions like state colocation or the children pattern. Also, saying 'wrap everything in React.memo' — this shows lack of nuanced understanding.",
  },
  {
    question: "Explain the rules of hooks and why they exist.",
    answer:
      "Two rules: (1) Only call hooks at the top level — never inside conditions, loops, or nested functions. (2) Only call hooks from React function components or custom hooks. These rules exist because React stores hook state in a linked list on the fiber, matched by call order. Conditional hook calls would shift the list, mapping values to the wrong hooks. The linter plugin eslint-plugin-react-hooks enforces these rules at compile time.",
    whyAsked:
      "Fundamental React knowledge that reveals whether the candidate understands hooks at an implementation level, not just API level.",
    trap:
      "Saying hooks 'don't work' in conditions without explaining why. The real answer is about the linked list data structure and call order matching.",
  },
  {
    question: "What is the fiber architecture and why was it introduced?",
    answer:
      "Fiber is React's reconciliation engine introduced in React 16. It represents the component tree as a linked list of fiber nodes rather than a recursive call stack. This enables incremental rendering — React can pause, resume, and abort rendering work across multiple frames. Before Fiber, React's stack reconciler was synchronous and uninterruptible, meaning a large update blocked the main thread. Fiber enables concurrent features like startTransition and prioritized updates.",
    whyAsked:
      "Tests deep understanding of React internals and the motivation behind concurrent rendering.",
    trap:
      "Confusing Fiber with the virtual DOM. Fiber is the engine that processes the virtual DOM — the data structure (fiber nodes) and the algorithm (work loop with priorities).",
  },
  {
    question: "How would you handle global state in a large React application?",
    answer:
      "I'd use a layered approach: React state + Context for low-frequency, UI-scoped data (theme, locale, auth). An external store like Zustand or Redux Toolkit for high-frequency, cross-cutting state (shopping cart, real-time data). Server state managed by TanStack Query or SWR for cached API data with automatic revalidation. URL state via the router for shareable/bookmarkable state. The key is matching the state type to the right tool, not putting everything in one global store.",
    whyAsked:
      "Assesses architectural thinking and ability to make pragmatic choices about state management at scale.",
    trap:
      "Saying 'just use Redux for everything' or 'just use Context for everything'. Both are wrong — Redux is overkill for theme data, and Context causes unnecessary re-renders for high-frequency updates.",
  },
  {
    question: "What happens during React hydration and what can go wrong?",
    answer:
      "Hydration attaches event listeners and React's internal state to server-rendered HTML. React walks the DOM and matches it against the component tree, assuming the server and client produce identical output. If there's a mismatch (different content, extra nodes), React warns and may re-render the mismatched subtree from scratch. Common causes: using Date.now() or Math.random() during render, browser extensions modifying DOM, window-dependent code running on the server.",
    whyAsked:
      "Tests understanding of SSR/hydration, a frequent source of production bugs in Next.js and Remix apps.",
    trap:
      "Thinking hydration is the same as re-rendering. Hydration reuses existing DOM nodes — it attaches handlers and state without creating new elements. Re-rendering would discard and rebuild the DOM.",
  },
];

// ─── Common Mistakes ──────────────────────────────────────────────────────────
const commonMistakes: CommonMistake[] = [
  {
    wrong: "Mutating state directly: state.items.push(newItem); setState(state)",
    correct:
      "Create a new reference: setState({ ...state, items: [...state.items, newItem] })",
  },
  {
    wrong: "Using useEffect for derived state: useEffect(() => setFullName(first + last), [first, last])",
    correct:
      "Compute during render: const fullName = first + ' ' + last. No effect needed for synchronous derivation.",
  },
  {
    wrong: "Fetching data in useEffect without a cleanup to handle race conditions",
    correct:
      "Use an AbortController in the cleanup: const controller = new AbortController(); return () => controller.abort();",
  },
  {
    wrong: "Using array index as key for dynamic lists: items.map((item, i) => <Item key={i} />)",
    correct:
      "Use a stable unique identifier from the data: items.map(item => <Item key={item.id} />)",
  },
  {
    wrong: "Wrapping every function in useCallback and every value in useMemo without measuring",
    correct:
      "Profile first. Only memoize when passing to React.memo children, using as effect dependencies, or when computation is genuinely expensive.",
  },
  {
    wrong: "Putting all state in a single Context provider, causing every consumer to re-render on any change",
    correct:
      "Split contexts by update frequency. Use separate providers for theme, auth, and UI state.",
  },
  {
    wrong: "Using useEffect to sync props to state: useEffect(() => setLocalValue(prop), [prop])",
    correct:
      "Use the prop directly, or use key to reset component state: <Component key={prop.id} initialValue={prop.value} />",
  },
  {
    wrong: "Reading ref.current during render in concurrent mode",
    correct:
      "Only read refs in useEffect, useLayoutEffect, or event handlers. During render, ref values may be stale or inconsistent.",
  },
  {
    wrong: "Thinking 'use client' means the component only renders on the client",
    correct:
      "'use client' marks the client boundary — the component still SSRs to HTML but also ships JavaScript for hydration and interactivity.",
  },
  {
    wrong: "Creating objects/arrays inside JSX props: <Child style={{ color: 'red' }} />",
    correct:
      "Move static objects outside the component or memoize them. Inline objects create new references every render, defeating React.memo.",
  },
  {
    wrong: "Using useEffect for event subscriptions without cleanup",
    correct:
      "Always return a cleanup function: useEffect(() => { window.addEventListener('resize', handler); return () => window.removeEventListener('resize', handler); });",
  },
  {
    wrong: "Calling hooks conditionally: if (loggedIn) { useState(...) }",
    correct:
      "Hooks must be called unconditionally at the top level. Move the condition inside: const [value] = useState(loggedIn ? defaultVal : null)",
  },
  {
    wrong: "Assuming Server Components can use hooks or browser APIs",
    correct:
      "Server Components run on the server — no useState, useEffect, or window/document. Move interactive logic to Client Components.",
  },
  {
    wrong: "Passing a Server Component as an import to a Client Component",
    correct:
      "Pass Server Components as children or props (JSX): <ClientComponent><ServerComponent /></ClientComponent>. Client Components can't import Server Components.",
  },
];

// ─── Practice Questions ───────────────────────────────────────────────────────
const practiceQuestions: PracticeQuestion[] = [
  {
    code: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}`,
    question:
      "What value does count show after clicking the button once? Why?",
    answer:
      "count shows 1, not 3. All three setCount calls capture the same closure where count is 0, so each sets state to 0 + 1 = 1. React batches them into one re-render. Fix: use the functional form setCount(prev => prev + 1) three times to get 3.",
  },
  {
    code: `function App() {
  const [items, setItems] = useState(['A', 'B', 'C']);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <input defaultValue={item} />
        </li>
      ))}
      <button onClick={() => setItems(['Z', ...items])}>
        Add Z to start
      </button>
    </ul>
  );
}`,
    question:
      "What bug occurs when clicking 'Add Z to start'? How do you fix it?",
    answer:
      "Using index as key means React matches by position. After prepending 'Z', index 0 maps to the old 'A' input. The uncontrolled input keeps its DOM state ('A'), but the item is now 'Z'. The inputs appear shifted/wrong. Fix: use a stable unique key per item, e.g., the item value or a generated ID.",
  },
  {
    code: `function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(\`/api/search?q=\${query}\`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]);

  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>;
}`,
    question:
      "What race condition exists here, and how would you fix it?",
    answer:
      "If query changes rapidly (user typing), multiple fetches fire. A slow response for an earlier query can arrive after a faster response for the latest query, overwriting correct results with stale ones. Fix: use an AbortController in the cleanup function, or use a boolean flag: let ignore = false; return () => { ignore = true; }; then check if (!ignore) before calling setResults.",
  },
  {
    code: `const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
      <Footer />
    </ThemeContext.Provider>
  );
}`,
    question:
      "What performance problem does this Context setup have? How would you fix it?",
    answer:
      "Every time App re-renders (any state change), a new object { theme, setTheme } is created, causing ALL consumers of ThemeContext to re-render — even if theme didn't change. Fix: memoize the value with useMemo: const value = useMemo(() => ({ theme, setTheme }), [theme]). Even better: split into ThemeContext (value) and ThemeDispatchContext (setter) so components that only read don't re-render when only the dispatch is used.",
  },
  {
    code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(null); // reset
    fetchUser(userId).then(setUser);
  }, [userId]);

  if (!user) return <Spinner />;
  return <Profile user={user} />;
}`,
    question:
      "What's a cleaner pattern than using useEffect to reset state when userId changes?",
    answer:
      "Use the key prop to force a remount: <UserProfile key={userId} userId={userId} />. When key changes, React unmounts the old instance and mounts a new one with fresh state. This eliminates the need for the setUser(null) reset in useEffect and avoids the brief flash of stale data. The component becomes simpler: just fetch on mount.",
  },
  {
    code: `// Is this a valid custom hook?
function getWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}`,
    question:
      "What's wrong with this custom hook? List all issues.",
    answer:
      "1) Name must start with 'use' (useWindowSize, not getWindowSize) — React's linter won't enforce hook rules inside it. 2) Accessing window.innerWidth during useState initialization breaks SSR (window is undefined on the server). Fix: use lazy initializer or default to 0/undefined and update in useEffect. 3) Missing cleanup isn't an issue here (it has one), but the initial state should handle SSR: useState(() => typeof window !== 'undefined' ? { width: window.innerWidth, ... } : { width: 0, height: 0 }).",
  },
];

// ─── Last Hour Summary ────────────────────────────────────────────────────────
const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "Hooks store state in a linked list on the fiber — call order must be identical every render (no conditional hooks)",
    "React 18 batches ALL state updates (events, timeouts, promises) into a single re-render",
    "Fiber enables incremental rendering — React can pause, resume, and prioritize rendering work",
    "Reconciliation uses two heuristics (same type = update, different type = teardown) with O(n) complexity; keys identify stable list items",
    "Server Components run permanently on the server with zero client JS; 'use client' marks the interactivity boundary (still SSRs!)",
    "Prevent re-renders: colocate state → children-as-props → React.memo + stable references → split Context → external stores",
    "useEffect runs after paint (non-blocking); useLayoutEffect runs before paint (blocking) — use the latter only for DOM measurements",
  ],
  mustKnowConcepts: [
    { name: "useState", oneLiner: "Returns [value, setter]; functional updater for prev-dependent state; batched in React 18" },
    { name: "useEffect", oneLiner: "Post-paint side effects; cleanup runs before next effect and on unmount; closure captures render's state" },
    { name: "Fiber Architecture", oneLiner: "Linked-list tree of work units enabling incremental, interruptible rendering with lane-based priorities" },
    { name: "Reconciliation", oneLiner: "O(n) diffing via two heuristics — same type reuses fiber, different type tears down subtree; keys for list stability" },
    { name: "React Server Components", oneLiner: "Server-only components with zero client JS; streaming wire format preserves client state; 'use client' marks the boundary" },
    { name: "React.memo", oneLiner: "Skips re-render on same props (shallow compare); pair with useMemo/useCallback for stable references" },
    { name: "Custom Hooks", oneLiner: "Reusable stateful logic; share logic not state; each call creates independent state" },
    { name: "Preventing Re-renders", oneLiner: "Colocate state → children pattern → memo → split context → external stores; always profile first" },
    { name: "Keys", oneLiner: "Stable IDs for list items; never use index for dynamic lists; key change = full remount (state reset pattern)" },
    { name: "Concurrent Rendering", oneLiner: "Multiple UI versions prepared simultaneously; lanes prioritize user input over transitions" },
  ],
  topTraps: [
    "Mutating state objects/arrays instead of creating new references — React.memo and useState bail-out both check reference equality",
    "Using useEffect for derived state (compute during render) or syncing props to state (use key pattern instead)",
    "Array index as key in dynamic lists — state sticks to index, not item, causing subtle corruption",
    "Thinking 'use client' means client-only — it still SSRs, it just ships JS for hydration",
    "Putting a large object in Context without memoizing — every consumer re-renders on any property change",
    "Performing side effects in the render phase — concurrent mode may call render multiple times per update",
  ],
};

// ─── Last Hour Concept IDs ────────────────────────────────────────────────────
const lastHourConceptIds: string[] = [
  "usestate",
  "useeffect",
  "custom-hooks",
  "fiber-architecture",
  "reconciliation",
  "keys-and-diffing",
  "concurrent-rendering",
  "react-server-components",
  "react-memo",
  "preventing-rerenders",
  "render-vs-commit",
  "context-api",
];

// ─── Export ───────────────────────────────────────────────────────────────────
export const topicData: TopicData = {
  topicTitle: "React",
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
