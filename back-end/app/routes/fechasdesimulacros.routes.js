module.exports = (app) => {
  const fechasdesimulacros = require('../controllers/fechasdesimulacros.controller.js')

  // Get all records
  app.get('/api/fechasdesimulacros', (req, res) => {
    fechasdesimulacros.findAll({ req, res })
  })

  // Search records
  app.get('/api/fechasdesimulacros/search', (req, res) => {
    fechasdesimulacros.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/fechasdesimulacros/:ID', (req, res) => {
    fechasdesimulacros.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/fechasdesimulacros', (req, res) => {
    fechasdesimulacros
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/fechasdesimulacros/:ID', (req, res) => {
    fechasdesimulacros
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/fechasdesimulacros/:ID', (req, res) => {
    fechasdesimulacros
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
