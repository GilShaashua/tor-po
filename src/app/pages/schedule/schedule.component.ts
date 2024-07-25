import { ScheduleService } from 'src/app/services/schedule.service'
import { Month } from 'src/app/models/month.model'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { Appointment } from 'src/app/models/appointment.model'
import { SettingsScheduleComponent } from '../../components/settings-schedule/settings-schedule.component'
import { interval, Subject, takeUntil } from 'rxjs'

@Component({
    selector: 'schedule',
    standalone: true,
    imports: [CommonModule, MatIconModule, SettingsScheduleComponent],
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
    constructor(private scheduleService: ScheduleService) {}

    currMonth = new Date().getMonth()
    oclock!: string
    oclockTop!: string
    isOclockShown = false
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
    subscriptionSubject = new Subject<null>()

    ngOnInit(): void {
        this._initOclockInterval()
        this._getMonth()
        this._getBookedAppointments()
    }

    private _initOclockInterval() {
        interval(1000)
            .pipe(takeUntil(this.subscriptionSubject))
            .subscribe({
                next: () => {
                    this._getOclock()
                },
                error: (err) => {
                    console.error('Cannot get oclock', err)
                },
            })
    }

    private _getOclock() {
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()

        const oclock =
            hours.toFixed(0).padStart(2, '0') +
            ':' +
            minutes.toFixed(0).padStart(2, '0')

        this.oclock = oclock

        if (hours >= 8 && hours < 18) {
            this.isOclockShown = true
        } else {
            this.isOclockShown = false
            return
        }

        const scheduleStartTime = 8 // schedule starts at 8 AM
        const minutesInHour = 90

        const minutesSinceStart =
            (hours - scheduleStartTime) * minutesInHour +
            minutes * (minutesInHour / 60)

        this.oclockTop = minutesSinceStart + 'px'
    }

    private _getBookedAppointments() {
        this.scheduleService
            .getAppointments()
            .pipe(takeUntil(this.subscriptionSubject))
            .subscribe({
                next: (appointments) => {
                    this.appointments = appointments
                    this._getEmptyAppointments()
                },
                error: (err) => {
                    console.error('Cannot get appointments', err)
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
                    isBlocked: false,
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
                isBlocked: false,
            })
        }

        // Merge the booked and empty appointments
        this.appointments = [...emptyAppointments, ...this.appointments].sort(
            (a, b) => a.timeStart.localeCompare(b.timeStart)
        )
    }

    getAppointmentPosition(appointment: Appointment, isLatest: boolean) {
        const scheduleStartTime = 8 // schedule starts at 8 AM
        const hourHeight = 90 // each hour in the schedule is represented by 90px

        const startTime = this._extractHour(appointment.timeStart)
        const endTime = this._extractHour(appointment.timeEnd)

        let top = (startTime - scheduleStartTime) * hourHeight
        let height = (endTime - startTime) * hourHeight

        if (isLatest) {
            return {
                top: `${top}px`,
                height: `${height + 7}px`,
                position: 'absolute',
            }
        } else {
            return {
                top: `${top}px`,
                height: `${height}px`,
                position: 'absolute',
            }
        }
    }

    getSeperatorPosition(idx: number) {
        const scheduleStartTime = 8 // schedule starts at 8 AM
        const hourHeight = 90 // each hour in the schedule is represented by 90px

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

    ngOnDestroy(): void {
        this.subscriptionSubject.next(null)
        this.subscriptionSubject.complete()
    }
}
