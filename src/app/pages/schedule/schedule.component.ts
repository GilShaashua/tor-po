import { ScheduleService } from 'src/app/services/schedule.service'
import { Month } from 'src/app/models/month.model'
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { Appointment } from 'src/app/models/appointment.model'

@Component({
    selector: 'schedule',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
    constructor(private scheduleService: ScheduleService) {}

    currMonth = new Date().getMonth()
    month!: Month
    hours = [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
    ]
    appointments!: Appointment[]

    ngOnInit(): void {
        this._getMonth()
        this._getAppointments()
    }

    private _getAppointments() {
        this.scheduleService.getAppointments().subscribe({
            next: (appointments) => {
                this.appointments = appointments
            },
            error: (err) => {
                console.error('err', err)
            },
        })
    }

    private _getMonth() {
        this.scheduleService.getMonth(this.currMonth, 1, 7).subscribe({
            next: (month) => {
                this.month = month
            },
            error: (err) => {
                console.error('err', err)
            },
        })
    }

    calculateAppointmentStyle(appointment: Appointment) {
        const scheduleStartTime = 8 // Assuming your schedule starts at 8 AM
        const hourHeight = 60 + 20 // Assuming each hour in the schedule is represented by 60px

        const startTime = this._extractHour(appointment.timeStart)
        const endTime = this._extractHour(appointment.timeEnd)

        let top = (startTime - scheduleStartTime) * hourHeight
        let height = (endTime - startTime) * hourHeight + 20

        if (this._isDecimal(startTime) && this._isDecimal(endTime)) {
            top += 5
            height -= 12
        }

        return {
            top: `${top}px`,
            height: `${height}px`,
            position: 'absolute',
        }
    }

    private _extractHour(time: string): number {
        let [hour, minutes] = time.split(':').map(Number)

        if (minutes === 30) {
            hour += 0.5
        }

        return hour
    }

    private _isDecimal(num: number) {
        return num % 1 !== 0
    }
}
