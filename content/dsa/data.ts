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
    "DSA is the vocabulary of problem-solving: a finite set of data representations (arrays, trees, graphs, hash tables, heaps) paired with algorithmic strategies (divide-and-conquer, dynamic programming, greedy, two pointers) that let you reason about time and space trade-offs before writing a single line of code.",
  whyItExists:
    "Raw compute is finite. Every millisecond or megabyte you waste at scale multiplies across millions of requests. DSA gives you the tools to choose the right abstraction — not the clever one, not the familiar one, but the one that is provably correct and efficient for the constraints you have.",
  whenToUse: [
    "Whenever a problem has measurable input size N and you need to argue that your solution scales",
    "When the naive solution is obvious but too slow — reach for a pattern (sliding window, BFS, DP)",
    "When choosing between data structures: hash map for O(1) lookup, heap for order-dependent retrieval, trie for prefix queries",
    "In system design when discussing data layout, cache eviction policies, or index structures",
    "When analyzing existing code for performance bottlenecks before optimizing",
  ],
  whereItFails: [
    "Over-engineering: applying O(n log n) sorting to a list of 10 items adds complexity with no benefit",
    "Premature optimization before profiling — Big O hides constants that matter at small N",
    "Treating DSA as pattern-matching memorization rather than reasoning from first principles",
    "Ignoring cache locality: an O(n²) algorithm with great cache behavior often beats O(n log n) with poor locality in practice",
  ],
};

// ─── Category Metadata ────────────────────────────────────────────────────────

const categories: CategoryMeta[] = [
  {
    id: "complexity",
    label: "Complexity Analysis",
    description:
      "Big O notation, time vs space trade-offs, amortized analysis, and reasoning about best/worst/average cases",
  },
  {
    id: "arrays-strings",
    label: "Arrays & Strings",
    description:
      "Two pointers, sliding window, prefix sums, binary search, in-place techniques, and string pattern matching",
  },
  {
    id: "trees-graphs",
    label: "Trees & Graphs",
    description:
      "DFS/BFS, tree traversals, LCA, balanced BSTs, tries, topological sort, and union-find",
  },
  {
    id: "dynamic-programming",
    label: "Dynamic Programming",
    description:
      "Memoization vs tabulation, state definition, and canonical DP patterns: knapsack, LCS, LIS, coin change",
  },
  {
    id: "sorting-searching",
    label: "Sorting & Searching",
    description:
      "Quicksort partition, mergesort, heapsort, counting sort — when and why to use each",
  },
  {
    id: "heaps-queues",
    label: "Heaps & Priority Queues",
    description:
      "Min/max heap internals, heapify, k-th largest, merge k sorted lists, monotonic queues",
  },
  {
    id: "hash-tables",
    label: "Hash Tables",
    description:
      "Collision resolution, open addressing vs chaining, load factor, rolling hash, and practical hash map usage",
  },
  {
    id: "design-patterns-ds",
    label: "DS Design Patterns",
    description:
      "Recurring algorithmic patterns: monotonic stack, fast/slow pointers, interval merge, and classic system-design data structures",
  },
];

// ─── Mental Model Tree ────────────────────────────────────────────────────────

const mentalModelTree: TreeNode = {
  id: "root",
  label: "DSA Fundamentals",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "cat-complexity",
      label: "Complexity Analysis",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "big-o-tree", label: "Big O Notation", nodeType: "concept", conceptId: "big-o", importance: "critical" },
        { id: "time-vs-space-tree", label: "Time vs Space Trade-off", nodeType: "concept", conceptId: "time-vs-space", importance: "critical" },
        { id: "amortized-tree", label: "Amortized Analysis", nodeType: "concept", conceptId: "amortized", importance: "high" },
      ],
    },
    {
      id: "cat-arrays-strings",
      label: "Arrays & Strings",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "two-pointers-tree", label: "Two Pointers", nodeType: "concept", conceptId: "two-pointers", importance: "critical" },
        { id: "sliding-window-tree", label: "Sliding Window", nodeType: "concept", conceptId: "sliding-window", importance: "critical" },
        { id: "prefix-sum-tree", label: "Prefix Sum", nodeType: "concept", conceptId: "prefix-sum", importance: "high" },
        { id: "binary-search-tree-node", label: "Binary Search", nodeType: "concept", conceptId: "binary-search", importance: "critical" },
        { id: "rolling-hash-tree", label: "Rolling Hash / Rabin-Karp", nodeType: "concept", conceptId: "rolling-hash", importance: "medium" },
      ],
    },
    {
      id: "cat-trees-graphs",
      label: "Trees & Graphs",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "dfs-bfs-tree", label: "DFS & BFS", nodeType: "concept", conceptId: "dfs-bfs", importance: "critical" },
        { id: "tree-traversals-tree", label: "Tree Traversals", nodeType: "concept", conceptId: "tree-traversals", importance: "critical" },
        { id: "lca-tree", label: "Lowest Common Ancestor", nodeType: "concept", conceptId: "lca", importance: "high" },
        { id: "trie-tree", label: "Trie", nodeType: "concept", conceptId: "trie", importance: "high" },
        { id: "topological-sort-tree", label: "Topological Sort", nodeType: "concept", conceptId: "topological-sort", importance: "high" },
        { id: "union-find-tree", label: "Union-Find (DSU)", nodeType: "concept", conceptId: "union-find", importance: "high" },
        { id: "dijkstra-tree", label: "Dijkstra's Algorithm", nodeType: "concept", conceptId: "dijkstra", importance: "high" },
      ],
    },
    {
      id: "cat-dp",
      label: "Dynamic Programming",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "memo-vs-tab-tree", label: "Memoization vs Tabulation", nodeType: "concept", conceptId: "memo-vs-tab", importance: "critical" },
        { id: "dp-patterns-tree", label: "DP Patterns", nodeType: "concept", conceptId: "dp-patterns", importance: "critical" },
        { id: "dp-state-def-tree", label: "State Definition", nodeType: "concept", conceptId: "dp-state-def", importance: "high" },
      ],
    },
    {
      id: "cat-sorting",
      label: "Sorting & Searching",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "quicksort-tree", label: "Quicksort & Partition", nodeType: "concept", conceptId: "quicksort", importance: "critical" },
        { id: "mergesort-tree", label: "Mergesort", nodeType: "concept", conceptId: "mergesort", importance: "high" },
        { id: "counting-sort-tree", label: "Counting / Radix Sort", nodeType: "concept", conceptId: "counting-sort", importance: "medium" },
      ],
    },
    {
      id: "cat-heaps",
      label: "Heaps & Priority Queues",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "heap-internals-tree", label: "Heap Internals", nodeType: "concept", conceptId: "heap-internals", importance: "critical" },
        { id: "kth-largest-tree", label: "K-th Largest Element", nodeType: "concept", conceptId: "kth-largest", importance: "high" },
        { id: "merge-k-sorted-tree", label: "Merge K Sorted Lists", nodeType: "concept", conceptId: "merge-k-sorted", importance: "high" },
      ],
    },
    {
      id: "cat-hash",
      label: "Hash Tables",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "hash-internals-tree", label: "Hash Table Internals", nodeType: "concept", conceptId: "hash-internals", importance: "critical" },
        { id: "collision-resolution-tree", label: "Collision Resolution", nodeType: "concept", conceptId: "collision-resolution", importance: "high" },
      ],
    },
    {
      id: "cat-design-patterns",
      label: "DS Design Patterns",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "monotonic-stack-tree", label: "Monotonic Stack/Queue", nodeType: "concept", conceptId: "monotonic-stack", importance: "high" },
        { id: "fast-slow-pointers-tree", label: "Fast/Slow Pointers", nodeType: "concept", conceptId: "fast-slow-pointers", importance: "high" },
        { id: "interval-merge-tree", label: "Interval Merge Pattern", nodeType: "concept", conceptId: "interval-merge", importance: "medium" },
      ],
    },
  ],
};

// ─── Last Hour Summary ────────────────────────────────────────────────────────

const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "Always state complexity before coding — time AND space. Interviewers want to see you think in Big O before you think in syntax.",
    "Two pointers and sliding window reduce O(n²) brute force to O(n) for most subarray/substring problems — recognize the pattern by the phrase 'contiguous' or 'at most K distinct'.",
    "Binary search is not just for sorted arrays: apply it to any monotonic decision function — 'can I do this in X time?' becomes a binary search problem.",
    "DP state definition is the hard part, not the recurrence. Ask: what is the minimum information needed at each step to make the optimal decision?",
    "Graphs: BFS for shortest unweighted path, DFS for connectivity/cycle detection, Dijkstra for weighted shortest path, topological sort for dependency ordering.",
    "Hash maps give O(1) amortized lookup but O(n) worst case with a bad hash function — in interviews, always qualify amortized when claiming O(1) for hash operations.",
    "Heaps give O(log n) insert and O(log n) extract-min/max — use them whenever you need repeated access to the smallest or largest element in a dynamic dataset.",
  ],
  mustKnowConcepts: [
    { name: "Big O", oneLiner: "Upper bound on growth rate — drop constants, keep dominant term" },
    { name: "Two Pointers", oneLiner: "Left and right cursors that move toward each other or in the same direction to avoid nested loops" },
    { name: "Sliding Window", oneLiner: "Expand/shrink a window over an array to maintain a constraint in O(n)" },
    { name: "Binary Search", oneLiner: "Halve the search space each step on any monotonic condition — O(log n)" },
    { name: "DFS/BFS", oneLiner: "DFS explores depth-first (stack/recursion); BFS explores level-by-level (queue) for shortest path" },
    { name: "Memoization", oneLiner: "Cache overlapping subproblem results top-down to convert exponential recursion to polynomial time" },
    { name: "Min/Max Heap", oneLiner: "Complete binary tree where parent ≤ (or ≥) children — O(log n) insert, O(1) peek, O(log n) extract" },
  ],
  topTraps: [
    "Off-by-one in binary search: use lo <= hi for search, lo < hi for left-boundary; always verify your termination condition with a 2-element array.",
    "Forgetting the space complexity of your recursion stack — a recursive DFS on a linear chain is O(n) space even if you think it's 'free'.",
    "Mutating input in-place when the problem guarantees nothing about it — always ask 'can I modify the input?' before doing so.",
    "Treating hash map operations as O(1) worst case — they are O(1) amortized average case. Under adversarial inputs or hash collisions, operations degrade to O(n).",
    "In DP, defining state too broadly (carrying too much information per state) leads to exponential states; defining it too narrowly misses optimal substructure — always validate your state captures exactly what you need.",
  ],
};

// ─── Concepts ─────────────────────────────────────────────────────────────────

