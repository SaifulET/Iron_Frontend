# Super Admin Dashboard Design and Structure Guidelines

Ensure all future features, screens, sub-tabs, and dashboards for the Super Admin system follow the established modular design patterns below without additional prompt styling questions.

## 1. Directory Structure and Modularity
- All Super Admin sub-components must be saved inside: `src/components/super-admin/`
- Keep components small and focused (e.g. create separate component files for tables, grids, and banners, and import them in the container).
- The main wrapper layout is defined in [SuperAdminDashboard.tsx](file:///c:/Saiful/Iron_frontend/src/components/super-admin/SuperAdminDashboard.tsx).

## 2. Layout, Collapsing & Responsiveness
- **Sidebar Position**: Pinned as `fixed left-0 top-0 h-screen z-30`. Width transitions dynamically:
  - Default/Expanded state: `w-[240px]`
  - Collapsed state: `w-[72px]` (Default on mobile/tablet viewports `< 1024px`).
- **Sidebar Collapsed Rules**:
  - Do NOT display logo (`smallBlackLogo.svg`) or logo text.
  - Do NOT display navigation labels or profile text/dropdown details.
  - Show only menu icons and the centered user avatar.
- **Header Position**: Pinned as `fixed top-0 z-20`. Transitions horizontally relative to the sidebar width:
  - Sidebar expanded: `left-[240px] w-[calc(100%-240px)]`
  - Sidebar collapsed: `left-[72px] w-[calc(100%-72px)]`
- **Main Content Offset**: The main grid container offsets dynamically:
  - Sidebar expanded: `pl-[264px]`
  - Sidebar collapsed: `pl-[96px]`
- **Responsive Width**: Main content must be set to `max-w-none w-full` to flow naturally across larger displays.

## 3. UI Aesthetics & Colors
- **Sidebar Link Active state**: Background `bg-[#2E9DA7]/20`, text `text-[#195156] font-medium`, with matching colored icons.
- **Card Styling**: Rounded corners `rounded-xl`, soft shadows `shadow-[0px_4px_12px_rgba(0,0,0,0.08)]`, and thin borders `border border-gray-100`.
