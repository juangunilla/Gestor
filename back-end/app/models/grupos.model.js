const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const GruposSchema = mongoose.Schema(
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

GruposSchema.virtual('Clientes', {
  ref: 'Clientes',
  localField: '_id',
  foreignField: 'Grupo',
  justOne: false,
  type: '',
})

GruposSchema.plugin(mongoosePaginate)
GruposSchema.index({
  Nombre: 'text',
})

const myModel = (module.exports = mongoose.model('Grupos', GruposSchema, 'grupos'))
myModel.schema = GruposSchema
