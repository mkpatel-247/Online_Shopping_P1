import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-filter-by',
  standalone: true,
  imports: [CommonModule, NgxSliderModule],
  templateUrl: './filter-by.component.html',
  styleUrls: ['./filter-by.component.scss']
})
export class FilterByComponent {
  @Input() minValue = 99;
  @Input() maxValue = 1000;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return '$' + value;
    },
    getSelectionBarColor: '#ffd333'
  };
}