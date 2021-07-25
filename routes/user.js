var express = require('express');
var router = express.Router();

router.post('/createUser', function (req, res) {
    const user = new User();
    user.name = req.body.name;
    user.cityID = req.body.cityID;
    user.save()
        .then((result) => {
            res.json({ message: 'User created!', result });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
})

router.post('/getUserByID', function (req, res) {
    User.findOne({ _id: req.body.id })
        .populate('cityID')
        .exec(function (err, cities) {
            if (err) throw err;

            City.findOne({ _id: cities.cityID._id })
                .populate('stateID')
                .exec(function (err, states) {
                    if (err) throw err;
                    console.log(cities)
                    console.log(states)
                    res.send({ "name": cities.name, "city": cities.cityID.city_name, "state": states.stateID.state_name })
                })
        })
})

router.route('/getUserByCity').post(async (req, res) => {
    try {
        let cities = await City.findOne({ city_name: req.body.cityName })
        let users = await User.find(
            { 'cityID': { $in: cities._id } }
        );
        res.send(users)
    }
    catch (e) {
        throw new Exception(e)
    }
})

router.route('/getUserByState').post(async (req, res) => {
    try {
        let state = await State.findOne({ state_name: req.body.stateName })
        let cities = await City.find(
            { 'stateID': { $in: state._id } }
        ).select('_id');
            
        let users = await User.find(
            {'cityID' : {$in : cities}}
        ).select('name');
       
        res.send(users)
    }
    catch (e) {
        throw new Exception(e)
    }
})

module.exports = router;
