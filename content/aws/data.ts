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
    "AWS is a collection of cloud services organized around compute (EC2, Lambda, ECS/EKS), storage (S3, EBS, EFS), networking (VPC, Route53, CloudFront, ALB/NLB), databases (RDS, DynamoDB, ElastiCache), and platform services (SQS, SNS, EventBridge, CloudFormation). The mental model is a data center as an API: you provision and configure infrastructure via JSON/YAML or code rather than physical hardware. Every resource lives in a Region (geographic area with multiple Availability Zones) and is identified by an ARN. IAM is the authorization layer that governs what any principal (user, role, service) can do to any resource.",
  whyItExists:
    "Before cloud, companies had to buy, rack, and maintain physical servers — months of lead time, massive capital expense, and unused capacity when demand was low. AWS (launched 2006 with S3 and EC2) turned infrastructure into a utility: pay per use, provision in seconds, scale elastically, and trade CapEx for OpEx. The shared responsibility model means AWS secures the physical infrastructure and hypervisor; customers secure their OS, apps, and data.",
  whenToUse: [
    "Variable workloads that need to scale up and down — EC2 Auto Scaling, Lambda for spiky traffic",
    "Global applications — Route53 latency routing + CloudFront CDN + multi-region RDS",
    "Event-driven architectures — SQS, SNS, EventBridge for decoupled microservices",
    "Serverless to minimize operational overhead — Lambda + API Gateway + DynamoDB",
    "Machine learning workloads — SageMaker, Bedrock, GPU EC2 instances",
    "Disaster recovery — S3 cross-region replication, RDS Multi-AZ, Route53 failover",
  ],
  whereItFails: [
    "Predictable, steady-state workloads — Reserved Instances help but on-prem can be cheaper",
    "Extreme compliance requirements — some regulations mandate data sovereignty that multi-tenant cloud can't satisfy",
    "Ultra-low latency edge computing — even CloudFront edge has ~10 ms; private backbone may be needed",
    "Cost predictability — autoscaling plus data transfer costs create bill surprises if not managed carefully",
    "Vendor lock-in for proprietary services — migrating from DynamoDB or Lambda to another provider is non-trivial",
  ],
};

// ─── Categories ───────────────────────────────────────────────────────────────
const categories: CategoryMeta[] = [
  {
    id: "compute",
    label: "Compute",
    description:
      "EC2 instance types, Auto Scaling, ECS/EKS, Lambda execution model — choosing and sizing compute resources",
  },
  {
    id: "storage",
    label: "Storage",
    description:
      "S3 storage classes, lifecycle policies, EBS volume types, EFS — durable and scalable object, block, and file storage",
  },
  {
    id: "networking",
    label: "Networking & CDN",
    description:
      "VPC design, subnets, security groups, NACLs, ALB vs NLB, Route53 routing policies, CloudFront edge caching",
  },
  {
    id: "security-iam",
    label: "Security & IAM",
    description:
      "IAM policies, roles, STS AssumeRole, least privilege, resource-based vs identity-based policies, KMS, Secrets Manager",
  },
  {
    id: "databases",
    label: "Databases",
    description:
      "RDS Multi-AZ and read replicas, DynamoDB partition keys, GSI/LSI, ElastiCache Redis vs Memcached — managed database services",
  },
  {
    id: "iac",
    label: "Infrastructure as Code",
    description:
      "CloudFormation stacks, templates, drift detection, CDK constructs, change sets, stack policies",
  },
  {
    id: "serverless",
    label: "Serverless & Event-Driven",
    description:
      "Lambda cold starts, concurrency, SQS/SNS/EventBridge, API Gateway, Step Functions — event-driven and serverless patterns",
  },
  {
    id: "observability",
    label: "Monitoring & Observability",
    description:
      "CloudWatch metrics, alarms, log groups, X-Ray tracing, CloudTrail audit logs — visibility into AWS workloads",
  },
];

// ─── Mental Model Tree ────────────────────────────────────────────────────────
const mentalModelTree: TreeNode = {
  id: "root",
  label: "AWS / Cloud",
  nodeType: "category",
  importance: "critical",
  children: [
    {
      id: "cat-compute",
      label: "Compute",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-ec2", label: "EC2 & Auto Scaling", nodeType: "concept", conceptId: "ec2-auto-scaling", importance: "critical" },
        { id: "node-lambda", label: "Lambda", nodeType: "concept", conceptId: "lambda", importance: "critical" },
        { id: "node-ecs-eks", label: "ECS & EKS", nodeType: "concept", conceptId: "ecs-eks", importance: "high" },
      ],
    },
    {
      id: "cat-storage",
      label: "Storage",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-s3", label: "S3", nodeType: "concept", conceptId: "s3", importance: "critical" },
        { id: "node-ebs", label: "EBS & EFS", nodeType: "concept", conceptId: "ebs-efs", importance: "high" },
      ],
    },
    {
      id: "cat-networking",
      label: "Networking",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-vpc", label: "VPC & Subnets", nodeType: "concept", conceptId: "vpc-subnets", importance: "critical" },
        { id: "node-sg-nacl", label: "Security Groups & NACLs", nodeType: "concept", conceptId: "security-groups-nacls", importance: "critical" },
        { id: "node-alb-nlb", label: "ALB vs NLB", nodeType: "concept", conceptId: "alb-vs-nlb", importance: "high" },
        { id: "node-route53", label: "Route53", nodeType: "concept", conceptId: "route53", importance: "high" },
        { id: "node-cloudfront", label: "CloudFront", nodeType: "concept", conceptId: "cloudfront", importance: "high" },
      ],
    },
    {
      id: "cat-iam",
      label: "Security & IAM",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-iam-policies", label: "IAM Policies & Roles", nodeType: "concept", conceptId: "iam-policies-roles", importance: "critical" },
        { id: "node-sts", label: "STS & AssumeRole", nodeType: "concept", conceptId: "sts-assumerole", importance: "high" },
        { id: "node-kms", label: "KMS & Secrets Manager", nodeType: "concept", conceptId: "kms-secrets", importance: "high" },
      ],
    },
    {
      id: "cat-databases",
      label: "Databases",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-rds", label: "RDS Multi-AZ & Replicas", nodeType: "concept", conceptId: "rds", importance: "critical" },
        { id: "node-dynamodb", label: "DynamoDB", nodeType: "concept", conceptId: "dynamodb", importance: "critical" },
        { id: "node-elasticache", label: "ElastiCache", nodeType: "concept", conceptId: "elasticache", importance: "high" },
      ],
    },
    {
      id: "cat-iac",
      label: "Infrastructure as Code",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-cloudformation", label: "CloudFormation", nodeType: "concept", conceptId: "cloudformation", importance: "critical" },
        { id: "node-cdk", label: "AWS CDK", nodeType: "concept", conceptId: "aws-cdk", importance: "high" },
      ],
    },
    {
      id: "cat-serverless",
      label: "Serverless",
      nodeType: "category",
      importance: "critical",
      children: [
        { id: "node-sqs-sns", label: "SQS & SNS", nodeType: "concept", conceptId: "sqs-sns", importance: "critical" },
        { id: "node-eventbridge", label: "EventBridge", nodeType: "concept", conceptId: "eventbridge", importance: "high" },
        { id: "node-api-gateway", label: "API Gateway", nodeType: "concept", conceptId: "api-gateway", importance: "high" },
        { id: "node-step-functions", label: "Step Functions", nodeType: "concept", conceptId: "step-functions", importance: "medium" },
      ],
    },
    {
      id: "cat-observability",
      label: "Observability",
      nodeType: "category",
      importance: "high",
      children: [
        { id: "node-cloudwatch", label: "CloudWatch", nodeType: "concept", conceptId: "cloudwatch", importance: "critical" },
        { id: "node-xray", label: "X-Ray", nodeType: "concept", conceptId: "xray", importance: "medium" },
      ],
    },
  ],
};

