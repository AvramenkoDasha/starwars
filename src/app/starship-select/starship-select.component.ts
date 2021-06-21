import {ChangeDetectionStrategy, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-starship-select',
  templateUrl: './starship-select.component.html',
  styleUrls: ['./starship-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarshipSelectComponent),
      multi: true,
    },
  ]
})
export class StarshipSelectComponent implements ControlValueAccessor {
  @Input() options;
  @Input() value;

  constructor() { }

  onChange: any = () => { };
  onTouched: any = () => { };

  setValue(value) {
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
}
