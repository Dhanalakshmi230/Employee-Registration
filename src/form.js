// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { submitForm } from './action';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import './form.css';

// function Form({ submitForm }) {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     Firstname: '',
//     Lastname: '',
//     Email: '',
//     Address1: '',
//     Address2: '',
//     State: '',
//     Zip: '',
//     Country: 'India',
//     Dob: '',
//     Gender: 'male',
//     Phone: '',
//     Password: '',
//     ConfirmPassword: ''
//   });
//   const [errors, setErrors] = useState({
//     Firstname: '',
//     Lastname: '',
//     Email: '',
//     Address1: '',
//     Address2: '',
//     State: '',
//     Zip: '',
//     Country: '',
//     Dob: '',
//     Gender: '',
//     Phone: '',
//     Password: '',
//     ConfirmPassword: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setErrors({
//       ...errors,
//       [e.target.name]: ''
//     });
//   };

//   const handleGenderChange = (event) => {
//     setFormData({
//       ...formData,
//       Gender: event.target.value
//     });
//   };

//   const handleCountryChange = (event) => {
//     setFormData({
//       ...formData,
//       Country: event.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const requiredFields = ['Firstname', 'Lastname', 'Email', 'Address1', 'Address2', 'State', 'Zip', 'Country', 'Dob', 'Gender', 'Phone', 'Password', 'ConfirmPassword'];
//     const emptyFieldErrors = {};
//     requiredFields.forEach((field) => {
//       if (!formData[field]) {
//         emptyFieldErrors[field] = `${field} is required`;
//       }
//     });

//     if (Object.keys(emptyFieldErrors).length > 0) {
//       setErrors(emptyFieldErrors);
//       return;
//     }

//     const newErrors = {};
//     let valid = true;

//     if (!/^[a-zA-Z]+$/.test(formData.Firstname)) {
//       newErrors.Firstname = 'First name must contain only letters';
//       valid = false;
//     }

//     if (!/^[a-zA-Z]+$/.test(formData.Lastname)) {
//       newErrors.Lastname = 'Last name must contain only letters';
//       valid = false;
//     }

//     if (!/^\d{10}$/.test(formData.Phone)) {
//       newErrors.Phone = 'Phone number must be 10 digits';
//       valid = false;
//     }

//     if (!/^\d+$/.test(formData.Zip)) {
//       newErrors.Zip = 'Zip code must contain only numbers';
//       valid = false;
//     }

//     if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(formData.Email)) {
//       newErrors.Email = 'Invalid email address';
//       valid = false;
//     }

//     if (formData.Password !== formData.ConfirmPassword) {
//       newErrors.Password = 'Passwords do not match';
//       newErrors.ConfirmPassword = 'Passwords do not match';
//       valid = false;
//     }

//     if (!valid) {
//       setErrors(newErrors);
//       return;
//     }

//     submitForm(formData);

//     fetch('https://63cfb761e52f587829a384e5.mockapi.io/Form', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       navigate('/list');
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <div className="container mt-3 bg-light">
//       <form onSubmit={handleSubmit}>
//         <div className="row jumbotron box8 border border-secondary shadow">
//           <div className="col-sm-12 mx-t3 mb-4">
//             <h2 className=" text-dark">Create Employee</h2>
//           </div>
//           <div className="col-sm-4 form-group">
//             <label htmlFor="name-f">First Name</label>
//             <input type="text" className="form-control" name="Firstname" placeholder="Enter your first name." value={formData.Firstname} onChange={handleChange} />
//             {errors.Firstname && <p className="text-danger">{errors.Firstname}</p>}
//           </div>
//           <div className="col-sm-4 form-group">
//             <label htmlFor="name-l">Last Name</label>
//             <input type="text" className="form-control" name="Lastname" placeholder="Enter your last name." value={formData.Lastname} onChange={handleChange} />
//             {errors.Lastname && <p className="text-danger">{errors.Lastname}</p>}
//           </div>
//           <div className="col-sm-4 form-group">
//             <label htmlFor="email">Email</label>
//             <input type="email" className="form-control" name="Email" placeholder="Enter your email." value={formData.Email} onChange={handleChange} />
//             {errors.Email && <p className="text-danger">{errors.Email}</p>}
//           </div>
//           <div className="col-sm-4 form-group">
//             <label htmlFor="address-1">Address Line-1</label>
//             <input type="text" className="form-control" name="Address1" id="address-1" placeholder="Locality/House/Street no." value={formData.Address1} onChange={handleChange} />
//             {errors.Address1 && <p className="text-danger">{errors.Address1}</p>}
//           </div>
//           <div className="col-sm-4 form-group">
//             <label htmlFor="address-2">Address Line-2</label>
//             <input type="text" className="form-control" name="Address2" id="address-2" placeholder="Village/City Name." value={formData.Address2} onChange={handleChange} />
//             {errors.Address2 && <p className="text-danger">{errors.Address2}</p>}
//           </div>
//           <div className="col-sm-4 form-group">
//             <label htmlFor="State">State</label>
//             <input type="text" className="form-control" name="State" id="State" placeholder="Enter your state name." value={formData.State} onChange={handleChange} />
//             {errors.State && <p className="text-danger">{errors.State}</p>}
//           </div>
//           <div className="col-sm-3 form-group">
//             <label htmlFor="zip">Postal-Code</label>
//             <input type="text" className="form-control" name="Zip" id="zip" placeholder="Postal-Code." value={formData.Zip} onChange={handleChange} />
//             {errors.Zip && <p className="text-danger">{errors.Zip}</p>}
//           </div>
//           <div className="col-sm-3 form-group">
//             <label htmlFor="Country">Country</label>
//             <select className="form-control custom-select browser-default" name="Country" value={formData.Country} onChange={handleCountryChange}>
//               {/* Add all country options here */}
//               <option value="India">India</option>
//               {/* Other countries */}
//             </select>
//             {errors.Country && <p className="text-danger">{errors.Country}</p>}
//           </div>
//           <div className="col-sm-3 form-group">
//             <label htmlFor="Date">Date Of Birth</label>
//             <input type="date" name="Dob" className="form-control" id="Date" value={formData.Dob} onChange={handleChange} />
//             {errors.Dob && <p className="text-danger">{errors.Dob}</p>}
//           </div>
          // <div className="col-sm-3 form-group">
          //   <label htmlFor="sex">Gender</label>
          //   <select id="sex" className="form-control browser-default custom-select" name="Gender" value={formData.Gender} onChange={handleGenderChange}>
          //     <option value="male">Male</option>
          //     <option value="female">Female</option>
          //     <option value="unspecified">Unspecified</option>
          //   </select>
          //   {errors.Gender && <p className="text-danger">{errors.Gender}</p>}
          // </div>