// ─── Concepts ─────────────────────────────────────────────────────────────────
const concepts: Concept[] = [
  // ── Compute ──
  {
    id: "ec2-auto-scaling",
    title: "EC2 & Auto Scaling",
    category: "compute",
    basic:
      "EC2 provides virtual machines in the cloud with configurable CPU, memory, storage, and networking. Auto Scaling Groups (ASGs) automatically adjust the number of instances based on demand using scaling policies.",
    expected:
      "EC2 instance families: general purpose (M, T series), compute optimized (C series), memory optimized (R, X series), storage optimized (I, D series), accelerated (P, G series for GPU). Purchasing options: On-Demand (pay per hour), Reserved Instances (1–3 year commit, up to 72% discount), Spot Instances (up to 90% discount, can be interrupted with 2-minute warning), Savings Plans (flexible Reserved). ASG uses launch templates, min/max/desired capacity, and scaling policies — target tracking (maintain CPU at 50%), step scaling, or scheduled scaling.",
    deep:
      "ASG health checks can use EC2 status checks or ELB health checks. ELB health checks are preferred — they catch application-level failures, not just instance crashes. Instance refresh allows rolling updates with configurable minimum healthy percentage. Warm pools pre-warm instances so they can launch quickly without cold-start delay. Lifecycle hooks let you run custom actions before an instance enters or leaves service (e.g., deregister from service registry). EC2 Placement Groups: Cluster (same AZ, low latency — HPC), Spread (different hardware — maximum availability), Partition (groups of instances on separate racks — Hadoop/Kafka). Instance metadata service (IMDS) v2 requires session tokens, preventing SSRF attacks that could steal credentials from the metadata endpoint.",
    interviewAnswer:
      "EC2 offers a spectrum of instance types for different workloads — C series for compute, R for memory, P/G for GPU. I choose On-Demand for unpredictable workloads, Reserved for steady-state, and Spot for fault-tolerant batch jobs. Auto Scaling Groups with target tracking keep costs elastic — I set the ASG to maintain 60-70% CPU, which gives headroom for spikes. I always use ELB health checks in the ASG, not EC2 checks, to catch application failures.",
    trap:
      "Using EC2 health checks in an ASG instead of ELB health checks. EC2 checks only detect instance-level failures (hardware, OS crash). If your app hangs or returns 500s, EC2 checks still show healthy and the ASG never replaces the broken instance.",
    memoryAnchor:
      "EC2 is a vending machine — pick your snack (instance type), insert coins (On-Demand), or buy a monthly pass (Reserved). Auto Scaling is a store manager who opens more checkouts at rush hour and closes them when it's quiet.",
  },
  {
    id: "lambda",
    title: "AWS Lambda",
    category: "compute",
    basic:
      "Lambda runs code in response to events without provisioning servers. You pay only for compute time consumed (duration × memory). Functions can be triggered by API Gateway, S3 events, SQS, EventBridge, DynamoDB Streams, and more.",
    expected:
      "Execution environment: each invocation gets a micro-VM (Firecracker). Cold starts occur when a new execution environment is initialized — typically 100ms–1s depending on runtime and package size. Warm starts reuse the existing environment, including global variables and database connection pools. Concurrency: reserved concurrency caps executions for a function; provisioned concurrency pre-warms environments to eliminate cold starts. Memory: 128MB–10GB; CPU scales proportionally with memory. Timeout: max 15 minutes. Deployment package: 50MB zipped, 250MB unzipped; layers for shared dependencies.",
    deep:
      "Lambda's concurrency model: burst limit (3,000 in us-east-1/us-west-2/eu-west-1; 1,000 in most other regions; 500 in some), then 500 additional per minute. Account-level concurrency limit (default 1,000). Throttled invocations return HTTP 429; async invocations retry twice before sending to a dead-letter queue or EventBridge Pipes. Lambda SnapStart (Java) pre-initializes and snapshots the execution environment, reducing cold starts to under 1 second. Lambda@Edge and CloudFront Functions run at edge locations. VPC-attached Lambda used to add ~10s to cold starts for ENI creation, but Hyperplane ENIs (2019+) reduced this to near-negligible latency via shared networking infrastructure. For long-running jobs, Lambda is wrong — use ECS Fargate tasks or AWS Batch.",
    interviewAnswer:
      "Lambda is event-driven compute where you pay per execution. Cold starts are the key operational challenge — I address them with provisioned concurrency for latency-sensitive functions and Lambda SnapStart for Java. I keep handler code thin, initialization code outside the handler (reused on warm starts), and avoid VPC unless necessary. For anything beyond 15 minutes, I use ECS Fargate. For API workloads, Lambda + API Gateway gives automatic scaling with zero instance management.",
    trap:
      "Initializing heavy objects (DB connections, SDK clients) inside the handler — they get re-created on every invocation. Initialize outside the handler to reuse on warm invocations. Also, Lambda timeouts shorter than API Gateway's 29-second timeout will cause misleading errors to API callers.",
    memoryAnchor:
      "Lambda is a taxi on demand — you call (invoke), it shows up (execution environment), completes the trip (runs your code), then waits. If no one calls for a while, the taxi goes home (environment terminates). Cold start is waiting for the first taxi to arrive.",
  },
  {
    id: "ecs-eks",
    title: "ECS & EKS",
    category: "compute",
    basic:
      "ECS (Elastic Container Service) is AWS's native container orchestrator. EKS (Elastic Kubernetes Service) is managed Kubernetes. Both can run on EC2 (you manage nodes) or Fargate (serverless containers — AWS manages the underlying infrastructure).",
    expected:
      "ECS concepts: Task Definition (like a Dockerfile for a multi-container app), Service (maintains desired count, integrates with ALB), Cluster (logical grouping). EKS: managed control plane (API server, etcd) with self-managed or managed node groups or Fargate. Fargate eliminates node management but costs more per vCPU than EC2. Choose ECS for simpler AWS-native workloads; choose EKS for Kubernetes portability, existing K8s tooling, or to avoid vendor lock-in.",
    deep:
      "ECS on Fargate: task-level IAM roles via task IAM role (not instance profile). ECS Service Connect provides service-to-service discovery and observability. ECS Exec lets you exec into running containers for debugging (uses SSM Session Manager, no open ports needed). EKS: control plane is fully managed and HA across AZs; karpenter provides fast, cost-optimized node provisioning. EKS Blueprints and ACK (AWS Controllers for Kubernetes) let you manage AWS resources from Kubernetes. Cost comparison: ECS Fargate is simpler but ~30% more expensive than EC2 for equivalent workloads; EKS on EC2 with Karpenter + Spot can be very cost-efficient.",
    interviewAnswer:
      "ECS is AWS-native and simpler; EKS is for teams already invested in Kubernetes or needing portability. Both support Fargate for serverless operation. For greenfield AWS apps, I prefer ECS Fargate for its simplicity. For organizations with existing Kubernetes expertise or multi-cloud requirements, EKS makes sense. Task IAM roles in ECS provide per-task permissions — I always use these over instance profiles to follow least privilege.",
    trap:
      "Assigning permissions via the EC2 instance profile in ECS instead of the task IAM role. This grants all tasks on the instance the same permissions rather than per-task least privilege, creating a security risk.",
    memoryAnchor:
      "ECS is a managed restaurant with a fixed menu (AWS orchestration). EKS is a restaurant where you supply your own chef (Kubernetes) but AWS owns the building. Fargate is food delivery — no kitchen management needed.",
  },

  // ── Storage ──
  {
    id: "s3",
    title: "Amazon S3",
    category: "storage",
    basic:
      "S3 is infinitely scalable object storage. Objects are stored in buckets with globally unique names. S3 provides 11 nines (99.999999999%) durability by storing data across multiple AZs within a region.",
    expected:
      "Storage classes: Standard (frequent access), Intelligent-Tiering (auto-moves between tiers based on access patterns), Standard-IA (infrequent access, 30-day minimum), One Zone-IA (single AZ, cheaper, no HA), Glacier Instant Retrieval, Glacier Flexible Retrieval (minutes to hours), Glacier Deep Archive (12-hour retrieval, cheapest). Lifecycle policies automate transitions. S3 versioning protects against accidental deletes. MFA Delete requires MFA for permanent deletes. Server-side encryption: SSE-S3 (AWS-managed keys), SSE-KMS (customer-controlled keys), SSE-C (customer-provided keys).",
    deep:
      "S3 is eventually consistent for overwrites and deletes by default (strong consistency was added for new and overwritten objects in 2020 — S3 now provides strong read-after-write consistency for all operations). S3 Transfer Acceleration uses CloudFront edge locations to accelerate uploads. Multipart upload is required for objects > 5GB and recommended for > 100MB. S3 Replication: Cross-Region Replication (CRR) for DR and compliance; Same-Region Replication (SRR) for log aggregation and test environment seeding. S3 Object Lambda lets you transform data on read — apply image resizing or PII masking without storing multiple copies. S3 Select queries within objects using SQL expressions, reading only a subset of data.",
    interviewAnswer:
      "S3 is my default for binary/blob storage — images, logs, backups, static assets, ML datasets. I select storage classes by access pattern: Standard for hot data, Intelligent-Tiering for uncertain patterns, Glacier for archives. I enable versioning for production buckets, block public access by default, and use bucket policies + IAM for access control. For encryption, I use SSE-KMS when I need audit trails and key rotation control.",
    trap:
      "Claiming S3 is eventually consistent — before December 2020 this was true for overwrites and deletes, but since then S3 provides strong read-after-write consistency for all operations at no extra cost. Candidates who memorized older material still design unnecessary workarounds (polling, delays) for a problem that no longer exists.",
    memoryAnchor:
      "S3 is an infinite filing cabinet — any drawer (bucket), any folder, any file size. Each drawer has a lock (bucket policy), and you can set the papers to self-destruct after a set time (lifecycle policy).",
  },
  {
    id: "ebs-efs",
    title: "EBS & EFS",
    category: "storage",
    basic:
      "EBS (Elastic Block Store) provides persistent block storage volumes for EC2 instances — like a hard drive attached to a single instance. EFS (Elastic File System) is a managed NFS file system that can be mounted by multiple EC2 instances simultaneously.",
    expected:
      "EBS volume types: gp3 (general purpose SSD, baseline 3,000 IOPS, independently configurable), io2 Block Express (highest performance, sub-millisecond latency, 256,000 IOPS — for databases), st1 (throughput-optimized HDD, sequential workloads), sc1 (cold HDD, cheapest, archives). EBS volumes are AZ-specific — to move, take a snapshot and restore in another AZ. EFS scales automatically, supports concurrent access from thousands of instances, and spans AZs within a region. EFS Infrequent Access storage class reduces cost for files not accessed recently.",
    deep:
      "EBS Multi-Attach allows io1/io2 volumes to be attached to multiple EC2 instances simultaneously within the same AZ — requires a cluster-aware filesystem (GFS2, not ext4) to prevent data corruption. EBS snapshots are incremental and stored in S3 (managed by AWS). EBS-optimized instances provide dedicated bandwidth to EBS, preventing network contention. EFS performance modes: General Purpose (latency-sensitive) and Max I/O (highly parallelized workloads). EFS throughput modes: Bursting (proportional to storage), Provisioned (independent of storage), and Elastic (auto-scales throughput). Instance store (ephemeral) provides the highest I/O performance but data is lost on stop/terminate — ideal for temp files, caches, and scratch data.",
    interviewAnswer:
      "EBS is attached to one instance, like a local disk. I use gp3 for most workloads and io2 for latency-sensitive databases. EFS is a shared NFS file system for multi-instance access — content management systems, shared config, machine learning datasets. For highest I/O, instance store (ephemeral) is fastest but non-persistent. I snapshot EBS volumes regularly for backup and cross-AZ migration.",
    trap:
      "Attaching a standard EBS volume to multiple instances. Only io1/io2 support Multi-Attach, and you still need a cluster-aware filesystem. Using ext4 with Multi-Attach causes data corruption.",
    memoryAnchor:
      "EBS is a USB drive — plugs into one computer at a time. EFS is a shared network drive — everyone in the office can access it simultaneously. Instance Store is RAM — blindingly fast but gone when you power off.",
  },

  // ── Networking ──
  {
    id: "vpc-subnets",
    title: "VPC & Subnet Design",
    category: "networking",
    basic:
      "A VPC (Virtual Private Cloud) is an isolated virtual network within AWS. It spans all AZs in a region. Subnets are subdivisions within a single AZ — public subnets have routes to an Internet Gateway; private subnets don't.",
    expected:
      "CIDR planning: use /16 for the VPC (65,536 addresses), /24 for subnets (256 addresses). Public subnet: has an IGW route, instances get public IPs. Private subnet: no IGW route, instances access the internet via NAT Gateway (managed, HA) or NAT Instance (cheaper, self-managed). Route tables control traffic flow. VPC Peering connects two VPCs (no transitive routing). Transit Gateway (TGW) is a hub for connecting many VPCs and on-prem networks. VPC Endpoints let services (S3, DynamoDB) be accessed without traversing the internet.",
    deep:
      "VPC Flow Logs capture IP traffic metadata for security analysis — they don't capture packet payloads. NAT Gateway is AZ-specific — deploy one per AZ for HA, as cross-AZ NAT incurs data transfer costs and a single-AZ NAT is a single point of failure. AWS PrivateLink creates private endpoints for services without peering — traffic never traverses the internet. VPC Sharing (RAM) lets multiple accounts share subnets from a central VPC, reducing the number of VPCs and NAT Gateways. IPv6 subnets always get a public IPv6 CIDR — egress-only IGW provides outbound-only IPv6 access for private resources.",
    interviewAnswer:
      "I design VPCs with a /16 CIDR split into public and private subnets per AZ. Public subnets host load balancers and NAT Gateways; private subnets host compute and databases. NAT Gateways are per-AZ for HA. I use VPC Endpoints for S3 and DynamoDB to keep traffic on AWS's private network. For multi-VPC connectivity, Transit Gateway scales better than full-mesh VPC peering.",
    trap:
      "Deploying a single NAT Gateway in one AZ for all private subnets. If that AZ goes down, all private instances lose internet access. Deploy one NAT Gateway per AZ and route each private subnet to its local NAT Gateway.",
    memoryAnchor:
      "A VPC is a walled city. Public subnets are the market district (facing the road/internet). Private subnets are the residential area. NAT Gateway is the gate guard who lets residents go out but doesn't let strangers walk in.",
  },
  {
    id: "security-groups-nacls",
    title: "Security Groups & NACLs",
    category: "networking",
    basic:
      "Security Groups are stateful virtual firewalls attached to EC2 instances and other resources. NACLs (Network Access Control Lists) are stateless firewalls attached to subnets. Together they provide layered network security.",
    expected:
      "Security Groups: stateful (return traffic automatically allowed), support only allow rules (deny is implicit), evaluated as a whole (all rules), applied at the instance level. NACLs: stateless (return traffic must be explicitly allowed), support both allow and deny rules, rules evaluated in numbered order (lowest first), applied at the subnet level. Typical setup: NACLs for broad subnet-level blocks (blocking a bad IP range), Security Groups for fine-grained instance-level rules.",
    deep:
      "Security Group references: instead of specifying IP ranges, reference another Security Group as a source/destination. This is the canonical pattern for inter-tier communication: the app-tier SG allows inbound on port 8080 from the load-balancer SG — as instances scale, no IP changes needed. Security Groups are region-scoped but VPC-specific. You can reference Security Groups in a peered VPC. NACLs have ephemeral ports consideration: clients use random high ports (1024–65535) for return traffic — NACL outbound rules must allow this range for stateless connections. NACL rules are evaluated numerically; a DENY rule at 100 blocks before an ALLOW at 200.",
    interviewAnswer:
      "Security Groups are stateful instance-level firewalls — return traffic is automatically permitted. NACLs are stateless subnet-level firewalls where you must explicitly allow both inbound and outbound, including ephemeral return ports. I use Security Group references for inter-tier rules rather than IPs, so scaling doesn't require rule updates. NACLs are for coarse subnet-level blocking (specific IP ranges, emergency blocks).",
    trap:
      "Forgetting that NACLs are stateless. If you allow inbound HTTP (port 80), you must also allow outbound on ephemeral ports (1024–65535) for return traffic. Security Groups don't have this problem — they're stateful.",
    memoryAnchor:
      "Security Group is a hotel keycard — your room's door remembers you left so it lets you back in (stateful). NACL is a checkpoint guard — you need a pass to get in AND a different pass to get out (stateless).",
  },
  {
    id: "alb-vs-nlb",
    title: "ALB vs NLB",
    category: "networking",
    basic:
      "ALB (Application Load Balancer) operates at Layer 7 (HTTP/HTTPS) and routes based on URL paths, hostnames, headers, and query strings. NLB (Network Load Balancer) operates at Layer 4 (TCP/UDP/TLS) with ultra-low latency and static IPs.",
    expected:
      "ALB: content-based routing (route /api to one target group, /web to another), supports WebSockets, gRPC, HTTP/2, sticky sessions via cookies, WAF integration, Lambda as a target. NLB: handles millions of requests per second at ultra-low latency, static IPs (one per AZ), preserves source IP, ideal for gaming, IoT, financial trading. NLB supports TLS termination and TCP passthrough. GLB (Gateway Load Balancer) routes traffic through virtual appliances (firewalls, IDS) at Layer 3.",
    deep:
      "ALB connection draining (deregistration delay) gracefully completes in-flight requests before removing a target — default 300 seconds. NLB's static IP enables whitelisting by clients with strict IP firewall rules. NLB can use Elastic IPs for fixed public addresses. ALB access logs stream to S3; NLB uses Flow Logs. ALB provides native authentication via Cognito or OIDC identity providers. ALB has a hard limit of 100 rules per listener; NLB is simpler (one rule type). For microservices, ALB with path routing replaces a need for many NLBs. ALBs preserve client IP in the X-Forwarded-For header; NLBs preserve it at the TCP layer (no header modification).",
    interviewAnswer:
      "ALB for HTTP/HTTPS workloads where I need path-based routing, header inspection, WebSockets, or WAF integration. NLB for TCP/UDP workloads needing ultra-low latency, static IPs, or source IP preservation — databases proxies, gaming servers, financial feeds. NLB is also the choice when clients need to whitelist specific IPs. For most web applications, ALB is the right default.",
    trap:
      "Using NLB for a web application that needs path-based routing. NLB has no concept of HTTP paths — it routes purely on port/IP. You'd need ALB for URL-based routing.",
    memoryAnchor:
      "ALB is a smart mail sorter — reads the address (URL, headers) to decide which bin (target group). NLB is a super-fast conveyor belt — doesn't read labels, just moves massive volume at high speed.",
  },
  {
    id: "route53",
    title: "Route53",
    category: "networking",
    basic:
      "Route53 is AWS's highly available, globally distributed DNS service. It also provides domain registration, health checks, and traffic routing policies for directing user traffic across regions and endpoints.",
    expected:
      "Routing policies: Simple (single resource), Weighted (A/B testing, gradual migration), Latency-based (route to lowest-latency region), Failover (active-passive with health checks), Geolocation (by country/continent), Geoproximity (by distance with bias), Multi-value (up to 8 healthy records), IP-based. Health checks: monitor endpoints every 10 or 30 seconds, trigger failover automatically. Alias records point to AWS resources (ALB, CloudFront, S3 website) with no TTL cost — unlike CNAMEs, Alias records work at the zone apex (naked domain).",
    deep:
      "Route53 Resolver handles DNS resolution within VPCs and between VPCs and on-prem via Resolver Endpoints. Route53 Resolver DNS Firewall blocks DNS queries to known malicious domains. Private Hosted Zones associate DNS records with VPCs — internal-only DNS. DNS failover: when a health check fails, Route53 automatically routes traffic to the standby endpoint within seconds (TTL-dependent). Route53 Traffic Flow provides a visual policy editor for complex multi-policy routing. DNSSEC provides cryptographic signing of DNS records to prevent DNS spoofing. Latency routing uses AWS's internal network latency data, not geographic distance — a closer region isn't always the lowest latency pick.",
    interviewAnswer:
      "Route53 handles DNS with smart routing policies. For multi-region active-active, I use Latency routing with health checks so traffic automatically shifts if one region degrades. For gradual deployments, Weighted routing lets me send 10% to new versions. Alias records for AWS resources avoid CNAME costs and work at the zone apex. Failover routing for active-passive DR automatically promotes the standby when health checks fail.",
    trap:
      "Using latency routing and expecting it to route by geographic proximity. Route53 uses actual measured network latency to AWS regions, not straight-line geographic distance. A geographically closer region can have higher measured latency.",
    memoryAnchor:
      "Route53 is a traffic cop at a city intersection — they can direct cars by shortest path (latency), by neighborhood (geolocation), or weighted between two roads (weighted). They also check if a road is open (health checks) before directing anyone onto it.",
  },
  {
    id: "cloudfront",
    title: "CloudFront CDN",
    category: "networking",
    basic:
      "CloudFront is AWS's content delivery network (CDN) with 400+ edge locations globally. It caches static and dynamic content close to users, reducing latency and origin load. Origins include S3, ALB, EC2, and custom HTTP servers.",
    expected:
      "Cache behavior: defined by path patterns, maps to an origin. Cache key: by default URI + query strings + headers you specify. TTL: Cache-Control max-age from the origin overrides CloudFront defaults. Invalidation removes objects from edge caches (charged after first 1,000/month). Signed URLs and Signed Cookies restrict access to private content. OAC (Origin Access Control) restricts S3 buckets to only accept requests from CloudFront, preventing direct S3 access. Lambda@Edge and CloudFront Functions run code at edge (request/response manipulation, auth, A/B testing).",
    deep:
      "CloudFront's distribution has Price Classes that limit which edge locations are used (reducing cost by excluding expensive regions). Real-Time Logs stream access logs to Kinesis. CloudFront Shield Standard is included; Shield Advanced adds DDoS protection with cost protection guarantees. WAF rules attached to CloudFront apply globally at the edge before traffic reaches the origin. Cache hit ratio is the key operational metric — inspect X-Cache header (Hit from cloudfront vs Miss from cloudfront). For S3 static sites, CloudFront + OAC is the canonical pattern — S3 bucket stays private, CloudFront serves all traffic with HTTPS.",
    interviewAnswer:
      "CloudFront caches content at edge locations to reduce latency and origin load. For static sites, I use S3 + CloudFront with OAC to keep S3 private and serve HTTPS globally. For APIs, CloudFront caches GET responses and provides WAF protection. Lambda@Edge lets me run auth logic at the edge without round-trips to origin. Cache hit ratio is my primary health metric — low hit rates mean cache key tuning or TTL adjustment.",
    trap:
      "Forgetting that CloudFront invalidations have a cost and aren't instant — they propagate to all edge locations within 1-5 minutes. For versioned assets (file.v2.js), use cache-busting filenames instead of invalidations.",
    memoryAnchor:
      "CloudFront is a chain of convenience stores (edge locations) stocking the most popular items from the main warehouse (origin). Most customers grab what they need locally; only unusual requests need the warehouse.",
  },

  // ── Security & IAM ──
  {
    id: "iam-policies-roles",
    title: "IAM Policies & Roles",
    category: "security-iam",
    basic:
      "IAM controls who can do what to which AWS resources. Policies are JSON documents with Effect (Allow/Deny), Action, Resource, and optional Condition. Roles are identities assumed by AWS services, applications, or federated users.",
    expected:
      "Policy types: Identity-based (attached to users/groups/roles), Resource-based (attached to S3 buckets, SQS queues — allows cross-account access), Permissions boundaries (cap maximum permissions a role can have), SCPs (Service Control Policies in Organizations — guardrails across accounts), Session policies (temporary restriction when assuming a role). Policy evaluation: explicit Deny always wins. Otherwise, allow only if explicitly permitted. Least privilege: grant only what's needed. Use roles over long-term credentials.",
    deep:
      "Policy evaluation order: explicit Deny → Organizations SCP → Resource-based policy → Permissions boundary → Identity-based policy. All must allow; any deny blocks. IAM Access Analyzer identifies resources shared with external principals and generates least-privilege policies from CloudTrail activity. IAM Conditions: aws:SourceIp, aws:MultiFactorAuthPresent, aws:RequestedRegion, s3:prefix. Attribute-based access control (ABAC) uses tags as conditions: allow actions only when the resource tag matches the principal tag — scales better than role proliferation. IAM roles for EC2 use instance profiles; roles for Lambda use the execution role. Never embed access keys in code or AMIs.",
    interviewAnswer:
      "IAM is the foundation of AWS security. I always use roles over long-term access keys, apply least privilege by generating policies from CloudTrail activity via Access Analyzer, and use SCPs in Organizations to set account-level guardrails. For cross-account access, I use resource-based policies or role assumption via STS. I use conditions (aws:MultiFactorAuthPresent, aws:SourceIp) to add context-aware restrictions.",
    trap:
      "Thinking that an identity-based Allow policy is sufficient for cross-account S3 access. Both the identity-based policy AND the S3 bucket policy must allow the cross-account principal. One allow alone is insufficient for cross-account resource-based policies.",
    memoryAnchor:
      "IAM is a courthouse: the judge (AWS) checks your ID (identity-based policy), the court rules (SCPs), and the deed to the property (resource-based policy) before granting access. All documents must agree.",
  },
  {
    id: "sts-assumerole",
    title: "STS & AssumeRole",
    category: "security-iam",
    basic:
      "AWS STS (Security Token Service) issues temporary security credentials (access key, secret key, session token) that expire after 15 minutes to 12 hours. AssumeRole is the primary STS action for cross-account access and service delegation.",
    expected:
      "Use cases: EC2 instance assumes a role to access S3 (via instance profile), Lambda assumes its execution role, a developer assumes a production role for a limited time, a CI/CD pipeline in Account A assumes a deployment role in Account B. The trust policy on the role defines who can assume it (the principal). The permission policy defines what they can do. Chaining: you can call AssumeRole to get credentials, then assume another role (with max 1-hour session).",
    deep:
      "STS regional endpoints reduce latency and are more available than the global endpoint. AssumeRoleWithWebIdentity is used by OIDC-compatible identity providers (GitHub Actions, EKS service accounts via IRSA — IAM Roles for Service Accounts). IRSA is the preferred method for pod-level IAM in EKS, replacing node-level IAM which gives all pods the same permissions. External ID prevents confused deputy attacks in cross-account role assumptions by third parties — the third party provides a secret External ID that only they know, preventing other AWS accounts from tricking them into assuming the role.",
    interviewAnswer:
      "STS issues short-lived credentials that expire, eliminating the risk of leaked long-term keys. I use AssumeRole for cross-account deployments — CI/CD in a tooling account assumes deployment roles in each environment account. For EKS, I use IRSA (IAM Roles for Service Accounts) for pod-level IAM instead of node instance profiles. External ID is required when a third-party SaaS needs to assume a role in your account — it prevents confused deputy attacks.",
    trap:
      "Confused deputy problem: without External ID, any AWS account could potentially trick a third-party service into assuming your role because the third party has broad AssumeRole permissions. External ID ensures only the correct third party can assume the role.",
    memoryAnchor:
      "STS is a visitor badge system — you get a temporary badge (credentials) that expires at end of day. AssumeRole is signing in at the front desk; IRSA is a worker badge that only grants access to specific rooms (pods to AWS services).",
  },
  {
    id: "kms-secrets",
    title: "KMS & Secrets Manager",
    category: "security-iam",
    basic:
      "KMS (Key Management Service) manages cryptographic keys for encrypting data at rest and in transit. Secrets Manager stores and automatically rotates sensitive values like database passwords, API keys, and OAuth tokens.",
    expected:
      "KMS: Customer Managed Keys (CMK) — you control key policy, rotation, and deletion. AWS Managed Keys — AWS rotates them automatically. Envelope encryption: data is encrypted with a Data Encryption Key (DEK); the DEK is encrypted with the CMK and stored alongside the data. Only the CMK is in KMS; the DEK is ephemeral. KMS integrates with S3, RDS, EBS, Lambda, Parameter Store. Secrets Manager: stores secrets with automatic rotation via Lambda, versioning, cross-region replication. Parameter Store is free for standard parameters; SecureString parameters use KMS.",
    deep:
      "KMS key policy is a resource-based policy that must explicitly grant the root account access, otherwise the key becomes unmanageable. Key rotation: annual automatic rotation updates the backing key material; data encrypted with old material can still be decrypted (KMS tracks versions). KMS grants allow temporary permission to use a key without modifying the key policy — useful for cross-account scenarios. CloudHSM provides a dedicated hardware security module for compliance (FIPS 140-2 Level 3) when KMS (Level 2) isn't sufficient. Secrets Manager vs Parameter Store: Secrets Manager offers automatic rotation and costs $0.40/secret/month. Parameter Store SecureString is free but requires manual rotation management.",
    interviewAnswer:
      "I use KMS for envelope encryption of data at rest — S3, EBS, RDS all support SSE-KMS. Customer Managed Keys give me key policy control, rotation, and deletion windows. Secrets Manager auto-rotates database credentials via a Lambda function, eliminating hardcoded passwords. For non-sensitive config, Parameter Store is free and sufficient; for credentials needing rotation, Secrets Manager is worth the cost.",
    trap:
      "Deleting a KMS key without disabling it first and waiting 7-30 days. If the key is deleted, all data encrypted with it becomes permanently unrecoverable. Always schedule deletion with the waiting period and monitor for any decrypt calls.",
    memoryAnchor:
      "KMS is a bank's key-making machine — you don't carry the master key (CMK), you just get copies (DEKs) for each safe (encrypted resource). Secrets Manager is a butler who memorizes all your passwords and changes them periodically without telling you the new ones.",
  },

  // ── Databases ──
  {
    id: "rds",
    title: "RDS Multi-AZ & Read Replicas",
    category: "databases",
    basic:
      "RDS (Relational Database Service) is a managed service for relational databases: PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, and Amazon Aurora. Multi-AZ provides high availability; Read Replicas provide read scalability.",
    expected:
      "Multi-AZ: synchronous replication to a standby in another AZ. Automatic failover (typically 1-2 minutes) when the primary fails. Standby is NOT readable — it's only for HA. Read Replicas: asynchronous replication, readable, can be in same region, cross-region, or promoted to standalone. You can have up to 5 read replicas per instance (15 for Aurora). Automated backups: 1–35 day retention, point-in-time recovery. Manual snapshots: retained until deleted. RDS Proxy: pools and shares database connections, reducing connection overhead for Lambda workloads.",
    deep:
      "Aurora is AWS's cloud-native relational database: 5x faster than MySQL, 3x faster than PostgreSQL, auto-scaling storage up to 128 TB, up to 15 low-latency read replicas, global database with cross-region replication in under 1 second. Aurora Serverless v2 scales compute to 0.5 ACUs, ideal for variable workloads. RDS Performance Insights provides a query-level view of database load. Multi-AZ DB Cluster (for MySQL/PostgreSQL) uses semi-synchronous replication to two standbys and allows reads on standbys — a compromise between Multi-AZ HA and read replica performance. RDS IAM authentication lets you use IAM roles for DB auth, eliminating password management.",
    interviewAnswer:
      "Multi-AZ is for high availability — synchronous standby in another AZ with automatic failover. Read Replicas are for read scalability — direct reporting queries and analytics there. For production, I use Aurora for its speed, auto-scaling storage, and fast failover. RDS Proxy is essential for Lambda workloads where hundreds of functions open connections simultaneously. For analytics, I stream from RDS to a data warehouse rather than hammering the production instance.",
    trap:
      "Thinking Multi-AZ adds read capacity. The standby is not readable — it only serves as a failover target. You need Read Replicas for read scaling. Also, Read Replica lag can cause stale reads — never run transactions that require consistency against a replica.",
    memoryAnchor:
      "Multi-AZ is a co-pilot (standby) who knows the route but sits quietly until the pilot (primary) is incapacitated. Read Replicas are photocopied maps given to passengers — they can read them, but shouldn't navigate with them.",
  },
  {
    id: "dynamodb",
    title: "DynamoDB",
    category: "databases",
    basic:
      "DynamoDB is a fully managed, serverless NoSQL key-value and document database with single-digit millisecond performance at any scale. It automatically replicates data across 3 AZs and scales throughput up and down.",
    expected:
      "Data model: every item needs a partition key (hash key). An optional sort key (range key) enables range queries within a partition. Primary key = partition key alone, or composite = partition key + sort key. Capacity modes: On-Demand (pay per request, automatic scaling) and Provisioned (set RCUs/WCUs, use Auto Scaling). Global Secondary Indexes (GSI): alternate partition key + optional sort key, can index any attributes, have their own capacity. Local Secondary Indexes (LSI): same partition key as table, different sort key, must be created at table creation, uses table's capacity.",
    deep:
      "Partition key design is critical — a hot partition occurs when one key receives a disproportionate share of traffic (e.g., a popular user ID). Mitigations: write sharding (append a suffix 0-N to the key), scatter-gather, or caching. DynamoDB Streams captures item-level changes for event-driven processing (Lambda integration). Global Tables provide multi-region active-active replication with last-writer-wins conflict resolution. DynamoDB Accelerator (DAX) is an in-memory cache that reduces read latency to microseconds. Transactions: TransactWriteItems and TransactGetItems for all-or-nothing across up to 100 items. Single-table design: model multiple entity types in one table using composite keys and GSIs to support diverse access patterns without JOINs.",
    interviewAnswer:
      "DynamoDB excels for high-throughput, predictable-latency workloads where access patterns are known upfront. I design the partition key for even distribution — a hot partition is the most common production failure. GSIs support additional access patterns. I use On-Demand mode for unpredictable traffic and Provisioned with Auto Scaling for predictable workloads. For complex relational queries, DynamoDB is the wrong choice — use RDS or Aurora.",
    trap:
      "Using a low-cardinality partition key (e.g., status = 'active'/'inactive') that concentrates all traffic on 2 partitions. DynamoDB partitions data by partition key hash — poor distribution causes throttling on hot partitions regardless of total provisioned capacity.",
    memoryAnchor:
      "DynamoDB is a massive library with books organized by the first letter of the title (partition key). If 90% of books start with 'A', that shelf is overwhelmed. Spread titles evenly across all letters for a happy librarian (DynamoDB).",
  },
  {
    id: "elasticache",
    title: "ElastiCache (Redis vs Memcached)",
    category: "databases",
    basic:
      "ElastiCache is a managed in-memory caching service supporting Redis and Memcached. It reduces database load and application latency by caching frequently accessed data in memory.",
    expected:
      "Redis: rich data structures (strings, hashes, lists, sets, sorted sets, streams), persistence (RDB snapshots, AOF logs), replication (primary + up to 5 replicas), clustering (hash slots for horizontal sharding), pub/sub messaging, Lua scripting, atomic operations. Memcached: simpler, multi-threaded, horizontal scaling by adding nodes, no persistence, no replication — pure cache. Choose Redis for persistence, complex data types, pub/sub, or HA. Choose Memcached only for simple string caching where you need multi-threading and horizontal scaling.",
    deep:
      "Redis Cluster mode: distributes data across up to 500 shards (hash slots 0–16383). Each shard has a primary and up to 5 replicas. ElastiCache Global Datastore replicates Redis to read-only replica clusters in other regions for low-latency global reads. Cache-aside (lazy loading): app checks cache, on miss queries DB and populates cache. Write-through: write to cache and DB simultaneously — no stale data but higher write cost. TTL (expiration) prevents stale data buildup. ElastiCache for Redis 7+ supports multi-AZ with auto-failover natively. Valkey (open-source Redis fork) is now an ElastiCache option following the Redis license change.",
    interviewAnswer:
      "I use Redis (via ElastiCache) for almost all caching needs — it supports persistence, replication, cluster mode for sharding, and rich data types for session storage, leaderboards, rate limiting, and pub/sub. Memcached I'd only choose for simple key-value caching on teams with no Redis expertise. Cache strategy: cache-aside for read-heavy workloads, write-through for data that must always be fresh. Always set TTLs to prevent stale cache accumulation.",
    trap:
      "Caching without TTLs leads to stale data that never expires, requiring a cache flush to fix. Always set appropriate TTLs — and handle cache misses gracefully so cache failures degrade to slower (DB) queries rather than errors.",
    memoryAnchor:
      "ElastiCache is a cheat sheet you can consult before doing the math (database query). Redis is a detailed cheat sheet with notes, highlighted sections, and flashcards. Memcached is a plain sticky note — simple and fast, but no extras.",
  },

  // ── Infrastructure as Code ──
  {
    id: "cloudformation",
    title: "CloudFormation",
    category: "iac",
    basic:
      "CloudFormation provisions AWS infrastructure as code using JSON or YAML templates. Resources declared in a template are created, updated, and deleted together as a stack, maintaining the desired state automatically.",
    expected:
      "Template sections: Parameters (inputs), Mappings (static lookup tables), Conditions (conditional resource creation), Resources (required, the actual infrastructure), Outputs (values exported from the stack). Change sets preview what changes a template update will make before executing. Stack policies protect critical resources from accidental updates or deletion. Drift detection identifies manually changed resources that no longer match the template. Cross-stack references: Outputs exported from one stack imported by another with !ImportValue.",
    deep:
      "CloudFormation has a 500-resource limit per stack — use nested stacks or stack sets for larger architectures. Stack Sets deploy stacks across multiple accounts and regions simultaneously. CloudFormation custom resources use Lambda to manage resources not natively supported. The DeletionPolicy attribute (Retain, Snapshot, Delete) controls what happens to resources when the stack is deleted — Retain is critical for production databases. UPDATE_ROLLBACK_FAILED is a dreaded state: the stack failed to update AND failed to roll back. Resolution: continue-update-rollback command, skipping problematic resources. CloudFormation Hooks run validations before and after resource changes for compliance enforcement.",
    interviewAnswer:
      "CloudFormation manages infrastructure as declarative YAML/JSON templates. I use change sets to preview updates, stack policies to protect production resources from deletion, and DeletionPolicy: Retain on databases. For multi-account deployments, StackSets deploy consistently across accounts. I prefer CDK over raw CloudFormation for complex infrastructure because it provides loops, conditions, and type safety in real programming languages.",
    trap:
      "Not setting DeletionPolicy: Retain on production databases. If someone deletes the CloudFormation stack (accidentally or during cleanup), the database is deleted with it. Retain keeps the resource even after the stack is gone.",
    memoryAnchor:
      "CloudFormation is IKEA instructions for AWS — the template is the instruction manual, the stack is the assembled furniture. Change sets are checking the instructions before picking up the screwdriver. DeletionPolicy: Retain means 'if I return the furniture, keep the important screws.'",
  },
  {
    id: "aws-cdk",
    title: "AWS CDK",
    category: "iac",
    basic:
      "AWS CDK (Cloud Development Kit) lets you define cloud infrastructure using familiar programming languages (TypeScript, Python, Java, C#). CDK code synthesizes into CloudFormation templates, combining the power of real code with CloudFormation's resource management.",
    expected:
      "Core concepts: App (root), Stacks (unit of deployment), Constructs (reusable components). L1 Constructs: direct CloudFormation resource mappings (CfnBucket). L2 Constructs: high-level abstractions with sane defaults (s3.Bucket). L3 Constructs (Patterns): opinionated combinations (aws-solutions-constructs). CDK bootstrapping sets up the CDK toolkit resources (S3 bucket, ECR repo, IAM roles) in a target account. cdk synth generates CloudFormation templates; cdk deploy deploys them.",
    deep:
      "CDK Aspects apply visitor pattern logic across the entire construct tree — useful for enforcing security policies (all S3 buckets must have versioning) across all stacks. CDK Pipelines provides a self-mutating CI/CD pipeline that updates itself when the CDK app changes. CDK Assets handle bundling and uploading Lambda code or Docker images. The CDK CLI uses the CDK toolkit stack to track deployed asset versions. CDK Nag (community library) runs security and compliance rules against CDK apps, similar to cfn-nag. Environment-specific stacks (prod vs staging) use environment variables or context values to parameterize constructs.",
    interviewAnswer:
      "CDK lets me write infrastructure in TypeScript with real abstractions, loops, and type checking — far more maintainable than raw CloudFormation YAML for complex architectures. L2 constructs have sane security defaults. I use CDK Aspects for org-wide security policies (force encryption, tag all resources) and CDK Pipelines for self-updating deployment pipelines. CDK still synthesizes to CloudFormation, so all CloudFormation features and limitations apply.",
    trap:
      "Assuming CDK bypasses CloudFormation limits. CDK just generates CloudFormation — the 500-resource limit, change set behavior, and rollback mechanics still apply. Large CDK apps need nested stacks just like raw CloudFormation.",
    memoryAnchor:
      "CDK is a smart architect who speaks your language (TypeScript/Python) and writes the building permits (CloudFormation templates) for you. L2 constructs are pre-designed rooms with walls, electricity, and plumbing included.",
  },

  // ── Serverless & Event-Driven ──
  {
    id: "sqs-sns",
    title: "SQS & SNS",
    category: "serverless",
    basic:
      "SQS (Simple Queue Service) is a fully managed message queue for decoupling services. SNS (Simple Notification Service) is a pub/sub messaging service that fans out messages to multiple subscribers simultaneously.",
    expected:
      "SQS: Standard (at-least-once delivery, best-effort ordering) vs FIFO (exactly-once, strict ordering, 300 TPS base; 3,000 with batching; 9,000 with high-throughput FIFO mode). Visibility timeout: message is hidden from other consumers while being processed. Dead Letter Queue (DLQ): messages that fail processing after maxReceiveCount times go here for investigation. Long polling (WaitTimeSeconds: 20) reduces API calls and costs. SNS: a single publish fans out to SQS queues, Lambda functions, HTTP endpoints, email, SMS, mobile push. SNS+SQS fan-out pattern: SNS topic sends to multiple SQS queues for parallel processing.",
    deep:
      "SQS message retention: default 4 days, max 14 days. Max message size: 256KB (use S3 for large payloads with Extended Client Library). FIFO queues with message groups enable parallel FIFO processing — messages in different groups process concurrently, messages in the same group in order. SQS Extended Client Library stores large message bodies in S3 and includes a reference pointer in the SQS message. Consumer scaling: Lambda + SQS event source mapping scales Lambda concurrency based on queue depth. DLQ alarms are critical — unmonitored DLQs silently accumulate failed messages. SQS resource policy enables cross-account access without sharing credentials.",
    interviewAnswer:
      "SQS decouples producers from consumers, providing buffering for traffic spikes. I use FIFO when order matters (financial transactions, command processing) and Standard for high throughput workloads. DLQ is non-negotiable — failed messages need investigation. The fan-out pattern (SNS → multiple SQS queues) lets multiple services process the same event independently. For Lambda consumers, SQS auto-scales invocations based on queue depth.",
    trap:
      "Not setting a DLQ on SQS queues. Messages that fail processing are retried until the retention period expires, then silently dropped. Without a DLQ, you have no visibility into failed messages and lose data.",
    memoryAnchor:
      "SQS is a deli number system — each customer (message) gets a number, one server (consumer) handles each at a time, and they can't be skipped. SNS is a PA announcement — one message broadcasts to everyone in the building simultaneously.",
  },
  {
    id: "eventbridge",
    title: "EventBridge",
    category: "serverless",
    basic:
      "EventBridge is a serverless event bus that routes events from AWS services, custom applications, and SaaS providers to targets based on content-based filtering rules. It's the successor to CloudWatch Events.",
    expected:
      "Event buses: default bus (AWS service events), custom buses (your app events), partner buses (SaaS like Shopify, Stripe). Rules filter events using pattern matching on any event field. Targets: Lambda, SQS, SNS, Step Functions, Kinesis, API Gateway, EC2, ECS tasks, and more. EventBridge Scheduler replaces CloudWatch Events scheduled rules with finer-grained scheduling (one-time and recurring). EventBridge Pipes: point-to-point integration between sources (SQS, DynamoDB Streams, Kinesis) and targets with optional filtering and enrichment.",
    deep:
      "EventBridge has a default limit of 300 rules per bus. Content-based filtering can match on event source, detail type, and any field in the detail JSON using patterns (prefix, suffix, numeric ranges, anything-but). EventBridge Archives capture all events for replay — critical for debugging and event sourcing patterns. Schema Registry automatically discovers event schemas and generates code bindings. EventBridge's archive and replay capability enables temporal decoupling: replay events from days ago through new Lambda versions during incident response or feature deployment. Dead-letter queues on targets handle failed deliveries.",
    interviewAnswer:
      "EventBridge is my go-to for event-driven architectures. I use the default bus for AWS service events (EC2 state changes, S3 events, RDS snapshots) and custom buses for domain events between microservices. Content-based routing rules eliminate conditional logic in consumers. EventBridge Archives make replay possible for debugging or re-processing. Pipes simplify point-to-point event flows without custom glue code.",
    trap:
      "Using EventBridge when you need guaranteed delivery or queuing. EventBridge is fire-and-forget — if a target is unavailable, you need a DLQ on the rule. For guaranteed at-least-once delivery with retry, SQS is more appropriate.",
    memoryAnchor:
      "EventBridge is a smart postal sorting office — packages (events) come in from any sender (AWS services, your apps, SaaS), are sorted by content (rules), and delivered to the right address (targets). The DLQ is the undeliverable package bin.",
  },
  {
    id: "api-gateway",
    title: "API Gateway",
    category: "serverless",
    basic:
      "API Gateway is a fully managed service for creating, deploying, and securing REST, HTTP, and WebSocket APIs. It handles authentication, throttling, caching, and request/response transformation without managing infrastructure.",
    expected:
      "Types: REST API (full features, higher cost), HTTP API (simpler, 70% cheaper, supports OIDC/JWT auth natively), WebSocket API (bidirectional, persistent connections). Features: API keys, usage plans (throttling per key), IAM auth, Lambda authorizers (custom auth), Cognito User Pool authorizers, request/response mapping templates (VTL), stage variables, canary deployments. Integration types: Lambda Proxy (pass-through), Lambda Custom (transform), HTTP, Mock. Throttling: 10,000 RPS default, 5,000 burst — can be increased.",
    deep:
      "API Gateway has a hard 29-second integration timeout — Lambda functions must complete within this window or the API returns 504. This is a critical production gotcha for long-running operations. Caching: REST API supports response caching per stage (TTL 0–3,600s), reducing backend hits. VPC Link connects API Gateway to resources in a VPC without public exposure. Binary support for REST APIs handles image, PDF, and other binary content. WebSocket APIs maintain persistent connections; $connect, $disconnect, and $default routes handle lifecycle and messages. For high-traffic APIs, consider using HTTP APIs (cheaper and faster) over REST APIs when you don't need REST-specific features.",
    interviewAnswer:
      "API Gateway is the front door for serverless APIs. For new APIs, I use HTTP APIs for cost and simplicity, falling back to REST APIs when I need request transformation, caching, or usage plans. The 29-second timeout is a hard constraint — for long-running operations, I use async patterns: API Gateway → SQS → Lambda, returning a job ID and polling for results. Lambda authorizers provide flexible custom auth logic.",
    trap:
      "Lambda timeout longer than 29 seconds when connected to API Gateway. The API Gateway will timeout and return 504 before Lambda finishes. The caller sees an error even though Lambda is still running. Design long operations as async patterns.",
    memoryAnchor:
      "API Gateway is a hotel concierge — they greet guests (requests), check credentials (auth), take requests to the right department (Lambda), and won't wait more than 29 seconds for an answer before apologizing to the guest (504).",
  },
  {
    id: "step-functions",
    title: "Step Functions",
    category: "serverless",
    basic:
      "Step Functions orchestrates multi-step workflows as state machines. Each step can invoke Lambda, call AWS APIs, run ECS tasks, or wait for external input. It provides built-in error handling, retries, and parallel execution.",
    expected:
      "Workflow types: Standard (up to 1 year, at-least-once, auditable history) and Express (up to 5 minutes, at-least-once or exactly-once, high throughput). States: Task, Choice, Parallel, Map, Wait, Pass, Succeed, Fail. SDK Integrations (optimistic pattern): Step Functions calls AWS APIs directly without Lambda — reduces cost and latency. Callback pattern: tasks pause until an external system calls SendTaskSuccess/Failure with a task token. Useful for human approval workflows.",
    deep:
      "Step Functions charges by state transition — complex workflows with many states can become expensive with Standard workflows. Express Workflows are cheaper for high-frequency, short-duration processes (order processing, IoT). Map state enables parallel processing of arrays (fan-out). Distributed Map processes millions of items from S3 using S3 Inventory as input, running child executions in parallel at massive scale. Step Functions integrates with EventBridge for async triggering and X-Ray for end-to-end tracing. Error handling: Catch and Retry within each state, with exponential backoff configuration. Step Functions is the answer to 'how do I coordinate multiple Lambda functions without chaining them' — direct invocation chains are brittle and hard to monitor.",
    interviewAnswer:
      "Step Functions orchestrates long-running multi-step workflows where I need visibility, retry logic, and parallel execution. I use it for order fulfillment pipelines, ML workflows, and human approval loops (callback pattern with task tokens). SDK integrations let me call AWS services directly without Lambda wrappers. I choose Express Workflows for high-volume short workflows to control costs. The visual execution history makes debugging distributed workflows vastly easier than tracing Lambda chains.",
    trap:
      "Using Lambda chaining (Lambda calling Lambda) for multi-step workflows. If step 3 of 7 fails, you have no visibility into which step failed or why, and error handling requires custom code in every Lambda. Step Functions provides this out of the box.",
    memoryAnchor:
      "Step Functions is a factory assembly line — each station (state) does its job, passes the widget (data) to the next, and if a station breaks (error), the floor supervisor (retry/catch) handles it instead of everything grinding to a halt.",
  },

  // ── Observability ──
  {
    id: "cloudwatch",
    title: "CloudWatch",
    category: "observability",
    basic:
      "CloudWatch is AWS's observability service for collecting metrics, logs, and alarms. It aggregates data from AWS services and custom applications, enabling dashboards, alerting, and log analysis.",
    expected:
      "Metrics: namespace/dimension/metric name hierarchy. Standard resolution (1-minute granularity) and high resolution (1-second). Custom metrics published via PutMetricData API or CloudWatch Agent. Alarms: trigger actions (SNS notification, Auto Scaling, EC2 action) when metrics cross thresholds. Log Groups and Log Streams: structured storage for application logs. Log Insights: SQL-like query language for log analysis. Container Insights: ECS/EKS metrics and logs. Lambda Insights: enhanced Lambda metrics (duration, memory, cold starts).",
    deep:
      "CloudWatch Metrics Insights enables SQL-style queries across all CloudWatch metrics for fleet-wide analysis. Anomaly Detection uses ML to establish baseline and alerts on deviations — better than static thresholds for seasonal workloads. CloudWatch Evidently provides feature flagging and A/B testing with metrics. Embedded Metrics Format (EMF) lets Lambda and containers write structured JSON logs that CloudWatch automatically converts to metrics — cheaper than PutMetricData for high-frequency metrics. Metric Math enables calculated metrics (e.g., error rate = errors/requests × 100) without storing derived metrics separately. CloudWatch Synthetics runs canary scripts (Puppeteer/Selenium) against endpoints to proactively detect outages before users do.",
    interviewAnswer:
      "CloudWatch is my primary observability platform on AWS. I use the CloudWatch Agent to collect system metrics and structured logs, Log Insights to query logs during incidents, and Alarms tied to SNS for alerting. For Lambda, I enable Lambda Insights for cold start and memory metrics. I use Embedded Metrics Format for high-frequency custom metrics from Lambda to avoid PutMetricData costs. Synthetics canaries run every minute to catch endpoint outages proactively.",
    trap:
      "Creating alarms only on error counts, not error rates. During traffic spikes, error counts naturally increase even if the error rate is stable. A rate-based alarm (errors / requests) avoids false pages during healthy traffic growth.",
    memoryAnchor:
      "CloudWatch is the hospital's patient monitoring system — ECG (metrics), nurse notes (logs), crash cart alarm (alarms), and scheduled check-ins (synthetics). You get paged when something abnormal is detected.",
  },
  {
    id: "xray",
    title: "AWS X-Ray",
    category: "observability",
    basic:
      "X-Ray traces requests as they travel through distributed systems — capturing timing, metadata, and errors at each service hop. It creates a service map and flame graphs to identify performance bottlenecks and error sources.",
    expected:
      "Instrumentation: X-Ray SDK (code-level), X-Ray Daemon (sidecar for EC2/ECS), Lambda automatic tracing (enable via console/config). Concepts: Trace (end-to-end request), Segment (one service's contribution), Subsegment (function call, SQL query, external HTTP call). Annotations (indexed, searchable) and metadata (not indexed). Sampling rules: capture a percentage of requests to manage cost. Service map: visual graph of service dependencies with error rates and latency percentiles.",
    deep:
      "X-Ray groups enable filtering traces by annotation values for targeted analysis. X-Ray Insights proactively detects anomalies and creates events (similar to alarms). X-Ray traces propagate via HTTP headers (X-Amzn-Trace-Id) across service boundaries. For Lambda, X-Ray captures the invocation overhead (initialization, queuing) plus your code's segments. X-Ray Integration with API Gateway, ALB, SQS, and SNS enables full distributed tracing without code changes. CloudWatch ServiceLens integrates X-Ray service maps with CloudWatch metrics and logs into a single console view.",
    interviewAnswer:
      "X-Ray is essential for debugging latency in distributed/microservice architectures where a single user request touches many services. I enable automatic tracing on Lambda and ECS, add custom subsegments around database calls and external HTTP requests, and use annotations for searchable metadata (user ID, order ID). The service map shows me where in the call chain latency or errors originate in seconds.",
    trap:
      "Sampling every request in production at high traffic. X-Ray charges per trace stored — 100% sampling at 10,000 RPS becomes expensive. Set sampling rules to capture 5% of requests plus 100% of error requests.",
    memoryAnchor:
      "X-Ray is a package tracker for your requests — you see every warehouse (service) it passed through, how long it sat there, and where it got delayed or damaged. Annotations are 'fragile' stickers you add to find specific packages later.",
  },
];

