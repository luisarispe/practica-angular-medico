import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  labels: string[] = ['NARUTO', 'POKEMON', 'DRAGON BALL Z'];
  data: number[] = [100, 200, 300];

}
