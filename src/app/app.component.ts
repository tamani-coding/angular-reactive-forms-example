import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-reactive-forms-example';

  elements = [{ key: 'fire', value: 'Fire' }, { key: 'ice', value: 'Ice' }, { key: 'water', value: 'Water' }, { key: 'thunder', value: 'Thunder' }]

  magicianForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.magicianForm = this.formBuilder.group({
      name: formBuilder.control('', [ Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[A-Za-z \-]*$') ]),
      birthday: formBuilder.control('', [ Validators.required, this.atLeastTwenty ]),
      element: formBuilder.control('', [ Validators.required ]),
      intelligence: formBuilder.control(50),
      wisdom: formBuilder.control(50)
    }, {
      validators: [this.validAttributes]
    });
  }

  public onSubmit() {
    console.log(this.magicianForm.value)
  }

  private atLeastTwenty(control: AbstractControl): ValidationErrors | null {
    if (control.value == null) {
      return null
    }

    const birthday = new Date(control.value)
    const birthdayYear = birthday.getFullYear()
    const currentYear = new Date().getFullYear()

    if (currentYear - birthdayYear < 20) {
      return { 'invalidAge': true }
    }

    return null
  }

  private validAttributes(control: AbstractControl): ValidationErrors | null {

    if (control.get('element')?.value == 'fire' && control.get('intelligence')?.value < 60) {
      return { 'invalidFire': true }
    }

    if (control.get('element')?.value == 'ice' && control.get('intelligence')?.value < 75) {
      return { 'invalidIce': true }
    }

    if (control.get('element')?.value == 'water' && control.get('wisdom')?.value < 65) {
      return { 'invalidWater': true }
    }

    if (control.get('element')?.value == 'thunder' && control.get('wisdom')?.value < 80) {
      return { 'invalidThunder': true }
    }

    return null
  }
}
