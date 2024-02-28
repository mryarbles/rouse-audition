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
import { SelectOption } from '@/types/SelectOption';
import NavComponent  from '@/components/nav/nav.component';
import Numbers from '@/utils/Numbers';

export const title = 'Rouse Audition';
export const path = '';

type ValueForm = {
  modelId: FormControl<string | null>;
  year: FormControl<string | null>;
  other?: FormControl<string | null>;
}

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
    MatButtonModule,
    NavComponent
  ],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export default class HomePageComponent implements OnInit, OnDestroy {
  modelIdOptions: SelectOption[] = [];
  yearOptions: SelectOption[] = [];
  form = new FormGroup<ValueForm>({
    modelId: new FormControl('', { validators: Validators.required }),
    year: new FormControl('', { validators: Validators.required }),
  });
  yearLimits = {
    min: 1990,
    max: new Date().getFullYear()
  };
  calculatedValues: ValuationResponse | null = null;

  // subscriptions
  private subYear: any;
  private subModelId: any;

  constructor(private fcs: FormControlService) {}

  async onSubmit() {
    // the submit button should be disabled if the form is invalid, but checking anyway
    if (this.form.valid) {
      const id = this.form.value.modelId as string;
      const year = this.form.value.year === 'other' ? this.form.value.other : this.form.value.year;
      try {
        this.calculatedValues = await this.fcs.getValues(id, year as string);
        this.form.reset(this.form.getRawValue());
        // this.form.markAsUntouched();
        // this.form.markAsPristine();
        console.log('form submit\n', this.form);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async ngOnInit() {
    this.modelIdOptions = await this.fcs.getModelIdOptions();

    // TODO: use property in template to disable year until modelId is selected
    this.year?.disable();

    this.subModelId = this.modelId?.valueChanges.subscribe(async (value: string | null) => {
      this.yearOptions = await this.fcs.getYearOptions(value as string);
      this.year?.enable();
    });

    this.subYear = this.year?.valueChanges.subscribe((value: string | null) => {
      if (value === 'other') {
        console.log('adding other');
        const fieldName = 'other';
        // TODO: There is a bug here, where the new field is automatically marked as invalid with required error.
        //  once the form has been submitted.
        this.form.registerControl(fieldName, new FormControl('', {
          validators: [
            Validators.required,
            Validators.min(this.yearLimits.min),
            Validators.max(this.yearLimits.max),
            // Validators.pattern(/^[0-9]{4}$/)
          ]
        }));
      } else if (this.form.contains('other')) {
        console.log('removing other');
        this.form.removeControl('other');
      }
    });
  }


  ngOnDestroy() {
    if (this.subYear) this.subYear.unsubscribe();
    if (this.subModelId) this.subModelId.unsubscribe();
  }

  get modelId() {
    return this.form.get('modelId');
  }

  get year() {
    return this.form.get('year');
  }

  get other() {
    return this.form.get('other');
  }

  toDollars(value: number = 0) {
    return Numbers.toDollars(value);
  }
}
