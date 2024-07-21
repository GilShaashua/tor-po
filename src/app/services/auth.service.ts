import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, delay, Observable, of } from 'rxjs'
import { User } from '../models/user.model'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) {}

    private _loggedInUser$ = new BehaviorSubject<User | null>(
        this.getLoggedInUserCookie()
    )
    public loggedInUser$ = this._loggedInUser$.asObservable()

    login(phoneNumber: string, code: String): Observable<User | null> {
        return of({ id: 1, name: 'Gil Shaashua', isProvider: true }).pipe(
            delay(2000)
        )
    }

    setLoggedInUser(user: User | null): void {
        this.cookieService.set('loggedInUser', JSON.stringify(user))
        this._loggedInUser$.next(user)
    }

    getLoggedInUserCookie(): User | null {
        if (!this.cookieService.get('loggedInUser')) return null
        return JSON.parse(this.cookieService.get('loggedInUser'))
    }

    getLoggedInUser(): User | null {
        return this._loggedInUser$.value
    }
}
