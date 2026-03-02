import React , { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({  email: "", password: ""});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://food-app-woct.onrender.com/api/login", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      //save the auth toke to local storage and redirect
     localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('token', json.authToken)
      navigate("/");

    }
    else {
      alert( "Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
    <div className='container'>
<section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form  onSubmit={handleSubmit}>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

         
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" name="email" id="form3Example3" value={credentials.email}  onChange={onChange} className="form-control form-control-lg"
              placeholder="Enter a valid email address" />
            <label className="form-label" htmlFor="form3Example3">Email address</label>
          </div>

         
          <div data-mdb-input-init className="form-outline mb-3">
            <input type="password" id="form3Example4" name="password" value={credentials.password} onChange={onChange} className="form-control form-control-lg"
              placeholder="Enter password" />
            <label className="form-label" htmlFor="form3Example4">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
           
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
              style={{ paddingleft: "2.5rem" ,paddingright: "2.5rem"}} >Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/Signup"
                className="link-danger"> signup</Link></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>

    </div>
    </>
  )
}
