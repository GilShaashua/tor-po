import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Month } from '../models/month.model'

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {
    constructor(http: HttpClient) {}

    getScheduleByMonth(
        month: number,
        dayStart: number,
        dayEnd: number
    ): Observable<Month> {
        return of({
            id: 1,
            name: 'יולי',
            dayStart: 1,
            dayEnd: 7,
        })
    }
}
