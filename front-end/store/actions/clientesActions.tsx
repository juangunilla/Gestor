import { IClientesItem, IpaginatedClientes } from '../models'

export enum ClientesActionTypes {
  SEARCH_CLIENTES = 'clientes/search',
  SEARCHING_CLIENTES = 'clientes/searching',
  FOUND_CLIENTES = 'clientes/found',
  SEARCHING_CLIENTES_FAILED = 'clientes/searching_failed',

  LOAD_CLIENTES = 'clientes/load',
  LOADING_CLIENTES = 'clientes/loading',
  LOADED_CLIENTES = 'clientes/loaded',
  LOADING_CLIENTES_FAILED = 'clientes/loading_failed',

  ADD_CLIENTES = 'clientes/add',
  ADDING_CLIENTES = 'clientes/adding',
  ADDED_CLIENTES = 'clientes/added',
  ADDING_CLIENTES_FAILED = 'clientes/adding_failed',

  REMOVE_CLIENTE = 'clientes/remove',
  REMOVING_CLIENTE = 'clientes/removing',
  REMOVED_CLIENTE = 'clientes/removed',
  REMOVING_CLIENTE_FAILED = 'clientes/removing_failed',

  EDIT_CLIENTES = 'clientes/edit',
  EDITING_CLIENTES = 'clientes/editing',
  EDITED_CLIENTES = 'clientes/edited',
  EDITING_CLIENTES_FAILED = 'clientes/editing_failed',
}

