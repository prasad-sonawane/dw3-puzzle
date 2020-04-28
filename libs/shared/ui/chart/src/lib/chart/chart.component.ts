import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { MOCK_DATA } from '../mock/chart-data-mock';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: Observable<any>;

  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };

  constructor() {}

  ngOnInit() {
    this.chart = MOCK_DATA;
  }
}
