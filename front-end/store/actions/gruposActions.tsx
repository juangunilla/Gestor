import { IGruposItem, IpaginatedGrupos } from '../models'

export enum GruposActionTypes {
  SEARCH_GRUPOS = 'grupos/search',
  SEARCHING_GRUPOS = 'grupos/searching',
  FOUND_GRUPOS = 'grupos/found',
  SEARCHING_GRUPOS_FAILED = 'grupos/searching_failed',

  LOAD_GRUPOS = 'grupos/load',
  LOADING_GRUPOS = 'grupos/loading',
  LOADED_GRUPOS = 'grupos/loaded',
  LOADING_GRUPOS_FAILED = 'grupos/loading_failed',

  ADD_GRUPOS = 'grupos/add',
  ADDING_GRUPOS = 'grupos/adding',
  ADDED_GRUPOS = 'grupos/added',
  ADDING_GRUPOS_FAILED = 'grupos/adding_failed',

  REMOVE_GRUPO = 'grupos/remove',
  REMOVING_GRUPO = 'grupos/removing',
  REMOVED_GRUPO = 'grupos/removed',
  REMOVING_GRUPO_FAILED = 'grupos/removing_failed',

  EDIT_GRUPOS = 'grupos/edit',
  EDITING_GRUPOS = 'grupos/editing',
  EDITED_GRUPOS = 'grupos/edited',
  EDITING_GRUPOS_FAILED = 'grupos/editing_failed',
}

