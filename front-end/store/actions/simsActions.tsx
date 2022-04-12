import { IpaginatedSims, ISimsItem } from '../models'

export enum SimsActionTypes {
  SEARCH_SIMS = 'sims/search',
  SEARCHING_SIMS = 'sims/searching',
  FOUND_SIMS = 'sims/found',
  SEARCHING_SIMS_FAILED = 'sims/searching_failed',

  LOAD_SIMS = 'sims/load',
  LOADING_SIMS = 'sims/loading',
  LOADED_SIMS = 'sims/loaded',
  LOADING_SIMS_FAILED = 'sims/loading_failed',

  ADD_SIMS = 'sims/add',
  ADDING_SIMS = 'sims/adding',
  ADDED_SIMS = 'sims/added',
  ADDING_SIMS_FAILED = 'sims/adding_failed',

  REMOVE_SIM = 'sims/remove',
  REMOVING_SIM = 'sims/removing',
  REMOVED_SIM = 'sims/removed',
  REMOVING_SIM_FAILED = 'sims/removing_failed',

  EDIT_SIMS = 'sims/edit',
  EDITING_SIMS = 'sims/editing',
  EDITED_SIMS = 'sims/edited',
  EDITING_SIMS_FAILED = 'sims/editing_failed',
}

export function searchSims(searchOptions: TSearchOptions | string, keep?: boolean): ISearchSimsAction {
  return {
    type: SimsActionTypes.SEARCH_SIMS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingSims(): ISearchingSimsAction {
  return {
    type: SimsActionTypes.SEARCHING_SIMS,
  }
}

export function foundSims(sims: IpaginatedSims, keep?: boolean): IFoundSimsAction {
  return {
    type: SimsActionTypes.FOUND_SIMS,
    keep: keep,
    payload: {
      sims,
    },
  }
}

export function searchingSimsFailed(): ISearchingSimsFailedAction {
  return {
    type: SimsActionTypes.SEARCHING_SIMS_FAILED,
  }
}

export function loadSims(loadOptions: TSearchOptions): ILoadSimsAction {
  return {
    type: SimsActionTypes.LOAD_SIMS,
    loadOptions: loadOptions,
  }
}

export function loadingSims(): ILoadingSimsAction {
  return {
    type: SimsActionTypes.LOADING_SIMS,
  }
}

export function loadedSims(sims: IpaginatedSims): ILoadedSimsAction {
  return {
    type: SimsActionTypes.LOADED_SIMS,
    payload: {
      sims,
    },
  }
}

export function loadingSimsFailed(): ILoadingSimsFailedAction {
  return {
    type: SimsActionTypes.LOADING_SIMS_FAILED,
  }
}

export function addSims(sim: ISimsItem): IAddSimsAction {
  return {
    type: SimsActionTypes.ADD_SIMS,
    payload: sim,
  }
}

export function addingSims(): IAddingSimsAction {
  return {
    type: SimsActionTypes.ADDING_SIMS,
  }
}

export function addedSims(sims: IpaginatedSims): IAddedSimsAction {
  return {
    type: SimsActionTypes.ADDED_SIMS,
    payload: {
      sims,
    },
  }
}

export function addingSimsFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingSimsFailedAction {
  return {
    type: SimsActionTypes.ADDING_SIMS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeSim(sim: ISimsItem): IRemoveSimAction {
  return {
    type: SimsActionTypes.REMOVE_SIM,
    payload: sim,
  }
}

export function removingSim(): IRemovingSimAction {
  return {
    type: SimsActionTypes.REMOVING_SIM,
  }
}

export function removedSim(): IRemovedSimAction {
  return {
    type: SimsActionTypes.REMOVED_SIM,
  }
}

export function removingSimFailed(): IRemovingSimFailedAction {
  return {
    type: SimsActionTypes.REMOVING_SIM_FAILED,
  }
}

export function editSims(sim: ISimsItem): IEditSimsAction {
  return {
    type: SimsActionTypes.EDIT_SIMS,
    payload: sim,
  }
}

export function editingSims(): IEditingSimsAction {
  return {
    type: SimsActionTypes.EDITING_SIMS,
  }
}

export function editedSims(sims: ISimsItem): IEditedSimsAction {
  return {
    type: SimsActionTypes.EDITED_SIMS,
    payload: sims,
  }
}

export function editingSimsFailed(): IEditingSimsFailedAction {
  return {
    type: SimsActionTypes.EDITING_SIMS_FAILED,
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

export interface ISearchSimsAction {
  type: SimsActionTypes.SEARCH_SIMS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingSimsAction {
  type: SimsActionTypes.SEARCHING_SIMS
}

export interface IFoundSimsAction {
  type: SimsActionTypes.FOUND_SIMS
  keep?: boolean
  payload: {
    sims: IpaginatedSims
  }
}

export interface ISearchingSimsFailedAction {
  type: SimsActionTypes.SEARCHING_SIMS_FAILED
}

export interface ILoadSimsAction {
  type: SimsActionTypes.LOAD_SIMS
  loadOptions: TSearchOptions
}

export interface ILoadingSimsAction {
  type: SimsActionTypes.LOADING_SIMS
}

export interface ILoadedSimsAction {
  type: SimsActionTypes.LOADED_SIMS
  payload: {
    sims: IpaginatedSims
  }
}

export interface ILoadingSimsFailedAction {
  type: SimsActionTypes.LOADING_SIMS_FAILED
}

export interface IAddSimsAction {
  type: SimsActionTypes.ADD_SIMS
  payload: ISimsItem
}

export interface IAddingSimsAction {
  type: SimsActionTypes.ADDING_SIMS
}

export interface IAddedSimsAction {
  type: SimsActionTypes.ADDED_SIMS
  payload: {
    sims: IpaginatedSims
  }
}

export interface IAddingSimsFailedAction {
  type: SimsActionTypes.ADDING_SIMS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveSimAction {
  type: SimsActionTypes.REMOVE_SIM
  payload: ISimsItem
}

export interface IRemovingSimAction {
  type: SimsActionTypes.REMOVING_SIM
}

export interface IRemovedSimAction {
  type: SimsActionTypes.REMOVED_SIM
}

export interface IRemovingSimFailedAction {
  type: SimsActionTypes.REMOVING_SIM_FAILED
}

export interface IEditSimsAction {
  type: SimsActionTypes.EDIT_SIMS
  payload: ISimsItem
}

export interface IEditingSimsAction {
  type: SimsActionTypes.EDITING_SIMS
}

export interface IEditedSimsAction {
  type: SimsActionTypes.EDITED_SIMS
  payload: ISimsItem
}

export interface IEditingSimsFailedAction {
  type: SimsActionTypes.EDITING_SIMS_FAILED
}

export type SimsAction =
  | ISearchSimsAction
  | ISearchingSimsAction
  | IFoundSimsAction
  | ISearchingSimsFailedAction
  | ILoadSimsAction
  | ILoadingSimsAction
  | ILoadedSimsAction
  | ILoadingSimsFailedAction
  | IAddSimsAction
  | IAddingSimsAction
  | IAddedSimsAction
  | IAddingSimsFailedAction
  | IRemoveSimAction
  | IRemovingSimAction
  | IRemovedSimAction
  | IRemovingSimFailedAction
  | IEditSimsAction
  | IEditingSimsAction
  | IEditedSimsAction
  | IEditingSimsFailedAction
