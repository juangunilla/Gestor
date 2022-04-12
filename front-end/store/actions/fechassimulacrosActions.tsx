import { IFechassimulacrosItem, IpaginatedFechassimulacros } from '../models'

export enum FechassimulacrosActionTypes {
  SEARCH_FECHASSIMULACROS = 'fechassimulacros/search',
  SEARCHING_FECHASSIMULACROS = 'fechassimulacros/searching',
  FOUND_FECHASSIMULACROS = 'fechassimulacros/found',
  SEARCHING_FECHASSIMULACROS_FAILED = 'fechassimulacros/searching_failed',

  LOAD_FECHASSIMULACROS = 'fechassimulacros/load',
  LOADING_FECHASSIMULACROS = 'fechassimulacros/loading',
  LOADED_FECHASSIMULACROS = 'fechassimulacros/loaded',
  LOADING_FECHASSIMULACROS_FAILED = 'fechassimulacros/loading_failed',

  ADD_FECHASSIMULACROS = 'fechassimulacros/add',
  ADDING_FECHASSIMULACROS = 'fechassimulacros/adding',
  ADDED_FECHASSIMULACROS = 'fechassimulacros/added',
  ADDING_FECHASSIMULACROS_FAILED = 'fechassimulacros/adding_failed',

  REMOVE_FECHASIMULACRO = 'fechassimulacros/remove',
  REMOVING_FECHASIMULACRO = 'fechassimulacros/removing',
  REMOVED_FECHASIMULACRO = 'fechassimulacros/removed',
  REMOVING_FECHASIMULACRO_FAILED = 'fechassimulacros/removing_failed',

  EDIT_FECHASSIMULACROS = 'fechassimulacros/edit',
  EDITING_FECHASSIMULACROS = 'fechassimulacros/editing',
  EDITED_FECHASSIMULACROS = 'fechassimulacros/edited',
  EDITING_FECHASSIMULACROS_FAILED = 'fechassimulacros/editing_failed',
}

export function searchFechassimulacros(searchOptions: TSearchOptions | string, keep?: boolean): ISearchFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.SEARCH_FECHASSIMULACROS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingFechassimulacros(): ISearchingFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.SEARCHING_FECHASSIMULACROS,
  }
}

export function foundFechassimulacros(fechassimulacros: IpaginatedFechassimulacros, keep?: boolean): IFoundFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.FOUND_FECHASSIMULACROS,
    keep: keep,
    payload: {
      fechassimulacros,
    },
  }
}

export function searchingFechassimulacrosFailed(): ISearchingFechassimulacrosFailedAction {
  return {
    type: FechassimulacrosActionTypes.SEARCHING_FECHASSIMULACROS_FAILED,
  }
}

export function loadFechassimulacros(loadOptions: TSearchOptions): ILoadFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.LOAD_FECHASSIMULACROS,
    loadOptions: loadOptions,
  }
}

export function loadingFechassimulacros(): ILoadingFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.LOADING_FECHASSIMULACROS,
  }
}

export function loadedFechassimulacros(fechassimulacros: IpaginatedFechassimulacros): ILoadedFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.LOADED_FECHASSIMULACROS,
    payload: {
      fechassimulacros,
    },
  }
}

export function loadingFechassimulacrosFailed(): ILoadingFechassimulacrosFailedAction {
  return {
    type: FechassimulacrosActionTypes.LOADING_FECHASSIMULACROS_FAILED,
  }
}

export function addFechassimulacros(fechasimulacro: IFechassimulacrosItem): IAddFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.ADD_FECHASSIMULACROS,
    payload: fechasimulacro,
  }
}

export function addingFechassimulacros(): IAddingFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.ADDING_FECHASSIMULACROS,
  }
}

export function addedFechassimulacros(fechassimulacros: IpaginatedFechassimulacros): IAddedFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.ADDED_FECHASSIMULACROS,
    payload: {
      fechassimulacros,
    },
  }
}

export function addingFechassimulacrosFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): IAddingFechassimulacrosFailedAction {
  return {
    type: FechassimulacrosActionTypes.ADDING_FECHASSIMULACROS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeFechasimulacro(fechasimulacro: IFechassimulacrosItem): IRemoveFechasimulacroAction {
  return {
    type: FechassimulacrosActionTypes.REMOVE_FECHASIMULACRO,
    payload: fechasimulacro,
  }
}

export function removingFechasimulacro(): IRemovingFechasimulacroAction {
  return {
    type: FechassimulacrosActionTypes.REMOVING_FECHASIMULACRO,
  }
}

export function removedFechasimulacro(): IRemovedFechasimulacroAction {
  return {
    type: FechassimulacrosActionTypes.REMOVED_FECHASIMULACRO,
  }
}

export function removingFechasimulacroFailed(): IRemovingFechasimulacroFailedAction {
  return {
    type: FechassimulacrosActionTypes.REMOVING_FECHASIMULACRO_FAILED,
  }
}

export function editFechassimulacros(fechasimulacro: IFechassimulacrosItem): IEditFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.EDIT_FECHASSIMULACROS,
    payload: fechasimulacro,
  }
}

