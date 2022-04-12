module.exports = (app) => {
  const expedientes = require('../controllers/expedientes.controller.js')

  // Get all records
  app.get('/api/expedientes', (req, res) => {
    expedientes.findAll({ req, res })
  })

  // Search records
  app.get('/api/expedientes/search', (req, res) => {
    expedientes.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/expedientes/:ID', (req, res) => {
    expedientes.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/expedientes', (req, res) => {
    expedientes
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/expedientes/:ID', (req, res) => {
    expedientes
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/expedientes/:ID', (req, res) => {
    expedientes
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
