import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import Cart from "../screens/Cart"
import Badge from 'react-bootstrap/Badge'
import Modal from '../Model';
import { useCart } from './ContaxtReduser';

export default function Navbar() {
  let data = useCart();
  const [cartView,setCartView] = useState(false);
  const naigate = useNavigate();
  const handleLogOut = ()=>{
localStorage.removeItem("token");
naigate("/")
  }
  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to ="/">GOFOOD</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to ="/">Home</Link>
        </li>
        {(localStorage.getItem("token"))? 
         <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to ="/myOrder">My_Order</Link>
        </li>
       :"" }
        </ul>
         {(!localStorage.getItem("token"))? 
      <div>
        
          <Link className="btn bg-white text-success mx-1" to ="/login">Login</Link>
        
          <Link className="btn bg-white text-success mx-1" to ="/Signup">Signup</Link>
        
      </div>
      :
      <div>
    
      <div className='btn bg-white text-success mx-2'onClick={()=>{setCartView(true)}}>  My Cart  {" "}
        <Badge pill bg = "danger"> {data.length}</Badge>
       
        </div> 
    {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
     <div className='btn bg-white text-danger mx-2'onClick={handleLogOut}>  Logout</div> 
     </div>
         }
    </div>
  </div>
</nav>
    </div>
    </>
  )
}
