export type Topic = {
  slug: string
  title: string
  description: string
}

export const topics: Topic[] = [
  {
    slug: "arrays",
    title: "Arrays",
    description: "Traversal, two pointers, sliding window, prefix sums.",
  },
  {
    slug: "strings",
    title: "Strings",
    description: "Pattern matching, hashing, and common string techniques.",
  },
  {
    slug: "hashing",
    title: "Hashing",
    description: "Frequency maps, lookup maps, and hash-based problem-solving patterns.",
  },
  {
    slug: "linked-list",
    title: "Linked Lists",
    description: "Singly/doubly linked lists, fast & slow pointers, reversal.",
  },
  {
    slug: "stacks-queues",
    title: "Stacks & Queues",
    description: "Monotonic stacks, queues, and their real-world use cases.",
  },
  {
    slug: "trees",
    title: "Trees",
    description: "Binary trees, BSTs, traversals, and tree-based problems.",
  },
  {
    slug: "graphs",
    title: "Graphs",
    description: "BFS, DFS, shortest paths, and graph traversal patterns.",
  },
  {
    slug: "sorting",
    title: "Sorting",
    description: "Comparison and non-comparison sorting algorithms.",
  },
  {
    slug: "recursion",
    title: "Recursion & Backtracking",
    description: "Recursive thinking, backtracking, and divide & conquer.",
  },
  {
    slug: "dynamic-programming",
    title: "Dynamic Programming",
    description: "Memoization, tabulation, and classic DP patterns.",
  },
]
