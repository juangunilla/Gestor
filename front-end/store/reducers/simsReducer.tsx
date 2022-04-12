import produce from 'immer'
import { SimsAction, SimsActionTypes } from '../actions/simsActions'
import { ApiStatus, ISimsItem } from '../models'

export const initialSimsState: ISimsState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  sims: [],
  foundsims: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function simsReducer(state: ISimsState = initialSimsState, action: SimsAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SimsActionTypes.SEARCH_SIMS:
        draft.searchString = action.searchOptions.searchString
        break
      case SimsActionTypes.SEARCHING_SIMS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case SimsActionTypes.SEARCHING_SIMS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case SimsActionTypes.FOUND_SIMS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundsims.push(...action.payload.sims.docs) : (draft.foundsims = action.payload.sims.docs)
        draft.totalDocs = action.payload.sims.totalDocs
        break

      case SimsActionTypes.LOAD_SIMS:
      case SimsActionTypes.LOADING_SIMS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundsims = []
        break

      case SimsActionTypes.LOADING_SIMS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case SimsActionTypes.LOADED_SIMS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.sims = action.payload.sims.docs
        draft.totalDocs = action.payload.sims.totalDocs
        break

      case SimsActionTypes.ADD_SIMS:
      case SimsActionTypes.ADDING_SIMS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case SimsActionTypes.ADDING_SIMS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case SimsActionTypes.ADDED_SIMS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.sims.push(action.payload.sims.docs[0])
        if (draft.searchString) draft.foundsims.push(action.payload.sims.docs[0])
        break

      case SimsActionTypes.REMOVE_SIM:
        draft.sims.splice(
          draft.sims.findIndex((sim) => sim._id === action.payload._id),
          1
        )
        break

      case SimsActionTypes.EDIT_SIMS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.sims[draft.sims.findIndex((sim) => sim._id === action.payload._id)] = action.payload
        break

      case SimsActionTypes.EDITED_SIMS:
        draft.addingStatus = ApiStatus.LOADED
        draft.sims[draft.sims.findIndex((sim) => sim._id === action.payload._id)] = action.payload
        draft.foundsims[draft.foundsims.findIndex((sim) => sim._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface ISimsState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  sims: ISimsItem[]
  foundsims: ISimsItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
