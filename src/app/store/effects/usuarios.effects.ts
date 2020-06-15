import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { of } from 'rxjs';
import { mergeMap, map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { CargarUsuariosFail } from '../actions/usuarios.actions';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions<any>,
    public usuarioService: UsuarioService
  ) {}

  @Effect()
  CargarUsuarios$ = this.actions$.pipe(
    ofType(usuariosActions.CARGAR_USUARIOS),
    switchMap(() => {
      return this.usuarioService.getUsers().pipe(
        map((users) => new usuariosActions.CargarUsuariosSuccess(users)),
        catchError((error) => of(new usuariosActions.CargarUsuariosFail(error)))
      );
    })
  );
}
