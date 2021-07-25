var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cityID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  }
});

module.exports = mongoose.model('User', userSchema);
