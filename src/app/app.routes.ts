import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';
import { PERMISSIONS } from './core/authorization/permission.constants';

export const routes: Routes = [
  // =========================
  // PUBLIC ROUTES
  // =========================

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'accept-invitation',
    loadComponent: () =>
      import('./features/hiring/pages/offers/invitation-offer/invitation-offer.component')
        .then(m => m.InvitationOfferComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/hiring/pages/offers/invitation-offer/invitation-offer.component')
        .then(m => m.InvitationOfferComponent)
  },


  // =========================
  // AUTHENTICATED APPLICATION
  // =========================

  {
    path: '',
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),

    canActivate: [authGuard],

    children: [

      // =========================
      // DASHBOARD
      // =========================

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/components/dashboard.component')
            .then(m => m.DashboardComponent)
      },


      // =========================
      // HIRING
      // =========================

      {
        path: 'hiring',
        loadComponent: () =>
          import('./features/hiring/pages/hiring-dashboard/hiring-dashboard.component')
            .then(m => m.HiringDashboardComponent)
      },

      {
        path: 'hiring/single',
        loadComponent: () =>
          import('./features/hiring/pages/single-hiring/single-hiring.component')
            .then(m => m.SingleHiringComponent)
      },

      {
        path: 'hiring/offers/:onboardingId',
        loadComponent: () =>
          import('./features/hiring/pages/offers/offers.component')
            .then(m => m.OffersComponent)
      },

      {
        path: 'hiring/offers/:onboardingId/create',
        loadComponent: () =>
          import('./features/hiring/pages/offers/offer-letter/offer-letter.component')
            .then(m => m.OfferLetterComponent)
      },

      {
        path: 'hiring/offers/:onboardingId/edit/:offerId',
        loadComponent: () =>
          import('./features/hiring/pages/offers/offer-letter/offer-letter.component')
            .then(m => m.OfferLetterComponent)
      },

      {
        path: 'hiring/offers/:onboardingId/view/:offerId',
        loadComponent: () =>
          import('./features/hiring/pages/offers/view-offer/view-offer.component')
            .then(m => m.ViewOfferComponent)
      },


      // =========================
      // EMPLOYEES
      // =========================

      {
        path: 'employees',

        loadComponent: () =>
          import('./features/employees/employee.component')
            .then(m => m.EmployeeComponent),

        children: [

          {
            path: '',
            loadComponent: () =>
              import('./features/employees/pages/employee-list/employee-list.component')
                .then(m => m.EmployeeListComponent)
          },

          {
            path: 'create',
            loadComponent: () =>
              import('./features/employees/pages/employee-edit/employee-edit.component')
                .then(m => m.EmployeeEditComponent)
          },

          {
            path: ':id/edit',
            loadComponent: () =>
              import('./features/employees/pages/employee-edit/employee-edit.component')
                .then(m => m.EmployeeEditComponent)
          },

          {
            path: ':id',
            loadComponent: () =>
              import('./features/employees/pages/employee-details/employee-details.component')
                .then(m => m.EmployeeDetailsComponent)
          }
        ]
      },


      // =========================
      // ADMINISTRATION
      // =========================

      {
        path: 'administration',

        children: [

          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'dashboard'
          },

          {
            path: 'dashboard',
            loadComponent: () =>
              import('./features/administration/pages/administration-dashboard/administration-dashboard')
                .then(m => m.AdministrationDashboard)
          },

          {
            path: 'roles',
            loadComponent: () =>
              import('./features/administration/pages/roles/roles')
                .then(m => m.Roles)
          },

          {
            path: 'roles/:roleId',
            loadComponent: () =>
              import('./features/administration/pages/role-details/role-details')
                .then(m => m.RoleDetails)
          },

          {
            path: 'permissions',
            loadComponent: () =>
              import('./features/administration/pages/permissions/permissions')
                .then(m => m.Permissions)
          },

          {
            path: 'access-control',
            loadComponent: () =>
              import('./features/administration/pages/access-control/access-control')
                .then(m => m.AccessControl)
          },

          {
            path: 'company-policies',
            loadComponent: () =>
              import('./features/administration/pages/company-policies/company-policies')
                .then(m => m.CompanyPolicies)
          }
        ]
      },


      // =========================
      // PAYROLL
      // =========================

      {
        path: 'payroll',

        loadComponent: () =>
          import('./features/payroll/pages/payroll-dashboard/payroll-dashboard')
            .then(m => m.PayrollDashboard)
      },

      {
        path: 'payroll/generate',

        loadComponent: () =>
          import('./features/payroll/pages/generate-payroll/generate-payroll')
            .then(m => m.GeneratePayroll)
      },

      {
        path: 'payroll/payroll-details/:payrollId',

        loadComponent: () =>
          import('./features/payroll/pages/payroll-details/payroll-details')
            .then(m => m.PayrollDetails)
      },


      // =========================
      // TASKS
      // =========================

      {
        path: 'tasks',

        loadComponent: () =>
          import('./features/tasks/pages/task-dashboard/task-dashboard')
            .then(m => m.TaskDashboard),

        canActivate: [
          permissionGuard(PERMISSIONS.Task.View)
        ]
      },

      {
        path: 'tasks/create',

        loadComponent: () =>
          import('./features/tasks/pages/task-form/task-form')
            .then(m => m.TaskForm),

        canActivate: [
          permissionGuard(PERMISSIONS.Task.Create)
        ]
      },

      {
        path: 'tasks/:taskId/edit',

        loadComponent: () =>
          import('./features/tasks/pages/task-form/task-form')
            .then(m => m.TaskForm),

        canActivate: [
          permissionGuard(PERMISSIONS.Task.Update)
        ]
      },

      {
        path: 'tasks/:taskId',

        loadComponent: () =>
          import('./features/tasks/pages/task-details/task-details')
            .then(m => m.TaskDetails),

        canActivate: [
          permissionGuard(PERMISSIONS.Task.View)
        ]
      },


      // =========================
      // DEPARTMENTS
      // =========================

      {
        path: 'departments',

        loadComponent: () =>
          import('./features/departments/pages/department-list/department-list.component')
            .then(m => m.DepartmentListComponent)
      },

      {
        path: 'departments/create',

        loadComponent: () =>
          import('./features/departments/pages/department-form/department-form.component')
            .then(m => m.DepartmentFormComponent)
      },

      {
        path: 'departments/:id/edit',

        loadComponent: () =>
          import('./features/departments/pages/department-form/department-form.component')
            .then(m => m.DepartmentFormComponent)
      },


      // =========================
      // DESIGNATIONS
      // =========================

      {
        path: 'designations',

        loadComponent: () =>
          import('./features/designations/pages/designation-list/designation-list.component')
            .then(m => m.DesignationListComponent)
      },

      {
        path: 'designations/create',

        loadComponent: () =>
          import('./features/designations/pages/designation-form/designation-form.component')
            .then(m => m.DesignationFormComponent)
      },

      {
        path: 'designations/:id/edit',

        loadComponent: () =>
          import('./features/designations/pages/designation-form/designation-form.component')
            .then(m => m.DesignationFormComponent)
      },


      // =========================
      // DEFAULT AUTHENTICATED ROUTE
      // =========================

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ]
  },


  // =========================
  // UNKNOWN ROUTE
  // =========================

  {
    path: '**',
    redirectTo: 'login'
  }
];