const Clientes = require('../models/clientes.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Cliente
exports.create = (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (typeof data.RazonSocial !== 'undefined') updatedData['RazonSocial'] = data.RazonSocial

  if (typeof data.Domicilio !== 'undefined') updatedData['Domicilio'] = data.Domicilio

  if (data.Grupo === 'null') data.Grupo = null
  updatedData['Grupo'] = {}
  try {
    const Grupos = require('../models/grupos.model.js')
    let ReceivedGrupo = typeof data.Grupo === 'string' ? JSON.parse(data.Grupo) : data.Grupo
    Grupoinfo = Array.isArray(ReceivedGrupo) ? ReceivedGrupo[0] : ReceivedGrupo

    if (!Grupoinfo._id) {
      const GrupoID = require('mongoose').Types.ObjectId()
      const Grupo = new Grupos({ ...Grupoinfo, _id: GrupoID })
      Grupo.save()
      updatedData['Grupo'] = GrupoID
    } else {
      updatedData['Grupo'] = Grupoinfo._id
    }
  } catch (e) {
    updatedData['Grupo'] = data.Grupo
  }

  if (typeof data.Abono !== 'undefined') updatedData['Abono'] = data.Abono

  if (typeof data.Cedula !== 'undefined') updatedData['Cedula'] = data.Cedula

  // Create a Cliente
  const Cliente = new Clientes(updatedData)

  // Save Cliente in the database
  Cliente.save()
    .then((data) => {
      exports.findOne({ ID: data._id, res: options.res })
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while saving the record.',
      })
    })
}

exports.createAsPromise = (options) => {
  return new Promise((resolve, reject) => {
    const data = options.req ? options.req.body : options.data
    const updatedData = {}
    if (data._id) updatedData._id = data._id

    if (typeof data.RazonSocial !== 'undefined') updatedData['RazonSocial'] = data.RazonSocial

    if (typeof data.Domicilio !== 'undefined') updatedData['Domicilio'] = data.Domicilio

    if (data.Grupo === 'null') data.Grupo = null
    updatedData['Grupo'] = {}
    try {
      const Grupos = require('../models/grupos.model.js')
      let ReceivedGrupo = typeof data.Grupo === 'string' ? JSON.parse(data.Grupo) : data.Grupo
      Grupoinfo = Array.isArray(ReceivedGrupo) ? ReceivedGrupo[0] : ReceivedGrupo

      if (!Grupoinfo._id) {
        const GrupoID = require('mongoose').Types.ObjectId()
        const Grupo = new Grupos({ ...Grupoinfo, _id: GrupoID })
        Grupo.save()
        updatedData['Grupo'] = GrupoID
      } else {
        updatedData['Grupo'] = Grupoinfo._id
      }
    } catch (e) {
      updatedData['Grupo'] = data.Grupo
    }

    if (typeof data.Abono !== 'undefined') updatedData['Abono'] = data.Abono

    if (typeof data.Cedula !== 'undefined') updatedData['Cedula'] = data.Cedula

    // Create a Cliente
    const Cliente = new Clientes(updatedData)

    // Save Cliente in the database
    Cliente.save()
      .then((result) => {
        if (options.skipfind) {
          resolve(result)
        } else {
          exports.findOne({ ID: result._id, res: options.res }).then((result) => {
            resolve(result)
          })
        }
      })
      .catch((err) => {
        reject(errors.prepareError(err))
      })
  })
}

// Retrieve and return all Clientes from the database.
exports.findAll = (options) => {
  const query = options.query ? options.query : options.req.query
  if (typeof query.populate === 'undefined') query.populate = 'true'
  const data = options.req ? options.req.body : options.data
  if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

  const findString = {}
  if (query.fixedSearch) {
    query.fixedSearch = JSON.parse(query.fixedSearch)
    findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
  }

  Clientes.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Expedientes') > -1) && {
        strictPopulate: false,
        path: 'Expedientes',
        populate: [{ model: 'FechasSimulacros', path: 'FechasSimulacros' }],
      }
    )
    .populate(
      (query.populate === 'true' || query.populate?.indexOf('FechasSimulacros') > -1) && {
        strictPopulate: false,
        path: 'FechasSimulacros',
        populate: [
          { model: 'Expedientes', path: 'Expediente' },
          { model: 'SIMs', path: 'Sim' },
        ],
      }
    )

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Grupos') > -1) && {
        strictPopulate: false,
        model: 'Grupos',
        path: 'Grupo',
      }
    )

    .then((clientes) => {
      options.res.json(paginate.paginate(clientes, { page: query.page, limit: query.limit || 10 }))
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      })
    })
}

