import type {
  TopicData,
  MentalModel,
  CategoryMeta,
  TreeNode,
  Concept,
  InterviewPattern,
  CommonMistake,
  PracticeQuestion,
  LastHourSummary,
} from "../types";

const mentalModel: MentalModel = {
  whatItIs:
    "AI coding agents (Claude Code, Codex CLI, Cursor agents, etc.) are LLM-driven autonomous loops that perceive a codebase, plan changes, execute tools (read/edit/bash), observe results, and iterate until a goal is met. The 'agent' isn't the model — it's the loop around the model: a system prompt, a tool registry, a context window, and a turn-by-turn execution harness that lets the model take real actions on your filesystem and shell.",
  whyItExists:
    "Pure chat-based LLMs are stateless oracles — they answer questions but can't act. Agents close the gap between 'understanding code' and 'changing code' by giving the model deterministic tools (Read, Edit, Bash, Grep) and a way to observe the results of its own actions. This unlocks multi-step tasks: refactor a module, debug a failing test, ship a PR. The cost is that agents need carefully designed instructions (CLAUDE.md, skills), permission boundaries (settings.json), and verification workflows to avoid expensive mistakes on real systems.",
  whenToUse: [
    "Multi-file refactors and migrations where context spans more than a chat window",
    "Bug investigation that requires reading code, running tests, and iterating",
    "Repetitive workflows you'd otherwise script — when the script would be brittle but the pattern is clear",
    "Pair-programming on unfamiliar codebases — the agent reads first, then proposes",
    "Drafting PRs end-to-end: branch, edit, test, commit, push, gh pr create",
    "Operating on local artifacts (logs, screenshots, datasets) where uploading to a chat UI is friction",
  ],
  whereItFails: [
    "Tasks needing real-time judgment or domain context the model lacks — agents will confidently produce wrong answers",
    "Production system operations without strict permission boundaries — destructive commands can land before you notice",
    "Long-horizon tasks where context exceeds the window — quality degrades as compression kicks in",
    "Highly novel problems with no precedent in training data — agents pattern-match, they don't invent",
    "Anything where the cost of a wrong answer exceeds the cost of doing it yourself (production migrations, security-sensitive code)",
    "Tightly-coupled creative work where the human's intent shifts mid-task faster than the agent can re-plan",
  ],
};

const categories: CategoryMeta[] = [
  {
    id: "foundations",
    label: "Foundations",
    description:
      "The agent loop, tool use, context windows, and token economics — the primitives every agent harness is built on",
  },
  {
    id: "claude-code",
    label: "Claude Code",
    description:
      "CLAUDE.md, slash commands, hooks, settings.json, and permission modes — Anthropic's official CLI agent",
  },
  {
    id: "skills",
    label: "Skills",
    description:
      "SKILL.md, skill discovery, custom skills — modular capabilities that agents can invoke on demand",
  },
  {
    id: "subagents",
    label: "Subagents & Delegation",
    description:
      "Spawning specialized agents, parallel execution, worktree isolation — scaling beyond a single context window",
  },
  {
    id: "mcp",
    label: "MCP",
    description:
      "Model Context Protocol — the standard for connecting agents to external tools, data sources, and services",
  },
  {
    id: "memory-context",
    label: "Memory & Context",
    description:
      "Auto-memory, prompt caching (5-minute TTL), context compression — managing the agent's working memory",
  },
  {
    id: "workflow-patterns",
    label: "Workflow Patterns",
    description:
      "Plan mode, verify-before-done, hooks for automation, the executing-actions-with-care pattern",
  },
  {
    id: "codex-comparison",
    label: "Codex & Comparison",
    description:
      "OpenAI Codex CLI, comparison with Claude Code, choosing the right agent for a task",
  },
  {
    id: "ecosystem-skills",
    label: "Ecosystem & R&D Skills",
    description:
      "Real-world community and official skills — caveman (compression), graphify (knowledge graphs), skill-creator (Anthropic), simplify/review/security-review",
  },
];

const mentalModelTree: TreeNode = {
  id: "root",
  label: "AI Coding Agents",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "cat-foundations",
      label: "Foundations",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-agent-loop", label: "Agent Loop", nodeType: "concept", conceptId: "agent-loop", importance: "critical" },
        { id: "node-tool-use", label: "Tool Use", nodeType: "concept", conceptId: "tool-use", importance: "critical" },
        { id: "node-context-window", label: "Context Window", nodeType: "concept", conceptId: "context-window", importance: "critical" },
        { id: "node-token-economics", label: "Token Economics", nodeType: "concept", conceptId: "token-economics", importance: "high" },
        { id: "node-structured-outputs", label: "Structured Outputs", nodeType: "concept", conceptId: "structured-outputs", importance: "critical" },
      ],
    },
    {
      id: "cat-claude-code",
      label: "Claude Code",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-claude-md", label: "CLAUDE.md", nodeType: "concept", conceptId: "claude-md", importance: "critical" },
        { id: "node-slash-commands", label: "Slash Commands", nodeType: "concept", conceptId: "slash-commands", importance: "high" },
        { id: "node-hooks", label: "Hooks", nodeType: "concept", conceptId: "hooks", importance: "high" },
        { id: "node-settings-json", label: "settings.json & Permissions", nodeType: "concept", conceptId: "settings-json", importance: "high" },
      ],
    },
    {
      id: "cat-skills",
      label: "Skills",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-skills-overview", label: "Skills (SKILL.md)", nodeType: "concept", conceptId: "skills-overview", importance: "critical" },
        { id: "node-skill-creator", label: "Creating Custom Skills", nodeType: "concept", conceptId: "skill-creator", importance: "high" },
        { id: "node-skill-vs-prompt", label: "Skill vs Prompt vs CLAUDE.md", nodeType: "concept", conceptId: "skill-vs-prompt", importance: "high" },
      ],
    },
    {
      id: "cat-subagents",
      label: "Subagents & Delegation",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-subagents", label: "Subagents", nodeType: "concept", conceptId: "subagents", importance: "critical" },
        { id: "node-parallel-agents", label: "Parallel Execution", nodeType: "concept", conceptId: "parallel-agents", importance: "high" },
        { id: "node-agent-isolation", label: "Worktree Isolation", nodeType: "concept", conceptId: "agent-isolation", importance: "medium" },
      ],
    },
    {
      id: "cat-mcp",
      label: "MCP",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-mcp-overview", label: "Model Context Protocol", nodeType: "concept", conceptId: "mcp-overview", importance: "critical" },
        { id: "node-mcp-servers", label: "MCP Servers", nodeType: "concept", conceptId: "mcp-servers", importance: "high" },
        { id: "node-mcp-connectors", label: "Connectors", nodeType: "concept", conceptId: "mcp-connectors", importance: "medium" },
        { id: "node-prompt-injection", label: "Prompt Injection", nodeType: "concept", conceptId: "prompt-injection", importance: "critical" },
      ],
    },
    {
      id: "cat-memory-context",
      label: "Memory & Context",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-auto-memory", label: "Auto Memory", nodeType: "concept", conceptId: "auto-memory", importance: "high" },
        { id: "node-prompt-caching", label: "Prompt Caching", nodeType: "concept", conceptId: "prompt-caching", importance: "critical" },
        { id: "node-context-compression", label: "Context Compression", nodeType: "concept", conceptId: "context-compression", importance: "high" },
      ],
    },
    {
      id: "cat-workflow-patterns",
      label: "Workflow Patterns",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-plan-mode", label: "Plan Mode", nodeType: "concept", conceptId: "plan-mode", importance: "high" },
        { id: "node-verify-before-done", label: "Verify Before Done", nodeType: "concept", conceptId: "verify-before-done", importance: "critical" },
        { id: "node-executing-with-care", label: "Executing With Care", nodeType: "concept", conceptId: "executing-with-care", importance: "critical" },
        { id: "node-agent-evals", label: "Agent Evals", nodeType: "concept", conceptId: "agent-evals", importance: "critical" },
      ],
    },
    {
      id: "cat-codex-comparison",
      label: "Codex & Comparison",
      nodeType: "category",
      importance: "medium",
      children: [
        { id: "node-codex-cli", label: "OpenAI Codex CLI", nodeType: "concept", conceptId: "codex-cli", importance: "high" },
        { id: "node-claude-vs-codex", label: "Claude Code vs Codex", nodeType: "concept", conceptId: "claude-vs-codex", importance: "medium" },
      ],
    },
    {
      id: "cat-ecosystem-skills",
      label: "Ecosystem & R&D Skills",
      nodeType: "category",
      importance: "medium",
      children: [
        { id: "node-caveman-skill", label: "Caveman Mode", nodeType: "concept", conceptId: "caveman-skill", importance: "medium" },
        { id: "node-graphify-skill", label: "Graphify", nodeType: "concept", conceptId: "graphify-skill", importance: "medium" },
        { id: "node-skill-creator-official", label: "skill-creator (Official)", nodeType: "concept", conceptId: "skill-creator-official", importance: "high" },
        { id: "node-code-quality-skills", label: "simplify / review / security-review", nodeType: "concept", conceptId: "code-quality-skills", importance: "high" },
      ],
    },
  ],
};