export function searchClientes(searchOptions: TSearchOptions | string, keep?: boolean): ISearchClientesAction {
  return {
    type: ClientesActionTypes.SEARCH_CLIENTES,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingClientes(): ISearchingClientesAction {
  return {
    type: ClientesActionTypes.SEARCHING_CLIENTES,
  }
}

export function foundClientes(clientes: IpaginatedClientes, keep?: boolean): IFoundClientesAction {
  return {
    type: ClientesActionTypes.FOUND_CLIENTES,
    keep: keep,
    payload: {
      clientes,
    },
  }
}

export function searchingClientesFailed(): ISearchingClientesFailedAction {
  return {
    type: ClientesActionTypes.SEARCHING_CLIENTES_FAILED,
  }
}

export function loadClientes(loadOptions: TSearchOptions): ILoadClientesAction {
  return {
    type: ClientesActionTypes.LOAD_CLIENTES,
    loadOptions: loadOptions,
  }
}

export function loadingClientes(): ILoadingClientesAction {
  return {
    type: ClientesActionTypes.LOADING_CLIENTES,
  }
}

export function loadedClientes(clientes: IpaginatedClientes): ILoadedClientesAction {
  return {
    type: ClientesActionTypes.LOADED_CLIENTES,
    payload: {
      clientes,
    },
  }
}

export function loadingClientesFailed(): ILoadingClientesFailedAction {
  return {
    type: ClientesActionTypes.LOADING_CLIENTES_FAILED,
  }
}

export function addClientes(cliente: IClientesItem): IAddClientesAction {
  return {
    type: ClientesActionTypes.ADD_CLIENTES,
    payload: cliente,
  }
}

export function addingClientes(): IAddingClientesAction {
  return {
    type: ClientesActionTypes.ADDING_CLIENTES,
  }
}

export function addedClientes(clientes: IpaginatedClientes): IAddedClientesAction {
  return {
    type: ClientesActionTypes.ADDED_CLIENTES,
    payload: {
      clientes,
    },
  }
}

export function addingClientesFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingClientesFailedAction {
  return {
    type: ClientesActionTypes.ADDING_CLIENTES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeCliente(cliente: IClientesItem): IRemoveClienteAction {
  return {
    type: ClientesActionTypes.REMOVE_CLIENTE,
    payload: cliente,
  }
}

export function removingCliente(): IRemovingClienteAction {
  return {
    type: ClientesActionTypes.REMOVING_CLIENTE,
  }
}

export function removedCliente(): IRemovedClienteAction {
  return {
    type: ClientesActionTypes.REMOVED_CLIENTE,
  }
}

export function removingClienteFailed(): IRemovingClienteFailedAction {
  return {
    type: ClientesActionTypes.REMOVING_CLIENTE_FAILED,
  }
}

export function editClientes(cliente: IClientesItem): IEditClientesAction {
  return {
    type: ClientesActionTypes.EDIT_CLIENTES,
    payload: cliente,
  }
}

export function editingClientes(): IEditingClientesAction {
  return {
    type: ClientesActionTypes.EDITING_CLIENTES,
  }
}

export function editedClientes(clientes: IClientesItem): IEditedClientesAction {
  return {
    type: ClientesActionTypes.EDITED_CLIENTES,
    payload: clientes,
  }
}

export function editingClientesFailed(): IEditingClientesFailedAction {
  return {
    type: ClientesActionTypes.EDITING_CLIENTES_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchClientesAction {
  type: ClientesActionTypes.SEARCH_CLIENTES
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingClientesAction {
  type: ClientesActionTypes.SEARCHING_CLIENTES
}

export interface IFoundClientesAction {
  type: ClientesActionTypes.FOUND_CLIENTES
  keep?: boolean
  payload: {
    clientes: IpaginatedClientes
  }
}

export interface ISearchingClientesFailedAction {
  type: ClientesActionTypes.SEARCHING_CLIENTES_FAILED
}

export interface ILoadClientesAction {
  type: ClientesActionTypes.LOAD_CLIENTES
  loadOptions: TSearchOptions
}

export interface ILoadingClientesAction {
  type: ClientesActionTypes.LOADING_CLIENTES
}

export interface ILoadedClientesAction {
  type: ClientesActionTypes.LOADED_CLIENTES
  payload: {
    clientes: IpaginatedClientes
  }
}

export interface ILoadingClientesFailedAction {
  type: ClientesActionTypes.LOADING_CLIENTES_FAILED
}

export interface IAddClientesAction {
  type: ClientesActionTypes.ADD_CLIENTES
  payload: IClientesItem
}

export interface IAddingClientesAction {
  type: ClientesActionTypes.ADDING_CLIENTES
}

export interface IAddedClientesAction {
  type: ClientesActionTypes.ADDED_CLIENTES
  payload: {
    clientes: IpaginatedClientes
  }
}

export interface IAddingClientesFailedAction {
  type: ClientesActionTypes.ADDING_CLIENTES_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveClienteAction {
  type: ClientesActionTypes.REMOVE_CLIENTE
  payload: IClientesItem
}

export interface IRemovingClienteAction {
  type: ClientesActionTypes.REMOVING_CLIENTE
}

export interface IRemovedClienteAction {
  type: ClientesActionTypes.REMOVED_CLIENTE
}

export interface IRemovingClienteFailedAction {
  type: ClientesActionTypes.REMOVING_CLIENTE_FAILED
}

export interface IEditClientesAction {
  type: ClientesActionTypes.EDIT_CLIENTES
  payload: IClientesItem
}

export interface IEditingClientesAction {
  type: ClientesActionTypes.EDITING_CLIENTES
}

export interface IEditedClientesAction {
  type: ClientesActionTypes.EDITED_CLIENTES
  payload: IClientesItem
}

export interface IEditingClientesFailedAction {
  type: ClientesActionTypes.EDITING_CLIENTES_FAILED
}

export type ClientesAction =
  | ISearchClientesAction
  | ISearchingClientesAction
  | IFoundClientesAction
  | ISearchingClientesFailedAction
  | ILoadClientesAction
  | ILoadingClientesAction
  | ILoadedClientesAction
  | ILoadingClientesFailedAction
  | IAddClientesAction
  | IAddingClientesAction
  | IAddedClientesAction
  | IAddingClientesFailedAction
  | IRemoveClienteAction
  | IRemovingClienteAction
  | IRemovedClienteAction
  | IRemovingClienteFailedAction
  | IEditClientesAction
  | IEditingClientesAction
  | IEditedClientesAction
  | IEditingClientesFailedAction
