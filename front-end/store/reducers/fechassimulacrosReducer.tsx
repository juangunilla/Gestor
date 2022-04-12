import produce from 'immer'
import { FechassimulacrosAction, FechassimulacrosActionTypes } from '../actions/fechassimulacrosActions'
import { ApiStatus, IFechassimulacrosItem } from '../models'

export const initialFechassimulacrosState: IFechassimulacrosState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  fechassimulacros: [],
  foundfechassimulacros: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function fechassimulacrosReducer(state: IFechassimulacrosState = initialFechassimulacrosState, action: FechassimulacrosAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FechassimulacrosActionTypes.SEARCH_FECHASSIMULACROS:
        draft.searchString = action.searchOptions.searchString
        break
      case FechassimulacrosActionTypes.SEARCHING_FECHASSIMULACROS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case FechassimulacrosActionTypes.SEARCHING_FECHASSIMULACROS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case FechassimulacrosActionTypes.FOUND_FECHASSIMULACROS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep
          ? draft.foundfechassimulacros.push(...action.payload.fechassimulacros.docs)
          : (draft.foundfechassimulacros = action.payload.fechassimulacros.docs)
        draft.totalDocs = action.payload.fechassimulacros.totalDocs
        break

      case FechassimulacrosActionTypes.LOAD_FECHASSIMULACROS:
      case FechassimulacrosActionTypes.LOADING_FECHASSIMULACROS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundfechassimulacros = []
        break

      case FechassimulacrosActionTypes.LOADING_FECHASSIMULACROS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case FechassimulacrosActionTypes.LOADED_FECHASSIMULACROS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.fechassimulacros = action.payload.fechassimulacros.docs
        draft.totalDocs = action.payload.fechassimulacros.totalDocs
        break

      case FechassimulacrosActionTypes.ADD_FECHASSIMULACROS:
      case FechassimulacrosActionTypes.ADDING_FECHASSIMULACROS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case FechassimulacrosActionTypes.ADDING_FECHASSIMULACROS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case FechassimulacrosActionTypes.ADDED_FECHASSIMULACROS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.fechassimulacros.push(action.payload.fechassimulacros.docs[0])
        if (draft.searchString) draft.foundfechassimulacros.push(action.payload.fechassimulacros.docs[0])
        break

      case FechassimulacrosActionTypes.REMOVE_FECHASIMULACRO:
        draft.fechassimulacros.splice(
          draft.fechassimulacros.findIndex((fechasimulacro) => fechasimulacro._id === action.payload._id),
          1
        )
        break

      case FechassimulacrosActionTypes.EDIT_FECHASSIMULACROS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.fechassimulacros[draft.fechassimulacros.findIndex((fechasimulacro) => fechasimulacro._id === action.payload._id)] = action.payload
        break

      case FechassimulacrosActionTypes.EDITED_FECHASSIMULACROS:
        draft.addingStatus = ApiStatus.LOADED
        draft.fechassimulacros[draft.fechassimulacros.findIndex((fechasimulacro) => fechasimulacro._id === action.payload._id)] = action.payload
        draft.foundfechassimulacros[draft.foundfechassimulacros.findIndex((fechasimulacro) => fechasimulacro._id === action.payload._id)] =
          action.payload
        break
    }
  })
}

export interface IFechassimulacrosState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  fechassimulacros: IFechassimulacrosItem[]
  foundfechassimulacros: IFechassimulacrosItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
