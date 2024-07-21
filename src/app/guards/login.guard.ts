import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'

export const loginGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)
    const loggedInUser = authService.getLoggedInUser()

    if (loggedInUser) {
        console.error('There is already a loggedInUser!')
        authService.setLoggedInUser(null)
        router.navigateByUrl('/')
        return false
    }

    return true
}
