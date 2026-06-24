import mongoose from "mongoose";

const Authschema = new mongoose.Schema({
email:{
    type:String,
    required:true,
    unique:true

},
password:{
    type:String,
    required:true

},
dob:{
    type:Date,
    required:true

}

}, { timestamps: true });
export default mongoose.model("User",Authschema);
