import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'settings-schedule',
    standalone: true,
    imports: [CommonModule, MatIconModule, RouterModule],
    templateUrl: './settings-schedule.component.html',
    styleUrl: './settings-schedule.component.scss',
})
export class SettingsScheduleComponent {
    isSettingsScheduleOpen = false
}
