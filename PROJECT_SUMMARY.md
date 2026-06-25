# Project Summary: Client-Side API Rate Limiter & LRU Cache Visualizer

This project is a dynamic, single-page web application that demonstrates advanced client-side caching and request-throttling strategies. It provides a real-time dashboard to visualize the behavior of a custom-built API rate limiter and an LRU (Least Recently Used) cache, showcasing practical solutions to common frontend performance and data management challenges.

### Technologies Used

*   **Frontend:** React (with Hooks), TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Linting & Code Quality:** ESLint, TypeScript
*   **Data Structures:** Implemented LRU Cache using a Map-based approach for efficient O(1) average time complexity for get and put operations.

---

### Key Features & Technical Contributions

*   **Client-Side Rate Limiting:**
    *   Engineered a "token bucket" style rate limiting system from scratch using React hooks to prevent API abuse and ensure application stability.
    *   Developed a responsive UI component to visualize the "request capacity," showing available slots, consumption, and a time-to-refill countdown, providing clear, immediate feedback to the user.

*   **Performant LRU Cache Implementation:**
    *   Implemented a fully functional LRU (Least Recently Used) cache to minimize redundant API calls by storing and retrieving recent data.
    *   Authored the cache logic using a Map-based approach, demonstrating a strong understanding of data structures and their trade-offs for achieving optimal performance (O(1) for insertions, lookups, and deletions).

*   **Dynamic & Interactive UI:**
    *   Built a responsive and intuitive dashboard using React and Tailwind CSS, allowing users to trigger API fetches and observe the state of the rate limiter and cache in real-time.
    *   Designed UI components to clearly distinguish and display the Most Recently Used (MRU) and Least Recently Used (LRU) items in the cache, effectively communicating the cache's eviction policy.

*   **Modern Frontend Architecture:**
    *   Leveraged custom React hooks (`useRateLimiterSlots`, `useLRUCacheView`) to encapsulate complex state logic, promoting code reusability, separation of concerns, and easier maintenance.
    *   Utilized TypeScript across the entire codebase to ensure type safety, improve developer experience with better autocompletion, and reduce runtime errors.
    *   Structured the application with a modern Vite build setup for a fast and efficient development workflow.
