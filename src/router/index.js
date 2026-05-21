import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import EmployeeFormView from '@/views/employee/EmployeeFormView.vue'
import EmployeeListView from '@/views/employee/EmployeeListView.vue'
import EmployeeProfileView from '@/views/employee/EmployeeProfileView.vue'
import OrganizationListView from '@/views/organization/OrganizationListView.vue'
import OrganizationPlaceholderView from '@/views/organization/OrganizationPlaceholderView.vue'
import SessionExpiredPage from '@/pages/auth/SessionExpiredPage.vue'
import SecurityPlaceholderView from '@/views/security/SecurityPlaceholderView.vue'
import { useAuthStore } from '@/stores/authStore'

const organizationRoutes = [
  { path: 'companies', name: 'organization-companies', title: 'Company', resource: 'companies', permission: 'organization.company.view' },
  { path: 'branches', name: 'organization-branches', title: 'Branch', resource: 'branches', permission: 'organization.branch.view' },
  { path: 'locations', name: 'organization-locations', title: 'Location', resource: 'locations', permission: 'organization.location.view' },
  { path: 'departments', name: 'organization-departments', title: 'Department', resource: 'departments', permission: 'organization.department.view' },
  { path: 'positions', name: 'organization-positions', title: 'Position', resource: 'positions', permission: 'organization.position.view' },
  { path: 'job-levels', name: 'organization-job-levels', title: 'Job Level', resource: 'jobLevels', permission: 'organization.job_level.view' },
  { path: 'cost-centers', name: 'organization-cost-centers', title: 'Cost Center', resource: 'costCenters', permission: 'organization.cost_center.view' }
]

const routes = [
  {
    path: '/session-expired',
    name: 'session-expired',
    component: SessionExpiredPage,
    meta: { title: 'Session Expired' }
  },
  {
    path: '/',
    component: AppLayout,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: { title: 'Dashboard', requiresAuth: true, permission: 'dashboard.view' }
      },
      {
        path: 'employees',
        name: 'employees',
        component: EmployeeListView,
        meta: { title: 'Employee Directory', requiresAuth: true, permission: 'employee.view' }
      },
      {
        path: 'employees/create',
        name: 'employee-create',
        component: EmployeeFormView,
        meta: { title: 'Create Employee', requiresAuth: true, permission: 'employee.create' }
      },
      {
        path: 'employees/:employeeId',
        name: 'employee-profile',
        component: EmployeeProfileView,
        meta: { title: 'Employee Profile', requiresAuth: true, permission: 'employee.view' }
      },
      {
        path: 'employees/:employeeId/edit',
        name: 'employee-edit',
        component: EmployeeFormView,
        meta: { title: 'Edit Employee', requiresAuth: true, permission: 'employee.update' }
      },
      ...organizationRoutes.map((route) => ({
        path: `organization/${route.path}`,
        name: route.name,
        component: OrganizationListView,
        meta: {
          title: route.title,
          requiresAuth: true,
          permission: route.permission,
          resource: route.resource
        }
      })),
      {
        path: 'employees/reporting-lines',
        name: 'employee-reporting-lines',
        component: OrganizationPlaceholderView,
        meta: {
          title: 'Reporting Line',
          requiresAuth: true,
          permission: 'employee.reporting_line.view',
          description: 'Define manager relationships and reporting chains for employees.',
          cardDescription: 'Use this module to connect employees to managers once the reporting line API is available.',
          items: [
            { label: 'Direct manager', description: 'Assign who each employee reports to.' },
            { label: 'Effective dates', description: 'Support changes in reporting line over time.' },
            { label: 'Org visibility', description: 'Enable future org chart and approval routing.' }
          ]
        }
      },
      {
        path: 'employees/assignments',
        name: 'employee-assignments',
        component: OrganizationPlaceholderView,
        meta: {
          title: 'Employee Assignment',
          requiresAuth: true,
          permission: 'employee.assignment.view',
          description: 'Manage employee placement in department, position, location, job level, and cost center.',
          cardDescription: 'The employee form already captures assignment intent. Persisting it needs the backend assignment API contract.',
          items: [
            { label: 'Department', description: 'Place employees under the right organization unit.' },
            { label: 'Position', description: 'Connect employees to job roles and job levels.' },
            { label: 'Cost center', description: 'Prepare finance and HR reporting alignment.' }
          ]
        }
      },
      {
        path: 'security/users',
        name: 'security-users',
        component: SecurityPlaceholderView,
        meta: { title: 'Users', requiresAuth: true, permission: 'security.user.view' }
      },
      {
        path: 'security/roles',
        name: 'security-roles',
        component: SecurityPlaceholderView,
        meta: { title: 'Roles', requiresAuth: true, permission: 'security.role.view' }
      },
      {
        path: 'security/permissions',
        name: 'security-permissions',
        component: SecurityPlaceholderView,
        meta: { title: 'Permissions', requiresAuth: true, permission: 'security.permission.view' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  authStore.loadSession()

  const nearestTitle = [...to.matched].reverse().find((route) => route.meta.title)?.meta.title
  document.title = nearestTitle ? `${nearestTitle} | HRIS Platform` : 'HRIS Platform'
})

window.addEventListener('hris:unauthorized', () => {
  useAuthStore().clearSession()

  if (router.currentRoute.value.name !== 'session-expired') {
    router.replace({ name: 'session-expired' })
  }
})

export default router
