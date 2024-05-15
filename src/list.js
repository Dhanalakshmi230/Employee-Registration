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

// Define the base API URL
const apiUrl = 'https://63cfb761e52f587829a384e5.mockapi.io';

function List({ tableData, setTableData, updateEntry, deleteEntry }) {
  const navigate = useNavigate();
  const [deleteItemId, setDeleteItemId] = useState(null); // State variable to store the id of the item to be deleted
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); 
  const [loading, setLoading] = useState(true); // State variable to manage loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${apiUrl}/Form`);
        setTableData(result.data);
        setLoading(false); // Data fetching completed, set loading to false
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [setTableData]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/Form/${id}`);
      // Dispatch the delete action after successful deletion
      deleteEntry(id);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Failed to delete data:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const result = await axios.get(`${apiUrl}/Form/${id}`);
      updateEntry(result.data);
      // Navigate to the updateform page with the fetched data and id
      navigate(`/updateform/${id}`);
    } catch (error) {
      console.error('Failed to fetch data for editing:', error);
    }
  };

  if (loading) {
    return <Loader />; // Render loader while data is being fetched
  }

  return (
    <div className="mt-4">
      <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this item?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => handleDelete(deleteItemId)}>Yes</Button>
        </Modal.Footer>
      </Modal>
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-10 col-sm-12">
          <div className={`table-responsive ${window.innerWidth >= 992 ? '' : 'table-responsive-lg'}`}>
            <table className="table table-light table-striped">
              <thead className="cf">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Address Line1</th>
                  <th>Address Line2</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Pin</th>
                  <th>Date Of Birth</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Password</th>
                  <th>Confirm Password</th>
                  <th className='act-width'>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
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
                    <td className='d-flex'>
                      <button className="btn btn-danger fs-5" onClick={() => {
                        // Set the id of the item to be deleted and show the confirmation popup
                        setDeleteItemId(item.id);
                        setShowDeleteConfirmation(true);
                      }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button className="btn btn-primary fs-5" onClick={() => handleEdit(item.id)}> {/* Pass the id to handleEdit */}
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  tableData: state.tableData
});

const mapDispatchToProps = {
  setTableData,
  updateEntry, // Make sure updateEntry is included here
  deleteEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
