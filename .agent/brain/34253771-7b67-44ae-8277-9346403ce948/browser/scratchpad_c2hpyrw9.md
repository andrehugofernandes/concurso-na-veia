# Mobile Sticky Navigation Behavior Investigation

## Checklist
- [x] Set browser viewport to mobile size (390x844).
- [x] Navigate to `http://localhost:3000/aulas/portugues/concordancia`.
- [x] Verify if the sidebar is visible initially.
- [x] Scroll down slowly until `StickyModuleNav` pins.
- [x] Check if the sidebar slides out and the content takes full viewport width.
- [x] Open the browser console and check for `[sidebar-debug]` logs.
- [x] Scroll back up to the top and check if the sidebar slides back in.
- [x] Verify if the sticky nav is full-width (pixel perfect).
- [x] Check if navigation arrows (left/right) are visible in the sticky nav.
- [x] Check for other console errors.

## Findings
- **Initial State:** Sidebar is visible on the left. `isMobile: true`, `isStickyNavPinned: false`.
- **Sticky Behavior:** When scrolling down, module navigation tabs stay sticky at `y=44`, but the sidebar **does not slide out**.
- **Console Logs:** `[sidebar-debug]` consistently shows `isStickyNavPinned: false` even when the navigation is physically sticky. This indicates the logic for detecting the sticky state is broken.
- **Sticky Nav Width:** The navigation tabs are not centered or full-width correctly. DOM coordinates show them partially off-screen or misaligned.
- **Navigation Arrows:** No navigation arrows (left/right) were found in the `StickyModuleNav` area.
- **Console Errors:** None found, except for a 404 for `favicon.ico`.
- **Scroll Up:** Sidebar remains visible, and components return to their initial positions as expected (since they never left).
