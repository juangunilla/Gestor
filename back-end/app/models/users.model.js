const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const UsersSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    Email: {
      type: String,
    },
    Password: String,
    ProfilePic: String,
    Role: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

UsersSchema.plugin(mongoosePaginate)
UsersSchema.index({
  FirstName: 'text',
  LastName: 'text',
  Email: 'text',
  Password: 'text',
  ProfilePic: 'text',
  Role: 'text',
})

const myModel = (module.exports = mongoose.model('Users', UsersSchema, 'users'))
myModel.schema = UsersSchema
