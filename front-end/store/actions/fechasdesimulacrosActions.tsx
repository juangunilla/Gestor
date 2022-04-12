import { IFechasdesimulacrosItem, IpaginatedFechasdesimulacros } from '../models'

export enum FechasdesimulacrosActionTypes {
  SEARCH_FECHASDESIMULACROS = 'fechasdesimulacros/search',
  SEARCHING_FECHASDESIMULACROS = 'fechasdesimulacros/searching',
  FOUND_FECHASDESIMULACROS = 'fechasdesimulacros/found',
  SEARCHING_FECHASDESIMULACROS_FAILED = 'fechasdesimulacros/searching_failed',

  LOAD_FECHASDESIMULACROS = 'fechasdesimulacros/load',
  LOADING_FECHASDESIMULACROS = 'fechasdesimulacros/loading',
  LOADED_FECHASDESIMULACROS = 'fechasdesimulacros/loaded',
  LOADING_FECHASDESIMULACROS_FAILED = 'fechasdesimulacros/loading_failed',

  ADD_FECHASDESIMULACROS = 'fechasdesimulacros/add',
  ADDING_FECHASDESIMULACROS = 'fechasdesimulacros/adding',
  ADDED_FECHASDESIMULACROS = 'fechasdesimulacros/added',
  ADDING_FECHASDESIMULACROS_FAILED = 'fechasdesimulacros/adding_failed',

  REMOVE_FECHADESIMULACRO = 'fechasdesimulacros/remove',
  REMOVING_FECHADESIMULACRO = 'fechasdesimulacros/removing',
  REMOVED_FECHADESIMULACRO = 'fechasdesimulacros/removed',
  REMOVING_FECHADESIMULACRO_FAILED = 'fechasdesimulacros/removing_failed',

  EDIT_FECHASDESIMULACROS = 'fechasdesimulacros/edit',
  EDITING_FECHASDESIMULACROS = 'fechasdesimulacros/editing',
  EDITED_FECHASDESIMULACROS = 'fechasdesimulacros/edited',
  EDITING_FECHASDESIMULACROS_FAILED = 'fechasdesimulacros/editing_failed',
}

export function searchFechasdesimulacros(searchOptions: TSearchOptions | string, keep?: boolean): ISearchFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.SEARCH_FECHASDESIMULACROS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingFechasdesimulacros(): ISearchingFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.SEARCHING_FECHASDESIMULACROS,
  }
}

export function foundFechasdesimulacros(fechasdesimulacros: IpaginatedFechasdesimulacros, keep?: boolean): IFoundFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.FOUND_FECHASDESIMULACROS,
    keep: keep,
    payload: {
      fechasdesimulacros,
    },
  }
}

export function searchingFechasdesimulacrosFailed(): ISearchingFechasdesimulacrosFailedAction {
  return {
    type: FechasdesimulacrosActionTypes.SEARCHING_FECHASDESIMULACROS_FAILED,
  }
}

export function loadFechasdesimulacros(loadOptions: TSearchOptions): ILoadFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.LOAD_FECHASDESIMULACROS,
    loadOptions: loadOptions,
  }
}

export function loadingFechasdesimulacros(): ILoadingFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.LOADING_FECHASDESIMULACROS,
  }
}

export function loadedFechasdesimulacros(fechasdesimulacros: IpaginatedFechasdesimulacros): ILoadedFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.LOADED_FECHASDESIMULACROS,
    payload: {
      fechasdesimulacros,
    },
  }
}

export function loadingFechasdesimulacrosFailed(): ILoadingFechasdesimulacrosFailedAction {
  return {
    type: FechasdesimulacrosActionTypes.LOADING_FECHASDESIMULACROS_FAILED,
  }
}

export function addFechasdesimulacros(fechadesimulacro: IFechasdesimulacrosItem): IAddFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.ADD_FECHASDESIMULACROS,
    payload: fechadesimulacro,
  }
}

export function addingFechasdesimulacros(): IAddingFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.ADDING_FECHASDESIMULACROS,
  }
}

export function addedFechasdesimulacros(fechasdesimulacros: IpaginatedFechasdesimulacros): IAddedFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.ADDED_FECHASDESIMULACROS,
    payload: {
      fechasdesimulacros,
    },
  }
}

export function addingFechasdesimulacrosFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): IAddingFechasdesimulacrosFailedAction {
  return {
    type: FechasdesimulacrosActionTypes.ADDING_FECHASDESIMULACROS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeFechadesimulacro(fechadesimulacro: IFechasdesimulacrosItem): IRemoveFechadesimulacroAction {
  return {
    type: FechasdesimulacrosActionTypes.REMOVE_FECHADESIMULACRO,
    payload: fechadesimulacro,
  }
}

export function removingFechadesimulacro(): IRemovingFechadesimulacroAction {
  return {
    type: FechasdesimulacrosActionTypes.REMOVING_FECHADESIMULACRO,
  }
}

export function removedFechadesimulacro(): IRemovedFechadesimulacroAction {
  return {
    type: FechasdesimulacrosActionTypes.REMOVED_FECHADESIMULACRO,
  }
}

export function removingFechadesimulacroFailed(): IRemovingFechadesimulacroFailedAction {
  return {
    type: FechasdesimulacrosActionTypes.REMOVING_FECHADESIMULACRO_FAILED,
  }
}

export function editFechasdesimulacros(fechadesimulacro: IFechasdesimulacrosItem): IEditFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.EDIT_FECHASDESIMULACROS,
    payload: fechadesimulacro,
  }
}

