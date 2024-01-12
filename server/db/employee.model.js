// https://mongoosejs.com/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: {
    firstname: String,
    middlename: String,
    lastname: String,
  },
  level: String,
  position: String,
  presence: {
    date: {
      type: Date,
      default: Date.now,
    },
    present: {
      type: Boolean,
      default: false,
    },
  },
  equipment: String,
  favouriteBrand: {
    type: Schema.Types.ObjectId,
    ref: 'FavouriteBrand',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
