# Component Design

The UI follows an enterprise SaaS dashboard style: dense, clear, responsive, and optimized for repeated operational use.

## Layout Components

`MainLayout`
: Owns the desktop/mobile shell, sidebar state, topbar, and router outlet.

`AppSidebar`
: Provides primary HRIS navigation. It reads route metadata and uses router links.

`AppTopbar`
: Shows current route title, environment-aware workspace context, and shell actions.

## UI Components

`PageHeader`
: Standard page title, description, and action area.

`MetricCard`
: Compact KPI display for dashboards.

`DataTable`
: Reusable table wrapper with loading, empty, and action slots. It receives columns and rows without embedding domain rules.

`StatusBadge`
: Visual status indicator for active, inactive, draft, and neutral states.

`EmptyState`
: Standard empty state used by list pages when the backend returns no rows.

## Form Components

`FormField`
: Label, hint, error, and input wrapper. It keeps form layouts consistent without dictating validation implementation.

Domain pages own their form models and submit behavior. Shared form components should not call APIs directly.

## Page Patterns

List pages should include:

- `PageHeader`
- Filter/search area where needed
- `DataTable`
- Clear loading and empty states

Detail pages should include:

- `PageHeader`
- Stable summary sections
- Related records placeholders only where real backend data will later attach

Form pages should include:

- `PageHeader`
- Grouped fields
- Save/cancel actions
- Submit hooks prepared for service calls

## Responsive Behavior

- Sidebar is fixed on desktop and toggled on mobile.
- Tables remain readable with horizontal overflow when needed.
- Forms collapse from two columns to one column on smaller screens.

