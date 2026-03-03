const express = require('express')
const app = express()
const port = 5000
const cors = require("cors")
const mongodb = require("./db")
mongodb ();
 
app.use(cors({
  //origine:"http://localhost:5175" 
 origine:"https://food-app-1-bkuu.onrender.com",

  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
//app.use('/api', require("./Routes/MyOrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

