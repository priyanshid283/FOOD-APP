const mongoose = require('mongoose')
//const  {schema} = mongoose.Schema;
const UserSchema = new mongoose.Schema ({
    name :{
        type: String,
        require : true
    },
    location:{
        type : String,
        require :true
    },
    city :{
        type : String,
        require :true
    },

     email:{
        type : String,
        require : true
    },
    password:{
         type : String,
        require : true
    },
     date:{
        type : String,
       default : Date.now()
    }
})
 
module.exports = mongoose.model('User', UserSchema)