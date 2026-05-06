# 📘 Product Spec: Interview Revision Platform

## 🧭 Vision

> Build a platform that enables engineers to **revise any technical topic in 30–60 minutes before an interview**, focusing only on high-signal, interview-relevant content.

---

## 🎯 Target Users

* Mid-level to senior engineers (3–10 YOE)
* Preparing for:

  * Product-based companies (MAANG/MNC)
  * Technical interviews
* Secondary audience:

  * Beginners (later phase)

---

## 🚨 Problem Statement

Current resources are:

* Too long (docs, courses)
* Too shallow (cheat sheets)
* Not structured for **fast recall**
* Missing **interview-focused explanations**

---

## 💡 Solution

A **high-signal revision platform** where each topic is compressed into:

* 30–60 minute reading time
* Interview-focused concepts
* Structured for quick recall and confidence

---

## 🧱 Core Product Structure

### Main Navigation

```
Home
Topics
Quick Revision
Tracks (future)
Mock Mode (future)
```

---

## 📂 Topic Structure (Example: Python)

Each topic contains **5–6 structured sections**:

### 1. 🧠 Mental Model

* What it is
* Why it exists
* When to use
* Where it fails

---

### 2. ⚙️ Core Concepts

Each concept follows a fixed template:

```
Topic Name

🟢 Basic:
- Definition

🟡 Expected:
- Practical usage / behavior

🔴 Deep:
- Internal reasoning / edge cases

🎤 Interview Answer:
- How to explain verbally in an interview

⚠️ Trap:
- Common misconception or mistake
```

---

### 3. 💡 Interview Patterns

For each common question:

```
Question

🎤 Answer:
- Ideal structured response

🧠 Why Asked:
- What interviewer is evaluating

⚠️ Trap:
- Common wrong answer
```

---

### 4. ⚠️ Common Mistakes

* Short, high-impact corrections
* Focus on misconceptions

Example:

```
❌ GIL means no concurrency  
✔️ Incorrect — I/O concurrency still works
```

---

### 5. 🧪 Practice Mode

* Small code snippets
* Output-based questions
* Toggle: “Show Answer”

---

### 6. 📊 Cheat Sheet

* One-page summary
* Dense, scannable
* Printable/downloadable

---

## 🔥 Key Features (USP)

### 1. ⏱️ Last 1 Hour Mode

* Filters only MUST-KNOW content
* Designed for immediate revision before interviews

---

### 2. 🎤 Interview Answer Mode

* Shows how to **verbally answer**
* Not just theory

---

### 3. 🧠 Depth Levels

* 🟢 Basic
* 🟡 Expected
* 🔴 Deep

---

### 4. ⚠️ Trap Mode

* Focuses only on tricky concepts and edge cases

---

### 5. 📊 Confidence Tracker

* Users mark topics:

  * Known
  * Unsure
  * Unknown
* Generates readiness score

---

### 6. 🌙 Night Before Mode

* Minimal UI
* Only summaries + key points

---

## 🎨 UX Principles

* No long paragraphs
* Bullet-first design
* Max 5–6 sections per topic
* Fast scanning (under 10 mins per section)
* Visual clarity over completeness

---

## 🏗️ MVP Scope

### Phase 1 (Launch)

* 1 topic only: **Python**
* Static structured content
* No login required
* Core sections implemented

---

### Phase 2

* Add:

  * Kubernetes
  * System Design Basics
* Add:

  * Confidence tracking
  * Practice toggles

---

### Phase 3

* Mock interview mode
* Personalized recommendations
* Topic tracking

---

## 🧪 Success Metrics

* Time spent per topic (target: 30–60 mins)
* Repeat visits before interviews
* User feedback:

  * “Would you use this before an interview?”

---

## 📣 Positioning

Do NOT position as:

* Learning platform
* Tutorial site

Position as:

> “Revise any tech topic for interviews in under 1 hour”

---

## 🏁 Taglines

* “Stop reading docs. Start recalling.”
* “Everything you need before your interview.”
* “High-signal prep for engineers.”

---

## 🚀 Future Expansion

* Tracks:

  * Backend Engineer
  * Data Engineer
* Advanced topics:

  * Concurrency
  * System Design deep dives
* Mock interviews
* AI-based weak area detection

---

## ⚠️ Critical Success Factors

* Extreme conciseness
* Interview-focused depth
* Clear structure and consistency
* Fast recall UX

---

## ❌ Anti-Goals

* Not a full tutorial platform
* Not beginner-heavy initially
* Not long-form content

---

If you want next, I can:

* Turn this into **UI wireframes**
* Or generate a **frontend + backend starter (Next.js + schema)**
* Or expand Python into **production-ready content with depth levels + traps**

Just tell me 👍
