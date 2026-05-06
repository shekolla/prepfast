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

export const mentalModel: MentalModel = {
  whatItIs:
    "Docker packages applications into portable, isolated containers using Linux namespaces and cgroups. Kubernetes orchestrates those containers at scale — handling scheduling, self-healing, scaling, and networking across a cluster of machines.",
  whyItExists:
    "Docker solves 'works on my machine' by bundling the app + runtime + dependencies into one artifact. Kubernetes solves 'runs on one machine' by automating container placement, restarts, scaling, and service discovery across many machines. Together they move the unit of deployment from a server to a container.",
  whenToUse: [
    "Microservices that need independent deployments and scaling",
    "Applications requiring high availability and zero-downtime deploys",
    "Multi-environment consistency (dev → staging → prod)",
    "Teams needing declarative infrastructure as code",
    "Workloads with variable load requiring auto-scaling",
  ],
  whereItFails: [
    "Simple single-service apps (overhead isn't worth it)",
    "Teams without DevOps/platform expertise — K8s has steep learning curve",
    "Hard real-time workloads (scheduler adds unpredictable latency)",
    "Stateful apps that haven't been designed for container restarts",
  ],
};

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories: CategoryMeta[] = [
  {
    id: "container-fundamentals",
    label: "Container Fundamentals",
    description: "Linux namespaces, cgroups, OCI spec — how containers work under the hood",
  },
  {
    id: "docker-images",
    label: "Docker Images & Builds",
    description: "Dockerfile, layer caching, multi-stage builds, image optimization",
  },
  {
    id: "docker-runtime",
    label: "Docker Runtime & Compose",
    description: "Networking, volumes, Docker Compose for multi-container local setups",
  },
  {
    id: "k8s-architecture",
    label: "Kubernetes Architecture",
    description: "Control plane, node components, etcd, and the reconciliation loop",
  },
  {
    id: "workloads",
    label: "Workloads & Controllers",
    description: "Pod, Deployment, StatefulSet, DaemonSet, Job — when to use each",
  },
  {
    id: "k8s-networking",
    label: "Kubernetes Networking",
    description: "Services, Ingress, DNS, NetworkPolicy — how traffic flows in a cluster",
  },
  {
    id: "storage-config",
    label: "Storage & Configuration",
    description: "PersistentVolumes, PVCs, StorageClass, ConfigMap, Secrets",
  },
  {
    id: "scheduling-security",
    label: "Scheduling & Security",
    description: "Resource requests/limits, affinity, taints/tolerations, RBAC",
  },
];

// ─── Mental Model Tree ────────────────────────────────────────────────────────

export const mentalModelTree: TreeNode = {
  id: "root",
  label: "Kubernetes & Docker",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "cat-container-fundamentals",
      label: "Container Fundamentals",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "namespaces-cgroups-tree", label: "Namespaces & cgroups", nodeType: "concept", conceptId: "namespaces-cgroups", importance: "critical" },
        { id: "container-vs-vm-tree", label: "Containers vs VMs", nodeType: "concept", conceptId: "container-vs-vm", importance: "high" },
        { id: "oci-runtime-tree", label: "OCI & Container Runtimes", nodeType: "concept", conceptId: "oci-runtime", importance: "medium" },
      ],
    },
    {
      id: "cat-docker-images",
      label: "Docker Images & Builds",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "dockerfile-layers-tree", label: "Dockerfile & Image Layers", nodeType: "concept", conceptId: "dockerfile-layers", importance: "critical" },
        { id: "build-cache-tree", label: "Build Cache & Optimization", nodeType: "concept", conceptId: "build-cache", importance: "high" },
        { id: "multi-stage-builds-tree", label: "Multi-stage Builds", nodeType: "concept", conceptId: "multi-stage-builds", importance: "high" },
      ],
    },
    {
      id: "cat-docker-runtime",
      label: "Docker Runtime & Compose",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "docker-networking-tree", label: "Docker Networking", nodeType: "concept", conceptId: "docker-networking", importance: "high", relatedIds: ["k8s-networking"] },
        { id: "docker-volumes-tree", label: "Docker Volumes & Storage", nodeType: "concept", conceptId: "docker-volumes", importance: "high", relatedIds: ["pv-pvc"] },
        { id: "docker-compose-tree", label: "Docker Compose", nodeType: "concept", conceptId: "docker-compose", importance: "medium" },
      ],
    },
    {
      id: "cat-k8s-architecture",
      label: "Kubernetes Architecture",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "control-plane-tree", label: "Control Plane", nodeType: "concept", conceptId: "control-plane", importance: "critical" },
        { id: "node-components-tree", label: "Node Components", nodeType: "concept", conceptId: "node-components", importance: "critical" },
        { id: "reconciliation-loop-tree", label: "Reconciliation Loop", nodeType: "concept", conceptId: "reconciliation-loop", importance: "critical" },
      ],
    },
    {
      id: "cat-workloads",
      label: "Workloads & Controllers",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "pod-tree", label: "Pod", nodeType: "concept", conceptId: "pod", importance: "critical" },
        { id: "deployment-tree", label: "Deployment & ReplicaSet", nodeType: "concept", conceptId: "deployment", importance: "critical" },
        { id: "statefulset-tree", label: "StatefulSet", nodeType: "concept", conceptId: "statefulset", importance: "high", relatedIds: ["pv-pvc"] },
        { id: "daemonset-job-tree", label: "DaemonSet, Job, CronJob", nodeType: "concept", conceptId: "daemonset-job", importance: "medium" },
      ],
    },
    {
      id: "cat-k8s-networking",
      label: "Kubernetes Networking",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "services-tree", label: "Services", nodeType: "concept", conceptId: "services", importance: "critical" },
        { id: "ingress-tree", label: "Ingress", nodeType: "concept", conceptId: "ingress", importance: "critical", relatedIds: ["services"] },
        { id: "network-policy-dns-tree", label: "NetworkPolicy & DNS", nodeType: "concept", conceptId: "network-policy-dns", importance: "high" },
      ],
    },
    {
      id: "cat-storage-config",
      label: "Storage & Configuration",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "pv-pvc-tree", label: "PV, PVC & StorageClass", nodeType: "concept", conceptId: "pv-pvc", importance: "high" },
        { id: "configmap-secret-tree", label: "ConfigMap & Secrets", nodeType: "concept", conceptId: "configmap-secret", importance: "critical" },
      ],
    },
    {
      id: "cat-scheduling-security",
      label: "Scheduling & Security",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "resources-limits-tree", label: "Resource Requests & Limits", nodeType: "concept", conceptId: "resources-limits", importance: "critical" },
        { id: "affinity-taints-tree", label: "Affinity & Taints/Tolerations", nodeType: "concept", conceptId: "affinity-taints", importance: "high" },
        { id: "rbac-tree", label: "RBAC", nodeType: "concept", conceptId: "rbac", importance: "critical" },
        { id: "probes-tree", label: "Liveness & Readiness Probes", nodeType: "concept", conceptId: "probes", importance: "critical" },
      ],
    },
  ],
};

// ─── Concepts ─────────────────────────────────────────────────────────────────

