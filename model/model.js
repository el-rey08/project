const mongoose = require('mongoose')
const date = new Date()
const staffSchema = new mongoose.Schema({
    fullname:{type:String,required:[true,'fullname is required']},
    email:{type:String,required:[true,'kindly input your email']},
    password:{type:String,required:[true,'passwor is required']},
    age:{type:Number,required:[true,'age is required']},
    MaritalStatus:{type:String,required:[true,'marital status is required']},
    address:{type:String,required:[true,'kindly provide your address']},
    gender:{type:String,required:[true,'gender is required']},
    academicQualification:{type:String,required:[true ,'this field cant be empty']},
    stateOfOrigin:{type:String,required:[true,'kindly provide your state of origin']},
    loginTime:{type:String, default: null},
    logOutTime:{type:String, default: null}
},{timestamps:true})
const StaffModel = mongoose.model('staffs',staffSchema)
module.exports = StaffModel;