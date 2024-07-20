import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { firstValueFrom, timer } from 'rxjs'

@Component({
    selector: 'login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
    constructor(private formBuilder: FormBuilder, private router: Router) {}

    @ViewChild('input0') input0!: ElementRef
    @ViewChild('input1') input1!: ElementRef
    @ViewChild('input2') input2!: ElementRef
    @ViewChild('input3') input3!: ElementRef
    @ViewChild('input4') input4!: ElementRef
    @ViewChild('input5') input5!: ElementRef
    @ViewChild('input6') input6!: ElementRef
    @ViewChild('input7') input7!: ElementRef
    @ViewChild('input8') input8!: ElementRef
    @ViewChild('input9') input9!: ElementRef

    form: FormGroup = this.formBuilder.group({
        0: ['', [Validators.required, Validators.maxLength(1)]],
        1: ['', [Validators.required, Validators.maxLength(1)]],
        2: ['', [Validators.required, Validators.maxLength(1)]],
        3: ['', [Validators.required, Validators.maxLength(1)]],
        4: ['', [Validators.required, Validators.maxLength(1)]],
        5: ['', [Validators.required, Validators.maxLength(1)]],
        6: ['', [Validators.required, Validators.maxLength(1)]],
        7: ['', [Validators.required, Validators.maxLength(1)]],
        8: ['', [Validators.required, Validators.maxLength(1)]],
        9: ['', [Validators.required, Validators.maxLength(1)]],
    })

    isLoading = false

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.input0.nativeElement.focus()
    }

    onChangeInput(nextInput?: HTMLInputElement) {
        if (Object.values(this.form.value).join('').length === 10)
            this.onSubmitMobilePhone()

        nextInput?.focus()
    }

    onClearInput(ev: KeyboardEvent) {
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
                case '6':
                    this.input5.nativeElement.focus()
                    this.form.controls[6].patchValue('')
                    this.form.controls[5].patchValue('')
                    break
                case '7':
                    this.input6.nativeElement.focus()
                    this.form.controls[7].patchValue('')
                    this.form.controls[6].patchValue('')
                    break
                case '8':
                    this.input7.nativeElement.focus()
                    this.form.controls[8].patchValue('')
                    this.form.controls[7].patchValue('')
                    break
                case '9':
                    this.input8.nativeElement.focus()
                    this.form.controls[9].patchValue('')
                    this.form.controls[8].patchValue('')
                    break
            }
        }
    }

    async onSubmitMobilePhone() {
        if (this.form.invalid) return

        const phoneNumber = Object.values(this.form.value).join('')
        if (phoneNumber.length !== 10) return

        this.isLoading = true

        await firstValueFrom(timer(2000))

        this.isLoading = false

        this.router.navigateByUrl(`/login/validation/${phoneNumber}`)
    }
}
