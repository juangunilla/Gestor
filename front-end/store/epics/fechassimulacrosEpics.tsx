import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedFechassimulacros,
  addingFechassimulacros,
  addingFechassimulacrosFailed,
  editedFechassimulacros,
  editingFechassimulacros,
  editingFechassimulacrosFailed,
  FechassimulacrosAction,
  FechassimulacrosActionTypes,
  foundFechassimulacros,
  loadedFechassimulacros,
  loadingFechassimulacros,
  loadingFechassimulacrosFailed,
  removedFechasimulacro,
  removingFechasimulacro,
  removingFechasimulacroFailed,
  searchingFechassimulacros,
  searchingFechassimulacrosFailed,
} from '../actions/fechassimulacrosActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchFechassimulacrosEpic: Epic<FechassimulacrosAction, FechassimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechassimulacrosActionTypes.SEARCH_FECHASSIMULACROS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `https://gestor_gunillajuangmailcom.backend.aptugo.app/api/fechassimulacros/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundFechassimulacros(response.data, action.keep)),
        startWith(searchingFechassimulacros()),
        catchError(() => of(searchingFechassimulacrosFailed()))
      )
    })
  )

const loadFechassimulacrosEpic: Epic<FechassimulacrosAction, FechassimulacrosAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(FechassimulacrosActionTypes.LOAD_FECHASSIMULACROS)),
    switchMap((action) => {
      let url = `https://gestor_gunillajuangmailcom.backend.aptugo.app/api/fechassimulacros/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedFechassimulacros(response.data)),
        startWith(loadingFechassimulacros()),
        catchError(() => of(loadingFechassimulacrosFailed()))
      )
    })
  )
}

const addFechassimulacrosEpic: Epic<FechassimulacrosAction, FechassimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechassimulacrosActionTypes.ADD_FECHASSIMULACROS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/fechassimulacros/`, data, config)).pipe(
        map((response) => addedFechassimulacros(response.data)),
        startWith(addingFechassimulacros()),
        catchError((err) => of(addingFechassimulacrosFailed(err.response)))
      )
    })
  )

const removeFechassimulacrosEpic: Epic<FechassimulacrosAction, FechassimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechassimulacrosActionTypes.REMOVE_FECHASIMULACRO)),
    mergeMap((action) =>
      from(axios.delete(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/fechassimulacros/${action.payload._id}`)).pipe(
        map((response) => removedFechasimulacro()),
        startWith(removingFechasimulacro()),
        catchError(() => of(removingFechasimulacroFailed()))
      )
    )
  )

const editFechassimulacrosEpic: Epic<FechassimulacrosAction, FechassimulacrosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(FechassimulacrosActionTypes.EDIT_FECHASSIMULACROS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/fechassimulacros/${action.payload._id}`, data, config)).pipe(
        map((response) => editedFechassimulacros(response.data)),
        startWith(editingFechassimulacros()),
        catchError(() => of(editingFechassimulacrosFailed()))
      )
    })
  )

export default combineEpics(
  searchFechassimulacrosEpic,
  loadFechassimulacrosEpic,
  addFechassimulacrosEpic,
  removeFechassimulacrosEpic,
  editFechassimulacrosEpic
)