export const concepts: Concept[] = [
  // ── Container Fundamentals ────────────────────────────────────────────────────
  {
    id: "namespaces-cgroups",
    title: "Linux Namespaces & cgroups",
    category: "container-fundamentals",
    basic:
      "Containers are isolated Linux processes. Namespaces isolate what a process can see; cgroups limit what it can use.",
    expected:
      "Linux namespaces: PID (isolated process tree), network (isolated network stack), mount (isolated filesystem), UTS (isolated hostname), IPC (isolated inter-process communication), user (isolated UID/GID mapping). cgroups (control groups) enforce resource limits: CPU, memory, I/O. A container is a process with all these namespaces applied plus cgroup limits — no hypervisor, no separate kernel.",
    deep:
      "Each Docker container gets its own network namespace (private eth0, loopback), PID namespace (PID 1 is your entrypoint process), and mount namespace (container's root filesystem is a union mount via overlayfs). The host kernel is shared — 'uname -r' inside a container returns the host kernel version. cgroup v2 (unified hierarchy) is now default in modern Linux. Memory limit enforcement: exceeding the memory cgroup limit causes the OOM killer to terminate the container process (you see OOMKilled in Kubernetes). seccomp profiles and AppArmor/SELinux add syscall-level security on top.",
    interviewAnswer:
      "Containers use two Linux kernel primitives: namespaces for isolation and cgroups for resource limits. Namespaces make a process think it's alone — it has its own PIDs, network interfaces, filesystem mounts, and hostname. cgroups enforce hard limits on CPU, memory, and I/O. The container shares the host kernel — there's no hypervisor. This is why containers start in milliseconds vs seconds for VMs, and why a container escape is a kernel vulnerability.",
    trap:
      "Containers are NOT VMs. They share the host kernel. A container running Linux on a Windows Docker Desktop is running inside a lightweight Linux VM that Docker Desktop manages — the container itself still uses that VM's kernel.",
    memoryAnchor:
      "Namespaces = blindfolds (can't SEE other processes). cgroups = handcuffs (can't USE more than your share). A container is a blindfolded, handcuffed process — still in the same building (kernel).",
  },
  {
    id: "container-vs-vm",
    title: "Containers vs Virtual Machines",
    category: "container-fundamentals",
    basic:
      "VMs virtualize hardware via a hypervisor; containers virtualize the OS via namespaces. Containers share the host kernel.",
    expected:
      "VMs: full OS per VM, hardware-level isolation, ~GB images, seconds to start, stronger security boundary. Containers: shared kernel, process-level isolation, ~MB images, milliseconds to start, weaker security boundary. VMs are better for multi-tenancy with untrusted workloads. Containers are better for microservices, CI/CD, and density.",
    deep:
      "Hypervisors: Type 1 (bare metal: VMware ESXi, KVM, Hyper-V) vs Type 2 (hosted: VirtualBox, VMware Workstation). KVM is Linux kernel built-in and what most cloud providers use. Container escape vulnerabilities exploit kernel bugs — recent examples: runc CVE-2019-5736, containerd CVE-2022-23648. Kata Containers and gVisor run containers inside lightweight VMs or with a user-space kernel to get VM-level isolation with near-container performance. EKS Fargate and GKE Autopilot use this approach.",
    interviewAnswer:
      "VMs virtualize hardware — each VM has its own OS, kernel, and a hypervisor managing hardware access. Containers virtualize the OS — they share the host kernel but have isolated namespaces. This makes containers ~10x faster to start, ~10x smaller on disk, and much denser to pack. The trade-off is isolation: a kernel exploit can escape a container but not a VM. For untrusted multi-tenant workloads, VMs win on security. For microservices and CI/CD, containers win on efficiency.",
    trap:
      "Containers don't provide the same security isolation as VMs. Running untrusted code in a container on a shared host is risky — use dedicated nodes, gVisor, or Kata Containers for that use case.",
    memoryAnchor:
      "VM = separate houses with own foundations (kernel). Container = apartments in one building sharing plumbing (kernel). Cheaper and faster to build apartments, but a fire in the walls spreads to everyone.",
  },
  {
    id: "oci-runtime",
    title: "OCI, containerd & Container Runtimes",
    category: "container-fundamentals",
    basic:
      "OCI (Open Container Initiative) defines the standard for container images and runtimes. containerd is the industry-standard container runtime; runc is the low-level runtime that actually creates containers.",
    expected:
      "Docker originally included everything in one daemon. It has since donated containerd to CNCF — containerd manages image pulls, storage, and container lifecycle. runc (also donated by Docker) implements the OCI runtime spec and is what actually calls Linux kernel APIs to create namespaces/cgroups. Kubernetes uses containerd or CRI-O directly (Dockershim was removed in K8s 1.24).",
    deep:
      "The stack: Docker CLI → dockerd → containerd → containerd-shim → runc → container process. The shim decouples container processes from containerd — containerd can restart without killing containers. CRI (Container Runtime Interface) is the Kubernetes API for container runtimes. CRI-O is a lightweight alternative to containerd, purpose-built for Kubernetes. Image format: OCI image = manifest (metadata) + config (env, entrypoint) + layers (tar archives). An OCI image is just a tarball of tarballs with a JSON manifest.",
    interviewAnswer:
      "OCI standardizes how container images are built and how runtimes run them — so an image built with Docker runs on containerd, podman, or any OCI-compliant runtime. containerd is the runtime Kubernetes uses today (Docker's runtime, donated to CNCF). runc is the low-level OCI runtime that actually makes the syscalls to create namespaces and cgroups. Knowing this matters because Kubernetes 1.24 removed dockershim — clusters now talk directly to containerd via CRI.",
    trap:
      "Docker and containerd are not the same. Docker is a developer UX tool (CLI, build, compose). containerd is the runtime that actually manages containers. In production Kubernetes clusters, Docker the tool is often not installed at all.",
    memoryAnchor:
      "OCI = the universal power outlet standard. containerd = the electrician who wires everything. runc = the actual outlet that delivers current. Docker = the fancy smart-home app you use to flip switches.",
  },

  // ── Docker Images & Builds ────────────────────────────────────────────────────
  {
    id: "dockerfile-layers",
    title: "Dockerfile & Image Layers",
    category: "docker-images",
    basic:
      "Each Dockerfile instruction creates a read-only layer. Layers are stacked using overlayfs. An image is the ordered stack of all layers.",
    expected:
      "Instructions that produce layers: RUN, COPY, ADD. Instructions that don't produce new layers: FROM, ENV, ARG, LABEL, EXPOSE, CMD, ENTRYPOINT, WORKDIR. Layers are content-addressed (SHA256 of content). Shared layers between images are stored once on disk and pulled once. The container adds a thin writable layer on top at runtime (copy-on-write for any writes).",
    deep:
      "overlayfs works with lowerdir (read-only layers), upperdir (writable container layer), and workdir. Reading a file: check upperdir first, fall through to lowerdir layers. Writing a file: copy-on-write from lowerdir to upperdir, then modify. Deleting a file: whiteout file created in upperdir. Layer size optimization: if you install packages in one RUN then delete in a second RUN, the deletion still adds a layer but the original bytes remain in the layer below — total image size doesn't shrink. Must combine into one RUN or use multi-stage builds. COPY vs ADD: ADD auto-extracts tarballs and accepts URLs — almost always use COPY instead for clarity.",
    interviewAnswer:
      "Every RUN, COPY, ADD creates an immutable layer identified by its SHA256 hash. Layers are reused across images and cached during builds. The container adds a writable layer on top using overlayfs copy-on-write. The critical implication: apt-get install in one RUN, apt-get clean in the next RUN does NOT reduce image size — the installed bytes live in layer N, the deletion is a whiteout in layer N+1. Combine them: RUN apt-get update && apt-get install -y pkg && rm -rf /var/lib/apt/lists/*",
    trap:
      "apt-get clean in a separate RUN layer does NOT shrink the image. Layers are immutable and additive — deletion only adds a whiteout marker. Use single RUN instructions or multi-stage builds to keep images small.",
    memoryAnchor:
      "Layers are like stacking transparent sheets. Each RUN = a new sheet. You can draw on a new sheet but never erase a previous one. 'Deleting' just puts a sticky note saying 'ignore this' — the old drawing is still there taking up space.",
  },
  {
    id: "build-cache",
    title: "Build Cache & Optimization",
    category: "docker-images",
    basic:
      "Docker caches each layer. If a layer's instruction and its inputs haven't changed, the cached layer is reused — skipping re-execution.",
    expected:
      "Cache invalidation rules: (1) if an instruction changes, it and all subsequent layers are invalidated. (2) COPY/ADD invalidate the cache if the file contents change (based on checksum, not timestamp). (3) RUN never checks if the command's output changed — it only checks if the instruction text changed. Key pattern: COPY package.json ./; RUN npm install; COPY . . — dependency install is cached unless package.json changes, even if source code changes.",
    deep:
      ".dockerignore works like .gitignore — excludes files from the build context sent to the daemon. Critical for performance: without it, COPY . . includes node_modules, .git, build artifacts. Large build contexts slow down the initial send to the Docker daemon. BuildKit (default since Docker 23) improves cache performance with parallel stage execution, secret mounts (--mount=type=secret), and SSH agent forwarding. BUILDKIT_INLINE_CACHE=1 embeds cache metadata in the image for registry-based caching across CI runs. Cache mounts (--mount=type=cache) persist package manager caches between builds without adding to the image.",
    interviewAnswer:
      "Docker's build cache is layer-by-layer and invalidates from the first changed layer downward. The key optimization: put slow, rarely-changing steps first (install dependencies) and fast, frequently-changing steps last (copy source code). Always create a .dockerignore to exclude node_modules, .git, and build artifacts from the build context. With BuildKit, use --mount=type=cache for package manager caches — npm, pip, apt — to get near-instant installs on rebuilds.",
    trap:
      "RUN apt-get update should always be combined with apt-get install in one layer. If they're separate, the update result is cached and stale — future builds skip the update but run install against old package lists, potentially installing outdated versions.",
    memoryAnchor:
      "Build cache = a chef who skips steps if the recipe hasn't changed. 'COPY package.json first' = handing the chef the ingredient list early. Only when ingredients change does the chef re-shop. Source code changes? Chef already has groceries cached.",
  },
  {
    id: "multi-stage-builds",
    title: "Multi-stage Builds",
    category: "docker-images",
    basic:
      "A Dockerfile with multiple FROM instructions. Each stage can copy artifacts from previous stages. Only the final stage's layers are in the shipped image.",
    expected:
      "Use case: compile in a full SDK image, copy only the binary into a minimal runtime image. Example: FROM golang:1.21 AS builder; RUN go build -o app; FROM gcr.io/distroless/base; COPY --from=builder /app /app. The final image has no build toolchain — dramatically smaller and fewer attack surface vulnerabilities. COPY --from=stage_name or --from=0 (index) copies between stages.",
    deep:
      "Named stages (AS builder) allow COPY --from=builder. Stages can be targeted with docker build --target builder — useful for running tests in CI without building the final image. Distroless images (Google) contain only the runtime and app — no shell, no package manager, tiny attack surface. Alpine-based images (~5MB) are another minimal option but use musl libc which can cause subtle compatibility issues with glibc-compiled binaries. BuildKit can run independent stages in parallel. Multi-stage is the primary way to separate build dependencies from runtime dependencies in containerized applications.",
    interviewAnswer:
      "Multi-stage builds let you use a fat build environment (Go SDK, JDK, Node with build tools) and produce a minimal runtime image. COPY --from=builder copies only what you need — the compiled binary, built assets. The shipped image has no compiler, no npm, no secrets used during build. I use FROM gcr.io/distroless/static for Go binaries — the final image is ~5MB with no shell or OS utilities, which dramatically reduces CVE exposure.",
    trap:
      "Build-time secrets (API keys, SSH keys) passed as ARG or ENV are baked into the layer — even if you delete them in a later step. Use BuildKit secret mounts: RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret. These never appear in any layer.",
    memoryAnchor:
      "Multi-stage = cooking in a messy kitchen, then plating only the finished dish in a clean restaurant. Guests (production) never see the dirty pots, flour everywhere, or secret recipe notes — only the final plate.",
  },

  // ── Docker Runtime ────────────────────────────────────────────────────────────
  {
    id: "docker-networking",
    title: "Docker Networking",
    category: "docker-runtime",
    basic:
      "Docker provides several network drivers. bridge (default) creates a private network; containers communicate via virtual ethernet. host shares the host network stack.",
    expected:
      "Network drivers: bridge (default, isolated network, NAT to host), host (no isolation, container uses host's IP and ports directly, best performance), none (no network), overlay (multi-host, used by Docker Swarm and K8s CNI plugins), macvlan (container gets a MAC address visible on the physical network). Containers on the same user-defined bridge network resolve each other by container name (built-in DNS). The default bridge network doesn't have automatic DNS — must use --link (deprecated) or user-defined networks.",
    deep:
      "docker network create --driver bridge mynet creates an isolated bridge with a Docker-managed iptables NAT. Under the hood: a virtual ethernet pair (veth) connects the container's eth0 to the host's bridge. Docker manages iptables FORWARD rules and MASQUERADE for outbound NAT. Port mapping (-p 8080:80) adds a DNAT iptables rule. In Kubernetes, CNI plugins (Calico, Flannel, Cilium) implement overlay networking for cross-node pod communication. Cilium uses eBPF instead of iptables for better performance and observability.",
    interviewAnswer:
      "Docker containers get their own network namespace with a virtual eth0. The bridge driver connects containers to a virtual bridge on the host with NAT for outbound traffic. Port publishing (-p) adds iptables DNAT rules. User-defined bridge networks get automatic DNS resolution by container name — always use these instead of the default bridge. The host driver gives the container direct access to the host's network stack — no NAT overhead, useful for performance-critical services.",
    trap:
      "The default bridge network does NOT support container name DNS resolution. Two containers on the default bridge network can't reach each other by name — only by IP. Always create user-defined bridge networks for multi-container apps.",
    memoryAnchor:
      "Bridge network = a private office floor with an internal phone directory. Containers are offices on the same floor — they call each other by name. Host network = tearing down the office walls and sitting directly in the lobby.",
  },
  {
    id: "docker-volumes",
    title: "Docker Volumes & Storage",
    category: "docker-runtime",
    basic:
      "Containers have ephemeral storage — data written to the container layer is lost when the container is removed. Volumes and bind mounts persist data outside the container.",
    expected:
      "Three types: (1) Volumes — managed by Docker (/var/lib/docker/volumes/), portable, work with volume drivers for cloud storage. (2) Bind mounts — map a host path into the container. (3) tmpfs mounts — in-memory only, not persisted. Volumes are preferred for production: they're portable, don't depend on host directory structure, and Docker manages them. Use docker volume create, inspect, rm. Named volumes vs anonymous volumes (auto-named by Docker).",
    deep:
      "Volume drivers enable network storage: local (default), NFS, AWS EBS (via Docker plugins). In production Kubernetes replaces Docker volumes — PersistentVolumes (PV) and PVCs map to storage backends (EBS, EFS, NFS, Ceph). Bind mounts are useful in development (live reload, test fixtures) but dangerous in production — a misconfigured bind mount can expose the host filesystem. --volume vs --mount: --mount is more explicit and recommended. Copy semantics: if you mount a volume over a directory that has existing content in the image, Docker copies the image content into the volume on first run.",
    interviewAnswer:
      "Container storage is ephemeral — it dies with the container. Volumes are Docker-managed directories outside the container filesystem, persisted across container restarts and removals. Bind mounts map a specific host path. For local dev, bind mounts are great for hot reload. For production, use named volumes or — in Kubernetes — PersistentVolumeClaims. Never use bind mounts in production containers unless you explicitly need host access.",
    trap:
      "Removing a container with docker rm does NOT remove its volumes. Volumes persist until explicitly removed with docker volume rm or docker volume prune. Use docker rm -v to remove the container and its anonymous volumes together.",
    memoryAnchor:
      "Container storage = writing on a whiteboard (wiped when you leave the room). Volume = a filing cabinet in the hallway (survives room demolition). Bind mount = bringing your own folder from home into the office.",
  },
  {
    id: "docker-compose",
    title: "Docker Compose",
    category: "docker-runtime",
    basic:
      "Docker Compose defines and runs multi-container apps with a docker-compose.yml file. One command starts all services: docker compose up.",
    expected:
      "Key fields: services, networks, volumes. depends_on controls startup order (but not readiness — the dependent service may start before the dependency is ready). Environment variables via env_file or environment. Health checks via healthcheck. Compose creates a default network where services are accessible by service name. Profiles group services for conditional startup. docker compose up -d (detached), down (stop + remove), logs, exec.",
    deep:
      "depends_on with condition: service_healthy waits for the healthcheck to pass — the right way to wait for a database to be ready. Compose V2 (docker compose vs docker-compose) is now the default and ships with Docker. Compose files support extension fields (x-) and anchors/aliases (YAML anchors) for DRY configs across environments. override files: docker-compose.override.yml is auto-merged — useful for local dev vs CI variations. In production, Compose is often replaced by Kubernetes, but it's still widely used for local dev and simple single-host deployments.",
    interviewAnswer:
      "Docker Compose is the standard tool for local multi-service development. One YAML file defines all services, their images, env vars, ports, volumes, and network relationships. Services discover each other by service name on the default Compose network. The critical depends_on gotcha: it controls startup order but not readiness. Use depends_on with condition: service_healthy and a healthcheck to properly wait for databases and message queues to be ready before starting dependent services.",
    trap:
      "depends_on alone does NOT wait for a service to be ready — only for the container to start. A web service starting before its database is healthy will crash. Use condition: service_healthy with a proper healthcheck, or implement retry logic in your application startup.",
    memoryAnchor:
      "Compose = a band conductor's sheet music. One YAML file says 'drums start, then bass, then guitar.' But depends_on is like saying 'guitar after drums' — it waits for the drummer to SIT DOWN, not to actually be PLAYING. Use healthchecks to wait for the beat.",
  },

  // ── Kubernetes Architecture ───────────────────────────────────────────────────
  {
    id: "control-plane",
    title: "Control Plane",
    category: "k8s-architecture",
    basic:
      "The control plane is the brain of Kubernetes. It stores cluster state, schedules workloads, and runs control loops that reconcile desired state with actual state.",
    expected:
      "Components: kube-apiserver (single entry point for all API operations, validates and persists to etcd), etcd (distributed key-value store, the source of truth for all cluster state), kube-scheduler (watches for unscheduled pods, picks the best node based on resources, affinity, taints), kube-controller-manager (runs all built-in controllers: deployment, replicaset, node, job, endpoint controllers in one binary), cloud-controller-manager (cloud-specific logic: LoadBalancer provisioning, node lifecycle).",
    deep:
      "The API server is stateless — all state is in etcd. etcd uses Raft consensus — requires a quorum of (n/2)+1 nodes to be available. For HA, run 3 or 5 etcd members. etcd is sensitive to disk latency — use SSDs. The scheduler is pluggable — custom schedulers can be run alongside the default. The controller manager runs a leader election to ensure only one instance is active in HA setups. All components communicate only via the API server — no direct communication between scheduler, etcd, and controllers. This is how kubectl watch works: long-polling /watch on the API server.",
    interviewAnswer:
      "The control plane has four main components: (1) API server — the only component that talks to etcd, validates all requests; (2) etcd — the distributed store holding all cluster state; (3) scheduler — watches for unscheduled pods, picks nodes based on resources, affinity, taints; (4) controller manager — runs reconciliation loops for all built-in resources. The API server is the central hub — all other components and kubelets communicate through it. If etcd loses quorum, the cluster can still serve existing workloads but can't accept changes.",
    trap:
      "The control plane doesn't run workloads by default (master nodes are tainted). Losing etcd doesn't immediately kill running pods — kubelet manages pods locally. But you can't create, update, or delete anything until the control plane recovers.",
    memoryAnchor:
      "Control plane = airport control tower. API server = the single radio frequency everyone talks on. etcd = the flight log book. Scheduler = the gate agent assigning planes to runways. Controller manager = the crew making sure every flight matches the schedule board.",
  },
  {
    id: "node-components",
    title: "Node Components",
    category: "k8s-architecture",
    basic:
      "Each worker node runs kubelet (pod lifecycle manager), kube-proxy (network rules), and a container runtime (containerd/CRI-O).",
    expected:
      "kubelet: registers the node, watches the API server for pods assigned to this node, starts/stops/monitors containers via the CRI, reports pod status back. kube-proxy: maintains iptables (or ipvs) rules for Service VIPs — routes traffic to the correct pod endpoints. Container runtime: containerd (or CRI-O) — implements CRI to actually manage container lifecycle. Node conditions: Ready, MemoryPressure, DiskPressure, PIDPressure.",
    deep:
      "kubelet uses a PodSpec from the API server (or static pod manifests in /etc/kubernetes/manifests — how control plane components are bootstrapped with kubeadm). kubelet talks to containerd via gRPC. kube-proxy in IPVS mode is more scalable than iptables for large clusters (thousands of services) — uses hash tables O(1) vs iptables O(n) chain traversal. eBPF-based alternatives (Cilium) replace kube-proxy entirely — no iptables, lower latency. Node allocatable resources = node capacity minus system reserved minus kube reserved — this is the actual schedulable capacity.",
    interviewAnswer:
      "Every node has three things: kubelet (talks to API server, manages pod lifecycle, reports health), kube-proxy (maintains iptables/IPVS rules for Service routing), and a container runtime (containerd). kubelet is the most critical — it's the local agent that actually starts and stops containers based on what the API server says. kube-proxy translates Service IPs into pod IPs. For large clusters, replace kube-proxy with Cilium (eBPF) for better scalability.",
    trap:
      "kube-proxy doesn't proxy traffic — it just sets up iptables rules that the kernel uses. The word 'proxy' is misleading. Traffic goes directly from client to pod — not through kube-proxy. kube-proxy just programs the routing.",
    memoryAnchor:
      "kubelet = the on-site foreman at each construction site (node), taking orders from HQ (API server) and managing the workers (containers). kube-proxy = the guy who paints road signs — doesn't direct traffic himself, just sets up the signs so cars (packets) know where to go.",
  },
  {
    id: "reconciliation-loop",
    title: "Reconciliation Loop & Declarative Model",
    category: "k8s-architecture",
    basic:
      "You declare desired state (YAML). Controllers continuously compare desired state to actual state and take action to close the gap.",
    expected:
      "Every Kubernetes resource has a spec (desired) and a status (actual). Controllers watch the API server for changes to their resource type, read the current state, compare to desired, and take actions. This is level-triggered (not edge-triggered) — controllers react to the current state, not events. This means controllers are idempotent and self-healing by design. If a controller crashes and restarts, it re-reads all state and converges to the right answer.",
    deep:
      "The watch mechanism: controllers use the API server's watch API (long-polling with resource version). Informers (client-go) provide a local cache + watch for efficiency. The reconcile loop: observe (read current state), diff (compare to desired), act (create/update/delete resources). Custom controllers (operators) follow the same pattern. The operator pattern: encode domain knowledge about managing stateful applications (PostgreSQL, Kafka) into a controller that automates Day-2 operations like backups, failover, schema migrations. Finalizers prevent resource deletion until cleanup actions complete — preventing orphaned resources.",
    interviewAnswer:
      "Kubernetes is declarative — you tell it what you want, not how to do it. Controllers run infinite reconcile loops: read desired state from spec, read actual state, compute the diff, take action. This makes the system self-healing: if a pod crashes, the ReplicaSet controller sees 'desired=3, actual=2' and creates a new pod. This model means you can safely apply the same YAML repeatedly — it converges, not accumulates.",
    trap:
      "kubectl apply is not a one-time command — it's a declaration. If the current state differs from the desired (because someone manually changed something), the next apply will correct it. This is why direct kubectl edit in production is dangerous — the next apply overwrites it.",
    memoryAnchor:
      "Reconciliation = a thermostat. You declare 72 degrees (desired state). The thermostat constantly checks: too cold? Heat. Too hot? Cool. It doesn't remember what it did last — it just reads the thermometer and acts. Kubernetes is a thermostat for infrastructure.",
  },

  // ── Workloads ────────────────────────────────────────────────────────────────
  {
    id: "pod",
    title: "Pod",
    category: "workloads",
    basic:
      "The smallest deployable unit in Kubernetes. A pod is one or more containers that share a network namespace and storage volumes.",
    expected:
      "Containers in a pod share: the same IP, loopback, and port space (communicate via localhost), mounted volumes. Pods are ephemeral — they're not rescheduled to new nodes; a new pod is created. Pod lifecycle: Pending → Running → Succeeded/Failed. Pod phases vs container states are different. Never deploy pods directly — use a controller (Deployment, StatefulSet) so they're managed.",
    deep:
      "The pause container (infra container) creates and holds the network namespace — other containers join it. This is why all containers in a pod share the same IP. Sidecar pattern: co-locate a helper container (logging agent, proxy, config reloader) that shares the same pod network and volumes. Init containers run to completion before app containers start — used for setup, database migration checks, secret injection. Pod QoS classes: Guaranteed (requests == limits), Burstable (requests < limits), BestEffort (no requests/limits) — affects eviction order under node memory pressure. Ephemeral containers (kubectl debug) let you inject a debugging container into a running pod.",
    interviewAnswer:
      "A pod is a group of containers that share a network and storage. They communicate via localhost — no service discovery needed within a pod. The pod gets one IP. Sidecars are a critical pattern: service meshes (Istio, Linkerd) inject a proxy sidecar into every pod to handle TLS, retries, and observability without changing your app code. Always use a controller (Deployment, StatefulSet) to manage pods — naked pods don't get rescheduled if their node fails.",
    trap:
      "Pods are ephemeral. When a pod is deleted or evicted, it's gone — a new pod with a new IP is created. Never hard-code pod IPs. Always use Services (stable virtual IPs with DNS) to reach pods.",
    memoryAnchor:
      "Pod = a lunch table. Containers in the same pod are coworkers sharing one table — same IP (table number), same food (volumes), talking over lunch (localhost). But the table is disposable: if someone spills coffee, you get a NEW table, not a cleaned one.",
  },
  {
    id: "deployment",
    title: "Deployment & ReplicaSet",
    category: "workloads",
    basic:
      "A Deployment manages a ReplicaSet which ensures a specified number of identical pod replicas are running. Deployments enable rolling updates and rollbacks.",
    expected:
      "Deployment → manages → ReplicaSet → manages → Pods. Rolling update strategy (default): creates a new ReplicaSet, scales it up while scaling down the old one. maxSurge (extra pods during update) and maxUnavailable (pods that can be down) control the rollout speed. kubectl rollout status deployment/name, rollout undo for rollback. Recreate strategy: kills all pods then starts new ones (downtime, use when old and new versions can't run simultaneously).",
    deep:
      "Deployments keep a history of ReplicaSets (revisionHistoryLimit, default 10). kubectl rollout undo rolls back to the previous ReplicaSet — the old RS is scaled up and new RS is scaled down. kubectl rollout undo --to-revision=N for specific version. Each rollout creates a new ReplicaSet (even if the template didn't change). Deployment pauses: kubectl rollout pause lets you apply multiple changes before triggering a rollout — prevents thrashing. minReadySeconds: pod must be Ready for this duration before being considered available — prevents premature traffic. The Deployment controller ensures the desired replica count even during node failures.",
    interviewAnswer:
      "A Deployment is what you use for stateless apps. It manages ReplicaSets which manage pods. Rolling updates create a new ReplicaSet and gradually shift traffic from old to new — zero downtime. maxSurge and maxUnavailable control the speed. For rollback: kubectl rollout undo deployment/name. The history of ReplicaSets is kept so you can roll back to any previous version. Key: set readiness probes — rolling updates only proceed when new pods pass their readiness check. A bad deployment with no readiness probe will happily roll out broken pods.",
    trap:
      "A Deployment rollback undoes the pod template change — it does NOT rollback your application's database migrations or any external state changes. Rollbacks are partial — only the container image and pod spec revert.",
    memoryAnchor:
      "Deployment = a rolling restaurant shift change. New waiters (pods) arrive one by one, old waiters leave as new ones prove they can carry plates (readiness). maxSurge = how many extra waiters on the floor at once. Rollback = calling the old crew back in.",
  },
  {
    id: "statefulset",
    title: "StatefulSet",
    category: "workloads",
    basic:
      "StatefulSet manages stateful applications. Unlike Deployments, pods get stable network identities and persistent storage that follow them across rescheduling.",
    expected:
      "Stable features: (1) Ordered pod names (app-0, app-1, app-2), (2) Stable DNS hostname per pod via headless service (app-0.svc.namespace.svc.cluster.local), (3) Dedicated PVC per pod that persists even when the pod is deleted. Ordered deployment: pods start sequentially (0, then 1, then 2) and terminate in reverse. Required: a headless service (clusterIP: None) for DNS. Use for: databases (MySQL, MongoDB), distributed systems (Kafka, ZooKeeper, etcd), any app needing stable identity.",
    deep:
      "VolumeClaimTemplates in the StatefulSet spec create a PVC per pod — the PVC is NOT deleted when the pod is deleted or the StatefulSet is scaled down. You must manually delete PVCs. This prevents accidental data loss. Pod Management Policy: OrderedReady (default, sequential) vs Parallel (all at once, for stateless-like stateful apps). Update strategy: RollingUpdate with partition N only updates pods with index >= N — useful for canary upgrades of stateful apps. Headless service DNS: each pod gets an A record. The StatefulSet's own service (if clusterIP != None) gets the normal VIP.",
    interviewAnswer:
      "StatefulSets are for apps that need persistent identity — databases, message queues. Each pod gets a sticky name (app-0, app-1), a stable DNS hostname, and a dedicated PVC that survives pod restarts. This is how Kafka knows which broker is which across restarts. The key difference from Deployment: pods are NOT interchangeable. app-0 is always app-0 with its own data. PVCs are NOT auto-deleted when you scale down — you must clean them up manually.",
    trap:
      "Deleting a StatefulSet does NOT delete its PVCs — data is retained deliberately. You'll accumulate orphaned PVCs with their storage costs if you don't clean them up after deleting a StatefulSet.",
    memoryAnchor:
      "StatefulSet = assigned seating at a wedding. Each guest (pod) has a name card (app-0, app-1), a personal locker (PVC), and a reserved parking spot (stable DNS). Deployment guests are interchangeable — sit anywhere. StatefulSet guests are VIPs with permanent reservations.",
  },
  {
    id: "daemonset-job",
    title: "DaemonSet, Job & CronJob",
    category: "workloads",
    basic:
      "DaemonSet runs one pod per node. Job runs a task to completion. CronJob runs a Job on a schedule.",
    expected:
      "DaemonSet: exactly one pod on every node (or matching nodes). Use for: log collectors (fluentd, filebeat), monitoring agents (node-exporter), CNI plugins, storage drivers. Automatically adds pods to new nodes. Job: runs pods until the desired number of completions succeed (parallelism, completions fields). Useful for batch processing, database migrations. CronJob: creates Jobs on a cron schedule. concurrencyPolicy: Allow, Forbid, or Replace if the previous run hasn't finished.",
    deep:
      "DaemonSet pods bypass normal scheduling — they use the node's available resources without competing through the scheduler. DaemonSet update strategies: RollingUpdate (default) and OnDelete (only update when you manually delete the pod). Job failure policy: backoffLimit (retry count), activeDeadlineSeconds (timeout). Job completionMode: NonIndexed (default) vs Indexed (each pod gets an index — for sharded work). CronJob history: successfulJobsHistoryLimit and failedJobsHistoryLimit (defaults 3 and 1). CronJob startingDeadlineSeconds: if a job missed its schedule window, don't start it.",
    interviewAnswer:
      "DaemonSet is for infrastructure agents — you need exactly one per node for things like log collection, metrics scraping, or CNI. Job is for finite tasks — database migrations, report generation. CronJob wraps a Job with a cron schedule. Key CronJob gotcha: if the cluster is down during a scheduled time, it catches up based on startingDeadlineSeconds — you may get multiple jobs running at once unless you set concurrencyPolicy: Forbid.",
    trap:
      "Completed Job pods are NOT automatically deleted. They remain in Completed state until the Job's TTL (ttlSecondsAfterFinished) or manual cleanup. Without TTL cleanup, completed pods accumulate and hit cluster object limits.",
    memoryAnchor:
      "DaemonSet = placing one security guard on every floor of a building (one per node). Job = hiring a temp worker to move boxes, then they leave. CronJob = the cleaning crew that shows up every Tuesday at 9 PM on a schedule.",
  },

  // ── Kubernetes Networking ─────────────────────────────────────────────────────
  {
    id: "services",
    title: "Services",
    category: "k8s-networking",
    basic:
      "A Service provides a stable virtual IP (ClusterIP) and DNS name for a set of pods selected by a label selector. It load-balances traffic across matching pods.",
    expected:
      "Service types: ClusterIP (internal-only VIP, default), NodePort (exposes on a port on every node, 30000-32767), LoadBalancer (provisions a cloud load balancer, builds on NodePort+ClusterIP), ExternalName (CNAME alias for an external hostname). DNS: service-name.namespace.svc.cluster.local. Endpoints (or EndpointSlices in modern K8s) are the list of pod IPs backing a service — updated by the endpoint controller as pods come and go.",
    deep:
      "kube-proxy watches Endpoints and programs iptables DNAT rules: traffic to ClusterIP:port gets DNAT'd to one of the pod IPs. In IPVS mode, uses Linux IP Virtual Server for O(1) routing vs O(n) iptables. Service without selector: you manage Endpoints manually — useful for external databases or cross-namespace routing. Headless service (clusterIP: None): DNS returns pod IPs directly, no VIP, no kube-proxy routing. Used with StatefulSets. Session affinity: sessionAffinity: ClientIP makes the same client IP always hit the same pod (5-minute sticky session). Topology-aware routing: prefer local zone pods for latency reduction.",
    interviewAnswer:
      "Services give pods a stable identity. Pods are ephemeral with changing IPs — Services are stable. ClusterIP for internal service-to-service. NodePort/LoadBalancer for external traffic. The service selector uses labels — any pod with matching labels becomes an endpoint. The kube-proxy on each node programs iptables rules so traffic to the ClusterIP gets load-balanced to pod IPs. Services are the DNS record + stable VIP layer on top of ephemeral pods.",
    trap:
      "A Service doesn't automatically wait for pods to be ready. If a pod is in the Endpoints list but its readiness probe is failing, traffic still won't reach it — but only if you've defined a readiness probe. Without readiness probes, traffic goes to pods immediately on start, before they're ready.",
    memoryAnchor:
      "Service = a restaurant's phone number that never changes, even when chefs (pods) quit and new ones are hired. ClusterIP = the internal kitchen extension. NodePort = a side door. LoadBalancer = the valet entrance. The phone number (DNS) always works.",
  },
  {
    id: "ingress",
    title: "Ingress & Ingress Controllers",
    category: "k8s-networking",
    basic:
      "Ingress is a Kubernetes resource that defines HTTP/HTTPS routing rules. An Ingress Controller (nginx, traefik, AWS ALB) implements those rules.",
    expected:
      "Ingress routes external HTTP traffic to Services based on hostname and path. TLS termination via secretName in the TLS block. path types: Prefix (/api matches /api, /api/v1) vs Exact (/api only matches /api). ingressClassName specifies which controller handles this Ingress. Multiple controllers can run in the same cluster with different classes. Ingress aggregates multiple Services behind one load balancer — vs one LoadBalancer Service per app.",
    deep:
      "The Ingress resource is just a spec — it does nothing without an Ingress Controller. nginx-ingress watches Ingress objects and dynamically updates nginx.conf. AWS ALB Ingress Controller provisions an Application Load Balancer per Ingress. Cert-manager automates TLS certificate issuance (Let's Encrypt) via annotations on Ingress resources. Rate limiting, auth, CORS — all configurable via controller-specific annotations. Gateway API (new): more expressive than Ingress, splits responsibilities into GatewayClass, Gateway, HTTPRoute — designed to replace Ingress long-term.",
    interviewAnswer:
      "Ingress decouples routing rules from infrastructure — you define host/path routing in YAML, the Ingress Controller implements it in nginx/envoy/ALB. This lets you have hundreds of services behind one cloud load balancer instead of one LB per service. TLS is handled at the Ingress Controller — your backend services speak plain HTTP. Cert-manager + Ingress is the standard for automated Let's Encrypt certificates. For production, use nginx-ingress or the cloud-native controller (ALB, GCE).",
    trap:
      "Creating an Ingress resource without an Ingress Controller installed does nothing — the resource exists but no routing is configured. This is a common source of confusion when setting up a new cluster.",
    memoryAnchor:
      "Ingress = the hotel front desk that routes guests to rooms. 'api.example.com/v1' goes to Room 101 (service A), '/v2' goes to Room 202 (service B). Without an Ingress Controller, the front desk is just an empty counter with no receptionist.",
  },
  {
    id: "network-policy-dns",
    title: "NetworkPolicy & DNS",
    category: "k8s-networking",
    basic:
      "NetworkPolicy is a pod-level firewall — controls which pods can talk to which other pods. DNS is provided by CoreDNS — pods resolve services by name.",
    expected:
      "By default, all pods can communicate with all other pods in the cluster (no NetworkPolicy = allow all). NetworkPolicy selects pods via podSelector and controls ingress/egress with rules. Empty podSelector ({}) matches all pods in the namespace. DNS: service-name resolves within the same namespace. service-name.namespace resolves cross-namespace. FQDN: service-name.namespace.svc.cluster.local. Pod DNS: pod-ip.namespace.pod.cluster.local.",
    deep:
      "NetworkPolicy is implemented by the CNI plugin — not all CNIs support it (Flannel doesn't natively; Calico, Cilium, WeaveNet do). A default-deny policy (empty ingress: [] block) denies all ingress to selected pods — explicit policies must open specific ports. Egress policies control outbound too. Default-deny all + explicit allowlist is the secure baseline. CoreDNS runs as a Deployment in kube-system. ndots:5 in /etc/resolv.conf: Pod DNS searches for short names with up to 5 dots added before trying the absolute name — can cause extra DNS queries. DNS caching: node-local DNS cache (NodeLocal DNSCache) reduces CoreDNS load in large clusters.",
    interviewAnswer:
      "NetworkPolicy is Kubernetes' microsegmentation — you can restrict which pods talk to which, down to port level. By default there are no restrictions. To implement least-privilege: (1) apply a default-deny policy to the namespace, (2) explicitly allow needed traffic. Important: NetworkPolicy only works if your CNI supports it — Calico or Cilium are the standard choices. DNS is provided by CoreDNS — services are reachable by short name within the same namespace, or fully-qualified name across namespaces.",
    trap:
      "NetworkPolicy is NOT a firewall for all cluster traffic — it only applies to pod-to-pod and pod-to-service traffic. Traffic from outside the cluster (via Ingress/NodePort) is not controlled by NetworkPolicy directly. Also, NetworkPolicy does nothing if the CNI doesn't support it — installing policies on a Flannel cluster has no effect.",
    memoryAnchor:
      "NetworkPolicy = velvet ropes at a club. By default, no ropes (everyone talks to everyone). Adding a policy = putting up ropes and a bouncer who checks your label-badge. CoreDNS = the club's intercom system — 'service-name, you have a visitor at the front.'",
  },

  // ── Storage & Config ──────────────────────────────────────────────────────────
  {
    id: "pv-pvc",
    title: "PersistentVolumes, PVCs & StorageClass",
    category: "storage-config",
    basic:
      "PersistentVolume (PV) is the actual storage. PersistentVolumeClaim (PVC) is a request for storage. StorageClass enables dynamic provisioning.",
    expected:
      "Workflow: (1) Admin creates PV (or StorageClass for dynamic provisioning). (2) User creates PVC requesting size, access mode, and StorageClass. (3) Kubernetes binds the PVC to a matching PV. (4) Pod mounts the PVC as a volume. Access modes: ReadWriteOnce (one node), ReadOnlyMany (many nodes read), ReadWriteMany (many nodes read+write), ReadWriteOncePod (one pod, K8s 1.22+). Reclaim policies: Retain (manual cleanup), Delete (auto-delete PV when PVC deleted), Recycle (deprecated).",
    deep:
      "Dynamic provisioning: StorageClass defines a provisioner (kubernetes.io/aws-ebs, kubernetes.io/gce-pd, driver.longhorn.io). When a PVC is created with a StorageClass, the provisioner automatically creates the PV and underlying storage. volumeBindingMode: WaitForFirstConsumer delays PV provisioning until a pod requests the PVC — ensures the PV is created in the same availability zone as the pod. Volume snapshots (CSI): VolumeSnapshot API for backup workflows. CSI (Container Storage Interface) is the plugin standard — all major storage vendors implement CSI drivers. Local volumes: hostPath (development only) vs local PV (production, uses specific node paths, requires nodeAffinity on the PV).",
    interviewAnswer:
      "PVCs are how applications request storage without knowing the backend. The separation of PV (infrastructure concern) from PVC (application concern) is intentional — developers write PVCs, admins or StorageClasses handle PVs. In cloud environments, use a StorageClass with dynamic provisioning — EBS for AWS, PD for GCP. Use WaitForFirstConsumer binding mode to ensure the PV lands in the same availability zone as the pod. For databases, ReadWriteOnce with a block storage PV is the standard — it gives performance comparable to a local disk.",
    trap:
      "ReadWriteOnce means one node, not one pod. Multiple pods on the same node can mount an RWO volume simultaneously. For single-pod exclusivity, use ReadWriteOncePod (K8s 1.22+). Also, scaling a StatefulSet down does NOT release PVCs — they remain bound and billing continues.",
    memoryAnchor:
      "PV = a storage unit at a facility. PVC = a rental agreement ('I need 10GB, read-write'). StorageClass = the facility manager who auto-assigns units. You sign the agreement (PVC), the manager (StorageClass) finds or builds you a unit (PV).",
  },
  {
    id: "configmap-secret",
    title: "ConfigMap & Secrets",
    category: "storage-config",
    basic:
      "ConfigMap stores non-sensitive configuration as key-value pairs. Secret stores sensitive data (passwords, tokens, keys) as base64-encoded values.",
    expected:
      "Both can be consumed as: (1) environment variables (envFrom or env.valueFrom), (2) files in a volume mount. ConfigMap: plain text, not encrypted. Secret: base64 encoded (NOT encrypted by default in etcd). Production must enable etcd encryption at rest or use an external secrets manager (HashiCorp Vault, AWS Secrets Manager) with sealed-secrets or external-secrets operator. Secret types: Opaque (generic), kubernetes.io/dockerconfigjson (registry auth), kubernetes.io/tls (TLS cert+key).",
    deep:
      "Volume-mounted Secrets auto-update when the Secret is updated — without pod restart (with a ~1 minute delay). Environment variable-injected Secrets do NOT auto-update — require pod restart. This makes volume mounts better for rotating credentials. immutable: true on ConfigMap/Secret prevents accidental updates and improves kube-apiserver performance (no watches needed). RBAC restricts which pods can read which Secrets — use per-service ServiceAccounts with minimal permissions. Workload identity (EKS IRSA, GKE Workload Identity) eliminates static credentials entirely — pods get cloud credentials via service account token projection.",
    interviewAnswer:
      "ConfigMaps for config, Secrets for credentials — that's the split. Both mount as files or env vars. Critical security point: Secrets are only base64 encoded in etcd by default — readable by anyone with etcd access. Enable encryption at rest, or better, use external-secrets operator to pull from AWS Secrets Manager or Vault. For rotating credentials without pod restarts, use volume-mounted Secrets — they update automatically. For database passwords, the modern approach is workload identity + IAM roles, eliminating static secrets entirely.",
    trap:
      "base64 is NOT encryption. It's encoding. Anyone who can kubectl get secret -o yaml can read every value in 2 seconds. Treat RBAC access to Secrets as access to plaintext credentials. Use namespace-scoped Roles to restrict secret access to only the pods that need it.",
    memoryAnchor:
      "ConfigMap = a sticky note on the fridge ('DB_HOST=postgres'). Secret = the same sticky note but written in pig latin — base64 is NOT a lock, it's just backwards writing anyone can read. You need Vault or encryption at rest for an actual safe.",
  },

  // ── Scheduling & Security ─────────────────────────────────────────────────────
  {
    id: "resources-limits",
    title: "Resource Requests & Limits",
    category: "scheduling-security",
    basic:
      "Requests are the guaranteed minimum resources for scheduling. Limits are the maximum a container can use. Both are set per container, not per pod.",
    expected:
      "CPU: requests used for scheduling (scheduler finds nodes with sufficient remaining capacity). CPU limit enforced via cgroup CPU throttling — exceeding the limit slows the process, not kills it. Memory: requests for scheduling. Memory limit enforced via cgroup OOM killer — exceeding kills the container (OOMKilled). Formats: CPU in millicores (500m = 0.5 CPU), memory in Mi/Gi. QoS classes: Guaranteed (request==limit for all containers), Burstable (at least one container has a request), BestEffort (no requests or limits) — Guaranteed pods are evicted last under node pressure.",
    deep:
      "CPU throttling: a container with limit 1000m and requesting 2000m of actual CPU gets throttled to 1000m — it runs at 50% of its requested speed. This is a common performance issue with tight CPU limits. Memory overcommit is dangerous — if the node runs out of memory, the OOM killer evicts pods based on QoS class and actual usage. LimitRange sets default requests/limits for a namespace (important: without LimitRange, containers with no requests get BestEffort QoS and are first evicted). ResourceQuota limits total resource consumption per namespace. Vertical Pod Autoscaler (VPA) recommends or auto-adjusts requests based on actual usage. Horizontal Pod Autoscaler (HPA) scales replica count based on CPU/memory or custom metrics.",
    interviewAnswer:
      "Always set resource requests and limits. Requests tell the scheduler how much capacity to reserve — no requests means BestEffort QoS and first-evicted under pressure. Limits prevent runaway processes from starving neighbors. CPU limits cause throttling (process slows), memory limits cause OOMKill (process dies). A common production issue: tight CPU limits cause request latency spikes even when CPUs are underutilized — because the cgroup throttles the container mid-request. Set CPU limits conservatively or leave them unset for latency-sensitive services.",
    trap:
      "CPU limits cause throttling, not kills. A container repeatedly hitting its CPU limit will show high CPU throttle % in metrics but not OOMKill. This is a silent performance issue — the pod stays Running but responds slowly. Monitor cpu_throttled_seconds_total.",
    memoryAnchor:
      "Requests = your reserved table at a restaurant (guaranteed). Limits = the buffet plate size. CPU limit = small plate (you eat slower but survive). Memory limit = the bouncer at the door (exceed it and you get THROWN OUT — OOMKilled). CPU throttles, memory kills.",
  },
  {
    id: "affinity-taints",
    title: "Affinity, Taints & Tolerations",
    category: "scheduling-security",
    basic:
      "Taints repel pods from nodes. Tolerations let pods be scheduled on tainted nodes. Affinity/anti-affinity express preferences or requirements for node or pod co-location.",
    expected:
      "Taints: kubectl taint nodes node1 key=value:NoSchedule|PreferNoSchedule|NoExecute. Tolerations in pod spec to override taints. nodeSelector: simplest way to constrain pods to nodes with specific labels. nodeAffinity: richer expressions (In, NotIn, Exists, Gt, Lt) with requiredDuringScheduling (hard) vs preferredDuringScheduling (soft). podAffinity/podAntiAffinity: co-locate or spread pods relative to other pods.",
    deep:
      "NoSchedule: don't schedule new pods without tolerations (existing pods stay). PreferNoSchedule: avoid scheduling if possible. NoExecute: evict existing pods without matching tolerations. Node problem detector taints nodes with memory-pressure, disk-pressure, etc. automatically. topologySpreadConstraints (preferred over podAntiAffinity for spreading): spread pods evenly across zones/nodes with a maxSkew. This is critical for HA — using podAntiAffinity with requiredDuringScheduling prevents scheduling if it can't find a different node, potentially leaving pods unscheduled. topologySpreadConstraints with whenUnsatisfiable: DoNotSchedule vs ScheduleAnyway is more flexible.",
    interviewAnswer:
      "Taints + tolerations are for restricting which pods CAN run on a node — dedicated GPU nodes, Windows nodes, spot instances. Affinity is for expressing preferences — keep frontend pods away from database pods (anti-affinity), or co-locate cache with app (affinity). For spreading pods across availability zones for HA, use topologySpreadConstraints — it's more ergonomic than podAntiAffinity and handles scaling gracefully. Control plane nodes are tainted node-role.kubernetes.io/control-plane:NoSchedule by default.",
    trap:
      "podAntiAffinity with requiredDuringSchedulingIgnoredDuringExecution can make a Deployment unschedulable. If you require each pod on a different node but have more replicas than nodes, the scheduler can't place all pods. Use preferredDuringScheduling or topologySpreadConstraints with ScheduleAnyway to handle this gracefully.",
    memoryAnchor:
      "Taints = 'WET PAINT' signs on park benches (nodes). Only pods with tolerations (rain jackets) can sit there. Affinity = 'I want to sit NEAR the playground.' Anti-affinity = 'Keep me AWAY from that noisy kid.' topologySpreadConstraints = 'Spread kids evenly across all playgrounds.'",
  },
  {
    id: "rbac",
    title: "RBAC",
    category: "scheduling-security",
    basic:
      "Role-Based Access Control restricts who (users, ServiceAccounts) can do what (verbs) on which resources in Kubernetes.",
    expected:
      "Four objects: Role (namespaced, defines permissions), ClusterRole (cluster-wide), RoleBinding (grants Role to subjects in a namespace), ClusterRoleBinding (grants ClusterRole cluster-wide). Subjects: User, Group, ServiceAccount. Verbs: get, list, watch, create, update, patch, delete. Pods use their ServiceAccount's token to authenticate to the API server. Default ServiceAccount in each namespace — avoid using it, create dedicated per-workload ServiceAccounts.",
    deep:
      "RBAC is additive — no deny rules. If a subject has no binding for a resource, access is denied (default deny). ClusterRole can be bound to a namespace via RoleBinding — useful for granting cluster-wide role definitions (like view) to specific namespaces. Aggregated ClusterRoles (aggregationRule) automatically include rules from ClusterRoles with matching labels — used to extend built-in roles. ServiceAccount token projection: projected volumes with expiry (short-lived tokens, rotated automatically). Workload identity (EKS IRSA, GKE Workload Identity) links Kubernetes ServiceAccounts to cloud IAM roles — the pod gets short-lived cloud credentials without storing secrets. Audit logs capture every API call with user, resource, verb — critical for security forensics.",
    interviewAnswer:
      "RBAC is Kubernetes' authorization layer. You define what a ServiceAccount (or user) can do via Role + RoleBinding. Always create dedicated ServiceAccounts per workload with minimal permissions — don't use the default ServiceAccount. For cross-namespace access, use ClusterRole + RoleBinding scoped to the target namespace. For cloud resource access from pods, use workload identity (IRSA on EKS) rather than static credentials. Audit RBAC regularly — overly permissive roles are the most common K8s security misconfiguration.",
    trap:
      "Mounting the default ServiceAccount token gives the pod access to the Kubernetes API with the default SA's permissions — which is often more than needed. Set automountServiceAccountToken: false on pods that don't need API access, and use dedicated minimal-permission SAs for those that do.",
    memoryAnchor:
      "RBAC = a building keycard system. Role = 'this card opens doors 1-5.' RoleBinding = 'give this card to Alice.' ClusterRole = 'master key for ALL floors.' The default ServiceAccount is like giving every new employee the janitor's master key — always issue specific keycards instead.",
  },
  {
    id: "probes",
    title: "Liveness & Readiness Probes",
    category: "scheduling-security",
    basic:
      "Liveness probe: is the container alive? If it fails, kill and restart the container. Readiness probe: is the container ready to serve traffic? If it fails, remove from Service endpoints.",
    expected:
      "Probe types: httpGet (GET request to a path), tcpSocket (TCP connection), exec (run command inside container, exit 0 = success), grpc (gRPC health check). Parameters: initialDelaySeconds (wait before first probe), periodSeconds (interval), failureThreshold (fails before action), successThreshold (successes to recover). Startup probe: for slow-starting containers — disables liveness during startup, prevents premature restarts.",
    deep:
      "Liveness failure → container restart (not pod eviction) → increments restart count → eventually CrashLoopBackOff with exponential backoff. Readiness failure → pod removed from Endpoints → no traffic (pod keeps Running). Common pattern: /healthz returns 200 immediately (liveness), /ready returns 200 when dependencies (DB, cache) are reachable (readiness). PodDisruptionBudget (PDB): minAvailable or maxUnavailable ensures a minimum number of ready pods during voluntary disruptions (node drain, rolling updates). Without PDB, draining a node can take all replicas offline simultaneously. Readiness gate: additional conditions beyond container readiness — used by service meshes and load balancers to signal pod ready for traffic from their perspective.",
    interviewAnswer:
      "Liveness and readiness serve different purposes. Liveness restarts containers that are stuck — infinite loop, deadlock, corrupted internal state. Readiness controls traffic — remove the pod from load balancing while it's initializing, warming up caches, or temporarily degraded. Always define both. For readiness, check actual dependencies — can the app reach its database? Startup probe prevents liveness from killing a slow-starting container during initial boot. PodDisruptionBudget ensures rolling updates and node drains don't take all your pods offline at once.",
    trap:
      "A failing liveness probe that also makes readiness fail will cause a restart loop — pod gets removed from endpoints, restarts, removed again, restarts. This amplifies an outage. Keep liveness checks lightweight and infrastructure-only (is the process alive?). Put business logic checks in readiness probes only.",
    memoryAnchor:
      "Liveness = poking someone to check if they're ALIVE ('hey, are you breathing?'). If not, call 911 (restart). Readiness = asking 'are you READY to work?' If not, don't send them customers, but don't kill them either. Startup probe = 'still getting dressed? I won't poke you yet.'",
  },
];