//           <div className="col-sm-4 form-group">
//             <label htmlFor="phone">Phone</label>
//             <input type="text" className="form-control" name="Phone" placeholder="Enter your contact no." value={formData.Phone} onChange={handleChange} />
//             {errors.Phone && <p className="text-danger">{errors.Phone}</p>}
//           </div>
//           <div className="col-sm-4 form-group">
//             <label htmlFor="Password">Password</label>
//             <div className="input-group">
//               <input type={showPassword ? 'text' : 'password'} className="form-control" name="Password" placeholder="Enter your password." value={formData.Password} onChange={handleChange} />
//               <div className="input-group-append">
//                 <span className="input-group-text" onClick={togglePasswordVisibility}>
//                   <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                 </span>
//               </div>
//             </div>
//             {errors.Password && <p className="text-danger">{errors.Password}</p>}
//           </div>
//           <div className="col-sm-4 form-group">
//             <label htmlFor="ConfirmPassword">Confirm Password</label>
//             <div className="input-group">
//               <input type={showConfirmPassword ? 'text' : 'password'} className="form-control" name="ConfirmPassword" placeholder="Confirm your password." value={formData.ConfirmPassword} onChange={handleChange} />
//               <div className="input-group-append">
//                 <span className="input-group-text" onClick={toggleConfirmPasswordVisibility}>
//                   <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
//                 </span>
//               </div>
//             </div>
//             {errors.ConfirmPassword && <p className="text-danger">{errors.ConfirmPassword}</p>}
//           </div>
//           <div className="col-sm-12 form-group mb-0">
//             <button type="submit" className="btn btn-primary float-right">Submit</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// const mapDispatchToProps = (dispatch) => ({
//   submitForm: (formData) => dispatch(submitForm(formData))
// });

// export default connect(null, mapDispatchToProps)(Form);
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { submitForm } from './action';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './form.css';

