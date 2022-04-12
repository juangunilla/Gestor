import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedFechasimulacros,
  addingFechasimulacros,
  addingFechasimulacrosFailed,
  editedFechasimulacros,
  editingFechasimulacros,
  editingFechasimulacrosFailed,
  FechasimulacrosAction,
  FechasimulacrosActionTypes,
  foundFechasimulacros,
  loadedFechasimulacros,
  loadingFechasimulacros,
  loadingFechasimulacrosFailed,
  removedFechasimu,
  removingFechasimu,
  removingFechasimuFailed,
  searchingFechasimulacros,
  searchingFechasimulacrosFailed,
} from '../actions/fechasimulacrosActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchFechasimulacrosEpic: Epic<FechasimulacrosAction, FechasimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechasimulacrosActionTypes.SEARCH_FECHASIMULACROS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/fechasimulacros/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundFechasimulacros(response.data, action.keep)),
        startWith(searchingFechasimulacros()),
        catchError(() => of(searchingFechasimulacrosFailed()))
      )
    })
  )

const loadFechasimulacrosEpic: Epic<FechasimulacrosAction, FechasimulacrosAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(FechasimulacrosActionTypes.LOAD_FECHASIMULACROS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/fechasimulacros/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedFechasimulacros(response.data)),
        startWith(loadingFechasimulacros()),
        catchError(() => of(loadingFechasimulacrosFailed()))
      )
    })
  )
}

const addFechasimulacrosEpic: Epic<FechasimulacrosAction, FechasimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechasimulacrosActionTypes.ADD_FECHASIMULACROS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/fechasimulacros/`, data, config)).pipe(
        map((response) => addedFechasimulacros(response.data)),
        startWith(addingFechasimulacros()),
        catchError((err) => of(addingFechasimulacrosFailed(err.response)))
      )
    })
  )

const removeFechasimulacrosEpic: Epic<FechasimulacrosAction, FechasimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechasimulacrosActionTypes.REMOVE_FECHASIMU)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/fechasimulacros/${action.payload._id}`)).pipe(
        map((response) => removedFechasimu()),
        startWith(removingFechasimu()),
        catchError(() => of(removingFechasimuFailed()))
      )
    )
  )

const editFechasimulacrosEpic: Epic<FechasimulacrosAction, FechasimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechasimulacrosActionTypes.EDIT_FECHASIMULACROS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/fechasimulacros/${action.payload._id}`, data, config)).pipe(
        map((response) => editedFechasimulacros(response.data)),
        startWith(editingFechasimulacros()),
        catchError(() => of(editingFechasimulacrosFailed()))
      )
    })
  )

export default combineEpics(
  searchFechasimulacrosEpic,
  loadFechasimulacrosEpic,
  addFechasimulacrosEpic,
  removeFechasimulacrosEpic,
  editFechasimulacrosEpic
)