// ─── Interview Patterns ───────────────────────────────────────────────────────

export const interviewPatterns: InterviewPattern[] = [
  {
    question: "Walk me through what happens when you run kubectl apply -f deployment.yaml",
    answer:
      "kubectl sends the YAML to the API server via HTTP PUT/POST. The API server validates, authenticates, authorizes, and admits the request (webhook admission controllers run here). The object is persisted to etcd. The Deployment controller, watching the API server, sees the new/changed Deployment and creates or updates a ReplicaSet. The ReplicaSet controller sees the RS and creates Pods. The scheduler watches for unscheduled pods, picks nodes, and writes nodeName to each pod. The kubelet on the selected node watches for pods assigned to it, pulls the image via containerd, and starts the container.",
    whyAsked:
      "Tests end-to-end understanding of the Kubernetes control plane. Reveals how deeply the candidate understands the reconciliation model.",
    trap:
      "Saying 'the deployment starts the containers directly'. There are 5 distinct components involved: API server, etcd, Deployment controller, scheduler, kubelet. Each one's role matters.",
  },
  {
    question: "A pod is in CrashLoopBackOff — how do you debug it?",
    answer:
      "kubectl describe pod <name> to see events (image pull errors, OOMKilled, failed probes, failed mounts). kubectl logs <name> --previous to see logs from the last crash. Common causes: (1) OOMKilled — increase memory limit. (2) Bad entrypoint/command — check Dockerfile CMD vs pod spec command. (3) Missing config — env var or secret not found. (4) Liveness probe failing immediately — check initialDelaySeconds. (5) Application startup bug — check --previous logs. kubectl debug -it <pod> --image=busybox to attach a debugging container.",
    whyAsked: "Classic operational question. Tests debugging methodology and kubectl knowledge.",
    trap:
      "Only looking at kubectl get pods status. The events in kubectl describe pod are essential — they tell you what actually went wrong (ImagePullBackOff, OOMKilled, 0/1 nodes available).",
  },
  {
    question: "How do Services route traffic to Pods?",
    answer:
      "A Service has a stable ClusterIP and a label selector. The Endpoints controller watches for pods matching the selector and maintains an Endpoints object with their IPs and ports. kube-proxy on each node watches the Endpoints object and programs iptables DNAT rules: traffic to ClusterIP:port gets randomly load-balanced to one of the pod IPs. CoreDNS resolves service names to ClusterIPs. Pod-to-pod traffic goes directly — no proxy involved at runtime.",
    whyAsked: "Tests networking depth. Essential for debugging connectivity issues.",
    trap:
      "kube-proxy doesn't actually proxy traffic. It programs iptables rules so the kernel handles the DNAT. Traffic goes directly from source to pod IP — kube-proxy is only involved at rule setup time, not per-packet.",
  },
  {
    question: "When would you use a StatefulSet vs a Deployment?",
    answer:
      "Deployment: stateless replicas, any pod is interchangeable, horizontal scaling is trivial. StatefulSet: each pod needs a stable identity — a specific PVC, a stable hostname, ordered startup/shutdown. Use StatefulSet for: databases (MySQL, PostgreSQL, MongoDB), distributed coordination (ZooKeeper, etcd), message queues with durable storage (Kafka). The stable hostname (pod-0.headless-svc) lets cluster members find each other by DNS. The dedicated PVC per pod ensures data follows the pod across rescheduling.",
    whyAsked: "Tests understanding of K8s workload types. Common source of production bugs when stateful apps are run as Deployments.",
    trap:
      "Running a database as a Deployment. Multiple pods will each write to the same PVC (if RWX) or compete for the same RWO PVC. A StatefulSet gives each replica its own dedicated PVC.",
  },
  {
    question: "How would you design a zero-downtime deployment in Kubernetes?",
    answer:
      "Use a Deployment with RollingUpdate strategy. Set meaningful maxUnavailable (e.g., 0) and maxSurge (e.g., 1 or 25%). Define a readiness probe — the rollout only proceeds when new pods pass readiness. Set minReadySeconds to ensure pods are stable before proceeding. Set a PodDisruptionBudget to ensure minimum availability during rollouts and node drains. Configure a preStop hook (sleep 5) to drain in-flight requests before the container receives SIGTERM. Ensure your app handles SIGTERM gracefully and finishes in-flight requests within terminationGracePeriodSeconds.",
    whyAsked:
      "Tests production-readiness knowledge. Rolling updates without these configurations can cause traffic errors during deploys.",
    trap:
      "Just setting RollingUpdate is not enough. Without readiness probes, traffic goes to pods before they're ready. Without preStop hooks, pods get killed mid-request. Both are needed for truly zero-downtime deploys.",
  },
  {
    question: "How does Kubernetes handle secret management and what are the security risks?",
    answer:
      "Secrets are base64-encoded (not encrypted) in etcd by default. Anyone with API access and RBAC rights to read Secrets sees plaintext data. Mitigations: (1) Enable etcd encryption at rest (EncryptionConfiguration). (2) Use external-secrets operator + AWS Secrets Manager/Vault — secrets never live in etcd. (3) Use workload identity (IRSA/GKE WI) for cloud service credentials — no static keys at all. (4) Restrict Secret RBAC with per-SA roles. (5) Use sealed-secrets for GitOps workflows.",
    whyAsked: "Security-focused question. Tests whether candidate understands K8s security gaps vs just the API.",
    trap:
      "Saying 'Secrets are encrypted in Kubernetes'. By default they're only base64-encoded. Encryption at rest requires explicit cluster configuration. Most clusters run without it unless explicitly enabled.",
  },
  {
    question: "How do you right-size resource requests and limits?",
    answer:
      "Start with VPA in recommendation mode — it analyzes actual usage and suggests requests. Set requests to the P95 of actual usage over 2-4 weeks. Set memory limits close to requests (memory is non-compressible — OOMKill is better than node pressure eviction). Leave CPU limits loose or unset for latency-sensitive services — CPU throttling causes latency spikes. Use LimitRange to enforce namespace defaults and prevent BestEffort pods. Monitor cpu_throttled_seconds and container_oom_events metrics.",
    whyAsked: "Practical ops knowledge. Resource misconfiguration is the most common cause of cluster instability.",
    trap:
      "Setting memory requests too low causes pod eviction under node memory pressure. Setting CPU limits too tight causes throttling and latency. The right approach is data-driven — measure first, then set.",
  },
  {
    question: "What is the difference between a liveness probe and a readiness probe?",
    answer:
      "Liveness: is the container still alive and functional? Failure → restart the container. Use for: deadlocks, infinite loops, unrecoverable internal state. Readiness: is the container ready to serve traffic? Failure → remove from Service endpoints. Use for: startup initialization, dependency checks (can I reach the DB?), temporary degradation. They serve opposite failure modes: liveness handles containers that need a restart; readiness handles containers that need to temporarily stop receiving traffic.",
    whyAsked: "Core Kubernetes operational knowledge. Getting this wrong causes either restart storms or traffic errors.",
    trap:
      "Using a liveness probe that checks external dependencies (e.g., 'can I connect to the database?'). If the database goes down, all pods restart — which doesn't fix the database and causes a thundering herd. Liveness should only check if the process itself is healthy.",
  },
];

