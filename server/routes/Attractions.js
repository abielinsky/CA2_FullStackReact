const router = require(`express`).Router()

const AttractionsModel = require(`../models/Attractions`)


// read all records
router.get(`/Attractions`, (req, res) =>
{
    //user does not have to be logged in to see car details
    AttractionsModel.find((error, data) =>
    {
        res.json(data);
    })
})


// Read one record
router.get(`/Attractions/:id`, (req, res) =>
{
    AttractionsModel.findById(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})

router.post(`/Attractions`, (req, res) =>
{
    AttractionsModel.create(req.body, (error, data) =>
    {
        res.json(data)
    })
})

router.put(`/Attractions/:id`, (req, res) =>
{
    AttractionsModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, data) =>
    {
        res.json(data)
    })
})

router.delete(`/Attractions/:id`, (req, res) =>
{
    AttractionsModel.findByIdAndDelete(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})

router.delete(`/ResetAttractions`, (req, res) =>
{
    AttractionsModel.deleteMany((error, data) =>
    {
        res.json(data)
    })
})

module.exports = router