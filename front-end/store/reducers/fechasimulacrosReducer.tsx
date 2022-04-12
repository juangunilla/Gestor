import produce from 'immer'
import { FechasimulacrosAction, FechasimulacrosActionTypes } from '../actions/fechasimulacrosActions'
import { ApiStatus, IFechasimulacrosItem } from '../models'

export const initialFechasimulacrosState: IFechasimulacrosState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  fechasimulacros: [],
  foundfechasimulacros: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function fechasimulacrosReducer(state: IFechasimulacrosState = initialFechasimulacrosState, action: FechasimulacrosAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FechasimulacrosActionTypes.SEARCH_FECHASIMULACROS:
        draft.searchString = action.searchOptions.searchString
        break
      case FechasimulacrosActionTypes.SEARCHING_FECHASIMULACROS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case FechasimulacrosActionTypes.SEARCHING_FECHASIMULACROS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case FechasimulacrosActionTypes.FOUND_FECHASIMULACROS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep
          ? draft.foundfechasimulacros.push(...action.payload.fechasimulacros.docs)
          : (draft.foundfechasimulacros = action.payload.fechasimulacros.docs)
        draft.totalDocs = action.payload.fechasimulacros.totalDocs
        break

      case FechasimulacrosActionTypes.LOAD_FECHASIMULACROS:
      case FechasimulacrosActionTypes.LOADING_FECHASIMULACROS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundfechasimulacros = []
        break

      case FechasimulacrosActionTypes.LOADING_FECHASIMULACROS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case FechasimulacrosActionTypes.LOADED_FECHASIMULACROS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.fechasimulacros = action.payload.fechasimulacros.docs
        draft.totalDocs = action.payload.fechasimulacros.totalDocs
        break

      case FechasimulacrosActionTypes.ADD_FECHASIMULACROS:
      case FechasimulacrosActionTypes.ADDING_FECHASIMULACROS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case FechasimulacrosActionTypes.ADDING_FECHASIMULACROS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case FechasimulacrosActionTypes.ADDED_FECHASIMULACROS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.fechasimulacros.push(action.payload.fechasimulacros.docs[0])
        if (draft.searchString) draft.foundfechasimulacros.push(action.payload.fechasimulacros.docs[0])
        break

      case FechasimulacrosActionTypes.REMOVE_FECHASIMU:
        draft.fechasimulacros.splice(
          draft.fechasimulacros.findIndex((fechasimu) => fechasimu._id === action.payload._id),
          1
        )
        break

      case FechasimulacrosActionTypes.EDIT_FECHASIMULACROS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.fechasimulacros[draft.fechasimulacros.findIndex((fechasimu) => fechasimu._id === action.payload._id)] = action.payload
        break

      case FechasimulacrosActionTypes.EDITED_FECHASIMULACROS:
        draft.addingStatus = ApiStatus.LOADED
        draft.fechasimulacros[draft.fechasimulacros.findIndex((fechasimu) => fechasimu._id === action.payload._id)] = action.payload
        draft.foundfechasimulacros[draft.foundfechasimulacros.findIndex((fechasimu) => fechasimu._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IFechasimulacrosState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  fechasimulacros: IFechasimulacrosItem[]
  foundfechasimulacros: IFechasimulacrosItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