// ─── Common Mistakes ──────────────────────────────────────────────────────────

export const commonMistakes: CommonMistake[] = [
  {
    wrong: "Using the latest tag in production",
    correct: "Always pin image tags to a specific digest or semver (e.g., myapp:1.4.2). latest is mutable — the same tag can pull different images on different nodes or restarts",
  },
  {
    wrong: "Running pods without resource requests and limits",
    correct: "No requests = BestEffort QoS = first evicted under node pressure. No limits = runaway process can starve neighbors. Always set both",
  },
  {
    wrong: "Running a stateful database as a Deployment",
    correct: "Use StatefulSet for anything with persistent state. Deployment replicas are interchangeable — StatefulSet replicas have stable identities and dedicated PVCs",
  },
  {
    wrong: "Assuming Secrets are encrypted",
    correct: "Secrets are base64-encoded by default in etcd, not encrypted. Enable encryption at rest or use external-secrets with Vault/AWS Secrets Manager",
  },
  {
    wrong: "Not setting readiness probes on web services",
    correct: "Without a readiness probe, the Service adds the pod to endpoints on start — before it's ready. Traffic hits the pod while it's still initializing, causing errors",
  },
  {
    wrong: "Using docker build with ADD when COPY is sufficient",
    correct: "ADD auto-extracts tarballs and fetches URLs unexpectedly. Use COPY for simple file copying — it's explicit and predictable",
  },
  {
    wrong: "apt-get install and apt-get clean in separate RUN layers",
    correct: "Each RUN creates a new layer. Cleaning in a later layer adds a whiteout but the original bytes remain. Combine: RUN apt-get update && apt-get install -y pkg && rm -rf /var/lib/apt/lists/*",
  },
  {
    wrong: "Putting secrets in Dockerfile ARG or ENV",
    correct: "ARG values are baked into the image history (docker history shows them). Use BuildKit secret mounts: RUN --mount=type=secret,id=key",
  },
  {
    wrong: "Using depends_on in Docker Compose and assuming the service is ready",
    correct: "depends_on only waits for the container to start, not for the service inside to be ready. Use depends_on with condition: service_healthy and a healthcheck",
  },
  {
    wrong: "Using kubectl edit in production for configuration changes",
    correct: "kubectl edit bypasses GitOps and change tracking. Store manifests in Git, use kubectl apply or a CD tool (ArgoCD, Flux). Direct edits get overwritten on the next apply",
  },
  {
    wrong: "Scaling a StatefulSet down without cleaning up PVCs",
    correct: "PVCs are not auto-deleted when StatefulSet pods are removed. Orphaned PVCs continue to incur storage costs. Manually delete PVCs after scaling down",
  },
  {
    wrong: "Exposing services with NodePort in production",
    correct: "NodePort exposes a random port on every node and doesn't scale well. Use LoadBalancer (cloud) or Ingress for production external traffic",
  },
];

