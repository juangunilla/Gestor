import { IExpedientesItem, IpaginatedExpedientes } from '../models'

export enum ExpedientesActionTypes {
  SEARCH_EXPEDIENTES = 'expedientes/search',
  SEARCHING_EXPEDIENTES = 'expedientes/searching',
  FOUND_EXPEDIENTES = 'expedientes/found',
  SEARCHING_EXPEDIENTES_FAILED = 'expedientes/searching_failed',

  LOAD_EXPEDIENTES = 'expedientes/load',
  LOADING_EXPEDIENTES = 'expedientes/loading',
  LOADED_EXPEDIENTES = 'expedientes/loaded',
  LOADING_EXPEDIENTES_FAILED = 'expedientes/loading_failed',

  ADD_EXPEDIENTES = 'expedientes/add',
  ADDING_EXPEDIENTES = 'expedientes/adding',
  ADDED_EXPEDIENTES = 'expedientes/added',
  ADDING_EXPEDIENTES_FAILED = 'expedientes/adding_failed',

  REMOVE_EXPEDIENTE = 'expedientes/remove',
  REMOVING_EXPEDIENTE = 'expedientes/removing',
  REMOVED_EXPEDIENTE = 'expedientes/removed',
  REMOVING_EXPEDIENTE_FAILED = 'expedientes/removing_failed',

  EDIT_EXPEDIENTES = 'expedientes/edit',
  EDITING_EXPEDIENTES = 'expedientes/editing',
  EDITED_EXPEDIENTES = 'expedientes/edited',
  EDITING_EXPEDIENTES_FAILED = 'expedientes/editing_failed',
}

