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
    const handleChange = (e) => {
        setUpdatedata({
            ...updatedata,
            [e.target.name]: e.target.value
        });
    };
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };
    const handleSubmit = (e) => {
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
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
      <div class="row jumbotron box8">
        <div class="col-sm-12 mx-t3 mb-4">
          <h2 class="text-center text-info">Employee Update</h2>
        </div>
        <div class="col-sm-6 form-group">
          <label for="name-f">First Name</label>
          <input type="text" class="form-control" name="Firstname" id="name-f" placeholder="Enter your first name."  value={updatedata.Firstname} onChange={handleChange} required />
        </div>
        <div class="col-sm-6 form-group">
          <label for="name-l">Last name</label>
                      <input type="text" class="form-control" name="Lastname" id="name-l" placeholder="Enter your last name." value={updatedata.Lastname} onChange={handleChange} required />
        </div>
        <div class="col-sm-6 form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" name="Email" id="email" placeholder="Enter your email." value={updatedata.Email} onChange={handleChange} required />
        </div>
        <div class="col-sm-6 form-group">
          <label for="address-1">Address Line-1</label>
          <input type="address" class="form-control" name="Address1" id="address-1" placeholder="Locality/House/Street no." value={updatedata.Address1} onChange={handleChange} required />
        </div>
        <div class="col-sm-6 form-group">
          <label for="address-2">Address Line-2</label>
          <input type="address" class="form-control" name="Address2" id="address-2" placeholder="Village/City Name." value={updatedata.Address2} onChange={handleChange} required />
        </div>
        <div class="col-sm-4 form-group">
          <label for="State">State</label>
          <input type="address" class="form-control" name="State" id="State" placeholder="Enter your state name." value={updatedata.State} onChange={handleChange} required />
        </div>
        <div class="col-sm-2 form-group">
          <label for="zip">Postal-Code</label>
          <input type="zip" class="form-control" name="Zip" id="zip" placeholder="Postal-Code." value={updatedata.Zip} onChange={handleChange} required />
        </div>
        <div class="col-sm-6 form-group">
          <label for="Country">Country</label>
          <select class="form-control custom-select browser-default" value={updatedata.Country} onChange={handleCountryChange}>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Åland Islands">Åland Islands</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Bouvet Island">Bouvet Island</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote D'ivoire">Cote D'ivoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Territories">French Southern Territories</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guernsey">Guernsey</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-bissau">Guinea-bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
            <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jersey">Jersey</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
            <option value="Korea, Republic of">Korea, Republic of</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macao">Macao</option>
            <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
            <option value="Moldova, Republic of">Moldova, Republic of</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Netherlands Antilles">Netherlands Antilles</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Pitcairn">Pitcairn</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Helena">Saint Helena</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Saint Lucia">Saint Lucia</option>
            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
            <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Serbia">Serbia</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
            <option value="Taiwan, Province of China">Taiwan, Province of China</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-leste">Timor-leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Viet Nam">Viet Nam</option>
            <option value="Virgin Islands, British">Virgin Islands, British</option>
            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
            <option value="Wallis and Futuna">Wallis and Futuna</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Yemen">Yemen</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
        </div>
        <div class="col-sm-6 form-group">
          <label for="Date">Date Of Birth</label>
          <input type="Date" name="Dob" class="form-control" id="Date" placeholder="" value={updatedata.Dob} onChange={handleChange} required />
        </div>
        <div class="col-sm-6 form-group">
          <label for="sex">Gender</label>
          <select id="sex" class="form-control browser-default custom-select" value={updatedata.Gender} onChange={handleGenderChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unspesified">Unspecified</option>
          </select>
        </div>
       
        <div class="col-sm-6 form-group">
          <label for="tel">Phone</label>
          <input type="tel" name="Phone" class="form-control" id="tel" placeholder="Enter Your Contact Number." value={updatedata.Phone} onChange={handleChange} required />
        </div>
        
        <div className="col-sm-6 form-group">
  <label htmlFor="pass">Password</label>
  <div className="input-group">
    <input type={showPassword ? "text" : "password"} name="Password" className="form-control" id="pass" placeholder="Enter your password." value={updatedata.Password} onChange={handleChange} required />
    <div className="input-group-append">
      <p className="btn btn-secondary"  >
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={togglePasswordVisibility} />
      </p>
    </div>
  </div>
</div>

<div className="col-sm-6 form-group">
  <label htmlFor="pass2">Confirm Password</label>
  <div className="input-group">
    <input type={showConfirmPassword ? "text" : "password"} name="ConfirmPassword" className="form-control" id="pass2" placeholder="Re-enter your password."value={updatedata.ConfirmPassword} onChange={handleChange} required />
    <div className="input-group-append">
      
       
        <p className="btn btn-secondary"  >
        <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} onClick={toggleConfirmPasswordVisibility}/>
      </p>
    </div>
  </div>
</div>
        <div class="col-sm-12">
         
        </div>
  
        <div class="col-sm-12 form-group mb-0">
          <button class="btn btn-primary float-right">Update</button>
        </div>
  
      </div>
      </form>
    </div>
  );
}

export default connect(null, { updateEntry })(Updateform);
