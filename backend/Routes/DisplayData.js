const express = require('express');
const router = express.Router();
 console.log(" disply route hit");

router.post('/foodData',  (req, res) => {
    console.log("food route hit");
    console.log("CHEAK",global.food_items);
    res.json(global.food_items);

     
});
module.exports = router;