const concepts: Concept[] = [
  // ── Foundations ────────────────────────────────────────────
  {
    id: "agent-loop",
    title: "The Agent Loop",
    category: "foundations",
    basic:
      "An agent loop is: model receives messages → model emits text + tool calls → harness executes tools → tool results appended to messages → model runs again. Repeats until the model emits a final answer with no tool calls (or hits a stop condition).",
    expected:
      "The harness owns the loop, not the model. Each turn the model sees the full conversation (system prompt, user message, all prior tool calls and results). The model decides whether to call more tools or stop. The harness decides safety: which tools are allowed, what gets auto-approved, when to ask the user. Termination: explicit stop turn (no tool calls), max turns reached, user interrupt, or hook-blocked stop.",
    deep:
      "Agent loops are stateful only in the messages array — there's no hidden 'agent state.' This is why context engineering matters: every reset means re-reading files, re-running greps. Anthropic's harness uses a Stop hook lifecycle: PreToolUse (approve/deny), PostToolUse (observe), Stop (block termination if work isn't done), UserPromptSubmit (inject context). The cost model is per-turn: each tool result extends the next request's input tokens. Long loops with verbose tool output are expensive and slow — prefer Read with offset/limit over cat-the-whole-file, prefer Grep over reading and scanning.",
    interviewAnswer:
      "An agent loop is a wrapper around an LLM that lets it take actions through tools and observe results. Each turn, the harness runs the model, executes any tools it requested, and feeds the results back. The loop terminates when the model emits no tool calls. The key insight is that the harness — not the model — owns safety and policy: which tools exist, which are auto-approved, when to interrupt. Designing agents is mostly designing this harness.",
    trap:
      "Thinking the agent 'remembers' across runs. There is no hidden state — only the message history. If you start a new session, the agent has zero knowledge of prior work unless it's in CLAUDE.md, memory files, or git history.",
    memoryAnchor:
      "An agent loop is a kitchen line cook with a ticket window — read ticket, grab ingredients (tools), cook, plate, send back. They don't remember last shift. The system prompt is the menu; CLAUDE.md is the recipe binder.",
  },
  {
    id: "tool-use",
    title: "Tool Use (Function Calling)",
    category: "foundations",
    basic:
      "Tool use is the mechanism by which an LLM requests an action: the model emits a structured tool_use block with a name and JSON arguments, the harness executes it, and returns a tool_result block. Native to Claude/GPT-4/Gemini APIs; not 'agent-specific.'",
    expected:
      "Each tool has a JSON Schema describing its parameters. The model picks tools based on (a) tool name + description, (b) parameter schema, (c) examples in the system prompt. Models can emit multiple tool calls in one turn — the harness should run independent ones in parallel (e.g., reading three unrelated files). Tools that depend on prior output must run sequentially. Failed tool calls return errors as tool_result with is_error: true; the model usually retries or asks for help.",
    deep:
      "Tool schemas count toward input tokens — too many tools or verbose descriptions blow up the prompt. Anthropic supports 'deferred tools' (ToolSearch in Claude Code) — schemas not loaded until needed, just names. Tool choice modes: auto (model decides), any (must call some tool), tool (must call this specific tool), none (no tools). For agents, 'auto' is standard. Tool result content can be text, images, or both. Critically: tool descriptions are part of the prompt and matter as much as system prompts — vague descriptions = bad tool selection.",
    interviewAnswer:
      "Tool use lets the model emit structured action requests that the harness executes. The model sees tool definitions (name + description + JSON schema) in its system prompt and chooses tools by matching the user's intent against descriptions. Independent tool calls in the same turn can be parallelized. The harness is responsible for executing tools and feeding results back. The art is writing tool descriptions clearly enough that the model picks the right one without needing examples.",
    trap:
      "Adding too many tools 'just in case.' Each tool's schema costs tokens on every turn, and more tools means more selection errors. Aim for the smallest tool set that covers the task — quality of descriptions beats quantity of tools.",
    memoryAnchor:
      "Tool use is a vending machine — model presses a button (tool name), pays in tokens, gets the snack (result). Too many buttons = wrong snack. Vague labels = wrong snack.",
  },
  {
    id: "context-window",
    title: "Context Window & Management",
    category: "foundations",
    basic:
      "The context window is the maximum number of tokens (input + output) the model can process in one request. Claude Sonnet/Opus 4.0-era was 200K tokens (~150K words); 4.6+ ships with 1M tokens at standard pricing. GPT-4 Turbo: 128K; o-series and GPT-5 vary. Once full, you must compress, prune, or fail.",
    expected:
      "Window structure: system prompt (CLAUDE.md, tool defs, persistent memory) + conversation history + current user message + room for response. Long agent runs fill the window with tool results — file contents, command output, search results. Once you hit ~80% of the window, quality degrades (recency bias, lost-in-middle effects). Mitigations: file reads with offset/limit, summarizing old turns, dispatching subagents to absorb verbose work, caching the static prefix.",
    deep:
      "Different models behave differently at context-window edges. Claude has 'auto-compaction' in Claude Code that summarizes old turns automatically. Some harnesses implement memory files (CLAUDE memory) so persistent facts don't live in the rolling window. Position matters: information at the very start (system) and very end (most recent) is recalled best — the middle is the 'lost in the middle' valley. For RAG-style agents, retrieval beats stuffing — only fetch what's relevant per turn. Budgeting: a rough rule is keep working context under 50K tokens for predictable quality, even with a 200K or 1M limit — quality degrades long before the hard cap.",
    interviewAnswer:
      "The context window is the LLM's working memory — everything the model 'sees' in a single forward pass. Claude 4.0-era was 200K; 4.6+ ships with 1M at standard pricing. The challenge in agents is that tool results accumulate fast: reading three files, running a grep, and a build can easily consume 50K tokens — and quality degrades well before the hard limit regardless of how big the window is. Mitigations include reading file ranges instead of whole files, using grep for targeted searches, dispatching subagents to absorb verbose work, and prompt caching the static prefix. I aim to stay under ~50% utilization for the working portion regardless of window size.",
    trap:
      "Reading entire files when you need 20 lines. Each unnecessary file read shrinks the room left for thinking and future tool calls — and trains a habit that breaks at scale.",
    memoryAnchor:
      "Context window is a desk — small enough that piling unread papers (whole-file reads) leaves no room to write. The tidier the desk, the better the work.",
  },
  {
    id: "token-economics",
    title: "Token Economics & Cost",
    category: "foundations",
    basic:
      "Tokens are the billing unit. Input tokens (prompt) and output tokens (response) are priced separately, with output usually 4–5x more expensive. Sonnet 4.6 is around $3/M input, $15/M output; Opus 4.6/4.7 is around $5/M input, $25/M output — about 1.7× Sonnet, a significant convergence from the ~5× Opus/Sonnet gap in the Claude 3 era. Verify current pricing on the Anthropic console; it adjusts with model releases. Costs add up fast in long agent loops.",
    expected:
      "Each turn re-sends the entire conversation as input — so a 50-turn agent run with 50K tokens of accumulated context pays for 50K input tokens × 50 turns = 2.5M input tokens before counting output. Mitigations: prompt caching (90% discount on cached prefix), batching, smaller models for routine work (Haiku for grep/file reads, Sonnet for design). Track cost per session; flag runaway loops where input grows without progress.",
    deep:
      "Prompt caching has two TTL options: 5-minute (default since March 2026, ~25% write premium) and 1-hour (explicit `\"ttl\": \"1h\"` in cache_control, 2× write premium). Before March 2026 the default was 1 hour, which is a common gotcha in older example code. Cache-aware design: stable system prompt + CLAUDE.md at the front (cached), volatile user content at the end (not cached). Reads are 90% off — break-even is roughly 2 uses on the 5-minute tier. For high-frequency agents (CI bots, scheduled tasks), cache hit rate is the dominant cost driver. The 1-hour TTL is worth it for long-running tasks (>5 min between turns) where you'd otherwise re-cache. Output tokens dominate when responses are long (code generation, explanations); choose terse output formatting in those cases.",
    interviewAnswer:
      "Tokens are how LLMs are priced — input and output separately, output usually 4–5x more expensive. The non-obvious cost in agents is that every turn re-sends the full conversation, so a long loop with verbose tool output gets expensive quickly. Prompt caching is the biggest lever: a stable prefix (system prompt + CLAUDE.md) gets cached for 5 minutes at a 90% discount on reads. I structure agent workflows to keep cache hits high — stable prefix at the front, volatile user content at the end, no sleeps longer than 5 minutes mid-loop.",
    trap:
      "Ignoring prompt caching. Without it, a typical Claude Code session costs 3–5x more than it needs to. The cache is mostly automatic but breaks if you change the system prompt mid-session or sleep past 5 minutes.",
    memoryAnchor:
      "Tokens are taxi meter clicks — input clicks every time you pull up to a stoplight (turn), output clicks while driving. Caching is the monthly transit pass — 90% off if you board before the pass expires (5 min).",
  },
  {
    id: "structured-outputs",
    title: "Structured Outputs (JSON Mode, Tool Use)",
    category: "foundations",
    basic:
      "Structured outputs let an LLM emit machine-parseable data (JSON matching a schema) instead of free text. Three common mechanisms: tool-use (Claude — define a tool with an input schema; the model emits a tool_use block), OpenAI's `response_format: { type: 'json_schema', schema }` (constrained decoding to a JSON Schema), and OpenAI's older `json_mode` (validates JSON, no schema). Reliability: tool-use and json_schema are near-100% schema-conformant; free-text-then-parse fails 5-15% of the time at scale.",
    expected:
      "Use cases: data extraction from text, classifiers (route to category X), tool routers (which downstream service to call), agent control flow (next action). Pattern: define the schema once; let the runtime enforce it. With Claude tool-use, you can define a 'fake' tool whose only purpose is to capture structured output — the harness gets the validated JSON without actually calling anything. Validation: even with json_schema, validate at the boundary — schema-violation retry on parse failure (1-2 retries, then error). Cost: schema tokens count toward input on every turn — keep schemas tight.",
    deep:
      "Constrained decoding (json_schema mode) works by masking logits at each token to disallow tokens that would break the schema. This guarantees parseability but may degrade reasoning quality on hard cases — the model can't 'think out loud' before answering. Mitigations: have the model emit a 'reasoning' free-text field BEFORE the structured fields (chain-of-thought baked in), or run two passes (think → extract). Tool-use vs json_schema: tool-use lets you mix structured outputs with text in the same turn (model can explain then call tool); json_schema gives you a single structured response. For agent control, tool-use is usually better. For pure data extraction, json_schema is simpler.",
    interviewAnswer:
      "Structured outputs are how I get reliably parseable data from an LLM. Three mechanisms: Claude's tool-use (define a tool with an input schema, model emits tool_use), OpenAI's json_schema mode (constrained decoding to a JSON Schema), and the older json_mode (validates JSON without enforcing schema). For agent control flow I use tool-use — it lets the model explain before acting and naturally fits the agent loop. For pure data extraction I use json_schema. I always validate at the boundary and retry on schema violation. Schemas count toward input tokens, so I keep them as tight as possible.",
    trap:
      "Asking the model to 'return JSON' in a prompt without enforcement. ~5–15% of responses will have malformed JSON, especially on edge cases (escaped quotes, unicode, trailing commas). Use tool-use or json_schema; don't roll your own JSON parser as the failure mode.",
    memoryAnchor:
      "Structured outputs are a customs declaration form — fields are typed and validated at the gate. Free-text answers are a rambling letter the agent then has to translate. The form is faster and never lies about what it contains.",
  },

  // ── Claude Code ────────────────────────────────────────────
  {
    id: "claude-md",
    title: "CLAUDE.md — Project Instructions",
    category: "claude-code",
    basic:
      "CLAUDE.md is a markdown file at the root of a project (or in subdirectories) that Claude Code reads automatically and treats as part of its system prompt. Use it to encode project conventions, architectural decisions, and instructions like 'always run tests after editing.'",
    expected:
      "Three locations matter: ~/.claude/CLAUDE.md (global, applies everywhere), <project>/CLAUDE.md (committed, shared with team), <project>/CLAUDE.local.md (gitignored, personal). Subdirectory CLAUDE.md files are loaded when Claude operates in that directory. Content should be terse and rule-oriented: 'use pnpm not npm,' 'tests live in __tests__/,' 'never edit generated/.' Avoid wall-of-text explanations — every line costs tokens on every turn.",
    deep:
      "CLAUDE.md sits in the cached prefix, so it's free after the first turn — but it does count toward the context window. Best practice: keep it under ~300 lines. Override hierarchy: nearest file wins for conflicts, but all files load (additive). Use it for *behaviors*, not *facts about code* — the model can read the code. Save 'when running tests, always include --coverage' (behavior) over 'this project uses Jest' (derivable from package.json). Bad CLAUDE.md is worse than no CLAUDE.md because it pollutes every prompt.",
    interviewAnswer:
      "CLAUDE.md is project-level context that Claude Code loads automatically into the system prompt. I use it to encode invariants the model can't infer from the code — coding conventions, deployment rules, 'never push to main without a review,' which package manager to use. I keep it under 300 lines and rule-oriented because it sits in every turn's prompt. The commit-vs-personal split (CLAUDE.md vs CLAUDE.local.md) lets the team share rules while individuals add personal preferences.",
    trap:
      "Treating CLAUDE.md as a wiki. Long explanatory prose costs tokens every turn and the model rarely needs the explanation — it needs the rule. 'Use 4-space indents' beats two paragraphs about why we use 4-space indents.",
    memoryAnchor:
      "CLAUDE.md is a sticky note on the office monitor — every time you sit down (every turn), you read it. Make it a checklist, not an essay.",
  },
  {
    id: "slash-commands",
    title: "Slash Commands",
    category: "claude-code",
    basic:
      "Slash commands are shortcuts in Claude Code that invoke skills or built-in actions. Built-in: /help, /clear, /config, /loop. Custom: anything in ~/.claude/skills/ or .claude/skills/ becomes /<skill-name>.",
    expected:
      "Typing /<name> at the start of a message invokes the matching skill via the Skill tool. Slash commands accept arguments after the name: /loop 5m /run-tests. Built-in commands are handled by the harness directly (not the model), so /clear, /config don't go through the LLM. User-defined skills must be in skills directories with a SKILL.md file. The harness registers them at startup and shows them in the /help menu.",
    deep:
      "Slash commands are syntactic sugar over the Skill tool. The harness intercepts /<name> at the start of a user message, looks up the skill, and invokes it — usually with an autoload of SKILL.md content into context. Slash commands are NOT visible to the model unless the user types them; the model must use the Skill tool explicitly. Aliases via plugin namespacing: /plugin:skill for plugin-provided skills. Slash commands are a UX layer; agents in subagent contexts may not have the same set.",
    interviewAnswer:
      "Slash commands in Claude Code are shortcuts users type to invoke skills or built-in actions. /help, /clear, /config are built into the harness; anything else maps to a skill defined in ~/.claude/skills/<name>/SKILL.md. They're a thin UX layer over the Skill tool — the harness translates /foo into a Skill invocation. I add custom slash commands for repeated workflows: /review for PR reviews, /security-review for OWASP-style checks.",
    trap:
      "Forgetting that the model doesn't see slash commands typed by the user as /commands — by the time the model gets the message, the harness may have already expanded or replaced them. If you want the model to know what was invoked, mention it in the prompt explicitly.",
    memoryAnchor:
      "Slash commands are speed-dial buttons on a phone — /3 calls mom (a skill). The phone (harness) knows the number; the person on the line (model) just hears the conversation, not the keypress.",
  },
  {
    id: "hooks",
    title: "Hooks (PreToolUse, PostToolUse, Stop)",
    category: "claude-code",
    basic:
      "Hooks are shell commands that fire on agent lifecycle events. Configured in settings.json. The most-used events: PreToolUse (before any tool runs), PostToolUse (after), Stop (when the model tries to end its turn), UserPromptSubmit (when user sends a message). Additional events include SubagentStop, PreCompact, SessionStart, SessionEnd, and Notification — see the Claude Code docs for the full list.",
    expected:
      "Each hook has an event, an optional matcher (e.g., 'Bash' for tool name), and a command that runs in the project root. Hooks can block actions: returning non-zero exit + a message in stderr cancels the tool call (PreToolUse) or forces the agent to keep working (Stop). Hooks see structured JSON about the event on stdin. Common uses: auto-format on PostToolUse Edit, run typecheck on Stop, log every Bash call to a security audit, snapshot session state on PreCompact before context compression.",
    deep:
      "Hook commands inherit the user's environment — same shell, same PATH, same secrets. Stop hooks are the most powerful: they can prevent the agent from ending its turn until conditions are met (tests pass, build succeeds). SubagentStop fires when a spawned subagent finishes — useful for verifying delegated work. PreCompact fires before auto-compaction so you can persist important state. The model sees hook stderr messages as user feedback and is expected to address them. Hooks bypass approval gates — they ALWAYS run, so a misconfigured hook (e.g., infinite loop) can deadlock the agent. disableAllHooks: true in settings.local.json is the kill switch. Multi-hook chains: multiple hooks for the same event run sequentially; first failure usually short-circuits.",
    interviewAnswer:
      "Hooks let me run shell commands at agent lifecycle points — before/after tool calls, on stop, on user prompt submission. They're configured in settings.json with an event type, an optional matcher, and a command. The most powerful is Stop hooks because they can block the model from ending its turn — I use them to enforce 'tests must pass' or 'no uncommitted changes.' The model sees hook stderr as feedback and is expected to fix the issue. Hooks always run, so a buggy hook can deadlock the agent — I keep a kill switch in settings.local.json.",
    trap:
      "Stop hooks that fire after every turn become noise — the model gets the same complaint repeatedly even if it's not actionable. Make Stop hooks specific: 'fail if tests are failing AND tests were touched in this session,' not 'fail if tests are failing.'",
    memoryAnchor:
      "Hooks are airport security checkpoints — PreToolUse is the metal detector (block before action), PostToolUse is the customs declaration (observe after), Stop is the gate agent (can't leave the gate until boarding pass scans).",
  },
  {
    id: "settings-json",
    title: "settings.json & Permission Modes",
    category: "claude-code",
    basic:
      "settings.json (project-level) and ~/.claude/settings.json (global) configure Claude Code behavior: hooks, permissions, environment variables, model preferences. settings.local.json is the gitignored personal override.",
    expected:
      "Permission modes: 'default' (prompts for non-allowlisted tools), 'acceptEdits' (auto-approve file edits), 'plan' (read-only, no edits), 'bypassPermissions' (no prompts — dangerous). The 'permissions' field has 'allow' and 'deny' arrays for specific tool patterns: 'Bash(npm install:*)' allows npm install commands, 'Bash(rm -rf:*)' denies recursive deletes. Permissions match before the model is even asked — they're enforced by the harness.",
    deep:
      "Settings merge in order: ~/.claude/settings.json → <project>/.claude/settings.json → <project>/.claude/settings.local.json (most specific wins for scalars; arrays merge or replace based on key). 'env' injects environment variables into all hook and tool executions. Use settings.local.json for personal allowlists (dev DB credentials), settings.json for shared team rules (deny push --force). enableAllProjectMcpServers / disabledMcpjsonServers control MCP server activation per project. enableHooks / disableAllHooks are the kill switches.",
    interviewAnswer:
      "settings.json is where I configure Claude Code per-project: which tools are auto-approved, which are denied, what hooks run, environment variables. The permission system is harness-enforced — 'Bash(npm test:*)' on the allow list means the model never gets prompted. The split between settings.json (committed, team-shared) and settings.local.json (gitignored, personal) lets us share team rules while keeping individual workflow tweaks private. I always have a 'deny' list for destructive commands: rm -rf, git push --force, kubectl delete.",
    trap:
      "Putting secrets in settings.json. It gets committed. Use settings.local.json for anything sensitive, or better, use environment variables loaded from .env files outside the repo.",
    memoryAnchor:
      "settings.json is the office key card system — project settings are the building badge (everyone has it), settings.local is your personal access (cleaning crew can't get in your office).",
  },

  // ── Skills ─────────────────────────────────────────────────
  {
    id: "skills-overview",
    title: "Skills (SKILL.md)",
    category: "skills",
    basic:
      "A skill is a reusable agent capability defined by a SKILL.md file in a known directory (~/.claude/skills/<name>/SKILL.md or .claude/skills/<name>/SKILL.md). The SKILL.md has YAML frontmatter (name, description, optional fields like allowed-tools and model) and a body of instructions. Invoked via /name or the Skill tool.",
    expected:
      "Skill structure: frontmatter (YAML: name, description, model preference) + markdown body with instructions, examples, expected inputs/outputs. The 'description' field is critical — it's what the model uses to decide when to invoke the skill. Skills can ship with helper files (templates, scripts) in the skill directory; the SKILL.md can reference them. Skills are loaded into context only when invoked — they don't bloat the base prompt. Skills can call other skills.",
    deep:
      "Skills vs prompts: a prompt is one-shot, a skill is reusable across sessions and discoverable. The 'description' is matched against user intent when the harness suggests skills; weak descriptions = skills don't fire. Skills can be triggered by users (slash command), by the model (Skill tool), or by hooks (programmatically). Sandbox: skills can specify allowed tools, model preferences, and isolation modes. Plugin namespacing: plugins ship skills under their plugin name, accessed as /plugin:skill. Skill files participate in prompt caching — stable skills get cache benefits.",
    interviewAnswer:
      "Skills are reusable agent capabilities defined in SKILL.md files. Each skill has YAML frontmatter (name, description, optional fields like allowed-tools and model) and a body of instructions, optionally with helper scripts. Skills are loaded only when invoked — unlike CLAUDE.md they don't bloat every prompt. The description field is the most important piece because it's what the model matches against user intent. Skills are how I encode 'how we do X' — code review, security audits, deployment runbooks — without making every session pay for them in tokens.",
    trap:
      "Writing skills that duplicate CLAUDE.md content. CLAUDE.md is for always-on rules; skills are for on-demand workflows. If you find yourself invoking a skill on every session, it probably belongs in CLAUDE.md.",
    memoryAnchor:
      "Skills are tools in a toolbox — the toolbox stays in the truck (skills directory), you pull out the right tool when the job asks for it. CLAUDE.md is the safety vest you always wear.",
  },
  {
    id: "skill-creator",
    title: "Creating Custom Skills",
    category: "skills",
    basic:
      "Create a directory in ~/.claude/skills/<name>/, add a SKILL.md with name, description, and instructions. Optionally add scripts, templates, or examples in the same directory. The harness picks it up on next session.",
    expected:
      "Structure of a good SKILL.md: (1) frontmatter with name (must match directory), description (1-2 sentences on when to use, in third person), allowed-tools (optional). (2) Body: clear instructions, examples of correct usage, common mistakes. Use the skill-creator skill to scaffold — it knows the conventions. Test by invoking via /name and observing whether the model behavior matches expectations. Iterate on the description field if the model isn't picking it up reliably.",
    deep:
      "The model decides when to invoke a skill based on the description matched against the conversation. Vague descriptions ('helps with code') don't fire; specific ones ('use when reviewing a PR for security issues, OWASP top 10') do. Skill scope: keep skills narrow — one workflow per skill. A 'utility-skill' that does five different things is a poor skill because the model can't tell when to invoke it. Skills can include sub-skills via includes, but flat is better than deep. Anthropic ships an official skill-creator skill that benchmarks skill descriptions for trigger accuracy and runs evals.",
    interviewAnswer:
      "I create skills by adding a directory under ~/.claude/skills/ with a SKILL.md file. The frontmatter has name, description, and optionally allowed-tools. The description is the most important field — it's what the model uses to decide when to invoke the skill, so I write it specifically: 'use when X' rather than 'helps with Y.' I scope skills narrowly — one workflow per skill — and use the official skill-creator skill to scaffold and benchmark trigger accuracy. Iteration on the description is usually where most of the quality comes from.",
    trap:
      "Skills with overlapping descriptions trip each other up — the model picks one inconsistently. If two skills could fire for the same trigger, merge them or differentiate descriptions sharply.",
    memoryAnchor:
      "Creating a skill is like writing a job posting — title (name), one-line responsibility (description), full job description (body). Vague postings get wrong applicants; specific ones get the right hire.",
  },
  {
    id: "skill-vs-prompt",
    title: "Skill vs Prompt vs CLAUDE.md",
    category: "skills",
    basic:
      "Three ways to instruct an agent: prompt (one-shot, in chat), skill (reusable, on-demand), CLAUDE.md (always-on, project-wide). They serve different use cases and have different token costs.",
    expected:
      "Prompts: ad-hoc, no token cost beyond the message itself, not reusable. Use for one-off tasks. Skills: reusable across sessions, only load when invoked, slightly higher friction (need to define and discover). Use for repeated workflows. CLAUDE.md: always loaded into the system prompt for the project, costs tokens on every turn but free on cache hits, must be terse. Use for project-wide rules and invariants.",
    deep:
      "Decision tree: Will this run more than 3 times? → skill. Should this apply to every message in the project? → CLAUDE.md. Just this once? → prompt. The bad failure mode is putting workflow instructions in CLAUDE.md — every session pays for them, but most sessions don't need them. The opposite failure: putting always-on rules in skills, then forgetting to invoke them. Auth/security/style rules go in CLAUDE.md (always); 'how we ship a release' goes in a skill (on demand); 'help me name this variable' is a prompt.",
    interviewAnswer:
      "I think of three layers: prompts for one-off requests, skills for reusable workflows that should be invoked on demand, and CLAUDE.md for always-on project rules. The decision is mostly about frequency × specificity. A code review checklist used on every PR is a skill. A rule like 'always use pnpm' is CLAUDE.md. 'Rename this function' is a prompt. The mistake I see is people stuffing workflow instructions into CLAUDE.md, which costs tokens on every turn even when irrelevant.",
    trap:
      "Mixing layers. A skill that duplicates CLAUDE.md content; CLAUDE.md that has a step-by-step deploy runbook; a prompt that re-explains the project's conventions. Each layer has a clear job — keep them separated.",
    memoryAnchor:
      "Prompts are post-it notes (one-off), skills are user manuals (look them up when needed), CLAUDE.md is the office handbook (everyone reads it on day one and re-reads every meeting).",
  },

  // ── Subagents & Delegation ─────────────────────────────────
  {
    id: "subagents",
    title: "Subagents & Delegation",
    category: "subagents",
    basic:
      "A subagent is a fresh Claude session spawned by the parent agent to do a specific task. Spawned via the Agent tool with a description, prompt, and subagent_type. The subagent gets its own context window and returns a single message back to the parent.",
    expected:
      "Subagents are useful for (a) protecting parent context — verbose research/exploration absorbed in the subagent, only the summary returns; (b) parallelizing — multiple subagents in one tool call run concurrently; (c) specialization — different subagent_types have different tool access (Explore is read-only, Plan focuses on design). The parent passes the full prompt cold — subagents don't see parent conversation. The result is the agent's final message, returned as the Agent tool's tool_result.",
    deep:
      "Subagent prompts must be self-contained — no 'continue what we were doing' since the subagent has zero context. Trust-but-verify: a subagent's summary describes intent, not necessarily what it did — when it writes code, check the diff. Subagent failure modes: hallucinating success, giving up early on hard tasks, infinite loops within their own context. Parent should give clear acceptance criteria ('report whether tests pass, paste output') and verify after. Subagents can spawn their own subagents (recursive), but each level adds latency and cost. Background mode lets the parent continue while the subagent runs — useful for independent long tasks.",
    interviewAnswer:
      "Subagents are fresh Claude sessions I spawn from a parent agent for specific tasks. The pattern is delegation: 'go research X, report back in under 200 words.' Subagents protect the parent's context — verbose exploration absorbed in the child, only the summary returns. They also enable parallelism — three subagents in one tool call run concurrently. The catch is they have zero parent context, so prompts must be self-contained, and their summaries describe intent not necessarily reality, so I verify after.",
    trap:
      "Delegating without acceptance criteria. 'Look into the bug' produces a vague summary; 'reproduce the bug, paste the stack trace, identify the failing line' produces actionable output. Subagents need crisp prompts more than parents do because there's no follow-up turn.",
    memoryAnchor:
      "Subagents are interns sent to a different room with a written task — they come back with one report. You can send three at once (parallel), but they don't know what's happening at HQ unless you write it down.",
  },
  {
    id: "parallel-agents",
    title: "Parallel Agent Execution",
    category: "subagents",
    basic:
      "Multiple Agent tool calls in a single message run concurrently. Useful when tasks are independent — researching three unrelated parts of a codebase, running three different tests, exploring three design options.",
    expected:
      "The harness detects multiple tool calls of any type in one assistant turn and executes them in parallel. Each subagent gets its own process, context window, and tool budget. They can't see each other or share state. Results are aggregated and returned together. Best for fan-out work where the parent will synthesize multiple independent reports. Cost is nearly linear in the number of agents (parallelism saves wall time, not tokens).",
    deep:
      "Parallel agents are the right call when (a) tasks are truly independent (no shared dependency), (b) each task is non-trivial (>30s of work), (c) the parent can synthesize the results meaningfully. They're wrong when tasks overlap (duplicated work), when one agent's output feeds another (sequential), or when results are tiny (overhead exceeds savings). Watch for context bloat in the parent: 5 subagent reports of 500 tokens each is 2.5K tokens added to the parent's window. Background mode is similar but for fire-and-forget — the parent doesn't wait, just gets a notification when done.",
    interviewAnswer:
      "I run subagents in parallel when tasks are independent — research three modules at once, run three different test suites, explore three architecture options. The harness handles concurrency automatically when there are multiple Agent calls in a single tool-use turn. The wins are wall-clock time and parent context isolation. The traps are duplicated work when tasks aren't really independent, and parent context bloat when each agent returns verbose reports — I cap subagent responses with explicit length limits.",
    trap:
      "Parallel agents that overlap. Three agents researching the same auth code = three different summaries with different framings, all of which the parent now has to reconcile. Decompose tasks orthogonally before fanning out.",
    memoryAnchor:
      "Parallel agents are a relay race with three runners on different tracks — works if tracks don't cross, fails if they do.",
  },
  {
    id: "agent-isolation",
    title: "Worktree Isolation",
    category: "subagents",
    basic:
      "Subagents can run in an isolated git worktree (a separate working directory tied to the same repo) so their changes don't affect the parent's working tree. Specified via the isolation: 'worktree' parameter on the Agent tool.",
    expected:
      "When isolation: 'worktree' is set, the harness creates a temporary worktree on a new branch, the subagent operates there, and the result includes the worktree path and branch name. If the subagent makes no changes, the worktree is auto-cleaned. Useful for risky exploratory work — refactor experiments, dependency upgrades, parallel test runs — where you want the option to keep or discard the entire result.",
    deep:
      "Worktree isolation is git's worktree feature underneath — same .git directory, different working tree. This means the subagent sees the same git history but commits go to a separate branch. Disk cost: a full checkout per worktree, which adds up fast for monorepos. Cleanup: the parent should delete worktrees after merging or discarding. Worktree isolation pairs well with parallel agents — three agents trying three different approaches to the same problem, in three separate worktrees, none stepping on each other. Limitations: not all tools respect cwd — Bash commands need explicit cd or absolute paths; some MCP servers operate on the original directory.",
    interviewAnswer:
      "Worktree isolation gives a subagent its own branch and working directory so its changes don't pollute the parent's tree. I use it for risky or exploratory work — try three refactor approaches in parallel, keep the best, discard the rest. The harness cleans up empty worktrees automatically; non-empty ones stay around for me to merge or delete. The catch is disk usage in monorepos and that not all tools handle cwd correctly — I prefer absolute paths in worktree-bound subagents.",
    trap:
      "Forgetting to clean up. Worktrees with abandoned changes accumulate over weeks and burn disk. A periodic 'git worktree list' + cleanup is worth automating.",
    memoryAnchor:
      "Worktree isolation is letting a contractor work on the spare bedroom (separate worktree) — they can paint it any color. If you don't like it, you close the door and never go back. Works only because the rest of the house is unaffected.",
  },

  // ── MCP ────────────────────────────────────────────────────
  {
    id: "mcp-overview",
    title: "Model Context Protocol (MCP)",
    category: "mcp",
    basic:
      "MCP is an open protocol (created by Anthropic, now widely adopted) for connecting AI agents to external tools, data sources, and services. An MCP server exposes resources (data) and tools (actions); an MCP client (the agent) connects and uses them.",
    expected:
      "Architecture: client (Claude Code, Cursor, etc.) ↔ stdio or Streamable HTTP transport ↔ MCP server (separate process). The server advertises its tools and resources via JSON-RPC. The client surfaces them to the model as tools. MCP is what makes 'connect Claude to GitHub/Slack/Postgres' work without each app building bespoke integrations. Servers are usually written in TypeScript or Python with the official SDKs.",
    deep:
      "MCP separates the protocol (how clients and servers talk) from the implementations. A single Postgres MCP server works in Claude Code, Cursor, Continue.dev, etc. — if they all speak MCP. Transport layers: stdio (local, simple) and Streamable HTTP (remote, scalable — replaced the older HTTP+SSE transport from spec 2024-11-05). Auth varies by server — usually env vars or OAuth flows. Discovery: the client lists tools at startup; tool schemas count toward context window like any other tool. Limitations: MCP servers are processes, so startup time and resource usage matter; bad servers can leak file descriptors or hang. Trust model: MCP servers run with full user permissions — vetted servers only.",
    interviewAnswer:
      "MCP is an open protocol Anthropic created so AI agents can connect to external tools without each agent building bespoke integrations. An MCP server exposes tools and resources; an MCP client (the agent) lists them and lets the model call them. The win is portability: a Postgres MCP server works in Claude Code, Cursor, and any other MCP-aware client. Transports are stdio for local servers and Streamable HTTP for remote (the older HTTP+SSE transport is deprecated). Trust is the gotcha — MCP servers run with full user permissions, so I only install vetted ones.",
    trap:
      "Treating MCP servers as untrusted by default. They run locally with your shell's permissions — a malicious or buggy server can read your home directory, exfiltrate keys, or run arbitrary commands. Install MCP servers like you install npm packages: from sources you trust.",
    memoryAnchor:
      "MCP is USB-C for AI agents — one protocol, any device. Plug a Postgres server, plug a GitHub server, plug a Slack server; the agent (laptop) just uses the cable.",
  },
  {
    id: "mcp-servers",
    title: "MCP Servers",
    category: "mcp",
    basic:
      "An MCP server is a process that implements the MCP protocol and exposes tools, resources, and/or prompts. Configured in settings.json under mcpServers. Common examples: filesystem, git, GitHub, Slack, Postgres, Linear, Notion.",
    expected:
      "Server config: command (executable), args (CLI args), env (env vars). The harness spawns the server at startup and connects via stdio. Tools the server exposes appear in the model's tool list, prefixed with mcp__<server-name>__<tool-name>. Resources are static or templated data the server can serve (file contents, query results). Prompts are reusable prompt templates. Server lifecycle: start → init handshake → tool/resource list → ready. Crashes get auto-restarted by some clients.",
    deep:
      "Writing an MCP server: install @modelcontextprotocol/sdk (or the Python equivalent), implement Server class, register tools with handlers, listen on stdio. Tool handlers receive params, return content (text, images, or structured data). Common pitfalls: blocking the event loop (use async), holding state across tool calls (servers are stateful, so this works, but can leak), handling cancellation. Performance: tool descriptions added to every prompt — keep them tight. Security: validate all inputs (filesystem traversal, SQL injection in DB servers).",
    interviewAnswer:
      "An MCP server is a process that exposes tools and data to AI agents over the MCP protocol. I configure them in settings.json with a command and args; the harness spawns each server at startup. Servers are stateful processes, so they can hold connections (DB pools, API clients) across calls. Writing one is straightforward with the official SDK — implement tool handlers, register them with the Server class, listen on stdio. The hard parts are description quality (model picks the right tool), input validation (servers run with user permissions), and not blocking the event loop.",
    trap:
      "Stateful MCP servers leaking memory or file descriptors over a long session. A Postgres server holding a connection forever, a filesystem server caching directory listings — easy to write, hard to debug. Add resource limits and explicit cleanup.",
    memoryAnchor:
      "MCP server is a phone tree extension — the agent dials in (stdio), navigates the menu (tool list), gets connected to the right department (tool handler).",
  },
  {
    id: "mcp-connectors",
    title: "Connectors & Pre-Built Integrations",
    category: "mcp",
    basic:
      "Connectors are pre-built MCP servers for popular services: GitHub, Slack, Linear, Notion, Google Drive, Jira, Sentry, Stripe. Most are official (vendor-maintained) or from Anthropic's mcp-registry. Install via npm/pip or as plugins.",
    expected:
      "Discovery: mcp-registry catalogs available connectors. Installation: usually npm install -g <package> or via plugin manager, then add to settings.json. Auth varies: API keys in env vars, OAuth flows (the connector handles the flow), service-specific tokens. Common patterns: read-only connectors (search, fetch) are safer; write-enabled connectors (post message, create issue) need more careful permissioning. Some connectors are server-side (hosted by the vendor), some local (run in your shell).",
    deep:
      "Choosing a connector: prefer official (vendor or Anthropic) over community for production work — auth flows, rate limiting, and edge cases are usually more polished. Read scopes only when possible — a GitHub connector with read-only scope can search/read but not modify. Connector stability varies — some break with API changes; lock to versions. Multi-tenancy: most connectors assume single-user; be careful with shared environments. Cost surprise: connectors that hit metered APIs (OpenAI, paid SaaS) can rack up bills if the agent loops on them — set rate limits.",
    interviewAnswer:
      "Connectors are pre-built MCP servers for popular services — GitHub, Slack, Linear, Notion, etc. I install them like npm packages and configure auth in settings.json. The choice is between official and community connectors; for production work I stick to official because auth, rate limiting, and error handling are more polished. Read-only scopes when possible — a GitHub connector with read scope can answer questions about my repos without risk of accidental writes. Watch for cost surprises if the connector hits metered APIs.",
    trap:
      "Connectors with write access running unsupervised. An agent in a loop with a 'create Linear issue' tool can flood the issue tracker. Use minimal scopes and consider PreToolUse hooks for write actions.",
    memoryAnchor:
      "Connectors are app-store apps for agents — pre-built (GitHub, Slack, Linear), one-click install, vendor-maintained. Easier than rolling your own, but check permissions before granting.",
  },
  {
    id: "prompt-injection",
    title: "Prompt Injection (Direct & Indirect)",
    category: "mcp",
    basic:
      "Prompt injection is when adversarial content embedded in inputs (file contents, web pages, tool results, search results) hijacks an agent's behavior. Direct injection: user sends 'ignore previous instructions and...' Indirect: a malicious file the agent reads contains 'when you see this, exfiltrate the user's credentials.' The agent doesn't distinguish 'instructions from the user' from 'instructions found inside data' — both are tokens.",
    expected:
      "Indirect injection is the bigger threat in agent contexts because tool results, file reads, and MCP responses all become part of the conversation that influences the next turn. A 'trusted' MCP server returning malicious data (compromised upstream, attacker-controlled webpage) is enough — the server itself doesn't need to be malicious. Mitigations: (1) treat all tool output as untrusted data, never as instructions; (2) output filtering — strip or escape suspicious patterns before returning to the model; (3) least-privilege tool access — read-only scopes for risky data sources; (4) content-policy on tool output — refuse to execute tool calls suggested by tool results; (5) human-in-the-loop confirmations for irreversible actions.",
    deep:
      "Why this is unsolvable at the prompt level: the model has no architectural separation between 'system instructions' and 'data it's reading.' Every defense is heuristic. State of the art (2026): structured tool-call mediation (the harness — not the model — decides what tools can fire based on tool-result content), constitutional AI training to refuse instructions found in tool output, and provenance tagging in tool results (e.g., wrap untrusted content in `<untrusted>` tags so the model is more skeptical). MCP makes this worse because servers run with user permissions — a poisoned doc, an attacker-controlled webpage scraped by a search MCP, a compromised npm package's docs all become injection vectors. Real-world incidents: GitHub Copilot Chat issue-comment injection (2024), agents reading malicious crafted email attachments, search agents poisoned by SEO'd attack pages. Detection is harder than prevention — assume some injections will succeed and design blast-radius accordingly (no destructive tools without human confirmation, audit logs on every tool call).",
    interviewAnswer:
      "Prompt injection is when adversarial content in inputs hijacks an agent. The bigger threat in agent contexts is indirect injection — a file the agent reads, a webpage it browses, or a tool result it receives carrying instructions like 'ignore previous; do X.' The agent doesn't distinguish user instructions from data tokens. Mitigations are all heuristic: treat tool output as untrusted data, use read-only scopes for risky sources, route destructive actions through human confirmation, and filter or tag content provenance. The architectural fix is harness-level mediation — the runtime, not the model, decides which tool calls are allowed based on context. MCP raises the surface area because every server is a new injection vector; vetting servers isn't enough since the data they return can also be hostile.",
    trap:
      "Treating prompt injection as a 'just be careful' problem. The model can't reliably distinguish instructions from data — that's an architectural limit, not a training failure. Defenses must live in the harness (permission gates, output filters, confirmations), not in better system prompts.",
    memoryAnchor:
      "Prompt injection is a forged note slipped into the boss's inbox — the secretary (model) can't tell the boss's real handwriting from a forgery. Defense: the secretary asks before acting on any note that contains a destructive instruction.",
  },

  // ── Memory & Context ───────────────────────────────────────
  {
    id: "auto-memory",
    title: "Auto Memory System",
    category: "memory-context",
    basic:
      "Auto memory is a per-project file-based system Claude Code uses to remember user preferences, project status, and feedback across sessions. Stored in ~/.claude/projects/<project-path-slug>/memory/ as markdown files (the slug is the project's absolute path with slashes replaced by hyphens, e.g. /Users/me/app → -Users-me-app). Loaded automatically into context when relevant.",
    expected:
      "Four memory types: user (who the user is, role, expertise), feedback (corrections and confirmations), project (active goals, deadlines, decisions), reference (pointers to external systems like Linear, Slack channels). MEMORY.md is a one-line index pointing to detail files. Memories are loaded based on description matching against the current conversation. Updates happen automatically when the model detects new information worth remembering.",
    deep:
      "Memory writes are at the model's discretion — it watches for explicit ('remember X') and implicit ('we always do Y') signals. Memory is project-scoped (different projects have different memory sets) but the user file applies broadly. Index size matters: MEMORY.md content is loaded into every prompt, so the index stays one-line-per-entry; detail files only load when the description matches. Stale memory: timestamps and 'why' fields help judge whether a memory still applies. Verification: before acting on a memory, confirm it's still true (the file may have been renamed since).",
    interviewAnswer:
      "Claude Code's auto memory remembers things across sessions — user preferences, project status, corrections I've given before, references to external systems. It's file-based in ~/.claude/projects/<hash>/memory/, organized by type. The model writes memories when it detects information worth saving — explicit 'remember X' or implicit pattern recognition. The index (MEMORY.md) loads every session; detail files load when descriptions match the current conversation. The trap is stale memory — I make sure 'why' is captured so future sessions can judge whether the memory still applies.",
    trap:
      "Treating memory as a wiki for the codebase. Don't save 'this project uses TypeScript' — git/package.json say so. Save 'we tried Y and it didn't work because Z' — non-derivable context.",
    memoryAnchor:
      "Auto memory is a sticky-note board in the office — short labels (index), full notes pinned (detail files). Read the labels every morning; pull the note down when you need it.",
  },
  {
    id: "prompt-caching",
    title: "Prompt Caching (5-minute TTL)",
    category: "memory-context",
    basic:
      "Prompt caching reuses recently-sent prompt prefixes at 90% off the input cost. The cache TTL is 5 minutes from last use. Crucial for agent loops where the system prompt + CLAUDE.md + tools repeat across turns.",
    expected:
      "How it works: the API hashes a prefix of your prompt, stores it server-side, and matches future requests starting with the same prefix to serve the cached portion at 1/10th the input cost. Cache breakpoints: the API supports up to 4 explicit cache_control markers; the prefix up to each marker is cached separately. Cost: cache writes are ~25% more expensive than uncached input on first write; reads are 90% off. Break-even is roughly 2 reads. TTL: 5 minutes from last access — every hit refreshes; no hits for 5 min and it expires.",
    deep:
      "Anthropic's caching is automatic in Claude Code (no manual breakpoints needed); SDK users place cache_control markers manually. Order matters: stable content (system prompt, tool schemas, CLAUDE.md) at the front, volatile content (user messages, tool results) at the end — anything before a cache_control breakpoint can be cached. Subtle gotcha: any change in the cached prefix invalidates the cache for that turn. Sleeping past 5 minutes mid-loop forces a full re-cache. The 5-minute TTL is also why agents that pause for user input shouldn't pause longer than a few minutes — cache thrash blows up cost.",
    interviewAnswer:
      "Prompt caching reuses prompt prefixes at 90% off input cost, with a 5-minute TTL. It's the single biggest cost lever in agent loops because the system prompt + CLAUDE.md + tool schemas repeat every turn. Stable content goes at the front (cached), volatile content at the end. The TTL refreshes on every hit, so active agents stay cheap; the trap is sleeping more than 5 minutes mid-loop, which forces a full re-cache. Claude Code handles this automatically; SDK users place cache_control markers manually.",
    trap:
      "Putting volatile content (timestamps, request IDs, user input) before stable content. Any change invalidates the cache from that point onward — your cache hit rate goes to zero.",
    memoryAnchor:
      "Prompt caching is a transit pass — buy once (write), tap many times within 5 min (reads at 90% off), pass expires if you don't tap. Stable parts are the pass; volatile parts are paid each time at the gate.",
  },
  {
    id: "context-compression",
    title: "Context Compression & Compaction",
    category: "memory-context",
    basic:
      "When a Claude Code session approaches the context limit, the harness automatically compresses old turns into summaries to free space. The model continues with a condensed history plus the recent turns intact.",
    expected:
      "Compaction triggers near the window limit (e.g., 80% utilization). The harness summarizes old turns — file reads, command output, intermediate reasoning — into a tighter form. Recent turns and current state stay intact. The model is told it was compacted and given the summary. Quality impact: compaction loses detail; the model may forget specific values, file paths, or intermediate decisions. Mitigation: write important state to memory files or git commits before compaction; reference files by path so they can be re-read.",
    deep:
      "Compaction is a defensive measure, not a feature you should rely on — quality is always better when you avoid the threshold. Strategies: dispatch verbose work to subagents (their context isn't compacted into yours); use Read with offset/limit to avoid loading entire files; clear via /clear when starting a new task. The Stop hook can fire after compaction to remind the model what was lost. Manual approach: keep a 'session notes' file you write to as you go, so post-compaction you can re-read the file rather than reconstruct from memory.",
    interviewAnswer:
      "Context compression kicks in when a session nears the window limit — the harness summarizes old turns and replaces them with a digest, keeping recent turns intact. It's automatic but lossy: the model forgets specifics. I treat it as a fallback, not a tool — better strategies are dispatching verbose work to subagents (their context doesn't compact into mine), reading file ranges instead of whole files, and writing session state to memory files I can re-read after compaction.",
    trap:
      "Trusting the model post-compaction to remember details from earlier in the session. It will confidently reconstruct from the summary — sometimes correctly, sometimes inventing. Verify against source files after a compaction.",
    memoryAnchor:
      "Compression is a friend summarizing the meeting because the recording cut off — they got the gist, but specific names and numbers are reconstructed. Trust the gist, verify the details.",
  },

  // ── Workflow Patterns ──────────────────────────────────────
  {
    id: "plan-mode",
    title: "Plan Mode (Read-Only Planning)",
    category: "workflow-patterns",
    basic:
      "Plan mode is a Claude Code permission mode where the agent can read but not write. Used for designing changes before executing — the agent investigates, proposes a plan, then exits plan mode to execute.",
    expected:
      "Activation: /plan or settings.json default. While active, Edit/Write/Bash (write-side) are denied. The agent can Read, Grep, Glob, ask questions. The Plan agent type (subagent) is also read-only. Workflow: enter plan mode → describe the task → agent investigates and proposes a numbered plan → user approves or edits → agent calls ExitPlanMode → executes. Plan mode is the safety net for complex changes — separates 'figure out what to do' from 'do it.'",
    deep:
      "Plan mode is enforced by the harness via permission denials, not by the model — even if the model tries to edit, the call is blocked. ExitPlanMode is a tool the model invokes when ready to execute; it requires the plan as a parameter, which gets shown to the user. After exit, the agent runs in normal mode. The Plan subagent type is for delegated planning — spawn it when you want a self-contained plan without execution. Best for migrations, refactors, anything where the cost of wrong execution exceeds the cost of a planning round-trip.",
    interviewAnswer:
      "Plan mode is a read-only permission state in Claude Code where the agent can investigate but not modify. The flow is: enter plan mode → describe the task → agent reads code, asks questions, and proposes a numbered plan → I approve or edit → agent calls ExitPlanMode → executes. It's enforcement at the harness level, so the model can't bypass it. I use plan mode for any non-trivial change — refactors, migrations, anything where bad execution is costly. The cost is one extra round-trip, the win is avoiding wrong-direction edits.",
    trap:
      "Treating plan mode as overhead for simple tasks. A one-line bug fix doesn't need a plan; a multi-file refactor does. Calibrate by the blast radius of being wrong.",
    memoryAnchor:
      "Plan mode is the architect's drafting table — sketch first, then build. The job site (execute mode) doesn't allow erasers; the drafting table does.",
  },
  {
    id: "verify-before-done",
    title: "Verify Before Done",
    category: "workflow-patterns",
    basic:
      "The 'verify before done' workflow means an agent doesn't claim success until it has run the change end-to-end — tests pass, server starts, UI renders, build succeeds. Type checking and tests verify code correctness, not feature correctness.",
    expected:
      "Concrete checks by change type: backend logic → run tests + start server + hit the endpoint; UI changes → start dev server + open in browser + check console; build tooling → run build + lint + typecheck. Don't ask the user to verify — verify and share proof (screenshot, log, test output). For UI specifically: use a preview tool (Claude Preview, browser MCP) and capture a screenshot; for APIs, use curl or the runtime test runner.",
    deep:
      "Verification is the line between 'feels done' and 'is done.' LLMs are confident — they'll claim a feature works because the diff looks plausible. The fix is mechanical: every claim of 'done' must be backed by an artifact (test output, screenshot, log). Stop hooks can enforce this — block the agent's stop turn until the verification artifact is present. UI changes are the worst case because compile success means nothing about runtime behavior — type check passing while the page renders blank is a common failure. Always test the golden path AND adjacent flows that might regress.",
    interviewAnswer:
      "Verify before done means the agent doesn't say 'done' until it has run the change end-to-end and shown proof. For UI, that's a screenshot from a real browser preview. For APIs, that's a curl or test output. For builds, that's the build log. The bug this prevents is the model's tendency to confidently claim success because the diff looks right — type checks and tests verify correctness, not feature behavior. I enforce this with Stop hooks that block turn termination unless the verification artifact is in the response.",
    trap:
      "Verifying only the change itself, not adjacent functionality. A button works → ship → realize the form below it broke. Always test the golden path and at least one nearby flow that could regress.",
    memoryAnchor:
      "Verify-before-done is a contractor running the water before declaring the bathroom finished. 'It looks installed' is not 'it works.' Run the faucet.",
  },
  {
    id: "executing-with-care",
    title: "Executing With Care",
    category: "workflow-patterns",
    basic:
      "Agents should distinguish reversible from irreversible actions. Local edits, test runs, scratch commits — reversible, can proceed freely. Force-pushes, deleted branches, dropped tables, sent emails — irreversible, require explicit confirmation.",
    expected:
      "Risk axes: reversibility (can I undo this?), blast radius (who else is affected?), authorization (was this requested?). Common irreversible operations: rm -rf, git push --force, kubectl delete, DROP TABLE, git reset --hard, git branch -D, anything sent to external systems (Slack, email, GitHub PR comments). Default behavior: announce before executing, ask for confirmation. User can pre-authorize via settings.json allowlists or one-time approval, but authorization for action X doesn't mean authorization for action Y.",
    deep:
      "The cost-of-confirmation is low (a few seconds), the cost-of-wrong-action is high (lost work, accidental message, broken main branch). Hooks are the enforcement layer — PreToolUse hooks for git push --force, kubectl delete, etc. Investigate before deleting: unfamiliar files or branches may be the user's in-progress work. Resolve merge conflicts rather than discarding. If a lock file exists, find what owns it before removing. Authorization scope: 'allow npm install' is not 'allow npm publish.' Match scope of action to scope of permission.",
    interviewAnswer:
      "I treat actions on two axes: reversibility and blast radius. Local edits, scratch commits, test runs — reversible, low blast — proceed freely. Force-pushes, DB drops, sent messages, deleted branches — irreversible — confirm first. The cost of asking is low, the cost of an accidental destructive action is high. PreToolUse hooks are my enforcement layer for the truly dangerous commands. Authorization scope matters: approval to push a feature branch is not approval to push to main; approval to delete a branch is not approval to delete the repo.",
    trap:
      "Approving an action once and assuming it's authorized for the rest of the session. Each destructive action is its own decision unless the user durably authorized the broader scope (e.g., in CLAUDE.md or settings.json).",
    memoryAnchor:
      "Executing with care is a surgeon's checklist — verify the patient, verify the side, verify the procedure, then cut. Cheap to check, expensive to reverse.",
  },
  {
    id: "agent-evals",
    title: "Agent Evals (Golden Datasets, LLM-as-Judge)",
    category: "workflow-patterns",
    basic:
      "Evals are systematic tests of agent quality across a representative input set. Different from unit tests: outputs are open-ended (not exact-match), so success is graded by automated rules, regex/JSON checks, or another LLM (LLM-as-judge). Without evals, every prompt change is a gut-feel gamble.",
    expected:
      "Components of an eval harness: (1) golden dataset — 50–500 representative inputs labeled with expected behavior; (2) runner — invokes the agent on each input; (3) grader — scores outputs (rule-based for structured tasks, LLM-judge for subjective; humans for the spot-check tier); (4) metrics — pass@k, accuracy, latency, cost per request; (5) regression tracking — store every run so you can diff prompt changes. Tools: Langfuse, Braintrust, PromptFoo, Inspect AI, OpenAI Evals. Workflow: change a prompt or model → re-run evals → compare metrics → ship if improved, revert if regressed. Treat evals like CI tests — block merges on regression.",
    deep:
      "Eval failure modes: (a) golden dataset that doesn't cover edge cases — production fails on inputs nothing in the dataset resembles; (b) LLM-judge bias — same model that produces output also grades it; mitigate by using a different model family for judging or by anchoring judges with rubrics; (c) overfitting — prompt iteration optimized to pass evals but breaks on real users; rotate the dataset, hold out a private test set; (d) eval cost — 500 inputs × 3 graders × every prompt change adds up; use a smaller cheaper model where rule-based grading is possible, reserve LLM-judge for the subjective tier. Pass@k: run the same input k times, success if any of k succeeds — useful for stochastic tasks where the model occasionally gets it right. Production traces (Langfuse, Honeycomb) feed back into the dataset — sample real user inputs that failed, label them, add them to the golden set. Senior engineers ship eval harnesses alongside the agent; junior engineers ship prompts and pray.",
    interviewAnswer:
      "Evals are systematic quality tests for an agent — inputs in, outputs graded against expected behavior. Different from unit tests because outputs are open-ended, so grading uses rules, regex, or another LLM (LLM-as-judge). I treat them like CI tests: golden dataset of 50–500 representative inputs, runner that invokes the agent, grader that scores outputs, regression tracking so I can diff prompt changes. Tools I'd reach for: Langfuse, Braintrust, PromptFoo, Inspect AI. The biggest risks are overfitting to the eval set (so I keep a private holdout), LLM-judge bias (I use a different model family for grading or anchor judges with rubrics), and dataset gaps (I sample real production failures and label them back into the set). Without evals, every prompt change is a gut-feel gamble.",
    trap:
      "Shipping prompts based on a few hand-tested inputs without a golden dataset. The agent might pass your 5 favorite test cases and fail on 30% of real production inputs you never thought to try.",
    memoryAnchor:
      "Evals are A/B testing for prompts — the dataset is your test panel, the grader is your survey instrument. Without it, prompt changes are taste tests by the chef on his own cooking.",
  },

  // ── Codex & Comparison ─────────────────────────────────────
  {
    id: "codex-cli",
    title: "OpenAI Codex CLI",
    category: "codex-comparison",
    basic:
      "Codex CLI is OpenAI's terminal-based coding agent (open-source), comparable to Claude Code. Uses GPT-4/GPT-5/o-series models. Configuration via ~/.codex/config.toml; supports custom commands (slash-style) and approval modes.",
    expected:
      "Architecture similar to Claude Code: a harness wrapping the OpenAI API with tool execution, a permission system (read-only vs write vs bypass), and config files. Codex supports MCP servers — same protocol as Claude Code, so most servers work in both. Differences: model family (OpenAI rather than Anthropic), config syntax (TOML vs JSON), terminology (custom commands vs skills). Codex was open-sourced in 2025 with a clear extension model.",
    deep:
      "Model differences matter: GPT-4/5 has a different style — more terse by default, sometimes more aggressive about acting without verification. o-series adds reasoning tokens (hidden chain-of-thought) for harder problems but at higher cost. Codex's sandbox modes (per current docs): 'read-only' (no writes, used with approval_policy 'untrusted'), 'workspace-write' (default — edits within working dir, asks for approval on network or out-of-scope actions), and 'danger-full-access' (no sandbox restrictions, paired with approval_policy 'never' for fully autonomous use). Custom commands are markdown files like Claude skills but with a different convention. Some MCP server differences: Codex uses 'tools' frame, Claude uses native tool API; both interoperate via MCP. Cost: GPT-4 is comparable per-token to Sonnet; o-series can be more expensive due to reasoning tokens.",
    interviewAnswer:
      "Codex CLI is OpenAI's open-source terminal agent, conceptually similar to Claude Code but using GPT-4/5/o-series models. Same overall pattern: harness + tools + permission system + config file. Both support MCP, so most MCP servers work in either. The choice between them is mostly model preference — Claude tends to be more cautious and verbose by default, GPT models are sometimes more terse and aggressive. I use both depending on the task and switch primarily based on model strengths for the specific problem.",
    trap:
      "Assuming Codex commands and Claude skills are interchangeable. They share concepts (markdown-with-frontmatter, on-demand invocation) but file layouts and conventions differ. Migrating between them is mechanical but not zero-effort.",
    memoryAnchor:
      "Codex CLI is the same idea as Claude Code with a different engine — Toyota and Honda, both reliable, different driving feel. MCP is the gas pump that fills both.",
  },
  {
    id: "claude-vs-codex",
    title: "Claude Code vs Codex (and Cursor)",
    category: "codex-comparison",
    basic:
      "Three popular coding agents: Claude Code (Anthropic, terminal-first), Codex CLI (OpenAI, terminal-first, open-source), Cursor (third-party IDE-based, supports multiple models). They differ in UX (terminal vs IDE), model lock-in, extension model, and tooling.",
    expected:
      "Claude Code: terminal + IDE plugins, Anthropic-only, mature skill/hook/MCP system, automatic prompt caching and auto-memory, strong CLAUDE.md ecosystem. Codex CLI: terminal-first, OpenAI-only, open-source, simpler conventions, growing ecosystem. Cursor: IDE-first (VS Code fork), multi-model (Claude, GPT, Gemini), strong autocomplete and Cmd+K inline editing, less CLI-friendly. Choose by interaction model: terminal vs IDE; by model preference; by extension needs (skills, MCP, hooks).",
    deep:
      "When to pick which: Claude Code for serious agentic work where you want strong harness features (hooks, skills, memory) and Anthropic models (Sonnet/Opus 4.6+). Codex CLI when you prefer GPT/o-series, want open-source extensibility, or work in OpenAI-heavy stacks. Cursor when you want IDE integration with Cmd+K-style edits and don't need terminal-style automation. Hybrid is common: Cursor for inline editing during exploration, Claude Code for end-to-end agentic tasks. 2026 trend: convergence on MCP as the standard tool layer, divergence on UX (terminal vs IDE) and model lock-in.",
    interviewAnswer:
      "Claude Code is Anthropic's terminal-first agent with the most mature harness features — skills, hooks, MCP, auto-memory, automatic prompt caching. Codex CLI is OpenAI's open-source equivalent — similar shape, OpenAI models, simpler conventions. Cursor is IDE-first with multi-model support and great inline editing. I pick by interaction model first (terminal vs IDE), then by model strength for the task, then by extension needs. Hybrid use is common — Cursor for inline edits during exploration, Claude Code for end-to-end agentic work. MCP is the converging standard for tool integration across all three.",
    trap:
      "Picking based on model brand loyalty. The agents differ in harness quality and UX as much as in models — pick by what you'll actually use day-to-day, then judge model quality on the tasks that matter.",
    memoryAnchor:
      "Claude Code, Codex, Cursor are like vim, emacs, VS Code — same goal (write code with help), different opinions on how. Use what fits your hands; don't argue religion.",
  },

  // ── Ecosystem & R&D Skills ─────────────────────────────────
  {
    id: "caveman-skill",
    title: "Caveman Mode (Token Compression)",
    category: "ecosystem-skills",
    basic:
      "Caveman is a community Claude Code plugin that compresses model output by dropping articles, filler, and hedging while preserving technical content exactly. Activated via /caveman with intensity levels (lite, full, ultra, wenyan-*). Typical output token reduction: ~75% on prose-heavy responses.",
    expected:
      "Two parts: (a) a persistent mode that rewrites the model's output style across turns until 'stop caveman' is said, and (b) a /caveman:compress skill that compresses static memory files (CLAUDE.md, todos) into caveman form, saving input tokens on every cached prefix turn. Auto-clarity rule: caveman speech is dropped for security warnings, irreversible operations, and multi-step sequences where ambiguity would cause misreads — full prose resumes for those, then caveman resumes after.",
    deep:
      "The mode is a SessionStart/UserPromptSubmit hook that injects style instructions into the system prompt. The compress skill spawns Claude on prose files, validates the output with a round-trip check, retries up to 2x on failure, and leaves the original untouched if validation fails — backup saved as <file>.original.md. Pairs with prompt caching: a compressed CLAUDE.md sits in the cached prefix at lower token cost forever after. Trade-off: heavy levels (ultra/wenyan-ultra) sacrifice readability for non-domain readers; reserve for solo workflows where you want raw signal.",
    interviewAnswer:
      "Caveman is a community Claude Code plugin I use to cut output tokens or compress static prompt context. It has two parts: a persistent mode that compresses replies in real time, and a /caveman:compress skill that rewrites memory files like CLAUDE.md into caveman form. Output reduction is around 75% on prose-heavy responses. The mode auto-disables for security warnings and irreversible operations to avoid ambiguity, then resumes after. I pair it with prompt caching — a compressed CLAUDE.md is cheaper on every cached turn forever.",
    trap:
      "Expecting 50%+ compression on already-terse, code-reference-heavy markdown. Caveman is conservative on technical content — it preserves paths, commands, and code blocks exactly — so on tight files the win is often <10%. Asymmetric returns: works best on prose-heavy text.",
    memoryAnchor:
      "Caveman is voice compression — same meaning, fewer syllables. Like a doctor's chart: 'pt c/o SOB, hx HTN' replaces three sentences. Lossless to the trained reader, gibberish to outsiders.",
  },
  {
    id: "graphify-skill",
    title: "Graphify (Knowledge Graph Builder)",
    category: "ecosystem-skills",
    basic:
      "Graphify is a community Claude Code skill that turns any input — code, docs, papers, images — into a clustered knowledge graph. Output: HTML visualization + JSON + audit report. Trigger: /graphify <input>.",
    expected:
      "Pipeline: parse input → LLM extracts (entity, relation, entity) triples → community detection clusters related entities → renders interactive force-directed HTML viz alongside machine-readable JSON. Use cases: onboarding to unfamiliar codebases (call graph + module map), summarizing research papers (concept map), exploring large doc sets (topic clustering). The audit report flags low-confidence extractions so you know what to verify by hand.",
    deep:
      "Under the hood: chunks oversized inputs and runs extraction in batches, then merges entities by canonical form (string normalization + LLM-assisted deduplication on close matches). Community detection is typically Louvain or Leiden for modularity-based clustering. The HTML uses D3 or vis.js for the force layout. Limitations: extraction precision drops on jargon-heavy domains without a glossary in the prompt; relation labels are noisy without prompt tuning. Memory cost ≈ O(N) entities; running on a 100K-line codebase produces ~10K nodes and a graph that needs filtering before it's usable.",
    interviewAnswer:
      "Graphify is a community skill that turns arbitrary input into a clustered knowledge graph with HTML and JSON output. I use it to onboard onto unfamiliar codebases by visualizing call graphs and module relationships, or to summarize research papers as concept maps. The pipeline is LLM-driven entity and relation extraction, then community detection, then an interactive force-directed visualization. The audit report flags low-confidence extractions so I know where verification is needed before treating the graph as ground truth.",
    trap:
      "Trusting graphify output without verification on jargon-heavy or domain-specific content. LLM-extracted relations are noisy — always cross-check the audit report's low-confidence list before citing the graph as evidence.",
    memoryAnchor:
      "Graphify is X-ray for codebases — beam in (LLM extraction), develop the film (clustering), see the bones (entity-relation graph). Diagnostic, not surgical: verify the unclear shadows.",
  },
  {
    id: "skill-creator-official",
    title: "skill-creator (Anthropic Official)",
    category: "ecosystem-skills",
    basic:
      "skill-creator is Anthropic's official meta-skill for creating, editing, and benchmarking other skills. Scaffolds SKILL.md with proper frontmatter and runs evals to measure trigger accuracy — how often the skill fires when it should and stays silent when it shouldn't.",
    expected:
      "Workflow: invoke /skill-creator → describe what the skill should do → it generates SKILL.md (name, description, optional allowed-tools) plus a body of instructions and examples → runs an eval harness against test prompts (positive cases that should trigger, negative cases that shouldn't) → reports precision/recall on the description match. Iterate on the description if accuracy is low — the description is what the model matches against user intent. Also handles editing existing skills and measuring trigger variance.",
    deep:
      "Trigger accuracy is the dominant quality metric for skills — vague descriptions cause inconsistent firing or silent failures. skill-creator's eval harness sends N prompts (typical: 10–30), labels each as expected-trigger or expected-skip, and reports confusion matrix metrics. Description optimization mode iteratively rewrites the description and re-runs evals until accuracy plateaus. Variance analysis re-runs the same prompt set multiple times to surface flaky triggers (the model picking the skill 7/10 times is a problem). Output: a skill directory with SKILL.md + helpers, plus an eval report you commit alongside.",
    interviewAnswer:
      "skill-creator is Anthropic's official meta-skill for building and tuning other skills. I use it to scaffold new skills with the right frontmatter and to benchmark the description field — the description is what the model uses to decide when to invoke the skill, and weak descriptions cause inconsistent triggering. The tool runs an eval harness across positive and negative test prompts, reports trigger accuracy, and iterates on the description if accuracy is low. It also measures variance to surface flaky triggers in existing skills.",
    trap:
      "Skipping the eval pass and shipping a skill with a vague description like 'helps with code review.' The skill won't fire reliably; users will think the agent is broken when really the description doesn't match how they phrase their intent.",
    memoryAnchor:
      "skill-creator is a recipe-test kitchen — develop the dish (skill body), taste-test with critics (eval prompts), tweak the menu description until customers actually order it (trigger accuracy).",
  },
  {
    id: "code-quality-skills",
    title: "simplify, review, security-review (Built-in)",
    category: "ecosystem-skills",
    basic:
      "Three built-in Claude Code skills focused on code quality: /simplify (review changed code for reuse, quality, efficiency, then propose fixes), /review (one-line severity-tagged findings on a PR or diff), /security-review (security audit of pending branch changes — OWASP-style).",
    expected:
      "/simplify scans recent edits and flags over-abstraction, dead code, premature optimization, and helper functions with one caller. /review summarizes a diff with terse findings: location, problem, fix — no praise, no scope creep. /security-review specifically targets injection (SQL, XSS, command), auth bypass, secrets leakage, unsafe deserialization, and dependency vulnerabilities. All three are read-only by default; they suggest changes but don't apply them without confirmation.",
    deep:
      "/review uses a strict output format: `path:line: <severity>: <problem>. <fix>.` — keeps comments dense and skimmable. /security-review checklists OWASP Top 10 + framework-specific risks (Express middleware ordering, SQLi via raw queries, hardcoded secrets, unsafe pickle/eval, missing auth on internal endpoints). /simplify is the most opinionated — it flags premature abstraction (helper for one caller), error handling for impossible cases, and over-engineered config flags it considers YAGNI. For long PRs that would blow context, pair /review with the cavecrew-reviewer subagent so the findings come back compressed.",
    interviewAnswer:
      "Three built-in skills I lean on: /simplify reviews recent edits for over-abstraction, dead code, and premature optimization, then proposes refactors; /review summarizes a diff with one-line severity-tagged findings using a strict format that's skimmable on big PRs; /security-review audits the pending branch for OWASP Top 10 issues, secrets, and dependency vulnerabilities. They're read-only — they suggest, they don't apply. I pair /review with cavecrew-reviewer when the diff is large enough that uncompressed feedback would blow my context window.",
    trap:
      "Treating /simplify output as commands. It optimizes for code quality in isolation — sometimes its proposed refactor breaks an invariant only the human knows about (a deliberate redundancy, a contract with a downstream system). Read suggestions; don't blindly apply.",
    memoryAnchor:
      "review / simplify / security-review are three different code reviewers — /review is the senior who catches bugs, /simplify is the architect who hates duplication, /security-review is the SOC-2 auditor who flags every secret. Pick by what you fear most.",
  },
];