export function editingFechasdesimulacros(): IEditingFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.EDITING_FECHASDESIMULACROS,
  }
}

export function editedFechasdesimulacros(fechasdesimulacros: IFechasdesimulacrosItem): IEditedFechasdesimulacrosAction {
  return {
    type: FechasdesimulacrosActionTypes.EDITED_FECHASDESIMULACROS,
    payload: fechasdesimulacros,
  }
}

export function editingFechasdesimulacrosFailed(): IEditingFechasdesimulacrosFailedAction {
  return {
    type: FechasdesimulacrosActionTypes.EDITING_FECHASDESIMULACROS_FAILED,
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

export interface ISearchFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.SEARCH_FECHASDESIMULACROS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.SEARCHING_FECHASDESIMULACROS
}

export interface IFoundFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.FOUND_FECHASDESIMULACROS
  keep?: boolean
  payload: {
    fechasdesimulacros: IpaginatedFechasdesimulacros
  }
}

export interface ISearchingFechasdesimulacrosFailedAction {
  type: FechasdesimulacrosActionTypes.SEARCHING_FECHASDESIMULACROS_FAILED
}

export interface ILoadFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.LOAD_FECHASDESIMULACROS
  loadOptions: TSearchOptions
}

export interface ILoadingFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.LOADING_FECHASDESIMULACROS
}

export interface ILoadedFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.LOADED_FECHASDESIMULACROS
  payload: {
    fechasdesimulacros: IpaginatedFechasdesimulacros
  }
}

export interface ILoadingFechasdesimulacrosFailedAction {
  type: FechasdesimulacrosActionTypes.LOADING_FECHASDESIMULACROS_FAILED
}

export interface IAddFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.ADD_FECHASDESIMULACROS
  payload: IFechasdesimulacrosItem
}

export interface IAddingFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.ADDING_FECHASDESIMULACROS
}

export interface IAddedFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.ADDED_FECHASDESIMULACROS
  payload: {
    fechasdesimulacros: IpaginatedFechasdesimulacros
  }
}

export interface IAddingFechasdesimulacrosFailedAction {
  type: FechasdesimulacrosActionTypes.ADDING_FECHASDESIMULACROS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveFechadesimulacroAction {
  type: FechasdesimulacrosActionTypes.REMOVE_FECHADESIMULACRO
  payload: IFechasdesimulacrosItem
}

export interface IRemovingFechadesimulacroAction {
  type: FechasdesimulacrosActionTypes.REMOVING_FECHADESIMULACRO
}

export interface IRemovedFechadesimulacroAction {
  type: FechasdesimulacrosActionTypes.REMOVED_FECHADESIMULACRO
}

export interface IRemovingFechadesimulacroFailedAction {
  type: FechasdesimulacrosActionTypes.REMOVING_FECHADESIMULACRO_FAILED
}

export interface IEditFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.EDIT_FECHASDESIMULACROS
  payload: IFechasdesimulacrosItem
}

export interface IEditingFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.EDITING_FECHASDESIMULACROS
}

export interface IEditedFechasdesimulacrosAction {
  type: FechasdesimulacrosActionTypes.EDITED_FECHASDESIMULACROS
  payload: IFechasdesimulacrosItem
}

export interface IEditingFechasdesimulacrosFailedAction {
  type: FechasdesimulacrosActionTypes.EDITING_FECHASDESIMULACROS_FAILED
}

export type FechasdesimulacrosAction =
  | ISearchFechasdesimulacrosAction
  | ISearchingFechasdesimulacrosAction
  | IFoundFechasdesimulacrosAction
  | ISearchingFechasdesimulacrosFailedAction
  | ILoadFechasdesimulacrosAction
  | ILoadingFechasdesimulacrosAction
  | ILoadedFechasdesimulacrosAction
  | ILoadingFechasdesimulacrosFailedAction
  | IAddFechasdesimulacrosAction
  | IAddingFechasdesimulacrosAction
  | IAddedFechasdesimulacrosAction
  | IAddingFechasdesimulacrosFailedAction
  | IRemoveFechadesimulacroAction
  | IRemovingFechadesimulacroAction
  | IRemovedFechadesimulacroAction
  | IRemovingFechadesimulacroFailedAction
  | IEditFechasdesimulacrosAction
  | IEditingFechasdesimulacrosAction
  | IEditedFechasdesimulacrosAction
  | IEditingFechasdesimulacrosFailedAction
