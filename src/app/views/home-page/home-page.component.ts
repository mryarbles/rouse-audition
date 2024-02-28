import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

import FormControlService, { ValuationResponse }  from 'src/app/services/form-controls.service';
import { SelectOption } from 'src/app/types/SelectOption';

export const title = 'Rouse Audition';
export const path = '';

@Component({
  selector: 'home-page-component',
  standalone: true,
  providers: [FormControlService],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export default class HomePageComponent implements OnInit {
  modelIdOptions: SelectOption[] = [];
  yearOptions: SelectOption[] = [];
  form!: FormGroup;
  modelIdControl = new FormControl('', { validators: Validators.required, updateOn: 'change' });
  yearControl = new FormControl('', { validators: Validators.required, updateOn: 'change' });
  // TODO: This other functionality may not be needed, but it's implied by the defaultRatio values in the api response.
  otherControl: FormControl<string | null> = new FormControl('', { validators: Validators.required, updateOn: 'change' });
  calculatedValues: ValuationResponse | null = null;

  constructor(private fcs: FormControlService) {}

  async onSubmit() {
    const id = this.modelIdControl.value as string;
    const year = this.yearControl.value === 'other' ? this.otherControl?.value : this.yearControl.value;
    this.calculatedValues = await this.fcs.getValues(id, year as string);
  }

  async ngOnInit() {
    console.log('ngOnInit');
    this.modelIdOptions = await this.fcs.getModelIdOptions();
    this.form = new FormGroup({
      modelId: this.modelIdControl,
      year: this.yearControl
    });
    this.modelIdControl.valueChanges.subscribe(async (value) => {
      this.yearOptions = await this.fcs.getYearOptions(value as string);
    });
  }

}