const concepts: Concept[] = [
  // ── Complexity ───────────────────────────────────────────────────────────────
  {
    id: "big-o",
    title: "Big O Notation",
    category: "complexity",
    basic:
      "Big O describes the upper bound on an algorithm's growth rate as input size N approaches infinity, ignoring constants and lower-order terms.",
    expected:
      "Common classes in order: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!). Drop constants and lower-order terms: 3n² + 5n + 100 = O(n²). For multiple variables (e.g., a graph with V vertices and E edges), keep both: O(V + E). Worst-case is the default unless stated; best-case uses Omega (Ω); tight bound uses Theta (Θ).",
    deep:
      "Big O is a mathematical upper bound — O(n) includes O(1) algorithms by definition. In practice 'Big O' is used to mean tight bound (Θ). Constants matter at small N: O(n²) with c=0.0001 beats O(n) with c=10000 for small inputs. Master theorem resolves divide-and-conquer recurrences: T(n) = aT(n/b) + f(n) — memorize the three cases. For probabilistic algorithms, average-case analysis uses expected value. NP-hard problems have no known polynomial solution — knowing when a problem is NP-complete saves you from hunting for an efficient algorithm.",
    interviewAnswer:
      "I state Big O for both time and space upfront. I drop constants and lower-order terms, keep the dominant term, and clarify worst vs average when it matters — for example, quicksort is O(n²) worst case but O(n log n) expected. For hash map operations I say 'amortized O(1)' not just 'O(1)' to be precise. I also think about N's practical size — sometimes an O(n log n) algorithm with better cache behavior beats an O(n) algorithm with many cache misses in practice.",
    trap:
      "O(2n) and O(n) are the same — you CANNOT compare algorithms by their Big O class alone when constants differ significantly. Also: nested loops are not always O(n²); if the inner loop runs a fixed number of times, the whole thing is still O(n).",
    memoryAnchor:
      "Big O is like rating restaurants by stars (1-5) not exact scores. A 4.1 and a 4.9 are both '4-star' — you drop the decimals (constants) and only care about the star tier (dominant term).",
  },
  {
    id: "time-vs-space",
    title: "Time vs Space Trade-off",
    category: "complexity",
    basic:
      "Most optimizations trade memory for speed or vice versa — using more space (e.g., a cache or auxiliary array) often reduces time complexity.",
    expected:
      "Classic examples: prefix sum arrays trade O(n) space for O(1) range queries instead of O(n) per query. Memoization trades O(n) space for exponentially less time. In-place algorithms use O(1) extra space but may be slower or harder to implement correctly. Hash maps trade O(n) space for O(1) average lookup instead of O(n) linear scan.",
    deep:
      "Space complexity includes the call stack for recursive algorithms — a naive recursive fibonacci uses O(n) stack space even though you might not think of it as 'storing' anything. Iterative solutions avoid this. Cache-conscious algorithms prefer sequential memory access (arrays) over pointer-chasing (linked lists) because CPU cache lines load 64 bytes at a time — a linked list traversal generates O(n) cache misses; an array traversal generates O(n/8) on 64-bit systems. This is why practical performance sometimes inverts theoretical Big O comparisons.",
    interviewAnswer:
      "I always state both time and space complexity. When proposing an optimization, I explicitly call out the trade-off: 'I can reduce this from O(n²) time to O(n) by using an O(n) hash map.' Interviewers appreciate knowing you understand the cost. I also mention auxiliary space vs total space — in-place algorithms use O(1) auxiliary space but the input itself might be O(n).",
    trap:
      "Recursive solutions are NOT free on space. A recursive DFS on a skewed binary tree uses O(n) stack space, which can cause a stack overflow for large inputs. Always mention this and offer to convert to iterative with an explicit stack.",
    memoryAnchor:
      "Time vs Space is like packing for a trip: bring a GPS (extra luggage = space) and you save hours of asking for directions (time). Carry nothing and you'll wander forever.",
  },
  {
    id: "amortized",
    title: "Amortized Analysis",
    category: "complexity",
    basic:
      "Amortized analysis averages the cost of expensive operations over a sequence of operations to give a more accurate per-operation cost.",
    expected:
      "Dynamic array (ArrayList/Python list) append: most appends are O(1), but when the array resizes it copies all elements. Amortized over n appends, each append is still O(1) because doubling means the total copies equal 2n. Hash table operations are O(1) amortized — occasional rehashing at load factor threshold is spread across all inserts. Stack with multi-pop: individual pop might pop n items, but amortized over n pushes, it's O(1) per operation.",
    deep:
      "The potential method formalizes amortized analysis: define a potential function Φ that represents 'stored work'. Actual cost + ΔΦ = amortized cost. For dynamic arrays, Φ = 2*(size - capacity/2) — before a resize, potential is high enough to pay for the copy. The accounting method assigns 'credits' to cheap operations that pay for future expensive ones. Understanding amortized analysis is critical for arguing that lazy deletion in hash maps and tree rebalancing are efficient over time.",
    interviewAnswer:
      "When I say 'O(1) amortized' — like for array append or hash insert — I mean the average cost per operation over any sequence of operations is O(1), even if individual operations can be costly. The classic example is dynamic arrays: doubling the capacity means the total copy work is bounded by 2n over n appends, so amortized O(1) per append. I'd contrast this with 'worst case O(1)' which would mean every single call is O(1).",
    trap:
      "Amortized O(1) does NOT mean every operation is O(1). Calling clear() on a Python list and then doing n appends gives you one O(n) resize during that sequence. If your use case has adversarial access patterns hitting the expensive case repeatedly, amortized analysis doesn't apply.",
    memoryAnchor:
      "Amortized = paying rent. You pay one big security deposit (resize) then cheap monthly rent (appends). Averaged out, each month costs almost nothing. One expensive day doesn't mean every day is expensive.",
  },

  // ── Arrays & Strings ─────────────────────────────────────────────────────────
  {
    id: "two-pointers",
    title: "Two Pointers",
    category: "arrays-strings",
    basic:
      "Two pointers use two indices (often left and right) moving through an array to eliminate nested loops and achieve O(n) solutions.",
    expected:
      "Two flavors: (1) opposite ends — start left=0, right=n-1 and move inward (e.g., two-sum on sorted array, three-sum, container with most water); (2) same direction — fast/slow or leading/trailing (e.g., remove duplicates in-place, merge sorted arrays). Precondition for opposite-end two pointers is usually a sorted array or monotonic property. The key insight: at each step you have enough information to decide which pointer moves.",
    deep:
      "The mathematical argument for correctness: if you have two pointers at i and j, and you know that moving i rightward can only decrease (or increase) your target metric, you can eliminate all pairs involving i at its current position, giving O(n) total moves. This is the same argument that justifies why binary search works. Extension: three-sum is O(n²) — sort first (O(n log n)), fix one pointer, run two-pointer on the rest. For two-sum without sorting, a hash map is O(n) time and O(n) space — know when to prefer which.",
    interviewAnswer:
      "Two pointers turn O(n²) into O(n) by leveraging a monotonic property — usually that the array is sorted or that moving a pointer in one direction monotonically changes the quantity you care about. I'd reach for two pointers when the problem involves pairs or subarrays in a sorted structure, or when I need to modify an array in-place (e.g., remove duplicates). The critical step is proving why I can safely eliminate all arrangements that include the current pointer position when I decide to advance.",
    trap:
      "Opposite-end two pointers require a sorted array or equivalent monotonic property. Applying them to an unsorted array without justification is incorrect. Also: when fixing elements for three-sum, remember to skip duplicates to avoid duplicate triplets in the output.",
    memoryAnchor:
      "Two pointers = two people searching a hallway from opposite ends. They walk toward each other, checking every door. They never backtrack, so they cover the whole hallway in one pass.",
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    category: "arrays-strings",
    basic:
      "A sliding window maintains a contiguous subarray (or substring) that satisfies a constraint, expanding the right pointer and shrinking the left pointer to stay valid in O(n).",
    expected:
      "Two patterns: (1) fixed-size window — move both pointers together (e.g., max sum subarray of size k); (2) variable-size window — expand right greedily, shrink left when constraint violated (e.g., longest substring without repeating characters, minimum window substring). The window state (a hash map, counter, or sum) is maintained incrementally rather than recomputed each time — this is what makes it O(n).",
    deep:
      "The key invariant: at all times, [left, right] represents a valid window, OR we are in the process of restoring validity by shrinking from left. Each element enters the window exactly once (right pointer advances) and leaves exactly once (left pointer advances) — giving O(n) total work. For problems with 'at most K distinct characters', track a frequency map and shrink when distinct count exceeds K. Monotonic deque (sliding window maximum) lets you get the max of the current window in O(1) amortized by maintaining a decreasing deque — O(n) overall.",
    interviewAnswer:
      "Sliding window is my default for 'longest/shortest subarray/substring satisfying property X'. The template is: expand right to try to satisfy the constraint, shrink left when it's violated, and update the answer at each valid state. The O(n) argument is that each pointer moves at most n times. The subtle part is maintaining the window state incrementally — for character frequency, I use a hash map and a 'have/need' counter to avoid recomputing each time.",
    trap:
      "When shrinking the window from the left, you must correctly remove the element leaving the window from your state. Forgetting to decrement a counter or update a sum when left pointer advances is the most common bug. Also: the window boundaries are [left, right] inclusive — be consistent or you'll have off-by-one errors.",
    memoryAnchor:
      "Sliding window = a caterpillar inching forward. The head stretches right to eat more, the tail contracts left when the body gets too long. The caterpillar never goes backward.",
  },
  {
    id: "prefix-sum",
    title: "Prefix Sum",
    category: "arrays-strings",
    basic:
      "A prefix sum array pre-computes cumulative sums so any subarray sum [i, j] can be computed in O(1) as prefix[j+1] - prefix[i].",
    expected:
      "Build: prefix[0] = 0, prefix[i] = prefix[i-1] + arr[i-1]. Query: sum(i, j) = prefix[j+1] - prefix[i] (0-indexed). Common use: range sum queries, number of subarrays with sum = k (use hash map of prefix sums). Extend to 2D for matrix region sums: prefix[i][j] = grid[i][j] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1].",
    deep:
      "The 'subarray sum equals k' pattern uses a hash map from prefix sum to count. At each index, you want prefix[j] - prefix[i] = k, so you look up prefix[j] - k in the map. Initialize map with {0: 1} to handle subarrays starting at index 0. This generalizes to 'subarray sum divisible by k' using modular arithmetic — key insight: if two prefix sums have the same remainder mod k, the subarray between them is divisible by k. Prefix XOR works identically for XOR-based subarray queries.",
    interviewAnswer:
      "Prefix sums transform range-query problems from O(n) per query to O(1) after O(n) preprocessing. For 'count subarrays with sum k', I maintain a running prefix sum and a hash map of how many times each prefix sum has appeared. At each index j, I need the count of i where prefix[j] - prefix[i] = k, so I look up prefix[j] - k. I always initialize the map with {0: 1} — that handles the case where a subarray starting from index 0 has sum k.",
    trap:
      "The prefix sum array is size n+1, not n. prefix[0] = 0 is the sentinel. Forgetting this causes off-by-one errors on the first element. In 2D prefix sums, the inclusion-exclusion formula must subtract the overlap exactly once: forget the subtraction and you double-count.",
    memoryAnchor:
      "Prefix sum = a running odometer. To find the distance between mile markers 3 and 7, just subtract: odometer[7] - odometer[3]. No need to re-drive the road.",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    category: "arrays-strings",
    basic:
      "Binary search halves the search space each iteration by comparing the midpoint to the target, achieving O(log n) on sorted arrays.",
    expected:
      "Template: lo=0, hi=n-1. While lo <= hi: mid = lo + (hi-lo)//2. If target found return mid. If arr[mid] < target: lo = mid+1 else hi = mid-1. For left boundary (first occurrence): use lo < hi, hi = mid when arr[mid] >= target. For right boundary: lo = mid+1 when arr[mid] <= target. Key extension: binary search on the answer space (not an array) — 'what is the minimum capacity such that condition holds?' Apply binary search to the answer range.",
    deep:
      "The standard template with lo <= hi finds exact matches. Left-boundary template (lo < hi, hi=mid) finds the first position where arr[mid] >= target — useful for lower_bound. Right-boundary finds last position. When binary searching on an answer (e.g., minimum days to ship packages), define a monotonic predicate: 'canShipInDDays(capacity)' is False up to a threshold, then True beyond — binary search on the threshold. mid = lo + (hi-lo)//2 prevents integer overflow vs (lo+hi)//2 — critical in Java/C++, not Python (arbitrary integers).",
    interviewAnswer:
      "I reach for binary search in three scenarios: (1) searching a sorted array for a target or boundary; (2) binary searching on the answer space when I can check a condition in O(n) and the answer space is monotonic; (3) finding the rotation point or peak in a rotated/mountain array. For left/right boundaries I use a variant where I never return from inside the loop — just narrow until lo == hi. I always verify with a 2-element array to check my termination condition.",
    trap:
      "Using lo <= hi for boundary search causes infinite loops when lo = hi and the condition sets hi = mid (since mid = lo = hi). Use lo < hi for boundary searches. The classic off-by-one: if you set hi = mid-1 when you should set hi = mid, you skip the answer. Always mentally trace a 2-element and 1-element case.",
    memoryAnchor:
      "Binary search = the 'guess the number' game. 'Higher or lower?' Rip the phone book in half each time. You never re-read pages you already eliminated.",
  },
  {
    id: "rolling-hash",
    title: "Rolling Hash / Rabin-Karp",
    category: "arrays-strings",
    basic:
      "Rolling hash computes a hash of a fixed-length window and updates it in O(1) by removing the outgoing character and adding the incoming character, enabling O(n) string matching.",
    expected:
      "Rabin-Karp: hash(s[i..i+m-1]) = (s[i]*p^(m-1) + s[i+1]*p^(m-2) + ... + s[i+m-1]) mod q. Slide: subtract s[i]*p^(m-1) mod q, multiply by p, add s[i+m]. Used for exact string matching in O(n+m) average, and for repeated/duplicate substring problems. Multiple pattern search: compute hashes of all patterns into a set, then slide over text — O(n + sum(pattern lengths)).",
    deep:
      "Hash collisions (same hash, different string) require verification — compare the actual strings when hashes match (the 'fingerprint' approach). Choose q as a large prime and p as a prime base (e.g., p=31, q=10^9+7) to minimize collisions. Double hashing (two different (p, q) pairs) reduces collision probability to near zero. Rolling hash enables 'longest duplicate substring' with binary search: binary search on length L, use rolling hash to check if any substring of length L repeats — O(n log n) total.",
    interviewAnswer:
      "Rolling hash is my go-to for fixed-window substring search or when I need O(n) string matching without KMP's complexity. The key idea: polynomial hash lets you update the window in O(1) by subtracting the outgoing character's contribution and adding the incoming one. I always verify on hash match because collisions can occur — the overall expected complexity is still O(n+m). For interview problems about finding repeated substrings, I combine binary search on length with rolling hash.",
    trap:
      "A hash match does NOT guarantee a string match — you must verify by comparing the actual substrings. Forgetting verification turns a probabilistically correct algorithm into an incorrect one. Also: when removing the leading character, you must multiply by the modular inverse of p (or precompute p^(m-1) mod q) — getting the exponent wrong makes the hash incorrect.",
    memoryAnchor:
      "Rolling hash = a conveyor belt sushi scanner. As each plate rolls by, you update the fingerprint by dropping the leftmost plate and adding the new one -- no need to re-scan the whole belt.",
  },

  // ── Trees & Graphs ───────────────────────────────────────────────────────────
  {
    id: "dfs-bfs",
    title: "DFS & BFS",
    category: "trees-graphs",
    basic:
      "DFS explores as deep as possible before backtracking (uses stack/recursion); BFS explores all neighbors at the current depth before going deeper (uses queue).",
    expected:
      "BFS guarantees shortest path in unweighted graphs — DFS does not. DFS uses O(depth) space (call stack); BFS uses O(width) space (queue). DFS with a visited set detects cycles in directed graphs. BFS level-by-level traversal is useful for 'minimum steps' problems. For trees (no cycles), DFS is often more natural; for graphs, always track visited to avoid infinite loops.",
    deep:
      "Iterative DFS uses an explicit stack and reverses the children order to match recursive traversal order. BFS on a weighted graph is wrong for shortest path — you need Dijkstra. For bidirectional BFS, run BFS from both source and target simultaneously — reduces search space from O(b^d) to O(b^(d/2)) where b is branching factor. Topological sort is DFS where you add nodes to the front of the result after visiting all descendants. Kosaraju's algorithm for strongly connected components (SCCs) does two DFS passes — first on original graph, second on reversed graph in reverse finish-time order.",
    interviewAnswer:
      "My decision between DFS and BFS: if the problem asks for shortest path (unweighted), use BFS. If the problem asks for existence, connected components, cycle detection, or topological order, DFS is usually simpler. For trees specifically, DFS maps to recursive thinking — define the return value per node and let the recursion compose. For graphs, I always maintain a visited set. I also consider space: BFS can be memory-heavy if the graph is wide, DFS can stack-overflow if the graph is deep.",
    trap:
      "BFS finds the shortest path in UNWEIGHTED graphs only. If edges have different weights, BFS gives wrong shortest paths — use Dijkstra. Also: DFS on a graph without a visited set will loop forever on cycles. Forgetting 'visited' for graph DFS is the #1 mistake.",
    memoryAnchor:
      "DFS = a curious cat going down every hallway until it hits a dead end, then backing up. BFS = a ripple in a pond -- expands evenly in all directions, reaching the nearest shore first.",
  },
  {
    id: "tree-traversals",
    title: "Tree Traversals (Inorder, Preorder, Postorder)",
    category: "trees-graphs",
    basic:
      "Three recursive traversal orders: preorder (root, left, right), inorder (left, root, right), postorder (left, right, root).",
    expected:
      "Inorder of a BST yields sorted order — use this to validate a BST. Preorder is useful for serializing/reconstructing a tree (root first means you always know the root before children). Postorder is useful when child results are needed before the parent can be computed (e.g., calculating subtree sizes, tree deletion). Level-order (BFS) gives nodes level by level. Morris traversal achieves O(1) space inorder using threaded binary trees.",
    deep:
      "Iterative inorder requires explicitly managing the stack: push left children until null, pop, visit, then go right. Iterative postorder is trickier — use two stacks or track 'last visited node' to know when to visit the root after both children. For reconstructing a binary tree: preorder + inorder uniquely determine the tree (preorder gives root, inorder splits left/right subtrees). Same for postorder + inorder. Preorder + postorder does NOT uniquely determine the tree if there are nodes with one child.",
    interviewAnswer:
      "I think of traversals by what they solve: inorder for BST properties (sorted output, validation), preorder for serialization/cloning (root available before children), postorder for bottom-up computation (subtree sizes, path sums). When I see 'compute something about each subtree', I immediately think postorder — solve left, solve right, combine at root. For iterative traversal, I can implement inorder with an explicit stack if stack depth is a concern.",
    trap:
      "Inorder gives sorted output only for a BINARY SEARCH TREE, not a generic binary tree. Also: validating a BST with inorder requires checking the previous value, not just checking left < root < right locally — the local check misses cases where a node is in the wrong subtree.",
    memoryAnchor:
      "PRE-order = announcement before the meeting (root first). IN-order = reading a book left to right (sorted for BST). POST-order = cleaning up after the party (children done first, parent last).",
  },
  {
    id: "lca",
    title: "Lowest Common Ancestor (LCA)",
    category: "trees-graphs",
    basic:
      "The LCA of two nodes p and q in a tree is the deepest node that has both p and q as descendants (a node can be a descendant of itself).",
    expected:
      "Naive: for each node, DFS to check if p and q are in its subtrees — O(n) per query. Recursive: if root is null or root is p or q, return root. Otherwise recurse left and right — if both return non-null, root is LCA; otherwise return the non-null one. For BST: if both < root go left, if both > root go right, else root is LCA — O(h) time. For sparse LCA queries (competitive programming), binary lifting achieves O(log n) per query after O(n log n) preprocessing.",
    deep:
      "Binary lifting: precompute ancestor[node][k] = 2^k-th ancestor of node for k up to log(n). To find LCA(u, v): bring both to same depth by jumping the shallower one up, then binary-lift both simultaneously until they meet. This is O(log n) per query. For LCA on general graphs (not trees), reduce to RMQ (range minimum query) problem: DFS Euler tour gives a sequence where LCA corresponds to minimum depth node between first occurrences of u and v. Farach-Colton and Bender algorithm achieves O(n) preprocessing, O(1) query.",
    interviewAnswer:
      "For a BST, LCA is O(h) — just navigate left or right based on values. For a generic binary tree, the recursive O(n) approach is elegant: return p or q when found, propagate non-null up, return current node when both children are non-null. I mention that binary lifting is the production approach for multiple LCA queries — O(n log n) preprocessing, O(log n) per query. In interviews I'd implement the recursive approach and mention the optimization exists.",
    trap:
      "The recursive LCA returns the LCA even if only one of p or q exists in the tree — it returns whichever node it found. If the problem guarantees both nodes exist, this is correct. If not, you need to verify both were actually found, which requires additional logic.",
    memoryAnchor:
      "LCA = 'where do two cousins meet at the family reunion?' Trace both family lines upward until they share the same ancestor. The deepest shared grandparent is the LCA.",
  },
  {
    id: "trie",
    title: "Trie (Prefix Tree)",
    category: "trees-graphs",
    basic:
      "A trie is a tree where each node represents one character of a string, and paths from root to marked nodes represent words in the dictionary.",
    expected:
      "Insert: O(m) where m is word length. Search: O(m). Prefix search: O(m) to reach the prefix node, then enumerate. Each node stores a map of children and an end-of-word flag. Space: O(ALPHABET_SIZE * m * n) in worst case (array-based children), or O(m * n) with hash map children. Use cases: autocomplete, spell checker, IP routing (radix tree), word search in grid.",
    deep:
      "Array-backed trie (children[26]) has O(1) child lookup but wastes space for sparse alphabets. Hash map-backed trie is memory-efficient but slower. Compressed trie (radix tree) merges single-child chains into edge labels — reduces space. Suffix trie stores all suffixes and supports substring search in O(m) — but O(n²) space. Suffix array + LCP achieves same in O(n) space (with O(n) or O(n log n) construction time). Aho-Corasick automaton adds failure links to a trie for O(n + m + z) multi-pattern search (n=text length, m=total pattern length, z=match count).",
    interviewAnswer:
      "I build a trie when I need prefix-based operations that a hash map can't give efficiently — like 'find all words with prefix X' or 'check if any word in dictionary matches a pattern'. I implement it with a TrieNode class containing a children dict and is_end flag. Time per operation is O(word length), independent of dictionary size — much better than scanning all words. For the word search grid problem, I build a trie of the dictionary first, then DFS on the grid using the trie to prune dead-end paths.",
    trap:
      "Forgetting to mark is_end at the end of insert means search always returns false. Also: deleting from a trie requires careful cleanup — if you delete a word that shares a prefix with another word, you must NOT delete shared nodes. Set is_end=false for the deleted word's terminal node only.",
    memoryAnchor:
      "Trie = a T-REE of letters, like a phone's autocomplete keyboard. Type 'c-a-t' and each letter narrows the branch. Shared prefixes ('car', 'cat') share the same hallway until they diverge.",
  },
  {
    id: "topological-sort",
    title: "Topological Sort",
    category: "trees-graphs",
    basic:
      "Topological sort orders the nodes of a DAG so that for every directed edge u→v, node u appears before v in the ordering.",
    expected:
      "Two algorithms: (1) Kahn's algorithm (BFS-based): start with all nodes with in-degree 0, process them, decrement in-degrees of neighbors, add new zero-in-degree nodes to queue. (2) DFS-based: do DFS, add each node to front of result after all its descendants are visited. If a cycle exists, Kahn's detects it (result has fewer than n nodes). Use cases: build systems, course prerequisites, task scheduling, package dependency resolution.",
    deep:
      "Kahn's algorithm gives a unique topological sort iff there is always exactly one node with in-degree 0 at each step (the DAG is a path). Otherwise, multiple valid orderings exist and Kahn's gives one of them depending on queue ordering. Cycle detection: in Kahn's, if the processed count < n, a cycle exists. In DFS, a 'gray' (in-progress) node being visited again indicates a cycle — 'white' = unvisited, 'gray' = in current DFS path, 'black' = done. For all valid topological sorts, use backtracking — exponential in worst case but shows the algorithmic structure.",
    interviewAnswer:
      "When I see 'dependency ordering' or 'prerequisites', I think topological sort. I prefer Kahn's algorithm for interviews because cycle detection is explicit and the code is straightforward: build the in-degree map, push all zero-in-degree nodes to a queue, process BFS-style. I verify correctness by checking if result length equals the number of nodes — if not, a cycle exists. For DFS-based topo sort, I add nodes to a stack after completing their DFS, then reverse the stack.",
    trap:
      "Topological sort only works on a DAG (directed acyclic graph). If the problem doesn't explicitly say 'no cycles', check for them. Also: the order of equal-priority nodes is not unique — if the problem needs lexicographically smallest order, use a min-heap instead of a plain queue in Kahn's algorithm.",
    memoryAnchor:
      "Topological sort = getting dressed in the right order. Underwear before pants, socks before shoes. You can't put on a shirt after the jacket. Dependencies dictate the sequence.",
  },
  {
    id: "union-find",
    title: "Union-Find (Disjoint Set Union)",
    category: "trees-graphs",
    basic:
      "Union-Find tracks which elements belong to the same set (connected component) and supports union (merge two sets) and find (which set does an element belong to) operations.",
    expected:
      "Basic implementation: parent array where parent[i] = i means i is the root. Find: follow parent pointers to root. Union: set one root's parent to the other. With path compression (find sets parent to root directly) and union by rank (always attach shorter tree under taller), both operations are nearly O(1) amortized — technically O(α(n)) where α is the inverse Ackermann function, effectively constant for all practical n.",
    deep:
      "Path compression halves the tree height on each find. Union by rank (or size) prevents tall trees. Together they achieve amortized O(α(n)) per operation. Union-Find supports cycle detection in undirected graphs: if union(u, v) finds find(u) == find(v), adding edge u-v creates a cycle. Weighted Union-Find stores edge weights for relative distance problems (e.g., bipartite check with parity). Offline connectivity algorithms (e.g., Kruskal's MST) use Union-Find as their core data structure.",
    interviewAnswer:
      "Union-Find is my default for dynamic connectivity problems: 'are these two nodes in the same group?', 'how many connected components after each union?', 'detect cycle in undirected graph'. I always implement with path compression and union by rank/size — the code is short and nearly O(1) per operation. For number of connected components, I maintain a count variable that decrements each time a successful union (of different components) occurs.",
    trap:
      "Union-Find works for UNDIRECTED connectivity. For directed graphs, use DFS/BFS or Tarjan's SCC algorithm. Also: path compression mutates the parent array during find — this is fine for connectivity queries but breaks weighted Union-Find if you forget to accumulate weights during compression.",
    memoryAnchor:
      "Union-Find = friend groups at a party. 'Find' asks 'who's your group leader?' 'Union' merges two groups under one leader. Path compression = everyone just memorizes the big boss directly, skipping the chain of command.",
  },
  {
    id: "dijkstra",
    title: "Dijkstra's Algorithm",
    category: "trees-graphs",
    basic:
      "Dijkstra finds the shortest path from a source to all other nodes in a weighted graph with non-negative edge weights, using a greedy approach with a min-heap.",
    expected:
      "Algorithm: initialize dist[source]=0, all others=infinity. Push (0, source) to min-heap. While heap not empty: pop (d, u). If d > dist[u], skip (stale entry). For each neighbor v with edge weight w: if dist[u]+w < dist[v], update dist[v] and push (dist[v], v) to heap. Time: O((V+E) log V) with a binary heap. Does NOT work with negative edge weights — use Bellman-Ford (O(VE)) for that.",
    deep:
      "The greedy correctness argument: once a node is popped from the min-heap with distance d, d is guaranteed to be the shortest distance. This holds only for non-negative weights — a negative edge could create a shorter path through a node already finalized. Dijkstra with a Fibonacci heap achieves O(E + V log V), better for dense graphs. Bidirectional Dijkstra halves the search space. A* adds a heuristic function to guide search toward the target — Dijkstra is A* with heuristic=0. For k-th shortest path, use Yen's algorithm or a modified heap with at-most-k-visits per node.",
    interviewAnswer:
      "Dijkstra is for shortest paths in weighted graphs with non-negative weights. I implement it with a min-heap of (distance, node) pairs. The lazy deletion approach — push duplicate entries and skip stale ones on pop — is simpler than a decrease-key operation and works fine for interviews. I always verify: no negative weights? Use Dijkstra. Negative weights but no negative cycles? Use Bellman-Ford. Negative cycles? Problem is undefined for shortest path.",
    trap:
      "Dijkstra FAILS with negative edge weights. It can incorrectly finalize a node's distance before a shorter path through a negative edge is discovered. Also: when using a heap without decrease-key, the same node can appear multiple times — check if the popped distance matches current dist[node] before processing.",
    memoryAnchor:
      "Dijkstra = a greedy GPS. It always expands the closest unvisited city first, like a growing ink blot on a map. It never revisits -- once a city is 'locked in' as closest, that's final (breaks if roads have negative tolls).",
  },

  // ── Dynamic Programming ──────────────────────────────────────────────────────
  {
    id: "memo-vs-tab",
    title: "Memoization vs Tabulation",
    category: "dynamic-programming",
    basic:
      "Memoization (top-down): start with the recursive solution, cache results. Tabulation (bottom-up): fill a table starting from base cases and build toward the answer.",
    expected:
      "Memoization: natural to write, only computes needed subproblems, but has function call overhead and stack depth limits. Tabulation: iterative, O(1) extra space possible with rolling array, but requires explicit ordering of subproblems. Both have the same asymptotic complexity if all subproblems are needed. Space optimization: if dp[i] only depends on dp[i-1], keep only one or two rows instead of the full table.",
    deep:
      "Memoization with Python's @functools.lru_cache or @cache is clean but hits Python's recursion limit (default 1000) for deep problems — increase with sys.setrecursionlimit() or convert to tabulation. Tabulation ordering must respect dependencies — process subproblems before problems that depend on them. For 2D DP, this usually means iterating in increasing order of both dimensions. The 'pull' vs 'push' distinction: tabulation usually pulls from smaller subproblems, but push (from each state, update larger states) can be more natural for some problems.",
    interviewAnswer:
      "I start with the recursive structure and memoize — it's faster to reason about correctness. Once I have the memoized solution working, I explain how to convert to tabulation by identifying the dependency order and filling the table bottom-up. For space optimization, I ask 'which previous states do I need?' — if only dp[i-1], I can use two variables instead of an array. In Python, I use @functools.cache for memoization to avoid writing the cache dictionary manually.",
    trap:
      "Memoization with Python's default recursion limit of 1000 will fail for inputs that produce recursion depth > 1000. Always mention this constraint and offer tabulation as the production-safe alternative. Also: if your memoization key doesn't capture all relevant state, you'll return incorrect cached results — the key must uniquely determine the subproblem.",
    memoryAnchor:
      "Memo = sticky notes on a fridge (top-down, write answers as you discover them). Tabulation = filling in a spreadsheet row by row (bottom-up, systematic). Both avoid re-cooking the same dish twice.",
  },
  {
    id: "dp-patterns",
    title: "DP Patterns (Knapsack, LCS, LIS, Coin Change)",
    category: "dynamic-programming",
    basic:
      "The four canonical DP patterns: 0/1 knapsack (include or exclude items), LCS (align two sequences), LIS (find longest increasing subsequence), coin change (minimum coins for a target).",
    expected:
      "0/1 Knapsack: dp[i][w] = max value using first i items with weight capacity w. O(n*W) time and space, O(W) space with rolling. LCS: dp[i][j] = LCS of s1[0..i-1] and s2[0..j-1]. O(m*n) time and space. LIS: dp[i] = length of LIS ending at index i. O(n²) DP or O(n log n) with patience sorting (binary search). Coin Change: dp[amount] = min coins. O(amount * num_coins), equivalent to BFS on an implicit graph.",
    deep:
      "Knapsack generalizes: unbounded knapsack allows infinite copies of each item — iterate amounts forward. Subset sum is 0/1 knapsack with weights=values, target capacity. LCS generalizes to edit distance (add/delete/replace operations), longest palindromic subsequence (LCS of s and reversed s). LIS with O(n log n): maintain a 'tails' array where tails[i] is the smallest tail element of all increasing subsequences of length i+1. Binary search for insertion point. Coin change generalizes to all DP on DAGs where you accumulate a cost — think of it as shortest path on a graph where each amount is a node.",
    interviewAnswer:
      "When I see a DP problem, I identify which canonical pattern it resembles. 'Maximize value given a constraint' → knapsack. 'Align two sequences' → LCS/edit distance family. 'Subsequence of one sequence' → LIS family. 'Minimum steps/coins to reach target' → coin change / BFS on implicit graph. Then I define the state, write the recurrence, handle base cases, and optimize space if possible. The hardest part is always the state definition — I make sure it captures exactly enough information to make the optimal decision.",
    trap:
      "0/1 knapsack iterates capacity in DECREASING order when using a 1D array — this ensures each item is used at most once. Iterating forward (unbounded knapsack order) allows the same item to be counted multiple times. Swapping these two iteration directions is the most common knapsack bug.",
    memoryAnchor:
      "DP patterns = four kitchen recipes. Knapsack = packing a lunchbox (pick items, don't exceed weight). LCS = aligning two DNA strands. LIS = stacking boxes by size. Coin change = making exact change at a vending machine with limited denominations.",
  },
  {
    id: "dp-state-def",
    title: "DP State Definition",
    category: "dynamic-programming",
    basic:
      "The DP state is the minimum set of parameters that uniquely determines the value of a subproblem. Defining it correctly is the crux of every DP solution.",
    expected:
      "Ask three questions: (1) What am I optimizing? (2) What changes as I make decisions? (3) What do I need to know to make future decisions optimally? The answers define your state. Common states: index into an array, remaining capacity, current character, last choice made. The number of distinct states times the cost per state = total time complexity.",
    deep:
      "Over-specified state: you carry more info than needed, so you have more states than necessary — exponential blowup. Under-specified state: two different situations map to the same state but have different optimal futures — incorrect results. Example of under-specification: in house robber with cooldown, if state is only 'current index', you can't distinguish 'just robbed' from 'can rob now' — you need to add a 'last action' dimension. Bitmask DP encodes subsets in an integer — exponential states but often necessary for NP-hard problems with small n (e.g., TSP for n ≤ 20).",
    interviewAnswer:
      "I define the DP state explicitly before writing any code. I ask: what is dp[i][j][k] and what does it represent? Then I write the recurrence as 'dp[state] = some combination of smaller states'. If I find myself needing a variable not in my state to compute the recurrence, I add it to the state. I also estimate state count × work per state = total complexity upfront, to verify it's feasible before implementing.",
    trap:
      "Adding unnecessary dimensions to the state space 'to be safe' turns a polynomial solution exponential. Be minimal. Conversely, if your recurrence needs a variable that's not in the state, your state is incomplete — adding dimensions is necessary in that case, not a sign of over-engineering.",
    memoryAnchor:
      "DP state = your GPS coordinates. Too few dimensions (just latitude) and you can't navigate. Too many (latitude + longitude + altitude + shoe color) and you'll never finish computing routes. Capture exactly what you need to decide the next turn.",
  },

  // ── Sorting & Searching ──────────────────────────────────────────────────────
  {
    id: "quicksort",
    title: "Quicksort & Partition",
    category: "sorting-searching",
    basic:
      "Quicksort picks a pivot, partitions elements into less-than and greater-than groups, and recursively sorts each partition. Average O(n log n), worst case O(n²).",
    expected:
      "Lomuto partition: choose last element as pivot, maintain boundary i, swap elements ≤ pivot to left of i. Hoare partition: two pointers from opposite ends, more efficient in practice (3× fewer swaps). Worst case O(n²) occurs on already-sorted input with naive pivot (always picks min/max). Mitigations: random pivot, median-of-three pivot. Quickselect uses the same partition to find k-th smallest in O(n) average.",
    deep:
      "Three-way partition (Dutch National Flag by Dijkstra) handles duplicates in O(n) instead of O(n log n) for many-duplicate inputs — maintains three regions: <pivot, ==pivot, >pivot. Introsort (used in C++ std::sort) is quicksort that switches to heapsort when recursion depth exceeds 2*log(n), guaranteeing O(n log n) worst case while keeping quicksort's average-case speed. Quicksort is cache-friendly (sequential access) unlike heapsort (random access to heap). In-place quicksort uses O(log n) average stack space (O(n) worst case — mitigated by always recursing on smaller partition first).",
    interviewAnswer:
      "Quicksort is average O(n log n) with excellent cache performance — it's usually the fastest comparison sort in practice. The key insight is the partition step: everything less than pivot ends up left, everything greater ends up right, and the pivot is in its final position. I use random or median-of-three pivot to avoid O(n²) worst case. For finding the k-th largest element, quickselect gives O(n) average — I recurse only into the partition containing the k-th element.",
    trap:
      "Quicksort on a sorted array with last-element pivot selection is O(n²) — the pivot is always the minimum, partitioning reduces size by only 1 each step. Always randomize the pivot or use median-of-three. Also: Lomuto partition with duplicates of the pivot can perform O(n²) — use three-way partition for inputs with many repeated elements.",
    memoryAnchor:
      "Quicksort = picking a team captain (pivot), everyone shorter goes left, taller goes right. Then each side picks their own captain and repeats. Bad captain picks (always shortest kid) make it painfully slow.",
  },
  {
    id: "mergesort",
    title: "Mergesort",
    category: "sorting-searching",
    basic:
      "Mergesort divides an array into halves, recursively sorts each half, and merges them back in O(n log n) time and O(n) space. It is stable and guarantees O(n log n) worst case.",
    expected:
      "Unlike quicksort, mergesort is always O(n log n) — no worst-case degradation. It requires O(n) auxiliary space for the merge step. Stable sort: equal elements maintain relative order from the original array (important for multi-key sorting). Used for external sorting (data too large for RAM) — merge k sorted chunks from disk. Java's Arrays.sort for objects uses Timsort, a hybrid of mergesort and insertion sort.",
    deep:
      "Bottom-up mergesort avoids recursion: start with windows of size 1, merge pairs, double window size, repeat — O(n log n) time, O(n) space, O(1) extra stack. Timsort exploits existing runs (sorted subsequences) in real data — identifies natural runs of length ≥ minRun (32-64 elements), extends short runs with binary insertion sort, then merges runs using a merge stack maintaining invariants that minimize total merge work. This makes Timsort O(n) on nearly-sorted data and O(n log n) worst case. Mergesort on linked lists is O(n log n) with O(1) extra space (merge in-place on lists), making it superior to quicksort for linked lists.",
    interviewAnswer:
      "I choose mergesort when I need guaranteed O(n log n), stability, or when working with linked lists (where in-place merging is O(1) extra space). For arrays in memory, quicksort is usually faster due to cache locality. For counting inversions in an array, mergesort is canonical — count how many times during merging you pick from the right array before the left (each such event counts inversions). I've also used the merge step alone for 'merge k sorted lists' problems.",
    trap:
      "Mergesort is NOT in-place for arrays — it requires O(n) auxiliary space for the merge step. Claiming it's O(1) space is wrong. In-place merge exists (e.g., block merge sort) but is complex and not expected in interviews. Also: merge is O(n) time, not O(1) — it's the step that makes mergesort work, not the recursion alone.",
    memoryAnchor:
      "Mergesort = splitting a deck of cards in half repeatedly until you have single cards, then merging sorted piles back together like a zipper. Steady and reliable -- always O(n log n), no bad luck possible.",
  },
  {
    id: "counting-sort",
    title: "Counting Sort / Radix Sort",
    category: "sorting-searching",
    basic:
      "Counting sort achieves O(n + k) time by counting occurrences of each value (k = range of values), avoiding comparisons entirely. Radix sort applies counting sort digit by digit for O(d(n+k)) where d is the number of digits.",
    expected:
      "Counting sort: create count array of size k, count occurrences, compute cumulative sums, build output array right-to-left (for stability). Requires integer (or discretizable) keys with bounded range. Radix sort: sort by least significant digit first (LSD) using stable counting sort, repeat for each digit. O(d*(n+k)) — for 32-bit integers: d=4 passes in base 256 (2^8), k=256 — often faster than O(n log n) in practice for large n.",
    deep:
      "LSD radix sort is stable and correct because each pass with a stable sort on digit i preserves the relative order established by digits i-1, ..., 0. MSD radix sort (most significant first) can sort in-place and terminate early for strings, but is more complex. Counting sort is non-comparison-based — it beats the O(n log n) lower bound by exploiting integer keys rather than comparing elements, but is only practical when k = O(n). For comparison-based sorts, the O(n log n) lower bound (from information theory — there are n! permutations, each comparison yields 1 bit, so you need at least log₂(n!) ≈ n log n bits) cannot be beaten.",
    interviewAnswer:
      "I use counting sort when keys are integers in a small bounded range and n is large — for example, sorting ages, scores out of 100, or characters in a string (O(n + 26)). I use radix sort when keys are integers or fixed-length strings and comparison-based sorts are too slow. The key trade-off: both are non-comparison-based and break the O(n log n) barrier but require additional assumptions about the data (bounded integers). In interviews, mentioning these shows you understand that O(n log n) is not always the optimal answer.",
    trap:
      "Counting sort requires ALL values to be non-negative integers (or mapped to such). For negative numbers, shift all values by min(array). Also: counting sort is only faster than O(n log n) when k = O(n). If k = O(n²), counting sort is O(n²) and worse than comparison sorts.",
    memoryAnchor:
      "Counting sort = sorting M&Ms by color. Don't compare them -- just count how many of each color, then line them up. Blazing fast if few colors (small k), useless if every candy is unique.",
  },

  // ── Heaps & Priority Queues ──────────────────────────────────────────────────
  {
    id: "heap-internals",
    title: "Heap Internals (Min/Max Heap)",
    category: "heaps-queues",
    basic:
      "A heap is a complete binary tree stored as an array where every parent is ≤ (min-heap) or ≥ (max-heap) its children. Root is always the min (or max).",
    expected:
      "Array representation: for node at index i (0-based), left child = 2i+1, right child = 2i+2, parent = (i-1)//2. Operations: insert — append and bubble up — O(log n). Extract-min — swap root with last, remove last, bubble down — O(log n). Peek — O(1). Build heap from array (heapify) — O(n) via sift-down from last non-leaf, NOT O(n log n). Python heapq is a min-heap; for max-heap, negate values.",
    deep:
      "Heapify is O(n) because most nodes are near the bottom and do little work: the sift-down cost at height h is O(h), and there are O(n/2^h) nodes at height h. Summing: Σ (n/2^h)*h for h=0 to log(n) = O(n). This is the proof that BUILD-HEAP is O(n). D-ary heaps reduce tree height to log_d(n) and improve cache performance — used in Dijkstra implementations where decrease-key is frequent. Binomial and Fibonacci heaps support O(1) amortized decrease-key (needed for efficient Dijkstra). In practice, binary heap with lazy deletion (push new priority, ignore stale pops) beats Fibonacci heap due to constants.",
    interviewAnswer:
      "A heap is a complete binary tree satisfying the heap property, stored compactly as an array using index arithmetic. The key insight is the array layout: it avoids pointer overhead and is cache-friendly. I use heaps when I need repeated access to the min or max of a dynamic collection. BUILD-HEAP is O(n), not O(n log n) — this is a common interview question. Python's heapq is a min-heap; I negate values for max-heap, or use a wrapper class with reversed comparison.",
    trap:
      "Python's heapq.heappush/heappop are correct but do NOT support decrease-key directly. For Dijkstra, use the lazy deletion pattern: push duplicate (new_dist, node) entries and skip processing stale entries on pop by checking if the popped distance matches the current best. Also: heapq operates on a LIST in Python — the list must be initialized as a heap via heapq.heapify() before using push/pop.",
    memoryAnchor:
      "Heap = a tournament bracket stored in an array. The champion (min or max) is always at the top. New challengers bubble up; dethroned champs sink down. Parent is always the winner of its two children.",
  },
  {
    id: "kth-largest",
    title: "K-th Largest Element",
    category: "heaps-queues",
    basic:
      "Find the k-th largest element using a min-heap of size k: add each element, pop the min when heap exceeds k. After processing all elements, the root is the k-th largest.",
    expected:
      "Min-heap of size k: O(n log k) time, O(k) space. Quickselect: average O(n), worst O(n²), O(1) extra space. Sorting: O(n log n). For streaming data (online k-th largest), the min-heap approach is the only one that works. For static arrays, quickselect is faster on average. BFPRT (median-of-medians) gives guaranteed O(n) worst case for k-th smallest.",
    deep:
      "Quickselect correctness: after partition, pivot is at its final sorted position p. If p == k-1, done. If p < k-1, recurse right. If p > k-1, recurse left. Average case: expected partitions hit O(n) total work (geometric series: n + n/2 + n/4 + ... = 2n). Worst case O(n²) with bad pivots — use random pivot. Median-of-medians guarantees pivot within the middle 30-70% of values — reduces to T(n) = T(n/5) + T(7n/10) + O(n) which solves to O(n) by master theorem. In practice, quickselect with random pivot is preferred due to better constants.",
    interviewAnswer:
      "For k-th largest in a stream or when memory is limited, I use a min-heap of size k — O(n log k) time, O(k) space, and easily handles new elements arriving. For a static array where k is small, quickselect gives O(n) average. I mention both trade-offs: heap is O(n log k) but online and space-efficient; quickselect is faster but offline and mutates the input. If the interviewer asks about guaranteed O(n), I mention median-of-medians but note that the constant factor makes quickselect with random pivot faster in practice.",
    trap:
      "Using a MAX-heap of size k instead of a MIN-heap of size k gives wrong results — you want the min of the top-k elements (the k-th largest) to be at the root. A max-heap of size k keeps the k largest seen so far but has the largest (not k-th largest) at the root. Keep the min-heap: the root IS the k-th largest answer.",
    memoryAnchor:
      "K-th largest = a VIP club with only k seats. The bouncer (min-heap root) is the weakest VIP. New arrivals only get in if they're stronger than the bouncer, who then gets kicked out. The bouncer is always your answer.",
  },
  {
    id: "merge-k-sorted",
    title: "Merge K Sorted Lists",
    category: "heaps-queues",
    basic:
      "Merge k sorted linked lists (or arrays) into one sorted list using a min-heap of size k, where each heap entry tracks the current element and its list.",
    expected:
      "Initialize the heap with the first element from each list — O(k log k). Extract the minimum, add it to output, push the next element from the same list — O(log k). Repeat until heap is empty — O(n log k) total, where n is the total number of elements. Alternative: divide-and-conquer (pair-wise merge like mergesort) — O(n log k) time, same complexity but different constant. Sequential merging is O(n*k) — avoid.",
    deep:
      "The heap approach is optimal: each of the n elements is pushed and popped from the heap exactly once, each operation O(log k), giving O(n log k). This matches the information-theoretic lower bound for this problem. For external merge sort (merging k sorted chunks from disk), this is the standard approach with k = RAM_size / page_size. In Python, heapq.merge() does exactly this lazily (using a heap internally) with O(1) memory beyond the iterators. For the linked list variant, store (value, list_index, node_pointer) in the heap to handle ties and track which list to advance.",
    interviewAnswer:
      "Merge k sorted lists is a direct application of a min-heap. I initialize the heap with the head of each list, then repeatedly extract the minimum and advance that list. O(n log k) time — each of the n elements is heap-inserted exactly once. I'd also mention the divide-and-conquer alternative: merge lists in pairs, like bottom-up mergesort — also O(n log k) but O(log k) levels of merging. For interviews, the heap approach is more straightforward to implement and explain.",
    trap:
      "When using Python's heapq with custom objects (linked list nodes), you can't directly compare nodes if values are equal — Python will try to compare the ListNode objects and fail. Store tuples (value, index, node) where index is a tie-breaker. Forgetting the tie-breaker causes a TypeError when two nodes have equal values.",
    memoryAnchor:
      "Merge K sorted = K checkout lanes at a grocery store, each already sorted. A tiny elf (the min-heap) always picks the next item from whichever lane has the smallest front item. One elf, K lanes, perfectly sorted output.",
  },

  // ── Hash Tables ──────────────────────────────────────────────────────────────
  {
    id: "hash-internals",
    title: "Hash Table Internals",
    category: "hash-tables",
    basic:
      "A hash table maps keys to values using a hash function to compute an array index. O(1) average insert, lookup, and delete.",
    expected:
      "Hash function maps key to index in [0, m-1]. Ideal: uniform distribution, fast to compute, deterministic. Load factor α = n/m (n=elements, m=buckets). As α increases, collisions increase. Resize (rehash) when α exceeds threshold (typically 0.7-0.75). Python dicts are open-addressing hash maps; Java HashMap uses chaining. Amortized O(1) per operation across a sequence of operations including resizes.",
    deep:
      "Python's dict uses open addressing with pseudo-random probing and a growth factor of ~1.3x (resizes to 2x capacity). Python 3.7+ dicts maintain insertion order by using a compact array of indices pointing to a dense key-value array — this is why Python dicts are memory-efficient and ordered. JavaScript objects use hash tables internally but V8 switches to 'fast mode' (hidden classes / shape) for object properties that follow a fixed pattern. Hash table amortized O(1) relies on the number of resizes being O(log n) total across n inserts, each resize copying O(current size) — geometric series gives O(n) total copy work.",
    interviewAnswer:
      "A hash table is my default for O(1) lookup when keys are hashable. I understand that 'O(1)' is amortized average — worst case is O(n) with hash collisions or rehashing. I'd mention load factor as the key operational parameter: too low wastes space, too high degrades to O(n). In Python, dict and set are hash-based. For interview problems, I use a dict for frequency counting, inverse indexing, or memoization. For custom keys, I ensure the key is hashable and that equal objects have equal hashes.",
    trap:
      "Mutable objects cannot be dict keys in Python — they're not hashable. Lists and dicts are unhashable. Convert to tuples for hashability. Also: two objects that compare equal MUST have the same hash — if you override __eq__ without overriding __hash__, the default hash still uses object identity, which can cause correctness bugs.",
    memoryAnchor:
      "Hash table = a coat check. Hand over your coat (value), get a numbered ticket (hash). Retrieval is instant -- just show the ticket. Collisions = two coats get the same ticket number, so the attendant has to dig through a pile.",
  },
  {
    id: "collision-resolution",
    title: "Collision Resolution",
    category: "hash-tables",
    basic:
      "Collisions occur when two keys hash to the same index. Two main strategies: chaining (each bucket is a linked list) and open addressing (probe for the next empty slot).",
    expected:
      "Chaining: each bucket holds a list of (key, value) pairs. Worst case O(n) if all keys hash to same bucket. Average O(1) with load factor < 1 (can exceed 1). Open addressing: probe sequence until empty slot found. Linear probing (next slot), quadratic probing, double hashing. Load factor must stay < 1; typically trigger resize at 0.7. Clustering: linear probing causes primary clustering — long runs of occupied slots that slow lookup.",
    deep:
      "Linear probing has excellent cache behavior (sequential memory access) but suffers from primary clustering. Quadratic probing (probe by i²) reduces primary clustering but doesn't guarantee probing all slots unless m is prime and load factor < 0.5. Double hashing (second hash determines step size) avoids clustering and probes all slots — most theoretically sound open addressing. Robin Hood hashing: on insert, if the new element's probe distance is greater than the incumbent's, steal the slot and continue inserting the displaced element — reduces variance in lookup times. Cuckoo hashing: uses two hash functions and two tables — guaranteed O(1) worst-case lookup, amortized O(1) insert.",
    interviewAnswer:
      "Chaining and open addressing are the two fundamental collision strategies. Chaining is simpler and degrades gracefully with high load, but has pointer overhead and poor cache performance. Open addressing is cache-friendly but requires the load factor to stay well below 1. In practice, Java's HashMap uses chaining with tree nodes at high load (convert bucket list to red-black tree at length 8 for O(log n) worst case). Python uses open addressing with compact storage. I use this knowledge to explain why hash table performance degrades with adversarial inputs and how randomized hashing mitigates it.",
    trap:
      "Deleting from an open-addressing hash table cannot simply zero out the slot — subsequent lookups that probed through this slot will terminate early and fail to find keys that should be found. Use a 'tombstone' marker: the slot is treated as occupied for probing but empty for insertion. Forgetting tombstones causes silent data corruption in deletion-heavy workloads.",
    memoryAnchor:
      "Collision resolution: Chaining = apartment mailboxes where multiple letters stack in one box (linked list per slot). Open addressing = a parking lot where you circle to the next empty spot if yours is taken.",
  },

  // ── DS Design Patterns ───────────────────────────────────────────────────────
  {
    id: "monotonic-stack",
    title: "Monotonic Stack / Queue",
    category: "design-patterns-ds",
    basic:
      "A monotonic stack maintains elements in strictly increasing or decreasing order. Elements that violate the order are popped before the new element is pushed, enabling O(n) solutions for 'next greater element' problems.",
    expected:
      "Next greater element: iterate left to right, maintain a decreasing stack. When new element arr[i] > stack top, the top's 'next greater' is arr[i] — pop and record. Push arr[i]. O(n) time — each element pushed and popped once. Monotonic deque (sliding window maximum): use a deque that is decreasing front-to-back; remove elements from front when they're out of window, remove from back when new element is larger. O(n) for all n windows.",
    deep:
      "Monotonic stack problems: largest rectangle in histogram (maintain increasing stack of heights, pop when smaller height seen — compute area using popped height and current width), trapping rain water (two-pointer or monotonic stack approach), daily temperatures. The pattern is: whenever you pop an element, you've found the 'previous greater' or 'next smaller' relationship for that element — record the answer at pop time. For all-at-once processing, this yields O(n) solutions to problems that naively require O(n²) comparisons. Stock span problem generalizes this: span of day i = days since the last day with a higher price.",
    interviewAnswer:
      "Monotonic stack is my first thought when I see 'next greater/smaller element', 'largest rectangle', or 'trapping rain water'. The invariant is simple: when I pop an element, I've found the element that broke the monotonic property — and that relationship (next greater, previous smaller, etc.) is what I record as the answer for the popped element. Each element is pushed and popped at most once → O(n). I apply the same idea with a deque for sliding window maximum, where I additionally remove expired elements from the front.",
    trap:
      "Monotonic stack problems require careful handling of elements with equal values. For 'next greater' (strictly greater), elements equal to the stack top should NOT trigger a pop — they should be pushed on top. For 'next greater or equal', equal values should pop. Getting this wrong causes incorrect answers on inputs with duplicates.",
    memoryAnchor:
      "Monotonic stack = a line of increasingly tall people. When a taller person arrives, shorter people in front get eliminated because they'll never be 'seen' again. Each person enters and exits the line exactly once.",
  },
  {
    id: "fast-slow-pointers",
    title: "Fast/Slow Pointers (Floyd's Cycle Detection)",
    category: "design-patterns-ds",
    basic:
      "Two pointers moving at different speeds through a linked list or array: the fast pointer moves 2 steps per iteration, slow moves 1. If there's a cycle, they will meet.",
    expected:
      "Cycle detection: fast and slow will meet inside the cycle if one exists. To find cycle start: after meeting, reset slow to head. Advance both by 1 step — they meet again at the cycle entry. Middle of linked list: when fast reaches end, slow is at middle (or middle-left for even-length). Palindrome linked list: find middle, reverse second half, compare. Happy number: apply cycle detection to the f(n) sequence.",
    deep:
      "Mathematical proof for cycle start: let F = distance from head to cycle entry, C = cycle length, K = distance from entry to where slow/fast meet. Slow pointer walked F + K steps; fast walked 2*(F+K). Fast has lapped slow m times: 2(F+K) = F + K + m*C → F + K = m*C → F = m*C - K. Resetting slow to head and both walking 1 step: after F steps, slow is at cycle entry; fast started K before entry and has walked F steps = m*C - K steps ahead, which is exactly at the entry (since m*C is full cycles). This proves the meeting point after reset is always the cycle entry.",
    interviewAnswer:
      "Fast/slow pointers detect cycles in O(n) time and O(1) space — better than a hash set approach which is O(n) space. Beyond cycle detection, slow pointer at end gives middle of list — useful for palindrome checks and merge sort on linked lists. The mathematical derivation for finding the cycle start is elegant: after initial meeting, reset one pointer to head and advance both by 1; they meet at the cycle entry. I'd mention this is also applicable to 'duplicate number in array' problems where the array encodes a linked list.",
    trap:
      "The fast pointer must check both fast != null AND fast.next != null before advancing by 2. Checking only fast != null causes a null pointer exception on the second step when fast is at the last node of an odd-length list. Also: in the cycle start detection phase, both pointers must advance by EXACTLY 1 step — not fast by 2. Using 2 steps in the second phase gives incorrect results.",
    memoryAnchor:
      "Fast/slow = tortoise and hare on a circular track. If there's a loop, the hare laps the tortoise. No loop? The hare hits the finish line and the tortoise is at the halfway mark (linked list midpoint).",
  },
  {
    id: "interval-merge",
    title: "Interval Merge Pattern",
    category: "design-patterns-ds",
    basic:
      "Sort intervals by start time, then iterate and merge overlapping intervals by extending the end of the current interval when the next interval's start ≤ current end.",
    expected:
      "Sort by start: O(n log n). Merge pass: O(n). Total O(n log n). Two intervals [a,b] and [c,d] overlap if c ≤ b (c starts before b ends). Merge to [a, max(b,d)]. Common variations: insert interval (binary search for insertion point, merge with neighbors), non-overlapping intervals (greedy: keep interval with smallest end to maximize room for others — equivalent to activity selection), meeting rooms (count max overlapping intervals at any point).",
    deep:
      "Meeting rooms II (minimum meeting rooms): use a min-heap of end times. Sort by start time. For each meeting, if the earliest-ending meeting is already done (heap top ≤ current start), reuse that room. Otherwise add a new room. Heap size at end = minimum rooms needed. O(n log n). Equivalent to: sweep line on start/end events, count concurrent events. Interval DP: dp[i][j] = min cost to solve the subproblem on interval [i,j] — used for matrix chain multiplication, burst balloons, stone merge. The state space is O(n²) and transitions are O(n) → total O(n³).",
    interviewAnswer:
      "Interval problems almost always start with sorting by start time. Once sorted, the merge pass is a single O(n) scan. For insert interval, I binary search for the right position and then merge with adjacent overlaps. For minimum meeting rooms, I switch to a heap of end times — greedily reuse the room that frees up soonest. The key invariant to check is whether overlap is strict (c < b) or non-strict (c <= b) — it depends on whether [1,3] and [3,5] are considered overlapping in the problem.",
    trap:
      "Forgetting to sort intervals before merging makes the algorithm incorrect — the merge assumes intervals are in order. Also: the merge condition is c ≤ current_end (not c < current_end) for non-strict overlap. If two intervals share only a boundary point (e.g., [1,3] and [3,5]) and the problem says they should NOT be merged, use strict inequality c < b.",
    memoryAnchor:
      "Interval merge = stacking TV show recordings on a timeline. Sort by start time, then swallow any show that overlaps with the current block. Two shows overlap if one starts before the other ends.",
  },
];

