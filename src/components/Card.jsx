import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContaxtReduser';
export default function card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let option = props.options;
    let priceOptions = Object.keys(option);
   // let foodItem = props.foodItem;
     const [qty,setqty] = useState(1);
     const [size ,setSize] = useState("");
    const handleAddcard = async()=>{
        let food = []
        for(const item of data){
        if(item.id === props.foodItem._id) {
            food = item;
            break;
        }
    }
    if(food !=[]){
       if(food.size === size){
        await dispatch({type:"UPDATE",id:props.foodItem_id,price: finalPrice,qty:qty})
       }
    
    else if(food.size !== size){
       await dispatch({type:"ADD",id:props.foodItem._id, name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
         return
    }
    return
}
              await dispatch({type:"ADD",id:props.foodItem._id, name:props.foodItem.name,price:finalPrice,qty:qty,size:size})

    //console.log(data)
    
}
    let finalPrice = qty* parseInt(option[size]);
    useEffect(() =>{
        setSize(priceRef.current.value);
    },[])
    return (
        <div className='card-container'>
        <div >

            <div className='row g-3 justify-content-center'>
              
                <div className="card mt-3" style={{
                     "width": "18rem","color":"white","maxWidth": "360px", "backgroundColor": "#ffff", borderRadius:"15px", boxShadow:"0 6px 15px rgba(0,0,0,0.1)"
                     }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height :"120px",objectFit:"fill "}}/>
                    <div className="card-body" style={{color:"#f97316"}}>
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <p className="card-text"> {props.des}</p>
                        <div className='container w-100'>
                            <select className=' h-100  m-2 bg-#f97316 color-white rounded'
                            style={{
                                border:"2px solid #f97316",
                                borderRadius:"8px",
                                backgroundColor:"#f97316",
                                color:"white",
                                fontWeight:"bold",
                                outline:"none",
                                cursor:"pointer"
                            }} 
                            onFocus={(e)=> e.target.style.boxShadow="0 0 5px #f97316"}
                            onBlur={(e)=> e.target.style.boxShadow="none"}
                            onChange={(e)=>setqty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1}</option>
                                    )
                                })
                                }
                            </select>
                            <select className=' h-100 m-2 rounded' 
                            style={{border:"2px solid #f97316",
                                borderRadius:"8px",
                                backgroundColor:"#f37106",
                                color:"white",
                                fontWeight:"bold"}}
                            ref = {priceRef} onChange={(e)=>setSize(e.target.value)}>
                                {priceOptions.map((data)=>{
                                    return <option key= {data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                RU.{finalPrice}/-
                            </div>
                        </div>
                        <button className={'btn btn-success justify-center ms-2'} style={ {
                            backgroundColor:"#f97316",
                            color:"white",
                            border:"none",
                            borderRadius:"8px",
                            fontWeight:"bold",
                            padding:"6px 14px"
                        }} onClick={handleAddcard}>
                        Add to Card</button>
                    </div>
                </div>
            </div>
               </div>
        </div>
    )
}