// ─── Interview Patterns ───────────────────────────────────────────────────────
const interviewPatterns: InterviewPattern[] = [
  {
    question: "How would you design a highly available and scalable web application on AWS?",
    answer:
      "Multi-AZ ALB → Auto Scaling EC2 or ECS Fargate across 3 AZs → RDS Multi-AZ (writes) + Read Replicas (reads) → ElastiCache Redis for session/query caching → S3 + CloudFront for static assets → Route53 with health checks for DNS failover. CloudWatch alarms trigger Auto Scaling and page the on-call. All infrastructure in VPC with public subnets for ALB, private for compute and DB.",
    whyAsked: "Classic architecture question that reveals depth of AWS knowledge and understanding of HA principles.",
    trap: "Single-AZ deployments, single points of failure (one NAT Gateway, no ALB), missing database HA, no caching layer.",
  },
  {
    question: "Explain the difference between Security Groups and NACLs. When would you use each?",
    answer:
      "Security Groups are stateful instance-level firewalls supporting only Allow rules. NACLs are stateless subnet-level firewalls supporting both Allow and Deny. Use Security Groups as the primary security control (reference other SGs, not IPs). Use NACLs for subnet-level blanket blocks — denying a bad IP range, meeting compliance requirements for explicit subnet-level controls.",
    whyAsked: "Fundamental networking question that tests understanding of AWS layered security.",
    trap: "Forgetting NACLs are stateless — you must allow ephemeral return ports (1024–65535) for outbound or connection establishment fails.",
  },
  {
    question: "How does DynamoDB partition internally, and how do you avoid hot partitions?",
    answer:
      "DynamoDB distributes data across partitions using the partition key hash. Each partition handles a fixed throughput share. A hot partition occurs when one key receives excessive traffic. Solutions: high-cardinality partition keys (user ID, UUID over status/type), write sharding (append a random suffix), scatter-gather pattern, caching with DAX/ElastiCache for repeated reads.",
    whyAsked: "Tests DynamoDB design knowledge — hot partitions are the most common production DynamoDB failure.",
    trap: "Thinking you can fix hot partitions by increasing provisioned capacity. More capacity doesn't help if all traffic hits one partition — each partition has a fixed ceiling.",
  },
  {
    question: "What is IAM role assumption and how does cross-account access work?",
    answer:
      "A role has a trust policy (who can assume it) and permission policy (what they can do). In Account B, create a role with trust policy allowing Account A's principal. In Account A, the principal calls sts:AssumeRole with Account B's role ARN, receives temporary credentials, and uses them to access Account B's resources. Both the identity-based policy in Account A AND the resource/trust policy in Account B must allow the action.",
    whyAsked: "Common real-world pattern for multi-account architectures, CI/CD pipelines, and third-party integrations.",
    trap: "Thinking the Account A permission alone is sufficient. For cross-account, both accounts must grant permission — Account A to AssumeRole, and Account B's trust policy to accept the assumption.",
  },
  {
    question: "How do you ensure Lambda doesn't overwhelm a database during traffic spikes?",
    answer:
      "Lambda scales to thousands of concurrent executions instantly. Solutions: (1) RDS Proxy pools and reuses DB connections, preventing connection exhaustion. (2) Reserved concurrency limits Lambda's max invocations, throttling at a safe rate. (3) SQS queue between API and Lambda with a concurrency-limited consumer. (4) ElastiCache caching reduces DB hits per invocation. Without these, a Lambda spike can exhaust DB connection limits (e.g., PostgreSQL default 100), causing errors.",
    whyAsked: "Tests understanding of Lambda's unique scaling characteristics and their impact on downstream resources.",
    trap: "Increasing RDS max connections. The real fix is connection pooling via RDS Proxy, not a higher limit that will just take longer to exhaust.",
  },
  {
    question: "Explain S3 storage classes and how you'd choose between them.",
    answer:
      "Standard: frequently accessed data, lowest latency, highest cost. Intelligent-Tiering: unknown/changing access patterns, auto-moves between frequent/infrequent tiers (small monitoring fee). Standard-IA: infrequent access but instant retrieval, 30-day minimum storage, retrieval fee. Glacier Instant: archive with instant retrieval, lower cost than IA. Glacier Flexible: archive, minutes-to-hours retrieval. Deep Archive: cheapest, 12-hour retrieval. Use lifecycle policies to auto-transition based on age.",
    whyAsked: "S3 cost optimization is a common real-world concern, especially for log storage, ML datasets, and media.",
    trap: "Using Glacier without accounting for retrieval costs and time. Glacier Deep Archive is very cheap to store but expensive and slow to retrieve — inappropriate for data you might need quickly.",
  },
  {
    question: "What's the difference between CloudFormation and CDK?",
    answer:
      "CloudFormation is declarative JSON/YAML templates. CDK is imperative infrastructure code (TypeScript, Python, Java) that synthesizes to CloudFormation. CDK provides real programming constructs (loops, conditions, abstractions, type safety) through L1/L2/L3 constructs. CDK still deploys via CloudFormation, so all CloudFormation limits and behaviors apply. CDK reduces boilerplate, enables reusable abstractions, and is better for complex infrastructure; raw CloudFormation is simpler for small, stable infrastructure.",
    whyAsked: "Tests IaC maturity and understanding of the AWS infrastructure tooling ecosystem.",
    trap: "Thinking CDK bypasses CloudFormation. CDK is a synthesis layer — it generates CloudFormation templates. The 500-resource limit, rollback behavior, and drift detection all still apply.",
  },
  {
    question: "How would you implement a serverless event-driven order processing system?",
    answer:
      "API Gateway → Lambda (validates, publishes to SNS/EventBridge) → SNS fans out to: SQS queue for inventory service, SQS queue for payment service, SQS queue for notification service. Each SQS queue has a Lambda consumer with DLQ for failures. Step Functions orchestrates multi-step order fulfillment with retry logic and human approval if needed. CloudWatch alarms on DLQ depth alert when messages accumulate. EventBridge Archives capture all events for replay.",
    whyAsked: "Tests ability to design decoupled, resilient event-driven architectures using native AWS services.",
    trap: "Direct Lambda-to-Lambda invocations instead of queues. If the downstream Lambda is throttled, the caller fails. Queues buffer and retry, providing resilience.",
  },
];

