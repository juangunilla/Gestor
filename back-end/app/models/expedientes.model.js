const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ExpedientesSchema = mongoose.Schema(
  {
    RazonSocial: [mongoose.Schema.Types.ObjectId],
    Expediente: {
      type: String,
    },
    Aprobado: Date,
    AvisoE: Date,
    Extension: Date,
    AvisoF: Date,
    Final: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

ExpedientesSchema.virtual('FechasSimulacros', {
  ref: 'FechasSimulacros',
  localField: '_id',
  foreignField: 'Expediente',
  justOne: true,
  type: '',
})

ExpedientesSchema.plugin(mongoosePaginate)
ExpedientesSchema.index({
  RazonSocial: 'text',
  Expediente: 'text',
  Aprobado: 'text',
  AvisoE: 'text',
  Extension: 'text',
  AvisoF: 'text',
  Final: 'text',
})

const myModel = (module.exports = mongoose.model('Expedientes', ExpedientesSchema, 'expedientes'))
myModel.schema = ExpedientesSchema