exports.find = (options) => {
  return new Promise((resolve, reject) => {
    const query = options.query ? options.query : options.req.query
    const data = options.req ? options.req.body : options.data
    let findString = query.searchString ? { $text: { $search: query.searchString } } : {}
    if (query.searchField) {
      if (Clientes.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Clientes.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (Clientes.schema.path(query.searchField).instance === 'ObjectID' || Clientes.schema.path(query.searchField).instance === 'Array') {
        findString = { [query.searchField]: require('mongoose').Types.ObjectId(query.searchString) }
      }
    } else if (query.filters) {
      query.filters.forEach((filter) => {
        const parsed = typeof filter === 'string' ? JSON.parse(filter) : filter
        findString[parsed.field] = parsed.value
      })
    }
    if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

    if (query.fixedSearch) {
      query.fixedSearch = JSON.parse(query.fixedSearch)
      findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
    }

    Clientes.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Expedientes') > -1) && {
          strictPopulate: false,
          path: 'Expedientes',
          populate: [{ model: 'FechasSimulacros', path: 'FechasSimulacros' }],
        }
      )
      .populate(
        (query.populate === 'true' || query.populate?.indexOf('FechasSimulacros') > -1) && {
          strictPopulate: false,
          path: 'FechasSimulacros',
          populate: [
            { model: 'Expedientes', path: 'Expediente' },
            { model: 'SIMs', path: 'Sim' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Grupos') > -1) && {
          strictPopulate: false,
          model: 'Grupos',
          path: 'Grupo',
        }
      )

      .then((cliente) => {
        resolve(paginate.paginate(cliente, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Cliente with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Clientes.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Expedientes') > -1) && {
          strictPopulate: false,
          path: 'Expedientes',
          populate: [{ model: 'FechasSimulacros', path: 'FechasSimulacros' }],
        }
      )
      .populate(
        (query.populate === 'true' || query.populate?.indexOf('FechasSimulacros') > -1) && {
          strictPopulate: false,
          path: 'FechasSimulacros',
          populate: [
            { model: 'Expedientes', path: 'Expediente' },
            { model: 'SIMs', path: 'Sim' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Grupos') > -1) && {
          strictPopulate: false,
          model: 'Grupos',
          path: 'Grupo',
        }
      )

      .then((cliente) => {
        if (!cliente) {
          return options.res.status(404).send({
            message: 'Cliente not found with id ' + id,
          })
        }
        resolve(paginate.paginate([cliente]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Cliente not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Cliente with id ' + id,
        })
      })
  })
}

// Update a cliente identified by the ID in the request
exports.update = (options) => {
  return new Promise((resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.RazonSocial !== 'undefined') updatedData['RazonSocial'] = data.RazonSocial

    if (typeof data.Domicilio !== 'undefined') updatedData['Domicilio'] = data.Domicilio

    if (data.Grupo === 'null') data.Grupo = null
    updatedData['Grupo'] = {}
    try {
      const Grupos = require('../models/grupos.model.js')
      let ReceivedGrupo = typeof data.Grupo === 'string' ? JSON.parse(data.Grupo) : data.Grupo
      Grupoinfo = Array.isArray(ReceivedGrupo) ? ReceivedGrupo[0] : ReceivedGrupo

      if (!Grupoinfo._id) {
        const GrupoID = require('mongoose').Types.ObjectId()
        const Grupo = new Grupos({ ...Grupoinfo, _id: GrupoID })
        Grupo.save()
        updatedData['Grupo'] = GrupoID
      } else {
        updatedData['Grupo'] = Grupoinfo._id
      }
    } catch (e) {
      updatedData['Grupo'] = data.Grupo
    }

    if (typeof data.Abono !== 'undefined') updatedData['Abono'] = data.Abono

    if (typeof data.Cedula !== 'undefined') updatedData['Cedula'] = data.Cedula

    // Find Cliente and update it with the request body
    const query = { populate: 'true' }
    Clientes.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Expedientes') > -1) && {
          strictPopulate: false,
          path: 'Expedientes',
          populate: [{ model: 'FechasSimulacros', path: 'FechasSimulacros' }],
        }
      )
      .populate(
        (query.populate === 'true' || query.populate?.indexOf('FechasSimulacros') > -1) && {
          strictPopulate: false,
          path: 'FechasSimulacros',
          populate: [
            { model: 'Expedientes', path: 'Expediente' },
            { model: 'SIMs', path: 'Sim' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Grupos') > -1) && {
          strictPopulate: false,
          model: 'Grupos',
          path: 'Grupo',
        }
      )

      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a cliente with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Clientes.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
