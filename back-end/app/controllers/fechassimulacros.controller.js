const FechasSimulacros = require('../models/fechassimulacros.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new FechaSimulacro
exports.create = (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  updatedData['RazonSocial'] = []
  try {
    const Clientes = require('../controllers/clientes.controller.js')
    let ReceivedRazonSocial = typeof data.RazonSocial === 'string' ? JSON.parse(data.RazonSocial) : data.RazonSocial
    RazonSocialRaw = Array.isArray(ReceivedRazonSocial) ? ReceivedRazonSocial : [ReceivedRazonSocial]
    RazonSocialRaw.forEach((RazonSocialinfo) => {
      const RazonSocialFiles = {}

      if (!RazonSocialinfo._id) {
        const RazonSocialID = require('mongoose').Types.ObjectId()

        Object.keys(RazonSocialinfo).forEach((info) => {
          if (RazonSocialinfo[info] && typeof RazonSocialinfo[info] === 'object' && typeof RazonSocialinfo[info].RazonSocial === 'string') {
            RazonSocialFiles[info] = RazonSocialinfo[info]
          }
        })

        let req = options.req
        req.body = { ...RazonSocialinfo, _id: RazonSocialID }
        req.files = { ...RazonSocialFiles }
        Clientes.createAsPromise({ req, res: options.res })
        updatedData['RazonSocial'].push(RazonSocialID)
      } else {
        updatedData['RazonSocial'].push(RazonSocialinfo._id)
      }
    })
  } catch (e) {
    updatedData['RazonSocial'] = data.RazonSocial
  }

  updatedData['Expediente'] = {}
  try {
    const Expedientes = require('../models/expedientes.model.js')
    let ReceivedExpediente = typeof data.Expediente === 'string' ? JSON.parse(data.Expediente) : data.Expediente
    Expedienteinfo = Array.isArray(ReceivedExpediente) ? ReceivedExpediente[0] : ReceivedExpediente
    if (!Expedienteinfo._id) {
      const ExpedienteID = require('mongoose').Types.ObjectId()
      const Expediente = new Expedientes({ ...Expedienteinfo, _id: ExpedienteID })
      Expediente.save()
      updatedData['Expediente'] = ExpedienteID
    } else {
      updatedData['Expediente'] = Expedienteinfo._id
    }
  } catch (e) {
    updatedData['Expediente'] = data.Expediente
  }

  updatedData['Sim'] = {}
  try {
    const SIMs = require('../models/sims.model.js')
    let ReceivedSim = typeof data.Sim === 'string' ? JSON.parse(data.Sim) : data.Sim
    Siminfo = Array.isArray(ReceivedSim) ? ReceivedSim[0] : ReceivedSim
    if (!Siminfo._id) {
      const SimID = require('mongoose').Types.ObjectId()
      const SIM = new SIMs({ ...Siminfo, _id: SimID })
      SIM.save()
      updatedData['Sim'] = SimID
    } else {
      updatedData['Sim'] = Siminfo._id
    }
  } catch (e) {
    updatedData['Sim'] = data.Sim
  }

  if (typeof data.Fecha !== 'undefined') updatedData['Fecha'] = data.Fecha

  if (typeof data.Hora !== 'undefined') updatedData['Hora'] = data.Hora

  // Create a FechaSimulacro
  const FechaSimulacro = new FechasSimulacros(updatedData)

  // Save FechaSimulacro in the database
  FechaSimulacro.save()
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

    updatedData['RazonSocial'] = []
    try {
      const Clientes = require('../controllers/clientes.controller.js')
      let ReceivedRazonSocial = typeof data.RazonSocial === 'string' ? JSON.parse(data.RazonSocial) : data.RazonSocial
      RazonSocialRaw = Array.isArray(ReceivedRazonSocial) ? ReceivedRazonSocial : [ReceivedRazonSocial]
      RazonSocialRaw.forEach((RazonSocialinfo) => {
        const RazonSocialFiles = {}

        if (!RazonSocialinfo._id) {
          const RazonSocialID = require('mongoose').Types.ObjectId()

          Object.keys(RazonSocialinfo).forEach((info) => {
            if (RazonSocialinfo[info] && typeof RazonSocialinfo[info] === 'object' && typeof RazonSocialinfo[info].RazonSocial === 'string') {
              RazonSocialFiles[info] = RazonSocialinfo[info]
            }
          })

          let req = options.req
          req.body = { ...RazonSocialinfo, _id: RazonSocialID }
          req.files = { ...RazonSocialFiles }
          Clientes.createAsPromise({ req, res: options.res })
          updatedData['RazonSocial'].push(RazonSocialID)
        } else {
          updatedData['RazonSocial'].push(RazonSocialinfo._id)
        }
      })
    } catch (e) {
      updatedData['RazonSocial'] = data.RazonSocial
    }

    updatedData['Expediente'] = {}
    try {
      const Expedientes = require('../models/expedientes.model.js')
      let ReceivedExpediente = typeof data.Expediente === 'string' ? JSON.parse(data.Expediente) : data.Expediente
      Expedienteinfo = Array.isArray(ReceivedExpediente) ? ReceivedExpediente[0] : ReceivedExpediente
      if (!Expedienteinfo._id) {
        const ExpedienteID = require('mongoose').Types.ObjectId()
        const Expediente = new Expedientes({ ...Expedienteinfo, _id: ExpedienteID })
        Expediente.save()
        updatedData['Expediente'] = ExpedienteID
      } else {
        updatedData['Expediente'] = Expedienteinfo._id
      }
    } catch (e) {
      updatedData['Expediente'] = data.Expediente
    }

    updatedData['Sim'] = {}
    try {
      const SIMs = require('../models/sims.model.js')
      let ReceivedSim = typeof data.Sim === 'string' ? JSON.parse(data.Sim) : data.Sim
      Siminfo = Array.isArray(ReceivedSim) ? ReceivedSim[0] : ReceivedSim
      if (!Siminfo._id) {
        const SimID = require('mongoose').Types.ObjectId()
        const SIM = new SIMs({ ...Siminfo, _id: SimID })
        SIM.save()
        updatedData['Sim'] = SimID
      } else {
        updatedData['Sim'] = Siminfo._id
      }
    } catch (e) {
      updatedData['Sim'] = data.Sim
    }

    if (typeof data.Fecha !== 'undefined') updatedData['Fecha'] = data.Fecha

    if (typeof data.Hora !== 'undefined') updatedData['Hora'] = data.Hora

    // Create a FechaSimulacro
    const FechaSimulacro = new FechasSimulacros(updatedData)

    // Save FechaSimulacro in the database
    FechaSimulacro.save()
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

// Retrieve and return all FechasSimulacros from the database.
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

  FechasSimulacros.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
        strictPopulate: false,
        model: 'Clientes',
        path: 'RazonSocial',
        populate: [
          { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
          { strictPopulate: false, model: 'Expedientes', path: 'Expedientes' },
        ],
      }
    )

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Expedientes') > -1) && {
        strictPopulate: false,
        model: 'Expedientes',
        path: 'Expediente',
        populate: [{ strictPopulate: false, model: 'Clientes', path: 'RazonSocial' }],
      }
    )

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('SIMs') > -1) && {
        strictPopulate: false,
        model: 'SIMs',
        path: 'Sim',
      }
    )

    .then((fechassimulacros) => {
      options.res.json(paginate.paginate(fechassimulacros, { page: query.page, limit: query.limit || 10 }))
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
      if (FechasSimulacros.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (FechasSimulacros.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (
        FechasSimulacros.schema.path(query.searchField).instance === 'ObjectID' ||
        FechasSimulacros.schema.path(query.searchField).instance === 'Array'
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

    FechasSimulacros.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'RazonSocial',
          populate: [
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
            { strictPopulate: false, model: 'Expedientes', path: 'Expedientes' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Expedientes') > -1) && {
          strictPopulate: false,
          model: 'Expedientes',
          path: 'Expediente',
          populate: [{ strictPopulate: false, model: 'Clientes', path: 'RazonSocial' }],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('SIMs') > -1) && {
          strictPopulate: false,
          model: 'SIMs',
          path: 'Sim',
        }
      )

      .then((fechasimulacro) => {
        resolve(paginate.paginate(fechasimulacro, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single FechaSimulacro with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    FechasSimulacros.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'RazonSocial',
          populate: [
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
            { strictPopulate: false, model: 'Expedientes', path: 'Expedientes' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Expedientes') > -1) && {
          strictPopulate: false,
          model: 'Expedientes',
          path: 'Expediente',
          populate: [{ strictPopulate: false, model: 'Clientes', path: 'RazonSocial' }],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('SIMs') > -1) && {
          strictPopulate: false,
          model: 'SIMs',
          path: 'Sim',
        }
      )

      .then((fechasimulacro) => {
        if (!fechasimulacro) {
          return options.res.status(404).send({
            message: 'FechaSimulacro not found with id ' + id,
          })
        }
        resolve(paginate.paginate([fechasimulacro]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'FechaSimulacro not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving FechaSimulacro with id ' + id,
        })
      })
  })
}

// Update a fechasimulacro identified by the ID in the request
exports.update = (options) => {
  return new Promise((resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    updatedData['RazonSocial'] = []
    try {
      const Clientes = require('../controllers/clientes.controller.js')
      let ReceivedRazonSocial = typeof data.RazonSocial === 'string' ? JSON.parse(data.RazonSocial) : data.RazonSocial
      RazonSocialRaw = Array.isArray(ReceivedRazonSocial) ? ReceivedRazonSocial : [ReceivedRazonSocial]
      RazonSocialRaw.forEach((RazonSocialinfo) => {
        const RazonSocialFiles = {}

        if (!RazonSocialinfo._id) {
          const RazonSocialID = require('mongoose').Types.ObjectId()

          Object.keys(RazonSocialinfo).forEach((info) => {
            if (RazonSocialinfo[info] && typeof RazonSocialinfo[info] === 'object' && typeof RazonSocialinfo[info].RazonSocial === 'string') {
              RazonSocialFiles[info] = RazonSocialinfo[info]
            }
          })

          let req = options.req
          req.body = { ...RazonSocialinfo, _id: RazonSocialID }
          req.files = { ...RazonSocialFiles }
          Clientes.createAsPromise({ req, res: options.res })
          updatedData['RazonSocial'].push(RazonSocialID)
        } else {
          updatedData['RazonSocial'].push(RazonSocialinfo._id)
        }
      })
    } catch (e) {
      updatedData['RazonSocial'] = data.RazonSocial
    }

    updatedData['Expediente'] = {}
    try {
      const Expedientes = require('../models/expedientes.model.js')
      let ReceivedExpediente = typeof data.Expediente === 'string' ? JSON.parse(data.Expediente) : data.Expediente
      Expedienteinfo = Array.isArray(ReceivedExpediente) ? ReceivedExpediente[0] : ReceivedExpediente
      if (!Expedienteinfo._id) {
        const ExpedienteID = require('mongoose').Types.ObjectId()
        const Expediente = new Expedientes({ ...Expedienteinfo, _id: ExpedienteID })
        Expediente.save()
        updatedData['Expediente'] = ExpedienteID
      } else {
        updatedData['Expediente'] = Expedienteinfo._id
      }
    } catch (e) {
      updatedData['Expediente'] = data.Expediente
    }

    updatedData['Sim'] = {}
    try {
      const SIMs = require('../models/sims.model.js')
      let ReceivedSim = typeof data.Sim === 'string' ? JSON.parse(data.Sim) : data.Sim
      Siminfo = Array.isArray(ReceivedSim) ? ReceivedSim[0] : ReceivedSim
      if (!Siminfo._id) {
        const SimID = require('mongoose').Types.ObjectId()
        const SIM = new SIMs({ ...Siminfo, _id: SimID })
        SIM.save()
        updatedData['Sim'] = SimID
      } else {
        updatedData['Sim'] = Siminfo._id
      }
    } catch (e) {
      updatedData['Sim'] = data.Sim
    }

    if (typeof data.Fecha !== 'undefined') updatedData['Fecha'] = data.Fecha

    if (typeof data.Hora !== 'undefined') updatedData['Hora'] = data.Hora

    // Find FechaSimulacro and update it with the request body
    const query = { populate: 'true' }
    FechasSimulacros.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'RazonSocial',
          populate: [
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
            { strictPopulate: false, model: 'Expedientes', path: 'Expedientes' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Expedientes') > -1) && {
          strictPopulate: false,
          model: 'Expedientes',
          path: 'Expediente',
          populate: [{ strictPopulate: false, model: 'Clientes', path: 'RazonSocial' }],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('SIMs') > -1) && {
          strictPopulate: false,
          model: 'SIMs',
          path: 'Sim',
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

// Delete a fechasimulacro with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    FechasSimulacros.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
