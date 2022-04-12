const Expedientes = require('../models/expedientes.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Expediente
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

  if (typeof data.Expediente !== 'undefined') updatedData['Expediente'] = data.Expediente

  if (typeof data.Aprobado !== 'undefined') updatedData['Aprobado'] = data.Aprobado

  if (typeof data.AvisoE !== 'undefined') updatedData['AvisoE'] = data.AvisoE

  if (typeof data.Extension !== 'undefined') updatedData['Extension'] = data.Extension

  if (typeof data.AvisoF !== 'undefined') updatedData['AvisoF'] = data.AvisoF

  if (typeof data.Final !== 'undefined') updatedData['Final'] = data.Final

  // Create a Expediente
  const Expediente = new Expedientes(updatedData)

  // Save Expediente in the database
  Expediente.save()
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

    if (typeof data.Expediente !== 'undefined') updatedData['Expediente'] = data.Expediente

    if (typeof data.Aprobado !== 'undefined') updatedData['Aprobado'] = data.Aprobado

    if (typeof data.AvisoE !== 'undefined') updatedData['AvisoE'] = data.AvisoE

    if (typeof data.Extension !== 'undefined') updatedData['Extension'] = data.Extension

    if (typeof data.AvisoF !== 'undefined') updatedData['AvisoF'] = data.AvisoF

    if (typeof data.Final !== 'undefined') updatedData['Final'] = data.Final

    // Create a Expediente
    const Expediente = new Expedientes(updatedData)

    // Save Expediente in the database
    Expediente.save()
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

// Retrieve and return all Expedientes from the database.
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

  Expedientes.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
        strictPopulate: false,
        model: 'Clientes',
        path: 'RazonSocial',
        populate: [
          { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
          { strictPopulate: false, model: 'FechasSimulacros', path: 'FechasSimulacros' },
        ],
      }
    )

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('FechasSimulacros') > -1) && {
        strictPopulate: false,
        path: 'FechasSimulacros',
        populate: [
          { model: 'Clientes', path: 'RazonSocial' },
          { model: 'SIMs', path: 'Sim' },
        ],
      }
    )

    .then((expedientes) => {
      options.res.json(paginate.paginate(expedientes, { page: query.page, limit: query.limit || 10 }))
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
      if (Expedientes.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Expedientes.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (Expedientes.schema.path(query.searchField).instance === 'ObjectID' || Expedientes.schema.path(query.searchField).instance === 'Array') {
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

    Expedientes.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'RazonSocial',
          populate: [
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
            { strictPopulate: false, model: 'FechasSimulacros', path: 'FechasSimulacros' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('FechasSimulacros') > -1) && {
          strictPopulate: false,
          path: 'FechasSimulacros',
          populate: [
            { model: 'Clientes', path: 'RazonSocial' },
            { model: 'SIMs', path: 'Sim' },
          ],
        }
      )

      .then((expediente) => {
        resolve(paginate.paginate(expediente, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Expediente with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Expedientes.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'RazonSocial',
          populate: [
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
            { strictPopulate: false, model: 'FechasSimulacros', path: 'FechasSimulacros' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('FechasSimulacros') > -1) && {
          strictPopulate: false,
          path: 'FechasSimulacros',
          populate: [
            { model: 'Clientes', path: 'RazonSocial' },
            { model: 'SIMs', path: 'Sim' },
          ],
        }
      )

      .then((expediente) => {
        if (!expediente) {
          return options.res.status(404).send({
            message: 'Expediente not found with id ' + id,
          })
        }
        resolve(paginate.paginate([expediente]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Expediente not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Expediente with id ' + id,
        })
      })
  })
}

// Update a expediente identified by the ID in the request
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

    if (typeof data.Expediente !== 'undefined') updatedData['Expediente'] = data.Expediente

    if (typeof data.Aprobado !== 'undefined') updatedData['Aprobado'] = data.Aprobado

    if (typeof data.AvisoE !== 'undefined') updatedData['AvisoE'] = data.AvisoE

    if (typeof data.Extension !== 'undefined') updatedData['Extension'] = data.Extension

    if (typeof data.AvisoF !== 'undefined') updatedData['AvisoF'] = data.AvisoF

    if (typeof data.Final !== 'undefined') updatedData['Final'] = data.Final

    // Find Expediente and update it with the request body
    const query = { populate: 'true' }
    Expedientes.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Clientes') > -1) && {
          strictPopulate: false,
          model: 'Clientes',
          path: 'RazonSocial',
          populate: [
            { strictPopulate: false, model: 'Grupos', path: 'Grupo' },
            { strictPopulate: false, model: 'FechasSimulacros', path: 'FechasSimulacros' },
          ],
        }
      )

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('FechasSimulacros') > -1) && {
          strictPopulate: false,
          path: 'FechasSimulacros',
          populate: [
            { model: 'Clientes', path: 'RazonSocial' },
            { model: 'SIMs', path: 'Sim' },
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

// Delete a expediente with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Expedientes.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