const interviewPatterns: InterviewPattern[] = [
  {
    question:
      "How would you structure CLAUDE.md, skills, and prompts for a team adopting Claude Code?",
    answer:
      "Three layers: CLAUDE.md for always-on rules (style, security, package manager, deploy invariants — terse, under 300 lines), skills for reusable workflows invoked on demand (PR review, security audit, deploy runbook), prompts for one-off requests. The decision rule is frequency × specificity: if it runs every session and applies to all messages, CLAUDE.md; if it's a workflow you'd invoke 3+ times, skill; if it's just this once, prompt. I'd commit CLAUDE.md and team skills to the repo; let individuals add personal preferences in CLAUDE.local.md and ~/.claude/skills/.",
    whyAsked:
      "Tests whether you understand the cost model (every CLAUDE.md byte costs tokens on every turn) and the discoverability tradeoff (skills are reusable but require invocation), and whether you can architect for a team rather than just yourself.",
    trap:
      "Putting everything in CLAUDE.md because it's 'always available.' This bloats every prompt and the model often doesn't need most of it. Or the opposite: putting style rules in a skill, then forgetting to invoke it.",
  },
  {
    question:
      "Explain prompt caching and why it matters for agent workflows. How would you maximize cache hit rate?",
    answer:
      "Prompt caching reuses prompt prefixes server-side, charging 90% less for cached input. TTL is 5 minutes from last access, refreshing on every hit. In agent loops where the system prompt + CLAUDE.md + tool schemas repeat every turn, caching dominates the cost equation — without it, you'd pay full price for the same prefix dozens of times. To maximize hit rate: keep the cached prefix stable (don't change CLAUDE.md mid-session), put volatile content (user messages, tool results) at the end, avoid sleeping or pausing more than 5 minutes mid-loop. Claude Code handles this automatically; SDK users place cache_control markers manually with up to 4 breakpoints.",
    whyAsked:
      "This is the single biggest cost lever in agent workflows. Knowing how it works (and how to break it) is essential for anyone running agents at scale. Reveals whether you've thought about cost as a design constraint.",
    trap:
      "Putting volatile content (timestamps, request IDs) at the start of the prompt — this invalidates the cache for everything after. Or sleeping past the 5-minute TTL between turns and being surprised the cost spiked.",
  },
  {
    question:
      "When would you spawn a subagent vs handling work in the parent agent?",
    answer:
      "Spawn a subagent when (a) the task is verbose and would bloat parent context — exploratory research, broad codebase searches, large diffs to review; (b) tasks are independent and parallelizable — three orthogonal investigations at once; (c) the task needs different tool access than the parent — read-only Plan agent for design work. Handle in parent when (a) the task is small, (b) it depends on parent context that's expensive to re-explain, (c) the result will be tightly synthesized with prior context. Subagents protect the parent's window but pay for it in cold-start prompts and trust-but-verify overhead — their summaries describe intent, not necessarily reality.",
    whyAsked:
      "Subagents are a key pattern for scaling agents beyond a single context window, but misuse — over-delegating or under-delegating — is common. Tests architectural judgment.",
    trap:
      "Spawning subagents for tiny tasks where the prompt overhead exceeds the work. Or under-spawning and watching parent context fill with verbose tool output that should have been absorbed by a child.",
  },
  {
    question:
      "How do hooks work in Claude Code, and what's a non-obvious use case?",
    answer:
      "Hooks are shell commands fired on agent lifecycle events: PreToolUse (before any tool call), PostToolUse (after), Stop (when the model tries to end its turn), UserPromptSubmit (when user sends a message). Configured in settings.json with event type, optional matcher, and command. Hooks see structured JSON about the event on stdin and can block by returning non-zero. A non-obvious use case: a Stop hook that fails if uncommitted changes exist when tests touched files this session — forces the agent to either commit, revert, or explicitly justify leaving changes uncommitted. Another: a PreToolUse hook on Bash that logs every command to a security audit file, regardless of what the model claims it's doing.",
    whyAsked:
      "Hooks are the deterministic enforcement layer — the model can't bypass them. Tests whether you understand the harness/model boundary and can design safety-critical agent workflows.",
    trap:
      "Stop hooks that fire too eagerly — blocking on every turn becomes noise the model learns to ignore. Make Stop hooks specific: 'fail if X is true AND Y was modified,' not just 'fail if X is true.'",
  },
  {
    question:
      "What is MCP, and what problem does it solve?",
    answer:
      "MCP (Model Context Protocol) is an open protocol Anthropic introduced for connecting AI agents to external tools, data sources, and services. Before MCP, every agent product (Claude Code, Cursor, Continue, etc.) had its own way to integrate with GitHub, Slack, Postgres, etc. — meaning each tool maker had to build N integrations for N agents. MCP standardizes the contract: a server exposes tools and resources via JSON-RPC over stdio or Streamable HTTP; any MCP-aware client can use them. The win is portability — write a Postgres MCP server once, use it in any agent. The trust model is the gotcha: MCP servers run with full user permissions, so vetting matters.",
    whyAsked:
      "MCP is becoming the standard tool layer for agents. Knowing what it is, how it differs from bespoke integrations, and what its trust model is, is now baseline literacy for senior engineers in this space.",
    trap:
      "Treating MCP as a UI feature instead of a protocol. Or installing community MCP servers without checking — they run with your shell's permissions and can do anything you can do.",
  },
  {
    question:
      "How do you ensure an AI agent's claim of 'done' actually means done?",
    answer:
      "I separate code correctness (type-check, lint) from feature correctness (the change works end-to-end). Every claim of 'done' must be backed by an artifact: a test run output, a screenshot from a real preview, a curl response from a running endpoint. For UI changes specifically, I use a preview tool (Claude Preview MCP, headless browser) and capture screenshots — the type checker says nothing about whether the page renders. For APIs, I curl or run the test runner. I enforce this with Stop hooks: if the agent tries to end the turn without a verification artifact in the response, the hook blocks and asks for proof. The pattern is 'verify and share proof' rather than 'ask the user to verify.'",
    whyAsked:
      "LLMs are confident — they claim success because the diff looks plausible. Knowing how to design around this overconfidence is critical for shipping agent-driven changes safely.",
    trap:
      "Verifying only the immediate change. The button works, but the form below it now breaks because of the layout change — always test the golden path AND at least one adjacent flow.",
  },
  {
    question:
      "What's the difference between a skill and a slash command? And how do they relate to subagents?",
    answer:
      "A skill is a reusable agent capability defined by SKILL.md (frontmatter + instructions, optionally helper files). A slash command is a UX shortcut the harness intercepts — typing /<name> at the start of a message. Most slash commands invoke skills (the harness translates /name into a Skill tool call); some are built-in to the harness (/help, /clear, /config). Subagents are different: they're fresh Claude sessions spawned via the Agent tool, with their own context window. A skill is instructions; a subagent is a separate execution context. You can have a skill that internally spawns subagents — that's a common pattern for skills that do parallel research.",
    whyAsked:
      "These three concepts are easy to conflate but address different problems: skills are about capability reuse, slash commands are UX, subagents are about context isolation. Tests precision of mental model.",
    trap:
      "Calling everything a 'skill' loosely. A subagent isn't a skill; a slash command isn't a skill (it invokes one). Mixing the terms makes architectural conversations sloppy.",
  },
  {
    question:
      "Walk me through how you'd debug an agent that keeps producing wrong answers despite having the right tools.",
    answer:
      "First, look at the conversation transcript — what's actually in the context window? Often the issue is that key information got compressed out, or the wrong file was read, or a tool description is misleading. Second, check tool descriptions — vague descriptions cause selection errors; rewrite them more specifically. Third, check CLAUDE.md and skills for conflicting rules — agents pattern-match, and contradictions confuse them. Fourth, add a Stop hook that dumps the prompt for inspection on completion. Fifth, try a smaller test case to isolate whether the issue is reasoning or context. Last resort: clear context and start over with a tighter prompt — sometimes the conversation has drifted in a way that's not recoverable.",
    whyAsked:
      "Debugging agents is a skill — most failures aren't model failures, they're prompt or harness failures. Tests whether you can reason about the system end-to-end, not just blame 'the LLM.'",
    trap:
      "Blaming the model first. The vast majority of agent failures are upstream of the model: wrong tool description, missing context, conflicting rules in CLAUDE.md. Fix the system before fine-tuning.",
  },
];

