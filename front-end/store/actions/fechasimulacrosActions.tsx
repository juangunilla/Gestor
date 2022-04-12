import { IFechasimulacrosItem, IpaginatedFechasimulacros } from '../models'

export enum FechasimulacrosActionTypes {
  SEARCH_FECHASIMULACROS = 'fechasimulacros/search',
  SEARCHING_FECHASIMULACROS = 'fechasimulacros/searching',
  FOUND_FECHASIMULACROS = 'fechasimulacros/found',
  SEARCHING_FECHASIMULACROS_FAILED = 'fechasimulacros/searching_failed',

  LOAD_FECHASIMULACROS = 'fechasimulacros/load',
  LOADING_FECHASIMULACROS = 'fechasimulacros/loading',
  LOADED_FECHASIMULACROS = 'fechasimulacros/loaded',
  LOADING_FECHASIMULACROS_FAILED = 'fechasimulacros/loading_failed',

  ADD_FECHASIMULACROS = 'fechasimulacros/add',
  ADDING_FECHASIMULACROS = 'fechasimulacros/adding',
  ADDED_FECHASIMULACROS = 'fechasimulacros/added',
  ADDING_FECHASIMULACROS_FAILED = 'fechasimulacros/adding_failed',

  REMOVE_FECHASIMU = 'fechasimulacros/remove',
  REMOVING_FECHASIMU = 'fechasimulacros/removing',
  REMOVED_FECHASIMU = 'fechasimulacros/removed',
  REMOVING_FECHASIMU_FAILED = 'fechasimulacros/removing_failed',

  EDIT_FECHASIMULACROS = 'fechasimulacros/edit',
  EDITING_FECHASIMULACROS = 'fechasimulacros/editing',
  EDITED_FECHASIMULACROS = 'fechasimulacros/edited',
  EDITING_FECHASIMULACROS_FAILED = 'fechasimulacros/editing_failed',
}

export function searchFechasimulacros(searchOptions: TSearchOptions | string, keep?: boolean): ISearchFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.SEARCH_FECHASIMULACROS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingFechasimulacros(): ISearchingFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.SEARCHING_FECHASIMULACROS,
  }
}

export function foundFechasimulacros(fechasimulacros: IpaginatedFechasimulacros, keep?: boolean): IFoundFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.FOUND_FECHASIMULACROS,
    keep: keep,
    payload: {
      fechasimulacros,
    },
  }
}

export function searchingFechasimulacrosFailed(): ISearchingFechasimulacrosFailedAction {
  return {
    type: FechasimulacrosActionTypes.SEARCHING_FECHASIMULACROS_FAILED,
  }
}

export function loadFechasimulacros(loadOptions: TSearchOptions): ILoadFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.LOAD_FECHASIMULACROS,
    loadOptions: loadOptions,
  }
}

export function loadingFechasimulacros(): ILoadingFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.LOADING_FECHASIMULACROS,
  }
}

export function loadedFechasimulacros(fechasimulacros: IpaginatedFechasimulacros): ILoadedFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.LOADED_FECHASIMULACROS,
    payload: {
      fechasimulacros,
    },
  }
}

export function loadingFechasimulacrosFailed(): ILoadingFechasimulacrosFailedAction {
  return {
    type: FechasimulacrosActionTypes.LOADING_FECHASIMULACROS_FAILED,
  }
}

export function addFechasimulacros(fechasimu: IFechasimulacrosItem): IAddFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.ADD_FECHASIMULACROS,
    payload: fechasimu,
  }
}

export function addingFechasimulacros(): IAddingFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.ADDING_FECHASIMULACROS,
  }
}

export function addedFechasimulacros(fechasimulacros: IpaginatedFechasimulacros): IAddedFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.ADDED_FECHASIMULACROS,
    payload: {
      fechasimulacros,
    },
  }
}

export function addingFechasimulacrosFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): IAddingFechasimulacrosFailedAction {
  return {
    type: FechasimulacrosActionTypes.ADDING_FECHASIMULACROS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeFechasimu(fechasimu: IFechasimulacrosItem): IRemoveFechasimuAction {
  return {
    type: FechasimulacrosActionTypes.REMOVE_FECHASIMU,
    payload: fechasimu,
  }
}

export function removingFechasimu(): IRemovingFechasimuAction {
  return {
    type: FechasimulacrosActionTypes.REMOVING_FECHASIMU,
  }
}

export function removedFechasimu(): IRemovedFechasimuAction {
  return {
    type: FechasimulacrosActionTypes.REMOVED_FECHASIMU,
  }
}

export function removingFechasimuFailed(): IRemovingFechasimuFailedAction {
  return {
    type: FechasimulacrosActionTypes.REMOVING_FECHASIMU_FAILED,
  }
}

export function editFechasimulacros(fechasimu: IFechasimulacrosItem): IEditFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.EDIT_FECHASIMULACROS,
    payload: fechasimu,
  }
}

