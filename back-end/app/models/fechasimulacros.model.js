const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const FechaSimulacrosSchema = mongoose.Schema(
  {
    Expediente: mongoose.Schema.Types.ObjectId,
    Fecha: Date,
    Horario: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

FechaSimulacrosSchema.plugin(mongoosePaginate)
FechaSimulacrosSchema.index({
  Expediente: 'text',
  Fecha: 'text',
  Horario: 'text',
})

const myModel = (module.exports = mongoose.model('FechaSimulacros', FechaSimulacrosSchema, 'fechasimulacros'))
myModel.schema = FechaSimulacrosSchema
