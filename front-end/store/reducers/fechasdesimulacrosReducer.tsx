import produce from 'immer'
import { FechasdesimulacrosAction, FechasdesimulacrosActionTypes } from '../actions/fechasdesimulacrosActions'
import { ApiStatus, IFechasdesimulacrosItem } from '../models'

export const initialFechasdesimulacrosState: IFechasdesimulacrosState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  fechasdesimulacros: [],
  foundfechasdesimulacros: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function fechasdesimulacrosReducer(
  state: IFechasdesimulacrosState = initialFechasdesimulacrosState,
  action: FechasdesimulacrosAction
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FechasdesimulacrosActionTypes.SEARCH_FECHASDESIMULACROS:
        draft.searchString = action.searchOptions.searchString
        break
      case FechasdesimulacrosActionTypes.SEARCHING_FECHASDESIMULACROS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case FechasdesimulacrosActionTypes.SEARCHING_FECHASDESIMULACROS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case FechasdesimulacrosActionTypes.FOUND_FECHASDESIMULACROS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep
          ? draft.foundfechasdesimulacros.push(...action.payload.fechasdesimulacros.docs)
          : (draft.foundfechasdesimulacros = action.payload.fechasdesimulacros.docs)
        draft.totalDocs = action.payload.fechasdesimulacros.totalDocs
        break

      case FechasdesimulacrosActionTypes.LOAD_FECHASDESIMULACROS:
      case FechasdesimulacrosActionTypes.LOADING_FECHASDESIMULACROS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundfechasdesimulacros = []
        break

      case FechasdesimulacrosActionTypes.LOADING_FECHASDESIMULACROS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case FechasdesimulacrosActionTypes.LOADED_FECHASDESIMULACROS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.fechasdesimulacros = action.payload.fechasdesimulacros.docs
        draft.totalDocs = action.payload.fechasdesimulacros.totalDocs
        break

      case FechasdesimulacrosActionTypes.ADD_FECHASDESIMULACROS:
      case FechasdesimulacrosActionTypes.ADDING_FECHASDESIMULACROS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case FechasdesimulacrosActionTypes.ADDING_FECHASDESIMULACROS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case FechasdesimulacrosActionTypes.ADDED_FECHASDESIMULACROS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.fechasdesimulacros.push(action.payload.fechasdesimulacros.docs[0])
        if (draft.searchString) draft.foundfechasdesimulacros.push(action.payload.fechasdesimulacros.docs[0])
        break

      case FechasdesimulacrosActionTypes.REMOVE_FECHADESIMULACRO:
        draft.fechasdesimulacros.splice(
          draft.fechasdesimulacros.findIndex((fechadesimulacro) => fechadesimulacro._id === action.payload._id),
          1
        )
        break

      case FechasdesimulacrosActionTypes.EDIT_FECHASDESIMULACROS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.fechasdesimulacros[draft.fechasdesimulacros.findIndex((fechadesimulacro) => fechadesimulacro._id === action.payload._id)] =
          action.payload
        break

      case FechasdesimulacrosActionTypes.EDITED_FECHASDESIMULACROS:
        draft.addingStatus = ApiStatus.LOADED
        draft.fechasdesimulacros[draft.fechasdesimulacros.findIndex((fechadesimulacro) => fechadesimulacro._id === action.payload._id)] =
          action.payload
        draft.foundfechasdesimulacros[draft.foundfechasdesimulacros.findIndex((fechadesimulacro) => fechadesimulacro._id === action.payload._id)] =
          action.payload
        break
    }
  })
}

export interface IFechasdesimulacrosState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  fechasdesimulacros: IFechasdesimulacrosItem[]
  foundfechasdesimulacros: IFechasdesimulacrosItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
