import produce from 'immer'
import { ClientesAction, ClientesActionTypes } from '../actions/clientesActions'
import { ApiStatus, IClientesItem } from '../models'

export const initialClientesState: IClientesState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  clientes: [],
  foundclientes: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function clientesReducer(state: IClientesState = initialClientesState, action: ClientesAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ClientesActionTypes.SEARCH_CLIENTES:
        draft.searchString = action.searchOptions.searchString
        break
      case ClientesActionTypes.SEARCHING_CLIENTES:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case ClientesActionTypes.SEARCHING_CLIENTES_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case ClientesActionTypes.FOUND_CLIENTES:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundclientes.push(...action.payload.clientes.docs) : (draft.foundclientes = action.payload.clientes.docs)
        draft.totalDocs = action.payload.clientes.totalDocs
        break

      case ClientesActionTypes.LOAD_CLIENTES:
      case ClientesActionTypes.LOADING_CLIENTES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundclientes = []
        break

      case ClientesActionTypes.LOADING_CLIENTES_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case ClientesActionTypes.LOADED_CLIENTES:
        draft.loadingStatus = ApiStatus.LOADED
        draft.clientes = action.payload.clientes.docs
        draft.totalDocs = action.payload.clientes.totalDocs
        break

      case ClientesActionTypes.ADD_CLIENTES:
      case ClientesActionTypes.ADDING_CLIENTES:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case ClientesActionTypes.ADDING_CLIENTES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case ClientesActionTypes.ADDED_CLIENTES:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.clientes.push(action.payload.clientes.docs[0])
        if (draft.searchString) draft.foundclientes.push(action.payload.clientes.docs[0])
        break

      case ClientesActionTypes.REMOVE_CLIENTE:
        draft.clientes.splice(
          draft.clientes.findIndex((cliente) => cliente._id === action.payload._id),
          1
        )
        break

      case ClientesActionTypes.EDIT_CLIENTES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.clientes[draft.clientes.findIndex((cliente) => cliente._id === action.payload._id)] = action.payload
        break

      case ClientesActionTypes.EDITED_CLIENTES:
        draft.addingStatus = ApiStatus.LOADED
        draft.clientes[draft.clientes.findIndex((cliente) => cliente._id === action.payload._id)] = action.payload
        draft.foundclientes[draft.foundclientes.findIndex((cliente) => cliente._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IClientesState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  clientes: IClientesItem[]
  foundclientes: IClientesItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
