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
        slug: "fast-slow-pointers",
        title: "Fast & Slow Pointers",
        description: "Cycle detection and middle-finding on linked structures.",
      },
      {
        slug: "binary-search",
        title: "Binary Search (Modified)",
        description: "Searching sorted or monotonic search spaces.",
      },
      {
        slug: "monotonic-stack",
        title: "Monotonic Stack",
        description: "Maintaining an ordered stack for next-greater/smaller problems.",
      },
      {
        slug: "tree-graph-traversal",
        title: "Tree & Graph Traversal",
        description: "BFS and DFS across trees and graphs.",
      },
      {
        slug: "backtracking",
        title: "Backtracking",
        description: "Recursive exploration with pruning.",
      },
      {
        slug: "dynamic-programming",
        title: "Dynamic Programming",
        description: "Memoization, tabulation, and classic DP patterns.",
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
]
