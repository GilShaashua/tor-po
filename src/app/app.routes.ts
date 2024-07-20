import { Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { dashboardRoutes } from './dashboard.routes'
import { LoginValidationComponent } from './pages/login-validation/login-validation.component'
import { authGuard } from './guards/auth.guard'
import { loginGuard } from './guards/login.guard'

export const routes: Routes = [
    { path: '', children: dashboardRoutes, canActivate: [authGuard] },
    {
        path: 'login/validation/:phoneNumber',
        component: LoginValidationComponent,
        title: 'Login validation | TorPo',
        canActivate: [loginGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login | TorPo',
        canActivate: [loginGuard],
    },
]
