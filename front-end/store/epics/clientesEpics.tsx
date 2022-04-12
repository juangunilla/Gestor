import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedClientes,
  addingClientes,
  addingClientesFailed,
  ClientesAction,
  ClientesActionTypes,
  editedClientes,
  editingClientes,
  editingClientesFailed,
  foundClientes,
  loadedClientes,
  loadingClientes,
  loadingClientesFailed,
  removedCliente,
  removingCliente,
  removingClienteFailed,
  searchingClientes,
  searchingClientesFailed,
} from '../actions/clientesActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchClientesEpic: Epic<ClientesAction, ClientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClientesActionTypes.SEARCH_CLIENTES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `https://gestor_gunillajuangmailcom.backend.aptugo.app/api/clientes/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundClientes(response.data, action.keep)),
        startWith(searchingClientes()),
        catchError(() => of(searchingClientesFailed()))
      )
    })
  )

const loadClientesEpic: Epic<ClientesAction, ClientesAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ClientesActionTypes.LOAD_CLIENTES)),
    switchMap((action) => {
      let url = `https://gestor_gunillajuangmailcom.backend.aptugo.app/api/clientes/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedClientes(response.data)),
        startWith(loadingClientes()),
        catchError(() => of(loadingClientesFailed()))
      )
    })
  )
}

const addClientesEpic: Epic<ClientesAction, ClientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClientesActionTypes.ADD_CLIENTES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/clientes/`, data, config)).pipe(
        map((response) => addedClientes(response.data)),
        startWith(addingClientes()),
        catchError((err) => of(addingClientesFailed(err.response)))
      )
    })
  )

const removeClientesEpic: Epic<ClientesAction, ClientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClientesActionTypes.REMOVE_CLIENTE)),
    mergeMap((action) =>
      from(axios.delete(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/clientes/${action.payload._id}`)).pipe(
        map((response) => removedCliente()),
        startWith(removingCliente()),
        catchError(() => of(removingClienteFailed()))
      )
    )
  )

const editClientesEpic: Epic<ClientesAction, ClientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClientesActionTypes.EDIT_CLIENTES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/clientes/${action.payload._id}`, data, config)).pipe(
        map((response) => editedClientes(response.data)),
        startWith(editingClientes()),
        catchError(() => of(editingClientesFailed()))
      )
    })
  )

export default combineEpics(searchClientesEpic, loadClientesEpic, addClientesEpic, removeClientesEpic, editClientesEpic)
