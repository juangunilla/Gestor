import produce from 'immer'
import { GruposAction, GruposActionTypes } from '../actions/gruposActions'
import { ApiStatus, IGruposItem } from '../models'

export const initialGruposState: IGruposState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  grupos: [],
  foundgrupos: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function gruposReducer(state: IGruposState = initialGruposState, action: GruposAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case GruposActionTypes.SEARCH_GRUPOS:
        draft.searchString = action.searchOptions.searchString
        break
      case GruposActionTypes.SEARCHING_GRUPOS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case GruposActionTypes.SEARCHING_GRUPOS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case GruposActionTypes.FOUND_GRUPOS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundgrupos.push(...action.payload.grupos.docs) : (draft.foundgrupos = action.payload.grupos.docs)
        draft.totalDocs = action.payload.grupos.totalDocs
        break

      case GruposActionTypes.LOAD_GRUPOS:
      case GruposActionTypes.LOADING_GRUPOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundgrupos = []
        break

      case GruposActionTypes.LOADING_GRUPOS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case GruposActionTypes.LOADED_GRUPOS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.grupos = action.payload.grupos.docs
        draft.totalDocs = action.payload.grupos.totalDocs
        break

      case GruposActionTypes.ADD_GRUPOS:
      case GruposActionTypes.ADDING_GRUPOS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case GruposActionTypes.ADDING_GRUPOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case GruposActionTypes.ADDED_GRUPOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.grupos.push(action.payload.grupos.docs[0])
        if (draft.searchString) draft.foundgrupos.push(action.payload.grupos.docs[0])
        break

      case GruposActionTypes.REMOVE_GRUPO:
        draft.grupos.splice(
          draft.grupos.findIndex((grupo) => grupo._id === action.payload._id),
          1
        )
        break

      case GruposActionTypes.EDIT_GRUPOS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.grupos[draft.grupos.findIndex((grupo) => grupo._id === action.payload._id)] = action.payload
        break

      case GruposActionTypes.EDITED_GRUPOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.grupos[draft.grupos.findIndex((grupo) => grupo._id === action.payload._id)] = action.payload
        draft.foundgrupos[draft.foundgrupos.findIndex((grupo) => grupo._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IGruposState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  grupos: IGruposItem[]
  foundgrupos: IGruposItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
