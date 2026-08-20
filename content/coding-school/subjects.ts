export type Category = {
  slug: string
  title: string
  description: string
}

export type Mode = "pattern" | "day"

export type Subject = {
  slug: string
  title: string
  description: string
  mode: Mode
  categories: Category[]
}

export const subjects: Subject[] = [
  {
    slug: "dsa",
    title: "DSA",
    description: "Data structures & algorithms, organized by pattern.",
    mode: "pattern",
    categories: [
      {
        slug: "two-pointers",
        title: "Two Pointers",
        description: "Traversal fundamentals and comparing/swapping from both ends.",
      },
      {
        slug: "sliding-window",
        title: "Sliding Window",
        description: "Fixed and variable windows over a contiguous range.",
      },
      {
        slug: "hashing",
        title: "Hashing",
        description: "Frequency maps and lookup maps for O(1) recall.",
      },
      {
        slug: "prefix-sum",
        title: "Prefix Sum",
        description: "Cumulative sums and remainder tracking for subarray problems.",
      },
      {
        slug: "monotonic-stack",
        title: "Monotonic Stack",
        description: "Maintaining an ordered stack for next-greater/smaller problems.",
      },
    ],
  },
  {
    slug: "js",
    title: "JavaScript",
    description: "Core language concepts and interview-depth internals.",
    mode: "day",
    categories: [
      {
        slug: "core-concepts",
        title: "Core Concepts",
        description: "Execution context, closures, prototypes, async, and the fundamentals interviewers probe.",
      },
    ],
  },
  {
    slug: "networking",
    title: "Networking",
    description: "Web protocols, authentication, and how browsers and servers actually talk to each other.",
    mode: "day",
    categories: [
      {
        slug: "authentication",
        title: "Authentication",
        description: "Sessions, cookies, tokens, and how browsers actually authenticate requests.",
      },
      {
        slug: "http-fundamentals",
        title: "HTTP Fundamentals",
        description: "Status codes, statelessness, HTTP vs HTTPS, and the full request/response journey.",
      },
    ],
  },
]