// ─── Common Mistakes ──────────────────────────────────────────────────────────
const commonMistakes: CommonMistake[] = [
  {
    wrong: "Deploying a single NAT Gateway for all private subnets across multiple AZs",
    correct: "Deploy one NAT Gateway per AZ. Route each AZ's private subnets through their local NAT Gateway for HA and cost efficiency.",
  },
  {
    wrong: "Using EC2 health checks in Auto Scaling Groups instead of ELB health checks",
    correct: "Use ELB health checks in ASGs. EC2 checks only detect instance failure; ELB checks detect application-level failures (hung processes, 500s).",
  },
  {
    wrong: "Using array index or low-cardinality keys as DynamoDB partition keys",
    correct: "Use high-cardinality keys (user ID, UUID) for even distribution. Low-cardinality keys create hot partitions regardless of provisioned capacity.",
  },
  {
    wrong: "Lambda timeout set longer than API Gateway's 29-second integration timeout",
    correct: "Keep Lambda timeout under 29 seconds when behind API Gateway. For long operations, use async patterns: return a job ID, process asynchronously via SQS.",
  },
  {
    wrong: "Initializing heavyweight objects (DB connections, SDK clients) inside the Lambda handler",
    correct: "Initialize outside the handler in the module scope. These are reused on warm invocations, dramatically reducing latency and connection overhead.",
  },
  {
    wrong: "Not setting a Dead Letter Queue on SQS queues or Lambda functions",
    correct: "Always configure DLQs. Failed messages silently disappear after the retention period without a DLQ — you lose data and visibility.",
  },
  {
    wrong: "Hardcoding AWS access keys in code, environment variables, or AMIs",
    correct: "Use IAM roles and instance profiles/execution roles. Credentials rotate automatically and never appear in code or configuration files.",
  },
  {
    wrong: "Using Multi-AZ RDS as a read scaling solution",
    correct: "Multi-AZ is for high availability (standby is not readable). Use Read Replicas for read scaling. These are separate features.",
  },
  {
    wrong: "Assuming S3 is eventually consistent (pre-2020 knowledge)",
    correct: "Since December 2020, S3 provides strong read-after-write consistency for all operations. The old eventual consistency gotcha no longer applies.",
  },
  {
    wrong: "Using a broad wildcard in IAM policies: Action: '*', Resource: '*'",
    correct: "Apply least privilege. Generate minimum required policies using IAM Access Analyzer or record CloudTrail events for the specific actions needed.",
  },
  {
    wrong: "Not setting DeletionPolicy: Retain on critical CloudFormation resources",
    correct: "Set DeletionPolicy: Retain on production databases. A stack deletion without Retain permanently deletes the database and all data.",
  },
  {
    wrong: "Sampling 100% of requests with X-Ray in production",
    correct: "Use sampling rules: 5% of normal requests, 100% of error requests. High-volume 100% sampling generates significant costs without proportional insight.",
  },
];

