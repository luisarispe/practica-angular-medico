import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input('titulo') titulo: string = "Sin Titulo";
  @Input('labels') labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') data: number[] = [350, 450, 100];



  public doughnutChartData: MultiDataSet = [
    this.data
  ];

  public colors: Color[] = [
    { backgroundColor: ['#9E120E', '#FFF5800', '#FFB414'], }
  ]

}
