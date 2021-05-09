import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from "rxjs/operators";
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs?: Subscription;
  constructor() {
    //OBSERVABLE BASICO INICIO
    // const obs$ = new Observable(observer => {
    //   let i = 0;
    //   const intervalo = setInterval(() => {
    //     i++;
    //     observer.next(i);
    //     if (i === 4) {
    //       clearInterval(intervalo);
    //       observer.complete();
    //     }
    //     if (i == 2) {
    //       observer.error('i llego al dos')
    //     }
    //   }, 1000)
    // });

    // obs$.subscribe(
    //   valor => console.log('Subs', valor),
    //   error => console.log('Error: ', error),
    //   () => console.log('Completado')
    // );
    //OBSERVABLE BASICO FIN


    // this.retornaObservable().pipe(
    //   retry()//PUEDO PONER LA CANTIDAD DE VECES QUE HACE UN REINTENTO retry(1)
    // ).subscribe(
    //   valor => console.log('Subs', valor),
    //   error => console.log('Error: ', error),
    //   () => console.log('Completado')
    // );
    this.intervalSubs = this.retornaIntervalo().subscribe((valor) => console.log(valor));
  }
  ngOnDestroy(): void {
    this.intervalSubs?.unsubscribe();
  }
  retornaIntervalo(): Observable<number> {
    const interval$ = interval(500).pipe(
      map(valor => {
        return valor + 1;
      }),
      filter(valor => (valor % 2 === 0 ? true : false)),
      // take(10),//LIMITE DE PETICIONES

    );
    return interval$;
  }
  retornaObservable(): Observable<number> {
    let i = 0;
    const obs$ = new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i == 2) {
          console.log('i error')
          observer.error('i llego al dos')
        }
      }, 1000)
    });
    return obs$;
  }
}