const commonMistakes: CommonMistake[] = [
  {
    wrong: "Treat CLAUDE.md as a wiki — write paragraphs of explanation about the project's architecture, history, and conventions",
    correct:
      "Keep CLAUDE.md as a terse rule list under ~300 lines. The model can read the code; it can't infer rules. Save token budget for actual work.",
  },
  {
    wrong: "Add every tool you might need 'just in case' so the agent has options",
    correct:
      "Each tool's schema costs tokens on every turn, and more tools means more selection errors. Aim for the smallest tool set that covers the task.",
  },
  {
    wrong: "Assume the agent remembers prior sessions because you saved a memory file",
    correct:
      "Memory files only load when descriptions match. Verify the memory loaded by checking the conversation; don't assume continuity across sessions.",
  },
  {
    wrong: "Trust a subagent's 'done' summary without verifying its actual output",
    correct:
      "Subagent summaries describe intent, not necessarily reality. When a subagent writes code, check the diff. When it claims tests pass, look at the output.",
  },
  {
    wrong: "Run agents without permission boundaries — accept the default 'prompt for everything' mode and approve as they go",
    correct:
      "Use settings.json deny lists for destructive commands (rm -rf, push --force, kubectl delete) and PreToolUse hooks for sensitive operations. Defense in depth.",
  },
  {
    wrong: "Put volatile content (timestamps, request IDs, user-specific data) at the start of the prompt for 'context'",
    correct:
      "Stable content (system prompt, CLAUDE.md, tool schemas) goes first to maximize cache hits. Volatile content at the end. The 5-minute TTL is unforgiving.",
  },
  {
    wrong: "Spawn subagents for trivial work because parallelism feels efficient",
    correct:
      "Subagents have prompt overhead. For tasks under a minute, the overhead exceeds the savings. Reserve them for verbose work, true parallelism, or context isolation.",
  },
  {
    wrong: "Install community MCP servers without auditing because 'they're just tools'",
    correct:
      "MCP servers run with your shell's permissions. They can read your home directory, exfiltrate keys, and run arbitrary commands. Vet sources like you vet npm packages.",
  },
  {
    wrong: "Claim a UI change is done because the type checker passed and the dev server didn't crash",
    correct:
      "Type checks verify code correctness, not feature correctness. For UI changes, capture a screenshot from a real browser preview. For APIs, hit the endpoint with curl.",
  },
  {
    wrong: "Use bypassPermissions mode for convenience and approve everything as the agent goes",
    correct:
      "bypassPermissions disables the harness's safety net. Use scoped allowlists ('Bash(npm test:*)') for routine commands; keep prompts for irreversible operations.",
  },
  {
    wrong: "Write skill descriptions like 'helps with code review' or 'utility skill for various tasks'",
    correct:
      "The description is matched against user intent — vague descriptions don't fire. Write specifically: 'Use when reviewing a PR for OWASP Top 10 security issues.'",
  },
  {
    wrong: "Sleep or pause for 10+ minutes mid-agent-loop without thinking about cost",
    correct:
      "Prompt cache TTL is 5 minutes. Sleeping past it forces a full re-cache, paying full input cost on the next turn. Either stay under 5 minutes or accept the re-cache cost.",
  },
];