// ─── Interview Patterns ──────────────────────────────────────────────────────

const interviewPatterns: InterviewPattern[] = [
  {
    question: "How do you approach a problem you've never seen before in an interview?",
    answer:
      "I follow a structured process: (1) Clarify — understand inputs, outputs, constraints, and edge cases (empty input, one element, duplicates, negatives). (2) Explore examples manually. (3) Identify the pattern — does this resemble two-sum, a tree traversal, a DP problem? (4) State the brute force and its complexity. (5) Reason about optimizations — what's repeated work? Can I use a hash map, sliding window, or DP to eliminate it? (6) Code the solution incrementally. (7) Test with the examples and edge cases. I talk through each step — the interviewer wants to see my thinking, not just the code.",
    whyAsked:
      "Interviewers use novel problems to distinguish pattern-matchers from genuine problem-solvers. They want to see your process, not just recall.",
    trap:
      "Jumping to code immediately without clarifying constraints. The brute force you skip is often the foundation of the optimized solution — always state it.",
  },
  {
    question: "When do you use a hash map vs sorting vs binary search?",
    answer:
      "Hash map: when I need O(1) lookup, membership testing, or frequency counting. I use it when the query pattern is random access and keys are hashable. Sorting: when I need to establish an order relationship that I'll exploit multiple times — sorting once at O(n log n) amortizes across O(n) subsequent O(log n) binary searches. Binary search: when the data is already sorted (or has a monotonic property) and I need to locate a boundary or answer in O(log n). The decision tree: random lookup → hash map. Ordered/range queries → sort + binary search. Finding k-th element → quickselect or heap.",
    whyAsked:
      "Data structure selection is the most frequent source of suboptimal solutions. Interviewers want to see principled, not arbitrary, choices.",
    trap:
      "Defaulting to sorting everything. If you only need membership testing, a sort + binary search is O(n log n) while a hash set is O(n). Always ask: do I need ORDER or just MEMBERSHIP?",
  },
  {
    question: "How do you identify when dynamic programming applies?",
    answer:
      "DP applies when a problem has two properties: (1) optimal substructure — the optimal solution contains optimal solutions to subproblems; (2) overlapping subproblems — the same subproblems appear repeatedly. I look for these signals: 'minimum/maximum/count number of ways', recursive structure where I'm making discrete choices, and where a greedy approach fails (I can't make a locally optimal choice without knowing future consequences). I test by writing the brute force recursion and checking if the same arguments repeat. If yes, memo.",
    whyAsked:
      "DP is the hardest interview topic to fake. Interviewers want to see if you can recognize it from first principles, not just match surface patterns.",
    trap:
      "Trying DP on problems that are actually greedy. If making the locally optimal choice at each step is always globally optimal (proved by exchange argument), DP is unnecessary overhead. Common greedy problems: interval scheduling, Huffman coding, Dijkstra's algorithm.",
  },
  {
    question: "Explain how you'd optimize a solution that is correct but too slow.",
    answer:
      "I first identify WHERE the inefficiency is — usually a nested loop doing redundant work, or repeated computation of the same subproblem. Then I ask: what information computed in an earlier iteration am I recomputing in a later one? This usually suggests: (a) preprocessing — sort, build prefix sums, build a hash map; (b) smarter traversal — two pointers or sliding window instead of nested loops; (c) DP or memoization for recursive problems; (d) choosing a better data structure — heap for repeated min/max, set for O(1) membership. I state the new complexity and verify it's correct before coding.",
    whyAsked:
      "The ability to iteratively optimize demonstrates algorithmic maturity — most interview solutions start at O(n²) and need to reach O(n log n) or O(n).",
    trap:
      "Optimizing the wrong bottleneck. If your solution is O(n²) due to a nested loop but you spend time reducing an O(n log n) sort, overall complexity doesn't improve. Profile the dominant term first.",
  },
  {
    question: "How do you handle graph problems — what's your decision framework?",
    answer:
      "First, identify the graph type: directed or undirected? Weighted or unweighted? Cyclic or DAG? Then: connected components → Union-Find or DFS/BFS. Cycle detection → DFS with color marking (undirected: back edge; directed: gray node). Shortest path (unweighted) → BFS. Shortest path (weighted, non-negative) → Dijkstra. Shortest path (negative weights) → Bellman-Ford. Dependency ordering → Topological sort. All-pairs shortest paths → Floyd-Warshall. Minimum spanning tree → Kruskal (Union-Find) or Prim (heap). I always check for negative edges before committing to Dijkstra.",
    whyAsked:
      "Graph problems span a huge surface area. Interviewers want to see that you can navigate to the right algorithm systematically, not guess.",
    trap:
      "Using BFS for shortest path in a weighted graph. BFS finds the path with fewest edges, not minimum total weight. If edge weights differ, BFS gives incorrect results — use Dijkstra.",
  },
  {
    question: "How do you think about space complexity, especially for recursive solutions?",
    answer:
      "Every recursive call occupies a stack frame. For a DFS on a binary tree with n nodes, the recursion depth is O(h) where h is the height — O(log n) for balanced, O(n) for skewed. If the interview problem constraints suggest n up to 10^5 or 10^6, an O(n) recursive depth can cause a stack overflow. I always ask: what is the maximum recursion depth? If it's proportional to n, I mention this and offer to convert to iterative with an explicit stack. For DP memoization, space is O(number of distinct states). For graph BFS, queue space is O(width of graph at widest level).",
    whyAsked:
      "Many candidates ignore the call stack's space contribution, leading to solutions that appear O(1) extra space but are actually O(n) due to recursion.",
    trap:
      "Claiming O(1) space for a recursive solution. Recursion uses stack space proportional to depth. The only truly O(1) space tree traversal is Morris traversal (threaded trees). For graphs, iterative DFS with an explicit stack is O(V) space — same as recursive, but at least it's heap space, not call stack space.",
  },
  {
    question: "When is O(n log n) not fast enough, and what alternatives exist?",
    answer:
      "If n = 10^8 and time limit is 1 second, O(n log n) at ~2.7*10^9 operations won't fit in ~10^8-10^9 operations budget. Options: (a) Non-comparison sorts (counting/radix sort) for integer inputs → O(n); (b) Hashing for lookup/dedup → O(n) expected; (c) Mathematical formulas (e.g., sum of 1..n = n*(n+1)/2) for arithmetic problems → O(1); (d) Streaming algorithms with sub-linear space (approximate counting, reservoir sampling); (e) If n is small (≤ 20), exponential algorithms like bitmask DP may be acceptable. Conversely, O(n²) is fine up to n ≈ 10^4.",
    whyAsked:
      "Senior engineers need to know complexity thresholds for practical problem-solving, not just the theory.",
    trap:
      "Assuming O(n log n) is always the target. For very small n, O(n²) or even O(n³) may be fine. For large n with integer data, O(n) counting sort beats O(n log n) comparison sorts. Know your input size before committing to a complexity class.",
  },
  {
    question: "How do you verify your algorithm's correctness in an interview?",
    answer:
      "I use three checks: (1) Trace through the given examples manually — does my algorithm produce the expected output? (2) Test edge cases: empty input, single element, two elements (catches off-by-one), all same elements (catches duplicate handling), minimum and maximum constraints. (3) Invariant check — state what property is maintained after each iteration of my loop and verify it holds at the beginning (established by init) and is preserved by each step. If the invariant implies the correct answer at termination, the algorithm is correct by induction. I verbalize these checks rather than silently running examples.",
    whyAsked:
      "Correctness verification distinguishes engineers who ship bugs from those who reason about their code. Interviewers value the process as much as the solution.",
    trap:
      "Testing only the given examples. Interviewers intentionally choose examples that don't expose common bugs like off-by-one errors or incorrect handling of duplicates. Always test a 2-element case for two-pointer and binary search problems.",
  },
];

