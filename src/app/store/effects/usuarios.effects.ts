import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class UsuariosEffects {
  constructor(private actions$: Actions<any>) {}

  @Effect({dispatch: false})
  CargarUsuarios$ = this.actions$.pipe(
    ofType(usuariosActions.CARGAR_USUARIOS),
    map((action) => {
      console.log(action);
      return action;
    })
  );
}
