const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const SIMsSchema = mongoose.Schema(
  {
    Nombre: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

SIMsSchema.virtual('FechasSimulacros', {
  ref: 'FechasSimulacros',
  localField: '_id',
  foreignField: 'Sim',
  justOne: true,
  type: '',
})

SIMsSchema.plugin(mongoosePaginate)
SIMsSchema.index({
  Nombre: 'text',
})

const myModel = (module.exports = mongoose.model('SIMs', SIMsSchema, 'sims'))
myModel.schema = SIMsSchema
