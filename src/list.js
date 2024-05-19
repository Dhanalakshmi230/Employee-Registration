import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setTableData, updateEntry, deleteEntry } from './action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loader from './loader'; // Import your loader component here
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./list.css";

const apiUrl = 'https://63cfb761e52f587829a384e5.mockapi.io';

function List({ tableData, setTableData, updateEntry, deleteEntry }) {
  const navigate = useNavigate();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${apiUrl}/Form`);
        setTableData(result.data);
        setFilteredData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [setTableData]);

  const handleDelete = async (id) => {
    setLoading(true); // Start loading
    try {
      await axios.delete(`${apiUrl}/Form/${id}`);
      deleteEntry(id);
      setShowDeleteConfirmation(false);
      setFilteredData(filteredData.filter(item => item.id !== id)); // Update filtered data
      setLoading(false); // Stop loading after operation
    } catch (error) {
      console.error('Failed to delete data:', error);
      setLoading(false); // Ensure loading stops on error
    }
};


  const handleEdit = (id) => {
    navigate(`/Employee/Update/${id}`);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      setFilteredData(tableData.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(query)
        )
      ));
    } else {
      setFilteredData(tableData);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredData(tableData);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }
  

  return (
    <div className="container mt-4">
      <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => handleDelete(deleteItemId)}>Yes</Button>
        </Modal.Footer>
      </Modal>

      <div className="table-responsive shadow-lg p-3 mb-5 bg-body rounded">
        <div className="search-bar mb-3">
          <h5 className="nowrap">View Employee</h5>
          <div className="input-group col-3">
            <input
              type="text"
              className="form-control search-input w-25"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <Button variant="secondary" onClick={handleClearSearch} className="ms-2">Clear</Button>
          </div>
        </div>
        <table className="table table-light table-striped">
          <thead>
            <tr>
              <th className="nowrap">First Name</th>
              <th className="nowrap">Last Name</th>
              <th className="nowrap">Email</th>
              <th className="nowrap">Address Line1</th>
              <th className="nowrap">Address Line2</th>
              <th className="nowrap">State</th>
              <th className="nowrap">Country</th>
              <th className="nowrap">Pin</th>
              <th className="nowrap">Date Of Birth</th>
              <th className="nowrap">Gender</th>
              <th className="nowrap">Phone Number</th>
              <th className="nowrap">Password</th>
              <th className="nowrap">Confirm Password</th>
              <th className="nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="font-tab">
            {filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.Firstname}</td>
                <td>{item.Lastname}</td>
                <td>{item.Email}</td>
                <td>{item.Address1}</td>
                <td>{item.Address2}</td>
                <td>{item.State}</td>
                <td>{item.Country}</td>
                <td>{item.Zip}</td>
                <td>{item.Dob}</td>
                <td>{item.Gender}</td>
                <td>{item.Phone}</td>
                <td>{item.Password}</td>
                <td>{item.ConfirmPassword}</td>
                <td className="d-flex justify-space-between">
                  <button className="btn btn-danger fsedit me-3" onClick={() => {
                    setDeleteItemId(item.id);
                    setShowDeleteConfirmation(true);
                  }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button className="btn btn-primary fsedit" onClick={() => handleEdit(item.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  tableData: state.tableData
});

const mapDispatchToProps = {
  setTableData,
  updateEntry,
  deleteEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