// ─── Common Mistakes ──────────────────────────────────────────────────────────

const commonMistakes: CommonMistake[] = [
  {
    wrong: "Using lo <= hi termination in binary search for finding left/right boundaries — causes infinite loops when lo == hi and condition sets hi = mid.",
    correct: "Use lo < hi for boundary-finding binary search. Use lo <= hi only for exact-match search where you return immediately on match.",
  },
  {
    wrong: "Applying BFS to a weighted graph to find shortest path and claiming O(V+E) shortest path.",
    correct: "BFS finds shortest path by edge count (unweighted). For weighted graphs, use Dijkstra — O((V+E) log V) with a min-heap.",
  },
  {
    wrong: "Stating O(1) space for a recursive DFS or DP solution without accounting for the call stack.",
    correct: "Recursion uses O(depth) call stack space. State O(h) for tree DFS (h = height), O(n) for linear chains. Always account for stack depth.",
  },
  {
    wrong: "Forgetting to include a visited set in graph DFS/BFS, causing infinite loops on cyclic graphs.",
    correct: "Always maintain a visited set for graph traversals. Add a node to visited BEFORE pushing it to the queue/stack, not after popping, to prevent duplicate processing.",
  },
  {
    wrong: "Iterating the 1D knapsack DP in forward order when solving 0/1 knapsack — allows the same item to be counted multiple times.",
    correct: "0/1 knapsack with 1D DP requires iterating capacity in DECREASING order to ensure each item is used at most once. Forward iteration gives unbounded knapsack.",
  },
  {
    wrong: "Claiming hash map operations are O(1) worst case in technical discussions.",
    correct: "Hash map operations are O(1) AMORTIZED AVERAGE case. Worst case is O(n) due to hash collisions. Under adversarial inputs or poor hash functions, all keys can map to the same bucket.",
  },
  {
    wrong: "In two-sum variants on unsorted arrays, sorting first then applying two pointers — O(n log n) when O(n) is possible with a hash map.",
    correct: "For exact two-sum on an unsorted array, use a hash set for O(n) time. Reserve the sort + two-pointer approach for problems that require sorted order or when extra space is not allowed.",
  },
  {
    wrong: "Using mid = (lo + hi) / 2 in languages with fixed-width integers — causes integer overflow when lo and hi are both near INT_MAX.",
    correct: "Use mid = lo + (hi - lo) / 2 to avoid overflow. In Python this is not an issue (arbitrary integers), but always use the safe form as a habit.",
  },
  {
    wrong: "Deleting an entry from an open-addressing hash table by zeroing the slot — subsequent probes terminate early, making some keys unreachable.",
    correct: "Use tombstone markers for deletion in open-addressing hash tables. The tombstone allows probes to continue past the deleted slot while indicating the slot is available for new insertions.",
  },
  {
    wrong: "Using DFS to find the shortest path in an unweighted graph and assuming it gives the minimum-hop path.",
    correct: "DFS does NOT guarantee shortest path. It may find a longer path first. Use BFS for minimum-hop shortest path in unweighted graphs.",
  },
  {
    wrong: "In sliding window, recomputing the window state from scratch by iterating over the window after each step — reducing to O(n²).",
    correct: "Maintain the window state incrementally: add the new right element and remove the outgoing left element in O(1). The entire pass is O(n) because each element enters and leaves the window exactly once.",
  },
  {
    wrong: "Forgetting the {0: 1} initialization when using prefix sum + hash map for 'subarray sum equals k' — misses subarrays that start from index 0.",
    correct: "Initialize the prefix sum hash map with {0: 1} before iterating. This represents the empty prefix (sum = 0) and correctly counts subarrays beginning at index 0 whose sum equals k.",
  },
];