// ─── Practice Questions ───────────────────────────────────────────────────────

export const practiceQuestions: PracticeQuestion[] = [
  {
    question: "What is wrong with this Dockerfile? How would you fix it?",
    code: `FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y python3 pip

COPY . /app

RUN pip install -r /app/requirements.txt

CMD ["python3", "/app/main.py"]`,
    answer: "3 problems:\n1. 'latest' tag — pin to ubuntu:22.04 or use python:3.11-slim instead.\n2. apt-get update in a separate layer — if the cache is stale, the next RUN installs from outdated lists. Combine: RUN apt-get update && apt-get install -y python3 pip && rm -rf /var/lib/apt/lists/*\n3. COPY . /app before pip install — any source change invalidates the pip install cache. Fix order: COPY requirements.txt /app/requirements.txt → RUN pip install → COPY . /app",
  },
  {
    question: "A Deployment has 3 replicas. You scale it to 0 and back to 3. What happens to pod IPs?",
    code: `kubectl scale deployment/myapp --replicas=0
kubectl scale deployment/myapp --replicas=3`,
    answer: "The new 3 pods get entirely new IPs — pods are ephemeral. The Service ClusterIP stays the same. Endpoints are updated as new pods become Ready. This is why you should never hardcode pod IPs — always use the Service DNS name (myapp.namespace.svc.cluster.local).",
  },
  {
    question: "What QoS class does this pod have? What happens first under node memory pressure?",
    code: `containers:
- name: app
  resources:
    requests:
      memory: "128Mi"
      cpu: "250m"
    limits:
      memory: "256Mi"
      cpu: "500m"`,
    answer: "QoS class: Burstable (requests != limits).\n\nUnder memory pressure, eviction order is: BestEffort (no requests) → Burstable (requests < limits) → Guaranteed (requests == limits).\n\nThis pod would be evicted after BestEffort pods but before Guaranteed pods. To make it Guaranteed: set requests == limits for both CPU and memory.",
  },
  {
    question: "This Service has no endpoints. The app pod is Running. What's the likely cause?",
    code: `# Service
selector:
  app: myapp
  tier: frontend

# Pod labels
labels:
  app: myapp
  environment: prod`,
    answer: "Label mismatch. The Service selector requires app=myapp AND tier=frontend. The pod has app=myapp but is missing tier=frontend. The endpoint controller only adds pods that match ALL selector labels.\n\nFix: add tier: frontend to the pod labels, or remove tier: frontend from the Service selector.",
  },
  {
    question: "What happens when this pod starts?",
    code: `spec:
  initContainers:
  - name: wait-for-db
    image: busybox
    command: ['sh', '-c', 'until nc -z db-service 5432; do echo waiting; sleep 2; done']
  containers:
  - name: app
    image: myapp:1.0
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 5`,
    answer: "1. The init container starts and loops until db-service:5432 accepts TCP connections.\n2. Once the DB is reachable, the init container exits 0.\n3. Only then does the app container start.\n4. After 5 seconds (initialDelaySeconds), liveness probes begin.\n\nInit containers always run to completion before app containers start — this is the correct pattern for waiting on external dependencies.",
  },
  {
    question: "How many replicas can be unavailable during this rolling update, and when does the rollout proceed to the next pod?",
    code: `strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0
replicas: 4`,
    answer: "maxUnavailable: 0 means no pods can be down during the update.\nmaxSurge: 1 means 1 extra pod above the desired count (5 pods total at peak).\n\nRollout proceeds: create 1 new pod (total=5) → wait for it to be Ready → remove 1 old pod (total=4) → repeat.\n\nThe rollout proceeds to the next pod ONLY when the new pod passes its readiness probe. Without a readiness probe, Kubernetes assumes the pod is ready immediately — dangerous for slow-starting apps.",
  },
  {
    question: "This NetworkPolicy is applied to the database namespace. What traffic does it allow?",
    code: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
  namespace: database
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: production
    ports:
    - port: 5432`,
    answer: "Allows: ingress traffic to pods labeled role=db in the 'database' namespace, on port 5432, from any pod in namespaces labeled name=production.\n\nBlocks: all other ingress to role=db pods (default deny for pods covered by a NetworkPolicy).\n\nNote: egress is NOT specified — egress is still unrestricted (default allow for egress unless policyTypes includes Egress).\n\nRequirement: the 'production' namespace must have the label name=production for this to work.",
  },
  {
    question: "A pod keeps getting OOMKilled. You have the following metrics. What do you change?",
    code: `# Current config
resources:
  requests:
    memory: "64Mi"
  limits:
    memory: "64Mi"

# Observed metrics
container_memory_working_set_bytes: ~60Mi (average)
container_memory_working_set_bytes: ~80Mi (peak, during GC)`,
    answer: "The memory limit of 64Mi is too tight — peak usage hits 80Mi during GC, triggering OOMKill.\n\nFix:\n- Set requests to ~64Mi (covers average usage, used for scheduling)\n- Set limits to ~128Mi (2x average, headroom for GC spikes)\n\nGeneral rule: set memory limits to at least 1.5-2x P99 working set. For JVM apps, set Xmx well below the limit to leave room for JVM overhead.",
  },
];

// ─── Last Hour Summary ────────────────────────────────────────────────────────

const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "Containers = Linux namespaces (isolation) + cgroups (resource limits). Docker packages apps; Kubernetes orchestrates them at scale.",
    "Control Plane (API server, etcd, scheduler, controller-manager) manages desired state. Nodes run kubelet + container runtime to execute it.",
    "Pod is the smallest deployable unit — one or more tightly-coupled containers sharing network/storage. Never manage Pods directly; use Deployments.",
    "Deployment manages a ReplicaSet which manages Pods — rolling updates, rollbacks, and scaling all go through the Deployment spec.",
    "Services give Pods a stable virtual IP (ClusterIP). NodePort/LoadBalancer expose externally. Ingress does HTTP routing on top of Services.",
    "Requests = scheduling guarantee (what the node must have free). Limits = hard cap (container is killed/throttled if exceeded). Always set both.",
    "Readiness probe gates traffic (Service won't route to unready pods). Liveness probe restarts stuck pods. Startup probe protects slow-starting apps.",
  ],
  mustKnowConcepts: [
    { name: "Control Plane", oneLiner: "API server + etcd + scheduler + controller-manager — watches actual state, drives it toward desired state." },
    { name: "Pod", oneLiner: "Smallest K8s unit — shares network namespace; containers communicate on localhost. Ephemeral by design." },
    { name: "Deployment", oneLiner: "Manages ReplicaSet + rolling updates + rollbacks. Set strategy.rollingUpdate for maxSurge/maxUnavailable." },
    { name: "Service (ClusterIP)", oneLiner: "Stable virtual IP + DNS name for a set of pods. kube-proxy implements it via iptables/IPVS rules." },
    { name: "Requests & Limits", oneLiner: "CPU: throttled at limit. Memory: OOMKilled at limit. Requests determine scheduling; limits cap usage." },
    { name: "Readiness / Liveness", oneLiner: "Readiness gates traffic (endpoint removed if failing). Liveness restarts container if failing. Don't conflate them." },
  ],
  topTraps: [
    "Running pods directly instead of through a Deployment — they won't self-heal or roll back on failure.",
    "Setting memory limit == request with no headroom — JVM / GC spikes will OOMKill the container.",
    "Forgetting that ConfigMap changes don't auto-restart pods — you need a rollout restart or a config hash annotation.",
    "Using liveness probe to check external dependencies — if the DB is down, your app restarts endlessly doing nothing.",
    "Exposing secrets as env vars (visible in logs, crash dumps) — prefer secretKeyRef with strict RBAC or a secrets manager.",
  ],
};

// ─── Topic Data Export ────────────────────────────────────────────────────────

export const topicData: TopicData = {
  topicTitle: "Kubernetes & Docker",
  topicMeta: "50–60 min · Mid to Senior level",
  lastUpdated: "2026-04-10",
  lastHourConceptIds: [
    "control-plane",
    "pod",
    "deployment",
    "services",
    "configmap-secret",
    "resources-limits",
    "probes",
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
