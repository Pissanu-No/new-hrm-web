# AGENTS.md

## Project Overview

This project is a frontend web application for the `new-hrm-web` system.

The codebase is a Vue 3 + Vite application using JavaScript, Tailwind CSS, Vue Router, and a modular folder structure. The project is intended to be developed as a modern HRM / HRIS frontend that connects to backend APIs through service modules.

AI coding agents must follow the existing architecture, folder structure, naming style, and business flow. Do not rewrite the project structure unless explicitly requested.

---

## Tech Stack

- Vue 3
- Vite
- JavaScript
- Vue Router
- Tailwind CSS
- Component-based UI structure
- Service-based API integration
- Environment-based configuration through `.env`

---

## Current Project Structure

```text
new-hrm-web/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── stores/
│   ├── styles/
│   ├── utils/
│   ├── views/
│   ├── App.vue
│   └── main.js
├── .env
├── .env.example
├── API_CLIENT_DESIGN.md
├── COMPONENT_DESIGN.md
├── FRONTEND_STRUCTURE.md
├── ROUTE_DESIGN.md
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
└── vite.config.js
```

---

## Core Development Rules

1. Preserve the existing folder structure.
2. Do not move files unless the user explicitly asks.
3. Do not introduce TypeScript unless the project is explicitly migrated.
4. Do not introduce new major UI frameworks without approval.
5. Prefer small, focused changes over large rewrites.
6. Keep components reusable, readable, and easy to maintain.
7. Keep API logic inside `src/services`.
8. Keep route configuration inside `src/router`.
9. Keep shared helper logic inside `src/utils`.
10. Keep global styles inside `src/styles`.
11. Keep page-level screens inside `src/pages` or `src/views`, following the existing project convention.
12. Do not hardcode backend URLs directly inside components.
13. Always use environment variables for configurable endpoints.
14. Do not commit secrets, tokens, passwords, or real production credentials.
15. Do not expose sensitive user, employee, or company data in frontend code.

---

## Recommended Coding Style

Use Vue 3 Composition API for new components.

Preferred component structure:

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
</script>

<template>
  <section>
    <!-- content -->
  </section>
</template>
```

Use clear and consistent naming:

- Components: `PascalCase.vue`
- Pages / Views: `PascalCase.vue`
- Services: `camelCaseService.js`
- Utilities: `camelCase.js`
- Constants: `camelCase` or `UPPER_SNAKE_CASE` depending on usage

Examples:

```text
EmployeeList.vue
EmployeeForm.vue
employeeService.js
dateFormat.js
```

---

## UI / UX Guidelines

The UI should feel modern, clean, and suitable for an enterprise HRM / HRIS platform.

Use these principles:

- Clean layout with enough spacing
- Consistent typography
- Clear page titles and section headers
- Responsive design for desktop and tablet first
- Simple forms with clear labels
- Loading, empty, and error states for every data-driven screen
- Confirmation dialogs for destructive actions
- Search, filter, and pagination for list pages
- Status badges for active/inactive or workflow states
- Avoid cluttered dashboards
- Avoid excessive animation

Tailwind CSS should be used for styling unless the existing file already follows a different local convention.

---

## Component Guidelines

Place reusable UI components in:

```text
src/components/
```

Examples:

```text
src/components/common/AppButton.vue
src/components/common/AppInput.vue
src/components/common/AppModal.vue
src/components/common/AppTable.vue
src/components/common/AppBadge.vue
```

A component should be reusable when:

- It appears in more than one screen
- It represents a common UI pattern
- It can be configured with props
- It does not directly depend on a specific page business flow

Avoid putting API calls directly inside reusable components unless the component is specifically designed as a smart/domain component.

---

## Page / View Guidelines

Use page-level components for business screens.

Examples:

```text
src/pages/employees/EmployeeListPage.vue
src/pages/employees/EmployeeDetailPage.vue
src/pages/employees/EmployeeCreatePage.vue
src/pages/employees/EmployeeEditPage.vue
```

A page component may:

- Read route params
- Call services
- Handle loading state
- Handle page-specific validation
- Compose reusable components
- Control modals or page actions

Avoid making a single page component too large. If the file becomes hard to read, split it into child components.

---

## Layout Guidelines

Place layout components in:

```text
src/layouts/
```

Common layout examples:

```text
DefaultLayout.vue
AuthLayout.vue
DashboardLayout.vue
```

Layouts should handle:

- Header
- Sidebar
- Main content area
- User profile area
- Menu structure
- Responsive shell behavior

Layouts should not contain business logic for individual modules.

---

## Router Guidelines

Keep router configuration inside:

```text
src/router/
```

Routes should be grouped by module when possible.

Example route meta:

```js
const employeeListRoute = {
  path: '/employees',
  name: 'EmployeeList',
  component: () => import('@/pages/employees/EmployeeListPage.vue'),
  meta: {
    requiresAuth: true,
    title: 'Employees',
    permission: 'employee.view'
  }
}
```

Use lazy loading for page components.

Route guards should handle:

- Authentication checks
- Permission checks
- Redirects
- Page title updates if already supported by the project

Do not duplicate route guard logic across many files.

---

## Service / API Client Guidelines

All API calls must be placed in:

```text
src/services/
```

Recommended structure:

```text
src/services/apiClient.js
src/services/employeeService.js
src/services/masterDataService.js
src/services/authService.js
```

Service modules should:

- Use the shared API client
- Keep endpoint paths centralized
- Return clean response data
- Handle query params consistently
- Avoid direct UI logic
- Avoid alerts, modals, or router navigation

Example:

```js
import apiClient from './apiClient'

