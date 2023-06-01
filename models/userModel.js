const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true ,unique :true},
    password:{type:String,required:true},
   pic: { type: String, default:"https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"},            //because link is also a string
 },{
    timestamps:true
 })

userSchema.methods.matchPassword = async function(enteredpassword){
   return await bcrypt.compare(enteredpassword,this.password)
}

userSchema.pre('save',async function(next){
   if(!this.isModified){
      next()
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password,salt);
})   // before saving

 const User = mongoose.model("User",userSchema);
 module.exports = User