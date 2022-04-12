module.exports = (app) => {
  const fechassimulacros = require('../controllers/fechassimulacros.controller.js')

  // Get all records
  app.get('/api/fechassimulacros', (req, res) => {
    fechassimulacros.findAll({ req, res })
  })

  // Search records
  app.get('/api/fechassimulacros/search', (req, res) => {
    fechassimulacros.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/fechassimulacros/:ID', (req, res) => {
    fechassimulacros.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/fechassimulacros', (req, res) => {
    fechassimulacros
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/fechassimulacros/:ID', (req, res) => {
    fechassimulacros
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/fechassimulacros/:ID', (req, res) => {
    fechassimulacros
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
