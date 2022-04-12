import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedSims,
  addingSims,
  addingSimsFailed,
  editedSims,
  editingSims,
  editingSimsFailed,
  foundSims,
  loadedSims,
  loadingSims,
  loadingSimsFailed,
  removedSim,
  removingSim,
  removingSimFailed,
  searchingSims,
  searchingSimsFailed,
  SimsAction,
  SimsActionTypes,
} from '../actions/simsActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchSimsEpic: Epic<SimsAction, SimsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SimsActionTypes.SEARCH_SIMS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `https://gestor_gunillajuangmailcom.backend.aptugo.app/api/sims/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundSims(response.data, action.keep)),
        startWith(searchingSims()),
        catchError(() => of(searchingSimsFailed()))
      )
    })
  )

const loadSimsEpic: Epic<SimsAction, SimsAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(SimsActionTypes.LOAD_SIMS)),
    switchMap((action) => {
      let url = `https://gestor_gunillajuangmailcom.backend.aptugo.app/api/sims/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedSims(response.data)),
        startWith(loadingSims()),
        catchError(() => of(loadingSimsFailed()))
      )
    })
  )
}

const addSimsEpic: Epic<SimsAction, SimsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SimsActionTypes.ADD_SIMS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/sims/`, data, config)).pipe(
        map((response) => addedSims(response.data)),
        startWith(addingSims()),
        catchError((err) => of(addingSimsFailed(err.response)))
      )
    })
  )

const removeSimsEpic: Epic<SimsAction, SimsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SimsActionTypes.REMOVE_SIM)),
    mergeMap((action) =>
      from(axios.delete(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/sims/${action.payload._id}`)).pipe(
        map((response) => removedSim()),
        startWith(removingSim()),
        catchError(() => of(removingSimFailed()))
      )
    )
  )

const editSimsEpic: Epic<SimsAction, SimsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SimsActionTypes.EDIT_SIMS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`https://gestor_gunillajuangmailcom.backend.aptugo.app/api/sims/${action.payload._id}`, data, config)).pipe(
        map((response) => editedSims(response.data)),
        startWith(editingSims()),
        catchError(() => of(editingSimsFailed()))
      )
    })
  )

export default combineEpics(searchSimsEpic, loadSimsEpic, addSimsEpic, removeSimsEpic, editSimsEpic)