// ─── Practice Questions ───────────────────────────────────────────────────────
const practiceQuestions: PracticeQuestion[] = [
  {
    code: `# IAM Policy
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::my-bucket/*"
}

# But users in Account B still can't access the bucket.
# Account B users have the above policy attached.`,
    question: "Why can't Account B users access the S3 bucket in Account A, and how do you fix it?",
    answer:
      "Cross-account S3 access requires BOTH the identity-based policy (Account B users have this) AND the S3 bucket policy in Account A must grant access to Account B's principal. Add a bucket policy to my-bucket in Account A: { Effect: Allow, Principal: { AWS: 'arn:aws:iam::ACCOUNT_B_ID:root' }, Action: 's3:GetObject', Resource: 'arn:aws:s3:::my-bucket/*' }.",
  },
  {
    code: `# CloudFormation template excerpt
Resources:
  MyDatabase:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceClass: db.t3.micro
      Engine: postgres
      MasterUsername: admin
      MasterUserPassword: !Ref DBPassword

  MyStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: !Sub 'https://s3.amazonaws.com/...'`,
    question: "What critical production risk exists in this CloudFormation template? How do you mitigate it?",
    answer:
      "No DeletionPolicy is set on MyDatabase. If the CloudFormation stack is deleted (accidentally or during cleanup), the RDS instance and all data are permanently deleted. Fix: Add DeletionPolicy: Retain (or Snapshot to create a final snapshot before deletion) to MyDatabase. Also, add UpdateReplacePolicy: Retain to prevent replacement during updates. Consider also setting Stack policies to prevent updates to critical resources.",
  },
  {
    code: `# Lambda function connecting to RDS PostgreSQL
import psycopg2

def handler(event, context):
    conn = psycopg2.connect(
        host=os.environ['DB_HOST'],
        database='mydb',
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASS']
    )
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = %s",
                   (event['orderId'],))
    return cursor.fetchone()`,
    question: "Identify all problems with this Lambda database connection pattern and how to fix each.",
    answer:
      "1) Connection created inside handler — recreated on every invocation. Move conn outside handler to reuse on warm starts. 2) No connection pooling — hundreds of concurrent Lambda instances open hundreds of direct connections, exhausting RDS's connection limit. Use RDS Proxy to pool connections. 3) No connection cleanup — cursor and connection never closed, leaking resources. Use try/finally or context managers. 4) Hardcoded credentials in env vars — use AWS Secrets Manager and fetch/cache the secret at cold start. 5) No error handling — DB errors crash the Lambda without retry logic.",
  },
  {
    code: `# DynamoDB access pattern design challenge:
# Table: Orders
# Access patterns needed:
# 1. Get order by orderId
# 2. Get all orders for a customer
# 3. Get all orders with status = 'PENDING'
# 4. Get orders placed in last 7 days`,
    question: "Design the DynamoDB table schema (primary key and GSIs) to support all four access patterns.",
    answer:
      "Primary key: PK=orderId (partition key) — supports pattern 1. GSI-1: PK=customerId (partition), SK=createdAt (sort) — supports pattern 2, sorted by date. GSI-2: PK=status (partition), SK=createdAt (sort) — supports patterns 3 and 4 (query status=PENDING, filter by createdAt >= 7 days ago). Note: status has low cardinality (hot partition risk) — consider adding a bucket suffix (PENDING#0 through PENDING#9) and querying all 10 prefixes. Alternatively, use a sparse index — only items with status=PENDING appear in GSI-2 if the attribute is only written for pending orders.",
  },
  {
    code: `# Architecture decision:
# You need to process 10,000 image uploads per minute.
# Each image needs: resize to 3 sizes,
# watermarking, and saving to S3.
# Processing takes 45 seconds per image.`,
    question: "Design the AWS architecture for this image processing pipeline. What service choices and why?",
    answer:
      "Upload: Client uploads directly to S3 via presigned URL (bypasses servers). Trigger: S3 event notification → SQS queue (buffer, retry, DLQ). Processor: ECS Fargate tasks (not Lambda — while 45s is within Lambda's 15-min limit, 10k/min at 45s/image requires ~7,500 concurrent executions, making Lambda extremely expensive and hard to manage at this scale). Auto Scaling: ECS Service Auto Scaling based on SQS queue depth (target tracking). Output: Processed images to S3 output bucket. Notification: SNS/EventBridge when processing completes. Lambda is wrong here due to the concurrency cost at scale, cold start overhead at 7,500 concurrent functions, and CPU-intensive workloads being more cost-effective on Fargate.",
  },
  {
    code: `# VPC Setup
# Region: us-east-1 (3 AZs)
# CIDR: 10.0.0.0/16
# Need: web tier, app tier, database tier`,
    question: "Design the subnet layout for this VPC with proper security isolation.",
    answer:
      "6 subnets (2 per AZ): Public /24 (e.g., 10.0.1.0/24, 10.0.2.0/24, 10.0.3.0/24) for ALB and NAT Gateways. Private /24 (10.0.11.0/24, 10.0.12.0/24, 10.0.13.0/24) for app tier EC2/ECS. Private /24 (10.0.21.0/24, 10.0.22.0/24, 10.0.23.0/24) for database tier RDS. Security Groups: ALB-SG accepts 80/443 from 0.0.0.0/0. App-SG accepts 8080 from ALB-SG only. DB-SG accepts 5432 from App-SG only. One NAT Gateway per AZ in public subnets. Route tables: public subnets route 0.0.0.0/0 to IGW; private subnets route 0.0.0.0/0 to their AZ's NAT Gateway.",
  },
];

