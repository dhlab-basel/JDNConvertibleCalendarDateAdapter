import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  form: FormGroup;

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {

    this.form = this.fb.group({
      dateValue: [null, Validators.compose([Validators.required])]
    });

    this.form.valueChanges.subscribe((data) => {
      console.log(data.dateValue);
    });

  }
}
