import { ScheduleService } from 'src/app/services/schedule.service'
import { Month } from 'src/app/models/month.model'
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { Appointment } from 'src/app/models/appointment.model'
import { SettingsScheduleComponent } from '../../components/settings-schedule/settings-schedule.component'

@Component({
    selector: 'schedule',
    standalone: true,
    imports: [CommonModule, MatIconModule, SettingsScheduleComponent],
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
                this._getEmptyAppointments()
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

    private _getEmptyAppointments() {
        let id = 1
        const emptyAppointments: Appointment[] = []
        let lastEndTime = '08:00' // Start of the day

        this.appointments.sort((a, b) => a.timeStart.localeCompare(b.timeStart)) // Ensure appointments are sorted

        for (const appointment of this.appointments) {
            if (appointment.timeStart > lastEndTime) {
                // There's a gap
                emptyAppointments.push({
                    id: -1, // -1 or any other placeholder to indicate an empty slot
                    title: '',
                    clientName: '',
                    timeStart: lastEndTime,
                    timeEnd: appointment.timeStart,
                    isBooked: false,
                })
            }

            lastEndTime = appointment.timeEnd
        }

        // Check for a gap between the last appointment and the end of the day
        if (lastEndTime < '18:00') {
            emptyAppointments.push({
                id: id++,
                title: '',
                clientName: '',
                timeStart: lastEndTime,
                timeEnd: '18:00',
                isBooked: false,
            })
        }

        // Merge the booked and empty appointments
        this.appointments = [...emptyAppointments, ...this.appointments].sort(
            (a, b) => a.timeStart.localeCompare(b.timeStart)
        )
    }

    getAppointmentStyle(appointment: Appointment, isLatest: boolean) {
        const scheduleStartTime = 8 // schedule starts at 8 AM
        const hourHeight = 60 + 30 // each hour in the schedule is represented by 60px

        const startTime = this._extractHour(appointment.timeStart)
        const endTime = this._extractHour(appointment.timeEnd)

        let top = (startTime - scheduleStartTime) * hourHeight
        let height = (endTime - startTime) * hourHeight

        if (isLatest) {
            return {
                top: `${top}px`,
                height: `${height + 10}px`,
                position: 'absolute',
            }
        } else {
            return {
                top: `${top}px`,
                height: `${height}px`,
                position: 'absolute',
                'z-index': 999,
            }
        }
    }

    getSeperatorStyle(idx: number) {
        const scheduleStartTime = 8 // schedule starts at 8 AM
        const hourHeight = 60 + 30 // each hour in the schedule is represented by 60px

        let startTime!: number

        switch (idx + 1) {
            case 1: {
                startTime = 8
                break
            }
            case 2: {
                startTime = 9
                break
            }
            case 3: {
                startTime = 10
                break
            }
            case 4: {
                startTime = 11
                break
            }
            case 5: {
                startTime = 12
                break
            }
            case 6: {
                startTime = 13
                break
            }
            case 7: {
                startTime = 14
                break
            }
            case 8: {
                startTime = 15
                break
            }
            case 9: {
                startTime = 16
                break
            }
            case 10: {
                startTime = 17
                break
            }
            case 11: {
                startTime = 18
                break
            }
        }

        let top = (startTime - scheduleStartTime) * hourHeight

        return {
            top: `${top}px`,
        }
    }

    private _extractHour(time: string): number {
        let [hour, minutes] = time.split(':').map(Number)

        if (minutes === 30) {
            hour += 0.5
        }

        return hour
    }

    isDecimal(time: string): boolean {
        const hour = this._extractHour(time)

        return hour % 1 !== 0
    }
}
