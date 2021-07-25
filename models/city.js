var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true
  },
  stateID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State'
  }
});

module.exports = mongoose.model('City', citySchema);
