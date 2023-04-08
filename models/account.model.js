const mongoose=require("mongoose");

const accountSchema = mongoose.Schema({
  name:String,
  gender:String,
  dob:String,
  email:String,
  mobile:Number,
  address:String,
  initialBalance:Number,
  adharNo:Number,
  panNo:String
});

const AccountModel=mongoose.model("account",accountSchema);

module.exports={AccountModel};