export function editingFechassimulacros(): IEditingFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.EDITING_FECHASSIMULACROS,
  }
}

export function editedFechassimulacros(fechassimulacros: IFechassimulacrosItem): IEditedFechassimulacrosAction {
  return {
    type: FechassimulacrosActionTypes.EDITED_FECHASSIMULACROS,
    payload: fechassimulacros,
  }
}

export function editingFechassimulacrosFailed(): IEditingFechassimulacrosFailedAction {
  return {
    type: FechassimulacrosActionTypes.EDITING_FECHASSIMULACROS_FAILED,
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

export interface ISearchFechassimulacrosAction {
  type: FechassimulacrosActionTypes.SEARCH_FECHASSIMULACROS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingFechassimulacrosAction {
  type: FechassimulacrosActionTypes.SEARCHING_FECHASSIMULACROS
}

export interface IFoundFechassimulacrosAction {
  type: FechassimulacrosActionTypes.FOUND_FECHASSIMULACROS
  keep?: boolean
  payload: {
    fechassimulacros: IpaginatedFechassimulacros
  }
}

export interface ISearchingFechassimulacrosFailedAction {
  type: FechassimulacrosActionTypes.SEARCHING_FECHASSIMULACROS_FAILED
}

export interface ILoadFechassimulacrosAction {
  type: FechassimulacrosActionTypes.LOAD_FECHASSIMULACROS
  loadOptions: TSearchOptions
}

export interface ILoadingFechassimulacrosAction {
  type: FechassimulacrosActionTypes.LOADING_FECHASSIMULACROS
}

export interface ILoadedFechassimulacrosAction {
  type: FechassimulacrosActionTypes.LOADED_FECHASSIMULACROS
  payload: {
    fechassimulacros: IpaginatedFechassimulacros
  }
}

export interface ILoadingFechassimulacrosFailedAction {
  type: FechassimulacrosActionTypes.LOADING_FECHASSIMULACROS_FAILED
}

export interface IAddFechassimulacrosAction {
  type: FechassimulacrosActionTypes.ADD_FECHASSIMULACROS
  payload: IFechassimulacrosItem
}

export interface IAddingFechassimulacrosAction {
  type: FechassimulacrosActionTypes.ADDING_FECHASSIMULACROS
}

export interface IAddedFechassimulacrosAction {
  type: FechassimulacrosActionTypes.ADDED_FECHASSIMULACROS
  payload: {
    fechassimulacros: IpaginatedFechassimulacros
  }
}

export interface IAddingFechassimulacrosFailedAction {
  type: FechassimulacrosActionTypes.ADDING_FECHASSIMULACROS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveFechasimulacroAction {
  type: FechassimulacrosActionTypes.REMOVE_FECHASIMULACRO
  payload: IFechassimulacrosItem
}

export interface IRemovingFechasimulacroAction {
  type: FechassimulacrosActionTypes.REMOVING_FECHASIMULACRO
}

export interface IRemovedFechasimulacroAction {
  type: FechassimulacrosActionTypes.REMOVED_FECHASIMULACRO
}

export interface IRemovingFechasimulacroFailedAction {
  type: FechassimulacrosActionTypes.REMOVING_FECHASIMULACRO_FAILED
}

export interface IEditFechassimulacrosAction {
  type: FechassimulacrosActionTypes.EDIT_FECHASSIMULACROS
  payload: IFechassimulacrosItem
}

export interface IEditingFechassimulacrosAction {
  type: FechassimulacrosActionTypes.EDITING_FECHASSIMULACROS
}

export interface IEditedFechassimulacrosAction {
  type: FechassimulacrosActionTypes.EDITED_FECHASSIMULACROS
  payload: IFechassimulacrosItem
}

export interface IEditingFechassimulacrosFailedAction {
  type: FechassimulacrosActionTypes.EDITING_FECHASSIMULACROS_FAILED
}

export type FechassimulacrosAction =
  | ISearchFechassimulacrosAction
  | ISearchingFechassimulacrosAction
  | IFoundFechassimulacrosAction
  | ISearchingFechassimulacrosFailedAction
  | ILoadFechassimulacrosAction
  | ILoadingFechassimulacrosAction
  | ILoadedFechassimulacrosAction
  | ILoadingFechassimulacrosFailedAction
  | IAddFechassimulacrosAction
  | IAddingFechassimulacrosAction
  | IAddedFechassimulacrosAction
  | IAddingFechassimulacrosFailedAction
  | IRemoveFechasimulacroAction
  | IRemovingFechasimulacroAction
  | IRemovedFechasimulacroAction
  | IRemovingFechasimulacroFailedAction
  | IEditFechassimulacrosAction
  | IEditingFechassimulacrosAction
  | IEditedFechassimulacrosAction
  | IEditingFechassimulacrosFailedAction
