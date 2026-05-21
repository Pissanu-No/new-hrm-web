# Route Design

Routes use Vue Router with layout-based routing. HRIS pages render inside `AppLayout`.

## Route Meta

Every application route defines title and permission metadata:

```js
meta: {
  title: 'Employee Directory',
  requiresAuth: true,
  permission: 'employee.view'
}
```

`title` is used by the document title and breadcrumb.

`requiresAuth` marks routes that need a stored frontend session.

`permission` keeps the route contract ready for backend authorization.

## Routes

```text
/dashboard
/employees
/employees/create
/employees/:employeeId
/employees/:employeeId/edit
/organization/companies
/organization/branches
/organization/locations
/organization/departments
/organization/positions
/organization/job-levels
/organization/job-families
/organization/cost-centers
/security/users
/security/roles
/security/permissions
```

## Employee Profile Tabs

The employee profile page uses local tab state:

```text
Overview
Employment
Address
Emergency Contacts
Education
Certifications
Documents
Activity
```

Documents and Activity are placeholders in the active UI. Attachment upload API is available in the service layer for later UI integration.
