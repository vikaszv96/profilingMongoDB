var express = require('express');
var router = express.Router();

router.post('/insertStatesAndCities', function (req, res) {
  //const insertStatesAndCities = async(cityName, stateName) => {
  try {
    let _city = new City({
      city_name: req.body.cityName
    })

    let _state = new State({
      state_name: req.body.stateName
    })

    _city.state = _state;
    _state.city = _city;

    _city.save(function (err, city) {
      if (err) {
        throw new Error(err);
       }
       _state.save(function (err, state) {
        if (err) {
          throw new Error(err);
         }
         res.send("Successfully Saved!")
        })
      })

  }
  catch (error) {
    throw new Error(error);
  }
})

router.get('/getCities', function (req, res) {
  State.findOne({state_name: req.body.name})
  .populate({
      path: 'city'
  })
  .exec(function (err, data) {
      if (err) throw err;
      console.log(data)
      res.send(data)
  })
})

module.exports = router;

