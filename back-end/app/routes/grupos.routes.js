module.exports = (app) => {
  const grupos = require('../controllers/grupos.controller.js')

  // Get all records
  app.get('/api/grupos', (req, res) => {
    grupos.findAll({ req, res })
  })

  // Search records
  app.get('/api/grupos/search', (req, res) => {
    grupos.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/grupos/:ID', (req, res) => {
    grupos.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/grupos', (req, res) => {
    grupos
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/grupos/:ID', (req, res) => {
    grupos
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/grupos/:ID', (req, res) => {
    grupos
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
