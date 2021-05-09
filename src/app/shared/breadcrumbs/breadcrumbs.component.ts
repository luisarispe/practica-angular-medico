import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string = '';
  public tituloSuvs$?: Subscription;

  constructor(private router: Router) {
    console.log(2);
    this.tituloSuvs$ = this.getArgumentsRuta().
      subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = titulo;
      })
  }
  ngOnDestroy(): void {
    this.tituloSuvs$?.unsubscribe();
  }

  getArgumentsRuta() {
    return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data),
    );
  }

}
