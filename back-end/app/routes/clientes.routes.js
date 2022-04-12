module.exports = (app) => {
  const clientes = require('../controllers/clientes.controller.js')

  // Get all records
  app.get('/api/clientes', (req, res) => {
    clientes.findAll({ req, res })
  })

  // Search records
  app.get('/api/clientes/search', (req, res) => {
    clientes.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/clientes/:ID', (req, res) => {
    clientes.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/clientes', (req, res) => {
    clientes
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/clientes/:ID', (req, res) => {
    clientes
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/clientes/:ID', (req, res) => {
    clientes
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