// ─── Practice Questions ───────────────────────────────────────────────────────

const practiceQuestions: PracticeQuestion[] = [
  {
    code: `function mystery(arr) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] < arr[hi]) hi = mid;
    else lo = mid + 1;
  }
  return arr[lo];
}
// Called with mystery([4, 5, 6, 7, 0, 1, 2])`,
    question: "What does this function return, and what is its time complexity?",
    answer:
      "Returns 0 — the minimum element in a rotated sorted array. Time complexity: O(log n). The algorithm is binary search: if arr[mid] < arr[hi], the minimum is in [lo, mid] (set hi=mid); otherwise the minimum is in (mid, hi] (set lo=mid+1). Terminates when lo == hi, which is the minimum's index.",
  },
  {
    code: `def count_subarrays(nums, k):
    count = 0
    prefix = 0
    seen = {0: 1}
    for n in nums:
        prefix += n
        count += seen.get(prefix - k, 0)
        seen[prefix] = seen.get(prefix, 0) + 1
    return count
# nums = [1, 1, 1], k = 2`,
    question: "What does count_subarrays([1, 1, 1], 2) return, and what is the time and space complexity?",
    answer:
      "Returns 2. The two subarrays with sum 2 are [1,1] (indices 0-1) and [1,1] (indices 1-2). Time: O(n). Space: O(n). The algorithm uses prefix sums + hash map: at each step, it looks up how many previous prefix sums equal (current prefix - k). The {0:1} initialization handles subarrays starting from index 0.",
  },
  {
    code: `function buildHeap(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(arr, n, i); // siftDown is O(log n)
  }
  return arr;
}`,
    question: "What is the time complexity of buildHeap? Why is it not O(n log n)?",
    answer:
      "O(n). Although there are O(n) nodes and each siftDown is O(log n), most nodes are near the bottom and do little work. Nodes at height h: O(n/2^h). siftDown cost at height h: O(h). Total: Σ(n/2^h)*h for h=0 to log(n) = O(n) by the geometric series sum. In contrast, inserting n elements one by one is O(n log n) — buildHeap is more efficient.",
  },
  {
    code: `def longest_window(s, k):
    count = {}
    max_len = 0
    left = 0
    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        while len(count) > k:
            count[s[left]] -= 1
            if count[s[left]] == 0:
                del count[s[left]]
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len
# s = "eceba", k = 2`,
    question: "What does longest_window('eceba', 2) return, and what does this function solve?",
    answer:
      "Returns 3. It solves 'longest substring with at most k distinct characters'. For 'eceba' with k=2: windows are 'e'(1), 'ec'(2), 'ece'(2), then 'b' makes 3 distinct so left shrinks to 'ceb'(3 distinct) → 'eb'(2) → window 'eba'(2 distinct, length 3). Answer is 3 ('ece'). Time: O(n), Space: O(k).",
  },
  {
    code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) {
        dp[a] = Math.min(dp[a], dp[a - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    question: "What is the time and space complexity of this coin change solution, and what is dp[0] = 0 for?",
    answer:
      "Time: O(amount × num_coins). Space: O(amount). dp[i] = minimum coins to make amount i. dp[0] = 0 is the base case: 0 coins are needed to make amount 0 — it seeds the recurrence. Without it, dp[coin] would never be set to 1 (1 coin) and all values would stay Infinity. The outer loop iterates amounts (not coins), making this the unbounded knapsack (coin can be reused).",
  },
  {
    code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]: px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]: self.rank[px] += 1
        self.components -= 1
        return True`,
    question: "What optimizations does this Union-Find implement, and what is the amortized time complexity per operation?",
    answer:
      "Two optimizations: (1) Path compression — 'self.parent[x] = self.find(self.parent[x])' makes every node on the path point directly to root, flattening the tree. (2) Union by rank — always attaches the shorter tree under the taller, bounding height to O(log n). Together: amortized O(α(n)) per operation where α is the inverse Ackermann function — effectively O(1) for all practical n (α(n) ≤ 4 for n < 2^65536). The components counter is an O(1) way to track the number of connected components.",
  },
  {
    code: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let max = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return max;
}`,
    question: "Why is it correct to advance the shorter pointer? What is the time complexity?",
    answer:
      "O(n) time, O(1) space. Correctness argument: at pointers (left, right), the area is min(h[left], h[right]) * (right-left). If h[left] < h[right], advancing right can only DECREASE width AND the height is still bounded by h[left] (still the shorter side) — so all pairs (left, right'), right' < right, are guaranteed to give smaller or equal area than the current best. Therefore we can safely eliminate all those pairs by advancing left. This greedy elimination is what makes O(n) correct — every pair is either checked or provably suboptimal.",
  },
  {
    code: `def merge_intervals(intervals):
    if not intervals:
        return []
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
# Input: [[1,3],[2,6],[8,10],[15,18]]`,
    question: "What does this return for the given input, and what is the time complexity? What is the edge case in the merge condition?",
    answer:
      "Returns [[1,6],[8,10],[15,18]]. Time: O(n log n) dominated by the sort; merge pass is O(n). The merge condition 'start <= merged[-1][1]' handles the case where intervals share only an endpoint (e.g., [1,3] and [3,5] merge to [1,5]). If the problem defines touching intervals as non-overlapping, use strict '<'. The critical detail: merged[-1][1] = max(merged[-1][1], end) handles fully contained intervals (e.g., [1,10] and [2,5] — without max, the end would incorrectly shrink to 5).",
  },
];

// ─── Topic Data Export ────────────────────────────────────────────────────────

export const topicData: TopicData = {
  topicTitle: "DSA",
  topicMeta: "60–75 min · Mid to Senior level",
  lastUpdated: "2026-04-10",
  lastHourConceptIds: [
    "big-o",
    "two-pointers",
    "sliding-window",
    "binary-search",
    "dfs-bfs",
    "memo-vs-tab",
    "heap-internals",
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
