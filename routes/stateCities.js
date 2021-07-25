var express = require('express');
var router = express.Router();

router.post('/createState', function (req, res) {
    const state = new State();
    state.state_name = req.body.stateName;
    state.save()
        .then((result) => {
             res.json({ message: 'State created!', result });
         })
         .catch((error) => {
           res.status(500).json({ error });
         });
     })
 

router.post('/insertCity', function (req, res) {
  //const insertStatesAndCities = async(cityName, stateName) => {
  try {
    const city = new City();
    city.stateID = req.body.stateID;
    city.city_name = req.body.cityName;
    city.save()
      .then((result) => {
        res.json({ message: 'City created!', result });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
  catch (error) {
    throw new Error(error);
  }
})

router.post('/getCitiesByState', function (req, res) {
  State.findOne({state_name: req.body.stateName})
  .populate('cities', 'city_name')
  .exec(function (err, data) {
      if (err) throw err;
      console.log(data)
      res.send(data.cities)
  })
})

module.exports = router;

