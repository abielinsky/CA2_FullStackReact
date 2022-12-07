const mongoose = require(`mongoose`)

let AttractionsSchema = new mongoose.Schema(
    {
        name: {type: String},
        address: { addressLocality: {type: String}, addressRegion: {type: String}},
        url: {type: String},
        tags: {type: Array},
        telephone: {type: String},
        geo: {latitude: {type: Number}, longitude: {type: Number}},

    },
    {
        collection: `Attractions`
    })

attractions = mongoose.model(`Attractions`, AttractionsSchema)

module.exports = attractions