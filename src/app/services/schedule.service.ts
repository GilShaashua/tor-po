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
        let appointments = localStorage.getItem('appointments')

        if (appointments) {
            const appointmentsParsed = JSON.parse(appointments)

            if (appointments) {
                return of(appointmentsParsed)
            }
        }

        appointments = JSON.stringify([
            {
                id: 1,
                title: 'הסרת פנים בלייזר',
                clientName: 'שמעון הלוי',
                timeStart: '10:00',
                timeEnd: '11:00',
                isBooked: true,
            },
            {
                id: 2,
                title: 'הסרת פנים בלייזר',
                clientName: 'שמעון הלוי',
                timeStart: '13:30',
                timeEnd: '14:30',
                isBooked: true,
            },
            {
                id: 3,
                title: 'הסרת פנים בלייזר',
                clientName: 'שמעון הלוי',
                timeStart: '16:00',
                timeEnd: '17:00',
                isBooked: true,
            },
        ])

        localStorage.setItem('appointments', appointments)
        return of(JSON.parse(appointments))
    }
}