export const employeeService = {
  getEmployees(params) {
    return apiClient.get('/employees', { params })
  },

  getEmployeeById(id) {
    return apiClient.get(`/employees/${id}`)
  },

  createEmployee(payload) {
    return apiClient.post('/employees', payload)
  },

  updateEmployee(id, payload) {
    return apiClient.put(`/employees/${id}`, payload)
  },

  deleteEmployee(id) {
    return apiClient.delete(`/employees/${id}`)
  }
}
```

---

## Environment Variable Rules

Use `.env` for local configuration and `.env.example` as the safe template.

Vite environment variables must start with:

```text
VITE_
```

Example:

```text
VITE_API_BASE_URL=https://localhost:9019/api
VITE_APP_NAME=New HRM
```

Do not store secrets in `.env` if the file may be committed.

`.env.example` should not contain real passwords, production tokens, or private keys.

---

## State Management Guidelines

Use `src/stores/` for shared state.

Store only data that must be shared across pages/components, such as:

- Authenticated user profile
- Permissions
- App settings
- Sidebar/menu state
- Master data cache if needed

Do not store everything globally. Keep page-local state inside page components when it is only used by that page.

---

## Error Handling Guidelines

Every API-driven page should handle:

- Loading state
- Empty state
- Error state
- Success state after create/update/delete
- Form validation errors
- Unauthorized or forbidden responses

Do not silently fail.

Recommended UI patterns:

- Use inline error messages for forms
- Use toast or notification for save success/failure
- Use confirmation modal before delete/deactivate
- Use user-friendly messages, not raw stack traces

---

## Form Guidelines

For HRM / HRIS screens, forms should be clear and consistent.

Rules:

- Use labels for every input
- Mark required fields clearly
- Validate before submit
- Disable submit while saving
- Show server-side validation messages when available
- Use consistent date format
- Use dropdowns for master data
- Do not allow accidental destructive changes

---

## Table / List Page Guidelines

List pages should usually include:

- Page title
- Search box
- Filter section
- Main data table
- Pagination
- Row actions
- Empty state
- Loading state

Common row actions:

- View
- Edit
- Activate / Deactivate
- Delete, only when business rules allow

Avoid loading all records at once if backend pagination is available.

---

## HRM / HRIS Business Guidelines

This frontend should be suitable for HRM / HRIS modules such as:

- Company
- Branch
- Department
- Position
- Employee
- User
- Role
- Permission
- Master Data
- Support Case
- Workflow / Approval
- HRD / Training
- Competency
- Performance
- Dashboard

When implementing HR-related screens, consider:

- Employee data privacy
- Permission-based access
- Auditability
- Clear status handling
- Multi-company / multi-branch support if backend supports it
- Thai and English text readiness if localization is later required

Do not expose sensitive employee information unnecessarily.

---

## Authentication / Authorization Guidelines

If authentication is implemented, follow the existing auth architecture.

Do not invent a new auth flow without approval.

Expected patterns may include:

- Azure AD / Microsoft Entra ID SSO
- Backend JWT exchange
- Role-based access control
- Permission-based menu and route visibility

Frontend must not be the only security layer. Backend APIs must still enforce permissions.

---

## Menu / Sidebar Guidelines

Menus should be generated from a centralized configuration when possible.

Recommended menu item shape:

```js
const menuItem = {
  label: 'Employees',
  icon: 'users',
  path: '/employees',
  permission: 'employee.view'
}
```

Menu visibility should respect user permissions if permission data exists.

---

## Import Alias Guidelines

If `@` alias is configured in Vite, use it for imports from `src`.

Preferred:

```js
import EmployeeForm from '@/components/employees/EmployeeForm.vue'
import { employeeService } from '@/services/employeeService'
```

Avoid long relative paths:

```js
import EmployeeForm from '../../../components/employees/EmployeeForm.vue'
```

---

## Documentation Files

The project already includes design documents:

- `API_CLIENT_DESIGN.md`
- `COMPONENT_DESIGN.md`
- `FRONTEND_STRUCTURE.md`
- `ROUTE_DESIGN.md`

Before making large changes, AI agents should read and follow these files.

If implementation differs from the documentation, update the related documentation or clearly mention the mismatch.

---

## Development Commands

Use the commands already defined in `package.json`.

Common commands may include:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Before suggesting a command, check `package.json` if available.

Do not assume extra scripts exist.

---

## Quality Checklist Before Finishing

Before completing any coding task, verify:

- The app still builds
- No unused imports remain
- No console debugging logs are left behind
- UI is responsive enough for normal desktop usage
- API endpoints are not hardcoded
- Environment variables are used correctly
- Loading and error states are handled
- Components are not unnecessarily duplicated
- Naming is consistent
- Existing behavior is not broken
- Documentation is updated when needed

---

## Git / Change Safety Rules

AI agents should avoid risky changes.

Do not:

- Delete large folders
- Rewrite unrelated modules
- Change package versions unnecessarily
- Remove existing business logic
- Rename routes without checking usage
- Modify `.env` with real secrets
- Commit `node_modules`
- Commit `dist`
- Commit local IDE files

Prefer creating small commits or clearly separated change sets.

---

## Files and Folders to Avoid Editing Unless Needed

Avoid editing these unless the task requires it:

```text
node_modules/
dist/
.idea/
package-lock.json
```

Only update `package-lock.json` when dependencies are intentionally changed.

---

## Expected Agent Behavior

When working in this repository, the AI agent should:

1. Inspect the relevant existing files first.
2. Understand the current pattern before adding new code.
3. Reuse existing components and services where possible.
4. Ask for clarification only when a decision could significantly affect architecture or business behavior.
5. Make minimal, safe, and consistent changes.
6. Explain what was changed after completing the task.
7. Mention any assumptions or files that may need manual configuration.

---

## Project Structure and Folder Responsibility

Use the existing Vue 3 + Vite structure under `src/`. Do not create new top-level source folders unless the user approves an architecture change.

```text
src/
├── assets/
├── components/
├── layouts/
├── pages/
├── router/
├── services/
├── stores/
├── styles/
├── utils/
├── views/
├── App.vue
└── main.js
```

Folder responsibilities:

- `src/assets/`: Static frontend assets imported by Vue code, such as images, icons, or local media files. Do not place generated builds, API data, or business logic here.
- `src/components/`: Reusable Vue components. Put shared UI controls, layout fragments, form wrappers, tables, badges, modals, and domain-neutral presentation components here. Reusable components should receive data through props and events, and should not own page-specific API calls unless explicitly designed as smart/domain components.
- `src/layouts/`: Route shell components that define page chrome such as sidebar, header, topbar, breadcrumbs, and main content areas. Layouts should not contain module-specific business logic.
- `src/pages/`: Route-level page components when following the page convention. Use this for business screens grouped by domain, such as employees, departments, companies, positions, users, dashboard, and auth.
- `src/views/`: Route-level view components when following the active router convention. The current router primarily uses views for dashboard, employee, organization, and security screens. Before adding a new screen, inspect `src/router/index.js` and follow the convention already used by nearby routes.
- `src/router/`: Vue Router configuration, route metadata, layout-based routing, redirects, and navigation guards. Do not define routes inside page components.
- `src/services/`: API client configuration and domain service modules. All HTTP calls must live here. Components and pages should call service functions instead of constructing backend requests directly.
- `src/stores/`: Pinia stores for shared application state, such as auth/session, permissions, app shell state, selected records, and shared domain caches. Keep state local to a page when it is not shared.
- `src/styles/`: Global CSS and Tailwind entrypoints. Keep page-specific styling in components unless it is truly global.
- `src/utils/`: Small framework-neutral helper functions, such as response normalization, cookie helpers, formatting, and pure data utilities. Utilities should not depend on Vue component state or router side effects.

API file rules:

- Keep Axios instances, interceptors, endpoint wrappers, and API response normalization in `src/services/` or `src/utils/` as appropriate.
- Domain API files must use `camelCaseService.js` naming, for example `employeeService.js`.
- Do not hardcode backend origins in components or services. Use Vite environment variables such as `VITE_API_HRIS_ENDPOINT`, `VITE_API_BASE_URL`, or existing configured keys.
- Services should not show alerts, open modals, mutate router state, or own UI notifications.

Route-level screen rules:

- Use `src/views/` or `src/pages/` consistently with the route area being modified.
- Route-level screens may read route params, call stores/services, manage loading/error/empty states, and compose reusable components.
- Keep route metadata in `src/router/`, including `title`, `requiresAuth`, and `permission` when applicable.

State management rules:

- Use Pinia stores in `src/stores/` only for state shared across routes or components.
- Do not move every form field or page-only filter into a store.
- Store files should use `useXStore` exports and clear domain names, for example `useEmployeeStore` in `employeeStore.js`.

Naming conventions:

- Vue components, pages, views, and layouts: `PascalCase.vue`.
- Services: `camelCaseService.js`.
- Stores: `camelCaseStore.js` with `useXStore` exports.
- Utilities: `camelCase.js`.
- Constants: `camelCase` or `UPPER_SNAKE_CASE`, depending on usage.

Do not create new folders when:

- An existing folder already owns that responsibility.
- The change is a single component, service, store, or utility that fits the current structure.
- The folder would introduce a parallel convention to `components`, `pages`, `views`, `services`, `stores`, or `utils`.

Ask before changing architecture when:

- Moving screens between `src/pages/` and `src/views/`.
- Replacing the current router, store, service, or layout pattern.
- Introducing new source-root folders.
- Adding new libraries, UI frameworks, build tools, or state-management patterns.
- Changing authentication, permission, API client, or environment variable behavior.

---

## Suggested Module Pattern

For a new business module, follow this structure:

```text
src/pages/<module>/
├── <Module>ListPage.vue
├── <Module>DetailPage.vue
├── <Module>CreatePage.vue
└── <Module>EditPage.vue

src/components/<module>/
├── <Module>Form.vue
├── <Module>Table.vue
└── <Module>Filter.vue

src/services/
└── <module>Service.js
```

Example for employee:

```text
src/pages/employees/
├── EmployeeListPage.vue
├── EmployeeDetailPage.vue
├── EmployeeCreatePage.vue
└── EmployeeEditPage.vue

src/components/employees/
├── EmployeeForm.vue
├── EmployeeTable.vue
└── EmployeeFilter.vue

src/services/
└── employeeService.js
```

---

## Prompting Notes for AI Coding Agents

When receiving a task, follow this internal process:

1. Read related documentation files.
2. Locate existing components/services/routes.
3. Identify the smallest safe implementation path.
4. Implement according to existing conventions.
5. Avoid unnecessary dependency changes.
6. Run or suggest validation commands.
7. Summarize changed files and behavior.

---

## Final Rule

Consistency is more important than cleverness.

Build the frontend as a maintainable enterprise HRM / HRIS system, not as a one-off demo.
