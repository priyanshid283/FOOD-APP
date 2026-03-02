import React from 'react'
import {Link} from 'react-router-dom'
import "../App.css";
export default function 
() {
  return (
      <div>

            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

                <div className="carousel-inner " id='carousel'>
                    <div className=" carousel-caption  " style={{ zIndex: "9" }}>
                        <form className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" />
                            <button className="btn text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active" >
             <img
              src="https://as2.ftcdn.net/v2/jpg/16/82/40/57/1000_F_1682405720_n4NkXnZOE2asKj2eLr5HkJpW3p9xDQG5.jpg"
              className="d-block w-300" 
              style={{ filter: "brightness(100%)" }}
               alt="Burger"
                />
                    </div>
                    <div className="carousel-item">
                        <img
                        src ="https://t3.ftcdn.net/jpg/09/45/46/72/360_F_945467264_13rCx2nGR9wb9wrVt2g2FEFB4tE4b8sW.jpg"
              className="d-block w-300" 
              style={{ filter: "brightness(100%)" }}
               alt="pastry"
                />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/id/1146290117/photo/indian-food-tawa-pulao-rice-with-vegetables-and-spices-close-up-horizontal-top-view.jpg?s=1024x1024&w=is&k=20&c=xZLcNadKImbIAt8EZCK4xh9RCRTB1TpQKy-zCcpTs6E="
                         className="d-block w-100 " 
                         style={{ filter: "brightness(100%)" }}
                          alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


        </div>
    )
}


