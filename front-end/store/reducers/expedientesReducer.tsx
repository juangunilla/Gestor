import produce from 'immer'
import { ExpedientesAction, ExpedientesActionTypes } from '../actions/expedientesActions'
import { ApiStatus, IExpedientesItem } from '../models'

export const initialExpedientesState: IExpedientesState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  expedientes: [],
  foundexpedientes: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function expedientesReducer(state: IExpedientesState = initialExpedientesState, action: ExpedientesAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ExpedientesActionTypes.SEARCH_EXPEDIENTES:
        draft.searchString = action.searchOptions.searchString
        break
      case ExpedientesActionTypes.SEARCHING_EXPEDIENTES:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case ExpedientesActionTypes.SEARCHING_EXPEDIENTES_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case ExpedientesActionTypes.FOUND_EXPEDIENTES:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundexpedientes.push(...action.payload.expedientes.docs) : (draft.foundexpedientes = action.payload.expedientes.docs)
        draft.totalDocs = action.payload.expedientes.totalDocs
        break

      case ExpedientesActionTypes.LOAD_EXPEDIENTES:
      case ExpedientesActionTypes.LOADING_EXPEDIENTES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundexpedientes = []
        break

      case ExpedientesActionTypes.LOADING_EXPEDIENTES_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case ExpedientesActionTypes.LOADED_EXPEDIENTES:
        draft.loadingStatus = ApiStatus.LOADED
        draft.expedientes = action.payload.expedientes.docs
        draft.totalDocs = action.payload.expedientes.totalDocs
        break

      case ExpedientesActionTypes.ADD_EXPEDIENTES:
      case ExpedientesActionTypes.ADDING_EXPEDIENTES:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case ExpedientesActionTypes.ADDING_EXPEDIENTES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case ExpedientesActionTypes.ADDED_EXPEDIENTES:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.expedientes.push(action.payload.expedientes.docs[0])
        if (draft.searchString) draft.foundexpedientes.push(action.payload.expedientes.docs[0])
        break

      case ExpedientesActionTypes.REMOVE_EXPEDIENTE:
        draft.expedientes.splice(
          draft.expedientes.findIndex((expediente) => expediente._id === action.payload._id),
          1
        )
        break

      case ExpedientesActionTypes.EDIT_EXPEDIENTES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.expedientes[draft.expedientes.findIndex((expediente) => expediente._id === action.payload._id)] = action.payload
        break

      case ExpedientesActionTypes.EDITED_EXPEDIENTES:
        draft.addingStatus = ApiStatus.LOADED
        draft.expedientes[draft.expedientes.findIndex((expediente) => expediente._id === action.payload._id)] = action.payload
        draft.foundexpedientes[draft.foundexpedientes.findIndex((expediente) => expediente._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IExpedientesState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  expedientes: IExpedientesItem[]
  foundexpedientes: IExpedientesItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