export function editingFechasimulacros(): IEditingFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.EDITING_FECHASIMULACROS,
  }
}

export function editedFechasimulacros(fechasimulacros: IFechasimulacrosItem): IEditedFechasimulacrosAction {
  return {
    type: FechasimulacrosActionTypes.EDITED_FECHASIMULACROS,
    payload: fechasimulacros,
  }
}

export function editingFechasimulacrosFailed(): IEditingFechasimulacrosFailedAction {
  return {
    type: FechasimulacrosActionTypes.EDITING_FECHASIMULACROS_FAILED,
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

export interface ISearchFechasimulacrosAction {
  type: FechasimulacrosActionTypes.SEARCH_FECHASIMULACROS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingFechasimulacrosAction {
  type: FechasimulacrosActionTypes.SEARCHING_FECHASIMULACROS
}

export interface IFoundFechasimulacrosAction {
  type: FechasimulacrosActionTypes.FOUND_FECHASIMULACROS
  keep?: boolean
  payload: {
    fechasimulacros: IpaginatedFechasimulacros
  }
}

export interface ISearchingFechasimulacrosFailedAction {
  type: FechasimulacrosActionTypes.SEARCHING_FECHASIMULACROS_FAILED
}

export interface ILoadFechasimulacrosAction {
  type: FechasimulacrosActionTypes.LOAD_FECHASIMULACROS
  loadOptions: TSearchOptions
}

export interface ILoadingFechasimulacrosAction {
  type: FechasimulacrosActionTypes.LOADING_FECHASIMULACROS
}

export interface ILoadedFechasimulacrosAction {
  type: FechasimulacrosActionTypes.LOADED_FECHASIMULACROS
  payload: {
    fechasimulacros: IpaginatedFechasimulacros
  }
}

export interface ILoadingFechasimulacrosFailedAction {
  type: FechasimulacrosActionTypes.LOADING_FECHASIMULACROS_FAILED
}

export interface IAddFechasimulacrosAction {
  type: FechasimulacrosActionTypes.ADD_FECHASIMULACROS
  payload: IFechasimulacrosItem
}

export interface IAddingFechasimulacrosAction {
  type: FechasimulacrosActionTypes.ADDING_FECHASIMULACROS
}

export interface IAddedFechasimulacrosAction {
  type: FechasimulacrosActionTypes.ADDED_FECHASIMULACROS
  payload: {
    fechasimulacros: IpaginatedFechasimulacros
  }
}

export interface IAddingFechasimulacrosFailedAction {
  type: FechasimulacrosActionTypes.ADDING_FECHASIMULACROS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveFechasimuAction {
  type: FechasimulacrosActionTypes.REMOVE_FECHASIMU
  payload: IFechasimulacrosItem
}

export interface IRemovingFechasimuAction {
  type: FechasimulacrosActionTypes.REMOVING_FECHASIMU
}

export interface IRemovedFechasimuAction {
  type: FechasimulacrosActionTypes.REMOVED_FECHASIMU
}

export interface IRemovingFechasimuFailedAction {
  type: FechasimulacrosActionTypes.REMOVING_FECHASIMU_FAILED
}

export interface IEditFechasimulacrosAction {
  type: FechasimulacrosActionTypes.EDIT_FECHASIMULACROS
  payload: IFechasimulacrosItem
}

export interface IEditingFechasimulacrosAction {
  type: FechasimulacrosActionTypes.EDITING_FECHASIMULACROS
}

export interface IEditedFechasimulacrosAction {
  type: FechasimulacrosActionTypes.EDITED_FECHASIMULACROS
  payload: IFechasimulacrosItem
}

export interface IEditingFechasimulacrosFailedAction {
  type: FechasimulacrosActionTypes.EDITING_FECHASIMULACROS_FAILED
}

export type FechasimulacrosAction =
  | ISearchFechasimulacrosAction
  | ISearchingFechasimulacrosAction
  | IFoundFechasimulacrosAction
  | ISearchingFechasimulacrosFailedAction
  | ILoadFechasimulacrosAction
  | ILoadingFechasimulacrosAction
  | ILoadedFechasimulacrosAction
  | ILoadingFechasimulacrosFailedAction
  | IAddFechasimulacrosAction
  | IAddingFechasimulacrosAction
  | IAddedFechasimulacrosAction
  | IAddingFechasimulacrosFailedAction
  | IRemoveFechasimuAction
  | IRemovingFechasimuAction
  | IRemovedFechasimuAction
  | IRemovingFechasimuFailedAction
  | IEditFechasimulacrosAction
  | IEditingFechasimulacrosAction
  | IEditedFechasimulacrosAction
  | IEditingFechasimulacrosFailedAction
