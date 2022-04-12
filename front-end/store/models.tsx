export interface IClientesItem {
  _id?: String
  createdAt: Date

  RazonSocial: string

  Domicilio: string
  Grupo: IGruposItem
  Abono: Boolean
  Cedula: Boolean
  // Clientes - Expedientes - RazonSocial - Clientes - RazonSocial
  Expedientes: IExpedientesItem[]
  // Clientes - FechasSimulacros - RazonSocial - Clientes - RazonSocial
  FechasSimulacros: IFechassimulacrosItem[]
}

export interface IpaginatedClientes {
  docs: IClientesItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IGruposItem {
  _id?: String
  createdAt: Date

  Nombre: string
  // Grupos - Clientes - Grupo - Grupos - Nombre
  Clientes: IClientesItem[]
}

export interface IpaginatedGrupos {
  docs: IGruposItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IExpedientesItem {
  _id?: String
  createdAt: Date
  RazonSocial: IClientesItem

  Expediente: string
  Aprobado: Date
  AvisoE: Date
  Extension: Date
  AvisoF: Date
  Final: Date
  // Expedientes - FechasSimulacros - Expediente - Expedientes - Expediente
  FechasSimulacros: IFechassimulacrosItem[]
}

export interface IpaginatedExpedientes {
  docs: IExpedientesItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IFechassimulacrosItem {
  _id?: String
  createdAt: Date
  RazonSocial: IClientesItem
  Expediente: IExpedientesItem
  Sim: ISimsItem
  Fecha: Date

  Hora: string
}

export interface IpaginatedFechassimulacros {
  docs: IFechassimulacrosItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface ISimsItem {
  _id?: String
  createdAt: Date

  Nombre: string
  // SIMs - FechasSimulacros - Sim - SIMs - Nombre
  FechasSimulacros: IFechassimulacrosItem[]
}

export interface IpaginatedSims {
  docs: ISimsItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
