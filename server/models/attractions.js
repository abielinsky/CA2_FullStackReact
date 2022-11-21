const mongoose = require(`mongoose`)

let attractionsSchema = new mongoose.Schema(
   {
        name: {type: String},
        url: {type: String},
        telephone: {type: Number},

   },
   {
       collection: `Attractions`
   })

module.exports = mongoose.model(`Attractions`, attractionsSchema)