# API Client Design

API integration is centralized through Axios and domain service modules.

## Environment Configuration

The project environment key is:

```text
VITE_API_HRIS_ENDPOINT
```

`VITE_API_BASE_URL` is supported only as a compatibility fallback.

No backend URL is hardcoded in application code.

## API Client

`src/services/apiClient.js` exports the configured Axios instance.

Responsibilities:

- Read backend origin from `VITE_API_BASE_URL` or `VITE_API_HRIS_ENDPOINT`.
- Set JSON headers and request timeout.
- Attach `Authorization: Bearer <token>` from browser cookies.
- Send requests with credentials enabled.
- Handle `401` globally by clearing the in-memory HRIS session, showing the Session Expired page, and redirecting to `VITE_CENTRA_ENDPOINT`.
- Normalize wrapped and direct API responses.
- Normalize rejected responses into `{ status, message, errors, original }`.

## Response Normalization

Spring Boot APIs may return direct data or a wrapped response:

```js
{ employeeId: 'EMP-001' }
```

```js
{ success: true, message: 'Success', data: {} }
```

The response interceptor returns `response.data.data` when the `data` key exists. Otherwise it returns `response.data`.

## Domain Services

Service modules expose endpoint functions only. They do not own UI state, routing, or notifications.

Implemented services:

```text
authService.js
auditLogService.js
branchService.js
companyService.js
costCenterService.js
departmentService.js
employeeService.js
employeeAttachmentFileService.js
employeeAddressService.js
emergencyContactService.js
employeeEducationService.js
employeeCertificationService.js
jobLevelService.js
locationService.js
lookupMasterService.js
organizationService.js
positionService.js
systemMenuService.js
```

Current Swagger-backed API paths use the backend `/v1/s` secure prefix, for example:

```text
GET    /v1/s/employees
POST   /v1/s/employees
GET    /v1/s/employees/{employeeId}
PUT    /v1/s/employees/{employeeId}
DELETE /v1/s/employees/{employeeId}
```

Master data APIs exposed by Swagger use `/v1/s/master`:

```text
GET    /v1/s/master/branches
GET    /v1/s/master/locations
GET    /v1/s/master/job-levels
GET    /v1/s/master/cost-centers
GET    /v1/s/master/lookup-groups
GET    /v1/s/master/lookup-values
```

Attachment file APIs are exposed by Swagger under the secure prefix:

```text
GET    /v1/s/employees/{employeeId}/attachment-files
POST   /v1/s/employees/{employeeId}/attachment-files
POST   /v1/s/employees/{employeeId}/attachment-files/upload
GET    /v1/s/employees/{employeeId}/attachment-files/{attachmentFileId}
PUT    /v1/s/employees/{employeeId}/attachment-files/{attachmentFileId}
DELETE /v1/s/employees/{employeeId}/attachment-files/{attachmentFileId}
GET    /v1/s/employees/{employeeId}/attachment-files/{attachmentFileId}/download
```

Upload uses `multipart/form-data`. Swagger marks metadata fields `attachmentCategory` and `attachmentType` as required. The generated schema does not show the binary file field even though the endpoint summary says it uploads a file, so the frontend service sends the file in multipart field `file`.