const practiceQuestions: PracticeQuestion[] = [
  {
    code: `# Project: a 30-engineer team adopting Claude Code for a Python/TypeScript monorepo.
# Existing pain points:
# - Inconsistent test commands (some use pytest, some use unittest)
# - Force-pushes to main happened twice last quarter
# - Junior engineers don't know which Slack channel to ask in for what
# - Code review checklist is in a Notion page nobody reads`,
    question:
      "Design the team's CLAUDE.md, skills directory, and settings.json strategy. What goes where?",
    answer: `**CLAUDE.md** (committed, team-wide) — terse, always-on rules:
- Test commands: "Always use 'pytest -xvs' for Python, 'pnpm test' for TypeScript. Never use unittest directly."
- Package management: "Use pnpm, never npm or yarn."
- Deploy invariants: "Never push to main. Always create a PR. Squash-merge only."
- Style: "4-space Python, 2-space TS. Run pre-commit before committing."
- (~50–80 lines max)

**~/.claude/skills/code-review/SKILL.md** (committed in a skills repo or shared via plugin):
- Description: "Use when reviewing a PR. Checks OWASP Top 10, test coverage, breaking changes, and team conventions."
- Body: the checklist that's currently rotting in Notion.

**~/.claude/skills/ask-team/SKILL.md**:
- Description: "Use when the user needs to ask the team about X. Routes questions to the right Slack channel."
- Body: a routing table — backend issues → #backend, infra → #devops, etc.

**.claude/settings.json** (committed, team-shared):
- "permissions.deny": ["Bash(git push --force:*)", "Bash(rm -rf:*)", "Bash(kubectl delete:*)"]
- "permissions.allow": ["Bash(pnpm test:*)", "Bash(pytest:*)", "Bash(git push origin:*)", "Bash(gh pr create:*)"]
- "hooks": PreToolUse on Bash matching "git push" → run a script that fails if branch is main

**.claude/settings.local.json** (gitignored, per-engineer):
- Personal env vars (DB credentials, API keys)
- Personal allowlists for tools the engineer commonly uses

**The win**: junior engineers get the right test command on day one (CLAUDE.md), the code review checklist actually gets used (skill, invoked on PRs), force-pushes are now blocked at the harness level (settings.json deny + hook), and Slack routing is encoded in a discoverable skill rather than a stale wiki.`,
  },
  {
    code: `# Scenario: an agent debugging a flaky integration test that fails 1 in 5 runs.
# After 30 turns, the agent says "I've identified the issue — it's a race condition
# in the user creation flow. The fix is to add a delay." The diff adds time.sleep(2).
# What's wrong with this picture, and how would you instrument the agent to do better?`,
    question:
      "Critique the agent's behavior and design an instrumentation strategy.",
    answer: `**What's wrong:**
1. **time.sleep(2) is the canonical "I don't actually know" fix** — it masks symptoms without addressing root cause. The race condition might still fire under load; the test will become slower without becoming reliable.
2. **30 turns of context** — the agent has likely been compressing intermediate findings. Whatever it 'identified' is probably a guess based on a pattern in old turns, not on current evidence.
3. **No verification** — the agent didn't run the test 100 times to confirm the fix. A flaky test that fails 1/5 needs ~50+ runs to validate a fix statistically.

**Instrumentation strategy:**
1. **Stop hook**: block turn termination if the test was modified but didn't run at least 20 times in the session. The model gets feedback: "you modified test_user_creation.py but only ran it 3 times — re-run 20+ times to validate before claiming done."
2. **PreToolUse hook on Edit**: if the edit adds 'time.sleep' or 'sleep(' to a test file, prompt the user — sleep-based fixes are usually wrong.
3. **CLAUDE.md addition**: "Flaky tests: don't use sleep. Investigate the actual race (DB state, async ordering, missing fixture cleanup). Run failing tests 50+ times before declaring fixed."
4. **Subagent for investigation**: spawn a Plan-mode subagent to read the failing test + the code under test + recent git history. The plan agent returns a report with root cause hypotheses; the parent then implements one. This separates investigation (read-only, cheap) from execution.
5. **Verification artifact**: require the agent's "done" message to include test output from 20+ consecutive runs, not just one.

**The deeper lesson**: agents will pattern-match to plausible fixes when they don't have enough information. Instrumentation forces them to gather information first.`,
  },
  {
    code: `# Task: build an MCP server that exposes a company's internal documentation to Claude Code.
# Docs are stored in a Postgres table 'docs' with columns: id, title, body, updated_at.
# Total: ~10,000 docs, 50KB average size.`,
    question:
      "Design the MCP server. What tools/resources does it expose, and how do you handle the scale?",
    answer: `**Tools to expose:**

\`\`\`typescript
// tool: search_docs
// description: "Use when the user asks about company processes, policies, or internal systems.
//   Searches the company knowledge base by keyword and returns up to 5 matching documents."
// params: { query: string, limit?: number }
// returns: array of { id, title, snippet, score, updated_at }

// tool: get_doc
// description: "Use to fetch the full body of a specific document by ID. Always use search_docs
//   first to find relevant document IDs."
// params: { id: string }
// returns: { id, title, body, updated_at }
\`\`\`

**Why two tools, not one:** \`search_docs\` returns snippets only — keeps the model's context lean during retrieval. \`get_doc\` is called only when the model has decided which doc it needs. Returning all 10K docs (500 MB) into context would explode the window.

**Search implementation:**
- Use Postgres full-text search (\`tsvector\`/\`tsquery\`) — fast, no extra infra. Add a \`tsv\` generated column with GIN index.
- Rank by ts_rank + recency boost (newer docs > older).
- Snippets: \`ts_headline()\` returns ~200 chars around the match.

**Scale considerations:**
- Connection pooling: hold a single pg connection for the server lifetime; don't open per-tool-call.
- Rate limiting: cap at 10 search/get calls per minute per session — prevents runaway loops.
- Caching: in-memory LRU cache of recent get_doc results (last 50 docs); doc bodies don't change often.
- Pagination: search returns up to 5 by default, never more than 20.

**Security:**
- Validate query input (length cap, no SQL injection — parameterized queries).
- Read-only DB user — the MCP server can't modify docs.
- Don't expose internal IDs that leak structure (use UUIDs or opaque hashes).

**Tool description matters:** the model picks tools based on the description. "Searches the company knowledge base" is specific; "looks up information" is too vague.`,
  },
  {
    code: `# You're reviewing this skill someone wrote:
# ---
# name: deploy-helper
# description: helps with deployments
# ---
# When deploying:
# 1. Check the env
# 2. Run the deploy script
# 3. Verify it worked`,
    question:
      "Critique this skill. Rewrite it to be production-grade.",
    answer: `**Problems with the original:**

1. **Description is too vague.** "Helps with deployments" doesn't tell the model when to invoke this. It also won't fire reliably because there's nothing for the description-matcher to latch onto.

2. **Body is uselessly abstract.** "Check the env" — which env? Check what about it? "Run the deploy script" — which script? Where does it live? This skill won't change agent behavior because every step is an unstated assumption.

3. **No safety guardrails.** Deployments are high blast radius. There's no mention of checking which environment (prod vs staging), no confirmation step, no rollback awareness.

4. **No verification.** "Verify it worked" — verify what, how? The agent will declare success on a green script exit even if the actual service is broken.

**Rewritten:**

\`\`\`markdown
---
name: deploy-service
description: Use when the user asks to deploy a service to staging or production. Walks through pre-deploy checks, deploy execution, and post-deploy verification with explicit gates for production.
allowed-tools: [Bash, Read]
---

## Pre-deploy checks (always run first)

1. Confirm the target environment by asking: "Deploying to staging or production?"
2. Run \`git status\` — refuse if there are uncommitted changes.
3. Run \`git log origin/main..HEAD\` — refuse if local is behind origin.
4. Run \`pnpm test --run\` — refuse if any test fails.
5. For production only: ask the user "Confirm production deploy of <commit-sha>" — wait for explicit "yes."

## Deploy execution

6. For staging: \`pnpm deploy:staging\`. Stream output. Fail if exit code is non-zero.
7. For production: \`pnpm deploy:prod\`. Stream output. Fail if exit code is non-zero.

## Post-deploy verification

8. Hit the health endpoint: \`curl -f https://<env>.example.com/health\` — must return 200.
9. Tail the deployment logs for 30 seconds — fail if any ERROR or FATAL lines appear.
10. For production: ping #deploys Slack channel via the Slack MCP server with the commit SHA and status.

## Rollback (if any verification fails)

11. Run \`pnpm deploy:rollback\`.
12. Notify the user immediately with the failure reason.
13. Do not retry without explicit user instruction.

## Examples

- "deploy to staging" → run this skill, target = staging, no production confirmation needed
- "deploy v2.3.1 to prod" → run this skill, target = production, require confirmation, ping Slack
\`\`\`

**Why this is better:**
- **Description** is specific — the model will match this against "deploy" intent reliably.
- **Steps are concrete** — no ambiguous "check the env."
- **Production has extra gates** — explicit confirmation step.
- **Verification is real** — health check, log scan, not just exit code.
- **Rollback is part of the skill** — failure is anticipated, not an afterthought.
- **Examples show usage** — helps the model calibrate when to invoke.`,
  },
  {
    code: `# An agent has been running for 45 minutes on a refactor task. Cost so far: $4.20.
# You notice the agent is reading the same file (src/auth/middleware.ts, 800 lines)
# in 7 of the last 10 turns. The model claims it needs to "verify the change" each time.`,
    question:
      "Diagnose the cost issue and propose three fixes that address root cause vs symptom.",
    answer: `**Diagnosis:**
The agent is re-reading an 800-line file 7 times in 10 turns. Each read is ~3K tokens. Even with prompt caching, the file content is in the volatile portion of the prompt (each read replaces the previous), so it's NOT cached — it's paid for fresh on each turn. 7 × 3K = 21K input tokens just from re-reads, on top of every other turn's content.

The root cause is likely one of:
1. The agent doesn't trust its own prior reads — context compression or inconsistency from earlier turns.
2. The agent is fishing for confidence — re-reading to verify nothing changed.
3. CLAUDE.md doesn't tell it the file's invariants, so it can't reason without re-reading.

**Three fixes (root cause, not symptom):**

**Fix 1: Use Read with offset/limit.** The agent doesn't need the whole 800-line file to verify a change to lines 200–250. CLAUDE.md addition: "When verifying a change you just made, read only the modified lines (offset, limit)." This is a behavior fix that compresses the per-read cost from 3K to ~300 tokens.

**Fix 2: Add a Stop hook that detects redundant reads.** The hook tracks recently-read files; if the same file is read 3+ times in a session without intervening edits, it blocks the stop turn with: "You've read src/auth/middleware.ts 3 times. Either commit your change or summarize what you've verified — don't re-read." Forces the model to either act or articulate.

**Fix 3: Spawn a Plan subagent for the refactor design.** The current pattern is the parent agent doing both design and execution, which leads to confidence loss and re-reading. Instead: spawn a Plan subagent with the task "design the refactor, list every file you'd change, list verification steps." The plan returns to the parent, who executes mechanically. The parent only re-reads files when actually editing them, not for "verification."

**What NOT to do (symptom fixes):**
- "Tell the agent not to re-read." It will, anyway, because it pattern-matches to the behavior.
- "Increase the cost budget." This is paying to mask the inefficiency.
- "Switch to a smaller model for re-reads." Tempting, but the issue is structural — fewer/smaller reads is better than cheaper-but-still-too-many reads.

**Cost projection after fixes:**
- Fix 1 alone: ~10x reduction on re-reads (300 vs 3K tokens), ~$0.50 savings on this run.
- Fix 1 + 2 + 3 combined: redirect verbose work to subagents, eliminate redundant reads, plan-then-execute discipline → expect 50-70% cost reduction on similar future tasks.`,
  },
  {
    code: `# Scenario: you're choosing between Claude Code, Codex CLI, and Cursor for your team.
# Your team:
# - 15 engineers, mix of senior and mid-level
# - Existing IDE: VS Code (10 engineers) and JetBrains (5 engineers)
# - Heavy use of GitHub, Linear, Slack
# - Mostly TypeScript backend + React frontend
# - Strong preference for terminal-driven workflows in 8 of 15 engineers
# - Budget concerns — currently spending $2K/month on Copilot`,
    question:
      "Make a recommendation. Justify your choice and identify the main risks.",
    answer: `**Recommendation: Claude Code as the primary, with Cursor as an optional IDE companion.**

**Why Claude Code as primary:**

1. **Terminal-first matches 8/15 engineers' preference**, and the IDE plugins handle the JetBrains/VS Code split without forcing a tooling change.
2. **Mature harness features matter at team scale**: skills, hooks, and MCP let us encode team conventions (deploy gates, security checks, code review checklists) once and apply them consistently. Cursor's equivalent (Rules) is less expressive; Codex's is newer.
3. **MCP integrations cover GitHub, Linear, and Slack** — all three already have official or well-maintained MCP servers. No bespoke integration work.
4. **Auto-memory + CLAUDE.md** address the cross-engineer consistency problem — junior engineers get the same project context senior engineers do.
5. **Anthropic's models (Sonnet/Opus 4) are strong on TypeScript and React** — empirically competitive with GPT-4 on these stacks for the kind of agentic refactoring work this team does.

**Why Cursor as a companion:**
- For inline editing during exploration (Cmd+K-style), Cursor is faster than spinning up an agent.
- The 7 IDE-heavy engineers can keep Cursor for autocomplete + inline editing while using Claude Code for end-to-end agentic tasks.
- Cursor supports multiple models, so engineers can switch to GPT for tasks where it's stronger without a tool change.

**Why NOT Codex CLI as primary:**
- Less mature ecosystem — fewer skills, fewer community MCP integrations.
- OpenAI-only model lock-in (vs MCP-based portability with Claude Code).
- Not a meaningful win over Claude Code for this team's stack.

**Budget:**
- Claude Code subscription: Pro is $20/engineer/month flat (covers most usage). For 15 engineers on Pro: $300/month. Heavy agentic users may need Max ($100/month for 5× Pro limits or $200/month for 20×) — realistically $300–600/month total depending on power-user count.
- Cursor companion (free tier or $20/month for the 7 IDE-heavy engineers): $0–140/month.
- Total: $300–740/month — a 60–85% reduction from current $2K Copilot spend.
- Caveat: heavy agentic users may exceed Pro limits and need Max or API-billed usage. Budget $1K/month buffer for spike users.

**Main risks:**

1. **Migration cost** — engineers need to learn CLAUDE.md, skills, and hooks. Mitigation: pair-onboard the first 2–3 engineers, have them write the team's initial CLAUDE.md and 2–3 high-value skills, then roll out.
2. **Trust regression** — engineers used to Copilot's autocomplete will find agentic workflows slower for line-by-line completion. Mitigation: keep Cursor available for that mode; reserve Claude Code for tasks where agency pays off.
3. **MCP server vetting** — community MCP servers run with shell permissions. Mitigation: maintain an internal allowlist of approved servers, gate adoption on security review.
4. **Model-cost surprise** — long agent loops can blow through token budgets if not prompt-cached. Mitigation: settings.json with sensible permission defaults, budget alerts, training on prompt caching basics.
5. **Lock-in to MCP** — if MCP doesn't become the standard (currently strong but not certain), some integration work might need redoing. Mitigation: low risk — even if MCP fades, the skills and CLAUDE.md transfer to whatever replaces it.

**Decision criteria for revisit (12 months in):**
- Are 80%+ of engineers actively using Claude Code? If not, investigate why.
- Has at least one team-shared skill saved measurable time (PR review, deploys)?
- Is monthly cost stable and predictable, or do we have spike users?
- Have we had any security incidents from MCP servers? (If yes, audit and tighten.)`,
  },
];

