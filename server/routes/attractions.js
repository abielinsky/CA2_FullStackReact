const router = require (`express`).Router()

const attractionsModel = require (`../models/Attractions`)


// read all records
router.get(`/Attractions`, (req, res) =>
{
    //user does not have to be logged in to see car details
    attractionsModel.find((error, data) =>
    {
        res.json(data)
    })
})


// Read one record
router.get(`/Attractions/:id`, (req, res) =>
{
    attractionsModel.findById(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})


module.exports = router





