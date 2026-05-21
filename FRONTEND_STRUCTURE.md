# Frontend Structure

This project is a Vue 3 + Vite frontend for an enterprise HRIS + HRD platform.

## Principles

- Keep feature code grouped by business domain.
- Keep reusable UI components separate from page components.
- Keep API access inside services, never directly inside shared UI components.
- Use Pinia for shared frontend state only.
- Use Vue Router route meta for page title, authentication, and permission metadata.
- Use `VITE_API_HRIS_ENDPOINT` for backend origin configuration.

## Target Structure

```text
src/
  App.vue
  main.js
  assets/
  components/
    forms/
    layout/
    ui/
  layouts/
  pages/
    auth/
    dashboard/
    companies/
    departments/
    positions/
    employees/
    users/
  router/
  services/
  stores/
  styles/
  utils/
```

## Folder Responsibilities

`components/layout`
: Shared shell components such as sidebar, topbar, and navigation groups.

`components/ui`
: Small reusable presentation components such as page headers, tables, badges, empty states, and metric cards.

`components/forms`
: Form field wrappers and reusable form patterns that can be reused by employee, company, department, and position forms.

`layouts`
: Route layouts. The main application shell lives here.

`pages`
: Route-level pages grouped by HRIS domain.

`router`
: Route definitions, route meta, layout-based routing, and navigation guards.

`services`
: Axios client and domain service modules. Pages call services; services call HTTP endpoints.

`stores`
: Pinia stores for auth/session, app shell state, and other shared state.

`styles`
: Tailwind entrypoint and global application CSS.

`utils`
: Small framework-neutral helpers.

## Naming

- Vue components use PascalCase file names.
- Service files use domain names such as `employeeService.js`.
- Stores use `useXStore` naming and `xStore.js` files.
- Page files are explicit, for example `EmployeeListPage.vue`.
