const mongoose = require(`mongoose`)

let AttractionsSchema = new mongoose.Schema(
    {
        name: {type: String},
        address: { addressLocality: {type: String}, addressRegion: {type: String}},
        url: {type: String},
        tags: {type: Array},
        telephone: {type: String},
        geo: {longitude: {type: Number}, latitude: {type: Number}},
        "@type": {type: Object},
    },
    {
        collection: `Attractions`
    })

attractions = mongoose.model(`Attractions`, AttractionsSchema)

module.exports = attractions