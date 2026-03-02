const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')
router.post('/OrderData',async (req,res)=>{
   // console.log("router hit");
    let data = req.body.Order_data
   // console.log("order data",data);
     data.splice(0,0,{Order_date:req.body.Order_date})
    let eId = await Order.findOne({'email':req.body.email})
    console.log(eId)
    if(eId === null){
        try{
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        }
        catch(error){
            console.log(error.message)
            res.send("server Error",error.message)
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email : req.body.email},
                {
                    $push:{Order_data:data}}).then(()=>{
                        res.json({success:true})
                    })
                   
           }
                catch(err)
                {
                    console.log("real error",err)
                    res.status(500).json({ err:err.message});
                }
            }
      
})
// 
router.post("/myOrderData", async (req, res) => {
  try {
    console.log("Route hit ✅");
    console.log("Email received:", req.body.email);

    const myData = await Order.findOne({ email: req.body.email });

    console.log("Data from DB:", myData);

    if (!myData) {
      return res.status(404).json({ message: "No Orders Found" });
    }

    res.json({ orderData: myData });

  } catch (error) {
    console.log("REAL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;