const mongoose = require(`mongoose`)
const {array} = require("mongoose/lib/utils");

let AttractionsSchema = new mongoose.Schema(
    {
        name: {type: String},
        addressLocality: {type: String},
        addressRegion: {type: String},
        url: {type: String},
        tags: {type: array},
        telephone: {type: Number}

    },
    {
        collection: `Attractions`
    })

module.exports = mongoose.model(`Attractions`, AttractionsSchema)