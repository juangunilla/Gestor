const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const FechasDeSimulacrosSchema = mongoose.Schema(
  {
    Cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clientes',
      autopopulate: true,
    },
    Expediente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clientes',
      autopopulate: true,
    },
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

FechasDeSimulacrosSchema.plugin(mongoosePaginate)
FechasDeSimulacrosSchema.index({
  Cliente: 'text',
  Expediente: 'text',
  Fecha: 'text',
  Horario: 'text',
})

const myModel = (module.exports = mongoose.model('FechasDeSimulacros', FechasDeSimulacrosSchema, 'fechasdesimulacros'))
myModel.schema = FechasDeSimulacrosSchema
