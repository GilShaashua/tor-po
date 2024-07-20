import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
    selector: 'login-validation',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule],
    templateUrl: './login-validation.component.html',
    styleUrls: ['./login-validation.component.scss'],
})
export class LoginValidationComponent implements OnInit, AfterViewInit {
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    @ViewChild('input0') input0!: ElementRef
    @ViewChild('input1') input1!: ElementRef
    @ViewChild('input2') input2!: ElementRef
    @ViewChild('input3') input3!: ElementRef
    @ViewChild('input4') input4!: ElementRef
    @ViewChild('input5') input5!: ElementRef

    form = this.formBuilder.group({
        0: ['', [Validators.required, Validators.maxLength(1)]],
        1: ['', [Validators.required, Validators.maxLength(1)]],
        2: ['', [Validators.required, Validators.maxLength(1)]],
        3: ['', [Validators.required, Validators.maxLength(1)]],
        4: ['', [Validators.required, Validators.maxLength(1)]],
        5: ['', [Validators.required, Validators.maxLength(1)]],
    })
    phoneNumber = ''
    isLoading = false

    ngOnInit(): void {
        this._getParams()
    }

    ngAfterViewInit(): void {
        this.input0.nativeElement.focus()
    }

    private _getParams() {
        this.route.params.subscribe({
            next: (params) => {
                const phoneNumber = params['phoneNumber']
                this.phoneNumber = phoneNumber
            },
            error: (err) => {
                console.error('err', err)
            },
        })
    }

    onSubmitCode() {
        if (this.form.invalid) return

        this.isLoading = true

        const code = Object.values(this.form.value).join('')

        this.authService.login(this.phoneNumber, code).subscribe({
            next: (user) => {
                if (user) {
                    this.authService.setLoggedInUser(user)
                    if (user.isProvider) this.router.navigateByUrl('/')
                    else this.router.navigateByUrl('/')
                } else {
                    console.error('No user found!')
                }

                this.isLoading = false
            },
            error: (err) => {
                console.error('err', err)
            },
        })
    }

    onKeyDownInput(ev: KeyboardEvent) {
        const input = ev.target as HTMLInputElement
        const name = input.name

        const allowedRegex = /[0-9]/

        if (
            !allowedRegex.test(ev.key) &&
            ev.key !== 'Backspace' &&
            ev.key !== 'Tab'
        ) {
            // Prevent the default action if it's not a number
            ev.preventDefault()
            return
        }

        if (ev.key === 'Backspace') {
            ev.preventDefault()

            switch (name) {
                case '0':
                    break // No previous input to focus
                case '1':
                    this.input0.nativeElement.focus()
                    this.form.controls[1].patchValue('')
                    this.form.controls[0].patchValue('')
                    break
                case '2':
                    this.input1.nativeElement.focus()
                    this.form.controls[2].patchValue('')
                    this.form.controls[1].patchValue('')
                    break
                case '3':
                    this.input2.nativeElement.focus()
                    this.form.controls[3].patchValue('')
                    this.form.controls[2].patchValue('')
                    break
                case '4':
                    this.input3.nativeElement.focus()
                    this.form.controls[4].patchValue('')
                    this.form.controls[3].patchValue('')
                    break
                case '5':
                    this.input4.nativeElement.focus()
                    this.form.controls[5].patchValue('')
                    this.form.controls[4].patchValue('')
                    break
            }
        }
    }

    onChangeInput(nextInput?: HTMLInputElement) {
        if (Object.values(this.form.value).join('').length === 6) {
            this.onSubmitCode() // Submit code  when 6 digits are entered
            return
        }

        nextInput?.focus()
    }
}