// ─── Last Hour Summary ────────────────────────────────────────────────────────
const lastHourSummary: LastHourSummary = {
  keyTakeaways: [
    "IAM: use roles over access keys, least privilege, explicit Deny always wins, both identity AND resource policy needed for cross-account",
    "VPC: public subnets have IGW route, private use NAT Gateway (one per AZ for HA), Security Groups are stateful, NACLs are stateless",
    "Lambda: cold starts mitigated by provisioned concurrency; initialize outside handler; API Gateway hard limit is 29s; RDS Proxy for connection pooling",
    "DynamoDB: partition key must have high cardinality to avoid hot partitions; GSIs for alternate access patterns; On-Demand vs Provisioned by traffic predictability",
    "RDS: Multi-AZ is HA (standby not readable), Read Replicas are read scaling — they're different features",
    "S3 provides strong read-after-write consistency since Dec 2020; storage classes from Standard → Intelligent-Tiering → IA → Glacier → Deep Archive by access frequency",
    "CloudFormation: always set DeletionPolicy: Retain on production databases; CDK synthesizes to CloudFormation — limits still apply",
  ],
  mustKnowConcepts: [
    { name: "IAM Policies & Roles", oneLiner: "Identity-based + resource-based policies both required for cross-account; explicit Deny always wins; use roles never access keys" },
    { name: "VPC & Subnets", oneLiner: "Public subnets have IGW route; private use NAT Gateway (per-AZ for HA); VPC Endpoints for private S3/DynamoDB access" },
    { name: "Security Groups vs NACLs", oneLiner: "SG: stateful, instance-level, allow only. NACL: stateless, subnet-level, allow/deny — remember ephemeral ports" },
    { name: "Lambda", oneLiner: "Scales to thousands of concurrent executions; cold starts = 100ms–1s; 29s API GW limit; initialize outside handler" },
    { name: "DynamoDB", oneLiner: "Key-value NoSQL at any scale; high-cardinality partition key to avoid hot partitions; GSI for alternate access" },
    { name: "RDS Multi-AZ vs Read Replicas", oneLiner: "Multi-AZ = HA failover (standby not readable). Read Replicas = read scaling (async replication, can lag)" },
    { name: "S3 Storage Classes", oneLiner: "Standard → Intelligent-Tiering → IA → Glacier Instant → Glacier Flexible → Deep Archive by decreasing access frequency" },
    { name: "SQS vs SNS", oneLiner: "SQS: queue (one consumer per message). SNS: pub/sub (broadcast to many). Fan-out: SNS → multiple SQS queues" },
    { name: "CloudFormation DeletionPolicy", oneLiner: "Set Retain on production databases or stack deletion permanently destroys them" },
    { name: "ALB vs NLB", oneLiner: "ALB: L7, path/header routing, WAF. NLB: L4, ultra-low latency, static IPs, source IP preservation" },
  ],
  topTraps: [
    "Single NAT Gateway across all AZs — AZ failure kills all private subnet internet access; deploy one per AZ",
    "Lambda timeout > 29 seconds behind API Gateway — API Gateway times out first (504), Lambda keeps running orphaned",
    "DynamoDB low-cardinality partition key (status, boolean) — hot partition regardless of total capacity provisioned",
    "Multi-AZ RDS as read scaling — the standby is NOT readable, it's only for failover; use Read Replicas for reads",
    "Cross-account S3 access with only identity-based policy — bucket policy in the owning account must also grant access",
    "EC2 health checks in ASG — app can return 500s while EC2 status shows healthy; always use ELB health checks",
  ],
};

// ─── Last Hour Concept IDs ────────────────────────────────────────────────────
const lastHourConceptIds: string[] = [
  "ec2-auto-scaling",
  "lambda",
  "s3",
  "vpc-subnets",
  "security-groups-nacls",
  "iam-policies-roles",
  "rds",
  "dynamodb",
  "sqs-sns",
  "cloudformation",
  "alb-vs-nlb",
  "elasticache",
];

// ─── Export ───────────────────────────────────────────────────────────────────
export const topicData: TopicData = {
  topicTitle: "AWS / Cloud",
  topicMeta: "50–65 min · Mid to Senior level",
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
