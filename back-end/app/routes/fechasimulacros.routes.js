module.exports = (app) => {
  const fechasimulacros = require('../controllers/fechasimulacros.controller.js')

  // Get all records
  app.get('/api/fechasimulacros', (req, res) => {
    fechasimulacros.findAll({ req, res })
  })

  // Search records
  app.get('/api/fechasimulacros/search', (req, res) => {
    fechasimulacros.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/fechasimulacros/:ID', (req, res) => {
    fechasimulacros.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/fechasimulacros', (req, res) => {
    fechasimulacros
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/fechasimulacros/:ID', (req, res) => {
    fechasimulacros
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/fechasimulacros/:ID', (req, res) => {
    fechasimulacros
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
