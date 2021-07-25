var mongoose = require('mongoose');

var stateSchema = new mongoose.Schema({
    state_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('State', stateSchema);
