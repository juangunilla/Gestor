const FechasDeSimulacros = require('../models/fechasdesimulacros.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new FechaDeSimulacro
exports.create = (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (data.Cliente === 'null') data.Cliente = null
  updatedData['Cliente'] = {}
  try {
    const Clientes = require('../models/clientes.model.js')
    let ReceivedCliente = typeof data.Cliente === 'string' ? JSON.parse(data.Cliente) : data.Cliente
    Clienteinfo = Array.isArray(ReceivedCliente) ? ReceivedCliente[0] : ReceivedCliente

    if (!Clienteinfo._id) {
      const ClienteID = require('mongoose').Types.ObjectId()
      const Cliente = new Clientes({ ...Clienteinfo, _id: ClienteID })
      Cliente.save()
      updatedData['Cliente'] = ClienteID
    } else {
      updatedData['Cliente'] = Clienteinfo._id
    }
  } catch (e) {
    updatedData['Cliente'] = data.Cliente
  }

  if (data.Expediente === 'null') data.Expediente = null
  updatedData['Expediente'] = {}
  try {
    const Clientes = require('../models/clientes.model.js')
    let ReceivedExpediente = typeof data.Expediente === 'string' ? JSON.parse(data.Expediente) : data.Expediente
    Expedienteinfo = Array.isArray(ReceivedExpediente) ? ReceivedExpediente[0] : ReceivedExpediente

    if (!Expedienteinfo._id) {
      const ExpedienteID = require('mongoose').Types.ObjectId()
      const Cliente = new Clientes({ ...Expedienteinfo, _id: ExpedienteID })
      Cliente.save()
      updatedData['Expediente'] = ExpedienteID
    } else {
      updatedData['Expediente'] = Expedienteinfo._id
    }
  } catch (e) {
    updatedData['Expediente'] = data.Expediente
  }

  if (typeof data.Fecha !== 'undefined') updatedData['Fecha'] = data.Fecha

  if (typeof data.Horario !== 'undefined') updatedData['Horario'] = data.Horario

  // Create a FechaDeSimulacro
  const FechaDeSimulacro = new FechasDeSimulacros(updatedData)

  // Save FechaDeSimulacro in the database
  FechaDeSimulacro.save()
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

    if (data.Cliente === 'null') data.Cliente = null
    updatedData['Cliente'] = {}
    try {
      const Clientes = require('../models/clientes.model.js')
      let ReceivedCliente = typeof data.Cliente === 'string' ? JSON.parse(data.Cliente) : data.Cliente
      Clienteinfo = Array.isArray(ReceivedCliente) ? ReceivedCliente[0] : ReceivedCliente

      if (!Clienteinfo._id) {
        const ClienteID = require('mongoose').Types.ObjectId()
        const Cliente = new Clientes({ ...Clienteinfo, _id: ClienteID })
        Cliente.save()
        updatedData['Cliente'] = ClienteID
      } else {
        updatedData['Cliente'] = Clienteinfo._id
      }
    } catch (e) {
      updatedData['Cliente'] = data.Cliente
    }

    if (data.Expediente === 'null') data.Expediente = null
    updatedData['Expediente'] = {}
    try {
      const Clientes = require('../models/clientes.model.js')
      let ReceivedExpediente = typeof data.Expediente === 'string' ? JSON.parse(data.Expediente) : data.Expediente
      Expedienteinfo = Array.isArray(ReceivedExpediente) ? ReceivedExpediente[0] : ReceivedExpediente

      if (!Expedienteinfo._id) {
        const ExpedienteID = require('mongoose').Types.ObjectId()
        const Cliente = new Clientes({ ...Expedienteinfo, _id: ExpedienteID })
        Cliente.save()
        updatedData['Expediente'] = ExpedienteID
      } else {
        updatedData['Expediente'] = Expedienteinfo._id
      }
    } catch (e) {
      updatedData['Expediente'] = data.Expediente
    }

    if (typeof data.Fecha !== 'undefined') updatedData['Fecha'] = data.Fecha

    if (typeof data.Horario !== 'undefined') updatedData['Horario'] = data.Horario

    // Create a FechaDeSimulacro
    const FechaDeSimulacro = new FechasDeSimulacros(updatedData)

    // Save FechaDeSimulacro in the database
    FechaDeSimulacro.save()
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

// Retrieve and return all FechasDeSimulacros from the database.
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

  FechasDeSimulacros.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
        strictPopulate: false,
        model: 'Clientes',
        path: 'Cliente',
        populate: [
          { strictPopulate: false, model: 'Expedientes', path: 'Expediente' },
          { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
        ],
      }
    )

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
        strictPopulate: false,
        model: 'Clientes',
        path: 'Expediente',
        populate: [
          { strictPopulate: false, model: 'Expedientes', path: 'Expediente' },
          { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
        ],
      }
    )

    .then((fechasdesimulacros) => {
      options.res.json(paginate.paginate(fechasdesimulacros, { page: query.page, limit: query.limit || 10 }))
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
      if (FechasDeSimulacros.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (FechasDeSimulacros.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (
        FechasDeSimulacros.schema.path(query.searchField).instance === 'ObjectID' ||
        FechasDeSimulacros.schema.path(query.searchField).instance === 'Array'
      ) {
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

    FechasDeSimulacros.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'Cliente',
          populate: [
            { strictPopulate: false, model: 'Expedientes', path: 'Expediente' },
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'Expediente',
          populate: [
            { strictPopulate: false, model: 'Expedientes', path: 'Expediente' },
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
          ],
        }
      )

      .then((fechadesimulacro) => {
        resolve(paginate.paginate(fechadesimulacro, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single FechaDeSimulacro with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    FechasDeSimulacros.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'Cliente',
          populate: [
            { strictPopulate: false, model: 'Expedientes', path: 'Expediente' },
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'Expediente',
          populate: [
            { strictPopulate: false, model: 'Expedientes', path: 'Expediente' },
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
          ],
        }
      )

      .then((fechadesimulacro) => {
        if (!fechadesimulacro) {
          return options.res.status(404).send({
            message: 'FechaDeSimulacro not found with id ' + id,
          })
        }
        resolve(paginate.paginate([fechadesimulacro]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'FechaDeSimulacro not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving FechaDeSimulacro with id ' + id,
        })
      })
  })
}

// Update a fechadesimulacro identified by the ID in the request
exports.update = (options) => {
  return new Promise((resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (data.Cliente === 'null') data.Cliente = null
    updatedData['Cliente'] = {}
    try {
      const Clientes = require('../models/clientes.model.js')
      let ReceivedCliente = typeof data.Cliente === 'string' ? JSON.parse(data.Cliente) : data.Cliente
      Clienteinfo = Array.isArray(ReceivedCliente) ? ReceivedCliente[0] : ReceivedCliente

      if (!Clienteinfo._id) {
        const ClienteID = require('mongoose').Types.ObjectId()
        const Cliente = new Clientes({ ...Clienteinfo, _id: ClienteID })
        Cliente.save()
        updatedData['Cliente'] = ClienteID
      } else {
        updatedData['Cliente'] = Clienteinfo._id
      }
    } catch (e) {
      updatedData['Cliente'] = data.Cliente
    }

    if (data.Expediente === 'null') data.Expediente = null
    updatedData['Expediente'] = {}
    try {
      const Clientes = require('../models/clientes.model.js')
      let ReceivedExpediente = typeof data.Expediente === 'string' ? JSON.parse(data.Expediente) : data.Expediente
      Expedienteinfo = Array.isArray(ReceivedExpediente) ? ReceivedExpediente[0] : ReceivedExpediente

      if (!Expedienteinfo._id) {
        const ExpedienteID = require('mongoose').Types.ObjectId()
        const Cliente = new Clientes({ ...Expedienteinfo, _id: ExpedienteID })
        Cliente.save()
        updatedData['Expediente'] = ExpedienteID
      } else {
        updatedData['Expediente'] = Expedienteinfo._id
      }
    } catch (e) {
      updatedData['Expediente'] = data.Expediente
    }

    if (typeof data.Fecha !== 'undefined') updatedData['Fecha'] = data.Fecha

    if (typeof data.Horario !== 'undefined') updatedData['Horario'] = data.Horario

    // Find FechaDeSimulacro and update it with the request body
    const query = { populate: 'true' }
    FechasDeSimulacros.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'Cliente',
          populate: [
            { strictPopulate: false, model: 'Expedientes', path: 'Expediente' },
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'Expediente',
          populate: [
            { strictPopulate: false, model: 'Expedientes', path: 'Expediente' },
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
          ],
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

// Delete a fechadesimulacro with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    FechasDeSimulacros.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
