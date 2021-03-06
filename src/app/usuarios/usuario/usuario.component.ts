import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as usuarioActions from 'src/app/store/actions';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [],
})
export class UsuarioComponent implements OnInit, OnDestroy {
  user: Usuario;
  loading: boolean;
  error: any;

  subscription: Subscription = new Subscription();

  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('usuario').subscribe((usuario) => {
      this.user = usuario.user;
      this.loading = usuario.loading;
      this.error = usuario.error;
    });
    this.router.params.subscribe((params) => {
      const id = params.id;
      this.store.dispatch(new usuarioActions.CargarUsuario(id));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
