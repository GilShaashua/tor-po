import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Month } from '../models/month.model'
import { Appointment } from '../models/appointment.model'

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {
    constructor(http: HttpClient) {}

    getMonth(
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

    getAppointments(): Observable<Appointment[]> {
        return of([
            {
                id: 1,
                title: 'הסרת פנים בלייזר',
                clientName: 'שמעון הלוי',
                timeStart: '10:30',
                timeEnd: '11:30',
            },
        ])
    }
}