export function searchGrupos(searchOptions: TSearchOptions | string, keep?: boolean): ISearchGruposAction {
  return {
    type: GruposActionTypes.SEARCH_GRUPOS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingGrupos(): ISearchingGruposAction {
  return {
    type: GruposActionTypes.SEARCHING_GRUPOS,
  }
}

export function foundGrupos(grupos: IpaginatedGrupos, keep?: boolean): IFoundGruposAction {
  return {
    type: GruposActionTypes.FOUND_GRUPOS,
    keep: keep,
    payload: {
      grupos,
    },
  }
}

export function searchingGruposFailed(): ISearchingGruposFailedAction {
  return {
    type: GruposActionTypes.SEARCHING_GRUPOS_FAILED,
  }
}

export function loadGrupos(loadOptions: TSearchOptions): ILoadGruposAction {
  return {
    type: GruposActionTypes.LOAD_GRUPOS,
    loadOptions: loadOptions,
  }
}

export function loadingGrupos(): ILoadingGruposAction {
  return {
    type: GruposActionTypes.LOADING_GRUPOS,
  }
}

export function loadedGrupos(grupos: IpaginatedGrupos): ILoadedGruposAction {
  return {
    type: GruposActionTypes.LOADED_GRUPOS,
    payload: {
      grupos,
    },
  }
}

export function loadingGruposFailed(): ILoadingGruposFailedAction {
  return {
    type: GruposActionTypes.LOADING_GRUPOS_FAILED,
  }
}

export function addGrupos(grupo: IGruposItem): IAddGruposAction {
  return {
    type: GruposActionTypes.ADD_GRUPOS,
    payload: grupo,
  }
}

export function addingGrupos(): IAddingGruposAction {
  return {
    type: GruposActionTypes.ADDING_GRUPOS,
  }
}

export function addedGrupos(grupos: IpaginatedGrupos): IAddedGruposAction {
  return {
    type: GruposActionTypes.ADDED_GRUPOS,
    payload: {
      grupos,
    },
  }
}

export function addingGruposFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingGruposFailedAction {
  return {
    type: GruposActionTypes.ADDING_GRUPOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeGrupo(grupo: IGruposItem): IRemoveGrupoAction {
  return {
    type: GruposActionTypes.REMOVE_GRUPO,
    payload: grupo,
  }
}

export function removingGrupo(): IRemovingGrupoAction {
  return {
    type: GruposActionTypes.REMOVING_GRUPO,
  }
}

export function removedGrupo(): IRemovedGrupoAction {
  return {
    type: GruposActionTypes.REMOVED_GRUPO,
  }
}

export function removingGrupoFailed(): IRemovingGrupoFailedAction {
  return {
    type: GruposActionTypes.REMOVING_GRUPO_FAILED,
  }
}

export function editGrupos(grupo: IGruposItem): IEditGruposAction {
  return {
    type: GruposActionTypes.EDIT_GRUPOS,
    payload: grupo,
  }
}

export function editingGrupos(): IEditingGruposAction {
  return {
    type: GruposActionTypes.EDITING_GRUPOS,
  }
}

export function editedGrupos(grupos: IGruposItem): IEditedGruposAction {
  return {
    type: GruposActionTypes.EDITED_GRUPOS,
    payload: grupos,
  }
}

export function editingGruposFailed(): IEditingGruposFailedAction {
  return {
    type: GruposActionTypes.EDITING_GRUPOS_FAILED,
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

export interface ISearchGruposAction {
  type: GruposActionTypes.SEARCH_GRUPOS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingGruposAction {
  type: GruposActionTypes.SEARCHING_GRUPOS
}

export interface IFoundGruposAction {
  type: GruposActionTypes.FOUND_GRUPOS
  keep?: boolean
  payload: {
    grupos: IpaginatedGrupos
  }
}

export interface ISearchingGruposFailedAction {
  type: GruposActionTypes.SEARCHING_GRUPOS_FAILED
}

export interface ILoadGruposAction {
  type: GruposActionTypes.LOAD_GRUPOS
  loadOptions: TSearchOptions
}

export interface ILoadingGruposAction {
  type: GruposActionTypes.LOADING_GRUPOS
}

export interface ILoadedGruposAction {
  type: GruposActionTypes.LOADED_GRUPOS
  payload: {
    grupos: IpaginatedGrupos
  }
}

export interface ILoadingGruposFailedAction {
  type: GruposActionTypes.LOADING_GRUPOS_FAILED
}

export interface IAddGruposAction {
  type: GruposActionTypes.ADD_GRUPOS
  payload: IGruposItem
}

export interface IAddingGruposAction {
  type: GruposActionTypes.ADDING_GRUPOS
}

export interface IAddedGruposAction {
  type: GruposActionTypes.ADDED_GRUPOS
  payload: {
    grupos: IpaginatedGrupos
  }
}

export interface IAddingGruposFailedAction {
  type: GruposActionTypes.ADDING_GRUPOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveGrupoAction {
  type: GruposActionTypes.REMOVE_GRUPO
  payload: IGruposItem
}

export interface IRemovingGrupoAction {
  type: GruposActionTypes.REMOVING_GRUPO
}

export interface IRemovedGrupoAction {
  type: GruposActionTypes.REMOVED_GRUPO
}

export interface IRemovingGrupoFailedAction {
  type: GruposActionTypes.REMOVING_GRUPO_FAILED
}

export interface IEditGruposAction {
  type: GruposActionTypes.EDIT_GRUPOS
  payload: IGruposItem
}

export interface IEditingGruposAction {
  type: GruposActionTypes.EDITING_GRUPOS
}

export interface IEditedGruposAction {
  type: GruposActionTypes.EDITED_GRUPOS
  payload: IGruposItem
}

export interface IEditingGruposFailedAction {
  type: GruposActionTypes.EDITING_GRUPOS_FAILED
}

export type GruposAction =
  | ISearchGruposAction
  | ISearchingGruposAction
  | IFoundGruposAction
  | ISearchingGruposFailedAction
  | ILoadGruposAction
  | ILoadingGruposAction
  | ILoadedGruposAction
  | ILoadingGruposFailedAction
  | IAddGruposAction
  | IAddingGruposAction
  | IAddedGruposAction
  | IAddingGruposFailedAction
  | IRemoveGrupoAction
  | IRemovingGrupoAction
  | IRemovedGrupoAction
  | IRemovingGrupoFailedAction
  | IEditGruposAction
  | IEditingGruposAction
  | IEditedGruposAction
  | IEditingGruposFailedAction
