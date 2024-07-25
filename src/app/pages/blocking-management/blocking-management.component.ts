import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'

@Component({
    selector: 'blocking-management',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './blocking-management.component.html',
    styleUrl: './blocking-management.component.scss',
})
export class BlockingManagementComponent {}
