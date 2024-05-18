import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateEntry } from './action';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from './loader'; // Import your loader component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./form.css"
function Updateform({ updateEntry }) {
    const { id } = useParams();
  const navigate = useNavigate();
  const [Gender, setGender] = useState('');
  const [Country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);// State for loading indicator
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

    setUpdatedata({
      ...updatedata,
      [name]: value,
    });
    setErrors(updatedErrors);
  };

    const [updatedata, setUpdatedata] = useState({
        id: id, // Ensure that the ID is initially set
        Firstname: '',
        Lastname: '',
        Email: '',
        Address1: '',
        Address2: '',
        State: '',
        Zip: '',
        Country: '',
        Dob: '',
        Gender: '',
        Phone: '',
        Password: '',
        ConfirmPassword: ''
    });

    useEffect(() => {
        // Fetch data for the specified ID when the component mounts
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = async () => {
        try {
            const response = await fetch(`https://63cfb761e52f587829a384e5.mockapi.io/Form/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setUpdatedata(data);
            setLoading(false); // Turn off loading indicator once data is fetched
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
  
    const handleGenderChange = (event) => {
      const selectedGender = event.target.value;
      setUpdatedata({
          ...updatedata,
          Gender: selectedGender
      });
      setGender(selectedGender); // Update the gender state as well if needed
  };
  const handleCountryChange = (event) => {
      const selectedCountry = event.target.value;
      setUpdatedata({
          ...updatedata,
          Country: selectedCountry
      });
      setCountry(selectedCountry); // Update the gender state as well if needed
  };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requiredFields = ['Firstname', 'Lastname', 'Email', 'Address1', 'Address2', 'State', 'Zip', 'Country', 'Dob', 'Gender', 'Phone', 'Password', 'ConfirmPassword'];
    const emptyFieldErrors = {};
    
    requiredFields.forEach((field) => {
      if (!updatedata[field]) {
        emptyFieldErrors[field] = `${field} is required`;
      }
    });
    
    if (Object.keys(emptyFieldErrors).length > 0) {
      setErrors(emptyFieldErrors);
      return;
    }

    if (updatedata.Password !== updatedata.ConfirmPassword) {
      setErrors({ ...errors, Password: 'Passwords do not match', ConfirmPassword: 'Passwords do not match' });
      return;
    }

    updateEntry(updatedata);
        e.preventDefault();

        updateEntry(updatedata);

        const updatedFormData = { ...updatedata };

        fetch(`https://63cfb761e52f587829a384e5.mockapi.io/Form/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFormData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Navigate to another page after successful update
            navigate('/list');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    if (loading) {
      return (
        <div className="loader-container">
          <Loader />
        </div>
      );
    }
    
    
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
              value={updatedata.Firstname}
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
              value={updatedata.Lastname}
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
              value={updatedata.Email}
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
              value={updatedata.Address1}
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
              value={updatedata.Address2}
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
              value={updatedata.State}
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
              value={updatedata.Zip}
              onChange={handleChange}
            />
            {errors.Zip && <p className="text-danger">{errors.Zip}</p>}
          </div>
          <div className="col-sm-3 form-group">
            <label htmlFor="Country">Country</label>
            <select className="form-control custom-select browser-default" name="Country" value={updatedata.Country} onChange={handleCountryChange}>
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
              value={updatedata.Dob}
              onChange={handleChange}
            />
            {errors.Dob && <p className="text-danger">{errors.Dob}</p>}
          </div>
          <div className="col-sm-3 form-group">
            <label htmlFor="sex">Gender</label>
            <select
              id="sex"
              className="form-control browser-default custom-select"
              name="Gender"
              value={updatedata.Gender}
              onChange={handleGenderChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
             
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
              value={updatedata.Phone}
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
                value={updatedata.Password}
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
                value={updatedata.ConfirmPassword}
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

export default connect(null, { updateEntry })(Updateform);
