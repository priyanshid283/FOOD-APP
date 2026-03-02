import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export default function signup() {
const navigate = useNavigate();
    const [credential, setcredential] = useState ({ name: "", email: "", password: "",location:"" })
   /* const handleSubmit = async (e) => {
        e.preventDefault();
       // alert("form submited !")
        console.log(JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }))
        const response = await fetch("http://localhost:5000/api/CreateUser", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }),
        });
       
        const json = await response.json();
       // console.log(json);
       if(!response.ok){
        alert(json.error|| "signup failed");
        return;
       }
    };
         //   alert("signup succesfully");
      
    */

   const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await fetch("http://localhost:5000/api/CreateUser",
        
     {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password, location: credential.location }),

    
    }
);

 if(!response.ok){
    const err =await response.text();
    console.log("server err:",err);
    return;
 }
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('token', json.authToken);
    alert("signup succesfully");
      navigate("/");
}
   /* else {
      alert("Enter Valid Credentials")
    }
  } */
  }catch(error){
    console.log("signup error:",error);
  }
   };
    const onChange = (event) => {
        setcredential({ ...credential, [event.target.name]: event.target.value });
    }
    return (
        <>
            <div className='container'>
               
                <section className="vh-100" style= {{backgroundColor: '#eee'}}>
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black" style={{borderRadius: "25px"}}>
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                            <input type="text"  name= "name" value = {credential.name} id="form3Example1c" className="form-control" onChange={onChange} />
                                                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                            <input type="email" name= "email" value = {credential.email}id="form3Example3c" className="form-control" onChange={onChange}  />
                                                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                            <input type="password" name= "password" value = {credential.password}id="form3Example4c" className="form-control" onChange={onChange} />
                                                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                        </div>
                                                    </div>

                                                     {/* <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                            <input type="password" name= "password" value = {credential.password}id="form3Example4cd" className="form-control"  onChange={onChange}/>
                                                            <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                        </div>
                                                    </div> */}

                                                    <div className="form-check d-flex justify-content-center mb-5">
                                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c"  onChange={onChange}  />
                                                        <label className="form-check-label" htmlFor="form2Example3">
                                                            I agree all statements in <a href="#!">Terms of service</a>
                                                        </label>
                                                    </div>

                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Submit</button>
                                                    </div>
                                          <Link to="/login" className='m-3 btn btn-danger'> Already you are User</Link>
                                                </form>

                                            </div>
                                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                    className="img-fluid" alt="Sample image" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
               
            </div>
        </>
    )
}
