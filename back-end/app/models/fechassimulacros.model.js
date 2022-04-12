const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const FechasSimulacrosSchema = mongoose.Schema(
  {
    RazonSocial: [mongoose.Schema.Types.ObjectId],
    Expediente: mongoose.Schema.Types.ObjectId,
    Sim: mongoose.Schema.Types.ObjectId,
    Fecha: Date,
    Hora: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

FechasSimulacrosSchema.plugin(mongoosePaginate)
FechasSimulacrosSchema.index({
  RazonSocial: 'text',
  Expediente: 'text',
  Sim: 'text',
  Fecha: 'text',
  Hora: 'text',
})

const myModel = (module.exports = mongoose.model('FechasSimulacros', FechasSimulacrosSchema, 'fechassimulacros'))
myModel.schema = FechasSimulacrosSchema
