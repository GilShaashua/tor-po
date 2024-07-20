import { Routes } from '@angular/router'
import { ScheduleComponent } from './pages/schedule/schedule.component'
import { ServiceManagementComponent } from './pages/service-management/service-management.component'

export const dashboardRoutes: Routes = [
    {
        path: '',
        component: ScheduleComponent,
        title: 'Schedule | TorPo',
    },

    {
        path: 'service-management',
        component: ServiceManagementComponent,
        title: 'Service management | TorPo',
    },
]