function Form({ submitForm }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    Firstname: '',
    Lastname: '',
    Email: '',
    Address1: '',
    Address2: '',
    State: '',
    Zip: '',
    Country: 'India',
    Dob: '',
    Gender: 'male',
    Phone: '',
    Password: '',
    ConfirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    let updatedErrors = { ...errors };

    const regexPatterns = {
      Firstname: /^[A-Za-z]+$/,
      Lastname: /^[A-Za-z]+$/,
      Email: /^[\w-.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      Phone: /^\d{10}$/,
      Zip: /^\d+$/
    };

    if (regexPatterns[name] && !regexPatterns[name].test(value)) {
      updatedErrors[name] = `${name} is invalid`;
    } else {
      delete updatedErrors[name];
    }

    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(updatedErrors);
  };

  const handleGenderChange = (event) => {
    setFormData({
      ...formData,
      Gender: event.target.value
    });
  };

  const handleCountryChange = (event) => {
    setFormData({
      ...formData,
      Country: event.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requiredFields = ['Firstname', 'Lastname', 'Email', 'Address1', 'Address2', 'State', 'Zip', 'Country', 'Dob', 'Gender', 'Phone', 'Password', 'ConfirmPassword'];
    const emptyFieldErrors = {};
    
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        emptyFieldErrors[field] = `${field} is required`;
      }
    });
    
    if (Object.keys(emptyFieldErrors).length > 0) {
      setErrors(emptyFieldErrors);
      return;
    }

    if (formData.Password !== formData.ConfirmPassword) {
      setErrors({ ...errors, Password: 'Passwords do not match', ConfirmPassword: 'Passwords do not match' });
      return;
    }

    submitForm(formData);

    fetch('https://63cfb761e52f587829a384e5.mockapi.io/Form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigate('/list');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container mt-3 bg-light">
      <form onSubmit={handleSubmit}>
        <div className="row jumbotron box8 border border-secondary shadow">
          <div className="col-sm-12 mx-t3 mb-4">
            <h2 className=" text-dark">Create Employee</h2>
          </div>
          <div className="col-sm-4 form-group">
            <label htmlFor="name-f">First Name</label>
            <input
              type="text"
              className="form-control"
              name="Firstname"
              placeholder="Enter your first name."
              value={formData.Firstname}
              onChange={handleChange}
            />
            {errors.Firstname && <p className="text-danger">{errors.Firstname}</p>}
          </div>
          <div className="col-sm-4 form-group">
            <label htmlFor="name-l">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="Lastname"
              placeholder="Enter your last name."
              value={formData.Lastname}
              onChange={handleChange}
            />
            {errors.Lastname && <p className="text-danger">{errors.Lastname}</p>}
          </div>
          <div className="col-sm-4 form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="Email"
              placeholder="Enter your email."
              value={formData.Email}
              onChange={handleChange}
            />
            {errors.Email && <p className="text-danger">{errors.Email}</p>}
          </div>
          <div className="col-sm-4 form-group">
            <label htmlFor="address-1">Address Line-1</label>
            <input
              type="text"
              className="form-control"
              name="Address1"
              id="address-1"
              placeholder="Locality/House/Street no."
              value={formData.Address1}
              onChange={handleChange}
            />
            {errors.Address1 && <p className="text-danger">{errors.Address1}</p>}
          </div>
          <div className="col-sm-4 form-group">
            <label htmlFor="address-2">Address Line-2</label>
            <input
              type="text"
              className="form-control"
              name="Address2"
              id="address-2"
              placeholder="Village/City Name."
              value={formData.Address2}
              onChange={handleChange}
            />
            {errors.Address2 && <p className="text-danger">{errors.Address2}</p>}
          </div>
          <div className="col-sm-4 form-group">
            <label htmlFor="State">State</label>
            <input
              type="text"
              className="form-control"
              name="State"
              id="State"
              placeholder="Enter your state name."
              value={formData.State}
              onChange={handleChange}
            />
            {errors.State && <p className="text-danger">{errors.State}</p>}
          </div>
          <div className="col-sm-3 form-group">
            <label htmlFor="zip">Postal-Code</label>
            <input
              type="text"
              className="form-control"
              name="Zip"
              id="zip"
              placeholder="Postal-Code."
              value={formData.Zip}
              onChange={handleChange}
            />
            {errors.Zip && <p className="text-danger">{errors.Zip}</p>}
          </div>
          <div className="col-sm-3 form-group">
            <label htmlFor="Country">Country</label>
            <select className="form-control custom-select browser-default" placeholder="Select Country." name="Country" value={formData.Country} onChange={handleCountryChange}>
              <option value="India">India</option>
              {/* Add other countries as options */}
            </select>
            {errors.Country && <p className="text-danger">{errors.Country}</p>}
          </div>
          <div className="col-sm-3 form-group">
            <label htmlFor="Date">Date Of Birth</label>
            <input
              type="date"
              name="Dob"
              className="form-control"
              id="Date"
              value={formData.Dob}
              onChange={handleChange}
            />
            {errors.Dob && <p className="text-danger">{errors.Dob}</p>}
          </div>
          <div className="col-sm-3 form-group">
            <label htmlFor="sex">Gender</label>
            <select id="sex" placeholder="Select Gender" className="form-control browser-default custom-select" name="Gender" value={formData.Gender} onChange={handleGenderChange}>
            <option value="select">Select the value</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unspecified">Unspecified</option>
            </select>
            {errors.Gender && <p className="text-danger">{errors.Gender}</p>}
          </div>
          <div className="col-sm-4 form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              name="Phone"
              placeholder="Enter your contact no."
              value={formData.Phone}
              onChange={handleChange}
            />
            {errors.Phone && <p className="text-danger">{errors.Phone}</p>}
          </div>
          <div className="col-sm-4 form-group">
            <label htmlFor="Password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                name="Password"
                placeholder="Enter your password."
                value={formData.Password}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <span className="input-group-text" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
            {errors.Password && <p className="text-danger">{errors.Password}</p>}
          </div>
          <div className="col-sm-4 form-group">
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control"
                name="ConfirmPassword"
                placeholder="Confirm your password."
                value={formData.ConfirmPassword}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <span className="input-group-text" onClick={toggleConfirmPasswordVisibility}>
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
            {errors.ConfirmPassword && <p className="text-danger">{errors.ConfirmPassword}</p>}
          </div>
          <div className="col-sm-12 form-group mb-0">
            <button type="submit" className="btn btn-primary float-right">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  submitForm: (formData) => dispatch(submitForm(formData))
});

export default connect(null, mapDispatchToProps)(Form);
