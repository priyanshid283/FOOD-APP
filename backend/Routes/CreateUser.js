
const express = require('express')
const User = require('../models/User')
const Order = require('../models/Orders')
const mongoose = require('mongoose')

const router = express.Router()
//import {body,validationResult} from "express-validator";
const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require('jsonwebtoken');
 router.post("/CreateUser", 
    
        [
                body('email').isEmail(),
                body('name').isLength({min:5}),
                 // body('password',"incorrect password").isLength({min:5})
                body('password').isLength({min:5})

        ],
        async (req,res)=> {
                const errors = validationResult(req);
                console.log("errors",errors.isEmpty());
                console.log("SIGNUP API HIT:");
                console.log("DB NAME IN CRETEUSER",mongoose.connection.name);
                console.log("req.body",req.body);
                //return res.json({sucess :true});
                if(!errors.isEmpty()){
                        return res.status(400).json( {errors: errors.array()});  //{ sucess : false,errors: errors.array()})
                }

                const salt = await bcrypt.genSalt(10);
                const secpassword = await bcrypt.hash(req.body.password,salt);
               
        try{
             await  User.create({
                name:req.body.name,
                password:secpassword,
                email: req.body.email,
             //  location:req.body.location
        })
        console.log(" user saved with id:",User._id)
        return res.status(200).json({success:true})
        }
        catch (err){
                  console.log(err);
                  return
                  res.status(500).json({success:false});
                 // res.json({suceses:false});
        }
})


// copy
const JWT_SECRET= "yoursuperkey"
router.post('/login',  async (req, res) => {
    try{
    console.log("login hit:");
    const { email, password } = req.body;
console.log(" login body",email ,password);
const  user = await User.findOne({ email });
console.log("user from db:",user);
if (!user) {
            return res.status(400).json({ 
                success:false, 
                error: "user not found"
             });
        }
        const jwtcampare= await bcrypt.compare(password,user.password);
        // if(User.password !== password) {
        if(!jwtcampare){
            return res.status(400).json({ 
                success:false,
                 error: "wrong password" 
                });

         }
         const payload = {
            user:{
                id: user.id
            }
         }
        const authToken = jwt.sign(payload,JWT_SECRET,{expiresIn:"1h"});
      //  res.json({authToken});
    res.json({success:true , authToken});
        
  
    } catch (error) {
        console.error("login error:",error);
         res.status(500).json({success:false,error:error.message});
      //  res.json({success:false});
       // res.send("Server Error")
    }
});

// Get logged in User details, Login Required.
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") // -password will not pick password from db.
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})
// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log(lat, long)
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                console.log(res.data.results)
                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                console.log(response)
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})
/*router.post('/foodData', async (req, res) => {
    try {
        // console.log( JSON.stringify(global.foodData))
        // const userId = req.user.id;
        // await database.listCollections({name:"food_items"}).find({});
        res.send([global.foodData, global.foodCategory])
        console.log("hii foody",global.food_items);
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})*/

router.post("/foodData",(req,res)=>{
    try{
        if(!global.food_items || !global.food_category){
            return res.status(500).json({error:" DATA NOT LODED YET "})
        }
        res.json([global.food_items,global.food_category])
       
    }
    catch(err){
console.log(err.msg);
res.status(500).send("server error");
    }
})
 /*router.post('/foodData',  (req, res) => {
    console.log("food route hit");
    console.log("CHEAK",global.food_items);
    res.json(global.food_items);

     
});*/
router.post('/Order_Data', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
         console.log("Route hit myorderdata in create ✅");
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
      //  console.log("orderdata**",req.body.order_data)
        res.json({orderData:eId})
    } catch (error) {
        console.log("real error",error)
                    res.status(500).json({ error:error.message});
    }
    

});


module.exports = router;