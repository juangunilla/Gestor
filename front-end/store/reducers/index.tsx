import { combineReducers } from 'redux'
import clientesReducer, { IClientesState, initialClientesState } from './clientesReducer'
import expedientesReducer, { IExpedientesState, initialExpedientesState } from './expedientesReducer'
import fechassimulacrosReducer, { IFechassimulacrosState, initialFechassimulacrosState } from './fechassimulacrosReducer'
import gruposReducer, { IGruposState, initialGruposState } from './gruposReducer'
import simsReducer, { initialSimsState, ISimsState } from './simsReducer'

export interface IState {
  clientes: IClientesState
  grupos: IGruposState
  expedientes: IExpedientesState
  fechassimulacros: IFechassimulacrosState
  sims: ISimsState
}

export const initialState: IState = {
  clientes: initialClientesState,
  grupos: initialGruposState,
  expedientes: initialExpedientesState,
  fechassimulacros: initialFechassimulacrosState,
  sims: initialSimsState,
}

export default combineReducers({
  clientes: clientesReducer,
  grupos: gruposReducer,
  expedientes: expedientesReducer,
  fechassimulacros: fechassimulacrosReducer,
  sims: simsReducer,
})
