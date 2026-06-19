- Initial inspection of `StickyModuleNav` on mobile (390px viewport, actually 500x715 in current session).
- Sticky nav is pinned but has visible gaps on the left and right.
- Analysis:
    - Viewport width: 500px.
    - Parent `<main>` has `px-2` (8px padding).
    - Content box width: `500 - 16 = 484px`.
    - Sticky nav has `-ml-2` (-8px), so it starts at `X=0`.
    - If it has `w-full` (100%), it ends at `X=484`.
    - There is a 16px gap on the right (or 8px if it's `492`).
    - The `next` button center at `478` confirms the edge is around `492`.
    - This means the child is currently `w-full` (484px) shifted by `-ml-2`.
    - To fix, it needs `w-[calc(100vw - var(--sidebar-width))]` AND to ensure this width reaches the right edge.
    - Alternatively, use `w-[calc(100% + 1rem)]` (which is 16px) and `-mx-2`.
- Goal: Make sticky nav edge-to-edge (pixel perfect).
- Plan:
    1. Verify current classes on the wrapper.
    2. Adjust weight and margins to ensure edge-to-edge.
    3. Improve button borders in dark mode.