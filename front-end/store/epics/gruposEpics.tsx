import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedGrupos,
  addingGrupos,
  addingGruposFailed,
  editedGrupos,
  editingGrupos,
  editingGruposFailed,
  foundGrupos,
  GruposAction,
  GruposActionTypes,
  loadedGrupos,
  loadingGrupos,
  loadingGruposFailed,
  removedGrupo,
  removingGrupo,
  removingGrupoFailed,
  searchingGrupos,
  searchingGruposFailed,
} from '../actions/gruposActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchGruposEpic: Epic<GruposAction, GruposAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(GruposActionTypes.SEARCH_GRUPOS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `https://gestor_gunillajuangmailcom.backend.aptugo.app/api/grupos/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundGrupos(response.data, action.keep)),
        startWith(searchingGrupos()),
        catchError(() => of(searchingGruposFailed()))
      )
    })
  )

const loadGruposEpic: Epic<GruposAction, GruposAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(GruposActionTypes.LOAD_GRUPOS)),
    switchMap((action) => {
      let url = `https://gestor_gunillajuangmailcom.backend.aptugo.app/api/grupos/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedGrupos(response.data)),
        startWith(loadingGrupos()),
        catchError(() => of(loadingGruposFailed()))
      )
    })
  )
}

const addGruposEpic: Epic<GruposAction, GruposAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(GruposActionTypes.ADD_GRUPOS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/grupos/`, data, config)).pipe(
        map((response) => addedGrupos(response.data)),
        startWith(addingGrupos()),
        catchError((err) => of(addingGruposFailed(err.response)))
      )
    })
  )

const removeGruposEpic: Epic<GruposAction, GruposAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(GruposActionTypes.REMOVE_GRUPO)),
    mergeMap((action) =>
      from(axios.delete(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/grupos/${action.payload._id}`)).pipe(
        map((response) => removedGrupo()),
        startWith(removingGrupo()),
        catchError(() => of(removingGrupoFailed()))
      )
    )
  )

const editGruposEpic: Epic<GruposAction, GruposAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(GruposActionTypes.EDIT_GRUPOS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/grupos/${action.payload._id}`, data, config)).pipe(
        map((response) => editedGrupos(response.data)),
        startWith(editingGrupos()),
        catchError(() => of(editingGruposFailed()))
      )
    })
  )

export default combineEpics(searchGruposEpic, loadGruposEpic, addGruposEpic, removeGruposEpic, editGruposEpic)
