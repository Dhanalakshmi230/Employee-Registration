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
    Country: '',
    DateOfBirth: '',
    Gender: '',
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
      Zip: /^\d{6}(-\d{4})?$/
    };

    if (regexPatterns[name] && !regexPatterns[name].test(value)) {
      updatedErrors[name] = `${name} is invalid`;
    } else {
      delete updatedErrors[name];
    }

    if (name === 'Phone' ) {
      if (!/^\d*$/.test(value)) {
        return; // Prevent updating state if the value contains non-numeric characters
      }
    }
    if (name === 'Zip' && !/^[\d-]*$/.test(value)) {
      // Allows only numbers and hyphen for Zip, but doesn't check complete pattern yet
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(updatedErrors);
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, Gender: value });

    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, Gender: '' }));
    }
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, Country: value });

    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, Country: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    const requiredFields = ['Firstname', 'Lastname', 'Email', 'Address1', 'Address2', 'State', 'Zip', 'Country', 'DateOfBirth', 'Gender', 'Phone', 'Password', 'ConfirmPassword'];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    // Additional validation for Firstname and Lastname to prevent numbers
    if (/\d/.test(formData.Firstname)) {
      newErrors.Firstname = 'Firstname should not contain numbers';
    }
    if (/\d/.test(formData.Lastname)) {
      newErrors.Lastname = 'Lastname should not contain numbers';
    }
    
    if (formData.Password !== formData.ConfirmPassword) {
      newErrors.Password = 'Passwords do not match';
      newErrors.ConfirmPassword = 'Passwords do not match';
    }
    if (!formData.Gender) {
      newErrors.Gender = 'Please select a gender';
    }
    if (!formData.Country) {
      newErrors.Country = 'Please select a country';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    submitForm(formData);
    resetForm();
   
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
      navigate('/Employee/View');
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

  const resetForm = () => {
    setFormData({
      Firstname: '',
      Lastname: '',
      Email: '',
      Address1: '',
      Address2: '',
      State: '',
      Zip: '',
      Country: '',
      DateOfBirth: '',
      Gender: '',
      Phone: '',
      Password: '',
      ConfirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="container mt-3 bg-light">
      <form onSubmit={handleSubmit}>
        <div className="row jumbotron box8 border border-secondary shadow">
          <div className="col-sm-12 mx-t3 mb-4">
            <h2 className="text-dark">Create Employee</h2>
          </div>
          <div className="col-sm-4 form-group mb-4">
            <label htmlFor="name-f">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.Firstname ? 'input-error' : ''}`}
              name="Firstname"
              placeholder="Enter your first name."
              value={formData.Firstname}
              onChange={handleChange}
            />
            {errors.Firstname && <p className="text-danger">{errors.Firstname}</p>}
          </div>
          <div className="col-sm-4 form-group mb-4">
            <label htmlFor="name-l">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.Lastname ? 'input-error' : ''}`}
              name="Lastname"
              placeholder="Enter your last name."
              value={formData.Lastname}
              onChange={handleChange}
            />
            {errors.Lastname && <p className="text-danger">{errors.Lastname}</p>}
          </div>
          <div className="col-sm-4 form-group mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.Email ? 'input-error' : ''}`}
              name="Email"
              placeholder="Enter your email."
              value={formData.Email}
              onChange={handleChange}
            />
            {errors.Email && <p className="text-danger">{errors.Email}</p>}
          </div>
          <div className="col-sm-4 form-group mb-4">
            <label htmlFor="address-1">Address Line-1</label>
            <input
              type="text"
              className={`form-control ${errors.Address1 ? 'input-error' : ''}`}
              name="Address1"
              id="address-1"
              placeholder="Locality/House/Street no."
              value={formData.Address1}
              onChange={handleChange}
            />
            {errors.Address1 && <p className="text-danger">{errors.Address1}</p>}
          </div>
          <div className="col-sm-4 form-group mb-4">
            <label htmlFor="address-2">Address Line-2</label>
            <input
              type="text"
              className={`form-control ${errors.Address2 ? 'input-error' : ''}`}
              name="Address2"
              id="address-2"
              placeholder="Village/City Name."
              value={formData.Address2}
              onChange={handleChange}
            />
            {errors.Address2 && <p className="text-danger">{errors.Address2}</p>}
          </div>
          <div className="col-sm-4 form-group mb-4">
            <label htmlFor="State">State</label>
            <input
              type="text"
              className={`form-control ${errors.State ? 'input-error' : ''}`}
              name="State"
              id="State"
              placeholder="Enter your state name."
              value={formData.State}
              onChange={handleChange}
            />
            {errors.State && <p className="text-danger">{errors.State}</p>}
          </div>
          <div className="col-sm-3 form-group mb-4">
            <label htmlFor="zip">Postal-Code</label>
            <input
              type="text"
              className={`form-control ${errors.Zip ? 'input-error' : ''}`}
              name="Zip"
              id="zip"
              placeholder="Postal-Code."
              value={formData.Zip}
              onChange={handleChange}
            />
            {errors.Zip && <p className="text-danger">{errors.Zip}</p>}
          </div>
          <div className="col-sm-3 form-group mb-4">
            <label htmlFor="Country">Country</label>
            <select
              className={`form-control custom-select browser-default ${errors.Country ? 'input-error' : ''}`}
              placeholder="Select Country"
              name="Country"
              value={formData.Country}
              onChange={handleCountryChange}
            >
              <option value="" readOnly>Select Country</option>
              <option value="India">India</option>
              {/* Add other countries as options */}
            </select>
            {errors.Country && <p className="text-danger">{errors.Country}</p>}
          </div>
          <div className="col-sm-3 form-group mb-4">
            <label htmlFor="Date">Date Of Birth</label>
            <input
              type="date"
              name="DateOfBirth"
              className={`form-control ${errors.DateOfBirth ? 'input-error' : ''}`}
              id="Date"
              value={formData.DateOfBirth}
              onChange={handleChange}
            />
            {errors.DateOfBirth && <p className="text-danger">{errors.DateOfBirth}</p>}
          </div>
          <div className="col-sm-3 form-group mb-4">
            <label htmlFor="sex">Gender</label>
            <select id="sex" placeholder="Select Gender" className={`form-control browser-default custom-select ${errors.Gender ? 'input-error' : ''}`} name="Gender" value={formData.Gender} onChange={handleGenderChange}>
              <option value="">Select the value</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.Gender && <p className="text-danger">{errors.Gender}</p>}
          </div>
          <div className="col-sm-4 form-group mb-4">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className={`form-control ${errors.Phone ? 'input-error' : ''}`}
              name="Phone"
              placeholder="Enter your contact no."
              value={formData.Phone}
              onChange={handleChange}
            />
            {errors.Phone && <p className="text-danger">{errors.Phone}</p>}
          </div>
          <div className="col-sm-4 form-group mb-4">
            <label htmlFor="Password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.Password ? 'input-error' : ''}`}
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
          <div className="col-sm-4 form-group mb-4">
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className={`form-control ${errors.ConfirmPassword ? 'input-error' : ''}`}
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
            <button type="submit" className="btn btn-primary float-right mr-2">Submit</button>
            <button type="button" onClick={resetForm} className="btn btn-secondary float-right mr-2">Reset</button>
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
