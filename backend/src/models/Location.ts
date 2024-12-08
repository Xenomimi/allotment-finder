import { timeStamp } from "console";
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    "locationName" :{
        type: "String",
        require: true
    }
},);

const locationModel = mongoose.model('location', locationSchema);
export default locationModel;




