import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScheduleService } from 'src/app/services/schedule.service'
import { Month } from 'src/app/models/month.model'
import { MatIconModule } from '@angular/material/icon'

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
    monthSchedule!: Month

    ngOnInit(): void {
        this._getScheduleByMonth()
    }

    private _getScheduleByMonth() {
        this.scheduleService
            .getScheduleByMonth(this.currMonth, 1, 7)
            .subscribe({
                next: (month) => {
                    console.log(month)
                    this.monthSchedule = month
                },
                error: (err) => {
                    console.error('err', err)
                },
            })
    }
}
