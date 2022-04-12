module.exports = (app) => {
  const sims = require('../controllers/sims.controller.js')

  // Get all records
  app.get('/api/sims', (req, res) => {
    sims.findAll({ req, res })
  })

  // Search records
  app.get('/api/sims/search', (req, res) => {
    sims.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/sims/:ID', (req, res) => {
    sims.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/sims', (req, res) => {
    sims
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/sims/:ID', (req, res) => {
    sims
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/sims/:ID', (req, res) => {
    sims
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
