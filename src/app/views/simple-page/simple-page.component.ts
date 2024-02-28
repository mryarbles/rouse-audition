import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import FormControlService, { ValuationResponse }  from '@/services/form-controls.service';
import NavComponent from '@/components/nav/nav.component';

export const title = 'Rouse Audition';
export const path = 'simple';

type ValueForm = {
  modelId: FormControl<string | null>;
  year: FormControl<string | null>;
  other?: FormControl<string | null>;
}

@Component({
  selector: 'simple-page-component',
  standalone: true,
  providers: [FormControlService],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NavComponent
  ],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './simple-page.component.html',
  styleUrl: './simple-page.component.scss'
})
export default class SimplePageComponent  {

  form = new FormGroup<ValueForm>({
    modelId: new FormControl('', { validators: Validators.required }),
    year: new FormControl('', { validators: [Validators.required, Validators.pattern(/^[0-9]{4}$/)] }),
  });

  calculatedValues: ValuationResponse | null = null;

  constructor(private fcs: FormControlService) {}

  async onSubmit() {
    if (this.form.valid) {
      const id = this.form.value.modelId as string;
      const year = this.form.value.year as string;
      try {
        this.calculatedValues = await this.fcs.getValues(id, year);
        this.form.reset(this.form.getRawValue());
        this.form.markAsUntouched();
        this.form.markAsPristine();
        console.log('form\n', this.form);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('form is invalid');
    }
  }

  get modelId() {
    return this.form.get('modelId');
  }

  get year() {
    return this.form.get('year');
  }

}