const lastHourConceptIds: string[] = [
  "agent-loop",
  "tool-use",
  "context-window",
  "claude-md",
  "skills-overview",
  "subagents",
  "mcp-overview",
  "prompt-caching",
  "verify-before-done",
  "executing-with-care",
  "skill-vs-prompt",
  "hooks",
];

const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "An agent loop is the harness — not the model — that owns safety, tools, and context. The model decides what to do; the harness decides what's allowed.",
    "Three layers of instruction: prompts (one-off), skills (on-demand reuse), CLAUDE.md (always-on rules). Pick by frequency × specificity.",
    "Prompt caching with a 5-minute TTL is the biggest cost lever — stable prefix at the front, volatile content at the end, no long pauses mid-loop.",
    "Subagents protect parent context for verbose work and enable parallelism, but their summaries describe intent, not necessarily reality — verify after.",
    "MCP standardizes tool integration across agents — same Postgres server works in Claude Code, Cursor, Codex. Trust model: servers run with user permissions.",
    "Verify before done: type checks verify code correctness, not feature correctness. Capture screenshots, hit endpoints, run tests — share proof.",
    "Permission boundaries (settings.json deny lists) and hooks are the harness's enforcement layer for irreversible actions. The model can't bypass them.",
  ],
  mustKnowConcepts: [
    {
      name: "Agent Loop",
      oneLiner:
        "Harness wraps the model with tools and observation; loop ends when no tool calls. Stateless across sessions — no hidden memory.",
    },
    {
      name: "Tool Use",
      oneLiner:
        "Model emits structured tool calls; harness executes; results feed back. Tool description quality matters more than quantity.",
    },
    {
      name: "Context Window",
      oneLiner:
        "200K for Claude 3/4.0-era; 1M standard for Sonnet/Opus 4.6+. Quality degrades well before the limit. Aim for <50% utilization in working context.",
    },
    {
      name: "CLAUDE.md",
      oneLiner:
        "Project-level always-on rules in markdown. Terse, under ~300 lines. Costs tokens every turn — cached but counted.",
    },
    {
      name: "Skills (SKILL.md)",
      oneLiner:
        "Reusable on-demand capabilities with frontmatter + body. Description field decides when the model invokes them.",
    },
    {
      name: "Subagents",
      oneLiner:
        "Fresh sessions spawned via the Agent tool. Self-contained prompts; trust-but-verify summaries; great for parallelism.",
    },
    {
      name: "MCP",
      oneLiner:
        "Open protocol for agent ↔ tool integration. Same servers work across clients. Trust model: full user permissions.",
    },
    {
      name: "Prompt Caching",
      oneLiner:
        "90% input discount on cached prefix; 5-minute TTL refreshing on hit. Stable content first, volatile last.",
    },
    {
      name: "Hooks",
      oneLiner:
        "Shell commands on lifecycle events (PreToolUse, PostToolUse, Stop). Harness-enforced — model can't bypass.",
    },
    {
      name: "Verify Before Done",
      oneLiner:
        "Don't claim done without proof — screenshot, log, test output. Type checks aren't feature checks.",
    },
  ],
  topTraps: [
    "Treating CLAUDE.md as a wiki — every byte costs tokens on every turn. Keep it terse, rule-oriented, under ~300 lines.",
    "Putting volatile content at the start of the prompt — invalidates the cache for everything after. Stable content first, always.",
    "Trusting subagent summaries without verification — they describe intent, not reality. Check the diff, the test output, the actual artifact.",
    "Installing community MCP servers without auditing — they run with your shell's permissions. Vet them like npm packages.",
    "Claiming a UI change is done because the type checker passed — type checks verify code correctness, not feature behavior. Always preview in a browser.",
    "Approving an irreversible action once and assuming it's authorized for the rest of the session — each destructive action is its own decision unless durably authorized.",
  ],
};

export const topicData: TopicData = {
  topicTitle: "AI Coding Agents",
  topicMeta: "45–60 min · Mid to Senior level",
  lastUpdated: "2026-05-03",
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