export function searchExpedientes(searchOptions: TSearchOptions | string, keep?: boolean): ISearchExpedientesAction {
  return {
    type: ExpedientesActionTypes.SEARCH_EXPEDIENTES,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingExpedientes(): ISearchingExpedientesAction {
  return {
    type: ExpedientesActionTypes.SEARCHING_EXPEDIENTES,
  }
}

export function foundExpedientes(expedientes: IpaginatedExpedientes, keep?: boolean): IFoundExpedientesAction {
  return {
    type: ExpedientesActionTypes.FOUND_EXPEDIENTES,
    keep: keep,
    payload: {
      expedientes,
    },
  }
}

export function searchingExpedientesFailed(): ISearchingExpedientesFailedAction {
  return {
    type: ExpedientesActionTypes.SEARCHING_EXPEDIENTES_FAILED,
  }
}

export function loadExpedientes(loadOptions: TSearchOptions): ILoadExpedientesAction {
  return {
    type: ExpedientesActionTypes.LOAD_EXPEDIENTES,
    loadOptions: loadOptions,
  }
}

export function loadingExpedientes(): ILoadingExpedientesAction {
  return {
    type: ExpedientesActionTypes.LOADING_EXPEDIENTES,
  }
}

export function loadedExpedientes(expedientes: IpaginatedExpedientes): ILoadedExpedientesAction {
  return {
    type: ExpedientesActionTypes.LOADED_EXPEDIENTES,
    payload: {
      expedientes,
    },
  }
}

export function loadingExpedientesFailed(): ILoadingExpedientesFailedAction {
  return {
    type: ExpedientesActionTypes.LOADING_EXPEDIENTES_FAILED,
  }
}

export function addExpedientes(expediente: IExpedientesItem): IAddExpedientesAction {
  return {
    type: ExpedientesActionTypes.ADD_EXPEDIENTES,
    payload: expediente,
  }
}

export function addingExpedientes(): IAddingExpedientesAction {
  return {
    type: ExpedientesActionTypes.ADDING_EXPEDIENTES,
  }
}

export function addedExpedientes(expedientes: IpaginatedExpedientes): IAddedExpedientesAction {
  return {
    type: ExpedientesActionTypes.ADDED_EXPEDIENTES,
    payload: {
      expedientes,
    },
  }
}

export function addingExpedientesFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingExpedientesFailedAction {
  return {
    type: ExpedientesActionTypes.ADDING_EXPEDIENTES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeExpediente(expediente: IExpedientesItem): IRemoveExpedienteAction {
  return {
    type: ExpedientesActionTypes.REMOVE_EXPEDIENTE,
    payload: expediente,
  }
}

export function removingExpediente(): IRemovingExpedienteAction {
  return {
    type: ExpedientesActionTypes.REMOVING_EXPEDIENTE,
  }
}

export function removedExpediente(): IRemovedExpedienteAction {
  return {
    type: ExpedientesActionTypes.REMOVED_EXPEDIENTE,
  }
}

export function removingExpedienteFailed(): IRemovingExpedienteFailedAction {
  return {
    type: ExpedientesActionTypes.REMOVING_EXPEDIENTE_FAILED,
  }
}

export function editExpedientes(expediente: IExpedientesItem): IEditExpedientesAction {
  return {
    type: ExpedientesActionTypes.EDIT_EXPEDIENTES,
    payload: expediente,
  }
}

export function editingExpedientes(): IEditingExpedientesAction {
  return {
    type: ExpedientesActionTypes.EDITING_EXPEDIENTES,
  }
}

export function editedExpedientes(expedientes: IExpedientesItem): IEditedExpedientesAction {
  return {
    type: ExpedientesActionTypes.EDITED_EXPEDIENTES,
    payload: expedientes,
  }
}

export function editingExpedientesFailed(): IEditingExpedientesFailedAction {
  return {
    type: ExpedientesActionTypes.EDITING_EXPEDIENTES_FAILED,
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

export interface ISearchExpedientesAction {
  type: ExpedientesActionTypes.SEARCH_EXPEDIENTES
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingExpedientesAction {
  type: ExpedientesActionTypes.SEARCHING_EXPEDIENTES
}

export interface IFoundExpedientesAction {
  type: ExpedientesActionTypes.FOUND_EXPEDIENTES
  keep?: boolean
  payload: {
    expedientes: IpaginatedExpedientes
  }
}

export interface ISearchingExpedientesFailedAction {
  type: ExpedientesActionTypes.SEARCHING_EXPEDIENTES_FAILED
}

export interface ILoadExpedientesAction {
  type: ExpedientesActionTypes.LOAD_EXPEDIENTES
  loadOptions: TSearchOptions
}

export interface ILoadingExpedientesAction {
  type: ExpedientesActionTypes.LOADING_EXPEDIENTES
}

export interface ILoadedExpedientesAction {
  type: ExpedientesActionTypes.LOADED_EXPEDIENTES
  payload: {
    expedientes: IpaginatedExpedientes
  }
}

export interface ILoadingExpedientesFailedAction {
  type: ExpedientesActionTypes.LOADING_EXPEDIENTES_FAILED
}

export interface IAddExpedientesAction {
  type: ExpedientesActionTypes.ADD_EXPEDIENTES
  payload: IExpedientesItem
}

export interface IAddingExpedientesAction {
  type: ExpedientesActionTypes.ADDING_EXPEDIENTES
}

export interface IAddedExpedientesAction {
  type: ExpedientesActionTypes.ADDED_EXPEDIENTES
  payload: {
    expedientes: IpaginatedExpedientes
  }
}

export interface IAddingExpedientesFailedAction {
  type: ExpedientesActionTypes.ADDING_EXPEDIENTES_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveExpedienteAction {
  type: ExpedientesActionTypes.REMOVE_EXPEDIENTE
  payload: IExpedientesItem
}

export interface IRemovingExpedienteAction {
  type: ExpedientesActionTypes.REMOVING_EXPEDIENTE
}

export interface IRemovedExpedienteAction {
  type: ExpedientesActionTypes.REMOVED_EXPEDIENTE
}

export interface IRemovingExpedienteFailedAction {
  type: ExpedientesActionTypes.REMOVING_EXPEDIENTE_FAILED
}

export interface IEditExpedientesAction {
  type: ExpedientesActionTypes.EDIT_EXPEDIENTES
  payload: IExpedientesItem
}

export interface IEditingExpedientesAction {
  type: ExpedientesActionTypes.EDITING_EXPEDIENTES
}

export interface IEditedExpedientesAction {
  type: ExpedientesActionTypes.EDITED_EXPEDIENTES
  payload: IExpedientesItem
}

export interface IEditingExpedientesFailedAction {
  type: ExpedientesActionTypes.EDITING_EXPEDIENTES_FAILED
}

export type ExpedientesAction =
  | ISearchExpedientesAction
  | ISearchingExpedientesAction
  | IFoundExpedientesAction
  | ISearchingExpedientesFailedAction
  | ILoadExpedientesAction
  | ILoadingExpedientesAction
  | ILoadedExpedientesAction
  | ILoadingExpedientesFailedAction
  | IAddExpedientesAction
  | IAddingExpedientesAction
  | IAddedExpedientesAction
  | IAddingExpedientesFailedAction
  | IRemoveExpedienteAction
  | IRemovingExpedienteAction
  | IRemovedExpedienteAction
  | IRemovingExpedienteFailedAction
  | IEditExpedientesAction
  | IEditingExpedientesAction
  | IEditedExpedientesAction
  | IEditingExpedientesFailedAction
