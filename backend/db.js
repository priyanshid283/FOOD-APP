const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://priyanshi:gori123@cluster0.gdisjth.mongodb.net/gofoodmern?appName=Cluster0'

const mongodb = async ()=>{
 try {
    await mongoose.connect(mongoURI ) ;
   
        console.log("connected");
        const db = mongoose.connection.db;
        const fech_data = db.collection('food_items');
        const data = await fech_data.find({}).toArray()
         global.food_items = data;
         const foodCategory = await db.collection("food_category").find({}).toArray();
         global.food_category = foodCategory;
         console.log("food item loeded:",data.length);
         console.log("food category loeded:",foodCategory.length);
       
        //console.log("data = ", global.food_items);
       //  console.log("data = ", global.food_category);
 }
 catch(err){
   console.log(' db error = ', err.message);
 }
   
}

module.exports= mongodb ;