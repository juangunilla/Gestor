import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedFechasdesimulacros,
  addingFechasdesimulacros,
  addingFechasdesimulacrosFailed,
  editedFechasdesimulacros,
  editingFechasdesimulacros,
  editingFechasdesimulacrosFailed,
  FechasdesimulacrosAction,
  FechasdesimulacrosActionTypes,
  foundFechasdesimulacros,
  loadedFechasdesimulacros,
  loadingFechasdesimulacros,
  loadingFechasdesimulacrosFailed,
  removedFechadesimulacro,
  removingFechadesimulacro,
  removingFechadesimulacroFailed,
  searchingFechasdesimulacros,
  searchingFechasdesimulacrosFailed,
} from '../actions/fechasdesimulacrosActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchFechasdesimulacrosEpic: Epic<FechasdesimulacrosAction, FechasdesimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechasdesimulacrosActionTypes.SEARCH_FECHASDESIMULACROS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/fechasdesimulacros/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundFechasdesimulacros(response.data, action.keep)),
        startWith(searchingFechasdesimulacros()),
        catchError(() => of(searchingFechasdesimulacrosFailed()))
      )
    })
  )

const loadFechasdesimulacrosEpic: Epic<FechasdesimulacrosAction, FechasdesimulacrosAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(FechasdesimulacrosActionTypes.LOAD_FECHASDESIMULACROS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/fechasdesimulacros/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedFechasdesimulacros(response.data)),
        startWith(loadingFechasdesimulacros()),
        catchError(() => of(loadingFechasdesimulacrosFailed()))
      )
    })
  )
}

const addFechasdesimulacrosEpic: Epic<FechasdesimulacrosAction, FechasdesimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechasdesimulacrosActionTypes.ADD_FECHASDESIMULACROS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/fechasdesimulacros/`, data, config)).pipe(
        map((response) => addedFechasdesimulacros(response.data)),
        startWith(addingFechasdesimulacros()),
        catchError((err) => of(addingFechasdesimulacrosFailed(err.response)))
      )
    })
  )

const removeFechasdesimulacrosEpic: Epic<FechasdesimulacrosAction, FechasdesimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechasdesimulacrosActionTypes.REMOVE_FECHADESIMULACRO)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/fechasdesimulacros/${action.payload._id}`)).pipe(
        map((response) => removedFechadesimulacro()),
        startWith(removingFechadesimulacro()),
        catchError(() => of(removingFechadesimulacroFailed()))
      )
    )
  )

const editFechasdesimulacrosEpic: Epic<FechasdesimulacrosAction, FechasdesimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechasdesimulacrosActionTypes.EDIT_FECHASDESIMULACROS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/fechasdesimulacros/${action.payload._id}`, data, config)).pipe(
        map((response) => editedFechasdesimulacros(response.data)),
        startWith(editingFechasdesimulacros()),
        catchError(() => of(editingFechasdesimulacrosFailed()))
      )
    })
  )

export default combineEpics(
  searchFechasdesimulacrosEpic,
  loadFechasdesimulacrosEpic,
  addFechasdesimulacrosEpic,
  removeFechasdesimulacrosEpic,
  editFechasdesimulacrosEpic
)
