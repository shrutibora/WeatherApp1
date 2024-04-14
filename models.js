const mongoose = require("mongoose");

//make schema 
const citySchema = new mongoose.Schema(
    {
        cityName:{
            type: String,
            required: true,
        }
    }
)


// make model
const City = mongoose.model("City", citySchema);

// export model
module.exports = City;