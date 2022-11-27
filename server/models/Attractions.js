const mongoose = require(`mongoose`)

let AttractionsSchema = new mongoose.Schema(
    {
        name: {type: String},
        addressLocality: {type: String},
        addressRegion: {type: String},
        url: {type: String},
        tags: {type: String},
        telephone: {type: Number}

    },
    {
        collection: `attractions`
    })

module.exports = mongoose.model(`attractions`, AttractionsSchema)