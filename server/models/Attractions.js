const mongoose = require(`mongoose`)

let AttractionsSchema = new mongoose.Schema(
    {
        name: {type: String},
        addressLocality: {type: String},
        addressRegion: {type: String},
        url: {type: String},
        tags: {type: Array},
        telephone: {type: Number},
    },
    {
        collection: `Attractions`
    })

module.exports = mongoose.model(`Attractions`, AttractionsSchema)