import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { CargarUsuario } from '../actions/usuario.action';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions<any>,
    public usuarioService: UsuarioService
  ) {}

  @Effect()
  CargarUsuario$ = this.actions$.pipe(
    ofType(usuarioActions.CARGAR_USUARIO),
    switchMap((accion: CargarUsuario) => {
      console.log(accion);
      return this.usuarioService.getUserById(accion.id).pipe(
        map((user) => new usuarioActions.CargarUsuarioSuccess(user)),
        catchError((error) => of(new usuarioActions.CargarUsuarioFail(error)))
      );
    })
  );
}
