import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
//import Orders from "../../backend/models/Orders";

export default function MyOrder() {

  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch(
        "https://food-app-woct.onrender.com/api/myOrderData",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem("userEmail"),
          }),
        }
      );

      const data = await response.json();
      //console.log("Full API Data:", data);

      
      let orders = [];
      if (data?.orderData?.Order_data) {
       orders = data.orderData.Order_data.flat()
       
      
      }   
      // 🔥 Remove null or invalid items
      orders = orders.filter(item => item && item.name);
  
      setOrderData(orders);

    } catch (error) {
      console.log("Error:", error);
      setOrderData([]);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div className="container mt-5">
       <Navbar />

      <div className="row" >

        {orderData.length > 0 ? (

          orderData.map((item, index) => (
            <div key={index} className="col-md-3">
              <div className="card mt-3 shadow">

                <div className="card-body" style={{ border:"2px solid #f97316",
                                borderRadius:"8px",
                                backgroundColor:"#d18343",
                                color:"white"}}>
                  <h5>{item.name}</h5>
                  <p>Qty: {item.qty}</p>
                  <p>Size: {item.size}</p>
                  <p>₹{item.price}</p>
                </div>

              </div>
            </div>

          ))

        ) : (
            <div className="no-data">
  <h2>🛒 Oops! No Orders Yet</h2>
  <p>✨ Looks like you haven t placed any order yet.</p>
  <p>🍔 Start exploring and treat yourself today!</p>
</div>
          //  <div className="mycard">
         // <h4 className="text-center mt-5">No Orders Found</h4>
         // </div>
        )}

      </div>
        <Footer />
    </div>
    
  );
}
