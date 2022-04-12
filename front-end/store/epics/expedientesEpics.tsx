import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedExpedientes,
  addingExpedientes,
  addingExpedientesFailed,
  editedExpedientes,
  editingExpedientes,
  editingExpedientesFailed,
  ExpedientesAction,
  ExpedientesActionTypes,
  foundExpedientes,
  loadedExpedientes,
  loadingExpedientes,
  loadingExpedientesFailed,
  removedExpediente,
  removingExpediente,
  removingExpedienteFailed,
  searchingExpedientes,
  searchingExpedientesFailed,
} from '../actions/expedientesActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchExpedientesEpic: Epic<ExpedientesAction, ExpedientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ExpedientesActionTypes.SEARCH_EXPEDIENTES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `https://gestor_gunillajuangmailcom.backend.aptugo.app/api/expedientes/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundExpedientes(response.data, action.keep)),
        startWith(searchingExpedientes()),
        catchError(() => of(searchingExpedientesFailed()))
      )
    })
  )

const loadExpedientesEpic: Epic<ExpedientesAction, ExpedientesAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ExpedientesActionTypes.LOAD_EXPEDIENTES)),
    switchMap((action) => {
      let url = `https://gestor_gunillajuangmailcom.backend.aptugo.app/api/expedientes/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedExpedientes(response.data)),
        startWith(loadingExpedientes()),
        catchError(() => of(loadingExpedientesFailed()))
      )
    })
  )
}

const addExpedientesEpic: Epic<ExpedientesAction, ExpedientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ExpedientesActionTypes.ADD_EXPEDIENTES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/expedientes/`, data, config)).pipe(
        map((response) => addedExpedientes(response.data)),
        startWith(addingExpedientes()),
        catchError((err) => of(addingExpedientesFailed(err.response)))
      )
    })
  )

const removeExpedientesEpic: Epic<ExpedientesAction, ExpedientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ExpedientesActionTypes.REMOVE_EXPEDIENTE)),
    mergeMap((action) =>
      from(axios.delete(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/expedientes/${action.payload._id}`)).pipe(
        map((response) => removedExpediente()),
        startWith(removingExpediente()),
        catchError(() => of(removingExpedienteFailed()))
      )
    )
  )

const editExpedientesEpic: Epic<ExpedientesAction, ExpedientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ExpedientesActionTypes.EDIT_EXPEDIENTES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/expedientes/${action.payload._id}`, data, config)).pipe(
        map((response) => editedExpedientes(response.data)),
        startWith(editingExpedientes()),
        catchError(() => of(editingExpedientesFailed()))
      )
    })
  )

export default combineEpics(searchExpedientesEpic, loadExpedientesEpic, addExpedientesEpic, removeExpedientesEpic, editExpedientesEpic)
