const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ClientesSchema = mongoose.Schema(
  {
    RazonSocial: {
      type: String,
    },
    Domicilio: {
      type: String,
    },

    Grupo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grupos',
      autopopulate: true,
    },
    Abono: Boolean,
    Cedula: Boolean,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

ClientesSchema.plugin(mongoosePaginate)
ClientesSchema.index({
  RazonSocial: 'text',
  Domicilio: 'text',
  Grupo: 'text',
  Abono: 'text',
  Cedula: 'text',
})

const myModel = (module.exports = mongoose.model('Clientes', ClientesSchema, 'clientes'))
myModel.schema = ClientesSchema
