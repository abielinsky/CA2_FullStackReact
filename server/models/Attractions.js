const mongoose = require(`mongoose`)
const {array, object} = require("mongoose/lib/utils");

let AttractionsSchema = new mongoose.Schema(
    {
        name: {type: String},
        addressLocality: {type: String},
        addressRegion: {type: String},
        url: {type: String},
        tags: {type: array},
        telephone: {type: Number},
        "@type": {type: array},
        image:{type: object}

    },
    {
        collection: `Attractions`
    })

module.exports = mongoose.model(`Attractions`, AttractionsSchema)