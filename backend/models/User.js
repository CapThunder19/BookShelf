const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "please enter your username"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"enter yor email"],
        trim:true
    },
    password:{
        type:String,
        required:[true, 'Please enter your password'],
        minlength:[6, 'password must be atleast 6 characters ']
    }
},
{timestamps:true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
}
catch(err){
    next(err);
}

});

userSchema.methods.comparepassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
